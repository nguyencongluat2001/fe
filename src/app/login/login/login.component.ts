import { HttpService } from 'src/app/core/http.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Library } from 'src/app/shared/library/main';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  returnUrl: any = '';
  eye_show: any = 'visibility';
  typePass: any = 'password';

  constructor(private HttpService: HttpService, private router: Router, private snackBar: MatSnackBar,    private route: ActivatedRoute,    ){}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.createForm();
  }

  showHidePass(){
    if(this.typePass == 'password'){
      this.typePass = 'text';
      this.eye_show = 'visibility_off';
    }else{
      this.typePass = 'password';
      this.eye_show = 'visibility';
    }
  }
  createForm(){
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  login(){
    if(!this.loginForm.invalid){
      let params = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      }
      console.log(params);
      this.HttpService.postMethods('PACS/login', params).subscribe(
        result => {
          if(result.data.code == 200){
            localStorage.setItem('username', result.loginModel.loginModel);
            var router = this.returnUrl;
            router = '/system/index';
            this.router.navigate([router]);
          }if(result.data.code == 400){
            Library.notify(result.data.message, 'error');
          }
          else{
            this.snackBar.open(result.message, 'Lỗi', {duration: 4000});
          }
        }
      );
    }
  }
}
