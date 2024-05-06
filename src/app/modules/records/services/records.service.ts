import { Injectable } from '@angular/core';

@Injectable()
export class RecordsService {
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
