import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const newDate = new Date();
export class Tab {
    id: string;
    code: string;
    name: string;
    title: string;
    title_desc: string;
    desc: string;
}
const tabs: Tab[] = [
    {
        id: '01',
        code: 'MAU_PHIEU_01',
        name: 'Phiếu số 01',
        title: 'XIN Ý KIẾN CỦA ĐẠI BIỂU HĐND TỈNH,<br>LÃNH ĐẠO UỶ BAN MẶT TRẬN TỔ QUỐC VIỆT NAM TỈNH YÊN BÁI',
        title_desc: 'Đánh giá công tác CCHC của UBND các huyện, thị xã, thành phố',
        desc: 'Để phục vụ cho công tác đánh giá xác định Chỉ số cải cách hành chính năm ' + newDate.getFullYear() + ' của UBND các huyện, thị xã, thành phố; đề nghị ông (bà)/quý cơ quan vui lòng cho biết ý kiến của mình về kết quả triển khai, thực hiện công tác cải cách hành chính, thực hiện chức năng, nhiệm vụ quản lý nhà nước thuộc thẩm quyền ở địa phương của UBND các huyện, thị xã, thành phố theo nội dung các câu hỏi dưới đây',
    },
    {
        id: '02',
        code: 'MAU_PHIEU_02',
        name: 'Phiếu số 02',
        title: 'XIN Ý KIẾN CỦA ĐẠI BIỂU HĐND TỈNH,<br>LÃNH ĐẠO UỶ BAN MẶT TRẬN TỔ QUỐC VIỆT NAM TỈNH YÊN BÁI',
        title_desc: 'Đánh giá công tác CCHC của các sở, ban, ngành',
        desc: 'Để phục vụ cho công tác đánh giá, chấm điểm xác định Chỉ số cải cách hành chính năm ' + newDate.getFullYear() + ' của các sở, ban, ngành; đề nghị ông (bà)/quý cơ quan vui lòng cho biết ý kiến của mình về kết quả triển khai thực hiện công tác cải cách hành chính của các sở, ban, ngành theo nội dung các câu hỏi dưới đây;',
    },
    {
        id: '03',
        code: 'MAU_PHIEU_03',
        name: 'Phiếu số 03',
        title: "XIN Ý KIẾN CỦA LÃNH ĐẠO SỞ, BAN, NGÀNH",
        title_desc: 'Đánh giá công tác CCHC của UBND các huyện, thị xã, thành phố',
        desc: 'Để phục vụ cho công tác đánh giá xác định Chỉ số cải cách hành chính năm ' + newDate.getFullYear() + ' của UBND các huyện, thị xã, thành phố; đề nghị ông (bà) vui lòng cho biết ý kiến của mình về kết quả triển khai thực hiện công tác cải cách hành chính của UBND các huyện, thị xã, thành phố theo nội dung các câu hỏi dưới đây;',
    },
    {
        id: '04',
        code: 'MAU_PHIEU_04',
        name: 'Phiếu số 04',
        title: 'XIN Ý KIẾN CỦA THƯỜNG TRỰC HĐND HUYỆN, THỊ XÃ, THÀNH PHỐ;<br>LÃNH ĐẠO UBND CÁC HUYỆN, THỊ XÃ, THÀNH PHỐ',
        title_desc: 'Đánh giá công tác CCHC của các sở, ban, ngành',
        desc: 'Để phục vụ cho công tác đánh giá, chấm điểm xác định Chỉ số cải cách hành chính năm ' + newDate.getFullYear() + ' của các sở, ban, ngành; đề nghị ông (bà) vui lòng cho biết ý kiến của mình về kết quả triển khai, thực hiện công tác cải cách hành chính của các sở, ban, ngành theo nội dung các câu hỏi dưới đây;',
    },
    {
        id: '05',
        code: 'MAU_PHIEU_05',
        name: 'Phiếu số 05',
        title: '',
        title_desc: 'Ý kiến Lãnh đạo cấp phòng và tương đương thuộc UBND cấp huyện đánh giá công tác cải cách hành chính cơ quan chuyên môn cấp trên',
        desc: 'Để phục vụ cho công tác đánh giá xác định Chỉ số cải cách hành chính năm ' + newDate.getFullYear() + ' của UBND các huyện, thị xã, thành phố; đề nghị ông (bà) (cấp xã) vui lòng cho biết ý kiến của mình về kết quả triển khai, thực hiện công tác cải cách hành chính, thực hiện chức năng, nhiệm vụ quản lý nhà nước thuộc thẩm quyền ở địa phương của UBND các huyện, thị xã, thành phố theo nội dung các câu hỏi dưới đây;',
    },
    {
        id: '06',
        code: 'MAU_PHIEU_06',
        name: 'Phiếu số 06',
        title: '',
        title_desc: 'Ý kiến Lãnh đạo UBND cấp xã đánh giá công tác <br>cải cách hành chính của UBND cấp huyện năm ' + newDate.getFullYear(),
        desc: 'Để phục vụ cho công tác đánh giá xác định Chỉ số cải cách hành chính năm ' + newDate.getFullYear() + ' của UBND các huyện, thị xã, thành phố; đề nghị ông (bà) (cấp xã) vui lòng cho biết ý kiến của mình về kết quả triển khai, thực hiện công tác cải cách hành chính, thực hiện chức năng, nhiệm vụ quản lý nhà nước thuộc thẩm quyền ở địa phương của UBND các huyện, thị xã, thành phố theo nội dung các câu hỏi dưới đây;',
    },
];
export class Status {
    id: number;
    name: string;
}
const status: Status[] = [
    {
        id: 0,
        name: 'Chưa trả lời',
    },
    {
        id: 1,
        name: 'Đã trả lời',
    },
];
export class Survey {
    id: number;
    name: string;
}
const survey: Survey[] = [
    {
        id: 0,
        name: 'Trực tiếp',
    },
    {
        id: 1,
        name: 'Trực tuyến',
    },
];

