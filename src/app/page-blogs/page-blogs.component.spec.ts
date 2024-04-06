import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageBlogsComponent } from './page-blogs.component';
import blogPosts from "../../assets/data/blog_posts.json";

describe('PageBlogsComponent', () => {
  let component: PageBlogsComponent;
  let fixture: ComponentFixture<PageBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageBlogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
