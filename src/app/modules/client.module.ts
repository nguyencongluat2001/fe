import { HttpService } from 'src/app/core/http.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { MaterialModule } from '../core/load.material.module';
import { LayoutsComponent } from './layouts/layouts.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AppSidebarNavComponent, AppSidebarNavDropdownComponent, AppSidebarNavItemComponent, AppSidebarNavLinkComponent, AppSidebarNavTitleComponent } from './layouts/app-sidebar';
import { AppHeaderComponent } from './layouts/app-header';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Changpass } from './layouts/models/changpass';
import { AppBreadcrumbsComponent } from './layouts/app-breadcrumbs';
import { ChangepasswordService } from './layouts/services/changepassword.service';
import { ChangePasswordComponent } from './layouts/change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule,
    FormsModule,
    RouterModule
  ],
  providers: [HttpService,Changpass,ChangepasswordService],
  declarations: [
    LayoutsComponent,
    AppHeaderComponent,
    FooterComponent,
    AppSidebarNavComponent,
    AppSidebarNavTitleComponent,
    AppSidebarNavItemComponent,
    AppSidebarNavLinkComponent,
    AppSidebarNavDropdownComponent,
    AppBreadcrumbsComponent,
    ChangePasswordComponent
  ],
})
export class ClientModule { }
