import { Component, OnInit } from '@angular/core';
import { ListModel } from '../../export'
import { Router } from '@angular/router';
import { ListtypeModel } from 'src/app/modules/listtype/export';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Library } from 'src/app/shared/library/main';
/**
 * Component: Thêm, sửa một đối tượng danh mục.
 *
 * @author Toanph <skype: toanph1505>
 * date: 17/01/2018
 */
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  // Lưu thông tin mô tả form của danh mục đối tượng
  description: any;

  // Lưu Id của danh mục cha
  listtypeId: any;
  listtype:any;
  // Dữ liệu mặc định
  data: any;
  data_group:any;
  // Dữ liệu đối tượng danh mục
  list: any;
  group:any;
  listtype_code:any;
  showGroup:any = 0;
  constructor(
    private ListModel: ListModel
    , private ListtypeModel: ListtypeModel
    , public bsModalRef: BsModalRef
    , private route: Router, ) {
      // let getCode_unit = this.ListModel.getCode_unit();
      this.group = [
        {
          code:'QUAN_HUYEN',
          name:'Quận huyện'
        },
        {
          code:'PHUONG_XA',
          name:'Phường xã'
        },
        {
          code:'THON_BAN',
          name:'Thôn bản'
        }
      ]
     }

  ngOnInit() {
    let list = this.ListModel.getList();
    this.list = list;
    let data: any;
    this.listtype = this.ListtypeModel.getListtype();
    this.listtype_code = this.listtype.code;
    if(this.listtype_code == 'NTM' || this.listtype_code == 'NTMNC' || this.listtype_code == 'NTMKM'){
      this.showGroup = 1
    }
    this.listtypeId = this.listtype.id;
    if (list) {
      data = list;
      this.data_group = list.group;
      if (list.data_json) {
        let objJsons = JSON.parse(list.data_json);
        for (let objJson of objJsons) {
          for (var event in objJson) {
            data[event] = objJson[event];
          }
        }
      }
    } else {
      data = this.ListModel.getdefault();
    }
    if (this.listtype.list_description) {
      this.description = JSON.parse(this.listtype.list_description);
    } else {
      this.description = this.ListtypeModel.getDefaultValue();
    }
     this.data = data;
  }

  onFormSubmit = function (e) {
    let dataUpdate: any = {};
    let dataJson: any = [];
    let i = 0;
    var checkupdate = true;
    let descriptions = this.description;
    let datas = $('form#form-list-update').serializeArray();

    for (let description of descriptions) {
      var key = description.key;
      let value = this.getValueByKey(datas, key)
      // Kiem tra xem thong tin bat buoc da nhap chua
      if (description.required && value == '') {
        // show error loi
        this.showError(key);
        checkupdate = false;
      }
      // Gan du lieu
      if (description.datajson) {
        if (value) {
          dataJson[i] = { [key]: value };
          i++;
        }
      } else {
        if (value) {
          dataUpdate[key] = value;
        }
      }
    }
    if (checkupdate) {
      dataUpdate.status = $('form#form-list-update').find("#status").is(':checked');
      dataUpdate.dataJson = JSON.stringify(dataJson);
      dataUpdate.listtypeId = this.listtypeId;
      dataUpdate.group = this.data_group;

      if (typeof this.list !== 'undefined') {
        dataUpdate.id = this.list.id;
      }
      this.ListModel.update(dataUpdate, this.bsModalRef, e);
      e.preventDefault();
    } else {
      Library.notify("Một số trường thông tin không được bỏ trống!", 'error');
    }
    e.preventDefault();
  }

  getValueByKey(datas, key) {
    var value = '';
    for (let data of datas) {
      if (data.name == key) {
        value = data.value;
      }
    }
    return value;
  }

  showError(key) {
  }
  goback() {
    let newrouter = "/system/list";
    this.route.navigate([newrouter]);
    this.bsModalRef.hide();
  }

}
