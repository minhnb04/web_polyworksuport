import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent implements OnInit {

  checkAdmin: any;
  checkActive: any;
  roleSelect: any;
  genderSelect: any;

  AddForm = new FormGroup({
    full_name: new FormControl(null),
    email: new FormControl(null),
    dob: new FormControl(null),
    address: new FormControl(null),
  })

  ngOnInit(): void {
    this.getListAccount();
    this.getListRole();
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.accountService.delete(id).subscribe(
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
    this.roleSelect = dataEdit.role_code;
    this.genderSelect = dataEdit.gender;
    this.checkActive = dataEdit.active;
    this.checkAdmin = dataEdit.admin;
    if (dataEdit != null) {
      this.selected_ID = dataEdit._id;
      this.AddForm.patchValue({
        full_name: !dataEdit ? '' : dataEdit.full_name,
        email: !dataEdit ? '' : dataEdit.email,
        dob: !dataEdit ? '' : dataEdit.dob.substring(0,10),
        address: !dataEdit ? '' : dataEdit.address,
      });
    }
    else {
      this.AddForm.reset();
    }
  }

  handleOk(): void {
    var req: any = {
      full_name: this.AddForm.value.full_name,
      email: this.AddForm.value.email,
      dob: this.AddForm.value.dob,
      address: this.AddForm.value.address,
      gender: this.genderSelect,
      admin: this.checkAdmin,
      active: this.checkActive,
      role_code: this.roleSelect,
    }
    
    if (this.selected_ID) {
      req.updated_at = new Date();
      this.accountService.updateInfor(req, this.selected_ID).subscribe(
        (res: any) => {
          if (res) {
            this.toastr.success('Success !');
            this.getListAccount();
          }
          else {
            this.toastr.success('Fail !');
          }
        }
      );
    }
    else {
      req.created_at = new Date();
      this.accountService.insert(req).subscribe(
        (res: any) => {
          if (res) {
            this.toastr.success('Success !');
            this.getListAccount();
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

  banAccount(id: any) {
    this.accountService.updateInfor({active: false }, id).subscribe(
      (res: any) => {
        if (res) {
          this.toastr.success('Success !');
          this.getListAccount();
        }
        else {
          this.toastr.success('Fail !');
        }
      }
    );
  }

  activeAccount(id: any) {
    this.accountService.updateInfor({active: true}, id).subscribe(
      (res: any) => {
        if (res) {
          this.toastr.success('Success !');
          this.getListAccount();
        }
        else {
          this.toastr.success('Fail !');
        }
      }
    );
  }
}
