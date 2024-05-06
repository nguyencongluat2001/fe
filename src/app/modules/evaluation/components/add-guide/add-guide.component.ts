import { Component, OnInit } from '@angular/core';
import { MultipleChoiceModel,Guide,Evaluationlist } from '../../models/MultipleChoiceModel';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';
import { EvaluationModel } from '../../models/EvaluationModel';
@Component({
  selector: 'app-add-guide',
  templateUrl: './add-guide.component.html',
  styleUrls: ['./add-guide.component.scss']
})
export class AddGuideComponent implements OnInit {

  Guide: Guide;
  Evaluationlist:Evaluationlist;
  selectUnit: any;
  ids = '';
  fromdate :any;
  todate: any;
  numberPattern: any = /^[0-9]+$/;
  user_id:any;
  listdanhmuc:any;
  stt:number;
  myCkeditorConfig:any;
  name:string='';
  recipe:string='';
  id='';
  evaluation_list_id:string='';
  loai_trac_nghiem:string;
  constructor(
    private HttpService:HttpService,
    private MultipleChoiceModel: MultipleChoiceModel,
    public bsModalRef: BsModalRef,
    public EvaluationModel: EvaluationModel,
    private route: Router
    ) 
    {  
      this.Guide = MultipleChoiceModel.Guide;
      if(this.Guide.name){
        this.name=this.Guide.name;
      }
      if(this.Guide.recipe){
        this.recipe=this.Guide.recipe;
      }
      if(this.Guide.id){
        this.id=this.Guide.id;
      }
      if(this.Guide.evaluation_list_id){
        this.evaluation_list_id=this.Guide.evaluation_list_id;
      }
    }
  ngOnInit() {
    this.getDanhmuc();
  }

  getDanhmuc() {
    let param = {code:'DM_LOAI_TRAC_NGHIEM'};
    this.HttpService.getMethods("multiplechoice/getDanhmuc", param).subscribe(
        result => {
             this.listdanhmuc = result.data;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  goback() {
    // let newrouter =this.route.url;
    // this.route.navigate([newrouter]);
    if(this.EvaluationModel.getGroup() == 'PHUONG_XA'){
      this.route.navigate(['/system/evaluation_commune']);
    }
    if(this.EvaluationModel.getGroup() == 'THON_BAN'){
      this.route.navigate(['/system/evaluation_village']);
    }
    if(this.EvaluationModel.getGroup() == 'QUAN_HUYEN'){
      this.route.navigate(['/system/evaluation']);
    }
    this.bsModalRef.hide();
  }
  onupload(){
    if(this.name.trim()==''){
      Library.notify('Nội dung không được để trống', 'error');
      return;
    }
    var param={
      id:this.id,
      evaluation_list_id:this.evaluation_list_id,
      name:this.name,
      recipe:this.recipe
    }
    this.HttpService.postMethods('multiplechoice/updateGuide', param).subscribe((response: any) => {
      Library.hideloading();
      if (response.success) {
          Library.notify(response.message, 'success');
          if(this.EvaluationModel.getGroup() == 'PHUONG_XA'){
            this.route.navigate(['/system/evaluation_commune/inputdata']);
          }
          if(this.EvaluationModel.getGroup() == 'THON_BAN'){
            this.route.navigate(['/system/evaluation_village/inputdata']);
          }
          if(this.EvaluationModel.getGroup() == 'QUAN_HUYEN'){
            this.route.navigate(['/system/evaluation/inputdata']);
          }
          this.MultipleChoiceModel.getLoadlist().loadListHD()
          this.bsModalRef.hide();
      } else {
          Library.notify(response.message, 'error');
      }
    });
  }
  onSelectionChanged(e){
    this.loai_trac_nghiem=e.selectedItem.code;
  }
}
