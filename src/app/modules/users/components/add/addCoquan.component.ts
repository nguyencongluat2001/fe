import { Component, OnInit } from '@angular/core';
import { DxSelectBoxModule } from 'devextreme-angular'
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UsersApi } from '../../services/users.service';
import { AgencyModel } from '../../models/agency.model';
import { Library } from 'src/app/shared/library/main';

@Component({
  selector: 'app-add',
  templateUrl: './addCoquan.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddCoquanComponent implements OnInit {

  agencys: any;
  capdonvi: any;
  donvi = '';

  constructor(
    public bsModalRef: BsModalRef,
    private userApi: UsersApi,
    private agency: AgencyModel) {}

  ngOnInit() {
    this.agencys = this.agency.getAgency();
    Library.showloading();
    this.userApi.getRootUnit().subscribe((response) => {
      this.agencys.parent_id = response[0].id;
      this.agencys.nameParent = response[0].address;
      Library.hideloading();
    });
    this.capdonvi = this.agency.getCapdonvi();
  }

  onSubmit(e){
    this.agency.update(this.agencys,this.bsModalRef);
    this.agency.setSelectItems(false);
  }

}
