import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ListModel } from '../../export';
import { AddComponent } from '../add/add.component';
import { ListtypeModel } from 'src/app/modules/listtype/export';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';

/**
 * Component: xử lý màn hình danh sách đối tượng danh mục.
 *
 * @author Toanph <skype: toanph1505>
 * date: 11/01/2018
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  //Lưu thông tin danh sách danh mục.
  listtypes: any;

  //Lưu thông tin danh sách danh mục trong selectbox.
  listtypeLabel: string[];

  //Lưu thông tin danh mục của danh mục đối tượng.
  listtypeId: any;

  // Lưu thông tin đối tượng danh mục được chọn trong màn hình .
  selectedItems: any[] = [];

  // Lưu thông tin danh sách đối tượng danh mục.
  lists: any = [];
  group:any;
  bsModalRef: BsModalRef;

  constructor(
    private HttpService: HttpService,
    private router: Router
    , private ListtypeModel: ListtypeModel
    , private ListModel: ListModel
    ,private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getAllListtypes();
    // this.ListModel.getCode_unit();

  }

  // Lấy danh sách đối tượng danh mục.
  async getAllListtypes() {
    Library.showloading();
    this.getAll();
    Library.hideloading();
  }
  getAll() {
    let parram = {};
    let listtype_label = [];
    let i = 0;
    this.HttpService.getMethods("listtype/getall", parram).subscribe(
        result => {
          this.listtypes = result.data;
          for (let listtype of this.listtypes) {
            listtype_label[i] = { "Id": listtype.id, "name": listtype.name };
            i++;
          }
          this.listtypeLabel = listtype_label;
          if (!this.ListtypeModel.getListtypeId()) {
            this.ListtypeModel.setListtypeId(listtype_label[0].Id);
          }
          this.listtypeId = this.ListtypeModel.getListtypeId();
        },
        (error) => {
          Library.hideloading();
        }
    );
  }
  // Khi select box thay đổi dữ liệu
  listChanged(e) {
    this.ListtypeModel.setListtypeId(e.value);
    for (let listtype of this.listtypes) {
      if (listtype.id == e.value) {
        this.ListtypeModel.setListtype(listtype);
      }
    }
    this.loadlist();
  }

  // hiển thị màn hình danh sách
  async loadlist() {
    let id = this.ListtypeModel.getListtypeId();
    Library.showloading();
    this.lists = await this.ListModel.getAll(id);
    this.ListModel.orderNext = this.lists.length + 1;
    this.ListModel.orderNext = 5;

    Library.hideloading();
  }

  // Trạng thái của đối tượng
  setStatus(data) {
    if (data.status == 1) {
      data.status = true;
      return 'Hoạt động';
    } else {
      data.status = false;
      return 'Không hoạt động';
    }
  }

  onRowPrepared(e) {
    if (e.rowType == "data") {
      if (e.rowIndex % 2 == 0) {
        $(e.rowElement).addClass("dx-column-lines-color");
      }
    }
  }
  add(){
    this.ListModel.setList('');
    this.bsModalRef = this.modalService.show(AddComponent,{ class: 'modal-lg', backdrop: 'static', keyboard: false });
  }

  edit() {
    this.ListModel.setList(this.selectedItems[0]);
    this.bsModalRef = this.modalService.show(AddComponent,{ class: 'modal-lg', backdrop: 'static', keyboard: false });
}

// Xóa đối tượng
delete() {
  let Myclass = this;
  let ids = '';
  let data = {
      ids: ""
  };
  let selectedItems = this.selectedItems;
  var result = Library.confirm("Bạn có chắc chắn muốn xóa đối tượng đã chọn?", "Thông báo");
  result.then(function (dialogResult) {
      if (dialogResult) {
          selectedItems.forEach((item) => {
              ids += item.id + ',';
          });
          data.ids = ids;
          Myclass.ListModel.delete(data, Myclass);
      }
  });
}

// Chọn đối tượng trong màn hình danh sách
selectionChanged(data: any) {
  this.selectedItems = data.selectedRowsData;
}
}
