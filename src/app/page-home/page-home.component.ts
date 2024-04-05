import { Component } from '@angular/core';
import { HighlightWordDirective } from '../highlight-word.directive';
import { InfiniteCarouselComponent } from '../infinite-carousel/infinite-carousel.component';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [HighlightWordDirective,InfiniteCarouselComponent,MatButtonModule ],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.scss'
})
export class PageHomeComponent {

}
