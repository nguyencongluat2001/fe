import { Component, OnInit,Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { NotificationModel,Notification } from '../../models/NotificationModel';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-notifications',
  templateUrl: './add-notifications.component.html',
  styleUrls: ['./add-notifications.component.scss']
})
export class AddNotificationsComponent implements OnInit {
  @Input() data: any;
  listUser:any;
  Notification: Notification;
  selectUnit: any;
  document:any;
  //
  public role_id: any = JSON.parse(localStorage.getItem('user_infor'))['role'];
  users:any;
  content: string ='';
  data_time: Date;
  list_code: string='';
  nameuser: string='';
  abc:any;
  html:any;
  dataSource: any;
  notification: Notification;
  list: any;
  title: string = '';
  constructor(
    private notificationmodel: NotificationModel,
    public bsModalRef: BsModalRef,
    // private ListModel: ListModel,  
    private sanitizer: DomSanitizer  
  ) {
    this.notification = notificationmodel.Notification;
    // console.log(this.Notification.list_code); return;
    this.title=this.notification.title;
    this.content=this.notification.content;
    // this.content='<h1 stype="font-size:29px;"></h1>';
    let htmltemp = `<html dir="ltr" lang="vi"> <head> <style>
    h1 { font-size: 24px; font-family:
      "Arial";}
    h2 { font-size: 20px; font-family:
      "Arial";}
    h3 { font-size: 18px; font-family:
      "Arial";}
    h4 { font-size: 16px; font-family:
      "Arial";}
    h5 { font-size: 12px; font-family:
      "Arial";}
    h6 { font-size: 10px; font-family:
      "Arial";}
       p{font-size: 14px;font-family:
         "Arial";}
         strong, b {
          font-weight: bold;
      } i, cite, em, var, address, dfn {
        font-style: italic;
    }

         </style></head> <body>`;
    htmltemp = htmltemp + this.content;
    htmltemp = htmltemp + '</body></html>';
    this.html = this.sanitizer.bypassSecurityTrustHtml(htmltemp);
    this.nameuser=this.notification.nameuser;
    this.data_time=this.notification.data_time;
    this.document=this.notification.document;
   }

  ngOnInit() {
    // this.loadList();
    this.loaddata();
    // this.bsModalRef.hide();
  }

  async loaddata() {
    this.dataSource = await this.notificationmodel.getdatapermission();
    this.users = this.dataSource.user;
    this.list = this.dataSource.list;
  }
  async loadList() {
    var myclass=this;
    let params = {
      list_code: this.notification.list_code
    };
    this.listUser = await this.notificationmodel.getUser(params,myclass);
    // console.log(this.listUser);
    // this.users = this.listUser.user;
  }
  openfile(namefile) {
    let params = {
      namefile: namefile
    }
    var baseurl=environment.API_BASE + 'file/openfile?namefile='+namefile;
     window.open(baseurl);
    
  }

}
