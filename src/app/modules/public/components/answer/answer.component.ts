import { HttpService } from 'src/app/core/http.service';
import { Component, OnInit } from '@angular/core';
import { AnswerModel, Question, Tab, Vote } from '../../models/AnswerModel';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Library } from 'src/app/shared/library/main';
import { environment as EnvironmentDev } from 'src/environments/environment';
import { environment as EnvironmentProd } from 'src/environments/environment.prod';
// import { TextEncoder } from 'text-encoding';
declare function vgca_sign_approved(json_prms, SignFileCallBack): any;
declare function vgca_sign_issued(json_prms, SignFileCallBack): any;

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss'
})
export class AnswerComponent implements OnInit {
  Question: Question[] = [];
  vote: Vote[] = [];
  tabs: Tab[] = [];
  type_vote_name: any;
  arrUnit: any;
  urlActive: any;
  arrQuestion = [];
  saveAnswer: boolean = false;
  unit_id: any;
  dataTab = {
    id: '',
    code: '',
    name: '',
    title: '',
    title_desc: '',
    desc: '',
  };
  checkAnswer: boolean;
  checkTimeOut: boolean;
  clock: any = 1801;
  // clock: any = 10;
  times: any = "30:01";
  status: any;
  baseUrl: any = 'sociological/vote/';

