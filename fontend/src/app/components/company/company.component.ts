import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent extends BaseComponent implements OnInit {

  AddForm = new FormGroup({
    company_code: new FormControl(null, Validators.required),
    company_name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    logo: new FormControl(null, Validators.required),
  })

  ngOnInit(): void {
    this.getListCompany();
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.companyService.delete(id).subscribe(
          (res: any) => {
            if (res) {
              this.toastr.success('Delete Success !');
              this.getListCompany();
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListCompany();
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
        company_code: dataEdit.company_code ?? '',
        company_name: dataEdit.company_name ?? '',
        description: dataEdit.description ?? '',
        logo: dataEdit.logo ?? '',
      });
    }
    else {
      this.AddForm.reset();
    }
  }

  handleOk(): void {
    var req = {
      company_code: this.AddForm.value.company_code,
      company_name: this.AddForm.value.company_name,
      description: this.AddForm.value.description,
      logo: this.AddForm.value.logo,
      status: 1,
      note: '',
    }

    if (this.AddForm.valid) {
      if (this.selected_ID) {
        Object.assign(req, { updated_at: new Date() })
        this.companyService.update(req, this.selected_ID).subscribe(
          (res: any) => {
            if (res) {
              this.toastr.success('Success !');
              this.getListCompany();
            }
            else {
              this.toastr.success('Fail !');
            }
          }
        );
      }
      else {
        Object.assign(req, { created_at: new Date() })
        this.companyService.insert(req).subscribe(
          (res: any) => {
            if (res) {
              this.toastr.success('Success !');
              this.getListCompany();
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

  active(id: any) {
    this.companyService.update({ status: 2 }, id).subscribe(
      (res: any) => {
        if (res) {
          this.toastr.success('Success !');
          this.getListCompany();
        }
        else {
          this.toastr.success('Fail !');
        }
      }
    );
  }

  ban(id: any) {
    this.companyService.update({ status: 0 }, id).subscribe(
      (res: any) => {
        if (res) {
          this.toastr.success('Success !');
          this.getListCompany();
        }
        else {
          this.toastr.success('Fail !');
        }
      }
    );
  }
}


