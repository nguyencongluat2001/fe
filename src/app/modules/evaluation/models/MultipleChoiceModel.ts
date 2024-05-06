import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';



export class Evaluation {
    id: string = '';
    name: string = '';
    total_score: string = '';
    reward_points: string = '';
    minus_point: string = '';
    group: string = '';
    fromdate: string = '';
    todate: string = '';
    order: string = '';
    status: number = 0;
    user_id: string = '';
    is_send_district:any;
}

export class Multiplechoice {
    id: string;
    evaluation_list_id: string;
    name:string;
    code_term:string;
    order: number;

}
export class Evaluationlist {
    id: string;
    name: string;
    maxpoint: number;
}
export class Guide {
    id: string;
    evaluation_list_id:string;
    name: string;
    recipe: string;
    loai_trac_nghiem:string;
}

@Injectable()

export class MultipleChoiceModel {

    _evaluation: Evaluation;
    objEvaluation: any;
    _multiplechoice: Multiplechoice;
    _evaluationlist:Evaluationlist;
    _guide:Guide;
    Loadlist:any;
    public listData: any;
    public listdanhmuc:any;
    id: string;
    name: any;
    code_term: any;
    constructor(private HttpService:HttpService,private apiservice: ApiService, private route: Router, private datepipe: DatePipe) {

    }

    set Evaluation(value: any) {
        this._evaluation = value;
    }

    get Evaluation() {
        return this._evaluation;
    }
    set MultipleChoice(value: any) {
        this._multiplechoice = value;
    }

    get MultipleChoice() {
        return this._multiplechoice;
    }
    set Evaluationlist(value: any) {
        this._evaluationlist = value;
    }
    get Evaluationlist() {
        return this._evaluationlist;
    }
    set Guide(value: any) {
        this._guide = value;
    }
    get Guide() {
        return this._guide;
    }
    setMultipleChoice(data) {
        return this.MultipleChoice = data;
    }
    getMultipleChoice() {
        return this.MultipleChoice;
    }
    setLoadlist(Myclass) {
        return this.Loadlist = Myclass;
    }
    getLoadlist() {
        return this.Loadlist;
    }
    delete(data, MyClass) {
        Library.showloading();
        this.HttpService.postMethods('multiplechoice/deletes', data).subscribe((response: any) => {
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
    update(data, activeModal) {
        Library.showloading();
        this.HttpService.postMethods('multiplechoice/update', data).subscribe((response: any) => {
            Library.hideloading();
            if (response.success) {
                Library.notify(response.message, 'success');
                // Kiểm tra nếu là thêm mới thì load lại dữ liệu màn hình danh sách
                // if (!data.id) {
                let newrouter = "";
                if (this.route.url == "/system/multiple_choice/list_standard") {
                    newrouter = "/system/multiple_choice/list_standards";
                } else {
                    newrouter = "/system/multiple_choice/list_standard";
                }
                this.route.navigate([newrouter]);
                // }
                activeModal.hide();
            } else {
                Library.notify(response.message, 'error');
            }
        });
    }
    update_inputdata(data, activeModal) {
        Library.showloading();
        this.HttpService.postMethods('multiplechoice/update', data).subscribe((response: any) => {
            Library.hideloading();
            if (response.success) {
                Library.notify(response.message, 'success');
                // Kiểm tra nếu là thêm mới thì load lại dữ liệu màn hình danh sách
                // if (!data.id) {
                let newrouter = "";
                if (this.route.url == "/system/multiple_choice/inputdata") {
                    newrouter = "/system/multiple_choice/inputdatas";
                } else {
                    newrouter = "/system/multiple_choice/inputdata";
                }
                this.route.navigate([newrouter]);
                // }
                activeModal.hide();
            } else {
                Library.notify(response.message, 'error');
            }
        });
    }
    getdatapermission(params,myClass) {
        params['id'] = this._evaluation.id;
        this.HttpService.postMethods('multiplechoice/getdatapermission', params).subscribe((response: any) => {
            myClass.users = response.user;
            myClass.list = response.list;
            myClass.permission = response.permission;
            Library.hideloading();
        });
        // return this.apiservice.callGet('getdatapermission', params);
    }
    // async getDanhmuc(parram,async: boolean = false) {
    //     let response = await this.apiservice.callGet('getDanhmuc', parram);
    //     return response;
    // }
    getDanhmuc(parram) {
        this.HttpService.getMethods("multiplechoice/getDanhmuc", parram).subscribe(
            result => {
                return this.listdanhmuc = result.data;
            },
            (error) => {
              Library.hideloading();
            }
          );
      }

    deleteGuide(data, MyClass) {
        Library.showloading();
        this.HttpService.postMethods('multiplechoice/deleteGuide', data).subscribe((response: any) => {
            if (response.success) {
                Library.notify(response.message, 'success');
                MyClass.loadListHD();
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
