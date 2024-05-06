import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsModel } from './models/RecordsModel';
import { ApiService } from './services/api.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './components/index/index.component';
import { DxTooltipModule, DxTemplateModule, DxTagBoxModule } from 'devextreme-angular';
import { DxTreeViewModule, DxListModule } from 'devextreme-angular';
import { DxTreeListModule, DxCheckBoxModule,DxSelectBoxModule,DxDateBoxModule } from 'devextreme-angular';
import { devextremeModule } from 'src/app/shared/library/devextreme/load.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/core/load.material.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { RecordsService } from './services/records.service';
import { RecordsRoutingModule } from './records-routing.module';
import { AddComponent } from './components/add/add.component';
import { Tab2Component } from './components/tab2/tab2.component';
import { CNoteComponent } from './components/c_note/c_note.component';
import { ExplanationComponent } from './components/explanation/explanation.component';
import { AddExplanationComponent } from './components/add-explanation/add-explanation.component';
import { Tab3Component } from './components/tab3/tab3.component';
@NgModule({
  imports: [
    CommonModule,
    devextremeModule,
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
    CKEditorModule,
    RecordsRoutingModule
  ],
  providers: [ApiService, RecordsModel, RecordsService],
  declarations: [IndexComponent,AddComponent,Tab2Component,Tab3Component,CNoteComponent,ExplanationComponent,AddExplanationComponent]
})
export class RecordsModule { }
