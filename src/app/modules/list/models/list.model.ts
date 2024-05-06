import { Injectable } from '@angular/core';
import {ListApi } from '../services/list-api.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';

export class List {
    id: number |boolean = false;
    code: string = '';
    name: string = '';
    code_unit: string = '';
    note: string = '';
    status: number = 1;
    order: number = 1;
}

@Injectable()
export class ListModel {
    
    lists: any;
    list: any;
    orderNext: number;
    code_unit:any;
    baseUrl : string;
    headers: any;
    constructor(private HttpService: HttpService,private ListApi: ListApi
        , private router: Router,
    ) {
        this.baseUrl = environment.API_URL + 'listtype/list/';
        // set headers
        let token = localStorage.getItem('token');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN');
        headers.append('Authorization', `Bearer ${token}`);
        this.headers = headers;
    }

    async getAll(id, async: boolean = false): Promise<void> {
        let response = await this.ListApi.getAll(id);
        this.setLists(response.data);
        return this.getLists();
    }

    async getAllByCode(code, async: boolean = false): Promise<void> {
        let response = await this.ListApi.getAllByCode(code);
        return response;
    }
   
    setLists(data){
        if(data){
            this.lists = data;
        }
    }

    getLists(){
        return this.lists;
    }

    setList(data){
        this.list = data;
    }

    getList(){
        return this.list;
    }

    getdefault(){
        return {
            "code": "",
            "name": "",
            "code_unit": this.code_unit,
            "note": "",
            "order": this.orderNext,
            "status": true
        };
    }

    update(dataUpdate,activeModal,e){
        Library.showloading();
        // Cap nhat vao database
        this.HttpService.postMethods("listtype/list/update", dataUpdate).subscribe(
            response => {
        // this.ListApi.update(dataUpdate).subscribe((response: any) => {
            if (response.success) {
                Library.notify(response.message, 'success');
                // Kiem tra them moi hay sua
                let newrouter = "";
                if (this.router.url == "/system/list") {
                newrouter = "/system/list/index";
                } else {
                newrouter = "/system/list";
                }
                this.router.navigate([newrouter]);
                activeModal.hide();
            } else {
                Library.notify(response.message, 'error');
            }
            Library.hideloading();
        }, error => {
            Library.hideloading();
            Library.notify(error, 'error');
        });
    }

    delete(data,Myclass){
        Library.showloading();
        this.HttpService.postMethods("listtype/list/deletes", data).subscribe(
            response => {
        // this.ListApi.delete(data).subscribe((response: any) => {
            if (response.success) {
              Library.notify(response.message, 'success');
              Myclass.loadlist();
            } else {
              Library.notify(response.message, 'error');
            }
            Library.hideloading();
          }, error => {
            Library.hideloading();
            Library.notify(error, 'error');
          });
    }
    getCode_unit(){
        // Cap nhat vao database
        this.ListApi.get('').subscribe((response: any) => {
                this.code_unit = response;
        }, error => {
            Library.notify(error, 'error');
        });
    }

}