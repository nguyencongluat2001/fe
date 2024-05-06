import { SupportRoutingModule } from './support-routing.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DxTooltipModule, DxCheckBoxModule } from 'devextreme-angular';
import { SupportModel } from './models/SupportModel';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { devextremeModule } from 'src/app/shared/library/devextreme/load.module';

@NgModule({
  imports: [
    CommonModule,
    devextremeModule,
    DxTooltipModule,
    ModalModule.forRoot(),
    FormsModule,
    SupportRoutingModule,
    DxCheckBoxModule,
  ],
  providers: [ SupportModel],
  declarations: [IndexComponent, ConfirmComponent],
})
export class SupportModule { }
