import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Library } from 'src/app/shared/library/main';

export class SubjectGroup {
    id: string = '';
    name: string = '';
    sex: string = '';
    email: string = '';
    unit_name: string = '';
    position_name: string = '';
    evaluation_id: string = '';
    fromdate: string = '';
    age: string = '';
    phone: string = '';
    level: string = '';
    user_id: string = '';
};
export class Sex {
    code: string = '';
    name: string = '';
};
const sex: Sex[] = [
    {
        code: '1',
        name: 'Nam',
    },
    {
        code: '2',
        name: 'Nữ',
    },
];


// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
@Injectable()

export class Subject {
    id              : string = '';
    system_list_code: string = '';
    name            : string = '';
    sex             : string = '';
    email           : string = '';
    unit_name       : string = '';
    position_name   : string = '';
    evaluation_id   : string = '';
    fromdate        : string = '';
    age             : string = '';
    phone           : string = '';
    level           : string = '';
    user_id         : string = '';
}
export class List {
    id: string;
    parrent_id : string;
    name       : string;
    max_point  : number;
    new_point  : number;
    explanation: string;
    listfile   : string;
}
@Injectable()

export class SubjectModel {
    // subjects: Subject[];
    subjects: any;
    evaluation_id: any;
    loadList: any;
    // _excute: SubjectGroup;

    constructor(private route: Router) {

    }

    getSubject() {
        if (!this.subjects) {
            this.subjects = new Subject();
        }
        return this.subjects;
    }

    setSubject(data) {
        if (!data) {
            data = new Subject();
            if (this.subjects) {
                data.order = this.subjects.length + 1;
            }
        }
        this.subjects = data;
    }
    setEvalue(data) {
        return this.evaluation_id = data;
    }
    getEvalue() {
        return this.evaluation_id;
    }
    setLoadList(Myclass) {
        return this.loadList = Myclass;
    }

    getSex(): Sex[] {
        return sex;
    }
}
