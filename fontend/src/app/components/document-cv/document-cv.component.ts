import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-document-cv',
  templateUrl: './document-cv.component.html',
  styleUrls: ['./document-cv.component.scss']
})
export class DocumentCvComponent extends BaseComponent implements OnInit {

  AddForm = new FormGroup({
    document_name: new FormControl(null),
    document_code: new FormControl(null),
    document_link: new FormControl(null),
    status: new FormControl(null),
    user_id: new FormControl(null),
  })

  ngOnInit(): void {
    this.getListDocumentCV();
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.documentCVService.delete(id).subscribe(
          (res: any) => {
            if (res) {
              this.toastr.success('Delete Success !');
              this.getListDocumentCV();
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListDocumentCV();
            }
          }
        )
      }
    });
  }

  showAddModal(title: any, dataEdit: any): void {
    this.isDisplay = true;
    this.titleModal = title;
    this.selected_ID = null;
    if (dataEdit != null) {
      this.selected_ID = dataEdit._id;
      this.AddForm.patchValue({
        document_name: !dataEdit ? '' : dataEdit.document_name,
        document_code: !dataEdit ? '' : dataEdit.document_code,
        document_link: !dataEdit ? '' : dataEdit.document_link,
        user_id: !dataEdit ? '' : dataEdit.user_id,
        status: !dataEdit ? '' : dataEdit.status,
      });
    }
    else {
      this.AddForm.reset();
    }
  }

  acceptCV(id: any) {
    this.documentCVService.update({status: 2}, id).subscribe(
      (res: any) => {
        if (res) {
          this.toastr.success('Success !');
          this.getListDocumentCV();
        }
        else {
          this.toastr.success('Fail !');
        }
      }
    );
  }

  denyCV(id: any) {
    this.documentCVService.update({status: 1}, id).subscribe(
      (res: any) => {
        if (res) {
          this.toastr.success('Success !');
          this.getListDocumentCV();
        }
        else {
          this.toastr.success('Fail !');
        }
      }
    );
  }

  handleOk(): void {
    var req: any = {
      document_name: this.AddForm.value.document_name,
      document_code: this.AddForm.value.document_code,
      document_link: this.AddForm.value.document_link,
      user_id: this.AddForm.value.user_id,
    }
    
    if (this.selected_ID) {
      req.updated_at = new Date();
      this.documentCVService.update(req, this.selected_ID).subscribe(
        (res: any) => {
          if (res) {
            this.toastr.success('Success !');
            this.getListDocumentCV();
          }
          else {
            this.toastr.success('Fail !');
          }
        }
      );
    }
    else {
      req.created_at = new Date();
      req.status = 1;
      this.documentCVService.insert(req).subscribe(
        (res: any) => {
          if (res) {
            this.toastr.success('Success !');
            this.getListDocumentCV();
          }
          else {
            this.toastr.success('Fail !');
          }
        }
      );
    }
    
    this.isDisplay = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isDisplay = false;
  }
}
