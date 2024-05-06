import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
// import { HttpModule } from '@angular/http';
// import { devextremeModule } from '@library/devextreme/load.module';
import { EvaluationModel } from './models/EvaluationModel';
import { ApiService } from './services/api.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { RecordtypeRoutingModule } from './evaluation-routing.module';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { DxTooltipModule, DxTemplateModule, DxTagBoxModule } from 'devextreme-angular';
import { DxTreeViewModule, DxListModule } from 'devextreme-angular';
import { DxTreeListModule, DxCheckBoxModule,DxSelectBoxModule,DxDateBoxModule } from 'devextreme-angular';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { EvaluationService } from './services/evaluation.service';
import { TransferComponent } from './components/transfer/transfer.component';
import { PermissionComponent } from './components/permission/permission.component';
import { AdjournComponent } from './components/adjourn/adjourn.component';
import { devextremeModule } from 'src/app/shared/library/devextreme/load.module';
import { HttpClientModule } from '@angular/common/http';
import { AddListComponent } from './components/add-list/add-list.component';
import { UserTemplateComponent } from './components/user-template/user-template.component';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/core/load.material.module';
import { InputdataComponent } from './components/inputdata/inputdata.component';
import { AddInputComponent } from './components/add-input/add-input.component';
import { MultipleChoiceModel } from './models/MultipleChoiceModel';
import { AddGuideComponent } from './components/add-guide/add-guide.component';
import { CKEditorModule } from 'ng2-ckeditor';
@NgModule({
  imports: [
    CommonModule,
    devextremeModule,
    RecordtypeRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    DxTooltipModule,
    DxDateBoxModule,
    DxTagBoxModule,
    DxTemplateModule,
    DxTreeViewModule, 
    DxListModule, 
    DxTreeListModule, 
    DxCheckBoxModule,
    DxSelectBoxModule,
    MatIconModule, 
    MaterialModule,
    CKEditorModule
  ],
  // entryComponents: [
  //   AddComponent,
  //   AddListComponent,
  //   AdjournComponent
  // ],
  providers: [ApiService, EvaluationModel, EvaluationService, DatePipe,MultipleChoiceModel],
  declarations: [IndexComponent, AddComponent, EvaluationComponent, AddListComponent, TransferComponent, PermissionComponent, UserTemplateComponent,AdjournComponent,InputdataComponent,AddInputComponent,AddGuideComponent]
})
export class EvaluationModule { }
