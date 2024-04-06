import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarkdownLoaderService {

  constructor(private http: HttpClient) { }

  getMarkdownContent(postId: string): Observable<string> {
    const markdownFile = `assets/blog-posts/post${postId}.md`;
    return this.http.get(markdownFile, { responseType: 'text' });
  }
}