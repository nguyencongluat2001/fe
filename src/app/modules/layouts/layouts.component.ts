import { Component, HostListener, ViewChild } from '@angular/core';
import { AppSidebarNavComponent } from './app-sidebar';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent {
  isShow: boolean = false;
  topPosToStartShowing = 300;
  @ViewChild(AppSidebarNavComponent) _navrbar: AppSidebarNavComponent;
  @HostListener('window:scroll')

  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  gotoTop() {
    window.scroll({ 
      top: 0,
      left: 0,
      behavior: 'smooth' 
    });
  }
  changesidebar(project){
    this._navrbar.changesidebar(project);
  }
}
