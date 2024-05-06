import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


export class Task {
  Task_ID: number;

  Task_Parent_ID: number;

  Task_Assigned_Employee_ID: number;

  Task_Completion: number;

  Task_Priority: number;

  Task_Status: string;

  Modules: string;

  Task_Start_Date: string;

  Task_Due_Date: string;

  Task_Assigned_Employee?: Employee;
}

export class Employee {
  ID: number;

  Name: string;

  Picture: string;
}

export class Priority {
  id: number;

  value: string;
}

const tasks: Task[] = [{
    Task_ID: 1,
    Task_Assigned_Employee_ID: 1,
    Modules: 'Quản trị hệ thống',
    Task_Start_Date: '2015-01-01T00:00:00',
    Task_Due_Date: '2015-04-01T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 0,
  },
  {
    Task_ID: 2,
    Task_Assigned_Employee_ID: 1,
    Modules: 'Quản trị phần mềm người dùng',
    Task_Start_Date: '2015-01-01T00:00:00',
    Task_Due_Date: '2015-04-01T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 0,
  },
  {
    Task_ID: 3,
    Task_Assigned_Employee_ID: 1,
    Modules: 'Quản trị phần mềm báo cáo',
    Task_Start_Date: '2015-01-01T00:00:00',
    Task_Due_Date: '2015-04-01T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 0,
  },
  {
    Task_ID: 200,
    Task_Assigned_Employee_ID: 7,
    Modules: 'Quản trị hệ thống',
    Task_Start_Date: '2015-01-15T00:00:00',
    Task_Due_Date: '2015-01-31T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 1,
  },
  {
    Task_ID: 201,
    Task_Assigned_Employee_ID: 7,
    Modules: 'Quản trị danh mục',
    Task_Start_Date: '2015-01-15T00:00:00',
    Task_Due_Date: '2015-01-31T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 1,
  },
  {
    Task_ID: 100,
    Task_Assigned_Employee_ID: 7,
    Modules: 'Quản trị đợt đánh giá',
    Task_Start_Date: '2015-01-15T00:00:00',
    Task_Due_Date: '2015-01-31T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 2,
  },
  {
    Task_ID: 101,
    Task_Assigned_Employee_ID: 7,
    Modules: 'Quản trị đợt đánh giá',
    Task_Start_Date: '2015-01-15T00:00:00',
    Task_Due_Date: '2015-01-31T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 2,
  },{
    Task_ID: 102,
    Task_Assigned_Employee_ID: 7,
    Modules: 'Thực hiện đánh giá',
    Task_Start_Date: '2015-01-15T00:00:00',
    Task_Due_Date: '2015-01-31T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 2,
  },{
    Task_ID: 103,
    Task_Assigned_Employee_ID: 7,
    Modules: 'Chấm điểm',
    Task_Start_Date: '2015-01-15T00:00:00',
    Task_Due_Date: '2015-01-31T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 2,
  },{
    Task_ID: 104,
    Task_Assigned_Employee_ID: 7,
    Modules: 'Duyệt thẩm định',
    Task_Start_Date: '2015-01-15T00:00:00',
    Task_Due_Date: '2015-01-31T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 2,
  },
  //QT hệ thống 
  {
    Task_ID: 1001,
    Task_Assigned_Employee_ID: 7,
    Modules: 'Quản trị người dùng',
    Task_Start_Date: '2015-01-15T00:00:00',
    Task_Due_Date: '2015-01-31T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 200,
  },
  {
    Task_ID: 1002,
    Task_Assigned_Employee_ID: 7,
    Modules: 'Quản trị nhóm quyền',
    Task_Start_Date: '2015-01-15T00:00:00',
    Task_Due_Date: '2015-01-31T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 200,
  },
  {
    Task_ID: 1003,
    Task_Assigned_Employee_ID: 7,
    Modules: 'Quản trị menu',
    Task_Start_Date: '2015-01-15T00:00:00',
    Task_Due_Date: '2015-01-31T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 200,
  },

  //
  {
    Task_ID: 1004,
    Task_Assigned_Employee_ID: 7,
    Modules: 'Loại danh mục',
    Task_Start_Date: '2015-01-15T00:00:00',
    Task_Due_Date: '2015-01-31T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 201,
  },
  {
    Task_ID: 1005,
    Task_Assigned_Employee_ID: 7,
    Modules: 'Loại danh mục đối tượng',
    Task_Start_Date: '2015-01-15T00:00:00',
    Task_Due_Date: '2015-01-31T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 201,
  }
];

const employees: Employee[] = [];

const priorities: Priority[] = [
  { id: 1, value: 'Low' },
  { id: 2, value: 'Normal' },
  { id: 3, value: 'Urgent' },
  { id: 4, value: 'High' },
];

@Injectable()
export class Service {
  baseUrl: string;
  headers: any;
  token: string;
  taskcontroller:any = [];
  constructor(private http: HttpClient) {
    // set base Url
    this.baseUrl = environment.API_URL + 'menu/';
    // set headers
    let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN');
    headers.append('Authorization', `Bearer ${token}`);
    this.headers = headers;
  }

  async getTasks(){
    let params = {
          role: 1,
          ownercode: '000.00.08.H23',
        };
        let options = { headers: this.headers, params: params };
        return  await this.http
        .get(this.baseUrl + 'getAllController', options)
        .toPromise();
  }

  async selectionChangedMenu(e){
    let params = {
      role: 1,
      ownercode: '000.00.08.H23',
      value: e.selectedRowsData
    };
    let options = { headers: this.headers, params: params };
    return await this.http
    .get(this.baseUrl + 'getController', options)
    .toPromise();
  }
  getEmployees(): Employee[] {
    return employees;
  }

  getPriorities(): Priority[] {
    return priorities;
  }
  // update(data: any): Observable<any> {
  //   let urlParams = new URLSearchParams();
  //   urlParams.append('method', 'add');
  //   let options = new RequestOptions({
  //     headers: this.headers, search: urlParams
  //   });
  //   return this.http.post(this.baseUrl + 'user_update', data, options)
  //     .map(res => res.json());
  // }
}
