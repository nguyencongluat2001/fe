import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ListtypeApi } from '../export';
import { Library } from 'src/app/shared/library/main';
import { HttpService } from 'src/app/core/http.service';

export class Listtype {
    id: number |boolean = false;
    code: string = '';
    list_description: string = '';
    name: string = '';
    note: string = '';
    status: number = 1;
    order: number = 1;
}

@Injectable()
export class ListtypeModel {
    
    listtypes: Listtype[];
    listtype: Listtype;
    header: string;
    listtypeId: number;

    
    constructor(private HttpService: HttpService,private ApiService: ListtypeApi
        , private router: Router
    ) {
    }

    setListtypes(data){
        this.listtypes = data;
    }

    // Lay thong tin 1 loai danh muc
    getListtype(){
        if(!this.listtype){
            this.listtype = new Listtype();
        }
        return this.listtype;
    }

    setListtype(data){
        if(!data){
            data = new Listtype();
            if(this.listtypes){
                data.order = this.listtypes.length + 1;
            }
        }
        this.listtype = data;
    }

    getAllLabel(){
        let listtype_label = [
            {
                "value": " ",
                "label": "-- Chọn danh mục --"
            }
        ];
        let i=1;
        if(this.listtypes){
            for (let listtype of this.listtypes) {
                
                listtype_label[i] = {"value":listtype.code, "label": listtype.name};
                i++;
             }
        }
        return listtype_label;
    }
    
    getDescription(){
        let listtype = this.getListtype()[0];
        var data = this.getDefaultValue();
        if(listtype.list_description){
            data = JSON.parse(listtype.list_description);
        }
        var options = {
            fieldRemoveWarn: true,
            defaultFields: data
        };
        return options;
    }

    getDefaultValue(){
        return  [{
            "type": "text",
            "key": "code",
            "label": "Mã đối tượng",
            "required": true,
            "className": "form-control"
        },
        {
            "type": "text",
            "key": "name",
            "label": "Tên đối tượng",
            "required": true,
            "className": "form-control"
        },
        {
            "type": "select",
            "key": "code_unit",
            "label": "Lĩnh vực sở",
            "className": "form-control"
        },
        {
            "type": "textarea",
            "key": "note",
            "label": "Ghi chú",
            "className": "form-control",
            "subtype": "textarea",
            "rows": "2"
        },
        {
            "type": "text",
            "key": "order",
            "label": "Số thứ tự",
            "className": "form-control"
        }];
    }

    getListtypeId(){
        return this.listtypeId;
    }

    setListtypeId(data){
        this.listtypeId = data;
    }

    update(data,activeModal){
        Library.showloading();
        this.HttpService.postMethods("listtype/update", data).subscribe(
            response => {
        // this.ApiService.saveListtype(data).subscribe((response: any) => {
            if (response.success) {
              Library.notify(response.message, 'success');
              // Kiểm tra nếu là thêm mới thì load lại dữ liệu màn hình danh sách
            //   if (!data.id) {
                let newrouter = "";
                if (this.router.url == "/system/listtype") {
                  newrouter = "/system/listtype/index";
                } else {
                  newrouter = "/system/listtype";
                }
                this.router.navigate([newrouter]);
            //   }
              activeModal.hide();
            } else {
              Library.notify(response.message, 'error');
            }
            Library.hideloading();
        }, error => {
            Library.hideloading();
        Library.notify(error, 'error');
        });
    }

    delete(data,Myclass){
        Library.showloading();
        this.HttpService.postMethods("listtype/deletes", data).subscribe(
            response => {
        // this.ApiService.deletesListtype(data).subscribe((response: any) => {
            if (response.success) {
              Library.notify(response.message, 'success');
              Myclass.loadlist();
            } else {
              Library.notify(response.message, 'error');
            }
            Library.hideloading();
          }, error => {
            Library.hideloading();
            Library.notify(error, 'error');
          });
    }
}