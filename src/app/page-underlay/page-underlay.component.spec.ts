import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUnderlayComponent } from './page-underlay.component';

describe('PageUnderlayComponent', () => {
  let component: PageUnderlayComponent;
  let fixture: ComponentFixture<PageUnderlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageUnderlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageUnderlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
