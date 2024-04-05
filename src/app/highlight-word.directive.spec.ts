import { HighlightWordDirective } from './highlight-word.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('HighlightWordDirective', () => {
  let directive: HighlightWordDirective;
  let elRefMock: any;
  let renderer2Mock: any;

  beforeEach(() => {
    // Mock ElementRef and Renderer2
    elRefMock = {
      nativeElement: document.createElement('div')
    };
    renderer2Mock = jasmine.createSpyObj('Renderer2', ['setStyle']);

    TestBed.configureTestingModule({
      // Provide the mock objects to the TestBed
      providers: [
        HighlightWordDirective,
        { provide: ElementRef, useValue: elRefMock },
        { provide: Renderer2, useValue: renderer2Mock }
      ]
    });

    directive = TestBed.inject(HighlightWordDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  // Additional tests for directive behavior can be added here
});
