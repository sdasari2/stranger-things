import { Component, Input, OnInit } from '@angular/core';

const STARS_COUNT = 10;

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit {

  @Input() rating = 0;
  @Input() totalRating = STARS_COUNT;

  starsCount = STARS_COUNT;
  starClasses: any = {};

  constructor() { }

  ngOnInit(): void {
    this.generateStars();
  }

  private generateStars() {
    const rating = (this.rating / this.totalRating) * STARS_COUNT;
    const split = rating.toString().split('.');
    const fullStarsCount = parseInt(split[0], 10);
    const halfStarNumber = split[1] && parseInt(split[1], 10) > 0 ? fullStarsCount + 1 : 0;

    for (let i = 1; i <= STARS_COUNT; i++) {
      this.starClasses[i] = i === halfStarNumber ? ['fa-star-half-o'] : [];
      if (i <= fullStarsCount || i === halfStarNumber) {
        this.starClasses[i].push('fa-star');
        this.starClasses[i].push('checked');
      } else {
        this.starClasses[i].push('fa-star-o');
      }
    }
  }
}
