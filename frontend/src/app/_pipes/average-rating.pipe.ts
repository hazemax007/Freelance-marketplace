import { Pipe, PipeTransform } from '@angular/core';
import { Rating } from '../_models/Rating';

@Pipe({
    name: 'averageRating'
  })
  export class AverageRatingPipe implements PipeTransform {
    transform(ratings: Rating[]): number {
      if (!ratings || ratings.length === 0) {
        return 0;
      }
  
      const sum = ratings.reduce((total, rating) => total + rating.value, 0);
      return sum / ratings.length;
    }
  }
