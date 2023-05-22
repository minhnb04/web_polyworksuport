import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent extends BaseComponent implements OnInit {

  AddForm = new FormGroup({
    role_code: new FormControl(null, Validators.required),
    role_name: new FormControl(null, Validators.required),
  })

  ngOnInit(): void {
    this.getListRole();
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.roleService.delete(id).subscribe(
          (res: any) => {
            if (res) {
              this.toastr.success('Delete Success !');
              this.getListRole();
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListRole();
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
        role_name: !dataEdit ? '' : dataEdit.role_name,
        role_code: !dataEdit ? '' : dataEdit.role_code,
      });
    }
    else {
      this.AddForm.reset();
    }
  }

  handleOk(): void {
    var req = {
      role_code: this.AddForm.value.role_code,
      role_name: this.AddForm.value.role_name,
    }
    if (this.AddForm.valid) {
      if (this.selected_ID) {
        this.roleService.update(req, this.selected_ID).subscribe(
          (res: any) => {
            if (res) {
              this.toastr.success('Success !');
              this.getListRole();
            }
            else {
              this.toastr.success('Fail !');
            }
          }
        );
      }
      else {
        this.roleService.insert(req).subscribe(
          (res: any) => {
            if (res) {
              this.toastr.success('Success !');
              this.getListRole();
            }
            else {
              this.toastr.success('Fail !');
            }
          }
        );
      }
      this.isDisplay = false;
    }
    else {
      Object.values(this.AddForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isDisplay = false;
  }
}
