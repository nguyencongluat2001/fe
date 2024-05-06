import { Component, OnInit, Input } from '@angular/core';
import { UsersModel } from '../../models/users.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() userSearch:any;
  constructor(
    public userModel: UsersModel
  ) { }

  ngOnInit() {
  }

  selectionChangedUserSearch(e){
    this.userModel.setSelectItems(e.selectedRowsData);
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
    if(data.position == 'CHUC_VU_CV'){
      return 'Chuyên viên';
    }else if(data.position == 'CHUC_VU_GD'){
      return 'Giám đốc';
    }
    return true;
  }

}
