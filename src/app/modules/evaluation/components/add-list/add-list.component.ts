import { Component, OnInit } from "@angular/core";
import { EvaluationModel, Evaluation ,List} from "../../models/EvaluationModel";
import { EvaluationService } from "../../services/evaluation.service";
import { Router } from "@angular/router";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';
@Component({
  selector: "app-add-list",
  templateUrl: "./add-list.component.html",
  styleUrls: ["./add-list.component.scss"],
})
export class AddListComponent implements OnInit {
  evaluationList: EvaluationList;
  statusesData = [];
  calculationsData = []
  c_order = 1;
  constructor(
    private HttpService: HttpService,
    public bsModalRef: BsModalRef,
    public EvaluationModel: EvaluationModel,
    private route: Router,
    public service: EvaluationService
  ) {}

  ngOnInit() {
    this.evaluationList = new EvaluationList();
    this.EvaluationModel.listData.forEach((element) => {
      if (element.parrent_id == "0") {
        this.c_order++;
      }
    });
    this.statusesData = this.service.getStatus();
    this.getcalculation();
    if (this.EvaluationModel.Evaluation) {
      this.evaluationList.evaluation = this.EvaluationModel.Evaluation.name;
      this.evaluationList.evaluation_id = this.EvaluationModel.Evaluation.id;
      this.evaluationList.c_order = this.c_order;
    }
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
  onSubmit(e) {
    this.updateList(this.evaluationList, this.bsModalRef);
    // this.EvaluationModel.updateList(this.evaluationList, this.bsModalRef);
  }
  updateList(data, activeModal) {
    Library.showloading();
    this.HttpService.postMethods('evaluation/insertList', data).subscribe((response: any) => {
        Library.hideloading();
        if (response.success) {
            Library.notify(response.message, 'success');
            // Kiểm tra nếu là thêm mới thì load lại dữ liệu màn hình danh sách
            if(this.EvaluationModel.getGroup() == 'PHUONG_XA'){
              this.route.navigate(['/system/evaluation_commune/defines']);
            }
            if(this.EvaluationModel.getGroup() == 'THON_BAN'){
              this.route.navigate(['/system/evaluation_village/defines']);
            }
            if(this.EvaluationModel.getGroup() == 'QUAN_HUYEN'){
              this.route.navigate(['/system/evaluation/defines']);
            }
            activeModal.hide();
        } else {
            Library.notify(response.message, 'error');
        }
    });
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
    this.bsModalRef.hide();
  }
}

class EvaluationList {
  id: string = "";
  evaluation_id: string = "";
  evaluation: string = "";
  name: string = "";
  max_point: string = "";
  enquire: string = "";
  c_order: number;
}
