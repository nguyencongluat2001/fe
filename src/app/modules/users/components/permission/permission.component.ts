import { Component, OnInit } from '@angular/core';
import { PermissionModel, PermissionGroup } from '../../models/permission.model'
import { Router } from '@angular/router';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  public selectedItems: PermissionGroup[] = [];
  constructor(public permissionmodel: PermissionModel, private route: Router, ) {
    this.loaddata();
  }
  ngOnInit() {
  }

  async loaddata() {
    Library.showloading();
    await this.permissionmodel.getalldata();
    Library.hideloading();
  }
  selectPermissionGroup(e) {
    this.selectedItems = e.selectedRowsData;
  }
  update() {
    if (this.selectedItems.length > 1) {
      Library.notify("Chỉ được chọn một đối tượng để sửa", 'error');
      return;
    } else {
      this.permissionmodel.objPermissionGroup = this.selectedItems[0];
      let newrouter = "/system/users/permissionupdate";
      this.route.navigate([newrouter]);
    }
  }
  add() {
    this.permissionmodel.objPermissionGroup = new PermissionGroup();
    let newrouter = "/system/users/permissionupdate";
    this.route.navigate([newrouter]);
  }
  delete() {
    var myclass = this;
    if (this.selectedItems.length > 1) {
      Library.notify("Chỉ được chọn một đối tượng để sửa", 'error');
      return;
    } else {
      var result = Library.confirm("Bạn có chắc chắn xóa nhóm quyền này?", "Thông báo");
      result.then(function (r) {
        if (r) {
          myclass.permissionmodel.delete(myclass.selectedItems[0]);  
        }
      });
    }
  }
}
