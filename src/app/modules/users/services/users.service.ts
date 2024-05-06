import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Library } from 'src/app/shared/library/main';
import { environment } from 'src/environments/environment';



@Injectable()
export class UsersApi {

  baseUrl: string;
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

  async getAllUnit(role, owner_code): Promise<any> {
    let params = {
      role: role,
      ownercode: owner_code,
    };
    let options = { headers: this.headers, params: params };
    try {
      let response = await this.http
        .get(this.baseUrl + 'unit_getall', options)
        .toPromise();
      return response;
    } catch (error) {
      if (error.type == 3) {
        Library.notify("Request header field X-XSRF-TOKEN is not allowed by Access-Control-Allow-Headers in preflight response.", 'error');
      } else {
        Library.notify(error, 'error');
      }
    }
  }

  async getAllTree(id, role, ownercode): Promise<any> {
    let params = {
      idUnit: id,
      role: role,
      ownercode: ownercode,
    };
    let options = { headers: this.headers, params: params };
    try {
      let response = await this.http
        .get(this.baseUrl + 'tree_getall', options)
        .toPromise();
      return response;
    } catch (error) {
      if (error.type == 3) {
        Library.notify("Request header field X-XSRF-TOKEN is not allowed by Access-Control-Allow-Headers in preflight response.", 'error');
      } else {
        Library.notify(error, 'error');
      }
    }
  }

  // get unit
  getAllUnitId(data: any) {
    let urlParams = new URLSearchParams();
    urlParams.append('method', 'add');
    let options = {
      headers: this.headers, search: urlParams
    };
    return this.http.post<any>(this.baseUrl + 'unit_getAllById', data, options).pipe((data) => {
      return data;
    });
    // return this.http.post(this.baseUrl + 'unit_getAllById', data, options)
    //   .map(res => res.json());
  }

  // get root unit
  getRootUnit() {
    let options = { headers: this.headers };
    return this.http.get<any>(this.baseUrl + 'getroot_unit', options).pipe((data) => {
      return data;
    });
    // return this.http.get(this.baseUrl + 'getroot_unit', options)
    //   .map(res => res.json());
  }

  // get cap don vi
  getCapdonvi() {
    let options = { headers: this.headers };
    return this.http.get<any>(this.baseUrl + 'getcapdonvi', options).pipe((data) => {
      return data;
    });
    // return this.http.get(this.baseUrl + 'getcapdonvi', options)
    //   .map(res => res.json());
  }

   // get chuc vu
   getPosition(){
    let options = { headers: this.headers };
    return this.http.get<any>(this.baseUrl + 'getposition', options).pipe((data) => {
      return data;
    });
  }

  updateUnit(data: any){
    let urlParams = new URLSearchParams();
    urlParams.append('method', 'add');
    let options = {
      headers: this.headers, search: urlParams
    };
    return this.http.post<any>(this.baseUrl + 'unit_update', data, options).pipe((data) => {
      return data;
    });
    // return this.http.post(this.baseUrl + 'unit_update', data, options)
    //   .map(res => res.json());
  }

  deletesUnit(data: any){
    let options = { headers: this.headers };
    return this.http.post<any>(this.baseUrl + 'deletesUnit', data, options).pipe((data) => {
      return data;
    });
    // return this.http.post(this.baseUrl + 'deletesUnit', data, options)
    //   .map(res => res.json());
  }

  // get user by id
  getUserById(data) {
    let urlParams = new URLSearchParams();
    urlParams.append('method', 'add');
    let options = {
      headers: this.headers, search: urlParams
    };
    return this.http.post<any>(this.baseUrl + 'user_getAllById', data, options).pipe((data) => {
      return data;
    });
    // return this.http.post(this.baseUrl + 'user_getAllById', data, options)
      // .map(res => res.json());
  }

  // get Parent tree unit
  getParentTreeUnit(id) {
    let params = {
      idUnit: id
    };
    let options = {
      headers: this.headers, params: params
    };
    return this.http.get<any>(this.baseUrl + 'getTreeUnit',options).pipe((data) => {
      return data;
    });
    // return this.http.get(this.baseUrl + 'getTreeUnit', options)
    //   .map(res => res.json());
  }

  updateUser(data: any){
    let urlParams = new URLSearchParams();
    urlParams.append('method', 'add');
    let options = {
      headers: this.headers, search: urlParams
    };
    return this.http.post<any>(this.baseUrl + 'user_update', data, options).pipe((data) => {
      return data;
    });
    // return this.http.post(this.baseUrl + 'user_update', data, options)
    //   .map(res => res.json());
  }

  deletesUser(data: any){
    let options = { headers: this.headers };
    return this.http.post<any>(this.baseUrl + 'deletesUser', data, options).pipe((data) => {
      return data;
    });
    // return this.http.post(this.baseUrl + 'deletesUser', data, options)
    //   .map(res => res.json());
  }

  // get unit parent user
  getParentUser(id: any){
    let urlParams = new URLSearchParams();
    urlParams.append('method', 'add');
    let params = {
      unitId: id
    };
    let options = {
      headers: this.headers, params: params
    };
    return this.http.get<any>(this.baseUrl + 'getParentUser', options).pipe((data) => {
      return data;
    });
    // return this.http.get(this.baseUrl + 'getParentUser', options)
    //   .map(res => res.json());
  }

  // get user by txtSearch
  getUserBySearch(rootSearch, search){
    let params = {
      rootParent: rootSearch,
      txtSearch: search
    }
    let options = { headers: this.headers, params: params };
    return this.http.get<any>(this.baseUrl + 'getUserBytxtSearch', options).pipe((data) => {
      return data;
    });
    // return this.http.get(this.baseUrl + 'getUserBytxtSearch', options)
    //   .map(res => res.json());
  }

  getInfoParent(data){
    let params = {
      idUnit: data.id
    }
    let options = { headers: this.headers, params: params };
    return this.http.get<any>(this.baseUrl + 'getInfoParent', options).pipe((data) => {
      return data;
    });
    // return this.http.get(this.baseUrl + 'getInfoParent', options)
    //   .map(res => res.json());
  }

}