import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersApi } from '../services/users.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';
export class User {
    id: string;
    text: string;
    expanded?: boolean;
    selected?: boolean;
    items?: User[];
}
export class Modules {
    id: string;
    text: string;
    expanded?: boolean;
    selected?: boolean = false;
    items?: Modules[];
}
export class ListInPer {
    id: string;
    text: string;
    expanded?: boolean;
    selected?: boolean = false;
    items?: ListInPer[];
}
export class PermissionGroup {
    id: string = '';
    code: string = '';
    name: string = '';
    list_code_module: string = '';
    list_id_user: string = '';
    status: boolean = true;
}
@Injectable()
export class PermissionModel {
    public listpermissiongroup: any;
    private baseUrl: string;
    headers: any;
    public objPermissionGroup: PermissionGroup;
    constructor(private HttpService:HttpService,private usersapi: UsersApi, private route: Router, private http: HttpClient) {
        // this.baseUrl = environment.API_URL + 'users/';
        // // set headers
        // let token = localStorage.getItem('token');
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // headers.append('Accept', 'application/json');
        // headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN');
        // headers.append('Authorization', `Bearer ${token}`);
        // this.headers = headers;
    }
    // async  getalldata(async: boolean = false) {
    //     let parram = {};
    //     let response = await this.callGet('permisiongetall', parram);
    //     this.listpermissiongroup = response;

    // }
    getalldata() {
        let params = {};
        this.HttpService.getMethods("users/permisiongetall", params).subscribe(
            result => {
              this.listpermissiongroup = result.data;
            },
            (error) => {
              Library.hideloading();
            }
          );
      }

    async callGet(url, params): Promise<any> {
        let options = { params: params, headers: this.headers };
        try {
            let response = await this.http
                .get(this.baseUrl + url, options)
                .toPromise();
            return response;
        } catch (error) {
            if (error.type == 3) {
                Library.notify("Request header field X-XSRF-TOKEN is not allowed by Access-Control-Allow-Headers in preflight response.", 'error');
            } else {
                Library.notify(error, 'error');
            }
        }
    }
    getdatapermission(params, myclass) {
        // this.callPost('users/getdatapermission', params).subscribe((response: any) => {
        //     myclass.users = response.user;
        //     myclass.modules = response.modules;
        //     myclass.list = response.list;
        //     Library.hideloading();
        // });
        this.HttpService.postMethods("users/getdatapermission", params).subscribe(
            result => {
            //   this.listpermissiongroup = result.data;
              myclass.users = result.data.user;
              myclass.modules = result.data.modules;
              myclass.list = result.data.list;
              Library.hideloading();
            },
            (error) => {
              Library.hideloading();
            }
          );
    }
    // updatePermissionGroup(params) {
    //     return this.callPost('users/permissionupdate', params);
    // }
    // callPost(url: any, data: any) {
    //     let urlParams = new URLSearchParams();
    //     urlParams.append('method', 'add');
    //     let options = {
    //         headers: this.headers, search: urlParams
    //     };
    //     return this.http.post<any>(this.baseUrl + url, data, options).pipe((data) => {
    //         return data;
    //       });
    // }
    // updatePermissionGroup(params) {
    //     this.HttpService.postMethods("users/permissionupdate", params).subscribe(
    //         result => {
    //           Library.hideloading();
    //           return result.data;
    //         },
    //         (error) => {
    //           Library.hideloading();
    //         }
    //       );
    // }
    delete(obj) {
        let myclass = this;
        this.HttpService.postMethods("users/permissiondelete", obj).subscribe(
            result => {
                if (result.success) {
                    this.route.routeReuseStrategy.shouldReuseRoute = function () {
                        return false;
                    }
                    this.route.navigated = false;
                    this.route.navigate([myclass.route.url]);
                }
            },
            (error) => {
              Library.hideloading();
            }
          );
    }
    // delete(obj) {
    //     let myclass = this;
    //     this.callPost('permissiondelete', obj).subscribe(res => {
    //         if (res.success) {
    //             this.route.routeReuseStrategy.shouldReuseRoute = function () {
    //                 return false;
    //             }
    //             this.route.navigated = false;
    //             this.route.navigate([myclass.route.url]);
    //         }

    //     });
    // }



}