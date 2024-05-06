import { Component, ElementRef, Input, OnInit, Renderer2, NgModule, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { Changpass } from '../models/changpass';
/**
 * Component quản lý layout sideBar.
 *
 * @author Toanph <skype: toanph1505>
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
})
export class AppSidebarNavComponent {
  @Input() data: any;

  public project: any;
  public sidebar_parindex: any;
  public sidebar_report: any;
  public sidebar_system: any;
  public sidebar_sociological: any;
  public sidebar_sipas:any;

  constructor(private _router: Router, private route: ActivatedRoute) {
    let user_infor = JSON.parse(localStorage.getItem('user_infor'));
    // let _sidebar = this.checkGrant(sidebar, user_infor.role);
    // this.navigation = _sidebar;
    // console.log(localStorage.getItem('arrController'));

    this.sidebar_parindex = JSON.parse(localStorage.getItem('arrController'));
    // this.sidebar_report = JSON.parse(localStorage.getItem('arrreport'));
    this.sidebar_system = JSON.parse(localStorage.getItem('arrsystem'));
    // this.sidebar_sociological = JSON.parse(localStorage.getItem('arrSociological'));
    // this.sidebar_sipas = JSON.parse(localStorage.getItem('arrSipas'));
    let timeExprire = JSON.parse(localStorage.getItem('timeExprire'))['timeExprire'];
    if (new Date() > new Date(timeExprire)) {
      localStorage.removeItem('isLogin');
      this._router.navigate(['login/index']);
    }
    var code = '';
    this.sidebar_parindex.forEach(element => {
      if (this._router.url.search(element.url) > 0) {
        code = 'eparindex';
      }
      if (element.children) {
        element.children.forEach(item => {
          if (this._router.url.search(item.url) > 0) {
            code = 'eparindex';
          }
        });
      }
    });

    // this.sidebar_report.forEach(element => {
    //   if (this._router.url.search(element.url) > 0) {
    //     code = 'ereport';
    //   }
    //   if (element.children) {
    //     element.children.forEach(item => {
    //       if (this._router.url.search(item.url) > 0) {
    //         code = 'ereport';
    //       }
    //     });
    //   }
    // });
    // this.sidebar_sociological.forEach(element => {
    //   if (element.children) {
    //     element.children.forEach(item => {
    //       if (this._router.url.search(item.url) > 0) {
    //         code = 'sociological';
    //       }
    //     });
    //   }

    // });
    // this.sidebar_sipas.forEach(element => {
    //   if (element.children) {
    //     element.children.forEach(item => {
    //       if (this._router.url.search(item.url) > 0) {
    //         code = 'sipas';
    //       }
    //     });
    //   }

    // });
    if (!code) {
      this.sidebar_system.forEach(element => {
        if (element.children) {
          element.children.forEach(item => {
            if (this._router.url.search(item.url) > 0) {
              code = 'system';
            }
          });
        }else{
          code = element.project.toLowerCase();
        }

      });
    }
    if (code != 'system' && code != 'sociological' && code != 'sipas') {
      code = localStorage.getItem('currentProject');
    }
    this.project = code;
    // this.changepassModel.check = code;
  }

  changesidebar(project) {
    this.project = project;
    // this.changepassModel.check = project;
  }



  private checkGrant(sidebars, role) {
    var re_sidebars = [{}];
    var j = 0;
    for (var i = 0; i < sidebars.length; i++) {
      var sidebar = sidebars[i];
      if (sidebar.grant) {
        var grant = ',' + sidebar.grant + ',';
        var check_role = ',' + role + ',';
        var search = grant.search(check_role);
        if (search >= 0) {
          re_sidebars[j] = sidebar;
          j++;
        }
      }
    }
    return re_sidebars;
  }

  public isDivider(item) {
    return item.divider ? true : false
  }

  public isTitle(item) {
    return item.title ? true : false
  }
}

/**
 * Component hiển thị từng module
 *
 * @author Toanph <skype: toanph1505>
 */
@Component({
  selector: 'app-sidebar-item-admin',
  templateUrl: './app-sidebar-item-admin.component.html',
})
export class AppSidebarBackendNavItemComponent implements OnInit {
  @Input() item: any;
  public url: any;
  public layout: any;
  constructor(private router: Router) {
  }

  // Khoi tao
  ngOnInit() {
    this.layout = localStorage.getItem('layout') + '-nav-link';
    // check system or backend
    this.url = "/" + localStorage.getItem('layout') + this.item.url;
  }

  public hasClass() {
    return this.item.class ? true : false
  }

  public isDropdown() {
    return this.item.children ? true : false
  }

  public thisUrl() {
    return this.item.url
  }

  public isActive() {
    return this.router.isActive(this.thisUrl(), false)
  }

  public hasVariant() {
    return this.item.variant ? true : false
  }

  public isBadge() {
    return this.item.badge ? true : false
  }

  public isExternalLink() {
    return this.item.url.substring(0, 4) === 'http' ? true : false
  }

  public isIcon() {
    return this.item.icon ? true : false
  }

  public isImages() {
    return this.item.images ? true : false
  }

  public isChild() {
    return this.item.children ? true : false
  }
}

/**
 * Component quản lý thẻ tiêu đề cho sidebar
 *
 * @author Toanph <skype: toanph1505>
 */
@Component({
  selector: 'app-sidebar-title',
  template: ''
})
export class AppSidebarNavTitleComponent implements OnInit {
  @Input() title: any;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const li = this.renderer.createElement('li');
    const name = this.renderer.createText(this.title.name);

    this.renderer.addClass(li, 'nav-title');

    if (this.title.class) {
      const classes = this.title.class;
      this.renderer.addClass(li, classes);
    }

    if (this.title.wrapper) {
      const wrapper = this.renderer.createElement(this.title.wrapper.element);

      this.renderer.appendChild(wrapper, name);
      this.renderer.appendChild(li, wrapper);
    } else {
      this.renderer.appendChild(li, name);
    }
    this.renderer.appendChild(nativeElement, li)
  }
}

