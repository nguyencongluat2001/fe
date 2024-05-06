import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersApi } from '../services/users.service';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';


export class Departments {
    id: string = '';
    code: string = null;
    parent_id: string = '1';
    hierarchy: string = '2';
    address: string = '';
    name: string = null;
    status: number = 1;
    phone_number: string = '';
    website: string = '';
    fax: string = '';
    email: string = '';
    order: number = 0;
    donvichuquan: string = '';
    contact: string = '';
    diadanh: string = '';
    report_uppercase: string = '';
    report_lowercase: string = '';
    type: string = 'phongban';
    getType: string = 'donvi';
    capdonvi: string = '';
}

@Injectable()
export class DepartmentsModel {
    tree:any;
    departments: Departments[];
    department: Departments;
    parentName: any;
    items: any;
    checkRoute: any;
    infoRootUnit: any;
    public maxdepartmentorder: number = 0;

    constructor(private HttpService:HttpService,private ApiService: UsersApi
        , private router: Router
    ) { }

    setDepartments(data) {
        this.departments = data;
    }

    getDepartments() {
        return this.departments;
    }

    setDepartment(data) {
        this.department = data;
    }

    getDepartment() {
        if (!this.department) {
            this.department = new Departments();
            this.department.order = this.maxdepartmentorder + 1;
        }
        return this.department;
    }

    setSelectItems(data) {
        this.items = data;
    }

    getSelectItems() {
        if (!this.items) {
            this.items = new Departments();
        }
        return this.items;
    }

    setCheckRoute(route) {
        this.checkRoute = route;
    }

    getRouter() {
        return this.checkRoute;
    }

    setInfoRootUnit(data) {
        this.infoRootUnit = data;
    }

    getInfoRootUnit() {
        return this.infoRootUnit;
    }
    async getAllTreeNode(id,role,ownercode): Promise<any> {
        let response = await this.ApiService.getAllTree(id,role,ownercode);
        return response;
    }
    update(data, activeModal) {
        Library.showloading();
        this.HttpService.postMethods("users/unit_update", data).subscribe(
            response => {
            Library.hideloading();
            if (response.success) {
                Library.notify(response.message, 'success');
                let check = this.getRouter();
                // Kiểm tra nếu là thêm mới thì load lại dữ liệu màn hình danh sách
                if (!data.id) {
                    let newrouter = "";
                    if (check == 'users') {
                        newrouter = "/system/users/users";
                        this.setCheckRoute('users/users');
                    } else {
                        newrouter = "/system/users";
                        this.setCheckRoute('users');
                    }
                    // this.router.navigate([newrouter], { queryParams: { parent_id: data.parent_id, code: data.getType } });
                    this.router.navigate([newrouter]);

                }
                activeModal.hide();
            } else {
                Library.notify(response.message, 'error');
            }

        });
    }

    deleteUnit(data, MyClass) {
        Library.showloading();
        this.HttpService.postMethods("users/deletesUnit", data).subscribe(
            response => {
            if (response.success) {
                Library.notify(response.message, 'success');
                let newrouter = "";
                let check = this.getRouter();
                if (check == 'users') {
                    newrouter = '/system/users/index';
                    this.setCheckRoute('users/index');
                } else {
                    newrouter = '/system/users';
                    this.setCheckRoute('users');
                }
                this.router.navigate([newrouter]);
            } else {
                Library.notify(response.message, 'error');
            }
            Library.hideloading();
        }, error => {
            Library.hideloading();
            Library.notify(error, 'error');
        });
    }
}