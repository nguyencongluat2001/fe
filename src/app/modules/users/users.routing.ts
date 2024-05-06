import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { PermissionComponent } from './components/permission/permission.component';
import { PermissionupdateComponent } from './components/permissionupdate/permissionupdate.component';

const routes: Routes = [
  { path: '', component: IndexComponent, data: { title: 'Quản trị người dùng' } },
  { path: 'users', component: IndexComponent, data: { title: 'Quản trị người dùng' } },
  { path: 'permission', component: PermissionComponent, data: { title: 'Quản trị quyền' } },
  { path: 'permissionupdate', component: PermissionupdateComponent, data: { title: 'Cập nhật nhóm quyền' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
