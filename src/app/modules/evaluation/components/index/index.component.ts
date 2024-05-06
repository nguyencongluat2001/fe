import { Component, OnInit, enableProdMode, NgModule } from '@angular/core';
import { EvaluationModel, Evaluation, exeUnit } from '../../models/EvaluationModel';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { forEach } from '@angular/router/src/utils/collection';
import { ApiService } from '../../services/api.service';
// import { ListModel } from '../../../list/models/list.model';
import { EvaluationComponent } from '../evaluation/evaluation.component';
import { AdjournComponent } from '../adjourn/adjourn.component';
import { Library } from 'src/app/shared/library/main';
import { AddComponent } from '../add/add.component';
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
  selectedItems: Evaluation[] = [];
  selectedItem: Evaluation[] = [];
  txt_search = '';
  listsGroup: any;
  years: any;
  defaultVisible: false;
  users: any;
  exeunit: exeUnit[];
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
    var group = 'QUAN_HUYEN'
    if(this.route.url == '/system/evaluation_commune'){
      var group = 'PHUONG_XA'
    }
    if(this.route.url == '/system/evaluation_village'){
      var group = 'THON_BAN'
    }
    let parram = {
      'group':group
    };
    // set group
    this.EvaluationModel.setGroup(group);
    this.HttpService.getMethods("evaluation/getall", parram).subscribe(
        result => {
          this.Evaluations = result.data;
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  setStatus(data) {
    if (data.status == '1') {
      return 'Mới tạo';
    } else if (data.status == '2') {
      return 'Đã gửi đơn vị';
    } else if (data.status == '3') {
      return 'Đang chấm điểm';
    } else {
      return 'Kết thúc';
    }
  }
  getevaluationexe() {
    let parram = {};
    this.HttpService.getMethods("evaluation/evaluationexe", parram).subscribe(
        result => {
          this.exeunit = result.data;
          if(this.exeunit.length > 0){
            this.pageEnabled = true;
          }else{
            this.pageEnabled = false;
          }
        },
        (error) => {
          Library.hideloading();
        }
      );
  }
  convertFromdate(data) {
    return Library.formatDate(data.fromdate);
  }

  convertTodate(data) {
    return Library.formatDate(data.todate);
  }

  selectEvaluation(e) {
    this.selectedItems = e.selectedRowsData;
    this.selectedItem = e.selectedRowsData;
    // this.exeunit.forEach(item => {
    //   this.selectedItem.forEach(element => {
    //     if (element.id == item.evaluation_id) {
    //       this.selectedItem = [];
    //     }
    //     if(element.is_send_district==1){
    //       this.selectedItem = [];
    //     }
    //   });
    // });
    this.EvaluationModel.Evaluation = this.selectedItems;
  }
  /**
   * ---------------------- Các sự kiện thêm, sửa, xóa ----------------------------
   */



  add() {
    this.EvaluationModel.Evaluation = new Evaluation;
    this.modalService.show(AddComponent, { class: 'modal-lg', backdrop: 'static', keyboard: false });
  }

  edit() {

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
      this.EvaluationModel.Evaluation = this.selectedItems[0];
      this.modalService.show(AddComponent, { class: 'modal-lg', backdrop: 'static', keyboard: false });
    }



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
          //this.deleteEventtype(data, Myclass);
          Myclass.EvaluationModel.deleteEventtype(data, Myclass);
        }
      });
    }
  }
  evaluation() {
    let i = 0;
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
      this.EvaluationModel.Evaluation = this.selectedItems[0];
      
      let newrouter = this.route.url + "/define";
      this.route.navigate([newrouter]);
    }
  }
  transfer() {
    let i = 0;
    let iditem;
    this.selectedItems.forEach((item) => {
      i++;
      iditem = item.id;
    });
    if (i == 0) {
      Library.notify("Vui lòng chọn đối tượng để chuyển", 'error');
      return;
    }
    if (i > 1) {
      Library.notify("Chỉ được chọn một đối tượng để chuyển", 'error');
      return;
    }
    var date = new Date();
    var datetoday = date.toLocaleDateString("en-US");
    // if (Date.parse(datetoday) > Date.parse(todates)) {
    //   Library.notify("Đợt đánh giá đã hết hạn", 'error');
    //   return;
    // }
    if (this.selectedItems[0]['group'] == 'PHUONG_XA') {
      if (this.selectedItems[0]['is_send_district'] == '1') {
        Library.notify("Đã chuyển đợt đánh giá này về các huyện", 'error');
        return;
      }
      this.EvaluationModel.Evaluation = this.selectedItems[0];
      let Myclass = this;
      var result = Library.confirm("Bạn có chắc chắn muốn chuyển đợt đánh giá về quận huyện?", "Thông báo");
      if (result) {
        result.then(function (dialogResult) {
          if (dialogResult) {
            let data = {
              iditem: iditem
            };
        // this.sendEvalutionToDistrict(data, Myclass);
            Myclass.EvaluationModel.sendEvalutionToDistrict(data, Myclass);
          }
        });
      }
    } else {
      this.EvaluationModel.Evaluation = this.selectedItems[0];
      let newrouter = "/system/evaluation/transfer";
      this.route.navigate([newrouter]);
    }

  }
  sendEvalutionToDistrict(data, MyClass) {
    Library.showloading();
    this.HttpService.postMethods('evaluation/sendEvalutionToDistrict', data).subscribe((response: any) => {
        if (response.success) {
            Library.notify(response.message, 'success');
            MyClass.loadList();
        } else {
            Library.notify(response.message, 'error');
        }
        Library.hideloading();
    }, error => {
        Library.hideloading();
        Library.notify(error, 'error');
    });
}
  permission() {
    if (this.selectedItems.length > 1) {
      Library.notify("Chỉ được chọn một đợt đánh giá để phân quyền", 'error');
      return;
    } else {
      if (this.selectedItems[0]['group'] == 'PHUONG_XA') {
        Library.notify("Bạn không được phân quyền ở đợt đánh giá này", 'error');
        return;
      }
     
      this.EvaluationModel.Evaluation = this.selectedItems[0];
      
      let newrouter = "/system/evaluation/permission";
      this.route.navigate([newrouter]);
    }
  }
}
