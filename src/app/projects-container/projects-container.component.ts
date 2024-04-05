import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Point } from '../models/point.model';
import { Path } from '../models/path.model';

@Component({
  selector: 'app-projects-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.scss']
})

export class ProjectsContainerComponent implements OnInit {
  viewBox: string = '0 0 1440 800'; // Set initial viewBox size
  width!: number;
  height!: number;
  paths: Array<Path> = [];
  numberOfParallelPaths = 70; // Number of paths on each side of the core path
  gapSize = 10; // Vertical gap between paths

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.updateViewBox();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateViewBox();
    this.createPaths();
    this.highlightRandomPaths();
  }

  private updateViewBox(): void {
    const hostElement: HTMLElement = this.elementRef.nativeElement;
    this.width = hostElement.offsetWidth;
    this.height = hostElement.offsetHeight;
    // Ensure the viewBox matches the dynamic dimensions
    this.viewBox = `0 0 ${this.width} ${this.height}`;
    this.createPaths();
    this.highlightRandomPaths();
  }

  private createPaths(): void {
    this.paths = []; // Reset paths before creating new ones

    // Base control points for the core path
    const baseControlPoint1: Point = { x: this.width / 2, y: 0 };
    const baseControlPoint2: Point = { x: 3 * this.width / 6, y: this.height };

    // Generate the core and parallel paths
    for (let i = -this.numberOfParallelPaths; i <= this.numberOfParallelPaths; i++) {
      // Calculate vertical offset for each path
      const yOffset = i * this.gapSize;

      // Adjusted control points for parallel paths, maintaining the curvature
      const controlPoint1: Point = { x: baseControlPoint1.x, y: baseControlPoint1.y + yOffset };
      const controlPoint2: Point = { x: baseControlPoint2.x, y: baseControlPoint2.y + yOffset };

      // Path definition
      const pathD = `M0,${yOffset} C${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${this.width},${this.height + yOffset}`;

      this.paths.push({ d: pathD });
    }
  }

  private highlightRandomPaths(): void {
    if (this.paths.length > 0) {
      // Reset all highlights
      this.paths.forEach(path => { path.highlight = false; path.delay = 0; path.speed = 0 });

      // Determine the number of paths to highlight 
      const numberOfPathsToHighlight = Math.ceil(this.paths.length / 2);

      // Create a set to hold indices of paths to be highlighted to ensure uniqueness
      const indicesToHighlight = new Set<number>();

      // Continue looping until the set contains the desired number of unique indices
      while (indicesToHighlight.size < numberOfPathsToHighlight) {
        const randomIndex = Math.floor(Math.random() * this.paths.length);
        indicesToHighlight.add(randomIndex);
      }

      // Highlight the paths at the selected indices
      indicesToHighlight.forEach(index => {
        // generate a random delay number in ms
        const delay = 0;
        // generate a random delay number in ms
        let speed = Math.random() * 16.9;
        speed = speed < 0.5 ? 0.5 + speed : speed; 
        this.paths[index].highlight = true;
        this.paths[index].delay = delay;
        this.paths[index].speed = speed;
      });
    }
  }

}
