import { Component } from '@angular/core';
import { ProjectBoxComponent } from '../project-box/project-box.component';
import { TagChipComponent } from '../tag-chip/tag-chip.component';

@Component({
  selector: 'app-page-blogs',
  standalone: true,
  imports: [ProjectBoxComponent],
  templateUrl: './page-blogs.component.html',
  styleUrl: './page-blogs.component.scss'
})
export class PageBlogsComponent {
}
