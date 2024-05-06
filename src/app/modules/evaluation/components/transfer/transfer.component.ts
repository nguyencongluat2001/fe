import { Component, OnInit } from '@angular/core';
import { EvaluationModel, Evaluation, Unit } from '../../models/EvaluationModel';
import { ApiService } from '../../services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  Units: Unit[];

  txt_search = '';
  selectedItems: Unit[] = [];
  itemevaluation: any;
  duplicateUnit: any;
  selectedrows: any;
  constructor(
    private HttpService: HttpService,
    public EvaluationModel: EvaluationModel,
    private modalService: BsModalService,
    public apiService: ApiService,
    private route: Router,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getallunit();
    this.itemevaluation = this.EvaluationModel.Evaluation.id;
  }

  async getallunit() {
    let params = {
      txtSearch: this.txt_search
    };
    var evalution = '';
    var group = 'QUAN_HUYEN';
    if (this.EvaluationModel.Evaluation) {
      group = this.EvaluationModel.Evaluation.group;
      evalution = this.EvaluationModel.Evaluation.id;
    }
    let param = {
      unit: group,
      evalution_id: evalution
    };
    Library.showloading();
    // this.duplicateUnit = await this.EvaluationModel.getduplicateUnit(param);
    // this.Units = await this.EvaluationModel.getAllUnit(param);
    this.getduplicateUnit(param);

    this.getAllUnit(param);
    Library.hideloading();
  }
  getAllUnit(param) {
    this.HttpService.getMethods("evaluation/getallunit", param).subscribe(
        result => {
          this.Units = result.data;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  getduplicateUnit(param) {
    this.HttpService.getMethods("evaluation/duplicateUnit", param).subscribe(
        result => {
          this.duplicateUnit = result.data;
          this.selectedrows = this.duplicateUnit.map(unit => unit.code);
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  selectEvaluation(e) {
    this.selectedItems = e.selectedRowsData;
    // var disabledKeys = e.currentSelectedRowKeys.filter(this.selectedrows > -1);
    // if (this.selectedrows.length > 0){
    //   e.component.deselectRows(this.selectedrows);
    // }
  }
  async transfer() {
    let Myclass = this;
    let selectedItems = this.selectedItems;
    let codeunit = '';
    let data = {
      code: "",
      id_evaluation: "",
      user_perform:JSON.parse(localStorage.getItem('user_infor'))['id']
    };
    selectedItems.forEach((item) => {
      codeunit += item.code + ',';
    });
    data.code = codeunit;
    data.id_evaluation = this.itemevaluation;
    this.transferUnit(data);
    // Myclass.EvaluationModel.transferUnit(data);
  }
  transferUnit(data) {
    Library.showloading();
    this.HttpService.postMethods('evaluation/transfer', data).subscribe((response: any) => {
        Library.hideloading();
        if (response.success) {
            Library.notify(response.message, 'success');
            let newrouter = "";
            if (this.route.url == "/system/evaluation/transfer") {
                newrouter = "/system/evaluation/index";
            } else {
                newrouter = "/system/evaluation/transfer";
            }
            this.route.navigate([newrouter]);
            // Library.notify(response.message, 'success');
        } else {
            Library.notify(response.message, 'error');
        }
    });
}
  goBack() {
    let newrouter = "/system/evaluation";
    this.route.navigate([newrouter]);
  }
}
