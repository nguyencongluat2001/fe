import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddComponent } from '../add/add.component';
import { Listtype, ListtypeModel } from '../../export';
import { Router } from '@angular/router';
import { Library } from 'src/app/shared/library/main';
import { DesignComponent } from '../design/design.component';
import { HttpService } from 'src/app/core/http.service';

/**
 * Component: xử lý màn hình danh sách loại danh mục.
 *
 * @author Toanph <skype: toanph1505>
 * Date: 09/01/2018
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  /**
   * Lưu thông tin danh sách các loại danh mục.
   *
   * @var object Listtype 
  */
  // listtypes: Listtype[];
  listtypes:any;
  /**
   * Lưu thông tin 1 loại danh mục (khi người dùng chọn ô textbox màn hình danh sách).
   *
   * @var object Listtype 
  */
  selectedItems: Listtype[] = [];

  bsModalRef: BsModalRef;

  constructor(
    private HttpService: HttpService,
    private ListtypeModel: ListtypeModel
    , private router: Router
    ,private modalService: BsModalService) { }

  ngOnInit() {
    this.loadlist();
  }

  // Load du lieu man hinh danh sach
  async loadlist() {
    Library.showloading();
    this.getAll();
    // this.listtypes = await this.ListtypeModel.getAll();
    Library.hideloading();
  }
  getAll() {
    let parram = {};
    this.HttpService.getMethods("listtype/getall", parram).subscribe(
        result => {
          this.listtypes = result.data;
        },
        (error) => {
          Library.hideloading();
        }
    );
}

  // Khi chon mot danh muc trong màn hình danh sách
  selectionChanged(data: any) {
    this.selectedItems = data.selectedRowsData;
  }

  // Thay đổi cột trạng thái màn hình danh sách
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
    if(e.rowType == "data"){
      if (e.rowIndex % 2 == 0){
        // $(e.rowElement).addClass("dx-column-lines-color");
      }
    }
  }

  add() {
    this.ListtypeModel.setListtype(false);
    this.bsModalRef = this.modalService.show(AddComponent,{ class: 'modal-lg', backdrop: 'static', keyboard: false });
  }

  edit() {
    let i = 0;
    let iditem;
    this.selectedItems.forEach((item) => {
      i++;
      iditem = item.id;
    });
    if (i > 1) {
      Library.notify("Không được chọn nhiều hơn 1", 'error');
    } else if (i == 1) {
      this.ListtypeModel.setListtype(this.selectedItems[0]);
      this.bsModalRef = this.modalService.show(AddComponent, { class: 'modal-lg', backdrop: 'static', keyboard: false });
    } else {
    }
  }

  designs() {
    let i = 0;
    let iditem;
    this.selectedItems.forEach((item) => {
      i++;
      iditem = item.id;
    });
    if (i > 1) {
      Library.notify("Không được chọn nhiều hơn 1", 'error');
    } else if (i == 1) {
      this.ListtypeModel.setListtype(this.selectedItems[0]);
      this.bsModalRef = this.modalService.show(DesignComponent, { class: 'modal-hg', backdrop: 'static', keyboard: false });
    } else {
    }
  }

  // xoa du lieu
  delete() {
    let Myclass = this;
    let selectedItems = this.selectedItems;
    let ids = '';
    let data = {
      ids: ""
    };
    var result = Library.confirm("Bạn có chắc chắn muốn xóa đối tượng đã chọn?", "Thông báo");
    if(result){
      result.then(function (dialogResult) {
        if (dialogResult) {
          selectedItems.forEach((item) => {
            ids += item.id + ',';
          });
          data.ids = ids;
          Myclass.ListtypeModel.delete(data,Myclass);
        }
      });
    }
  }

}
