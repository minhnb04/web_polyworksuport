import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalCompanyComponent } from './portal-company.component';

describe('PortalCompanyComponent', () => {
  let component: PortalCompanyComponent;
  let fixture: ComponentFixture<PortalCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
