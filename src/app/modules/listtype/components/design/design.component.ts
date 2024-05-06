import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ListtypeModel } from '../../export';
import { BsModalRef } from 'ngx-bootstrap/modal';

/**
 * Component: Định nghĩa giao diện cho một danh mục đối tượng.
 *
 * @author Toanph <skype: toanph1505>
 * Date: 12/01/2018
 */
@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  /**
   * Lưu đối tượng FormBuilder.
   *
   * @var any
  */
  formBuilder: any;
  option:any;
  data:any;
  dataconvert:any;
  /**
   * Lưu đối tượng danh sách loại danh mục.
   *
   * @var any
  */
  listtypes: any;

  constructor(
    private ListtypeModel: ListtypeModel
    ,private location: Location
    ,public bsModalRef: BsModalRef
    ,private router: Router
  ) { 
    this.listtypes = this.ListtypeModel.getAllLabel();
  }

  ngOnInit(): void {
    //var option = this.ListtypeModel.getDescription();
    this.codes();

  }
  codes(){
    this.dataconvert = this.ListtypeModel.listtype.list_description;
    var str= this.dataconvert.replace("/","NO");
    this.data = str;
    console.log(this.ListtypeModel.listtype)
  }

  update(){
    var datas = $('#form').serializeArray();
    let parram = {
      id: this.ListtypeModel.listtype.id,
      value: datas[0].value
    };
    this.ListtypeModel.update(parram,this.bsModalRef);
  }
  goback() {
    let newrouter = "/system/listtype";
    this.router.navigate([newrouter]);
    this.bsModalRef.hide();
  }

}
