import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import {ListRoutingModule} from './list.routing';
import {ListModel, ListApi} from './export';
import { ListtypeApi, ListtypeModel } from '../listtype/export';
import { devextremeModule } from 'src/app/shared/library/devextreme/load.module';
import { RenderComponent } from './components/render/render.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    devextremeModule,
    ListRoutingModule
  ],
  providers: [ListtypeModel,ListApi,ListModel,ListtypeApi],
  declarations: [IndexComponent, AddComponent,RenderComponent]
})
export class ListModule { }
