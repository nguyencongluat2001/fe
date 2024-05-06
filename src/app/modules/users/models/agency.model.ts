import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Library } from 'src/app/shared/library/main';
import { UsersApi } from '../services/users.service';
import { HttpService } from 'src/app/core/http.service';


export class Agency {
    id: string = '';
    code: string = null;
    parent_id: string = '';
    hierarchy: string = '1';
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
    type: string = 'donvi';
    nameParent: string = '';
    capdonvi: string = '';
}


@Injectable()
export class AgencyModel {
    agencys: Agency[];
    agency: Agency;
    items: any;
    capdonvi: any;
    public max_agency_order: number = 1;

    constructor(
        private HttpService:HttpService,
        private ApiService: UsersApi
        , private router: Router
    ) {
    }

    async getAll(role, owner_code, async: boolean = false) {
        let params = {
            role: role,
            ownercode: owner_code,
          };
        this.HttpService.getMethods("users/unit_getall", params).subscribe(
            response => {
                if (response) {
                    this.setAgencys(response.data);
                    return this.agencys;
                }
                return true;
            })
    }

    update(data, activeModal) {
        Library.showloading();
        this.HttpService.postMethods("users/unit_update", data).subscribe(
            response => {
            if (response.success) {
                Library.notify(response.message, 'success');
                // if (!data.id) {
                let newrouter = "";
                if (this.router.url == "/system/users") {
                    newrouter = "/system/users/users";
                } else {
                    newrouter = "/system/users";
                }
                this.router.navigate([newrouter]);
                // }
                activeModal.hide();
            } else {
                Library.notify(response.message, 'error');
            }
            Library.hideloading();
        });
    }

    deleteUnit(data, MyClass) {
        Library.showloading();
        this.HttpService.postMethods("users/deletesUnit", data).subscribe(
            response => {
            if (response.success) {
                let newrouter = "";
                Library.notify(response.message, 'success');
                if (this.router.url == "/system/users") {
                    newrouter = "/system/users/users";
                } else {
                    newrouter = "/system/users";
                }
                this.router.navigate([newrouter]);
                // MyClass.loadlist();
            } else if (response.count) {
                Library.notify('Vui lòng xóa các đơn vị con trước', 'error');
            } else {
                Library.notify(response.message, 'error');
            }
            Library.hideloading();
        }, error => {
            Library.hideloading();
            Library.notify(error, 'error');
        });
    }

    setAgencys(data) {
        this.agencys = data;
    }

    getAgencys() {
        return this.agencys;
    }

    setAgency(data) {
        this.agency = data;
    }

    getAgency() {
        if (!this.agency) {
            this.agency = new Agency();
            this.agency.order = this.max_agency_order;
        }
        return this.agency;
    }

    setSelectItems(data) {
        this.items = data;
    }

    getSelectItems() {
        if (!this.items) {
            this.items = new Agency();
        }
        return this.items;
    }

    setCapdonvi(data) {
        this.capdonvi = data;
    }

    getCapdonvi() {
        return this.capdonvi;
    }

}