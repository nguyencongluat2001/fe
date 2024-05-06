import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DxCheckBoxModule, DxListModule, DxSelectBoxModule, DxTemplateModule, DxTooltipModule, DxTreeListModule, DxTreeViewModule } from 'devextreme-angular';
import { MenuRoutingModule } from './menu-routing.module';
import { IndexComponent } from './components/index/index.component';
import { MenuModel } from './models/menu.model';
import { AddComponent } from './components/add/add.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { devextremeModule } from 'src/app/shared/library/devextreme/load.module';

@NgModule({
  imports: [
    CommonModule,
    devextremeModule,
    MenuRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    DxSelectBoxModule,
    DxTooltipModule,
    DxTemplateModule, DxTreeViewModule, DxListModule,DxTreeListModule, DxCheckBoxModule
  ],
  providers: [MenuModel],
  declarations: [IndexComponent, AddComponent]
})

export class MenuModule {
  constructor() { 
  }
 }
