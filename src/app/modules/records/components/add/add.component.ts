import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';
import { RecordsModel } from '../../models/RecordsModel';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  
  records: any;;
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
  selectedIndex: any = 0;
  showTab : any;
  name_unit:any = JSON.parse(localStorage.getItem('unit_infor'))['name'];
  code:any;
  dataTab2:any;
  dataTab3:any;
  GD_code:any;
  colorTex1:any = '#00db12';
  colorTex2:any;
  colorTex3:any;
  colorTex4:any;
  content:any;
  fileselected: File[] = [];
  constructor(
    public RecordsModel: RecordsModel,
    public bsModalRef: BsModalRef,
    private HttpService: HttpService,
    // private ListModel: ListModel,
    private route: Router) {  
      // this.evaluation = RecordsModel.Evaluation;
      this.user_id=JSON.parse(localStorage.getItem('user_infor'))['id'];
      // this.records.user_id=this.user_id;
      if (this.RecordsModel._records != undefined && this.RecordsModel._records.id != '') {
        this.id = this.RecordsModel._records.id;
        this.code = this.RecordsModel._records.code;
        this.year = this.RecordsModel._records.year;
        this.type_countryside = this.RecordsModel._records.type;
        this.name_unit = this.RecordsModel._records.name_unit;
        this.content = this.RecordsModel._records.content;
        this.dataTab2 = {
          code:this.code,
          year : this.year,
          user_id: JSON.parse(localStorage.getItem('user_infor'))['id'],
          type:this.type_countryside,
          type_countryside: this.type_countryside,
          stage:this.RecordsModel.getGiaDoan(),
          name_unit : this.name_unit,
          owner_code:JSON.parse(localStorage.getItem('user_infor'))['owner_code'],
        }
      }else{
        this.getCodeRecords();
      }
    }

  ngOnInit() {
    this.getGD();
    this.showTab = 1;
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
  }
  // lấy mã code theo thứ tự tăng dần
  getCodeRecords(){
    this.HttpService.getMethods('records/getCodeRecords', {}).subscribe((response: any) => {
      Library.hideloading();
      if (response.success) {
        this.code = response.arr.code;
        this.year = response.arr.year;

      } else {
          Library.notify(response.message, 'error');
      }
    });
  }
 
  saveValueTab(){
    
  }
  selectYear(e){
    console.log(555,e)
  }
  // data chuyển bước
  moveStep(e){
    this.dataTab2 = {
      evaluation_group_id:this.RecordsModel.getEvaluation_group_id,
      id:this.id,
      code:this.code,
      year : this.year,
      user_id: JSON.parse(localStorage.getItem('user_infor'))['id'],
      type:this.type_countryside,
      type_countryside: this.type_countryside,
      stage:this.RecordsModel.getGiaDoan(),
      name_unit : this.name_unit,
      owner_code:JSON.parse(localStorage.getItem('user_infor'))['owner_code'],
    }
    if(this.code == '' || this.code == undefined ){
      Library.notify('Mã hồ sơ không được để trống', 'error');
      return false;
    }
    if(this.year == '' || this.year == undefined){
      Library.notify('Năm đề nghị không được để trống', 'error');
      return false;
    }
    if(this.type_countryside == '' || this.type_countryside == undefined){
      Library.notify('Loại hồ sơ không được để trống', 'error');
      return false;
    }
    if(this.code == '' || this.code == undefined){
      Library.notify('Tên đơn vị không được để trống', 'error');
      return false;
    }
    this.selectTab(e+1);
    this.HttpService.postMethods('records/update', this.dataTab2).subscribe((response: any) => {
      Library.hideloading();
      if (response.success) {
      } else {
          Library.notify(response.message, 'error');
      }
  });
    return true;
  }
  // data quay lại bước trước
  backStep(e){
    this.selectTab(e-1);
  }
  onSubmit(e){
    // console.log(this.evaluation);return;\
    var param = {
      id: this.id,
      user_id: JSON.parse(localStorage.getItem('user_infor'))['id'],
      code:this.code,
      stage:this.RecordsModel.getGiaDoan(),
      year : this.year,
      type_countryside: this.type_countryside,
      name_unit : this.name_unit,
      content : this.content,
    }
    this.update(param,this.bsModalRef);
    // this.EvaluationModel.update(this.evaluation,this.bsModalRef);
  }
  handleFileInput(event) {
    // if (event.target.files[0].name != '') {
    //   this.fileselected.push(<File>event.target.files[0]);
    // }
    var arrfile = event.target.files;
    for (let i=0; i<arrfile.length;i++) {
      if (event.target.files[i].name != '') {
        this.fileselected.push(<File>event.target.files[i]);
      }
    }
  }
  selectTab(e) {
    this.showTab = e;
    console.log(e)
    if(e == 1){
      this.colorTex1 = '#00db12';
    }
    if(e == 2){
      this.colorTex1 = '#00db12';
      this.colorTex2 = '#00db12';
    }
    if(e == 3){
      this.colorTex1 = '#00db12';
      this.colorTex2 = '#00db12';
      this.colorTex3 = '#00db12';
    }
    if(e == 4){
      this.colorTex1 = '#00db12';
      this.colorTex2 = '#00db12';
      this.colorTex3 = '#00db12';
      this.colorTex4 = '#00db12';
    }
    
  }
  update(data, activeModal) {
        Library.showloading();
        this.HttpService.postMethods('records/update', data).subscribe((response: any) => {
            Library.hideloading();
            if (response.success) {
                activeModal.hide();
                Library.notify(response.message, 'success');
                // Kiểm tra nếu là thêm mới thì load lại dữ liệu màn hình danh sách
                let newrouter = "/system/records_receiveonnet";
                this.route.navigate([newrouter]);
            } else {
                Library.notify(response.message, 'error');
            }
        });
    }

  // async getGroup(){
  //   this.selectUnit = await this.EvaluationModel.getGroup();
   
  // }
  getGD() {
    let parram = {};
    this.HttpService.getMethods("evaluation/getGD", parram).subscribe(
        result => {
          this.arrGD = result.data;
          this.GD_code = this.arrGD[0].code
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  goback() {
    
    let newrouter =this.route.url;
    this.route.navigate([newrouter]);
    this.bsModalRef.hide();
  }
}
