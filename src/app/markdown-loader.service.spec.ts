import { TestBed } from '@angular/core/testing';

import { MarkdownLoaderService } from './markdown-loader.service';

describe('MarkdownLoaderService', () => {
  let service: MarkdownLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkdownLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
