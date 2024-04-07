import { Component } from '@angular/core';
import { HighlightWordDirective } from '../highlight-word.directive';
import { InfiniteCarouselComponent } from '../infinite-carousel/infinite-carousel.component';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [HighlightWordDirective,InfiniteCarouselComponent,MatButtonModule ],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.scss'
})
export class PageHomeComponent {
  constructor(private router: Router) {}

  navigateToProjects() {
    this.router.navigate(['/projects']);
  }
}
