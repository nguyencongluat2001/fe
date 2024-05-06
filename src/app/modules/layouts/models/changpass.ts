import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Library } from 'src/app/shared/library/main';
import { ChangepasswordService } from '../services/changepassword.service';

export class infoChangePass{
    currentPass: string = '';
    newPass: string = '';
    rePass: string = '';
}
@Injectable()
export class Changpass {

    infoPass: infoChangePass;
    check: any = '';

    constructor(private changePasswordApi: ChangepasswordService
        , private router: Router
    ) {
    }

    update(data,activeModal){
        this.changePasswordApi.updatePassWord(data).subscribe((response: any) => {
            if(response.success){
                Library.notify(response.message,'success');
                activeModal.hide();
            }else{
                Library.notify(response.message,'error');
            }
        });
    }

    getInfoPassWord(){
        this.infoPass = new infoChangePass;
        return this.infoPass;
    }
}
