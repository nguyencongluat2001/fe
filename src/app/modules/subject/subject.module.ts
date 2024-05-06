import { SubjectModel } from './models/SubjectModel';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DxTooltipModule, DxChartModule, DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule, DxTagBoxModule } from 'devextreme-angular';
import { SubjectRoutingModule } from './subject-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { CopyComponent } from './components/copy/copy.component';
import { devextremeModule } from 'src/app/shared/library/devextreme/load.module';
import { MaterialModule } from 'src/app/core/load.material.module';


@NgModule({
  declarations: [IndexComponent, AddComponent, CopyComponent],
  imports: [
    CommonModule,
    devextremeModule,
    DxTooltipModule,
    ModalModule.forRoot(),
    FormsModule,
    SubjectRoutingModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTabPanelModule,
    DxTagBoxModule,
    MaterialModule
  ],
  // entryComponents: [
  //   AddComponent,
  //   CopyComponent,
  // ],
  providers: [ SubjectModel],
})
export class SubjectModule { }
