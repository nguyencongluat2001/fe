import { Component, OnInit, } from '@angular/core';
import { EvaluationModel } from '../../models/EvaluationModel';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';
import { MultipleChoiceModel } from '../../models/MultipleChoiceModel';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  Evaluations: any;
  bsModalRef: BsModalRef;
  txt_search = '';
  listsGroup: any;
  years: any;
  defaultVisible: false;
  users: any;
  c: any;
  pageEnabled: boolean = false;
  constructor(
    private HttpService:HttpService,
    public EvaluationModel: EvaluationModel,
    public MultipleChoiceModel: MultipleChoiceModel,
    private modalService: BsModalService,
    private route: Router,
    private router: ActivatedRoute,
    public apiService: ApiService,
  ) { }

  ngOnInit() {
    this.loadList();
  }

  // load du lieu man hinh danh sach
  async loadList() {
    let params = {
      txtSearch: this.txt_search
    };
    Library.showloading();
    this.getAll();
    // this.getevaluationexe();
    Library.hideloading();
  }
  getAll() {
    let parram = {
      'mabn':JSON.parse(localStorage.getItem('username')),
    };
    this.HttpService.getMethods("getTKQ", parram).subscribe(
        result => {
          this.Evaluations = result.data;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  xemketqua(){
    
  }
  xemanh(){

  }
}
