import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Library } from 'src/app/shared/library/main';
import { NotificationModel, User } from '../../models/NotificationModel';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {
  notification: Notification;
  dataSource: any;
  list: any;
  baseUrl: string;
  headers: any;
  arrfile: any = [];
  // users: User[];
  users:any;
  checkedUsers: User[] = [];
  checkedLists: any;
  fileselected: File[] = [];
  selectedrows: any = [];
  id: string = '';
  user_id: string = localStorage.getItem('idUser');
  nameuser: string = JSON.parse(localStorage.getItem('user_infor'))['name'];
  content: string = '';
  data_time: Date;
  list_code: string = '';
  title: string = '';
  document: string;
  datas: any = [];
  //editor
  ckeditorContent: string = '<p>Some html</p>';
  myCkeditorConfig: any;
  constructor(
    private notificationmodel: NotificationModel,
    public bsModalRef: BsModalRef,
    private route: Router,
    private http: HttpClient,
  ) {

    this.notification = notificationmodel.Notification;
    this.baseUrl = environment.API_URL + 'notification/';
    let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN');
    headers.append('Authorization', `Bearer ${token}`);
    this.headers = headers;
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }
  ngOnInit() {
    this.loaddata();
    // this.bsModalRef.hide();
  }
  async loaddata() {
    this.dataSource = await this.notificationmodel.getdatapermission();
    this.users = this.dataSource.user;
    this.list = this.dataSource.list;
  }

  //xử lý file
  handleFileInput(event) {
    if (event.target.files[0].name != '') {
      this.fileselected.push(<File>event.target.files[0]);
    }
  }
  remove(filename) {
    let index = this.fileselected.findIndex(file => file.name == filename);
    this.fileselected.splice(index, 1);
  }
  //xử lý form
  uploadNotification() {
    // let id = this.notification.id;
    let id = '';

    const fd = new FormData();
    let user_id = this.notificationmodel.Notification['user_id'];
    let nameuser = this.notificationmodel.Notification['nameuser'];
    for (let i in this.fileselected) {
      fd.append('file' + i, this.fileselected[i], this.fileselected[i].name)
    }
    fd.append('id', id);
    fd.append('user_id', user_id);
    fd.append('nameuser', nameuser);
    fd.append('title', this.title);
    fd.append('content', this.content);
    fd.append('list_code', JSON.stringify(this.checkedUsers));
    let token = localStorage.getItem('token');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let i=0;
    this.checkedUsers.forEach((item)=>{
     i++;
    });
    this.users.forEach((item)=>{
      i++;
     });
    if(i==0)
    {
      Library.notify("Vui lòng chọn đơn vị để gửi", 'error');
      return;
    }
    else{
      this.http.post(this.baseUrl + 'uploadnotification', fd,{ headers: header, }).subscribe(res => {
        if (res['success']) {
          Library.notify('Cập nhật thành công', 'success');
          this.route.navigated = false;
          this.route.navigate([this.route.url]);
          this.bsModalRef.hide();
        } else {
          Library.notify('Quá trình đính kèm file bị lỗi', 'error');
        }
      });
    }
   
  }
  selectionUserChanged(e) {
    let value = e.node;
    let nodelevel = this.getnodelevel(value);
    if (nodelevel == 1) {
      value.items.forEach((User, index) => {
        User.items.forEach((User2, index2) => {
          this.processUser({
            id: User2.key,
            text: User2.text,
            itemData: User2.itemData,
            selected: User2.selected,
            category: User2.text
          });
        });

      });
    } else if (nodelevel == 2) {
      value.items.forEach((User, index) => {
        this.processUser({
          id: User.key,
          text: User.text,
          itemData: User.itemData,
          selected: User.selected,
          category: value.text
        });
      });
    } else {
      this.processUser({
        id: value.key,
        text: value.text,
        itemData: value.itemData,
        selected: value.selected,
        category: value.parent.text
      });
    }
  }

  getnodelevel(data) {
    if (data.parent == null) {
      return 1;
    } else {
      if (data.parent.parent == null) {
        return 2;
      } else {
        return 3;
      }

    }
  }

  processUser(User) {
    let itemIndex = -1;
    this.checkedUsers.forEach((item, index) => {
      if (item.id === User.id) {
        itemIndex = index;
        return false;
      }
      return true;
    });
    if (User.selected && itemIndex === -1) {
      this.checkedUsers.push(User);
    } else if (!User.selected) {
      this.checkedUsers.splice(itemIndex, 1);
    }
  }
}
