import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListtypeApi, ListtypeModel } from '../../export';
import { BsModalRef } from 'ngx-bootstrap/modal';
/**
 * Component: Thêm, sửa một loại danh mục.
 *
 * @author Toanph <skype: toanph1505>
 * Date: 09/01/2018
 */
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  // Lưu thông tin một loại danh mục.
  // listtype: ListtypeApi;
  listtype:any;
  title: string;
  constructor(
    private ListtypeModel: ListtypeModel
    ,public bsModalRef: BsModalRef,
    private route: Router,
  ) {
    this.listtype = ListtypeModel.getListtype();
  }

  ngOnInit() {
  }

  update = function (e) {
    this.ListtypeModel.update(this.listtype,this.bsModalRef);
    e.preventDefault();
  }
  goback() {
    let newrouter = "/system/listtype";
    this.route.navigate([newrouter]);
    this.bsModalRef.hide();
  }
}
