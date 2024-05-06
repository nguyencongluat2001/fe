import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Library } from 'src/app/shared/library/main';
import { UsersApi } from '../services/users.service';
import { HttpService } from 'src/app/core/http.service';

export class Users {
    id: string = '';
    unit_id: string = '';
    username: string = null;
    password: string = null;
    repassword: string = null;
    name: string = null;
    department: string = '';
    position: string = '';
    role: string = '3';
    status: string = '1';
    order: number = 2;
    remember_token: string = null;
    phone_number: string = null;
    email: string = null;
    type: string = 'user';
    nameParent: string = '';
    getType: string = 'phongban';
}


@Injectable()
export class UsersModel {
    users: Users[];
    user: Users;
    items: any;
    position: any;
    checkRoute: any;
    public maxuserorder: number = 0;
    

    constructor(
        private HttpService:HttpService,
        private ApiService: UsersApi
        , private router: Router
    ) { }

    update(data, activeModal) {
        Library.showloading();
        this.HttpService.postMethods("users/user_update", data).subscribe(
            response => {
            Library.hideloading();
            if (response.success) {
                Library.notify(response.message, 'success');
                let check = this.getRouter();
                // Kiểm tra nếu là thêm mới thì load lại dữ liệu màn hình danh sách
                // if (!data.id) {
                let newrouter = "";
                if (check == 'users') {
                    newrouter = "/system/users/users";
                    this.setCheckRoute('users/users');
                } else {
                    newrouter = "/system/users";
                    this.setCheckRoute('users');
                }
                this.router.navigate([newrouter], { queryParams: { parent_id: data.unit_id, code: data.getType } });
                // }
                activeModal.hide();
            } else {
                Library.notify(response.message, 'error');
            }

        });
    }

    deleteUser(data, MyClass) {
        Library.showloading();
        this.HttpService.postMethods("users/deletesUser", data).subscribe(
            response => {
            if (response.success) {
                Library.notify(response.message, 'success');
                let newrouter = "";
                let check = this.getRouter();
                if (check == 'users') {
                    newrouter = '/system/users/users';
                    this.setCheckRoute('users/users');
                } else {
                    newrouter = '/system/users';
                    this.setCheckRoute('users');
                }
                this.router.navigate([newrouter], { queryParams: { parent_id: data.parent_id, code: data.type } });
            } else {
                Library.notify(response.message, 'error');
            }
            Library.hideloading();
        }, error => {
            Library.hideloading();
            Library.notify(error, 'error');
        });
    }

    setUsers(data) {
        this.users = data;
    }

    // lay chuoi json serve tra ve
    getUsers() {
        return this.users;
    }

    // set gia tri khi mot object selected
    setUser(data) {
        this.user = data;
    }

    // lay gia tri duoc chon tu ham setUser
    getUser() {
        if (!this.user) {
            this.user = new Users();
            this.user.order = this.maxuserorder + 1;
        }
        return this.user;
    }

    setSelectItems(data) {
        this.items = data;
    }

    getSelectItems() {
        if (!this.items) {
            this.items = new Users();
        }
        return this.items;
    }

    idParent: any;

    setIdParent(data) {
        this.idParent = data;
    }

    getIdParent() {
        return this.idParent;
    }

    setPosition(data) {
        this.position = data;
    }

    getPosition() {
        return this.position;
    }

    setCheckRoute(route) {
        this.checkRoute = route;
    }

    getRouter() {
        return this.checkRoute;
    }

}