  constructor(
    private AnswerModel: AnswerModel,
    private route: Router,
    private activeRoute: ActivatedRoute,
    public HttpService: HttpService,
  ) {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.urlActive = params['id'];
    });
    this.tabs = this.AnswerModel.getTabs();
  }

  ngOnInit() {
    this.updateStatus();
    this.getVote();
  }
  /**
   * Cập nhật trạng thái
   */
  updateStatus() {
    let params = { id: this.urlActive, };
    Library.showloading();
    this.HttpService.postMethods(this.baseUrl + "updateStatus", params).subscribe(
      response => {
        Library.hideloading();
      });
  }
  /**
   * Lấy thông tin phiếu
   */
  async getVote() {
    let params = {
      id: this.urlActive,
    };
    Library.showloading();
    this.HttpService.getMethods(this.baseUrl + "getVoteSingle", params).subscribe(
      response => {
        Library.hideloading();
        this.AnswerModel.Vote = response.data;
        if (this.AnswerModel.Vote !== undefined && this.AnswerModel.Vote !== null && this.AnswerModel.Vote.survey == 1) {
          this.getUnit();
          this.checkAnswer = true;
          if (this.AnswerModel.Vote.status == 1) {
            this.saveAnswer = true;
            this.checkTimeOut = true;
            this.status = true;
          }
          this.getQuestion();
        } else {
          this.checkAnswer = false;
        }
      });
  }
  /**
   * Lấy dánh sách câu hỏi
   */
  async getQuestion() {
    this.tabs.forEach(e => {
      if (this.AnswerModel.Vote !== undefined && this.AnswerModel.Vote.type_vote == e.code) {
        this.dataTab = e;
      }
    });

    let params = {
      vote_id: this.AnswerModel.Vote.id,
      evaluation_id: this.AnswerModel.Vote.evaluation_id,
      type_vote: this.AnswerModel.Vote.type_vote,
      type_unit: this.AnswerModel.Vote.type_unit,
      survey: 1,
    };

    Library.showloading();
    this.HttpService.getMethods(this.baseUrl + "getQuestionAnswer", params).subscribe(
      response => {
        Library.hideloading();
        this.Question = response.data;
      });
  }
  /**
   * Lấy đơn vị
   */
  async getUnit() {
    let params = {
      type_group: this.AnswerModel.Vote.type_unit,
      // subject_id: this.AnswerModel.Vote.type_vote == 'MAU_PHIEU_05' || this.AnswerModel.Vote.type_vote == 'MAU_PHIEU_06' ? this.AnswerModel.Vote.subject_id : undefined,
    };
    if (this.AnswerModel.Vote.type_vote == 'MAU_PHIEU_05' || this.AnswerModel.Vote.type_vote == 'MAU_PHIEU_06') {
      params['subject_id'] = this.AnswerModel.Vote.subject_id;
    }
    this.HttpService.getMethods(this.baseUrl + "getUnit", params).subscribe(
      response => {
        Library.hideloading();
        this.arrUnit = response.data;
      });

    // this.arrUnit = await this.AnswerModel.getUnit(params);
  }
  /**
   * Xảy ra khi tích chọn đáp án
   */
  changeExcute(question_id, ownercode) {
    if (this.arrQuestion[question_id] == undefined) {
      this.arrQuestion[question_id] = [ownercode];
    } else {
      if ($.inArray(ownercode, this.arrQuestion[question_id]) === -1) {
        this.arrQuestion[question_id].push(ownercode);
      }
    }
    this.checkAnswerSucess(question_id);
  }
  /**
   * Kiểm tra các đơn vị có chọn cùng 1 đáp án
   */
  checkAll(e) {
    if (e.ownercode != '' && this.arrUnit !== undefined && (e.ownercode.trim().split(",")).length == this.arrUnit.length) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Kiểm tra câu hỏi đã tích chọn đủ các đáp án chưa
   */
  checkAnswerSucess(e) {
    if ($(".itemListQuestion_" + e.id).hasClass('success')) {
      return e.id;
    } else if (!$.isEmptyObject(this.arrQuestion)
      && this.arrQuestion[e.id] !== undefined
      && this.arrQuestion[e.id].length == this.arrUnit.length) {
      return e.id;
    } else if (e.questionSuccess > 0) {
      return e.id;
    }
  }
  // Sự kiện click thêm checked
  isSelected(question_id, ownercode, code) {


    $('input[name="' + question_id + '_' + ownercode + '"]').removeAttr('checked');
    $("input[id='" + question_id + '_' + ownercode + '_' + code + "']").attr('checked', 'true');
  }
  // Vuốt
  scrollView(e) {
    let x = document.querySelector("#cau_so_" + e);
    if (x) {
      x.scrollIntoView();
    }
  }
  // Kiểm tra input radio có được chọn hay không
  isChecked(ownercode, listOwnercode) {
    if (listOwnercode !== '' && listOwnercode.indexOf(ownercode) !== -1) {
      return true;
    } else if (this.checkAnswer) {
      return false;
    }else{
      return false;
    }
  }
  //Ham checkbox all
  checkbox_all_item_id(event, answer, question_id) {
    let ischecked: boolean = $(event.target).prop('checked');
    $('input[type=radio]').each(function () {
      if ($(this).attr('name').indexOf(question_id) !== -1) {
        $(this).removeAttr('checked');
      }
    })
    if (ischecked) {
      $('input[id="checkAll_' + question_id + '_' + answer + '"]').attr('checked', 'true');
      $('input.checked_item.' + answer + '_' + question_id).each(function () {
        $(this).click();
        // $(this).attr('checked', 'true');
      })
    } else {
      $('input.checked_item.' + answer + '_' + question_id).each(function () {
        $(this).prop('checked', false);
      })
    }

  }
  /**
   * Lưu
   * @params type (true -> có ký số, false -> không ký số)
   */
  onSubmit(e, type) {
    let check = this.checkValidate();
    if (check == false) {
      Library.notify('Vui lòng trả lời đầy đủ đáp án cho các đơn vị!', 'error');
      return false;
    }
    let params = {
      vote_id: this.AnswerModel.Vote.id,
      subject_id: this.AnswerModel.Vote.subject_id,
      dataform: $('#answer_question').serializeArray()
    }
    if (type == true) {
      let file = this.signIssued();
    } else {
      this.HttpService.postMethods(this.baseUrl + "saveAnswerQuestion", params).subscribe(
        response => {
          Library.hideloading();
          if (response.data.success) {
            Library.notify(response.data.message, 'success');
            this.saveAnswer = true;
            this.checkTimeOut = true;
          } else {
            Library.notify(response.data.message, 'error');
          }
        });
      // this.AnswerModel.saveAnswerQuestion(params, myClass);
    }
    return false;
  }

  checkValidate() {
    let name = '';
    let check = true;
    $("input[type=radio]").each(function () {
      if ($(this).attr('name') !== undefined && name != $(this).attr('name')) {
        name = $(this).attr('name');
        if (!$("input[name='" + name + "']").is(':checked') && name.indexOf('checkAll') == -1) {
          check = false;
        }
      }
    })
    return check;
  }
  async signIssued() {
    try {
      let params = {
        data: $("#body-data").html(),
        vote_id: this.AnswerModel.Vote.id,
      }
      Library.showloading();
      let file = await this.AnswerModel.getFileSign(params);
      Library.hideloading();

      if (file['url'] == '') Library.notify('Không có file ký số', 'error');
      let fileUrl = file['url'];
      let type = 'physical';
      let prms = this.genparams(file, fileUrl, type);
      let json = JSON.stringify(prms);
      // let enc = new TextEncoder();
      // let dataEnc = enc.encode(json);
      let dataEnc = [];

      let data = btoa(String.fromCharCode.apply(null, dataEnc));
      data = data.replace(/\//g, '!**!');
      prms['FileUploadHandler'] = EnvironmentDev.API_URL + "vgca_upload/store/" + data;
      // prms['FileUploadHandler'] = EnvironmentProd.API_URL + "vgca_upload/store/" + data;
      prms['SessionId'] = '';
      prms['FileName'] = fileUrl;
      var json_prms = JSON.stringify(prms);
      let vgca = vgca_sign_approved(json_prms, this.SignFileCallBack);
    } catch (e) {
      console.log(e);
    }
  }
  SignFileCallBack = (rv) => {
    let myClass = this;
    var res = JSON.parse(rv);

    if (res.Status != 0) alert(res.Message);
    else {
      let params = {
        vote_id: this.AnswerModel.Vote.id,
        subject_id: this.AnswerModel.Vote.subject_id,
        dataform: $('#answer_question').serializeArray(),
        type: true,
      }
      Library.showloading();
      this.HttpService.postMethods(this.baseUrl + "saveAnswerQuestion", params).subscribe(
        response => {
          Library.hideloading();
          if (response.data.success) {
            Library.notify(response.data.message, 'success');
            myClass.saveAnswer = true;
            myClass.checkTimeOut = true;
          } else {
            Library.notify(response.data.message, 'error');
          }
        });
      
      // this.AnswerModel.saveAnswerQuestion(params, myClass);
      // Library.hideloading();
    }
  }
  genparams(file, fileUrl: string, type: string) {
    var prms = {
      id: this.AnswerModel.Vote.id,
      code: this.AnswerModel.Vote.code,
      fileStreamId: file['idFileServer'],
      fileUrl: fileUrl,
      fileName: file['fileName'],
      type: type,
    }
    return prms;
  }
  print() {
    const printContent = document.getElementById("body-data");
    const WindowPrt = window.open('', '', 'Print-Window');
    WindowPrt.document.open();
    WindowPrt.document.write('<html><head><title></title>');
    WindowPrt.document.write(`<style>
                                .row{display:flex;}
                                .text-center{text-align:center;}
                                .col-md-3 {-webkit-box-flex: 0;-ms-flex: 0 0 25%;flex: 0 0 25%;max-width: 25%;}
                                .col-md-6 {-webkit-box-flex: 0;-ms-flex: 0 0 50%;flex: 0 0 50%;max-width: 50%;}
                                .col-md-9 {-webkit-box-flex: 0;-ms-flex: 0 0 75%;flex: 0 0 75%;max-width: 75%;}
                                .col-md-12 {-webkit-box-flex: 0;-ms-flex: 0 0 100%;flex: 0 0 100%;max-width: 100%;}
                                .title1 {font-weight: bold;}
                                table {border-collapse: collapse;width: 100%;}
                                table th {text-align: center;vertical-align: middle;}
                                table td, table th{border: 1px solid #d9d9d9; padding: 3px;}
                                // tbody {page-break-after:always;}
                                .question {padding: 16px 0 16px 0;}
                                .container input {width: 25px;height: 25px;}
                              </style>`);
    // WindowPrt.document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.1/css/bootstrap.min.css">');
    WindowPrt.document.write('</head><body style="width: 80%; margin: auto;">');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write('</body></html>');
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();

  }

  colGroup(e) {
    let result = [];
    for (let i = 0; i < e; i++) {
      result.push(i);
    }
    return result;
  }
  loadClock() {
    if (this.clock > 0) {
      if (this.clock <= 300) {
        $(".button-timer").css({ "background-color": "#ffc107", "border-color": "#ffc107" });
      }
      let number = this.clock--;
      var i = Math.floor(number / (60) % (60));
      var s = Math.floor(number % 60);
      if (i < 10 && s < 10) this.times = '0' + i + ':' + '0' + s;
      else if (i < 10) this.times = '0' + i + ':' + s;
      else if (s < 10) this.times = i + ':' + '0' + s;
      else this.times = i + ':' + s;
      setTimeout(() => {
        this.loadClock();
      }, 1000);
    } else {
      this.times = '00:00';
      this.saveAnswer = true;
      $(".button-timer").css({ "background-color": "#d9534f", "border-color": "#d9534f" });
    }
  }
}
