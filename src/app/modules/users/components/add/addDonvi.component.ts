import { Component, OnInit } from '@angular/core';
import { Departments, DepartmentsModel } from '../../models/departments.model';
import { AgencyModel } from '../../models/agency.model';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add',
  templateUrl: './addDonvi.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddDonViComponent implements OnInit {
  departments : any;
  department : Departments;
  capdonvi: any;
  donvi = '';

  constructor(private departmentModel: DepartmentsModel,public bsModalRef: BsModalRef,private agencyModel: AgencyModel) {
    this.departments = departmentModel.getDepartment();
    this.departments.parentName = this.departmentModel.parentName;
    console.log(this.departmentModel.parentName)
    if(this.departmentModel.parentName == undefined || this.departmentModel.parentName == ''){
      this.departments.parentName = 'Tỉnh YÊN BÁI';
    }
    console.log(33,this.departments.parentName)

  }

  ngOnInit() {
    this.capdonvi = this.agencyModel.getCapdonvi();
  }

  onSubmit(e){
    let getRoute = this.departmentModel.getRouter();
    if(!getRoute){
      this.departmentModel.setCheckRoute('users');
    }
    let parent_id = this.bsModalRef.content.id;
    this.departments.parent_id = parent_id;
    this.departments.getType = 'donvi';
    this.departmentModel.update(this.departments,this.bsModalRef);
    e.preventDefault();
    this.departmentModel.setSelectItems(false);
  }

}
