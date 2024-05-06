import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionupdateComponent } from './permissionupdate.component';

describe('PermissionupdateComponent', () => {
  let component: PermissionupdateComponent;
  let fixture: ComponentFixture<PermissionupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
