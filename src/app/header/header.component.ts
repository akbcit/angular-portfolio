import { Component, HostListener } from '@angular/core';
import { ScrollAdjustHeaderDirective } from '../scroll-adjust-header.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ScrollAdjustHeaderDirective, RouterLink, RouterLinkActive, MatRippleModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  isMobile!: boolean;
  menuOpen = false;

  ngOnInit() {
    this.checkScreenSize()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.toggleScroll(!this.menuOpen);
  }

  toggleScroll(enable: boolean): void {
    const method = enable ? 'remove' : 'add';
    // Apply or remove the no-scroll class to both the <html> and <body> elements
    document.documentElement.classList[method]('no-scroll');
    document.body.classList[method]('no-scroll');
  }

  checkScreenSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      this.isMobile = true;
    }
    else {
      this.isMobile = false;
    }
  }
}
