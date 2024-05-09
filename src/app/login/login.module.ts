import { HttpService } from 'src/app/core/http.service';
import { MaterialModule } from './../core/load.material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from '../modules/evaluation/change-password/change-password.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MaterialModule
  ],
  providers: [HttpService],
  declarations: [LoginComponent,ChangePasswordComponent],
})
export class LoginModule { }
