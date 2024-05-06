import { Component, OnInit } from '@angular/core';
import { Evaluation,EvaluationModel } from '../../models/EvaluationModel';
import { ApiService } from '../../services/api.service';
// import { ListModel } from '../../../list/models/list.model';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Library } from 'src/app/shared/library/main';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  
  evaluation: any;;
  selectUnit: any;
  ids = '';
  fromdate :any;
  todate: any;
  numberPattern: any = /^[0-9]+$/;
  user_id:any;
  dateMin = new Date();
  event : any;
  group: string = '';
  type_countryside:any;
  name:any;
  arrNTM:any;
  arrGD:any;
  year:any;
  note:any;
  data:any;
  id:any;
  plan_1:any;
  status:any;
  is_send_district:any;
  constructor(
    public EvaluationModel: EvaluationModel,
    public bsModalRef: BsModalRef,
    private HttpService: HttpService,
    private datepipe: DatePipe,
    // private ListModel: ListModel,
    private route: Router) {  
      this.evaluation = EvaluationModel.Evaluation;
      this.user_id=JSON.parse(localStorage.getItem('user_infor'))['id'];
      this.evaluation.user_id=this.user_id;
      if (this.evaluation.id != '') {
        this.id = this.evaluation.id;
        this.name = this.evaluation.name;
        this.status = this.evaluation.status;
        this.group = this.evaluation.group;
        this.type_countryside = this.evaluation.type_countryside;
        this.year = this.evaluation.year;
        this.is_send_district = this.evaluation.is_send_district;
        this.note = this.evaluation.note;
      }
    }

  ngOnInit() {
    this.getGroup();
    this.getGD();
  }

  onSubmit(e){
    // console.log(this.evaluation);return;
    var param = {
      id: this.id,
      user_id: JSON.parse(localStorage.getItem('user_infor'))['id'],
      name:this.name,
      group : this.group,
      type_countryside: this.type_countryside,
      year : this.year,
      note : this.note,
    }
    this.update(param,this.bsModalRef);
    // this.EvaluationModel.update(this.evaluation,this.bsModalRef);
  }
  update(data, activeModal) {
        Library.showloading();
        // data['fromdate'] = this.datepipe.transform(data['fromdate'], 'yyy/MM/dd HH:mm:ss');
        // data['todate'] = this.datepipe.transform(data['todate'], 'yyy/MM/dd HH:mm:ss');
        this.HttpService.postMethods('evaluation/update', data).subscribe((response: any) => {
            Library.hideloading();
            if (response.success) {
                activeModal.hide();
                Library.notify(response.message, 'success');
                // Kiểm tra nếu là thêm mới thì load lại dữ liệu màn hình danh sách
                // if (!data.id) {
                let newrouter = "";
                if (this.route.url == "/system/evaluation") {
                    newrouter = "/system/evaluation/index";
                } else {
                    newrouter = "/system/evaluation";
                }
                this.route.navigate([newrouter]);
                // }

            } else {
                Library.notify(response.message, 'error');
            }
        });
    }

  // async getGroup(){
  //   this.selectUnit = await this.EvaluationModel.getGroup();
   
  // }
  getGroup() {
    var group = 'QUAN_HUYEN'
    var name = 'Quận huyện'
    if(this.route.url == '/system/evaluation_commune'){
      var group = 'PHUONG_XA';
      var name = 'Phường xã'
    }
    if(this.route.url == '/system/evaluation_village'){
      var group = 'THON_BAN'
      var name = 'Thôn bản'
    }
    this.selectUnit = [
      {
        'name': name, 
        'code': group,
        'selected':true
      }
    ];

    // lấy loại nông thôn mới]
    if(group == 'PHUONG_XA' || group == 'QUAN_HUYEN'){
      this.arrNTM = [
        {
          code:'NTM',
          name:'Nông thôn mới'
        },
        {
          code:'NTMNC',
          name:'Nông thôn mới nâng cao'
        },
        {
          code:'NTMKM	',
          name:'Nông thôn mới kiểu mẫu'
        }
      ];
    }else{
      this.arrNTM = [
        {
          code:'NTM',
          name:'Nông thôn mới'
        },
        {
          code:'NTMKM	',
          name:'Nông thôn mới kiểu mẫu'
        }
      ];
    }
  }
  getGD() {
    let parram = {};
    this.HttpService.getMethods("evaluation/getGD", parram).subscribe(
        result => {
          this.arrGD = result.data;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  changeloainongthonmoi(e){
    if(e.selectedItem.code == 'PHUONG_XA' || e.selectedItem.code == 'QUAN_HUYEN'){
      this.arrNTM = [
        {
          code:'NTM',
          name:'Nông thôn mới'
        },
        {
          code:'NTMNC',
          name:'Nông thôn mới nâng cao'
        },
        {
          code:'NTMKM	',
          name:'Nông thôn mới kiểu mẫu'
        }
      ];
    }else{
      this.arrNTM = [
        {
          code:'NTM',
          name:'Nông thôn mới'
        },
        {
          code:'NTMKM	',
          name:'Nông thôn mới kiểu mẫu'
        }
      ];
    }
  }
  goback() {
    
    let newrouter =this.route.url;
    this.route.navigate([newrouter]);
    this.bsModalRef.hide();
  }
}
