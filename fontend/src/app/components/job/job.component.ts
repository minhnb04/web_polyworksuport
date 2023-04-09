import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent extends BaseComponent implements OnInit {

  genderSelect: any;
  isDisplayInfo: boolean = false;
  dataInfo: any;

  AddForm = new FormGroup({
    job_code: new FormControl(null),
    job_name: new FormControl(null),
    description: new FormControl(null),
    slot: new FormControl(null),
    status: new FormControl(null),
    start_date: new FormControl(null),
    end_date: new FormControl(null),
    image: new FormControl(null),
    salary_min: new FormControl(null),
    salary_max: new FormControl(null),
    candidate: new FormControl(null),
    technology: new FormControl(null),
    //
    work_form: new FormControl(null),
    work_place: new FormControl(null),
    experience: new FormControl(null),
    benefits: new FormControl(null),
    requirement: new FormControl(null),
  })

  ngOnInit(): void {
    this.getListJobByCompany(this.getInfo().company_code);
  }

  showConfirm(id: any): void {
    if (!this.getInfo().isVIP) {
      this.toastr.warning('You must upgrade your account to VIP for this future !');
    }
    else {
      this.modal.confirm({
        nzTitle: '<i>Do you Want to delete these items?</i>',
        // nzContent: '<b>Some descriptions</b>',
        nzOnOk: () => {
          this.jobService.delete(id).subscribe(
            (res: any) => {
              if (res) {
                this.toastr.success('Delete Success !');
                this.getListJobByCompany(this.getInfo().company_code);
              }
              else {
                this.toastr.warning('Delete Fail !');
                this.getListJobByCompany(this.getInfo().company_code);
              }
            }
          )
        }
      });
    }
  }

  showAddModal(title: any, dataEdit: any): void {
    if (!this.getInfo().isVIP) {
      this.toastr.warning('You must upgrade your account to VIP for this future !');
    }
    else {
      this.isDisplay = true;
      this.titleModal = title;
      this.selected_ID = null;
      this.genderSelect = dataEdit.gender;
      if (dataEdit) {
        this.selected_ID = dataEdit._id;
        this.AddForm.patchValue({
          job_code: !dataEdit ? '' : dataEdit.job_code,
          job_name: !dataEdit ? '' : dataEdit.job_name,
          description: !dataEdit ? '' : dataEdit.description,
          slot: !dataEdit ? '' : dataEdit.slot,
          status: !dataEdit ? '' : dataEdit.status,
          start_date: !dataEdit ? '' : dataEdit.start_date.substring(0, 10),
          end_date: !dataEdit ? '' : dataEdit.end_date.substring(0, 10),
          image: !dataEdit ? '' : dataEdit.image,
          salary_min: !dataEdit ? '' : dataEdit.salary_min,
          salary_max: !dataEdit ? '' : dataEdit.salary_max,
          candidate: !dataEdit ? '' : dataEdit.candidate,
          technology: !dataEdit ? '' : dataEdit.technology,
          work_form: !dataEdit ? '' : dataEdit.work_form,
          work_place: !dataEdit ? '' : dataEdit.work_place,
          experience: !dataEdit ? '' : dataEdit.experience,
          benefits: !dataEdit ? '' : dataEdit.benefits,
          requirement: !dataEdit ? '' : dataEdit.requirement,
        });
      }
      else {
        this.AddForm.reset();
      }
    }
  }

  showInfoModal(title: any, dataEdit: any): void {
    this.titleModal = title;
    this.isDisplayInfo = true;
    this.dataInfo = dataEdit;
  }

  handleOk(): void {
    var req: any = {
      job_code: this.AddForm.value.job_code,
      job_name: this.AddForm.value.job_name,
      description: this.AddForm.value.description,
      slot: this.AddForm.value.slot,
      status: this.AddForm.value.status,
      start_date: this.AddForm.value.start_date,
      end_date: this.AddForm.value.end_date,
      image: this.AddForm.value.image,
      salary_min: this.AddForm.value.salary_min,
      salary_max: this.AddForm.value.salary_max,
      candidate: this.AddForm.value.candidate,
      technology: this.AddForm.value.technology,
      work_form: this.AddForm.value.work_form,
      work_place: this.AddForm.value.work_place,
      experience: this.AddForm.value.experience,
      benefits: this.AddForm.value.benefits,
      requirement: this.AddForm.value.requirement,
      gender: this.genderSelect,
    }

    if (this.selected_ID) {
      req.updated_at = new Date();
      this.jobService.update(req, this.selected_ID).subscribe(
        (res: any) => {
          if (res) {
            this.toastr.success('Success !');
            this.getListJobByCompany(this.getInfo().company_code);
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
      this.jobService.insert(req).subscribe(
        (res: any) => {
          if (res) {
            this.toastr.success('Success !');
            this.getListJobByCompany(this.getInfo().company_code);
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
    this.isDisplayInfo = false;
  }
}
