import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Library } from 'src/app/shared/library/main';
import { environment } from 'src/environments/environment';

@Injectable()
export class ListtypeApi {

  baseUrl : string;
  headers: any;
  token: string;

  constructor(private http: HttpClient) {
    // set base Url
    this.baseUrl = environment.API_URL + 'listtype/';
    // set headers
    let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN');
    headers.append('Authorization', `Bearer ${token}`);
    this.headers = headers;
  }

  async getAllListtype(): Promise<any> {
    let options = { headers: this.headers};
    try {
        let response = await this.http
          .get(this.baseUrl + 'getall',options)
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

  saveListtype(data: any)
  {
      let urlParams = new URLSearchParams();
      urlParams.append('method', 'add');
      let options = { headers: this.headers, search: urlParams 
      };
      return this.http.post<any>(this.baseUrl + 'update', data, options).pipe((data) => {
        return data;
      });
  }

  deleteListtype(data: any)
  {
      let urlParams = new URLSearchParams();
      urlParams.append('method', 'add');
      let options = { headers: this.headers, search: urlParams 
      };
      return this.http.post<any>(this.baseUrl + 'delete', data, options).pipe((data) => {
        return data;
      });
  }

  deletesListtype(data: any)
  {
    let options = { headers: this.headers};
    return this.http.post<any>(this.baseUrl + 'deletes', data, options).pipe((data) => {
      return data;
    });
  }

}
