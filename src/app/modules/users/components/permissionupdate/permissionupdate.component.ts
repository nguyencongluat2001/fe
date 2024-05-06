import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionModel, User, ListInPer, Modules } from '../../models/permission.model';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-permissionupdate',
  templateUrl: './permissionupdate.component.html',
  styleUrls: ['./permissionupdate.component.scss']
})
export class PermissionupdateComponent implements OnInit {
  users: User[] = [];
  list: ListInPer[] = [];
  modules: Modules[] = [];
  checkedUsers: User[] = [];
  checkedModule: ListInPer[] = [];
  constructor(private HttpService:HttpService,public permissionmodel: PermissionModel, private route: Router, ) {
    this.loaddata();
  }

  ngOnInit() {
  }

  async loaddata() {
    let myclass = this;
    await this.permissionmodel.getdatapermission(this.permissionmodel.objPermissionGroup,myclass);
    if (this.permissionmodel.objPermissionGroup['list_code_module'] != '') {
      let arrModulesingle = this.permissionmodel.objPermissionGroup['list_code_module'].split(',');
      let arrUseridSingle = this.permissionmodel.objPermissionGroup['list_id_user'].split(',');
      this.checkedUsers = [];
      this.checkedModule = [];
      for (let x in arrModulesingle) {
        this.checkedModule.push({ id: arrModulesingle[x], text: 'xxxx' });
      }
      for (let x in arrUseridSingle) {
        this.checkedUsers.push({ id: arrUseridSingle[x], text: 'xxxx' });
      }
    }
  }
  async update() {
    let listiduser = '', listcodemodule = '';
    this.checkedUsers.forEach(elemment => {
      listiduser += ',' + elemment['id'];
    });
    console.log(555,this.checkedModule);
    this.checkedModule.forEach(elemment => {
      if(elemment['itemData']){
          listcodemodule += ',' + elemment['itemData'].code;
      }
      if(!elemment['itemData']){
        listcodemodule += ',' + elemment.id;
      }
    });
    if (listiduser == '') {
      Library.notify('Chưa chọn người dùng', 'error');
      return;
    }
    if (listcodemodule == '') {
      Library.notify('Chưa chọn module', 'error');
      return;
    }
    if (this.permissionmodel.objPermissionGroup['code'] == '') {
      return;
    }
    if (this.permissionmodel.objPermissionGroup['name'] == '') {
      return;
    }

    let params = {
      objPermissionGroup: this.permissionmodel.objPermissionGroup,
      listiduser: listiduser,
      listcodemodule: listcodemodule
    }
    this.updatePermissionGroup(params);
  }
  updatePermissionGroup(params) {
    this.HttpService.postMethods("users/permissionupdate", params).subscribe(
        result => {
          if (!result.success) {
                Library.notify(result.message, 'error');
                return;
              } else {
                let newrouter = "/system/users/permission";
                this.route.navigate([newrouter]);
                Library.notify(result.message, 'success');
              }
        },
        (error) => {
          Library.hideloading();
        }
      );
}
  quaylai() {
    let newrouter = "/system/users/permission";
    this.route.navigate([newrouter]);
  }

  // Xử lý phần cây user
  selectionUserChanged(e) {
    let value = e.node;
    let nodelevel = this.getnodelevel(value);
    if (nodelevel == 1) {
      value.items.forEach((User, index) => {
        User.items.forEach((User2, index2) => {
          this.processUser({
            id: User2.key,
            text: User2.text,
            itemData: User2.itemData,
            selected: User2.selected,
            category: User2.text
          });
        });

      });
    } else if (nodelevel == 2) {
      value.items.forEach((User, index) => {
        this.processUser({
          id: User.key,
          text: User.text,
          itemData: User.itemData,
          selected: User.selected,
          category: value.text
        });
      });
    } else {
      this.processUser({
        id: value.key,
        text: value.text,
        itemData: value.itemData,
        selected: value.selected,
        category: value.parent.text
      });
    }
  }

  getnodelevel(data) {
    if (data.parent == null) {
      return 1;
    } else {
      if (data.parent.parent == null) {
        return 2;
      } else {
        return 3;
      }

    }
  }

  processUser(User) {
    console.log(1);
    let itemIndex = -1;
    this.checkedUsers.forEach((item, index) => {
      if (item.id === User.id) {
        itemIndex = index;
        return false;
      }
      return true;
    });
    if (User.selected && itemIndex === -1) {
      this.checkedUsers.push(User);
    } else if (!User.selected) {
      this.checkedUsers.splice(itemIndex, 1);
    }
  }
  // ket thuc Xử lý  phần cây user
    // Xu ly list linh vuc
    selectionModuleControllerChanged(e) {
      let value = e.node;
      let nodelevel = this.getnodelevel(value);
      if (nodelevel == 1) {
        value.items.forEach((modules, index) => {
          modules.items.forEach((module2, index2) => {
            this.processListModuleInPer({
              id: module2.key,
              text: module2.text,
              itemData: module2.itemData,
              selected: module2.selected,
              category: module2.text
            });
          });
  
        });
      } else if (nodelevel == 2) {
        value.items.forEach((modules, index) => {
          this.processListModuleInPer({
            id: modules.key,
            text: modules.text,
            itemData: modules.itemData,
            selected: modules.selected,
            category: value.text
          });
        });
      } else {
        this.processListModuleInPer({
          id: value.key,
          text: value.text,
          itemData: value.itemData,
          selected: value.selected,
          category: value.parent.text
        });
      }
    }
    processListModuleInPer(List) {
      let itemIndex = -1;
      this.checkedModule.forEach((item, index) => {
        if (item.id === List['itemData'].code) {
          itemIndex = index;
          return false;
        }
        return true;
      });

      if (List.selected && itemIndex === -1) {
        this.checkedModule.push(List);
      } else if (!List.selected) {
        this.checkedModule.splice(itemIndex, 1);
      }
    }
  // Xu ly list linh vuc
  selectionModuleChanged(e) {
    let value = e.node;
    this.processListInPer({
      id: value.key,
      text: value.text,
      itemData: value.itemData,
      selected: value.selected,
      category: null
    });
  }
  processListInPer(List) {
    let itemIndex = -1;
    this.checkedModule.forEach((item, index) => {
      if (item.id === List.id) {
        itemIndex = index;
        return false;
      }
      return '';
    });
    if (List.selected && itemIndex === -1) {
      this.checkedModule.push(List);
    } else if (!List.selected) {
      this.checkedModule.splice(itemIndex, 1);
    }
  }
}
