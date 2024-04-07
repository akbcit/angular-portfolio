import { Component, Input } from '@angular/core';
import { BlogPost } from '../models/blogPost.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
  @Input() blogPost!: BlogPost;
}
