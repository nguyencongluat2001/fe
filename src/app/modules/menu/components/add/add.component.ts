import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuModel } from '../../models/menu.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Library } from 'src/app/shared/library/main';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  menus: any;
  baseUrl: string;
  headers: any;
  token: string;
  dataAdd:any;
  dataAdd_convert:any;
  Modules_path:any;
  id:any;
  code:any;
  name:any;
  url:any;
  icon:any;
  order:any;
  type:any;
  status:any;
  message:any;
  packet_module_id:any;
  constructor(
    private route: Router,
    public menuModel: MenuModel,
    public bsModalRef: BsModalRef,
    private http: HttpClient
  ) { 
    if (this.menuModel.menu.id != undefined && this.menuModel.menu.id != false) {
      this.id = this.menuModel.menu.id;
      this.Modules_path = this.menuModel.menu.Modules_path;
      this.code = this.menuModel.menu.code;
      this.name = this.menuModel.menu.name;
      this.url = this.menuModel.menu.url;
      this.icon = this.menuModel.menu.icon;
      this.packet_module_id = this.menuModel.menu.packet_module_id;
      this.order = this.menuModel.menu.order;
    }else{
      this.id = '';
      this.code = '';
      this.name = '';
      this.url = '';
      this.icon = '';
      this.order = '';
    }  
    this.Modules_path = menuModel.Modules_path
    this.type = menuModel.type?menuModel.type:2;

    this.menus = menuModel.getMenu()

    // set base Url
    this.baseUrl = environment.API_URL + 'menu/';
    // set headers
    let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN');
    headers.append('Authorization', `Bearer ${token}`);
    this.headers = headers;
  }

  ngOnInit() {
    this.menus =  this.menuModel.menu;
  }
  onSubmit() {
    this.dataAdd = this.update(this.menus, this.bsModalRef);
    const FILTER = this.dataAdd.then((result) => {
      if (result.status == true) {
          Library.notify(result.message, 'success');
          this.bsModalRef.hide();
      } else {
          Library.notify(result.message, 'error');
      }
       let newrouter = "";
    newrouter = "/system/menu";
    this.route.navigate([newrouter]);
     });
    
  }
  // selectionChangedMenu(e){
  //   this.dataController = this.getData(e);
  //   const FILTER = this.dataController.then((result) => {
  //     this.dataController_ct = JSON.parse(result._body);
  //    });
  // }
  async update(menus,bsModalRef){
    let params = {
      role: 1,
      ownercode: '000.00.08.H23',
      Modules_path: this.Modules_path,
      code : menus.code, 
      icon : menus.icon, 
      id : menus.id, 
      name : menus.name, 
      order : menus.order, 
      packet_module_id : this.menuModel.packet_module_id, 
      project : menus.project, 
      type : this.type, 
      url : menus.url, 
      status : menus.status, 
    };
    let options = { headers: this.headers, params: params };
    return await this.http
    .get(this.baseUrl + 'update', options)
    .toPromise();
  }


}
