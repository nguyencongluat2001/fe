import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpModule } from '@angular/http';
import { Notification, NotificationModel } from './models/NotificationModel';
import { ApiService } from './services/api.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NotificationRoutingModule } from './notification-routing.module';
import { IndexComponent } from './components/index/index.component';
import { DxTooltipModule,DxFileUploaderModule, DxTemplateModule } from 'devextreme-angular';
import { DxTreeViewModule, DxListModule } from 'devextreme-angular';
import { NotificationService } from './services/notification.service';
import { DxTextAreaModule, DxCheckBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { AddNotificationComponent } from './components/add-notification/add-notification.component';
import { ExplanationComponent } from './components/explanation/explanation.component';
// import { NgxEditorModule } from 'ngx-editor';
// import { QuillEditorModule } from 'ngx-quill-editor';
import { CKEditorModule } from 'ng2-ckeditor';

import { devextremeModule } from 'src/app/shared/library/devextreme/load.module';
import { DetailComponent } from './components/detail/detail.component';
import { AddNotificationsComponent } from './components/add-notifications/add-notifications.component';
// import { DxoDetailsComponent } from 'devextreme-angular/ui/nested';


@NgModule({
  imports: [
    CommonModule,
    // NgxEditorModule,
    devextremeModule,
    NotificationRoutingModule,
    // HttpModule,
    ModalModule.forRoot(),
    FormsModule,
    DxTooltipModule,
    DxFileUploaderModule,
    DxTemplateModule,DxTreeViewModule, DxListModule,
    DxTextAreaModule, DxCheckBoxModule, DxSelectBoxModule,CKEditorModule
  ],
  // entryComponents:[
  //   DetailComponent,AddNotificationComponent,
  // ],
  providers:[ApiService,NotificationModel,NotificationService],
  declarations: [IndexComponent, AddNotificationComponent, ExplanationComponent,DetailComponent,AddNotificationsComponent,AddNotificationComponent]
})
export class NotificationModule { }
