import { Component, OnInit } from '@angular/core';
import { List, EvaluationService } from '../../services/evaluation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationModel, Evaluation, EvaluationList } from '../../models/EvaluationModel';
import { Library } from 'src/app/shared/library/main';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpService } from 'src/app/core/http.service';
import { AddListComponent } from '../add-list/add-list.component';
import { MultipleChoiceModel } from '../../models/MultipleChoiceModel';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {

  listData: any;
  selectedItems: any;
  statusesData = [];
  calculationsData = []
  name: string = "";
  idevaluation: any;
  tongsingle: number = 0;
  nameevaluation: any;
  Evaluations: Evaluation[];
  prefix: string = '';
  onchangetree: any[] = [0];
  arrHienthi=[];
  MULTICHOICESCALE = false;
  checkDelete = false;
  constructor(
    public MultipleChoiceModel: MultipleChoiceModel,
    private HttpService:HttpService,
    public EvaluationModel: EvaluationModel,
    private modalService: BsModalService,
    private route: Router,
    private router: ActivatedRoute
    , public service: EvaluationService) {
  }

  ngOnInit() {
    if (this.EvaluationModel.Evaluation) {
      this.name = this.EvaluationModel.Evaluation.name;
    }
    this.statusesData = this.service.getStatus();
    this.arrHienthi = this.service.getShow();
    this.getcalculation();
    this.loadList();
  }
  getcalculation(){
    let parram = {};
    this.HttpService.getMethods("evaluation/getcalculation", parram).subscribe(
        result => {
          this.calculationsData = result.data;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }

  async loadList() {
    let id = this.EvaluationModel.Evaluation.id;
    let params = {
      evaluation_id: id
    };
    Library.showloading();
    this.EvaluationModel.getAllList(params);
    Library.hideloading();
    this.getGroupEval(params);
  }
  getGroupEval(params) {
    this.HttpService.getMethods("evaluation/getGroupEvaluation", params).subscribe(
        result => {
          this.Evaluations = result.data;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  initNewRow(e) {
    let count = 0,parentid = e.data.parrent_id;
    e.data.Task_Status = "Not Started";
    e.data.Task_Start_Date = new Date();
    e.data.Task_Due_Date = new Date();
    e.data.c_order = this.EvaluationModel.listData.length+1;
  }

  goBack() {
    if(this.EvaluationModel.getGroup() == 'PHUONG_XA'){
      this.route.navigate(['/system/evaluation_commune']);
    }
    if(this.EvaluationModel.getGroup() == 'THON_BAN'){
      this.route.navigate(['/system/evaluation_village']);
    }
    if(this.EvaluationModel.getGroup() == 'QUAN_HUYEN'){
      this.route.navigate(['/system/evaluation']);
    }
  }

  updateRow(e) {
    let param = e.data;
    param.id = e.key;
    // this.EvaluationModel.updateCriteria(param);
    this.updateCriteria(param);
    this.loadList();
  }

  insertRow(e) {
    if (this.EvaluationModel.Evaluation) {
      if (e.data.enquire) {
      } else {
        e.data.enquire = 0;
      }
      let param = e.data;
      param.id = e.key;
      param.evaluation_id = this.EvaluationModel.Evaluation.id;
      this.insertCriteria(param);
      // this.EvaluationModel.insertCriteria(param);
    }
  }

  deletes() {
    let Myclass = this;
    let selectedItems = this.selectedItems;
    let id = '';
    if (this.selectedItems == undefined) {
      Library.notify("Vui lòng chọn đối tượng để xem", 'error');
      return;
    }
    let data = {
      id: ""
    };
    var result = Library.confirm("Bạn có chắc chắn muốn xóa đối tượng đã chọn?", "Thông báo");
    if (result) {
      result.then(function (dialogResult) {
        if (dialogResult) {
          selectedItems.forEach((item) => {
            id += item.id + ',';
          });
          data.id = id;
          Myclass.EvaluationModel.deleteCriteria(data, Myclass);
        }
      });
    }
  }
 
  selectEvaluation(e) {
    this.selectedItems = e.selectedRowsData;
    if(this.selectedItems != '' && this.selectedItems[0].enquire == 'MULTICHOICESCALE'){
      this.MULTICHOICESCALE = true;
    }else{
      this.MULTICHOICESCALE = false;
    }
    this.EvaluationModel.setEvaluationList(this.selectedItems[0]);
  }

  add() {
     this.modalService.show(AddListComponent, { class: 'modal-lg', backdrop: 'static', keyboard: false });
  }
  inputdata() {
    let i = 0;
    let iditem;
    console.log(this.selectedItems);
    this.selectedItems.forEach((item) => {
      i++;
      iditem = item.id;
    });
    if (i == 0) {
      Library.notify("Vui lòng chọn đối tượng để xem", 'error');
      return;
    }
    if (i > 1) {
      Library.notify("Chỉ được chọn một đối tượng để xem", 'error');
      return;
    } else if (i == 1) {
      this.MultipleChoiceModel.Evaluationlist = this.selectedItems[0];
      if(this.EvaluationModel.getGroup() == 'PHUONG_XA'){
        this.route.navigate(['/system/evaluation_commune/inputdata']);
      }
      if(this.EvaluationModel.getGroup() == 'THON_BAN'){
        this.route.navigate(['/system/evaluation_village/inputdata']);
      }
      if(this.EvaluationModel.getGroup() == 'QUAN_HUYEN'){
        this.route.navigate(['/system/evaluation/inputdata']);
      }
    }
  }

  checkValidating(e) {
    // Kiem tra xem diem nhap da dung hay chua
    let checklinhvuc: boolean = false;
    if (e.oldData == null) {
      if (e.newData.parrent_id == '0')
        checklinhvuc = true;
    } else {
      if (e.oldData['parrent_id'] == '0') {
        checklinhvuc = true;
      }
    }
    if (checklinhvuc) {
      let deltapoint = e.newData['max_point'] - e.oldData['max_point'];
      if ((deltapoint + this.tongsingle) > (parseFloat(this.EvaluationModel._evaluation['total_score'])+parseFloat(this.EvaluationModel._evaluation['reward_points']))) {
        e.isValid = false;
        Library.notify("Tổng điểm các lĩnh vực không được lớn hơn điểm tối đa", "error");
      } else {
        this.tongsingle = deltapoint + this.tongsingle;
      }
    }
    var checkUpdate = false;
    if (e.newData.max_point || e.newData.enquire) {
      var max_point = e.newData.max_point;
      if (e.oldData) {
        checkUpdate = true;
        var parrent_id = e.oldData.parrent_id;
        var id = e.oldData.id;
        max_point = Math.abs(max_point) - Math.abs(e.oldData.max_point);
      } else {
        var parrent_id = e.newData.parrent_id;
        var id = e.newData.id;
      }
      let param = {
        max_point: max_point,
        parrent_id: parrent_id,
        id: id
      }
      //kiểm tra xem điểm nhập vào có lớn hơn 0 k 
   
      // if(e.newData['enquire'] && e.newData['enquire'] != 'MINUS' && e.newData.max_point < 0 ) {
      //   e.isValid = false;
      //   Library.notify("Điểm tối đa phải lớn hơn 0", "error");
      // }
     
      // Kiểm tra xem điểm thành phần có lớn hơn điểm tổng
      var checkMax = Library.checkMaxPointParrent(param, this.EvaluationModel.listData);
   
      if (!checkMax) {
        e.isValid = false;
        Library.notify("Điểm thành phần không được lớn hơn điểm tổng", "error");
      }
      if(checkUpdate==false){
        if( e.newData.max_point < 0 && e.newData['enquire'] != 'MINUS' ){
           e.isValid = false;
           Library.notify("Điểm tối đa phải lớn hơn 0", "error");
         }
         if( e.newData.max_point >0 && e.newData['enquire'] == 'MINUS' ){
           e.isValid = false;
           Library.notify("Điểm trừ phải nhỏ hơn 0", "error");
         }
      }
     
      if(checkUpdate==true ){
      
        if( e.oldData.max_point < 0 && e.newData['enquire'] != 'MINUS' && !e.newData['max_point']){
          e.isValid = false;
          Library.notify("Điểm tối đa phải lớn hơn 0", "error");
        }
        if( e.newData.max_point < 0 && e.oldData['enquire'] != 'MINUS'  && !e.newData['enquire']){
          e.isValid = false;
          Library.notify("Điểm tối đa phải lớn hơn 0", "error");
        }
       if(e.newData['enquire'] == 'MINUS' && (e.newData.max_point > 0 
        || e.oldData.max_point > 0)){
        e.isValid = false;
        Library.notify("Điểm trừ phải nhỏ hơn 0", "error");
       }
       if(e.oldData['enquire'] == 'MINUS' && e.newData.max_point > 0 && !e.newData['enquire']){
        e.isValid = false;
        Library.notify("Điểm trừ phải nhỏ hơn 0", "error");
       }
       
      }
      if (checkUpdate==true && e.oldData['enquire'] != 'MINUS') {
        param.max_point = e.newData.max_point;
        // Kiểm tra xem điểm tổng có nhỏ hơn điểm thành phần hay không
        var checkMin = Library.checkMinPointParrent(param, this.EvaluationModel.listData);

        if (!checkMin) {
          e.isValid = false;
          Library.notify("Điểm tổng không được nhỏ hơn điểm thành phần", "error");
        }

      }
      if ((e.newData['parrent_id'] != 0 && e.newData['parrent_id'] != null) || (e.oldData['parrent_id'] != 0 && e.oldData['parrent_id'] != null)) {
        let mark_point_parent: number = 0;
        this.EvaluationModel.listData.forEach(element => {
          if (element.id == param.parrent_id) {
            mark_point_parent = element.max_point;
          }
        });
        let tong_markpoint = 0;
        this.EvaluationModel.listData.forEach(element => {
          if (element.parrent_id == param.parrent_id && element.id != param.id) {
            tong_markpoint = tong_markpoint + element.max_point;
          }
        });
        tong_markpoint = tong_markpoint + e.newData.max_point;
        if (Math.abs(tong_markpoint) > Math.abs(mark_point_parent)) {
          e.isValid = false;
          Library.notify("Điểm tổng thành phần cùng cấp không được lơn hơn điểm lĩnh vực cha", "error");
        }
      }
    }
  }

  onRowPrepared(e) {
    if (e.rowType == "data") {
      if (e.rowIndex % 2 == 0) {
        // $(e.rowElement).addClass("dx-column-lines-color");
      }
    }
  }
  filterSelected(e) {
    // this.prefix = e.value;
    // this.idevaluation = this.Evaluations.filter(evaluation => evaluation.name === this.prefix).map(evalua => evalua.id);
    // console.log(e);
    this.idevaluation = e.selectedItem.id;
  }
  copy() {
    let Myclass = this;
    if (!this.idevaluation) {
      Library.notify("Bạn phải chọn Đợt chấm điểm CCHC ", "error");
    }
    else {
      let evaluation_id = this.idevaluation;
      let id = this.EvaluationModel.Evaluation.id;
      let params = {
        evaluationid: evaluation_id,
        evaluationcurr_id: id
      };
      this.copyCriteria(params)
      // Myclass.EvaluationModel.copyCriteria(params);
    }

  }
  copyCriteria(data) {
    Library.showloading();
    this.HttpService.postMethods('evaluation/copyCriteria', data).subscribe((response: any) => {
        Library.hideloading();
        if (response.success) {
            console.log(response);
            Library.notify(response.message, 'success');
            let newrouter = "";
            if (this.route.url == "/system/evaluation/define") {
                newrouter = "/system/evaluation/defines";
            } else {
                newrouter = "/system/evaluation/define";
            }
            this.route.navigate([newrouter]);
        }
        else {
            Library.notify(response.message, 'error');
        }
    });
}
insertCriteria(data) {
  Library.showloading();
  this.HttpService.postMethods('evaluation/insertCriteria', data).subscribe((response: any) => {
      Library.hideloading();
      if (response.success) {
          Library.notify(response.message, 'success');
      } else {
          Library.notify(response.message, 'error');
      }
      this.loadList();
  });
}
updateCriteria(data) {
  Library.showloading();
  this.HttpService.postMethods('evaluation/updateCriteria', data).subscribe((response: any) => {
      Library.hideloading();
      if (response.success) {
          Library.notify(response.message, 'success');
      } else {
          Library.notify(response.message, 'error');
      }
      this.loadList();
  });
}
  openlist() {
    this.onchangetree = this.EvaluationModel.listData.map(listdata => listdata.id);
  }
  closelist() {
    this.onchangetree = [0];
  }
}
