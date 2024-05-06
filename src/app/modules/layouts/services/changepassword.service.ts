import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChangepasswordService {

  baseUrl : string;
  headers: any;
  token: string;

  constructor(private http: HttpClient) {
    // set base Url
    this.baseUrl = environment.API_URL + 'users/';
    // set headers
    let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN');
    headers.append('Authorization', `Bearer ${token}`);
    this.headers = headers;
  }

  updatePassWord(data: any){
    let options = { headers: this.headers };
    // return this.http.post(this.baseUrl + 'update_password', data, options)
    // .map(res => res.json());
    return this.http.post<any>(this.baseUrl + 'update_password', data, options).pipe((data) => {
      return data;
    });
  }

}
