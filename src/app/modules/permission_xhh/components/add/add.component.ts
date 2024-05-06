import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ListInPer, Modules, PermissionModel, User } from '../../models/PermissionModel';
import { Library } from 'src/app/shared/library/main';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  users: User[] = [];
  modules: Modules[] = [];
  list: ListInPer[] = [];
  checkedUsers: User[] = [];
  checkedModule: Modules[] = [];

  constructor(public PermissionModel: PermissionModel, private router: Router) { }

  ngOnInit() {
    this.loaddata();
  }

  async loaddata() {
    let myclass = this;
    await this.PermissionModel.getdatapermission(this.PermissionModel.objPermissionGroup, myclass);
    if (this.PermissionModel.objPermissionGroup['list_code_module'] != '') {
      let arrModulesingle = this.PermissionModel.objPermissionGroup['list_code_module'].split(',');
      let arrUseridSingle = this.PermissionModel.objPermissionGroup['list_id_user'].split(',');
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
  /**
   * Danh sách Người dùng
   */
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
  /**
   * Danh sách module
   */
  selectionModuleControllerChanged(e) {
    let value = e.node;
    let nodelevel = this.getnodelevel(value);
    if (nodelevel == 1) {
      value.items.forEach((modules, index) => {
          this.processListModuleInPer({
            id: modules.key,
            text: modules.text,
            itemData: modules.itemData,
            selected: modules.selected,
            category: modules.text
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
  /**
   * Menu cấp
   */
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
  /**
   * Danh sách người dùng
   */
  processUser(User) {
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
  /**
   * Danh sách module
   */
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

  quaylai() {
    let newrouter = "/system/permission_xhh";
    this.router.navigate([newrouter]);
  }
  async update() {
    let listiduser = '', listcodemodule = '';
    this.checkedUsers.forEach(elemment => {
      listiduser += ',' + elemment['id'];
    });
    this.checkedModule.forEach(elemment => {
      if (elemment['itemData']) {
        listcodemodule += ',' + elemment['itemData'].code;
      }
      if (!elemment['itemData']) {
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
    if (this.PermissionModel.objPermissionGroup['code'] == '') {
      return;
    }
    if (this.PermissionModel.objPermissionGroup['name'] == '') {
      return;
    }

    let params = {
      objPermissionGroup: this.PermissionModel.objPermissionGroup,
      listiduser: listiduser,
      listcodemodule: listcodemodule
    }
    this.PermissionModel.update(params);
  }

}
