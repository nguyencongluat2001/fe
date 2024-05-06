import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import {ListtypeModel } from './models/listtype.model';
import { ListtypeApi } from './services/api.service';
import { IndexComponent } from './components/index/index.component';
import {ListtypeRoutingModule} from './listtype.routing';
import { AddComponent } from './components/add/add.component';
import { devextremeModule } from 'src/app/shared/library/devextreme/load.module';
import { DesignComponent } from './components/design/design.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  imports: [
    CommonModule,
    devextremeModule,
    ModalModule.forRoot(),
    ListtypeRoutingModule,
    NgxJsonViewerModule,
    //AceEditorModule
  ],
  providers: [ListtypeModel,ListtypeApi],
  declarations: [IndexComponent, AddComponent,DesignComponent]
})
export class ListtypeModule { }