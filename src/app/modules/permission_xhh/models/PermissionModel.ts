import { PermissionService } from './../services/permission.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    selected?: boolean;
    items?: Modules[];
}
export class ListInPer {
    id: string;
    text: string;
    expanded?: boolean;
    selected?: boolean;
    items?: ListInPer[];
}
export class Permission {
    id              : string = '';
    code            : string = '';
    name            : string = '';
    list_code_module: string = '';
    list_id_user    : string = '';
    order           : number;
    status          : string = '';
    created_at      : string;
    updated_at      : string;
}
@Injectable()

export class PermissionModel {
    pemissions: any;
    evaluation_id: any;
    loadList: any;
    public objPermissionGroup: Permission;

    constructor(private HttpService:HttpService,private PermissionService: PermissionService, private route: Router) {

    }

    async getAll(parram, async: boolean = false): Promise<Permission[]> {
        let response = await this.PermissionService.callGet('getAll', parram);
        return response.data.data;
    }
    async getSubjectGroup(parram, async: boolean = false): Promise<Permission[]> {
        let response = await this.PermissionService.callGet('getSubjectGroup', parram);
        return response.data;
    }
    getdatapermission(params, myClass) {
        Library.showloading();
        this.HttpService.postMethods("permission_xhh/getdatapermission", params).subscribe(
            response => {
        // this.PermissionService.callPost('getdatapermission', params).subscribe(
        //     (response: any) => {
                Library.hideloading();
                if(response.status){
                    myClass.users = response.data.user;
                    myClass.modules = response.data.modules;
                    myClass.list = response.data.list;
                }
            }
        );
    }

    update(data) {
        Library.showloading();
        this.HttpService.postMethods("permission_xhh/update", data).subscribe(
            response => {
        // this.PermissionService.callPost('update', data).subscribe((response: any) => {
            Library.hideloading();
            if (response.data.status == true) {
                Library.notify(response.data.message, 'success');
                this.route.navigate(['system/permission_xhh']);
            } else {
                Library.notify(response.data.message, 'error');
            }
        });
    }
    delete(data, myClass) {
        Library.showloading();
        this.HttpService.postMethods("permission_xhh/delete", data).subscribe(
            response => {
        // this.PermissionService.callPost('delete', data).subscribe((response: any) => {
            if (response.data.status == true) {
                Library.notify(response.data.message, 'success');
                myClass.loadList();
            } else {
                Library.notify(response.data.message, 'error');
            }
            Library.hideloading();
        }, error => {
            Library.hideloading();
            Library.notify(error, 'error');
        });
    }
}
