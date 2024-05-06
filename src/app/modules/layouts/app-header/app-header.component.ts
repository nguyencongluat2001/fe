import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  providers: [BsModalService]
})
export class AppHeaderComponent {
  class_header: any;
  system: boolean = false;
  banner_first: any;
  banner_second: any;
  nameuser: string;
  selected: any;
  arrActive = Array();
  role: any;
  checkSociological: boolean = false;
  checkSipas: boolean = false;
  checkEparindex: boolean = false;
  
  @Output('headerchangsidebar') onchangesidebar = new EventEmitter<string>();
  constructor(
    private modalService: BsModalService,
    private _router: Router,
  ) {
    // let system_infor = JSON.parse(localStorage.getItem('system_infor'));
    // let layout = localStorage.getItem('layout');
    // this.banner_first = JSON.parse(localStorage.getItem('unit_infor'))['name'].toUpperCase() + ' TỈNH YÊN BÁI';
    // this.banner_second = system_infor.bannerSecond;
    // this.system = true;
    // this.class_header = 'app-header-system';
    // this.role = JSON.parse(localStorage.getItem('user_infor'))['role'];
    // this.nameuser = JSON.parse(localStorage.getItem('user_infor'))['name'];
    // let sidebar_parindex = JSON.parse(localStorage.getItem('arrController'));
    // let sidebar_system = JSON.parse(localStorage.getItem('arrsystem'));
    // var code = ''; let idouble = '';
    // if (localStorage.getItem('currentProject') == '') {
    //   localStorage.setItem('currentProject', 'eparindex');
    // }
    // if(sidebar_parindex.length > 0){
    //   this.checkEparindex = true;
    // }
    // if(sidebar_sociological.length > 0){
    //   this.checkSociological = true;
    // }
    // if(sidebar_sipas.length > 0){
    //   this.checkSipas = true;
    // }
    // sidebar_parindex.forEach(element => {
    //   if (element.children) {
    //     element.children.forEach(child => {
    //       if (this._router.url.search(child.url) > 0) {
    //         code = 'eparindex';
    //       }
    //     })
    //   } else {
    //     if (this._router.url.search(element.url) > 0) {
    //       code = 'eparindex';
    //     }
    //   }

    // });
    // if (idouble != '') {
    //   code = localStorage.getItem('currentProject');
    // } else {
    //   localStorage.setItem('currentProject', code)
    // }
    // this.setActiveHeader(code);
  }

  changePassword() {
    this.modalService.show(ChangePasswordComponent, { class: 'modal-lg' });
  }
  selecteparindex() {
    this.onchangesidebar.emit('eparindex');
    this.setActiveHeader('eparindex');
    let sidebar_parindex = JSON.parse(localStorage.getItem('arrController'));
    let route = '/system' + sidebar_parindex[0].url;
    this._router.navigate([route]);
  }
  selectereport() {
    this.onchangesidebar.emit('ereport');
    this.setActiveHeader('ereport');
    let sidebar_report = JSON.parse(localStorage.getItem('arrreport'));
    let route = '/system' + sidebar_report[0].url;
    this._router.navigate([route]);
  }
  selectesystem() {
    this.onchangesidebar.emit('system');
    let sidebar_system = JSON.parse(localStorage.getItem('arrsystem'));
    let route = '/system' + sidebar_system[0].children[0].url;
    this._router.navigate([route]);
  }

  setActiveHeader(code) {
    this.arrActive = Array();
    this.arrActive[code] = 'active';
  }
  selectetotaldata(){
    let link='http://thsl.thainguyen.cchc.com.vn/efy-ecs-dvc/admin/login';
    window.open(link);
  }
  selectSociological(){
    this.onchangesidebar.emit('sociological');
    this.setActiveHeader('sociological');
    let sidebar_parindex = JSON.parse(localStorage.getItem('arrSociological'));
    let route = '/system' + (sidebar_parindex[0].children != undefined ? sidebar_parindex[0].children[0].url : sidebar_parindex[0].url);
    this._router.navigate([route]);
  }
  selectSipas(){
    this.onchangesidebar.emit('sipas');
    this.setActiveHeader('sipas');
    let sidebar_sipas = JSON.parse(localStorage.getItem('arrSipas'));
    let route = '/system' + sidebar_sipas[0].children[0].url;
    this._router.navigate([route]);
  }
  logout () {
    localStorage.removeItem('isLogin');
    this._router.navigate(['login']);
  }
}
