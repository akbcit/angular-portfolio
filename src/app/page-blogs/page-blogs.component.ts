import { Component } from '@angular/core';
import { SvgContainerComponent } from '../svg-container/svg-container.component';
import {MatDividerModule} from '@angular/material/divider';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../models/blogPost.model';

@Component({
  selector: 'app-page-blogs',
  standalone: true,
  imports: [SvgContainerComponent,MatDividerModule,BlogCardComponent,CommonModule],
  templateUrl: './page-blogs.component.html',
  styleUrl: './page-blogs.component.scss'
})
export class PageBlogsComponent {
  blogPosts: BlogPost[] = []; 
  async ngOnInit() {
    // Using a dynamic import for the JSON data
    const postsModule = (await import('../../assets/data/blog_posts.json')).posts;
    this.blogPosts = postsModule as BlogPost[];
  }
}