/**
 * Component hiển thị từng module
 *
 * @author Toanph <skype: toanph1505>
 */
@Component({
  selector: 'app-sidebar-item',
  templateUrl: './app-sidebar-item.component.html',
})
export class AppSidebarNavItemComponent implements OnInit {
  @Input() item: any;

  constructor(private router: Router) {
  }

  // Khoi tao
  ngOnInit() {
  }

  public hasClass() {
    return this.item.class ? true : false
  }

  public isDropdown() {
    return this.item.children ? true : false
  }

  public thisUrl() {
    let url = this.item.url;
    if(this.item.children != undefined && this.item.children.length > 0){
      this.item.children.forEach(e => {
        if(this.router.isActive('system' + e.url,false)){
          url = 'system' + e.url;
        }
      })
    }
    return url;
  }

  public isActive(): boolean {
    return this.router.isActive(this.thisUrl(), false)
  }
}

/**
 * Component hiển thị Link Sidebar
 *
 * @author Toanph <skype: toanph1505>
 */
@Component({
  selector: 'app-sidebar-link',
  template: `
    <a *ngIf="!isExternalLink(); else external"
      class="{{ layout }}"
      [ngClass]="hasVariant() ? 'nav-link nav-link-' + link.variant : 'nav-link'"
      routerLinkActive="active"
      [routerLink]="[url]">
      <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
      <img class="sidebar-icon" *ngIf="isImages()" [src]="link.images" alt="">
      <span *ngIf="isImages()" class="sidebar-text">{{ link.name }}</span>
      <span *ngIf="isIcon()">{{ link.name }}</span>
      <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
    </a>
    <ng-template #external>
      <a class="{{ layout }}" [ngClass]="hasVariant() ? 'nav-link nav-link-' + link.variant : 'nav-link'" href="{{url}}">
        <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
        {{ link.name }}
        <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
      </a>
    </ng-template>
  `
})
export class AppSidebarNavLinkComponent implements OnInit {
  @Input() link: any;
  public url: any;
  public layout: any;
  constructor() { }

  // Khoi tao
  ngOnInit() {
    this.layout = localStorage.getItem('layout') + '-nav-link';
    // check system or backend
    // this.url = "/" + localStorage.getItem('layout') + this.link.url;
    this.url = "/system" + this.link.url;
  }

  public hasVariant() {
    return this.link.variant ? true : false
  }

  public isBadge() {
    return this.link.badge ? true : false
  }

  public isExternalLink() {
    return this.link.url.substring(0, 4) === 'http' ? true : false
  }

  public isIcon() {
    return this.link.icon ? true : false
  }

  public isImages() {
    return this.link.images ? true : false
  }

}

/**
 * Component quản lý dropdown cho sidebar
 *
 * @author Toanph <skype: toanph1505>
 */
@Component({
  selector: 'app-sidebar-dropdown',
  styleUrls: ['./app-sidebar.component.scss'],
  template: `
    <div class="nested-menu">
      <a class="nav-link nav-dropdown-toggle {{layout}}" mat-list-item (click)="onclickSidebar(item)">
          <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
          <img class="sidebar-icon" *ngIf="isImages()" [src]="link.images" alt="">
          <span class="sidebar-text">{{ link.name }}</span>
          <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
      </a>
      <ul class="nested submenu" [class.expand]="getShowHide(item)">
          <ng-template ngFor let-child [ngForOf]="link.children">
            <app-sidebar-item [item]='child'></app-sidebar-item>
          </ng-template>
      </ul>
    </div>
  `
})
export class AppSidebarNavDropdownComponent {
  @Input() link: any;
  layout: any;
  item = {}
  onclickSidebar(item) {
    if (this.showMenu[item.url]) {
      this.showMenu[item.url] = false;
    } else {
      this.showMenu[item.url] = true;
    }
  }
  getShowHide(item) {
    return this.showMenu[item.url];
  }
  //
  showMenu = {};
  public isBadge() {
    return this.link.badge ? true : false
  }

  public isIcon() {
    return this.link.icon ? true : false
  }

  public isImages() {
    return this.link.images ? true : false
  }

  constructor(private router: Router) {
    this.layout = localStorage.getItem('layout') + '-nav-link';
  }
  public thisUrl(item) {
    let url = item.url;
    if(item.children != undefined && item.children.length > 0){
      item.children.forEach(e => {
        if(this.router.isActive('system' + e.url,false)){
          url = 'system' + e.url;
        }
      })
    }
    return url;
  }

  public isActive(item): boolean {
    return this.router.isActive(this.thisUrl(item), false)
  }
}

export const APP_SIDEBAR_NAV = [
  AppSidebarNavComponent,
  AppSidebarNavDropdownComponent,
  AppSidebarNavItemComponent,
  AppSidebarNavLinkComponent,
  AppSidebarNavTitleComponent,
  AppSidebarBackendNavItemComponent,
];
