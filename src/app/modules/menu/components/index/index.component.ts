import { Component, OnInit ,NgModule, enableProdMode} from '@angular/core';
import { AddComponent } from '../add/add.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../services/menu.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Menu, MenuModel } from '../../models/menu.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Library } from 'src/app/shared/library/main';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [Service],
  preserveWhitespaces: true,
})
export class IndexComponent implements OnInit {
  tasks: any;
  statuses: string[];
  baseUrl: string;
  headers: any;
  token: string;
  dataSource: any;
  url: string;
  dataController:any;
  code: any;
  masterDetailDataSource: any;
  bsModalRef: BsModalRef;
  type:any;
  dataController_ct: any[] = [
    { code: '', name: '' ,url:''}
  ];


  selectedItems: Menu[] = [];
  constructor(
    service: Service,
    private http: HttpClient,
    private route: Router,
    private router: ActivatedRoute,
    private MenuModel: MenuModel,
    private modalService: BsModalService
    ) {
    this.tasks = service.getTasks();
    // this.employees = service.getEmployees();
    // this.priorities = service.getPriorities();
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
  showMenu = {};

  onclickSidebar(item) {
    if (this.showMenu[item.Task_ID]) {
      this.showMenu[item.Task_ID] = false;
    } else {
      this.showMenu[item.Task_ID] = true;
    }
  }
  getShowHide(item) {
    return this.showMenu[item.Task_ID];
  }
  //
  ngOnInit() {
    const FILTER = this.tasks.then((result) => {
      // this.tasks = JSON.parse(result._body);
      this.tasks = result;
     });
  }
  selectionChangedMenu(data: any,i){
    console.log(888,data);
    // this.selectedItems = data.selectedRowsData;
    this.dataController = this.getData(data,i);
    const FILTER = this.dataController.then((result) => {
      this.dataController_ct = result.data;
      this.MenuModel.setModulesPath( data.Task_ID);
      this.MenuModel.setType( data.type);
      this.type = data.type;
      this.MenuModel.setMenu( data);
      this.MenuModel.setPacket_module_id( data.id);
     });
  }
  async getData(e,i){
    console.log(e.selectedRowsData)
    let params = {};
    if(i == 1){
      params = {
        role: 1,
        ownercode: '000.00.08.H23',
        value: e.Task_ID,
        type: e.type
      };
    }else if(i == 2){
      params = {
        role: 1,
        ownercode: '000.00.08.H23',
        id: e.id,
        type: i
      };
    }
    
    let options = { headers: this.headers, params: params };
    return await this.http
    .get(this.baseUrl + 'getController', options)
    .toPromise();
  }
  add() {
    this.MenuModel.setMenu(this.selectedItems[0]);
    this.bsModalRef = this.modalService.show(AddComponent,{ class: 'modal-lg', backdrop: 'static', keyboard: false });
  }
  edit() {
    this.MenuModel.setMenu(this.selectedItems[0]);
    this.bsModalRef = this.modalService.show(AddComponent,{ class: 'modal-lg', backdrop: 'static', keyboard: false });
}
selectionChanged(data: any) {
  this.selectedItems = data.selectedRowsData;
}
delete() {
  let Myclass = this;
  // let data = this.selectedItems[0]['id'];
  let data = {
    id:this.selectedItems[0]['id'],
    type:this.type
  }
  if(data == undefined){
    Library.notify("Bạn phải phọn 1 đối tượng để xóa", "error");
  }
  var result = Library.confirm("Bạn có chắc chắn muốn xóa đối tượng đã chọn?", "Thông báo");
    if (result) {
      result.then(function (dialogResult) {
        if (dialogResult) {
          Myclass.deleteModule(data, Myclass);
          Library.notify('Xóa thành công', 'success');
        }
      });
    }
    // this.selectionChangedMenu(data);
    // let newrouter = "";
    // newrouter = "/system/menu";
    // this.route.navigate([newrouter]);
}
async deleteModule(params,bsModalRef){
  let options = { headers: this.headers, params: params };
  return await this.http
  .get(this.baseUrl + 'delete', options)
  .toPromise();
}

  // @NgModule({
  //   imports: [
  //     BrowserModule,
  //     BrowserTransferStateModule,
  //     DxTreeListModule,
  //   ],
  //   declarations: [],
  //   bootstrap: [],
  // });

}
