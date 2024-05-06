import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectModel } from '../../models/SubjectModel';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { Library } from 'src/app/shared/library/main';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  dataUnit: any;
  subjects: any;
  baseUrl: string;
  id:any;
  name: any;
  sex: any;
  email: any;
  unitLevel: any;
  unit_id_survey = [];
  unit_id: any;
  unit_name: any;
  position_name: any;
  fromdate: any;
  age: any;
  phone: any;
  level: any;
  user_id: any;
  list_sex: any;
  evaluation_id:any;

  arrUnitLevel: any;
  arrUnit: any;
  arrUnitSurvey: any;
  arrLevel: any;
  arrPosition: any;
  system_list_code: any;
  // subject : SubjectModel;
  constructor(
    private route: Router,
    private SubjectModel:SubjectModel,
    public bsModalRef: BsModalRef,
    private http: HttpClient,
    private HttpService: HttpService,
  ) { 
    this.subjects = SubjectModel.getSubject();
    this.evaluation_id =  this.SubjectModel.getEvalue();
    if( this.subjects != undefined && this.subjects != '' && this.subjects.id != ''){
      this.id = this.subjects.id;
      this.name = this.subjects.name;
      this.sex = this.subjects.sex;
      this.email = this.subjects.email;
      this.position_name = this.subjects.position;
      this.evaluation_id = this.evaluation_id;
      this.age = this.subjects.age;
      this.phone = this.subjects.phone;
      this.level = this.subjects.level;
      this.unit_name = this.subjects.unit_name;
      this.unit_id = this.subjects.unit_id;
      this.unit_id_survey = this.subjects.unit_id_survey != null ? this.subjects.unit_id_survey.split(',') : undefined;
      if(this.subjects.system_list_code == 'LANH_DAO_CAP_XA' && this.unit_id_survey.length == 1){
        this.unit_id_survey = this.unit_id_survey[0];
      }
    }else{
      this.name = '';
      this.sex = '';
      this.email = '';
      this.position_name = '';
      this.age = '';
      this.phone = '';
      this.level = '';
      this.unit_name = '';
      this.evaluation_id = this.evaluation_id;
    }
    this.system_list_code = this.SubjectModel.subjects.system_list_code;
    this.list_sex = SubjectModel.getSex();
    if(this.system_list_code == 'LANH_DAO_CAP_XA' && JSON.parse(localStorage.getItem('unit_infor'))['capdonvi'] == 'QUAN_HUYEN'){
      this.unit_id_survey = JSON.parse(localStorage.getItem('unit_infor'))['id'];
    }

    // set base Url
    this.baseUrl = 'sociological/subject/';
  }

  ngOnInit() {
    this.dataUnit = JSON.parse(localStorage.getItem('unit_infor'));
    this.subjects =  this.SubjectModel.getSubject;
    this.getlevel();
    this.getUnitSurvey();
    if(this.dataUnit['capdonvi'] == 'QUAN_HUYEN') this.getUnit();
    if(this.dataUnit['capdonvi'] == 'SO_NGANH') 
      this.getArrUnitLevel(); 
      if(this.SubjectModel.subjects.id != '') this.getUnitLevel();
  }
  async getlevel() {
    var params = {};
    this.HttpService.getMethods(this.baseUrl + "getLevel", params).subscribe(
      response => {
        Library.hideloading();
        this.arrLevel = response.data;
      });
  }
  async getUnitSurvey() {
    var params = {
      capdonvi: this.system_list_code == 'LANH_DAO_CAP_HUYEN' ? 'SO_NGANH' : 'QUAN_HUYEN',
    };
    if(this.system_list_code == 'LANH_DAO_CAP_XA' && JSON.parse(localStorage.getItem('unit_infor'))['capdonvi'] == 'QUAN_HUYEN'){
      params['id'] = JSON.parse(localStorage.getItem('unit_infor'))['id'];
    }
    Library.showloading();
    this.HttpService.getMethods(this.baseUrl + "getUnit", params).subscribe(
      response => {
        Library.hideloading();
        this.arrUnitSurvey = response.data;
      });
  }
  async getArrUnitLevel() {
    Library.showloading();
    var params = {
      capdonvi: 'QUAN_HUYEN',
    };
    this.HttpService.getMethods(this.baseUrl + "getUnit", params).subscribe(
      response => {
        Library.hideloading();
        this.arrUnitLevel = response.data;
      });
  }
  async getUnitLevel() {
    Library.showloading();
    var params = {
      subject_id: this.id,
    };
    this.HttpService.getMethods(this.baseUrl + "getUnitLevel", params).subscribe(
      response => {
        Library.hideloading();
        let unit = response.data;
        this.unitLevel = unit !== null ? unit['parent_id'] : undefined;
      });
  }
  async getUnit() {
    Library.showloading();
    let unit_id = JSON.parse(localStorage.getItem('unit_infor'))['id'];
    if(this.dataUnit['capdonvi'] == 'SO_NGANH'){
      unit_id = this.unitLevel;
    }
    var params = {
      unit_id: unit_id,
      capdonvi: this.system_list_code == 'LANH_DAO_CAP_HUYEN' ? '' : 'PHUONG_XA',
    };
    this.HttpService.getMethods(this.baseUrl + "getUnit", params).subscribe(
      response => {
        Library.hideloading();
        this.arrUnit = response.data;
      });
  }
  changeSex(e){
    this.sex = e.selectedItem.code;
  }
  setEvalue(data){
    this.evaluation_id = data;
  }
  changeLevel(e) {
    this.level = e.selectedItem.code;
  }
  changeUnitSurvey(e) {
    if(e.value){
      this.unit_id_survey = e.value;
    }
    if(e.selectedItem){
      this.unit_id_survey = e.selectedItem.id;
      this.unitLevel = e.selectedItem.id;
    }
  }
  changeUnit(e) {
    if(e.selectedItem){
      this.unit_id = e.selectedItem.id;
      this.unit_name = e.selectedItem.name;
    }else{
      this.unit_id = undefined;
      this.unit_name = undefined;
    }
  }
  changeUnitLevel(e) {
    if(e.selectedItem){
      this.unitLevel = e.selectedItem.id;
      this.getUnit();
    }
  }
  onSubmit(e) {
    if(this.name == ''){
      Library.notify('Họ và tên không được để trống', 'error');
      return;
    }
    if(this.email == ''){
      Library.notify('Email không được để trống', 'error');
      return;
    }
    if(this.unit_name == undefined || this.unit_name == ''){
      Library.notify('Cơ quan không được để trống', 'error');
      return;
    }
    let unit_id_survey = '';
    if(this.unit_id_survey instanceof Array) unit_id_survey = this.unit_id_survey.join(',');
    else unit_id_survey = this.unit_id_survey;
    let user  = JSON.parse(localStorage.getItem('user_infor'));
    var params = {
      id: this.id,
      name: this.name,
      system_list_code: this.SubjectModel.subjects.system_list_code,
      evaluation_id: this.evaluation_id,
      sex: this.sex,
      email: this.email,
      unit_id: this.unit_id,
      unit_name: this.unit_name,
      unit_id_survey: unit_id_survey,
      position_name: this.position_name,
      age: this.age,
      phone: this.phone,
      level: this.level,
      user_id: user.id,
      user_name: user.name,
    }
    Library.showloading();
    this.HttpService.postMethods(this.baseUrl + "update", params).subscribe(
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
