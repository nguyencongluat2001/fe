import { CUSTOM_ELEMENTS_SCHEMA, Component, NgModule, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Users, UsersModel } from '../../models/users.model';
import { Agency, AgencyModel } from '../../models/agency.model';
import { Departments, DepartmentsModel } from '../../models/departments.model';
import { ActivatedRoute } from '@angular/router';
import { UsersApi } from '../../services/users.service';
import { Library } from 'src/app/shared/library/main';
import { AddComponent } from '../add/add.component';
import { AddDonViComponent } from '../add/addDonvi.component';
import { AddCoquanComponent } from '../add/addCoquan.component';
import { HttpService } from 'src/app/core/http.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  listChildChanged = [];
  children:any;
  layout: any;
  item = {}
  link: any;
  onclickSidebar(item) {
    if (this.showMenu[item.id]) {
      this.showMenu[item.id] = false;
    } else {
      this.showMenu[item.id] = true;
    }
  }
  getShowHide(item) {
    return this.showMenu[item.id];
  }
  //
  showMenu = {};
  public isBadge() {
    return this.link.badge ? true : false
  }

  public isIcon() {
    return this.link.icon ? true : false
  }

  public isImages() {
    return this.link.images ? true : false
  }

  getListChildChanged() {
    console.log(this.listChildChanged);
  }

  //////////////////////////

  selectedItems: any;
  showTableDonvi = false;
  showTableCoquan = true;
  showTableUser = false;
  showSearch = false;
  bsModalRef: BsModalRef;
  users: Users[];
  tree: any;
  data: any;
  defaultAdd = false;
  defaultEdit = false;
  defaultDelete = false;
  idUnit = '';
  nameUnit = '';
  rootParent: any;
  userSearch: any;
  showButtonAdd = true;
  getNameDonvi = 'Tỉnh YÊN BÁI';
  getNameParent = '';
  getNameUnit = '';

  agencys: any;
  departments: Departments[];
  arr :any;
  constructor(
    private HttpService:HttpService,
    public route: ActivatedRoute,
    private ApiService: UsersApi,
    private modalService: BsModalService,
    public userModel: UsersModel,
    public departmentModel: DepartmentsModel,
    public agencyModel: AgencyModel) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // luatnc- đóng tạm
       let code = params['code'];
      //  console.log(code);

       if (code) {
        console.log(1);
        this.data = { id: params['parent_id'] };
        this.loadlist();
        this.loadchild(code);
      } else {
        console.log(2);
        this.loadchild(code);

        this.loadlist();
      }
    });
    this.getRootUnit();
    this.getPosition();
    this.getCapdonvi()
    // this.ApiService.getRootUnit().subscribe((response: any) => {
    //   this.departmentModel.setInfoRootUnit(response.data[0]);
    // });
  }

  toggleAdd() {
    this.defaultAdd = !this.defaultAdd;
  }

  toggleEdit() {
    this.defaultEdit = !this.defaultEdit;
  }

  toggleDelete() {
    this.defaultDelete = !this.defaultDelete;
  }

  // Load du lieu man hinh danh sach
  async loadlist() {
    // this.departments = [];
    if (this.data) {
      this.idUnit = this.data.id
    }
    // Load du lieu cay don vi
    Library.showloading();
    let userinfor = JSON.parse(localStorage.getItem('user_infor'));
    // this.departmentModel.getAllTreeNode(this.idUnit, userinfor['role'], userinfor['owner_code']);
    this.getAllTreeNode(this.idUnit, userinfor['role'], userinfor['owner_code']);
    Library.hideloading();
    // Danh sach don vi
    Library.showloading();
    this.agencys = await this.agencyModel.getAll(userinfor['role'], userinfor['owner_code']);
    Library.hideloading();
    this.agencyModel.max_agency_order = this.agencys.length;
    Library.showloading();
    // this.ApiService.getCapdonvi().subscribe((response) => {
    //   this.agencyModel.setCapdonvi(response);
    //   Library.hideloading();
    // });
    Library.showloading();
    this.getPosition();
    // this.ApiService.getPosition().subscribe((response) => {
    //   Library.hideloading();
    //   this.userModel.setPosition(response);
    // });
  }
  getPosition() {
    let params = {};
    this.HttpService.getMethods("users/getposition", params).subscribe(
        result => {
          Library.hideloading();
          this.userModel.setPosition(result.data);
         Library.hideloading();
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  getCapdonvi() {
    let params = {};
    this.HttpService.getMethods("users/getcapdonvi", params).subscribe(
        result => {
          this.agencyModel.setCapdonvi(result.data);
         Library.hideloading();
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  getdataRoot(){
    let data = {id: ""}
    this.getNameDonvi = 'Tỉnh YÊN BÁI';
    let code = 'donvi';
    this.loadchild(code);
    this.getAllUnitId(data);
  }
  getRootUnit() {
    let params = {};
    this.HttpService.getMethods("users/getroot_unit", params).subscribe(
        result => {
          this.departmentModel.setInfoRootUnit(result.data[0]);
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  getAllTreeNode(id,role,ownercode) {
    let params = {
        idUnit: id,
        role: role,
        ownercode: ownercode,
      };
    this.HttpService.getMethods("users/tree_getall", params).subscribe(
        result => {
          this.arr = result.data.children;
          this.tree = result.arr;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  selectedNode(e) {
    this.showButtonAdd = true;
    var code = e.type;
    this.nameUnit = code;
    var name = e.value;
    this.getNameDonvi = e.value;
    this.data = { id: e.id };
    this.userModel.setIdParent(this.data);
    this.departmentModel.parentName = name;
    this.loadchild(code);
  }

  loadchild(code) {
    Library.showloading();
    console.log(code)

    this.showSearch = false;
    if (code === 'coquan' ) {
      this.showTableCoquan = true;
      this.showTableDonvi = false;
      this.showTableUser = false;
      this.agencyModel.setSelectItems(false);
      this.getAllUnitId(this.data);
    }
    if (code === 'donvi' || code == undefined) {
      this.showTableDonvi = true;
      this.showTableCoquan = false;
      this.showTableUser = false;
      this.departmentModel.setSelectItems(false);
      this.getAllUnitId(this.data);
    }
    if (code === 'phongban') {
      this.showTableUser = true;
      this.showTableDonvi = false;
      this.showTableCoquan = false;
      this.userModel.setUser(null);
      Library.showloading();
      this.ApiService.getInfoParent(this.data).subscribe((response: any) => {
        this.getNameParent = response.parentName;
        this.getNameUnit = response.childName;
        Library.hideloading();
      });
      Library.showloading();
      this.ApiService.getUserById(this.data).subscribe((response: any) => {
        this.users = response;
        this.userModel.maxuserorder = this.users.length;
        Library.hideloading();
      });
    }
    Library.hideloading();
  }
  getAllUnitId(data) {
    this.HttpService.postMethods("users/unit_getAllById", data).subscribe(
        result => {
          this.departments = result.data;
          this.departmentModel.maxdepartmentorder = this.departments.length;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }

  add() {
    // them co quan
    if (this.showTableCoquan) {
      this.agencyModel.setAgency(null);
      this.bsModalRef = this.modalService.show(AddCoquanComponent, { class: 'modal-lg' });
    }
    // them phong ban
    if (this.showTableDonvi) {
      this.departmentModel.setDepartment(null);
      this.bsModalRef = this.modalService.show(AddDonViComponent, { class: 'modal-lg', initialState: this.data });
    }
    // them user
    if (this.showTableUser) {
      this.userModel.setUser(null);
      this.data.type = 'add';
      this.bsModalRef = this.modalService.show(AddComponent, { class: 'modal-lg', initialState: this.data });
    }

  }

  edit() {
    if (this.showTableCoquan) {
      this.selectedItems = this.agencyModel.getSelectItems();
    }
    if (this.showTableDonvi) {
      this.selectedItems = this.departmentModel.getSelectItems();
    }
    if (this.showTableUser) {
      this.selectedItems = this.userModel.getSelectItems();
    }
    if (this.showSearch) {
      this.selectedItems = this.userModel.getSelectItems();
    }
    let i = 0;
    let iditem;
    if (this.selectedItems.id == '' || this.selectedItems == '') {
      Library.notify("Vui lòng chọn đối tượng để sửa", 'error');
      return;
    }
    this.selectedItems.forEach((item) => {
      i++;
      iditem = item.id;
    });
    if (i > 1) {
      Library.notify("Không được chọn nhiều hơn 1", 'error');
    } else if (i == 1) {
      if (this.showTableCoquan) {
        this.agencyModel.setAgency(this.selectedItems[0]);
        this.bsModalRef = this.modalService.show(AddCoquanComponent, { class: 'modal-lg', initialState: this.data });
      }
      if (this.showTableDonvi) {
        this.departmentModel.setDepartment(this.selectedItems[0]);
        this.bsModalRef = this.modalService.show(AddDonViComponent, { class: 'modal-lg', initialState: this.data });
      }
      if (this.showTableUser) {
        this.userModel.setUser(this.selectedItems[0]);
        this.data.type = 'edit';
        this.bsModalRef = this.modalService.show(AddComponent, { class: 'modal-lg', initialState: this.data });
      }
      if (this.showSearch) {
        this.userModel.setUser(this.selectedItems[0]);
        this.bsModalRef = this.modalService.show(AddComponent, { class: 'modal-lg' });
      }
    }
  }

  delete() {
    if (this.showTableCoquan) {
      this.selectedItems = this.agencyModel.getSelectItems();
    }
    if (this.showTableDonvi) {
      this.selectedItems = this.departmentModel.getSelectItems();
    }
    if (this.showTableUser) {
      this.selectedItems = this.userModel.getSelectItems();
    }
    if (this.showSearch) {
      this.selectedItems = this.userModel.getSelectItems();
    }
    if (this.selectedItems.id == '') {
      Library.notify("Vui lòng chọn đối tượng để xóa", 'error');
      return;
    }
    let Myclass = this;
    let selectedItems = this.selectedItems;
    let ids = '';
    let data = {
      ids: "",
      parent_id: "",
      type: ""
    };
    let departments = this.departmentModel.getDepartment();
    let users = this.userModel.getUser();
    if (this.data) {
      data.parent_id = this.data.id;
      if (this.showTableDonvi) {
        data.type = departments.getType;
      } else if (this.showTableUser) {
        data.type = users.getType;
      }
    } else {
      if (selectedItems[0].unit_id) {
        data.parent_id = selectedItems[0].unit_id;
        data.type = 'phongban';
      }
    }
    var result = Library.confirm("Bạn có chắc chắn muốn xóa đối tượng đã chọn?", "Thông báo");
    if (this.showTableCoquan) {
      if (result) {
        result.then(function (dialogResult) {
          if (dialogResult) {
            selectedItems.forEach((item) => {
              ids += item.id + ',';
            });
            data.ids = ids;
            Myclass.agencyModel.deleteUnit(data, Myclass);
          }
        });
      }
    } else if (this.showTableDonvi) {
      let getRoute = this.departmentModel.getRouter();
      if (!getRoute) {
        let checkRoute = 'users';
        this.departmentModel.setCheckRoute(checkRoute);
      }
      if (result) {
        result.then(function (dialogResult) {
          if (dialogResult) {
            selectedItems.forEach((item) => {
              ids += item.id + ',';
            });
            data.ids = ids;
            Myclass.departmentModel.deleteUnit(data, Myclass);
          }
        });
      }
    } else if (this.showTableUser) {
      let getRoute = this.userModel.getRouter();
      if (!getRoute) {
        let checkRoute = 'users';
        this.userModel.setCheckRoute(checkRoute);
      }
      if (result) {
        this.userModel.setSelectItems(false);
        result.then(function (dialogResult) {
          if (dialogResult) {
            selectedItems.forEach((item) => {
              ids += item.id + ',';
            });
            data.ids = ids;
            Myclass.userModel.deleteUser(data, Myclass);
          }
        });
      }
    } else {
      let getRoute = this.userModel.getRouter();
      if (!getRoute) {
        let checkRoute = 'users';
        this.userModel.setCheckRoute(checkRoute);
      }
      if (result) {
        this.userModel.setSelectItems(false);
        result.then(function (dialogResult) {
          if (dialogResult) {
            selectedItems.forEach((item) => {
              ids += item.id + ',';
            });
            data.ids = ids;
            Myclass.userModel.deleteUser(data, Myclass);
          }
        });
      }
    }
  }

  searchUser() {
    this.showSearch = true;
    this.showButtonAdd = false;
    if (this.data) {
     // if (this.data.id == this.tree.id) {
      //  this.rootParent = '';
     // } else {
      //  this.rootParent = this.data.id;
      //}
    }
    this.showTableCoquan = false;
    this.showTableDonvi = false;
    this.showTableUser = false;
    let textSearch = $('#txt_search').val();
    Library.showloading();
    this.ApiService.getUserBySearch(this.rootParent, textSearch).subscribe((response) => {
      this.userSearch = response;
      Library.hideloading();
    });
  }
  
}
