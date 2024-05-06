import { Component, OnInit,Input } from '@angular/core';
import {AddNotificationComponent } from '../../components/add-notification/add-notification.component';
import { NotificationModel } from '../../models/NotificationModel';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.component.html',
  styleUrls: ['./explanation.component.scss']
})
export class ExplanationComponent implements OnInit {
  @Input() data: any;
  document:any
  show: boolean;
  array: any = [];

  constructor(public notificationmodel: NotificationModel,) { }

  ngOnInit() {
    this.show = false;
    if (this.data.document != '' && this.data.document != null) {
      this.array = this.data.document;
      if (this.data.document != '' && this.data.document != null) {
        this.show = true;
      }
    }
  }
  openfile(namefile) {
    let params = {
      namefile: namefile
    }
    // var baseurl=environment.API_BASE + 'file/openfile?namefile='+namefile;
    //  window.open(baseurl);
    
  }
}
