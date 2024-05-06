import { Component, OnInit,Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import {AddComponent } from '../../components/add/add.component';
import {AddNotificationComponent } from '../../components/add-notification/add-notification.component';
// import {ModelAddComponent } from '../../components/model-add/model-add.component';
// import {DetailComponent } from '../../components/detail/detail.component';
import { Notification, NotificationModel } from '../../models/NotificationModel';
import { NotificationService } from '../../services/notification.service';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';
import { DetailComponent } from '../detail/detail.component';
import { AddNotificationsComponent } from '../add-notifications/add-notifications.component';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  @Input() data: any;
  listEvalution: Notification[];
  arrayFile: Notification[];
  bsModalRef: BsModalRef;
  selectedItems: Notification[] = [];
  listCodes: any[]=[];
  txt_search = '';
  listsGroup: any;
  years: any;
  defaultVisible: false;
  show:boolean;
  user_id: string = JSON.parse(localStorage.getItem('user_infor'))['id'];
  public role_id: any = JSON.parse(localStorage.getItem('user_infor'))['role'];
  listCode_id: any = JSON.parse(localStorage.getItem('user_infor'))['id'];

  constructor(
    private HttpService:HttpService,
    private modalService: BsModalService,
    public notificationmodel: NotificationModel,
    private route: Router,
    private router: ActivatedRoute,
    public notificationservice: NotificationService,
  ) { 
  }

  ngOnInit() {
    this.loadList();
  }

  async loadList() {
    let params = {
      txtSearch: this.txt_search,
    };
    this.getAll();
  }
  getAll() {
    var roleId=JSON.parse(localStorage.getItem('user_infor'))['role'];
    let parram = { user_id: this.user_id,roleId:roleId };
    this.HttpService.getMethods("notification/getUrlFile", parram).subscribe(
        result => {
          this.listEvalution = result.data;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  selectEvaluation(e) {
    this.selectedItems = e.selectedRowsData;
    this.notificationmodel.Notification = this.selectedItems;
  }
  Test(){
    console.log(123)
    this.notificationmodel.Notification = new Notification;
    this.bsModalRef = this.modalService.show(AddNotificationComponent, { class: 'modal-lg', backdrop: 'static', keyboard: false  });

    // this.bsModalRef = this.modalService.show(AddNotificationComponent, { class: 'modal-lg' });
  }
  
  Detail() { 
    // console.log(this.notificationmodel.Notification); return;
    // alert(123); return;   
    let i = 0;
    let a;
    let iditem;
    this.selectedItems.forEach((item) => {
      i++;
      iditem = item.id;
    });
    if (i == 0) {
      Library.notify("Vui lòng chọn đối tượng để xem", 'error');
      return;
    }
    if (i > 1) {
      Library.notify("Chỉ được chọn một đối tượng để xem", 'error');
      return;
    } else if (i == 1) {
      this.notificationmodel.Notification = this.selectedItems[0];
      // console.log(this.selectedItems[0]);
      this.bsModalRef = this.modalService.show(DetailComponent, { class: 'modal-lg', backdrop: 'static', keyboard: false  });
    }

  }
  edit(){
    let i = 0;
    let a;
    let iditem;
    this.selectedItems.forEach((item) => {
      i++;
      iditem = item.id;
    });
    if (i == 0) {
      Library.notify("Vui lòng chọn đối tượng để sửa", 'error');
      return;
    }
    if (i > 1) {
      Library.notify("Chỉ được chọn một đối tượng để sửa", 'error');
      return;
    } else if (i == 1) {
      this.notificationmodel.Notification = this.selectedItems[0];
      this.bsModalRef = this.modalService.show(AddNotificationComponent, { class: 'modal-lg' });
    }

  }
  convertFromdate(data) {
    return Library.formatDate(data.data_time);
  }
  delete() {
    let Myclass = this;
    let selectedItems = this.selectedItems;
    let ids = '';
    let data = {
      ids: ""
    };
    var result = Library.confirm("Bạn có chắc chắn muốn xóa đối tượng đã chọn?", "Thông báo");
    if (result) {
      result.then(function (dialogResult) {
        if (dialogResult) {
          selectedItems.forEach((item) => {
            ids += item.id + ',';
          });
          data.ids = ids;
          Myclass.notificationmodel.deleteEventtype(data, Myclass);
        }
      });
    }
  }

}
