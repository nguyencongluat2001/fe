import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';
import { Library } from 'src/app/shared/library/main';
export class Records {
    id: string = '';
    type:string = '';
}
@Injectable()

export class RecordsModel {
    stage:any;
    _records:any;
    _note:any;
    LoadListTab2:any;
    _dataFile:any;
    evaluation_group_id:any;
    set Records(value: any) {
        this._records = value;
    }
    set setNote(value: any) {
        this._note = value;
    }
    get getNote() {
        return this._note;
    }
    set setDataFile(value: any) {
        this._dataFile = value;
    }
    get getDataFile() {
        return this._dataFile;
    }
    set setEvaluation_group_id(value: any) {
        this.evaluation_group_id = value;
    }
    get getEvaluation_group_id() {
        return this.evaluation_group_id;
    }
    constructor(
        private HttpService: HttpService,
    ) {}
    setGiaDoan(stage) {
        this.stage = stage;
    }
    getGiaDoan() {
        return this.stage;
    }
    setLoadListTab2(data) {
        this.LoadListTab2 = data;
    }
    getLoadListTab2() {
        return this.LoadListTab2;
    }
    deletes(data, MyClass) {
        this.HttpService.postMethods('records/deletes', data).subscribe((response: any) => {
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

