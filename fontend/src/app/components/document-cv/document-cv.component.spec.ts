import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCvComponent } from './document-cv.component';

describe('DocumentCvComponent', () => {
  let component: DocumentCvComponent;
  let fixture: ComponentFixture<DocumentCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
