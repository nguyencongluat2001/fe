import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Users, UsersModel } from '../../models/users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() users: Users[];
  selectedItems: Users[] = [];
  bsModalRef: BsModalRef;
  constructor(public userModels: UsersModel,private modalService: BsModalService) { 
  }

  ngOnInit() {
  }

  selectionChangedUser(e){
    // this.userModels.setUser(e.selectedRowsData);
    this.userModels.setSelectItems(e.selectedRowsData);
  }

  setStatus(data){
    if (data.status == 1) {
      data.status = true;
      return 'Hoạt động';
    } else {
      data.status = false;
      return 'Không hoạt động';
    }
  }

  setRole(data){
    if(data.role == '1'){
      return 'Quản trị hệ thống';
    }else if(data.role == '2'){
      return 'Quản trị đơn vị triển khai';
    }else if(data.role == '3'){
      return 'Người dùng'
    }
    return true;
  }

}
