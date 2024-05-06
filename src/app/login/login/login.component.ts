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
    code: new FormControl(''),
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
      code: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  login(){
    if(!this.loginForm.invalid){
      let params = {
        username: this.loginForm.value.code,
        password: this.loginForm.value.password,
      }
      console.log(params);
      var router = this.returnUrl;
      router = '/system/index';
      this.router.navigate([router]);
      // this.HttpService.postMethods('login', params).subscribe(
      //   result => {
      //     if(result.data.code == 200){
      //       localStorage.setItem('isLogin', 'system');
      //       localStorage.setItem('idUser', result.data.data.user_infor['id']);
      //       localStorage.setItem('token', result.data.data.token);
      //       localStorage.setItem('system_infor', JSON.stringify(result.data.data.system_infor));
      //       localStorage.setItem('user_infor', JSON.stringify(result.data.data.user_infor));
      //       localStorage.setItem('unit_infor', JSON.stringify(result.data.data.unit_infor));
      //       localStorage.setItem('arrController', JSON.stringify(result.data.data.user_infor['arrController']));
      //       localStorage.setItem('arrsystem', JSON.stringify(result.data.data.user_infor['arrsystem']));
      //       let timeExprire = new Date();
      //       let sessiontime = result.data.data.system_infor['timeExpire'];
      //       timeExprire = new Date(timeExprire.getTime() + (1000 * 60 * sessiontime));
      //       localStorage.setItem('timeExprire', JSON.stringify({ 'timeExprire': timeExprire }));
      //       var router = this.returnUrl;
      //       if(result.data.data.user_infor['arrController'].length > 0){
      //         router = '/notification';
      //       }else if(result.data.data.user_infor['arrSociological'].length > 0){
      //         router = result.data.data.user_infor['arrSociological'][0]['children'][0]['url'];
      //       }else if(result.data.data.user_infor['arrSipas'].length > 0){
      //         router = result.data.data.user_infor['arrSipas'][0]['url'];
      //       }else{
      //         if (result.data.data.user_infor['arrreport'][0]['children'] != null) {
      //           router = result.data.data.user_infor['arrreport'][0]['children'][0]['url'];
      //         } else {
      //           router = result.data.data.user_infor['arrreport'][0]['url'];
      //         }
      //       }
      //       router = '/system' + router;
      //       this.router.navigate([router]);
      //     }if(result.data.code == 400){
      //       Library.notify(result.data.message, 'error');
      //     }
      //     else{
      //       this.snackBar.open(result.message, 'Lỗi', {duration: 4000});
      //     }
      //   }
      // );
    }
  }
}
