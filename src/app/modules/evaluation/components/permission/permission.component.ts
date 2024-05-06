import { Component, OnInit, Input } from "@angular/core";
import { EvaluationModel, User, ListInPer } from "../../models/EvaluationModel";
import { ActivatedRoute, Router } from "@angular/router";
// import { stringify } from "querystring";
import { Library } from "src/app/shared/library/main";
import { HttpService } from "src/app/core/http.service";
@Component({
  selector: "app-permission",
  templateUrl: "./permission.component.html",
  styleUrls: ["./permission.component.scss"],
})
export class PermissionComponent implements OnInit {
  constructor(private HttpService: HttpService, private evaluationmodel: EvaluationModel, private route: Router) {
    this.loaddata();
  }
  permission: any;
  users: User[];
  checkedUsers: User[] = [];
  checkedLists: ListInPer[] = [];
  selectRowListData: any;
  list: ListInPer[];
  list_evalution_list_id_single = "xx";
  list_user_id_single = "xx";
  permissionSelected;
  ngOnInit() {}

  async loaddata() {
    let myclass = this;
    let params = {
      list_evalution_list_id_single: this.list_evalution_list_id_single,
      list_user_id_single: this.list_user_id_single,
    };
    Library.showloading();
    this.getdatapermission(params, myclass);
    // await this.evaluationmodel.getdatapermission(params, myclass);
  }
  getdatapermission(params,myClass) {
    params['id'] = this.evaluationmodel._evaluation.id;
    this.HttpService.postMethods('evaluation/getdatapermission', params).subscribe((response: any) => {
        myClass.users = response.user;
        myClass.list = response.list;
        myClass.permission = response.permission;
        Library.hideloading();
    });
    // return this.apiservice.callGet('getdatapermission', params);
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
            category: User2.text,
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
          category: value.text,
        });
      });
    } else {
      this.processUser({
        id: value.key,
        text: value.text,
        itemData: value.itemData,
        selected: value.selected,
        category: value.parent.text,
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
  // Xu ly list linh vuc
  selectionListChanged(e) {
    console.log(2,e)
    let value = e.node;
    if (value.items == "") {
      this.processListInPer({
        id: value.key,
        text: value.text,
        itemData: value.itemData,
        selected: value.selected,
        category: null,
      });
    } else {
      this.processListInperParrent(value);
    }
  }
  processListInperParrent(ListParent) {
    if (ListParent.items == "") {
      this.processListInPer({
        id: ListParent.key,
        text: ListParent.text,
        itemData: ListParent.itemData,
        selected: ListParent.selected,
        category: null,
      });
    } else {
      ListParent.items.forEach((ListInPer, index) => {
        this.processListInperParrent(ListInPer);
      });
     
    }
  }
  processListInPer(List) {
    let itemIndex = -1;
    this.checkedLists.forEach((item, index) => {
      if (item.id === List.id) {
        itemIndex = index;
        return false;
      }
      return true;
    });
    if (List.selected && itemIndex === -1) {
      this.checkedLists.push(List);
    } else if (!List.selected) {
      this.checkedLists.splice(itemIndex, 1);
    }
  }

  async savepermission() {
    let listuser = "",
      listusername = "";
    this.checkedUsers.forEach((element) => {
      listuser += "," + element.id;
      listusername += "<br/> " + element["text"];
    });
    let listlist = "",
      listlistname = "";
    this.checkedLists.forEach((element) => {
      listlist += "," + element.id;
      listlistname += "<br/> " + element["text"];
    });
    if (listuser == "" || listuser == ",") {
      Library.notify("Chưa chọn người dùng", "error");
      return;
    }
    if (listlist == "" || listlist == ",") {
      Library.notify("Chưa chọn lĩnh vực", "error");
      return;
    }
    let params = {
      listuser: listuser,
      listusername: listusername,
      listlist: listlist,
      listlistname: listlistname,
      permissionSelected: this.permissionSelected,
      evaluation_id: this.evaluationmodel._evaluation.id,
    };
    var myClass = this;
    console.log(params);
    this.updatepermission(params, myClass);
    // this.evaluationmodel.updatepermission(params, myClass);
  }
  onRowPrepared(e) {
    if (e.rowType == "data") {
      if (e.rowIndex % 2 == 0) {
        // $(e.rowElement).addClass("dx-column-lines-color");
      }
    }
  }
  async selectPermission(e) {
    if (e.selectedRowsData.length > 0) {
      console.log(e.selectedRowsData)
      this.permissionSelected = e.selectedRowsData[0]["id"];
      this.list_evalution_list_id_single =
        e.selectedRowsData[0]["list_evalution_list_id"];
      var list_evalution_list_name =
        e.selectedRowsData[0]["list_evalution_list_name"];
      var list_user_name = e.selectedRowsData[0]["list_user_name"];
      this.list_user_id_single = e.selectedRowsData[0]["list_user_id"];
      // console.log( this.list_evalution_list_id_single);
      // console.log( this.list_user_id_single);
      this.loaddata();
      let arrlistsingle = this.list_evalution_list_id_single.split(",");
      let arr_evalution_list_name = list_evalution_list_name.split("<br/>");
      let arr_user_name = list_user_name.split("<br/>");
      let arr_user_id = this.list_user_id_single.split(",");
      this.checkedLists = [];
      this.checkedUsers = [];
      for (let x in arrlistsingle) {
        this.checkedLists.push({
          id: arrlistsingle[x],
          text: arr_evalution_list_name[x],
        });
      }
      for (let x in arr_user_id) {
        this.checkedUsers.push({ id: arr_user_id[x], text: arr_user_name[x] });
      }
    } else {
      this.checkedLists = [];
      this.checkedUsers = [];
      this.permissionSelected = "";
      this.list_evalution_list_id_single = "xx";
      this.list_user_id_single = "xx";
      this.route.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.route.navigated = false;
      this.route.navigate([this.route.url]);
      this.loaddata();
    }
  }
  deletePermission(id) {
    let params = {
      id: id,
    };
    var myClass = this;
    var result = Library.confirm(
      "Bạn có chắc chắn muốn xóa đối tượng đã chọn?",
      "Thông báo"
    );
    if (result) {
      result.then(function (r) {
        if (r) {
          // this.deletePermission_chile(params, myClass);
          myClass.evaluationmodel.deletePermission(params, myClass);
        }
      });
    }
  }
  updatepermission(params,myClass) {
    this.HttpService.postMethods('evaluation/updatepermission', params).subscribe((response: any) => {
        Library.hideloading();
        if (response.success) {
            Library.notify(response.message, 'success');
            myClass.loaddata()
            myClass.list_evalution_list_id_single = 'xx';
            myClass.list_user_id_single = 'xx';
            myClass.checkedLists = [];
            myClass.checkedUsers = [];
        } else {
            Library.notify(response.message, 'error');
        }
    });
}

deletePermission_chile(data, MyClass) {
    Library.showloading();
    this.HttpService.postMethods('evaluation/deletepermission', data).subscribe((response: any) => {
        if (response.success) {
            Library.notify(response.message, 'success');
            MyClass.list_evalution_list_id_single = 'xx'
            MyClass.list_user_id_single = 'xx'
            MyClass.loaddata();
        } else {
            Library.notify(response.message, 'error');
        }
        Library.hideloading();
    }, error => {
        Library.hideloading();
        Library.notify(error, 'error');
    });
}
  goBack() {
    let newrouter = "/system/evaluation";
    this.route.navigate([newrouter]);
  }
}
