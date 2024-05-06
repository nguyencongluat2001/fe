import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectModel } from '../../models/SubjectModel';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Library } from 'src/app/shared/library/main';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss']
})
export class CopyComponent implements OnInit {
  subjects: any;
  // ListSubject: SubjectGroup[];
  // selectedItems: SubjectModel[] = [];
  ListSubject: any;
  selectedItems: any;
  data: any;
  evaluation: any;
  evaluation_id: any;
  type_group: any;
  // selectedTabIndex = 'SO_NGANH';
  baseUrl = 'sociological/subject/';

  constructor(
    private SubjectModel: SubjectModel,
    private http: HttpClient,
    private route: Router,
    private router: ActivatedRoute,
    public bsModalRef: BsModalRef,
    private HttpService: HttpService,

  ) { }

  ngOnInit() {
    this.listtypeChange();
    // let Myclass = this;
    // this.subjects =  this.SubjectModel.getSubject;
    // this.SubjectModel.setLoadList(Myclass);
  }
  listtypeChange() {
    if (this.SubjectModel.subjects.system_list_code == 'CAP_SO' || this.SubjectModel.subjects.system_list_code == 'LANH_DAO_CAP_XA') {
      this.type_group = 'QUAN_HUYEN';
    } else if (this.SubjectModel.subjects.system_list_code == 'CAP_HUYEN' || this.SubjectModel.subjects.system_list_code == 'LANH_DAO_CAP_HUYEN') {
      this.type_group = 'SO_NGANH';
    }
    this.getevaluation();
  }

  async loadList() {
    let params = {
      evaluation_id: this.SubjectModel.subjects.evaluation_id,
      system_list_code: this.SubjectModel.subjects.system_list_code,
    };
    Library.showloading();
    this.HttpService.getMethods(this.baseUrl + "getAllSubject", params).subscribe(
      response => {
        Library.hideloading();
        this.ListSubject = response.data;
      });
  }
  async getevaluation() {
    var params = {
      system_list_code: this.SubjectModel.subjects.system_list_code,
    };
    if (this.type_group) {
      params['group'] = this.type_group;
    }
    this.HttpService.getMethods(this.baseUrl + "getevaluation", params).subscribe(
      response => {
        Library.hideloading();
        this.evaluation = response.data;
        if (this.SubjectModel.subjects != undefined) {
          this.evaluation_id = this.SubjectModel.subjects.evaluation_id;
        } else {
          this.evaluation_id = this.evaluation[0].id;
        }
      });
  }
  evaluationchange(e) {
    if (e.selectedItem) {
      this.evaluation_id = e.selectedItem.id;
      this.SubjectModel.setEvalue(this.evaluation_id);
      this.loadList();
    }
  }
  selectionChangedSubject(data: any) {
    this.selectedItems = data.selectedRowsData;
  }
  onSubmit(e) {
    let Myclass = this;
    let selectedItems = this.selectedItems;
    let ids = '';
    let data = [];
    selectedItems.forEach((item, key) => {
      data[key] = item;
      // ids += item['id'] + ',';
    });
    if (this.evaluation_id == '') {
      Library.notify('Chưa chọn đợt đánh giá', 'error');
      return;
    } else if (data.length == 0) {
      Library.notify('Chưa chọn đối tượng copy', 'error');
      return;
    } else {
      var params = {
        evaluation_id: this.evaluation_id,
        user_id: JSON.parse(localStorage.getItem('user_infor'))['id'],
        user_name: JSON.parse(localStorage.getItem('user_infor'))['name'],
        system_list_code: this.SubjectModel.subjects.system_list_code,
        data: data,
      }
      Library.showloading();
      this.HttpService.postMethods(this.baseUrl + "copy", params).subscribe(
        response => {
          Library.hideloading();
          if (response.data.status == true) {
            this.bsModalRef.hide();
            Library.notify(response.data.message, 'success');
            this.SubjectModel.loadList.loadList();
          } else {
            Library.notify(response.data.message, 'error');
          }
        });
    }
  }
}
