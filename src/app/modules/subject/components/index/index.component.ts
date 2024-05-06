import { HttpService } from 'src/app/core/http.service';
import { Subject, SubjectGroup, SubjectModel } from './../../models/SubjectModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddComponent } from '../add/add.component';
import { CopyComponent } from '../copy/copy.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Library } from 'src/app/shared/library/main';
import { HttpClient } from '@angular/common/http';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  ListSubject: SubjectGroup[];
  selectedItems: SubjectModel[] = [];
  bsModalRef: BsModalRef;
  data: any;
  dataUnit: any;
  system_list: any;
  system_list_code: any;
  evaluation:any;
  evaluation_id: any;
  unit_id: any;
  arrUnit: any;
  type_group: any;
  dataTab: any;
  selectItemTabs: any;
  selectedIndex: any = 0;
  pageEnabled: boolean = false;
  baseUrl = 'sociological/subject/';

  constructor(
    private SubjectModel: SubjectModel,
    private http: HttpClient,
    private route: Router,
    private router: ActivatedRoute,
    private modalService: BsModalService,
    private HttpService: HttpService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataUnit = JSON.parse(localStorage.getItem('unit_infor'));
    this.getSubjectGroup();
    // this.getevaluation();
    // this.loadList();
    this.SubjectModel.setLoadList(this);
  }
  
  async getSubjectGroup(){
    let params = {
      user_id: JSON.parse(localStorage.getItem('user_infor'))['id'],
      capdonvi: this.dataUnit['capdonvi'],
    };
    Library.showloading();
    this.HttpService.getMethods(this.baseUrl + "getSubjectGroup", params).subscribe(
      response => {
        Library.hideloading();
        this.dataTab = response.data;
      });
  }

  handlePropertyChange(e){
    this.pageEnabled = false;
    this.ListSubject = [];
    this.unit_id = undefined;
    if(this.SubjectModel.subjects != undefined){
      this.SubjectModel.subjects.evaluation_id = '';
    }
    this.selectItemTabs = this.dataTab[e.index].code;
    this.listtypeChange();
  }
  // Thay đổi khi click vào tab
  listtypeChange(){
    if(this.selectItemTabs == 'CAP_SO' || this.selectItemTabs == 'LANH_DAO_CAP_XA'){ // Đợt đánh giá cấp huyện
      this.type_group = 'QUAN_HUYEN';
    }else if(this.selectItemTabs == 'CAP_HUYEN' || this.selectItemTabs == 'LANH_DAO_CAP_HUYEN'){ // Đợt đánh giá cáp Sở
      this.type_group = 'SO_NGANH';
    } else{
      this.type_group = undefined;
    }
    this.getevaluation();
  }
  // Danh sách đợt đánh giá
  async getevaluation() {
    var params = {
      system_list_code: this.selectItemTabs,
    };
    if(this.type_group){
      params['group'] = this.type_group;
    }
    Library.showloading();
    this.HttpService.getMethods(this.baseUrl + "getevaluation", params).subscribe(
      response => {
        Library.hideloading();
        this.evaluation = response.data;
        if(this.SubjectModel.subjects != undefined && this.SubjectModel.subjects.evaluation_id != ''){
          this.evaluation_id = this.SubjectModel.subjects.evaluation_id;
        }else{
          this.evaluation_id = this.evaluation[0].id;
        }
        if($.inArray(this.selectItemTabs, ['LANH_DAO_CAP_HUYEN', 'LANH_DAO_CAP_XA'])){
          this.getUnit();
        }
        this.loadList();
      });
  }
  // Danh sách đối tượng
  async loadList(){
    let params = {
      user_id: JSON.parse(localStorage.getItem('user_infor'))['id'],
      ownercode: this.dataUnit['code'],
      evaluation_id: this.evaluation_id,
      system_list_code: this.selectItemTabs,
    };
    if(this.unit_id){
      params['unit_id'] = this.unit_id;
    }
    Library.showloading();
    this.HttpService.getMethods(this.baseUrl + "getall", params).subscribe(
      response => {
        Library.hideloading();
        this.data = response.data;
        this.ListSubject = this.data['data'];
        if(this.ListSubject.length > 0){
          this.pageEnabled = true;
        }else{
          this.pageEnabled = false;
        }
      });
  }
  // Hiển thị đơn vị của phiếu 05, 06
  async getUnit() {
    Library.showloading();
    var params = {
      capdonvi: 'QUAN_HUYEN',
    };
    if(this.dataUnit['capdonvi'] != 'SO_NGANH'){
      params['id'] = JSON.parse(localStorage.getItem('unit_infor'))['id'];
    }
    
    this.HttpService.getMethods(this.baseUrl + "getUnit", params).subscribe(
      response => {
        Library.hideloading();
        this.arrUnit = response.data;
        if(this.arrUnit.length == 1){
          this.unit_id = this.arrUnit[0].id;
        }
      });
  }

  evaluationchange(e) {
    if(e.selectedItem && this.evaluation_id != e.selectedItem.id){
      this.evaluation_id = e.selectedItem.id;
    }
    this.SubjectModel.setEvalue(this.evaluation_id);
  }
  changeUnit(e) {
    if(e.selectedItem){
      this.unit_id = e.selectedItem.id;
    }else{
      this.unit_id = undefined;
    }
  }
  selectionChangedSubject(data: any){
    this.selectedItems = data.selectedRowsData;
  }
  add(){
    this.SubjectModel.subjects = new Subject;
    this.SubjectModel.subjects.system_list_code = this.selectItemTabs;
    this.bsModalRef = this.modalService.show(AddComponent,{ class: 'modal-lg subject-modal', backdrop: 'static', keyboard: false });

  }
  edit(){
    let i = 0;
    let a;
    let iditem;
    this.selectedItems.forEach((item) => {
      i++;
      iditem = item['id'];
    });
    if (i == 0) {
      Library.notify("Vui lòng chọn đối tượng để sửa", 'error');
      return;
    }
    if (i > 1) {
      Library.notify("Chỉ được chọn một đối tượng để sửa", 'error');
      return;
    } else if (i == 1) {
      this.SubjectModel.setSubject(this.selectedItems[0]);
      this.bsModalRef = this.modalService.show(AddComponent,{ class: 'modal-lg subject-modal', backdrop: 'static', keyboard: false });
    }
  }
  delete() {
    const dialogData = new ConfirmDialogModel('Xác nhận', 'Bạn có chắc chắn muốn xóa đối tượng đã chọn?');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30%',
      disableClose: true,
      data: dialogData,
    });

    let ids = '';
    this.selectedItems.forEach((item) => {
      ids += item['id'] + ',';
    });
    let params = {
      ids: ids
    }

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult == true) {
        this.HttpService.postMethods(this.baseUrl + "delete", params).subscribe(
          (response: any) => {
            Library.hideloading();
            if (response.data.status) {
              Library.notify(response.data.message, 'success');
              this.loadList();
            } else {
              Library.notify(response.data.message, 'error');
            }
          });
      }
    });


  }
  copy(){
    this.SubjectModel.subjects = new Subject;
    this.SubjectModel.subjects.evaluation_id = this.evaluation_id;
    this.SubjectModel.subjects.system_list_code = this.selectItemTabs;
    this.bsModalRef = this.modalService.show(CopyComponent,{ class: 'modal-lg', backdrop: 'static', keyboard: false });

  }
  export(){
    Library.showloading();
    var params = {
      user_id: JSON.parse(localStorage.getItem('user_infor'))['id'],
      unit_id: this.unit_id,
      ownercode: this.dataUnit['code'],
      evaluation_id: this.evaluation_id,
      system_list_code: this.selectItemTabs,
    };
    this.HttpService.postMethods(this.baseUrl + 'export', params).subscribe(
      result => {
        Library.hideloading();
        if(result.status && result.data.success){
          window.location.href = result.data.urlfile;
        }else{
          Library.notify(result.data.message, 'error');
        }
      }
    );
  }

}
