import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  loginF = new FormGroup({
    username: new FormControl(''),
    oldpassword: new FormControl(''),
    newpassword: new FormControl(''),
  });
  name:any = '';

  constructor(
    public bsModalRef: BsModalRef,
    private HttpService: HttpService,
    private route: Router) {  
      // this.user_id=JSON.parse(localStorage.getItem('user_infor'))['id'];
      }
  ngOnInit() {
    this.createForm();
  }
  createForm(){
    this.loginF = new FormGroup({
      username: new FormControl(''),
      oldpassword: new FormControl(''),
      newpassword: new FormControl(''),
    });
  }
  goback() {
    let newrouter =this.route.url;
    this.route.navigate([newrouter]);
    this.bsModalRef.hide();
  }
  login(){
    console.log(this.name)
    let params = {
      username: this.loginF.value.username,
      // user_id: JSON.parse(localStorage.getItem('user_infor'))['id'],
      oldpassword:this.loginF.value.oldpassword,
      newpassword:this.loginF.value.newpassword
    }
    console.log(params)
  }
}
