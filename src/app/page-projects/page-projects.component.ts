import { Component } from '@angular/core';
import { ProjectsContainerComponent } from '../projects-container/projects-container.component';
import { TagChipComponent } from '../tag-chip/tag-chip.component';
import { CommonModule } from '@angular/common';
import { ProjectBoxComponent } from '../project-box/project-box.component';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-page-projects',
  standalone: true,
  imports: [ProjectsContainerComponent, TagChipComponent, CommonModule, ProjectBoxComponent],
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.scss'] // Corrected property name
})
export class PageProjectsComponent {
  tags: Array<string> = ["Node.js", "React", "Angular", "React Native", "Express.js", "Fastify.js", "Hono", "MongoDB", "PostgreSQL"].filter((v, i, a) => a.indexOf(v) === i);
  _tag: string | null = null;
  _name: string | null = null;
  filteredProjects: Array<Project> = [];
  projects: Array<Project> = [
    {
      thumbUrlSmall: "../../assets/images/project_thumbs/express_billing_small.png",
      thumbUrlMedium: "../../assets/images/project_thumbs/express_billing_medium.png",
      thumbUrlLarge: "../../assets/images/project_thumbs/express_billing_large.png",
      projectName: "Express Billing",
      description: "",
      features: [],
      roadmap: "",
      descriptionLong: "",
      tags: ["Node.js", "Express.js", "MongoDB", "EJS"],
    },
    {
      thumbUrlSmall: "../../assets/images/project_thumbs/kube_small.png",
      thumbUrlMedium: "../../assets/images/project_thumbs/kube_medium.png",
      thumbUrlLarge: "../../assets/images/project_thumbs/kube_large.png",
      projectName: "Kube",
      description: "",
      features: [],
      roadmap: "",
      descriptionLong: "",
      tags: ["Node.js", "Express.js", "MongoDB", "React"],
      gitLink:"https://github.com/akbcit/akbcit-project-01-express-billing-system-with-auth"
    },
    {
      thumbUrlSmall: "../../assets/images/project_thumbs/shlokastream_small.png",
      thumbUrlMedium: "../../assets/images/project_thumbs/shlokastream_medium.png",
      thumbUrlLarge: "../../assets/images/project_thumbs/shlokastream_large.png",
      projectName: "ShlokaStream",
      description: "ShlokaStream: Unveiling the wisdom of ancient texts through modern AI. Explore, understand, and connect with classical literature like never before.",
      features: [
        "Semantic Search",
        "Web Scraping",
        "AI Chatbot",
        "Vector Embeddings",
        "Easy Interface"
      ],
      roadmap: "The app aims to eventually include a chatbot for engaging with various ancient texts via semantic search. It utilizes vector embeddings of the Gita's 700 shlokas, enhancing user interaction with this pivotal spiritual and philosophical epic.",
      descriptionLong: "At its core, ShlokaStream integrates OpenAI's advanced NLP models within a Node.js backend framework to perform nuanced translations of classical texts, bridging the gap between archaic languages and contemporary understanding. The application leverages custom web scraping scripts to systematically gather and present non-copyrighted commentaries alongside translations, facilitating a comprehensive study environment.",
      tags: ["Node.js", "Express.js", "Angular", "OpenAI"],
    },
    {
      thumbUrlSmall: "../../assets/images/project_thumbs/kiku_small.png",
      thumbUrlMedium: "../../assets/images/project_thumbs/kiku_medium.png",
      thumbUrlLarge: "../../assets/images/project_thumbs/kiku_large.png",
      projectName: "Kiku",
      description: "",
      features: [],
      roadmap: "",
      descriptionLong: "",
      tags: ["Node.js", "Fastify.js", "PostgreSQL", "React"],
    },
    {
      thumbUrlSmall: "../../assets/images/project_thumbs/quill_bot_small.png",
      thumbUrlMedium: "../../assets/images/project_thumbs/quill_bot_medium.png",
      thumbUrlLarge: "../../assets/images/project_thumbs/quill_bot_large.png",
      projectName: "QuillBot",
      description: "",
      features: [],
      roadmap: "",
      descriptionLong: "",
      tags: ["Node.js", "Hono", "PostgreSQL", "React"],
    }
  ];

  constructor() {
    this.filteredProjects = this.projects;
  }

  get tag(): string | null {
    return this._tag;
  }

  set tag(value: string | null) {
    this._tag = value;
    this.applyFilters();
  }

  get name(): string | null {
    return this._name;
  }

  set name(value: string | null) {
    this._name = value;
    this.applyFilters();
  }

  selectTag(tag: string | null): void {
    this.tag = tag;
  }

  selectName(name: string | null): void {
    this.name = name;
    this.applyFilters();
  }

  applyFilters(): void {
    console.log(this._tag)
    let filtered = this.projects;

    // Preserve existing tag filter if it exists
    if (this._tag !== null) {
      filtered = filtered.filter(project => project.tags.includes(this._tag!));
    }

    // Filter by project name
    if (this._name) {
      filtered = filtered.filter(project => project.projectName === this._name);
    }

    this.filteredProjects = filtered.length > 0 ? filtered : this.projects;
  }

  showAllProjects(): void {
    this._tag = null;
    this._name = null;
    this.filteredProjects = this.projects;
  }
}
