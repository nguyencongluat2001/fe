import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { EvaluationModel } from '../../models/EvaluationModel';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-adjourn',
  templateUrl: './adjourn.component.html',
  styleUrls: ['./adjourn.component.scss']
})
export class AdjournComponent implements OnInit {

  @Input() data: any;
  deadline: Date;
  maxdate:Date;
  baseUrl: string;
  headers: any;
  mindate:Date;
  constructor(
    private HttpService: HttpService,
    private http: HttpClient,
    public bsModalRef: BsModalRef,
    private EvaluationModel: EvaluationModel,
    private route: Router,
  ) {
    this.deadline = this.EvaluationModel.Evaluation.todate;
    this.maxdate = this.EvaluationModel.Evaluation.todate;
    this.mindate = this.EvaluationModel.Evaluation.fromdate;
  }

  ngOnInit() {
  }
  onupload() {
    var a = new Date(this.deadline);
    var date = a.toLocaleDateString("en-US");
    if (this.deadline == undefined) {
      date = '';
    }
    else {
      date = date;
    }
    let param = {
      evalution_id: this.EvaluationModel.Evaluation.id,
      ownercode: JSON.parse(localStorage.getItem('unit_infor'))['code'],
      deadline_ward:date
    };
    // this.EvaluationModel.updateDeadline(param);
    this.updateDeadline(param);
    this.bsModalRef.hide();
    this.goBack();
  }
  updateDeadline(data) {
    Library.showloading();
    this.HttpService.postMethods('evaluation/updateDeadline', data).subscribe((response: any) => {
        if (response.success) {
            Library.hideloading();
            Library.notify(response.message, 'success');
            let newrouter = "";
            newrouter = "/system/evaluation/index";
            this.route.navigate([newrouter]);
        }
        else {
            Library.notify(response.message, 'error');
            Library.hideloading();
        }
    });
}
  goBack() {
    this.bsModalRef.hide();
    let newrouter = "/system/evaluation";
    this.route.navigate([newrouter]);
   
  }
}
