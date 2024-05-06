import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Library } from 'src/app/shared/library/main';
import { environment } from 'src/environments/environment';

@Injectable()
export class ListApi {

  baseUrl : string;
  headers: any;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.API_URL + 'listtype/list/';
    // set headers
    let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN');
    headers.append('Authorization', `Bearer ${token}`);
    this.headers = headers;
  }

  async getAll(id): Promise<any> {
    Library.showloading();
    let params = {
      listtypeId: id
    };
    let options = { params: params, headers: this.headers};
    try {
        let response = await this.http
          .get(this.baseUrl + 'getall', options)
          .toPromise();
          Library.hideloading();
        return response;
      } catch (error) {
        Library.hideloading();
        await console.log(error);
    }
  }

  async getAllByCode(code): Promise<any> {
    let params = {
      listtypeCode: code
    };
    let options = { params: params, headers: this.headers};
    try {
        let response = await this.http
          .get(this.baseUrl + 'getallByCode', options)
          .toPromise();
        return response;
      } catch (error) {
        await console.log(error);
    }
  }
  async getCode_unit(code): Promise<any> {
    let params = {
      listtypeCode: code
    };
    let options = { params: params, headers: this.headers};
    try {
        let response = await this.http
          .get(this.baseUrl + 'getCode_unit', options)
          .toPromise();
        return response;
      } catch (error) {
        await console.log(error);
    }
  }

  update(data: any)
  {
      let options = { headers: this.headers
      };
      return this.http.post<any>(this.baseUrl + 'update', data, options).pipe((data) => {
        return data;
      });
  }

  delete(data: any)
  {
      let options = { headers: this.headers
      };
      return this.http.post<any>(this.baseUrl + 'deletes', data, options).pipe((data) => {
        return data;
      });
  }
  get(data: any)
  {
      let options = { headers: this.headers
      };
      return this.http.get<any>(this.baseUrl + 'getCode_unit', options).pipe((data) => {
        return data;
      });
  }

}
