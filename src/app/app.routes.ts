import { Routes } from '@angular/router';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageProjectsComponent } from './page-projects/page-projects.component';
import { PageBlogsComponent } from './page-blogs/page-blogs.component';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageBlogComponent } from './page-blog/page-blog.component';


export const routes: Routes = [
    { path: '', component: PageHomeComponent, pathMatch: 'full' },
    { path: 'projects', component: PageProjectsComponent, pathMatch: 'full' },
    { path: 'about', component: PageAboutComponent, pathMatch: 'full' },
    { path: 'blog', component: PageBlogsComponent, pathMatch: 'full' },
    { path: 'blog/:id', component: PageBlogComponent }
];
