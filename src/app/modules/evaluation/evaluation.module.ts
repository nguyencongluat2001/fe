import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { EvaluationModel } from './models/EvaluationModel';
import { ApiService } from './services/api.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { RecordtypeRoutingModule } from './evaluation-routing.module';
import { IndexComponent } from './components/index/index.component';
import { DxTooltipModule, DxTemplateModule, DxTagBoxModule } from 'devextreme-angular';
import { DxTreeViewModule, DxListModule } from 'devextreme-angular';
import { DxTreeListModule, DxCheckBoxModule,DxSelectBoxModule,DxDateBoxModule } from 'devextreme-angular';
import { EvaluationService } from './services/evaluation.service';
import { devextremeModule } from 'src/app/shared/library/devextreme/load.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/core/load.material.module';
import { MultipleChoiceModel } from './models/MultipleChoiceModel';
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
  providers: [ApiService, EvaluationModel, EvaluationService, DatePipe,MultipleChoiceModel],
  declarations: [IndexComponent]
})
export class EvaluationModule { }
