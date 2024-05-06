import { Component, OnInit } from '@angular/core';
import { MultipleChoiceModel,Multiplechoice,Evaluationlist } from '../../models/MultipleChoiceModel';
// import { ListModel } from '../../../list/models/list.model';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from 'src/app/core/http.service';
import { Library } from 'src/app/shared/library/main';
import { EvaluationModel } from '../../models/EvaluationModel';
@Component({
  selector: 'app-add-input',
  templateUrl: './add-input.component.html',
  styleUrls: ['./add-input.component.scss']
})
export class AddInputComponent implements OnInit {

  MultipleChoice: Multiplechoice;
  Evaluationlist:Evaluationlist;
  selectUnit: any;
  ids = '';
  fromdate :any;
  todate: any;
  numberPattern: any = /^[0-9]+$/;
  user_id:any;
  listSohang:any;
  stt:number;
  code_term:any;
  name:any;
  order:any;
  id:any;
  evaluation_list_id:any;
  constructor(private HttpService:HttpService,public MultipleChoiceModel: MultipleChoiceModel,
    public bsModalRef: BsModalRef,
    public EvaluationModel: EvaluationModel,
    private route: Router
    ) 
    {  
      this.MultipleChoice = MultipleChoiceModel.MultipleChoice;
      var getMultipleChoice = this.MultipleChoiceModel.getMultipleChoice();
      if (getMultipleChoice != undefined && getMultipleChoice.id != '') {
        this.id = getMultipleChoice.id;
        this.evaluation_list_id = getMultipleChoice.Evaluationlist;
        this.name = getMultipleChoice.name;
        this.code_term = getMultipleChoice.code_term;
        this.order = getMultipleChoice.order;
      }
    }

  ngOnInit() {
    this.getDanhmuc();
  }

  onSubmit(e){
    var param = {
      id: this.id,
      evaluation_list_id:this.MultipleChoiceModel.Evaluationlist.id,
      name:this.name,
      code_term : this.code_term,
      order:this.order
    }
    this.HttpService.postMethods('multiplechoice/update', param).subscribe((response: any) => {
      Library.hideloading();
      if (response.success) {
          Library.notify(response.message, 'success');
          // Kiểm tra nếu là thêm mới thì load lại dữ liệu màn hình danh sách
          if(this.EvaluationModel.getGroup() == 'PHUONG_XA'){
            this.route.navigate(['/system/evaluation_commune/inputdata']);
          }
          if(this.EvaluationModel.getGroup() == 'THON_BAN'){
            this.route.navigate(['/system/evaluation_village/inputdata']);
          }
          if(this.EvaluationModel.getGroup() == 'QUAN_HUYEN'){
            this.route.navigate(['/system/evaluation/inputdata']);
          }
          this.MultipleChoiceModel.getLoadlist().loadList()
          this.bsModalRef.hide();
      } else {
          Library.notify(response.message, 'error');
      }
  });
  }
  getDanhmuc() {
    let param = {code:'DM_SO_HANG'};
    this.HttpService.getMethods("multiplechoice/getDanhmuc", param).subscribe(
        result => {
             this.listSohang = result.data;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  
  goback() {
    if(this.EvaluationModel.getGroup() == 'PHUONG_XA'){
      this.route.navigate(['/system/evaluation_commune']);
    }
    if(this.EvaluationModel.getGroup() == 'THON_BAN'){
      this.route.navigate(['/system/evaluation_village']);
    }
    if(this.EvaluationModel.getGroup() == 'QUAN_HUYEN'){
      this.route.navigate(['/system/evaluation']);
    }
    // let newrouter =this.route.url;
    // this.route.navigate([newrouter]);
    this.bsModalRef.hide();
  }
}
