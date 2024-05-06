import { ApiService } from './../services/api.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Library } from 'src/app/shared/library/main';

export class Logs {
    id            : string = '';
    tokenable_type: string = '';
    tokenable_id  : string = '';
    name          : string = '';
    token         : string = '';
    abilities     : string = '';
    last_used_at  : string = '';
    created_at    : string = '';
    updated_at    : string = '';
    expires_at    : string = '';
}

@Injectable()

export class LogModel {

    _logs: Logs;

    constructor(private route: Router, public ApiService: ApiService) {

    }
    set Logs(value: any) {
        this._logs = value;
    }

    get Logs() {
        return this._logs;
    }
    async getAll(parram, async: boolean = false): Promise<Logs[]> {
        let response = await this.ApiService.callGet('getAll', parram);
        return response.data;
    }
    delete(data, MyClass) {
        Library.showloading();
        this.ApiService.callPost('sociological/vote/delete', data).subscribe((response: any) => {
            if (response.data.success) {
                Library.notify(response.data.message, 'success');
                MyClass.loadList();
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
