import { Component, Input } from '@angular/core';
import { BlogPost } from '../models/blogPost.model';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
  @Input() blogPost!: BlogPost;
}
