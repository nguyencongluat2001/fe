import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index/index.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: ''
    , component: IndexComponent
    , data: {
      title: 'Quản trị thông báo'
    }
  },
  { path: 'index', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
