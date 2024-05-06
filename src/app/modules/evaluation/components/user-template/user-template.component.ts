import { Component, OnInit, Input } from '@angular/core';
import { PermissionComponent } from '../permission/permission.component';
@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrls: ['./user-template.component.scss']
})
export class UserTemplateComponent implements OnInit {
  @Input() data: any;
  constructor(public permissioncomponent:PermissionComponent) {

  }

  ngOnInit() {
  }

}
