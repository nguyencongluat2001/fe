import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';
import { CNoteComponent } from '../c_note/c_note.component';
import { RecordsModel } from '../../models/RecordsModel';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.scss']
})
export class Tab2Component implements OnInit {
  @Input() dataTab2: any;
  listData:any;
  onchangetree: any[] = [0];
  calculationsData = [];
  target:any;
  self_assessment_results:any;
  explanation:any;
  enquire:any;
  evaluation_group_id:any;
  constructor(
    public bsModalRef: BsModalRef,
    private HttpService: HttpService,
    private route: Router,
    private modalService: BsModalService,
    public RecordsModel: RecordsModel,
    ) {  
      let Myclass = this;
      this.RecordsModel.setLoadListTab2(Myclass);
    }

  ngOnInit() {
    this.getTieuchi();
    this.getcalculation();
  }
  getTieuchi() {
    this.HttpService.getMethods("records/getTieuchi", this.dataTab2).subscribe(
        result => {
          this.listData = result.data.data;
          this.RecordsModel.setEvaluation_group_id = result.data.evaluation_group_id;
        },
        (error) => {
          Library.hideloading();
        }
      );
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
  showCnotedetail(data) {
    let Myclass = this;
    this.RecordsModel.setNote = data;
    this.RecordsModel.setLoadListTab2(Myclass);
    this.modalService.show(CNoteComponent, { backdrop: 'static', keyboard: false });
  }
  updateRow(e) {
    let param = e.data;
    param.id = e.key;
    // this.EvaluationModel.updateCriteria(param);
    // this.updateCriteria(param);
    // this.loadList();
  }
  selectEvaluation(e) {

  }
  checkValidating(e) {}
  initNewRow(e) {
    let count = 0,parentid = e.data.parrent_id;
    e.data.Task_Status = "Not Started";
    e.data.Task_Start_Date = new Date();
    e.data.Task_Due_Date = new Date();
    // e.data.c_order = this.EvaluationModel.listData.length+1;
  }
  insertRow(e) {}
  onRowPrepared(e) {
    if (e.rowType == "data") {
      if (e.rowIndex % 2 == 0) {
        // $(e.rowElement).addClass("dx-column-lines-color");
      }
    }
  }
  goback() {
    
    let newrouter =this.route.url;
    this.route.navigate([newrouter]);
    this.bsModalRef.hide();
  }
}
