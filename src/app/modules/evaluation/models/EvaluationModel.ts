import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';

export class Evaluation {
    id: string = '';
    user_id:string = '';
    name: string = '';
    minus_point: string = '';
    group: string = '';
    type_countryside: string = '';
    year: string = '';
    order: string = '';
    status: string = '';
    is_send_district: any;
}
export class EvaluationList {
    id: string = '';
    evaluation_group_id:string = '';
    parrent_id: string = '';
    name: string = '';
    type: string = '';
    target: string = '';
    calculation_unit: string = '';
    order: string = '';
    enquire: string = '';
}
export class List {
    id: string;
    parrent_id: string;
    name: string;
    max_point: number;
    c_order:number;
}
export class User {
    id: string;
    text: string;
    expanded?: boolean;
    selected?: boolean;
    items?: User[];
}
export class ListInPer {
    id: string;
    text: string;
    expanded?: boolean;
    selected?: boolean;
    items?: ListInPer[];
}
export class Unit {
    id: string = '';
    name: string = '';
    code: string = '';
}
export class exeUnit {
    evaluation_id;
}

@Injectable()

export class EvaluationModel {
    _evaluation: Evaluation;
    objEvaluation: any;
    EvaluationList:any;
    _unit: Unit;
    units: Unit[];
    EvaluationGroupId:any;
    public Group:any;
    public listData: any;
    constructor(
        private HttpService: HttpService,
        private apiservice: ApiService,
        private route: Router, 
        private datepipe: DatePipe
    ) {}
    set Evaluation(value: any) {
        this._evaluation = value;
    }
    get Evaluation() {
        return this._evaluation;
    }
    setGroup(Group) {
         this.Group = Group;
    }
    getGroup() {
        return this.Group;
    }
    setEvaluationList(data) {
        return this.EvaluationList = data;
    }
    getEvaluationList() {
        return this.EvaluationList;
    }
    updatepermission(params,myClass) {
        this.apiservice.callPost('updatepermission', params).subscribe((response: any) => {
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
    getdatapermission(params,myClass) {
        params['id'] = this._evaluation.id;
        this.apiservice.callPost('getdatapermission', params).subscribe((response: any) => {
            myClass.users = response.user;
            myClass.list = response.list;
            myClass.permission = response.permission;
            Library.hideloading();
        });
        // return this.apiservice.callGet('getdatapermission', params);
    }
    getAllList(params) {
        this.HttpService.getMethods("evaluation/getallList", params).subscribe(
            result => {
             this.listData = result.data;
            },
            (error) => {
              Library.hideloading();
            }
          );
    }
    deleteEventtype(data, MyClass) {
        Library.showloading();
        this.HttpService.postMethods('evaluation/deletes', data).subscribe((response: any) => {
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
    deletePermission(data, MyClass) {
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
    deleteCriteria(data, MyClass) {
        Library.showloading();
        this.HttpService.postMethods('evaluation/deleteCriteria', data).subscribe((response: any) => {
            Library.hideloading();
            if (response.success) {
                Library.notify(response.message, 'success');
                let arrIddeleted = data.id.split(',');
                let index;
                arrIddeleted.forEach(element => {
                    index = this.listData.findIndex(data => data.id == element);
                    this.listData.splice(index, 1);
                });
                MyClass.loadList();
            } else {
                Library.notify(response.message, 'error');
            }
        });
    }
    sendEvalutionToDistrict(data, MyClass) {
        Library.showloading();
        this.HttpService.postMethods('evaluation/sendEvalutionToDistrict', data).subscribe((response: any) => {
        // this.apiservice.callPost('sendEvalutionToDistrict', data).subscribe((response: any) => {
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
}
