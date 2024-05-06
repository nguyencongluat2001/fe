import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {
    path: ''
    , component: IndexComponent
    , data: {
      title: 'Quản trị loại danh mục'
    }
  },
  { path: 'index', component: IndexComponent },
  { path: 'edit', component: AddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListtypeRoutingModule { }