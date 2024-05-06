import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users.routing';
import { ModalModule } from 'ngx-bootstrap/modal';
import {UsersApi} from './services/users.service';
import { FormsModule } from '@angular/forms';
import { DxSelectBoxModule } from 'devextreme-angular';
import { DxTooltipModule, DxTemplateModule } from 'devextreme-angular';
import { DxTreeViewModule, DxListModule } from 'devextreme-angular';
import { DxTreeListModule, DxCheckBoxModule } from 'devextreme-angular';
import { devextremeModule } from 'src/app/shared/library/devextreme/load.module';
import { UsersModel } from './models/users.model';
import { DepartmentsModel } from './models/departments.model';
import { AgencyModel } from './models/agency.model';
import { PermissionModel } from './models/permission.model';
import { DepartmentComponent } from './components/department/department.component';
import { AddComponent } from './components/add/add.component';
import { AddDonViComponent } from './components/add/addDonvi.component';
import { AddCoquanComponent } from './components/add/addCoquan.component';
import { UsersComponent } from './components/users/users.component';
import { PermissionComponent } from './components/permission/permission.component';
import { PermissionupdateComponent } from './components/permissionupdate/permissionupdate.component';
import { IndexComponent } from './components/index/index.component';
import { SearchComponent } from './components/search/search.component';
// import { RenderModule } from 'src/app/shared/library/listtype/render';
@NgModule({
  imports: [
    CommonModule,
    devextremeModule,
    // HttpModule,
    //TreeModule,
    UsersRoutingModule,
    // RenderModule,
    ModalModule.forRoot(),
    FormsModule,
    DxSelectBoxModule,
    DxTooltipModule,
    DxTemplateModule, DxTreeViewModule, DxListModule,DxTreeListModule, DxCheckBoxModule
  ],
  // entryComponents: [
  //   AddComponent,
  //   AddDonViComponent,
  //   DepartmentComponent,
  //   UsersComponent,
  //   AgencyComponent,
  //   AddCoquanComponent,
  //   SearchComponent
  // ],
  providers: [UsersApi,UsersModel,DepartmentsModel,AgencyModel,PermissionModel],
  declarations: [IndexComponent,DepartmentComponent,AddCoquanComponent,AddDonViComponent,AddComponent,UsersComponent,PermissionComponent,PermissionupdateComponent,SearchComponent]
})
export class UsersModule {
  constructor() { 
  }

 }
