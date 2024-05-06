import { HttpService } from 'src/app/core/http.service';
import { MaterialModule } from './../core/load.material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MaterialModule
  ],
  providers: [HttpService],
  declarations: [LoginComponent],
})
export class LoginModule { }
