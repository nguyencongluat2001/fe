import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Library } from 'src/app/shared/library/main';
import { environment } from 'src/environments/environment';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

  baseUrl : string;
  headers: any;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.API_URL + 'evaluation/';
    // set headers
    let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN');
    headers.append('Authorization', `Bearer ${token}`);
    this.headers = headers;
  }

  async callGet(url,params): Promise<any>{
    let options = { params: params, headers: this.headers};
      try {
          let response = await this.http
            .get(this.baseUrl + url,options)
            .toPromise();
          return response;
        } catch (error) {
          if(error.type == 3){
            Library.notify("Request header field X-XSRF-TOKEN is not allowed by Access-Control-Allow-Headers in preflight response.",'error');
          }else{
            Library.notify(error,'error');
          }
      }
  }

  callPost(url:any,data: any){
    let urlParams = new URLSearchParams();
    urlParams.append('method', 'add');
    let options = { headers: this.headers, search: urlParams };
    // return this.http.post(this.baseUrl + url, data, options)
    // .map(res => res.json());
    return this.http.post<any>(this.baseUrl + url, data, options).pipe((data) => {
      return data;
    });
  }

  getTypeUnits(){
    let typeUnit = [{
      "code": "QUAN_HUYEN",
      "name": "Quận huyện"
    },{
      "code": "SO_NGHANH",
      "name": "Sở nghành"
    },{
      "code": "PHUONG_XA",
      "name": "Phường xã"
    },{
      "code": "All",
      "name": "Tất cả"
    }];
    return typeUnit;
  }

  

}
