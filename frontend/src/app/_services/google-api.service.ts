import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const oAuthConfig: AuthConfig = {
  issuer:'https://accounts.google.com',
  strictDiscoveryDocumentValidation:false,
  redirectUri: window.location.origin,
  clientId:'657869156146-k2uv39oikdo425gqdc68ee84o4sba1q0.apps.googleusercontent.com',
  scope:'openid profile email'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(private readonly oauthService:OAuthService) {
    oauthService.configure(oAuthConfig)
    oauthService.loadDiscoveryDocument().then(()=>{
      oauthService.tryLoginImplicitFlow().then(()=>{
        if(!oauthService.hasValidAccessToken()){
          oauthService.initLoginFlow()
        }else{
          oauthService.loadUserProfile().then((userProfile)=>{
            console.log(JSON.stringify(userProfile))
          })
        }
      })
    })
   }
}
