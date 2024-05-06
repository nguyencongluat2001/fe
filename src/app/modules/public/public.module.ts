import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerModel } from './models/AnswerModel';
import { AnswerComponent } from './components/answer/answer.component';
import { DxChartModule, DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule, DxTemplateModule, DxTooltipModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PublicRoutingModule } from './public-routing.module';
import { devextremeModule } from 'src/app/shared/library/devextreme/load.module';



@NgModule({
  imports: [
    CommonModule,
    devextremeModule,
    PublicRoutingModule,
    DxTooltipModule,
    ModalModule.forRoot(),
    FormsModule,
    DxChartModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTabPanelModule,
    DxTemplateModule,
  ],
  providers: [AnswerModel],
  declarations: [AnswerComponent],
})
export class PublicModule { }
