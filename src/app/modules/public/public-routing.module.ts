import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnswerComponent } from './components/answer/answer.component';

const routes: Routes = [
  // { path: '', redirectTo: 'answer' },
  { path: 'answer', component: AnswerComponent },
  { path: 'answer/:ID', component: AnswerComponent },
  { path: 'public/answer/:ID', component: AnswerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule { }
