import { Component, OnInit, Input } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Library } from 'src/app/shared/library/main';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RecordsModel } from '../../models/RecordsModel';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-c_note',
  templateUrl: './c_note.component.html',
  styleUrls: ['./c_note.component.scss']
})
export class CNoteComponent implements OnInit {

  @Input() data: any;
  self_assessment_results: any;
  baseUrl: string;
  headers: any;
  c_note:any;
  constructor(
    private http: HttpClient,
    public bsModalRef: BsModalRef,
    private RecordsModel: RecordsModel,
    private route: Router,
    private HttpService:HttpService,
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    // this.loadlist();

  }

  ngOnInit() {
    this.self_assessment_results = this.RecordsModel.getNote['self_assessment_results'];
  }

  
  onupload(){
    let id = this.RecordsModel._note
    ['idRecordList'];
    var unit_infor = this.RecordsModel.getNote['ownercode'];
    var param = {
      records_list_id: id,
      ownercode: unit_infor,
      self_assessment_results:this.self_assessment_results
    };
    Library.showloading();
    this.HttpService.postMethods('records/updateSelfAssessmentResults', param).subscribe((response: any) => {
      if (response['success']) {
          Library.notify(response.message, 'success');
          // MyClass.loadList();
          this.RecordsModel.getLoadListTab2().getTieuchi();
          this.bsModalRef.hide();
      } else {
          Library.notify(response.message, 'error');
      }
      Library.hideloading();
    }, error => {
        Library.hideloading();
        Library.notify(error, 'error');
  });
  }
}
