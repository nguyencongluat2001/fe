import { Router } from '@angular/router';
import { Permission, PermissionModel } from './../../models/PermissionModel';
import { Component, OnInit } from '@angular/core';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  datas: Permission[] = [];
  selectedItems: Permission[] = [];

  constructor(private HttpService:HttpService,public PermissionModel: PermissionModel, private router: Router) { }

  ngOnInit() {
    this.loadList();
  }

  async loadList(){
    let params = {};
    Library.showloading();
    this.getAll(params);
    // this.datas = await this.PermissionModel.getAll(params);
    Library.hideloading();
  }
  getAll(params) {
    this.HttpService.getMethods("permission_xhh/getAll", params).subscribe(
        result => {
          this.datas = result.data.data;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  add(){
    this.PermissionModel.objPermissionGroup = new Permission();
    let newrouter = "/system/permission_xhh/permissionupdate";
    this.router.navigate([newrouter]);
  }
  update(){
    if (this.selectedItems.length > 1) {
      Library.notify("Chỉ được chọn một đối tượng để sửa", 'error');
      return;
    } else {
      this.PermissionModel.objPermissionGroup = this.selectedItems[0];
      let newrouter = "/system/permission_xhh/permissionupdate";
      this.router.navigate([newrouter]);
    }}
  delete(){
    var myclass = this;
    let listId = '';
    myclass.selectedItems.forEach((value, key) => {
      listId += ',' + value.id;
    });
    let params = {
      listId: listId
    }
    var result = Library.confirm("Bạn có chắc chắn xóa nhóm quyền này?", "Thông báo");
    result.then(function (r) {
      if (r) {
        myclass.PermissionModel.delete(params, myclass);  
      }
    });
  }

  selectPermission(e){
    this.selectedItems = e.selectedRowsData;
  }

}
