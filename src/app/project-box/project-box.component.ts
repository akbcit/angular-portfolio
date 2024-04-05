import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../models/project.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-box',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './project-box.component.html',
  styleUrl: './project-box.component.scss'
})
export class ProjectBoxComponent {
  gradients: string[] = [
    "radial-gradient(circle farthest-side at 0% 100%, #ff0099, transparent)",
    "radial-gradient(circle farthest-side at 100% 0%, #ffae00, transparent)",
    "radial-gradient(circle farthest-side at 100% 100%, #00ff00, transparent)",
    "radial-gradient(circle farthest-side at 0% 0%, #00c9ff, transparent)",
    "radial-gradient(circle farthest-side at 50% 50%, #b620e0, transparent)",
    "radial-gradient(circle farthest-side at 50% 0%, #f06d06, transparent)",
    "radial-gradient(circle farthest-side at 0% 50%, #6e0dd0, transparent)",
    "radial-gradient(circle farthest-side at 100% 50%, #d1d100, transparent)",
    "radial-gradient(circle farthest-side at 50% 100%, #009dff, transparent)",
    "radial-gradient(circle farthest-side at 25% 25%, #ff218e, transparent)",
    "radial-gradient(circle farthest-side at 75% 25%, #21ff88, transparent)",
    "radial-gradient(circle farthest-side at 25% 75%, #8821ff, transparent)",
    "radial-gradient(circle farthest-side at 75% 75%, #ff8c21, transparent)",
    "radial-gradient(circle farthest-corner at 10% 20%, #ff7b00, transparent)",
    "radial-gradient(circle farthest-corner at 90% 10%, #ff007b, transparent)",
    "radial-gradient(circle farthest-corner at 10% 80%, #007bff, transparent)",
    "radial-gradient(circle farthest-corner at 90% 90%, #7bff00, transparent)",
    "radial-gradient(circle farthest-corner at 50% 10%, #00ff7b, transparent)",
    "radial-gradient(circle farthest-corner at 10% 50%, #7b00ff, transparent)",
    "radial-gradient(circle farthest-corner at 50% 90%, #ff00f7, transparent)"
  ];
  selectedGradients: string[] = [];
  backgroundImage!: string;
  isFiltered: boolean = false;
  thumbUrl!:string;
  drawerOpen:boolean = false;

  ngOnInit(): void {
    this.updateThumbUrl();
    // select a few random gradients to create the bg image
    while (this.selectedGradients.length !== 7) {
      const randIndex = Math.floor(Math.random() * this.gradients.length);
      if (!this.selectedGradients.includes(this.gradients[randIndex])) {
        this.selectedGradients.push(this.gradients[randIndex])
      }
    }
    this.backgroundImage = this.selectedGradients.join(",");
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateThumbUrl();
  }

  updateThumbUrl() {
    // Logic to dynamically update thumburl based on screen size / isFiltered
    const screenWidth = window.innerWidth;
    if(this.isFiltered){
      if(screenWidth< 800){
        this.thumbUrl = this.project.thumbUrlSmall;
      }
      else if(screenWidth >= 800 && screenWidth < 1300){
        this.thumbUrl = this.project.thumbUrlMedium;
      }
      else{
        this.thumbUrl = this.project.thumbUrlLarge;
      }
    }
    else{
      this.thumbUrl = this.project.thumbUrlLarge;
    }
  }

  toggleDrawer(){
    console.log("hi");
    this.drawerOpen = !this.drawerOpen;
  }

  @Input() project!: Project;
  @Output() filterRequested: EventEmitter<string> = new EventEmitter<string>();
  @Output() removeFilterRequest: EventEmitter<null> = new EventEmitter<null>();

  // Emit the filter event along with the tag to filter by
  requestFilter(projectName: string): void {
    document.getElementById('site-header')?.classList.add('hidden');
    document.body.classList.add('no-scroll');
    this.filterRequested.emit(projectName);
    this.isFiltered = true;
  }
  // Emit the filter event along with the tag to filter by
  removeFilter(): void {
    document.getElementById('site-header')?.classList.remove('hidden');
    document.body.classList.remove('no-scroll');
    this.drawerOpen = false;
    this.removeFilterRequest.emit();
    this.isFiltered = false;
  }
}
