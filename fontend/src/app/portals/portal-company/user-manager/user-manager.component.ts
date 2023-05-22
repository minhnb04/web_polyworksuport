import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent extends BaseComponent implements OnInit {

  checkAdmin: any = false;
  checkActive: any;
  roleSelect: any;

  AddForm = new FormGroup({
    full_name: new FormControl(null),
    user_name: new FormControl(null),
    email: new FormControl(null),
    address: new FormControl(null),
  })

  ngOnInit(): void {
    this.getListAccountByCompany();
    this.getListRole();
    this.checkIsManager();
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
              this.getListAccountByCompany();
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListAccountByCompany();
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
      this.isInsert = false;
      this.roleSelect = dataEdit.role_code ?? '';
      this.checkActive = dataEdit.active;
      this.checkAdmin = dataEdit.admin;
      this.selected_ID = dataEdit._id;
      this.AddForm.patchValue({
        full_name: !dataEdit ? '' : dataEdit.full_name,
        email: !dataEdit ? '' : dataEdit.email,
        address: !dataEdit ? '' : dataEdit.address,
      });
    }
    else {
      this.isInsert = true;
      this.AddForm.reset();
    }
  }

  handleOk(): void {
    var req: any = {
      full_name: this.AddForm.value.full_name,
      email: this.AddForm.value.email,
      // dob: this.AddForm.value.dob,
      address: this.AddForm.value.address,
      // gender: this.genderSelect,
      admin: this.checkAdmin,
      active: this.checkActive,
      role_code: this.roleSelect ?? '',
      company_code: this.getInfo().company_code,
      created_at: null,
      updated_at: null,
      deleted_at: null,
    }

    if (this.selected_ID) {
      req.updated_at = new Date();
      this.accountService.updateInfor(req, this.selected_ID).subscribe(
        (res: any) => {
          if (res) {
            this.toastr.success('Success !');
            this.getListAccountByCompany();
          }
          else {
            this.toastr.success('Fail !');
          }
        }
      );
    }
    else {
      req.created_at = new Date();
      req.user_name = this.AddForm.value.user_name,
        req.password = '123';
      this.accountService.insert(req).subscribe(
        (res: any) => {
          if (res) {
            this.toastr.success('Success !');
            this.getListAccountByCompany();
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
    this.accountService.updateInfor({ active: false, isVIP: 0 }, id).subscribe(
      (res: any) => {
        if (res) {
          this.toastr.success('Success !');
          this.getListAccountByCompany();
        }
        else {
          this.toastr.success('Fail !');
        }
      }
    );
  }

  activeAccount(id: any) {
    this.accountService.updateInfor({ active: true }, id).subscribe(
      (res: any) => {
        if (res) {
          this.toastr.success('Success !');
          this.getListAccountByCompany();
        }
        else {
          this.toastr.success('Fail !');
        }
      }
    );
  }

  updateVIP(id: any) {
    this.accountService.updateInfor({ isVIP: 3 }, id).subscribe(
      (res: any) => {
        if (res.StatusCode == 200) {
          this.toastr.success('Success !');
          this.getListAccountByCompany();
        }
        else {
          this.toastr.success('Fail !');
        }
      }
    );
  }
}
