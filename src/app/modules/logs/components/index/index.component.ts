import { ApiService } from './../../services/api.service';
import { LogModel, Logs } from './../../models/LogModel';
import { Component, OnInit } from '@angular/core';
import { Library } from 'src/app/shared/library/main';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  Logs: Logs[];
  totalLog = 0;
  fromdate: any;
  todate: any;
  constructor(
    public LogModel: LogModel,
    public apiService: ApiService,
  ) { }

  ngOnInit() {
    this.loadList();
  }

  async loadList(){
    let params = {
      fromdate: this.fromdate,
      todate: this.todate,
      // ownercode: this.ownercode,
      // fk_staff: this.fk_staff,
    };
    // Library.showloading();
    let response = await this.LogModel.getAll(params);
    this.Logs = response['datas'];
    this.totalLog = response['totalLog'];
    Library.hideloading();
  }
  getFromdate(e) {
    var date = e.value;
    this.fromdate = date != null ? date.toLocaleDateString("en-GB") : '';
  }
  getTodate(e) {
    var date = e.value;
    this.todate = date != null ? date.toLocaleDateString("en-GB") : '';
  }

}
