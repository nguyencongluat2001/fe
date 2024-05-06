import { Component, OnInit, ViewChild } from '@angular/core';
import { DxSelectBoxModule, DxFormComponent } from 'devextreme-angular'
import { ActivatedRoute, Router } from '@angular/router';
import { UsersModel } from '../../models/users.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UsersApi } from '../../services/users.service';
import { DepartmentsModel } from '../../models/departments.model';
import { AgencyModel } from '../../models/agency.model';
import { Library } from 'src/app/shared/library/main';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @ViewChild(DxFormComponent) form: DxFormComponent
  password = "";
  passwordOptions: any = {
    mode: "password",
    value: this.password
  };
  passwordComparison = () => {
    return this.form.instance.option("formData").password;
  };

  check = true;
  user: any;
  role: any;
  checkAdminSystem = false;
  checkAdminUnit = false;
  checkUser = true;
  donvi: any;
  phongbans: any;
  phongban = '';
  selectPhongban = '';
  position: any;
  setSelectedParentUnit = '';
  rootFolder: any;
  roles: any;

  constructor(
    public route: ActivatedRoute,
    private userModel: UsersModel,
    public bsModalRef: BsModalRef,
    public userApi: UsersApi,
    public departmentModel: DepartmentsModel,
    private agencyModel: AgencyModel) {
    this.user = userModel.getUser();
    this.donvi = userModel.getIdParent();
    let id = '';
    if (this.donvi) {
      id = this.donvi.id;
    } else {
      id = this.user.id;
    }
    let idRootUnit = this.departmentModel.getInfoRootUnit();
    if (id == idRootUnit.id) {
      id = this.user.id;
    }
    if (id == '') {
      this.route.queryParams.subscribe(params => {
        // let code = params.parent_id;
        // if (code) {
        //   id = code;
        // }
        id = '';
      });
    }
    Library.showloading();
    this.userApi.getParentUser(id).subscribe((response: any) => {
      let parentName = response.dataParent[0].name;
      this.user.nameParent = parentName;
      this.user.owner_code = response.dataParent[0].code;
      let phongban = response.ParentUnit[0].name;
      this.setSelectedParentUnit = response.ParentUnit[0].code;
      this.user.departments = phongban;
      this.phongbans = response.dataUnitById;
      if (!this.user.department) {
        this.user.department = this.setSelectedParentUnit;
      }
      Library.hideloading();
    });
    let userinfor = JSON.parse(localStorage.getItem('user_infor'));
    if (userinfor['role'] == 2) {
      this.roles = [
        { name: 'Quản trị đơn vị triển khai', id: '2' },
        { name: 'Người dùng', id: '3' }
      ];
    } else {
      this.roles = [
        { name: 'Quản trị hệ thống', id: '1' },
        { name: 'Quản trị đơn vị triển khai', id: '2' },
        { name: 'Người dùng', id: '3' }
      ];
    }

  }

  ngOnInit() {
    if (this.user.id) {
      this.check = false;
      this.user.password = '';
    }
    this.position = this.userModel.getPosition();
  }

  onSubmit() {
    let getRoute = this.userModel.getRouter();
    if (!getRoute) {
      this.userModel.setCheckRoute('users');
    }
    if (!this.user.unit_id) {
      let unit_id = this.bsModalRef.content.id;
      this.user.unit_id = unit_id;
    }
    this.user.getType = 'phongban';
    if (this.user.password) {
      if (!this.user.repassword) {
        alert('Vui lòng nhập mật khẩu xác nhận');
        return;
      }
      if (this.user.password != this.user.repassword) {
        alert('Mật khẩu xác nhận không đúng');
        return;
      }
    }
    this.userModel.update(this.user, this.bsModalRef);
    this.userModel.setSelectItems(false);
  }

}
