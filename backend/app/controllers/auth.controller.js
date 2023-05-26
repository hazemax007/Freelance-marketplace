const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer")
var randomstring = require("randomstring")

exports.signup = async(req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = async(req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.forgetPassword = async (req,res) => {
  try{
    const email = req.body.email
    const userData = await User.findOne({email:email})
    if(userData){
      const randomString = randomstring.generate()
      const data = await User.updateOne({email:email},{$set:{token:randomString}})
      sendResetPasswordMail(userData.username,userData.email,randomString)
      res.status(200).send({success:true,msg:"Please check your inbox of mail and reset your password."})
    }else{
      res.status(200).send({success:true,msg:"This email does not exists."})
    }
  }catch(error){
    res.status(400).send({success:false,msg:error.message})
  }
}

const sendResetPasswordMail = async (name,email,token) => {
  try{
    const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
        user:config.emailUser,
        pass:config.emailPassword
      }
    })
    const mailOptions = {
      from:config.emailUser,
      to:email,
      subject:'For reset password',
      html:'<p>Hii '+name+', Please copy the link and <a href="http://localhost:4200/reset-password?token='+token+'"> reset your password <a/>'
    }
    transporter.sendMail(mailOptions,function(error,info){
      if(error){
        console.log(error)
      }else{
        console.log("Mail has been sent:- ",info.response)
      }
    })
  }catch(error){
    res.status(400).send({success:false,msg:error.message})
  }
}

exports.resetPassword = async (req,res) =>{
  try{
    const token = req.query.token
    const tokenData = await User.findOne({  token:token })
    if(tokenData){
      const password = req.body.password
      const newPassword = bcrypt.hashSync(password,8)
      console.log("test")
      const userData = await User.findByIdAndUpdate({_id:tokenData._id},{$set:{password:newPassword,token:''}},{new:true})
      res.status(200).send({success:true,msg:"User password has been reset",data:userData})
    }else{
      res.status(200).send({success:false,msg:"This token has been expired"})
    }
  }catch(error){
    res.status(400).send({success:false,msg:error.message})
  }
}