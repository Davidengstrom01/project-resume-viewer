import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { ResumePage } from './features/resume/pages/resume-page/resume-page';
import { ProjectListPage } from './features/projects/pages/project-list-page/project-list-page';
import { ProjectDetailPage } from './features/projects/pages/project-detail-page/project-detail-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'resume', component: ResumePage },
  { path: 'projects', component: ProjectListPage },
  { path: 'projects/:id', component: ProjectDetailPage },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
