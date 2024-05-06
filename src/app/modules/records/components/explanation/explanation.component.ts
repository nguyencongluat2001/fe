import { Component, OnInit, Input } from '@angular/core';
// import { AddExplanationComponent } from '../add-explanation/add-explanation.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { RecordsModel } from '../../models/RecordsModel';
import { AddExplanationComponent } from '../add-explanation/add-explanation.component';
@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.component.html',
  styleUrls: ['./explanation.component.scss']
})
export class ExplanationComponent implements OnInit {

  @Input() data: any;
  arrfile: any = [];
  show: boolean;
  showexplan: boolean;
  explanation_file:any=[];
  is_return:any;
  constructor(
    private modalService: BsModalService,
    private RecordsModel:RecordsModel
  ) {
  }

  ngOnInit() {
    this.show = false;
    this.showexplan = false;
    if (this.data.listfile != '' && this.data.listfile != null) {
      this.arrfile = this.data.listfile;
      if (this.data.listfile != '' && this.data.listfile != null) {
        this.show = true;
      }
    }
    if (this.data.explanation_file != '' && this.data.explanation_file != null && this.data.explanation_file != undefined) {
      this.showexplan = true;
      // this.explanation_file = this.data.explanation_file;
    }
    // this.is_return=this.MarkpointModel.objExcute.is_return;
  }
  // showModal() {
  //   this.excuteModel.setlist = this.data;
  //   this.modalService.show(AddExplanationComponent);
  // }
  showexplandetail(){
    
    // this.MarkpointModel.setlist = this.data;
    this.RecordsModel.setDataFile = this.data;
    this.modalService.show(AddExplanationComponent,{backdrop: 'static', keyboard: false });
  }
  openfile(namefile) {
    let params = {
      namefile: namefile
    }
    var baseurl=environment.API_BASE + 'file/openfile?namefile='+namefile;
     window.open(baseurl);
    
  }
}

