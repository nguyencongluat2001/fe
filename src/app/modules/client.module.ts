import { HttpService } from 'src/app/core/http.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { MaterialModule } from '../core/load.material.module';
import { LayoutsComponent } from './layouts/layouts.component';
import { AppHeaderComponent } from './layouts/app-header';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Changpass } from './layouts/models/changpass';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
    
  ],
  providers: [HttpService,Changpass],
  declarations: [
    LayoutsComponent,
    AppHeaderComponent
  ],
})
export class ClientModule { }
