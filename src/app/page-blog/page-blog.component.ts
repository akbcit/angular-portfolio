import { Component, OnInit } from '@angular/core';
import { SvgContainerComponent } from '../svg-container/svg-container.component';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { MarkdownLoaderService } from '../markdown-loader.service';


@Component({
  selector: 'app-page-blog',
  standalone: true,
  imports: [SvgContainerComponent, MatDividerModule, MarkdownModule],
  templateUrl: './page-blog.component.html',
  styleUrls: ['./page-blog.component.scss']
})
export class PageBlogComponent implements OnInit {
  postId: string | null = null;
  markdownContent: string | null = null;

  constructor(private route: ActivatedRoute,  private markdownLoaderService: MarkdownLoaderService) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.markdownLoaderService.getMarkdownContent(this.postId).subscribe(content => {
        this.markdownContent = content;
      });
    }
  }
}
