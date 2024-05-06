import { NgModule } from '@angular/core';
import { LayoutsComponent } from './layouts/layouts.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'system/evaluation',
        loadChildren: () => import('./evaluation/evaluation.module').then(m => m.EvaluationModule)
      },
      {
        path: 'system/evaluation_commune',
        loadChildren: () => import('./evaluation/evaluation.module').then(m => m.EvaluationModule)
      },
      {
        path: 'system/evaluation_village',
        loadChildren: () => import('./evaluation/evaluation.module').then(m => m.EvaluationModule)
      },
      {
        path: 'system/notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule)
      },
      // hồ sơ
      {
        path: 'system/records_receiveonnet',
        loadChildren: () => import('./records/records.module').then(m => m.RecordsModule)
      },
      // Quản trị hệ thống
       {
         path: 'system/users',
         loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
       },
       {
        path: 'system/permission_xhh',
        loadChildren: () => import('./permission_xhh/permission.module').then(m => m.PermissionModule)
       },
       {
        path: 'system/menu',
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)
      },
      {
        path: 'system/listtype',
        loadChildren: () => import('./listtype/listtype.module').then(m => m.ListtypeModule)
      },
      {
        path: 'system/list',
        loadChildren: () => import('./list/list.module').then(m => m.ListModule)
      },
      {
        path: 'system/logs',
        loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule)
      },
      {
        path: 'system/support',
        loadChildren: () => import('./support/support.module').then(m => m.SupportModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule { }
