import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-user-job',
  templateUrl: './user-job.component.html',
  styleUrls: ['./user-job.component.scss']
})
export class UserJobComponent extends BaseComponent implements OnInit {

  ngOnInit(): void {
    this.getListUserJobByCompany(this.getInfo().company_code);
  }

  showConfirm(id: any): void {
    if (this.getInfo().isVIP != 3) {
      this.toastr.warning('You must upgrade your account to VIP for this future !');
    }
    else {
      this.modal.confirm({
        nzTitle: '<i>Do you Want to delete these items?</i>',
        // nzContent: '<b>Some descriptions</b>',
        nzOnOk: () => {
          this.userJobService.delete(id).subscribe(
            (res: any) => {
              if (res) {
                this.toastr.success('Delete Success !');
                this.getListUserJobByCompany(this.getInfo().company_code);
              }
              else {
                this.toastr.warning('Delete Fail !');
                this.getListUserJobByCompany(this.getInfo().company_code);
              }
            }
          )
        }
      });
    }
  }

  deniedCV(id: any, job: any, status: any) {
    if (this.getInfo().isVIP != 3) {
      this.toastr.warning('You must upgrade your account to VIP for this future !');
    }
    else {
      if (status != 1) {
        this.toastr.warning('This CV was denied');
      }
      else {
        this.userJobService.update({ status: 2, updated_at: new Date() }, id).subscribe(
          (res: any) => {
            if (res) {
              this.jobService.update({ slot: parseInt(job.slot) + 1, updated_at: new Date() }, job._id).subscribe(
                (res) => {
                  if (res) {
                    this.toastr.success('Success !');
                    this.getListUserJobByCompany(this.getInfo().company_code);
                  }
                  else {
                    this.toastr.warning('Fail !');
                  }
                }
              );
            }
            else {
              this.toastr.warning('Fail !');
            }
          }
        );
      }
    }
  }

  activeCV(id: any, job: any, status: any) {
    if (this.getInfo().isVIP != 3) {
      this.toastr.warning('You must upgrade your account to VIP for this future !');
    }
    else {
      if (parseInt(job.slot) - 1 < 0) {
        this.toastr.warning('Slot of this job is 0, was out of range');
      }
      if (status == 1) {
        this.toastr.warning('This CV was acepted');
      }
      else {
        this.userJobService.update({ status: 1, updated_at: new Date(), }, id).subscribe(
          (res: any) => {
            if (res) {
              this.jobService.update({ slot: parseInt(job.slot) - 1, updated_at: new Date() }, job._id).subscribe(
                (res) => {
                  if (res) {
                    this.toastr.success('Success !');
                    this.getListUserJobByCompany(this.getInfo().company_code);
                  }
                  else {
                    this.toastr.warning('Fail !');
                  }
                }
              );
            }
            else {
              this.toastr.warning('Fail !');
            }
          }
        );
      }
    }
  }
}
