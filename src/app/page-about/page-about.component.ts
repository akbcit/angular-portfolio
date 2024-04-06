import { Component } from '@angular/core';
import { SvgContainerComponent } from '../svg-container/svg-container.component';

@Component({
  selector: 'app-page-about',
  standalone: true,
  imports: [SvgContainerComponent],
  templateUrl: './page-about.component.html',
  styleUrl: './page-about.component.scss'
})
export class PageAboutComponent {

}
