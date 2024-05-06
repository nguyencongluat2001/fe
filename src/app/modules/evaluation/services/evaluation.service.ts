import { Injectable } from '@angular/core';

export class List {
    id: string;
    parrent_id: string;
    name: string;
    max_point: number;
    inquire: number;
}
@Injectable()
export class EvaluationService {
    getStatus() {
        return [
            {code:"NORMAL",name:"Đánh giá"},
            {code:"SOCIOLOGY",name:"Xã hội học"},
            {code:"BONUS",name:"Điểm cộng"},
            {code:"MINUS",name:"Điểm trừ"},
            {code:"SIPAS",name:"SIPAS"},
            {code:"MULTICHOICE",name:"Trắc nghiệm"},
            {code:"MULTICHOICESCALE",name:"Trắc nghiệm tỉ lệ"}
          ];
    }
    getShow() {
        return [
            {code:"co",name:"Có"},
            {code:"khong",name:"Không"}
          ];
    }
}
