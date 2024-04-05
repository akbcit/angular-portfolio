import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  skillName: string;
  logoSrc: string;
}

@Component({
  selector: 'app-infinite-carousel',
  templateUrl: './infinite-carousel.component.html',
  styleUrls: ['./infinite-carousel.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class InfiniteCarouselComponent implements OnInit {
  skillsArr: Array<Skill> = [
    {
      skillName: "Node.js",
      logoSrc: "assets/images/node.png",
    },
    {
      skillName: "Bun.js",
      logoSrc: "assets/images/bun.png",
    },
    {
      skillName: "Express.js",
      logoSrc: "assets/images/express.png",
    },
    {
      skillName: "Fastify.js",
      logoSrc: "assets/images/fastify.png",
    },
    {
      skillName: "React.js",
      logoSrc: "assets/images/react.png",
    },
    {
      skillName: "Angular",
      logoSrc: "assets/images/angular.png",
    },
    {
      skillName: "Vue",
      logoSrc: "assets/images/vue.png",
    },
    {
      skillName: "SQL",
      logoSrc: "assets/images/sql.png",
    },
    {
      skillName: "PostgreSQL",
      logoSrc: "assets/images/postgresql.svg",
    },
    {
      skillName: "MongoDB",
      logoSrc: "assets/images/mongoDb.svg",
    },
    {
      skillName: "Git",
      logoSrc: "assets/images/github-mark-white.svg",
    },
    {
      skillName: "ASP.NET Core",
      logoSrc: "assets/images/aspnetcore.png",
    },
  ]

  quadrupledArr: Skill[] = [];
  sliderPosition = 0;
  sliderInterval: any;

  // Use ViewChild to access the DOM element
  @ViewChild('skillsSlider') skillsSlider!: ElementRef;
  constructor(private renderer: Renderer2) {
    this.quadrupledArr = Array(10).fill(this.skillsArr).flatMap(x => x);
  }

  ngOnInit(): void {
    this.startSliderMovement();
  }

  startSliderMovement() {
    this.sliderInterval = setInterval(() => {
      this.moveSlider();
    }, 300);
  }

  moveSlider() {
    this.sliderPosition -= 20; // Move slider to the left
    if (this.sliderPosition <= -7400) { // Reset position after moving a certain distance
      this.sliderPosition = 0;
    }
  }

  pauseSliderMovement() {
    clearInterval(this.sliderInterval);
    // Capture the current transform state
    const currentTransform = getComputedStyle(this.skillsSlider.nativeElement).transform;
    // Apply the captured transform state to freeze the slider immediately
    this.renderer.setStyle(this.skillsSlider.nativeElement, 'transform', currentTransform);
    // Set transition to '0s' to eliminate smoothing effect, ensuring an immediate pause
    this.setSliderTransition('0s');
  }

  resumeSliderMovement() {
    // Apply a timeout to ensure the transition duration change takes effect after a pause
    setTimeout(() => {
      this.setSliderTransition('1s');
    }, 0); // Execute at the end of the current call stack
    this.startSliderMovement();
  }

  setSliderTransition(duration: string) {
    this.renderer.setStyle(this.skillsSlider.nativeElement, 'transition', `transform ${duration} linear`);
  }


  ngOnDestroy(): void {
    this.pauseSliderMovement();
  }
}
