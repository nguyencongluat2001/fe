import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxFormModule,
  DxNumberBoxModule, 
  DxDataGridModule,
  DxSelectBoxModule,
  DxTreeListModule,
  DxCheckBoxModule,
  DxButtonModule,
  DxTextAreaModule,
  DxPopupModule,
  DxRadioGroupModule,
  DxLoadPanelModule,
  DxValidationGroupModule,
  DxLoadIndicatorModule,
  DxValidatorModule,
  DxFileUploaderModule,
  DxValidationSummaryModule,
  DxTextBoxModule   
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DxFileUploaderModule,
    DxFormModule,
    DxNumberBoxModule, 
    DxTextAreaModule,
	  DxDataGridModule,
    DxSelectBoxModule,
    DxTreeListModule,
	  DxCheckBoxModule,
	  DxButtonModule,
	  DxPopupModule,
	  DxRadioGroupModule,
    DxLoadPanelModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxValidationGroupModule,
    DxLoadIndicatorModule,
	  DxTextBoxModule 
  ],
  declarations: []
})
export class devextremeModule { }
