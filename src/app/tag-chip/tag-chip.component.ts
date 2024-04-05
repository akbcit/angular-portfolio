import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-chip',
  standalone: true,
  imports: [MatButtonModule, MatBadgeModule, MatIconModule, CommonModule],
  templateUrl: './tag-chip.component.html',
  styleUrl: './tag-chip.component.scss'
})
export class TagChipComponent {
  @Input() tag!: string;
  @Output() removeFilter: EventEmitter<string> = new EventEmitter<string>();
  isSelected: boolean = false;
  onTagClicked() {
    if(!this.isSelected){
      this.isSelected = !this.isSelected;
    }
  }
  onBadgeClicked(event: MouseEvent): void {
    event.stopPropagation();
    this.removeFilter.emit()
    if (this.isSelected) {
      this.isSelected = !this.isSelected;
    }
  }
}
