import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgContainerComponent } from './svg-container.component';

describe('SvgContainerComponent', () => {
  let component: SvgContainerComponent;
  let fixture: ComponentFixture<SvgContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SvgContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
