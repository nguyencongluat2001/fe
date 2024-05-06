import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';
import { CNoteComponent } from '../c_note/c_note.component';
import { RecordsModel } from '../../models/RecordsModel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.component.html',
  styleUrls: ['./tab3.component.scss']
})
export class Tab3Component implements OnInit {
  @Input() dataTab3: any;
  listData:any;
  onchangetree: any[] = [0];
  calculationsData = [];
  target:any;
  self_assessment_results:any;
  explanation:any;
  enquire:any;
  fileselected: File[] = [];
  arrfile:any = [];
  code_tp:any;
  constructor(
    public bsModalRef: BsModalRef,
    private HttpService: HttpService,
    private route: Router,
    private modalService: BsModalService,
    public RecordsModel: RecordsModel,
    ) {  
      let Myclass = this;
      // this.RecordsModel.setLoadListTab3(Myclass);
    }

  ngOnInit() {
    this.getTphs();
    // this.getcalculation();
  }
  getTphs() {
    this.HttpService.getMethods("records/getTphs", this.dataTab3).subscribe(
        result => {
          this.listData = result;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  handleFileInput(event,cell) {
    // console.log(event,cell)
    var arrfile = event.target.files;
    this.fileselected = arrfile[0]
    const fd = new FormData();
    fd.append('file', arrfile[0], arrfile[0].name)
    fd.append('code_tp', cell.data.code_tp);
    fd.append('id', cell.data.id)
    fd.append('record_id', cell.data.record_id)
    this.HttpService.postMethods('records/uploadfile_tp', fd).subscribe((response: any) => {
      if (response.success) {
          this.getTphs();
          Library.notify(response.message, 'success');
      } else {
          Library.notify(response.message, 'error');
      }
      Library.hideloading();
  }, error => {
      Library.hideloading();
      Library.notify(error, 'error');
  });
  }
  remove(filename) {
    let index = this.fileselected.findIndex(file => file.name == filename);
    this.fileselected.splice(index, 1);
  }
  removeonserver(cell){
    // let nameFile = filenameFull.split('!~!');             
    let Myclass = this;
    var result = Library.confirm("Bạn có chắc chắn muốn xóa file ?", "Thông báo");
    if (result) {
      result.then(function (dialogResult) {
        if (dialogResult) {
          Myclass.removeonserver_serve(cell);
        }
      });
    }
  }
  removeonserver_serve(cell) {
    let Myclass = this;
    const fd = new FormData();
    console.log(cell);
    fd.append('code_tp', cell.code_tp);
    fd.append('stream_id', cell.stream_id);
    fd.append('record_id', cell.record_id);
    this.HttpService.postMethods('records/remoteFile_tp', fd).subscribe((response: any) => {
      if (response.success) {
          Library.notify(response.message, 'success');
          // this.listfile_detail = response.listfile_detail;
          this.getTphs();
          // this.bsModalRef.hide();
      } else {
          Library.notify(response.message, 'error');
      }
      Library.hideloading();
  }, error => {
      Library.hideloading();
      Library.notify('Xóa file thất bại', 'error');
  });
  }
  goback() {
    
    let newrouter =this.route.url;
    this.route.navigate([newrouter]);
    this.bsModalRef.hide();
  }
  openfile(namefile){
    var baseurl=environment.API_BASE + 'file/openfile?namefile='+namefile;
     window.open(baseurl);
  }
}
