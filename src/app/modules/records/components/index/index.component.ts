import { Component, OnInit } from '@angular/core';
import { Records, RecordsModel} from '../../models/RecordsModel';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  Records: any;
  bsModalRef: BsModalRef;
  txt_search = '';
  listsGroup: any;
  years: any;
  defaultVisible: false;
  users: any;
  c: any;
  selectedItems:any;
  selectedItem:any;
  pageEnabled: boolean = false;
  arrGD:any;
  stage:any;
  constructor(
    private HttpService:HttpService,
    public RecordsModel: RecordsModel,
    private modalService: BsModalService,
    private route: Router,
    private router: ActivatedRoute,
    public apiService: ApiService,
  ) { }

  ngOnInit() {
    this.loadList();
  }

  // load du lieu man hinh danh sach
  async loadList() {
    let params = {
      txtSearch: this.txt_search,
      stage: this.stage
    };
    Library.showloading();
    this.getGD();
    this.getAll(params);
    Library.hideloading();
  }
  getAll(params) {
    this.HttpService.getMethods("records/getall", params).subscribe(
        result => {
          this.Records = result.data;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  getGD() {
    let parram = {};
    this.HttpService.getMethods("evaluation/getGD", parram).subscribe(
        result => {
          this.arrGD = result.data;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  filterSelectedGD(e){
    this.stage = e.selectedItem.code
    this.RecordsModel.setGiaDoan(this.stage);
    // this.loadList();
  }
  setStatus(data) {
    if (data.current_status == '1') {
      return 'Mới tạo';
    } else if (data.current_status == '2') {
      return 'Đã gửi đơn vị';
    } else if (data.current_status == '3') {
      return 'Đang chấm điểm';
    } else {
      return 'Kết thúc';
    }
  }
  convertFromdate(data) {
    return Library.formatDate(data.fromdate);
  }

  convertTodate(data) {
    return Library.formatDate(data.todate);
  }

  selectEvaluation(e) {
    this.selectedItems = e.selectedRowsData;
    this.selectedItem = e.selectedRowsData;
  }
  /**
   * ---------------------- Các sự kiện thêm, sửa, xóa ----------------------------
   */

  add() {
    this.RecordsModel.Records = new Records;
    this.modalService.show(AddComponent, { class: 'modal-xl', backdrop: 'static', keyboard: false });
  }

  edit() {

    let i = 0;
    let a;
    let iditem;
    this.selectedItems.forEach((item) => {
      i++;
      iditem = item.id;
    });
    if (i == 0) {
      Library.notify("Vui lòng chọn đối tượng để sửa", 'error');
      return;
    }
    if (i > 1) {
      Library.notify("Chỉ được chọn một đối tượng để sửa", 'error');
      return;
    } else if (i == 1) {
      this.RecordsModel.Records = this.selectedItems[0];
      this.modalService.show(AddComponent, { class: 'modal-xl', backdrop: 'static', keyboard: false });
    }
  }

  delete() {
    let Myclass = this;
    let selectedItems = this.selectedItems;
    let ids = '';
    let data = {
      ids: ""
    };
    var result = Library.confirm("Bạn có chắc chắn muốn xóa đối tượng đã chọn?", "Thông báo");
    if (result) {
      result.then(function (dialogResult) {
        if (dialogResult) {
          selectedItems.forEach((item) => {
            ids += item.id + ',';
          });
          data.ids = ids;
          //this.deleteEventtype(data, Myclass);
          Myclass.RecordsModel.deletes(data, Myclass);
        }
      });
    }
  }
  
}
