import { PermissionModel } from './models/PermissionModel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { PermissionRoutingModule } from './permission-routing.module';
import { DxTagBoxModule, DxTabPanelModule, DxSelectBoxModule, DxCheckBoxModule, DxTooltipModule, DxTreeListModule, DxTemplateModule, DxTreeViewModule, DxListModule } from 'devextreme-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { PermissionService } from './services/permission.service';
import { AddComponent } from './components/add/add.component';
import { devextremeModule } from 'src/app/shared/library/devextreme/load.module';

@NgModule({
  declarations: [IndexComponent, AddComponent],
  imports: [
    CommonModule,
    devextremeModule,
    DxTooltipModule,
    ModalModule.forRoot(),
    FormsModule,
    PermissionRoutingModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTabPanelModule,
    DxTagBoxModule,
    DxTemplateModule, DxTreeViewModule, DxListModule, DxTreeListModule
  ],
  providers: [ PermissionModel, PermissionService],
})
export class PermissionModule { }
