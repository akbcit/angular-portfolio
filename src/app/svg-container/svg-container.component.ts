import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-svg-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg-container.component.html',
  styleUrls: ['./svg-container.component.scss']
})
export class SvgContainerComponent implements OnInit {
  viewBox: string = '0 0 1440 800';  
  width!: number;
  height!: number;
  paths: Array<{ d: string }> = [];
  numberOfParallelPaths = 140;  
  gapSize = 6;  

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.updateViewBox();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateViewBox();
    this.createPaths();
  }

  private updateViewBox(): void {
    const hostElement: HTMLElement = this.elementRef.nativeElement;
    this.width = hostElement.offsetWidth;
    this.height = hostElement.offsetHeight;
    // Ensure the viewBox matches the dynamic dimensions
    this.viewBox = `0 0 ${this.width} ${this.height}`;
    this.createPaths();
  }

  private createPaths(): void {
    this.paths = []; // Reset paths before creating new ones

    // Add the central diagonal line
    this.paths.push({ d: `M0,0 L${this.width},${this.height}` });

    // Calculate and add parallel lines
    for (let i = 1; i <= this.numberOfParallelPaths; i++) {
      const offset = i * this.gapSize;
      // Parallel lines above the central line
      this.paths.push({ d: `M${-offset},${offset} L${this.width - offset},${this.height + offset}` });
      // Parallel lines below the central line
      this.paths.push({ d: `M${offset},${-offset} L${this.width + offset},${this.height - offset}` });
    }
  }
}
