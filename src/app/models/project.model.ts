export interface Project {
    thumbUrlSmall: string;
    thumbUrlMedium: string;
    thumbUrlLarge: string;
    projectName: string;
    tags: Array<string>;
    gitLink?: string;  
    url?: string;
    features?:string[];
    roadmap?:string;
    description?:string,
    descriptionLong?:string, 
  }