export class List {
    id: string;
    parrent_id: string;
    name: string;
    max_point: number;
    new_point: number;
    explanation: string
    listfile: string
}
export class Question {
    id                : string = '';
    evaluation_id     : string = '';
    evaluation_list_id: string = '';
    user_id           : string = '';
    user_name         : string = '';
    type_vote         : string = '';
    name              : string = '';
    type_unit         : string = '';
    option_A          : string = '';
    option_B          : string = '';
    option_C          : string = '';
    option_D          : string = '';
    option_E          : string = '';
    percent_A         : number = 100;
    percent_B         : number = 60;
    percent_C         : number = 20;
    percent_D         : number = 0;
    percent_E         : number;
    status            : string = '';
    order             : string = '';
    questionSuccess   : number = 0;
    created_at        : string = '';
    updated_at        : string = '';
}

export class Vote {
    id           : string = '';
    subject_id   : string = '';
    evaluation_id: string = '';
    code         : string = '';
    type_vote    : string = '';
    survey       : string = '';
    sex          : number;
    age          : string = '';
    level        : string = '';
    unitname     : string = '';
    position     : string = '';
    status       : string = '';
    order        = 1;
    created_at   : string = '';
    updated_at   : string = '';
}
export class Subject {
    id           : string = '';
    evaluation_id: string = '';
    user_id      : string = '';
    user_name    : string = '';
    name         : string = '';
    sex          : number;
    email        : string = '';
    phone        : string = '';
    level        : string = '';
    unit_name    : string = '';
    position     : string = '';
    age          : string = '';
    created_at   : string = '';
    updated_at   : string = '';
}

export class Answer {
    id: string = '';
    question_id: string = '';
    vote_id: string = '';
    subject_id: string = '';
    ownercode: string = '';
    answer: string = '';
    created_at: string = '';
    updated_at: string = '';
}
@Injectable()

export class AnswerModel {

    _arrUnit: any[];
    objExcute: any;
    _selecltedVote: any;
    _questionSelected: any;
    _vote: Vote;
    _listVote: Vote[];
    _listquestion: any;
    _myClass: any;
    private _dataview: any;

    constructor(private route: Router, public HttpService: HttpService) {

    }
    set Vote(value: any) {
        this._vote = value;
    }

    get Vote() {
        return this._vote;
    }

    get dataview() {
        return this._dataview;
    }
    set dataview(value: any) {
        this._dataview = value;
    }
    getMyClass(value: any){
        this._myClass = value;
    }
    getTabs(): Tab[] {
        return tabs;
    }
    getStatus(): Status[] {
        return status;
    }
    getSurvey(): Survey[] {
        return survey;
    }
    async getFileSign(data) {
        Library.showloading();
        let response = await this.HttpService.postMethods('sociological/vote/getFileSign', data).toPromise().then((response: any) => {
            if (response.data.success) {
                return response.data;
            } else {
                Library.notify(response.data.message, 'error');
            }
            Library.hideloading();
        }, error => {
            Library.hideloading();
            Library.notify(error, 'error');
        });
        return response;
    }



}
