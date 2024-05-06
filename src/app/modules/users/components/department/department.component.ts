import { Component, OnInit, TemplateRef, Input, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Departments, DepartmentsModel } from '../../models/departments.model';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {

  @Input() departments: Departments[];
  constructor(public department: DepartmentsModel,private modalService: BsModalService) { 
  }

  ngOnInit() {
  }

  selectionChangedDonvi(e){
    // this.department.setDepartment(e.selectedRowsData);
    this.department.setSelectItems(e.selectedRowsData);
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


}
