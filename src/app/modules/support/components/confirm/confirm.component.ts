import { SupportModel } from './../../models/SupportModel';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  email: any;
  code: any;
  confirm: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    private SupportModel: SupportModel,
    private HttpService: HttpService,
  ) { }

  ngOnInit() {
  }

  goback() {
    this.bsModalRef.hide();
  }
  verification() {
    if (this.email == undefined || this.email == '') {
      Library.notify('Email không được để trống', 'error');
      return;
    }
    var params = {
      email: this.email,
      evaluation_id: this.SupportModel.evaluation_id,
    }
    Library.showloading();
    this.HttpService.getMethods("support/getCodeVerifi", params).subscribe(
      response => {
        Library.hideloading();
        var code = response.data;
        if (code['status'] == true) {
          Library.notify(code['message'], 'success');
          this.confirm = true;
        } else {
          Library.notify(code['message'], 'error');
        }
      });
  }

  onSubmit(e) {
    if (this.email == undefined || this.email == '') {
      Library.notify('Email không được để trống', 'error');
      return;
    }
    if (this.code == undefined || this.code == '') {
      Library.notify('Mã xác nhận không được để trống', 'error');
      return;
    }

    var params = {
      ids: this.SupportModel.evaluation_id,
      email: this.email,
      code: this.code,
      user_id: JSON.parse(localStorage.getItem('user_infor'))['id'],
    }
    // console.log(data);

    this.HttpService.postMethods("support/delete", params).subscribe(
      response => {
        Library.hideloading();
        if (response.data.status == true) {
          Library.notify(response.data.message, 'success');
          this.SupportModel._myClass.loadList();
          this.bsModalRef.hide();
        } else {
          Library.notify(response.data.message, 'error');
        }
      });
  }

}
