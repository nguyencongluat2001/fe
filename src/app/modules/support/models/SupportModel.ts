import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
    check_show:any;
}
export class exeUnit {
    evaluation_id;
}

@Injectable()

export class SupportModel {
    
    _evaluation: any;
    _evaluation_id: any;
    _myClass: any;
    loadList: any;
    

    constructor(private route: Router) {

    }

    set Evaluation(value: any) {
        this._evaluation = value;
    }

    get Evaluation() {
        return this._evaluation;
    }
    set evaluation_id(value: any) {
        this._evaluation_id = value;
    }

    get evaluation_id() {
        return this._evaluation_id;
    }
    setLoadList(Myclass) {
        return this.loadList = Myclass;
    }
    getMyClass(value: any){
        this._myClass = value;
    }
}
