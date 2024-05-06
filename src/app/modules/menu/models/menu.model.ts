import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { Library } from 'src/app/shared/library/main';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Menu {
  id: number |boolean = false;
  modules: string = '';
  code: string = '';
  name: string = '';
  urrl: string = '';
}
@Injectable()
export class MenuModel { 
  id:any;
  menus: any;
  menu: any;
  checkRoute:any;
  items:any;
  Modules_path:any;
  type:any;
  packet_module_id:any;
  constructor(
    //    private ApiService: Service,
    //  private router: Router
) { }
  setMenu(data){
    if(!data){
        data = new Menu();
        if(this.menus){
            data.order = this.menus.length + 1;
        }
    }
    return this.menu = data;
  }
  setModulesPath(Modules_path){
    return this.Modules_path = Modules_path;
  }
  setType(type){
    return this.type = type;
  }
  setPacket_module_id(Packet_module_id){
    return this.packet_module_id = Packet_module_id;
  }
  
  // lay chuoi json serve tra ve
  getMenu() {
    return this.menus;
  }
  update(data, activeModal) {
    Library.showloading();
    // this.ApiService.update(data).subscribe((response: any) => {
    //     Library.hideloading();
    //     if (response.success) {
    //         Library.notify(response.message, 'success');
    //         let check = this.getRouter();
    //         // Kiểm tra nếu là thêm mới thì load lại dữ liệu màn hình danh sách
    //         // if (!data.id) {
    //         let newrouter = "";
    //         if (check == 'users') {
    //             newrouter = "/system/users/users";
    //             this.setCheckRoute('users/users');
    //         } else {
    //             newrouter = "/system/users";
    //             this.setCheckRoute('users');
    //         }
    //         this.router.navigate([newrouter], { queryParams: { parent_id: data.unit_id, code: data.getType } });
    //         // }
    //         activeModal.hide();
    //     } else {
    //         Library.notify(response.message, 'error');
    //     }

    // });
  }
  setCheckRoute(route) {
    this.checkRoute = route;
  }

  getRouter() {
      return this.checkRoute;
  }
  setSelectItems(data) {
    this.items = data;
  }
}
