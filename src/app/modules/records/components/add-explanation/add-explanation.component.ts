import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';
import { RecordsModel } from '../../models/RecordsModel';
@Component({
  selector: 'app-add-explanation',
  templateUrl: './add-explanation.component.html',
  styleUrls: ['./add-explanation.component.scss']
})
export class AddExplanationComponent implements OnInit {

  @Input() data: any;

  check = false;
  checkedit = false;
  baseUrl: string;
  headers: any;
  explanation: string;
  content_explanation: any;
  listfile: string;
  listfile_detail: any;
  value: any[] = [];
  index: number;
  fileselected: File[] = [];
  arrfile: any = [];
  items: any = [];
  id;
  arritem;
  status: any;
  is_return:any;
  DataFile:any;
  constructor(
    private HttpService:HttpService,
    public bsModalRef: BsModalRef,
    private RecordsModel: RecordsModel,
  ) {
    this.DataFile = this.RecordsModel.getDataFile
    this.loadlist();

  }

  ngOnInit() {
    // this.excuteModel.dataview = '';
  }
  handleFileInput(event) {
    // if (event.target.files[0].name != '') {
    //   this.fileselected.push(<File>event.target.files[0]);
    // }
    var arrfile = event.target.files;
    for (let i=0; i<arrfile.length;i++) {
      if (event.target.files[i].name != '') {
        this.fileselected.push(<File>event.target.files[i]);
      }
    }
  }
  async loadlist() {
    let id = this.DataFile.idRecordList;
    var unit_infor = JSON.parse(localStorage.getItem('unit_infor'));
    var param = {
      id: id,
      ownercode: unit_infor['code'],
    };
    // Library.showloading();
    // // this.items = await this.excuteModel.explanation_detail(param);
    this.explanation_detailsss(param);
    // Library.hideloading();
  }
  explanation_detailsss(param) {
    this.HttpService.postMethods("records/explanation_detail", param).subscribe(
        result => {
          this.items = result;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  onupload() {
    let idlist = this.DataFile.idRecordList;
    const fd = new FormData();
    var unit_infor = JSON.parse(localStorage.getItem('unit_infor'));
    for (let i in this.fileselected) {
      fd.append('file' + i, this.fileselected[i], this.fileselected[i].name)
    }
    let token = localStorage.getItem('token');
    fd.append('idlistexcute', idlist);
    fd.append('content_explanation', this.content_explanation);
    fd.append('ownercode', unit_infor['code']);
    fd.append('explanation_detail_id', this.id);
    fd.append('is_return', this.is_return);
    // this.excuteModel.getlist.explanation = this.explanation;
    // Library.showloading();
    this.HttpService.postMethods('records/uploadfile', fd).subscribe((response: any) => {
      if (response.success) {
          Library.notify(response.message, 'success');
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
    // this.http.post(this.baseUrl + 'uploadfile', fd, { headers: header, }).subscribe(res => {
    //   if (res['success']) {
    //     Library.hideloading();
    //     let index = this.excuteModel.listDataExcute.findIndex(list => list['id'] == idlist);
    //     if (res['listfile'] != '') {
    //       this.excuteModel.listDataExcute[index]['explanation'] = JSON.parse(res['explanation']);
    //     }

    //     if (res['listfile'] != '') {
    //       this.excuteModel.listDataExcute[index]['listfile'] = JSON.parse(res['listfile']);
    //     }
    //     this.bsModalRef.hide();
    //     Library.showloading();
    //     this.loadlist();
    //     this.excuteModel.loadList.loadList();
    //     this.check = false;
    //     this.checkedit = false;
    //     this.fileselected = [];
    //     this.explanation_detail = [];
    //     this.id = 'undefined';
    //     Library.hideloading();
    //   } else {
    //     Library.notify('Quá trình đính kèm file bị lỗi', 'error');
    //     Library.hideloading();
    //   }
    // });

  }
  remove(filename) {
    let index = this.fileselected.findIndex(file => file.name == filename);
    this.fileselected.splice(index, 1);
  }
  removeonserver(item, filenameFull,filename){
    let nameFile = filenameFull.split('!~!');             
    let Myclass = this;
    var result = Library.confirm("Bạn có chắc chắn muốn xóa file " + nameFile[1] + " ?", "Thông báo");
    if (result) {
      result.then(function (dialogResult) {
        if (dialogResult) {
          Myclass.removeonserver_serve(item, filenameFull,filename);
        }
      });
    }
  }
  removeonserver_serve(item, filenameFull,filename) {
    let Myclass = this;
    const fd = new FormData();
    // console.log(555,filenameFull,filename,this.RecordsModel._dataFile);
    // id records
    let idRecord = this.RecordsModel._records.id;
    // id recordsList
    let idRecordList = this.RecordsModel._dataFile.idRecordList;
    fd.append('idlistexcute', idRecordList);
    fd.append('filenameFull', filenameFull);
    fd.append('explanation_detail_id', item.id);
    fd.append('ownercode', JSON.parse(localStorage.getItem('unit_infor'))['code']);
    this.HttpService.postMethods('records/remoteFile', fd).subscribe((response: any) => {
      if (response.success) {
          Library.notify(response.message, 'success');
          this.listfile_detail = response.listfile_detail;
          Myclass.loadlist();
          // this.bsModalRef.hide();
      } else {
          Library.notify(response.message, 'error');
      }
      Library.hideloading();
  }, error => {
      Library.hideloading();
      Library.notify('Xóa file thất bại', 'error');
  });
    // let idlist = this.RecordsModel.getlist['id'];
    // let filename=item.listfiles['filename']
    // fd.append('idlistexcute', idlist);
    // fd.append('filenameFull', filenameFull);
    // fd.append('explanation_detail_id', item.id);
    // fd.append('ownercode', JSON.parse(localStorage.getItem('unit_infor'))['code']);
    // let token = localStorage.getItem('token');
    // let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    // let index = this.excuteModel.listDataExcute.findIndex(list => list['id'] == idlist);
    // Library.showloading();
    // this.http.post(this.baseUrl + 'removefile', fd,{ headers: header, }).subscribe(res => {
    //   if (res['success']) {
    //     Library.hideloading();
    //     let index2 = this.excuteModel.listDataExcute[index]['listfile'].findIndex(file => file['urlFile'] == filename);
    //     this.excuteModel.listDataExcute[index]['listfile'].splice(index2, 1);
    //     let index1 = item.listfiles.findIndex(file => file['urlFile'] == filename);
    //     item.listfiles.splice(index1, 1);
    //     this.route.routeReuseStrategy.shouldReuseRoute = function () {
    //       return false;
    //     }
    //   } else {
    //     Library.notify('Xóa file thất bại', 'error');
    //     Library.hideloading();
    //   }
    // });
  }
  delete(item){
    let Myclass = this;
    // let idlist = this.excuteModel.getlist['id'];
    var unit_infor = JSON.parse(localStorage.getItem('unit_infor'));
    var param = {
      listfile_detail: item.listfiles,
      id: item.id,
      // idlist: idlist,
      ownercode: unit_infor['code']
    };
    var result = Library.confirm("Bạn có chắc chắn muốn xóa đối tượng đã chọn?", "Thông báo");
    if (result) {
      result.then(function (dialogResult) {
        if (dialogResult) {
          Myclass.delete_explanation(param,Myclass);
        }
      });
    }
  }
  delete_explanation(data, MyClass) {
    Library.showloading();
    this.HttpService.postMethods('records/delete_explanation', data).subscribe((response: any) => {
      if (response.success) {
          Library.notify(response.message, 'success');
          MyClass.loadlist();
      } else {
          Library.notify(response.message, 'error');
      }
      Library.hideloading();
    }, error => {
        Library.hideloading();
        Library.notify('Xóa file thất bại', 'error');
    });
  }
  edit(item){
    if(item.is_return!='1' && this.is_return=='1'){
      Library.notify('Không được sửa bản ghi này', 'error');
      return false;
    }
    this.check = false;
    this.checkedit = true;
    this.content_explanation = item.explanation;
    this.listfile_detail = item.listfile_arr;
    this.id = item.id;
    this.arritem = item;
    this.fileselected = [];
    if (this.content_explanation == 'null') {
      this.content_explanation = [];
    }
    return true;
  }
  openfile(namefile){
    var baseurl=environment.API_BASE + 'file/openfile?namefile='+namefile;
     window.open(baseurl);
  }
}
