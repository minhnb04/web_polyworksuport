import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarStaffComponent } from './sidebar-staff.component';

describe('SidebarStaffComponent', () => {
  let component: SidebarStaffComponent;
  let fixture: ComponentFixture<SidebarStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
