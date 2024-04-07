import { Component, OnInit, SimpleChanges } from '@angular/core';
import { SvgContainerComponent } from '../svg-container/svg-container.component';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { MarkdownLoaderService } from '../markdown-loader.service';
import { BlogPost } from '../models/blogPost.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-page-blog',
  standalone: true,
  imports: [SvgContainerComponent, MatDividerModule, MarkdownModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './page-blog.component.html',
  styleUrls: ['./page-blog.component.scss']
})
export class PageBlogComponent implements OnInit {
  postId: string | null = null;
  markdownContent: string | null = null;
  blogPosts: BlogPost[] = [];
  blogTitle!: string;
  blogExists!: boolean;
  blogDate!: string;
  nextPostId: string | null = null;
  prevPostId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private markdownLoaderService: MarkdownLoaderService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('id');
      this.updateBlogDetails();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
      // This ensures `updateBlogDetails` is called even when navigating between blog posts
      this.updateBlogDetails();
    });
  }

  async updateBlogDetails() {
    if (this.postId) {
      const postsModule = await import('../../assets/data/blog_posts.json');
      this.blogPosts = postsModule.posts as BlogPost[];
      
      const currentIndex = this.blogPosts.findIndex(blog => blog.id === this.postId);
      if (currentIndex !== -1) {
        const blog = this.blogPosts[currentIndex];
        this.blogExists = true;
        this.blogTitle = blog.title;
        this.blogDate = blog.date;
        
        this.nextPostId = currentIndex + 1 < this.blogPosts.length ? this.blogPosts[currentIndex + 1].id : null;
        this.prevPostId = currentIndex > 0 ? this.blogPosts[currentIndex - 1].id : null;
        
        // Load markdown content for the current post
        this.markdownLoaderService.getMarkdownContent(this.postId)
          .subscribe(content => this.markdownContent = content);
      } else {
        this.blogExists = false;
        this.blogTitle = `Blog number ${this.postId}`;
      }
    }
  }
}