import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { AddInputComponent } from '../add-input/add-input.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';
import { Evaluation, EvaluationModel } from '../../models/EvaluationModel';
import { Guide, MultipleChoiceModel, Multiplechoice } from '../../models/MultipleChoiceModel';
import { AddInputComponent } from '../add-input/add-input.component';
import { AddGuideComponent } from '../add-guide/add-guide.component';

@Component({
  selector: 'app-inputdata',
  templateUrl: './inputdata.component.html',
  styleUrls: ['./inputdata.component.scss']
})
export class InputdataComponent implements OnInit {

  listData: any;
  selectedItem: any;
  selectedItems: Evaluation[] = [];
  statusesData = [];
  name: string = "";
  idevaluation: any;
  tongsingle: number = 0;
  nameevaluation: any;
  Evaluations: Evaluation[];
  prefix: string = '';
  onchangetree: any[] = [0];
  numberselect: number;
  selectedIndex: any = 0;
  selectItemTabs :any;
  showTab:any = 0;
  listDataHD:any;
  constructor(
    private HttpService:HttpService,
    public MultipleChoiceModel: MultipleChoiceModel,
    public EvaluationModel: EvaluationModel,

    private modalService: BsModalService,
    private route: Router,
    private router: ActivatedRoute
    , public service: ApiService) {
  }

  ngOnInit() {
    if (this.EvaluationModel.Evaluation) {
      this.name = this.EvaluationModel.Evaluation.name;
    }
    // this.statusesData = this.service.getStatus();
    this.loadList();
  }

  async loadList() {
    let Myclass = this;

    this.MultipleChoiceModel.setLoadlist(Myclass);
    var getEvaluationList = this.EvaluationModel.getEvaluationList();
    let id = getEvaluationList.id;
    let params = {
      evaluation_list_id: id,
      c_type:'TINH_TOAN'

    };
    Library.showloading();
    this.getStandard(params);
    Library.hideloading();
  }
  handlePropertyChange(e) {
    if(e.index == 0){
      this.showTab = 0;
      this.loadList();
    }else{
      this.showTab = 1;
      this.loadListHD();
    }
  }
  async loadListHD() {
    var getEvaluationList = this.EvaluationModel.getEvaluationList();
    let id = getEvaluationList.id;
    let params = {
      evaluation_list_id: id,

    };
    Library.showloading();
    this.getGuide(params);
    Library.hideloading();
  }
  getStandard(params) {
    this.HttpService.getMethods("multiplechoice/getStandard", params).subscribe(
        result => {
          this.listData = result.data;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  getGuide(params) {
    this.HttpService.getMethods("multiplechoice/getGuide", params).subscribe(
        result => {
          this.listDataHD = result.data;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }

  goBack() {
    if(this.EvaluationModel.getGroup() == 'PHUONG_XA'){
      this.route.navigate(['/system/evaluation_commune/define']);
    }
    if(this.EvaluationModel.getGroup() == 'THON_BAN'){
      this.route.navigate(['/system/evaluation_village/define']);
    }
    if(this.EvaluationModel.getGroup() == 'QUAN_HUYEN'){
      this.route.navigate(['/system/evaluation/define']);
    }
  }
  selectEvaluation(e) {
    this.selectedItems = e.selectedRowsData;
    this.selectedItem = e.selectedRowsData;

    this.numberselect = this.selectedItems.length;
    this.MultipleChoiceModel.setMultipleChoice(this.selectedItems[0]);
  }
  edit() {
    let i = 0;
    let iditem;
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
      this.EvaluationModel.Evaluation = this.selectedItems[0];
      this.modalService.show(AddInputComponent, { class: 'modal-lg', backdrop: 'static', keyboard: false });
    }
  }
  add() {
    this.EvaluationModel.Evaluation = new Multiplechoice;
    // var stt =this.listData.length+1; 
    var stt = 1; 
    this.EvaluationModel.Evaluation.c_order= stt;
    this.EvaluationModel.Evaluation.evaluation_list_id = this.EvaluationModel.Evaluation.id;
    this.modalService.show(AddInputComponent, { class: 'modal-lg', backdrop: 'static', keyboard: false });
  }
  addGuide() {
    this.MultipleChoiceModel.Guide = new Guide;
    this.MultipleChoiceModel.Guide.evaluation_list_id = this.MultipleChoiceModel.Evaluationlist.id;
    this.modalService.show(AddGuideComponent, { class: 'modal-lg', backdrop: 'static', keyboard: false });
  }
  editGuide() {
    let i = 0;
    let iditem;
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
      this.MultipleChoiceModel.Guide = this.selectedItems[0];
      this.modalService.show(AddGuideComponent, { class: 'modal-lg', backdrop: 'static', keyboard: false });
    }
  }
  delete() {
    let Myclass = this;
    let selectedItems = this.selectedItems;
    let ids = '';
    let data = {
      ids: ""
    };
    var result = Library.confirm("Bạn có chắc chắn muốn xóa đối tượng đã chọn?", "Thông báo");
    if (result) {
      result.then(function (dialogResult) {
        if (dialogResult) {
          selectedItems.forEach((item) => {
            ids += item.id + ',';
          });
          data.ids = ids;
          Myclass.MultipleChoiceModel.delete(data, Myclass);
        }
      });
    }
  }
  deleteGuide() {
    let Myclass = this;
    let selectedItems = this.selectedItems;
    let ids = '';
    let data = {
      ids: ""
    };
    var result = Library.confirm("Bạn có chắc chắn muốn xóa đối tượng đã chọn?", "Thông báo");
    if (result) {
      result.then(function (dialogResult) {
        if (dialogResult) {
          selectedItems.forEach((item) => {
            ids += item.id + ',';
          });
          data.ids = ids;
          Myclass.MultipleChoiceModel.deleteGuide(data, Myclass);
        }
      });
    }
  }

}
