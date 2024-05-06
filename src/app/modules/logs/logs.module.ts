import { LogModel } from './models/LogModel';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DxTooltipModule, DxDataGridModule, DxTemplateModule, DxSelectBoxModule, DxDateBoxModule } from 'devextreme-angular';
import { LogsRoutingModule } from './logs-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { ApiService } from './services/api.service';
import { devextremeModule } from 'src/app/shared/library/devextreme/load.module';

@NgModule({
  imports: [
    CommonModule,
    LogsRoutingModule,
    DxTooltipModule,
    ModalModule.forRoot(),
    FormsModule,
    devextremeModule,
    DxDateBoxModule,
    DxDataGridModule,
    DxTemplateModule,
    DxSelectBoxModule
  ],
  declarations: [IndexComponent],
  providers: [ApiService, LogModel],
})
export class LogsModule { }
