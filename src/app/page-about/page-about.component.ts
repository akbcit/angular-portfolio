import { Component } from '@angular/core';
import { AboutContainerComponent } from '../about-container/about-container.component';

@Component({
  selector: 'app-page-about',
  standalone: true,
  imports: [AboutContainerComponent],
  templateUrl: './page-about.component.html',
  styleUrl: './page-about.component.scss'
})
export class PageAboutComponent {

}
