import { IndexComponent } from './components/index/index.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './components/add/add.component';

const routes: Routes = [
  {
    path: ''
    , component: IndexComponent
    , data: {
      title: 'Quản trị nhóm quyền'
    }
  },{
    path: 'permissionupdate'
    , component: AddComponent
    , data: {
      title: 'Quản trị nhóm quyền'
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
