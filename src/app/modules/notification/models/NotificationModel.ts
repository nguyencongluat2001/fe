import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { Library } from 'src/app/shared/library/main';

export class Notification {
    id:string='';
    user_id: string = localStorage.getItem('idUser');
    nameuser: string = JSON.parse(localStorage.getItem('user_infor'))['name'];
    content: string ='';
    data_time: Date;
    list_code: string='';
    title: string='';
    document: string;
    
}
export class Unit {
    id: string = '';
    name: string = '';
    code: string = '';
}
export class User {
    id: string;
    text: string;
    expanded?: boolean;
    selected?: boolean;
    items?: User[];
}
// export class List {
//     id: string;
//     parrent_id: string;
//     name: string;
//     max_point: number;
//     new_point: number;
//     explanation: string
//     listfile: string
// }

@Injectable()

export class NotificationModel {
    
    _notification: Notification;
    objNotification: any;
    _unit: Unit;
    units: Unit[];
    user_id: string = JSON.parse(localStorage.getItem('user_infor'))['id'];
    // private _list: List;
    private _dataview: any;
     
    constructor(private apiservice: NotificationService, private route: Router) {

    }
    async getUser(params,myClass) {
        // let response = await this.apiservice.callGet('getUser', params);
        // return response;
        this.apiservice.callPost('getUser', params).subscribe((response: any) => {
            myClass.users = response.user;
            Library.hideloading();
        });
    }
    async getAll_detail(async: boolean = false): Promise<Notification[]> {
        let parram = {};
        let response = await this.apiservice.callGet('getallDetail', parram);
        return response.data;
    }
    set Notification(value: any) {
        this._notification = value;
    }

    get Notification() {
        return this._notification;
    }
    async getAllList(params, async: boolean = false): Promise<Notification[]> {
        let response = await this.apiservice.callGet('getallList', params);
        return response;
    }
    // set setlist(value: any) {
    //     this._list = value;
    // }

    // get getlist() {
    //     return this._list;
    // }
    set dataview(value: any) {
        this._dataview = value;
    }
    get dataview() {
        return this._dataview;
    }
   

    update(data, activeModal) {
        Library.showloading();
        this.apiservice.callPost('update', data).subscribe((response: any) => {
            Library.hideloading();
            if (response.success) {
                Library.notify(response.message, 'success');
                // Kiểm tra nếu là thêm mới thì load lại dữ liệu màn hình danh sách
                // if (!data.id) {
                let newrouter = "";
                if (this.route.url == "/system/notification") {
                    newrouter = "/system/notification/index";
                } else {
                    newrouter = "/system/notification";
                }
                this.route.navigate([newrouter]);
                // }
                activeModal.hide();
            } else {
                Library.notify(response.message, 'error');
            }
        });
    }

    deleteEventtype(data, MyClass) {
        Library.showloading();
        this.apiservice.callPost('deletes', data).subscribe((response: any) => {
            if (response.success) {
                Library.notify(response.message, 'success');
                MyClass.loadList();
            } else {
                Library.notify(response.message, 'error');
            }
            Library.hideloading();
        }, error => {
            Library.hideloading();
            Library.notify(error, 'error');
        });
    }
    async getAllUnit(params, async: boolean = false): Promise<Unit[]> {
        let response = await this.apiservice.callGet('getallunit', params);
        return response;
    }
    getdatapermission(){
        return  this.apiservice.callGet('getdatapermission',{id:this._notification.id});
      }



}
