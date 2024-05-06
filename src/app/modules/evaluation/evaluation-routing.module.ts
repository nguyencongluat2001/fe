import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index/index.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { Routes, RouterModule } from '@angular/router';
import { PermissionComponent } from './components/permission/permission.component';
import { InputdataComponent } from './components/inputdata/inputdata.component';

const routes: Routes = [
  {
    path: ''
    , component: IndexComponent
    , data: {
      title: 'Quản trị các tiêu chí đánh giá'
    }
  },
  { path: 'index', component: IndexComponent },
  {
    path: 'define', component: EvaluationComponent, data: {
      title: 'Quản trị các tiêu chí đánh giá'
    }
  },
  {
    path: 'defines', component: EvaluationComponent, data: {
      title: 'Quản trị các tiêu chí đánh giá'
    }
  },
  {
    path: 'transfer', component: TransferComponent, data: {
      title: 'Quản trị các tiêu chí đánh giá'
    }
  },
  {
    path: 'transfers', component: TransferComponent, data: {
      title: 'Quản trị các tiêu chí đánh giá'
    }
  },
  {
    path: 'permission', component: PermissionComponent, data: {
      title: 'Quản trị các tiêu chí đánh giá'
    }
  },
  {
    path: 'inputdata', component: InputdataComponent, data: {
      title: 'Danh sách dữ liệu đầu vào '
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordtypeRoutingModule { }
