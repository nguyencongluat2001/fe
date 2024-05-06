import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmComponent } from './../confirm/confirm.component';
import { Evaluation, SupportModel, exeUnit } from './../../models/SupportModel';
import { Component, OnInit } from '@angular/core';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  Evaluations: Evaluation[];
  selectedItems: Evaluation[] = [];
  exeunit: exeUnit[];
  txt_search = '';
  pageEnabled: boolean = false;


  constructor(
    public SupportModel: SupportModel,
    private BsModalService: BsModalService,
    private HttpService: HttpService,
  ) { }

  ngOnInit() {
    this.loadList();
  }

  async loadList() {
    let params = {
      txtSearch: this.txt_search
    };
    Library.showloading();
    this.HttpService.getMethods("support/getall", params).subscribe(
      response => {
        Library.hideloading();
        this.Evaluations = response.data;
      });
    Library.showloading();
    this.HttpService.getMethods("support/evaluationexe", params).subscribe(
      response => {
        Library.hideloading();
        this.exeunit = response.data;
        if(this.exeunit.length > 0){
          this.pageEnabled = true;
        }else{
          this.pageEnabled = false;
        }
      });
  }
  
  selectEvaluation(e) {
    this.selectedItems = e.selectedRowsData;
    this.SupportModel.Evaluation = this.selectedItems;
  }

  convertFromdate(data) {
    return Library.formatDate(data.fromdate);
  }

  convertTodate(data) {
    return Library.formatDate(data.todate);
  }
  
  setStatus(data) {
    if (data.status == 'MOI_TAO') {
      return 'Mới tạo';
    } else if (data.status == 'DA_CHUYEN') {
      return 'Đã gửi đơn vị';
    } else if (data.status == 'DANG_CHAM') {
      return 'Đang chấm điểm';
    } else {
      return 'Kết thúc';
    }
  }
  
  delete() {
    let myClass = this;
    this.SupportModel.getMyClass(myClass);
    let selectedItems = this.selectedItems;
    var ids = "";
    selectedItems.forEach((item) => {
      ids += item.id + ',';
    });
    this.SupportModel.evaluation_id = ids;
    this.BsModalService.show(ConfirmComponent, { class: 'modal-lg modal-dialog-centered', backdrop: 'static', keyboard: false });
  }

}
