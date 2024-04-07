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
  tags: Array<string> = ["Node.js", "React", "Angular","Express.js", "Fastify.js", "Hono","AWS Lambda" ,"MongoDB", "PostgreSQL"].filter((v, i, a) => a.indexOf(v) === i);
  _tag: string | null = null;
  _name: string | null = null;
  filteredProjects: Array<Project> = [];
  projects: Array<Project> = [
    {
      thumbUrlSmall: "../../assets/images/project_thumbs/express_billing_small.png",
      thumbUrlMedium: "../../assets/images/project_thumbs/express_billing_medium.png",
      thumbUrlLarge: "../../assets/images/project_thumbs/express_billing_large.png",
      projectName: "Express Billing",
      description: "Express Billing is a comprehensive and dynamic web application designed to streamline the process of creating, managing, and tracking invoices and billing. ",
      features: ["CRUD Operations","User Authentication"],
      roadmap: "As the project has been completed and submitted as part of an assignment for the BCIT SSD program, there isn't an ongoing roadmap.",
      descriptionLong: "With a focus on simplicity and efficiency, Express Billing caters to the needs of small to medium-sized businesses looking to digitize their invoicing processes. Through a user-friendly interface and powerful backend, Express Billing offers a robust solution for financial management without the complexity.",
      tags: ["Node.js", "Express.js", "MongoDB", "EJS"],
      gitLink:"https://github.com/akbcit/akbcit-project-01-express-billing-system-with-auth",
      videoLink:"https://player.vimeo.com/video/931630307?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    },
    {
      thumbUrlSmall: "../../assets/images/project_thumbs/kube_small.png",
      thumbUrlMedium: "../../assets/images/project_thumbs/kube_medium.png",
      thumbUrlLarge: "../../assets/images/project_thumbs/kube_large.png",
      projectName: "Kube",
      description: "Kube is a movie discovery app built using The Movie Database (TMDB). It features a chatbot that recommends movies from the Criterion Collection, using semantic search and NLP models for a tailored experience.",
      features: ["Advanced Search",
      "Chatbot Recommendations",
      "Favorites Management",
      "Watchlist Addition",
      "Account Management"],
      roadmap: "Future enhancements include refining the chatbot's NLP capabilities, expanding the database sources beyond TMDB, introducing social sharing features, and developing a more robust recommendation engine.",
      descriptionLong: "Kube is a movie discovery app. It enables advanced search and a chatbot for personalized recommendations from the Criterion Collection. It allows account creation, favorites management, and watchlist additions for a tailored user experience. Upcoming features include social sharing and an improved recommendation engine, making Kube a standout movie discovery app.",
      tags: ["Node.js", "Express.js", "MongoDB", "React"],
      gitLink:"https://github.com/akbcit/akbcit-project-01-express-billing-system-with-auth",
      videoLink:"https://vimeo.com/931645317",
    },
    {
      thumbUrlSmall: "../../assets/images/project_thumbs/shlokastream_small.png",
      thumbUrlMedium: "../../assets/images/project_thumbs/shlokastream_medium.png",
      thumbUrlLarge: "../../assets/images/project_thumbs/shlokastream_large.png",
      projectName: "ShlokaStream",
      description: "ShlokaStream aims to unveil the wisdom of ancient texts using sophisticated AI and search",
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
      videoLink:"https://vimeo.com/931646953",
    },
    {
      thumbUrlSmall: "../../assets/images/project_thumbs/kiku_small.png",
      thumbUrlMedium: "../../assets/images/project_thumbs/kiku_medium.png",
      thumbUrlLarge: "../../assets/images/project_thumbs/kiku_large.png",
      projectName: "Kiku",
      description: "Kiku will be a minimalistic designed to create complex and engaging questionnaires and surveys with ease.",
      features: [ "Intuitive questionnaire builder",
      "Multi-channel chat survey distribution",
      "Advanced reporting and analytics"],
      roadmap: "Future updates aim to enable builders to distribute surveys and for users to complete surveys via a chat interface",
      descriptionLong: "The app already has  backend with a robust and secure two-token JWT authentication. It aims to enable users to craft personalized surveys with an interactive front-end interface, focusing on ease and efficiency. As it progresses, the app will integrate features for chat-based survey distribution and completion.",
      tags: ["Node.js", "Fastify.js", "PostgreSQL", "React", "JWT"],
    },
    {
      thumbUrlSmall: "../../assets/images/project_thumbs/quill_bot_small.png",
      thumbUrlMedium: "../../assets/images/project_thumbs/quill_bot_medium.png",
      thumbUrlLarge: "../../assets/images/project_thumbs/quill_bot_large.png",
      projectName: "QuillBot",
      description: "QuillBot is a blog-writing aid that leverages AI to support bloggers in creating engaging content.",
      features: [ "Writing AI",
      "Multimedia Editor",
      "Content Generation",
      "Serverless Backend",
      "Neon PostgreSQL",
      "Drizzle ORM",
      "Kinde Authentication"],
      roadmap: "Future updates aim to enhance AI content tools, refine the media handling features, and broaden user interaction capabilities.",
      descriptionLong: "QuillBot provides a straightforward blogging platform, utilizing AI to enrich the writing process. Built on AWS Lambda for serverless operation and using a Neon-hosted PostgreSQL database, it ensures reliable performance. Integration with Drizzle ORM simplifies database queries, while Kinde offers a secure login system.",
      tags: ["Node.js", "AWS Lambda","Hono", "PostgreSQL", "React"],
      videoLink:"https://vimeo.com/931655929",
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
