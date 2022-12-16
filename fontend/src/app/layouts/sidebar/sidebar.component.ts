import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccService } from 'src/app/services/acc.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  accountInfor: any;
  isDisplay: boolean = false;
  titleModal: any;
  emailUpdate: any;
  oldPassword: any;
  newPassword: any;
  confirmPassword: any;

  constructor(
    private toastr: ToastrService,
    private Acc: AccService
  ) { }

  ngOnInit(): void {
    this.accountInfor = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo'))));
    this.emailUpdate = '';
  }

  showInfoModal(): void {
    this.isDisplay = true;
    this.titleModal = "Information";
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isDisplay = false;
  }

  handleOk(): any {
    var req = {
      user_name: this.emailUpdate,
      password: this.oldPassword,
     }
    if (!this.oldPassword && !this.confirmPassword) {
      this.toastr.warning('You must input full blank !');
      return false;
    } 
    else if (this.newPassword != this.confirmPassword) {
      this.toastr.warning('Confirm password not correctly !');
      return false;
    }
    this.Acc.login(req).subscribe((z) => {
      console.log(req);
      if (z.StatusCode == 200) {
        var req2 = {
          user_name: this.emailUpdate,
          password: this.newPassword,
        }
        this.Acc.updatePassword(req2).subscribe((res) => {
          if (res) {
            this.toastr.success('Update info successfully !');
          }
          else {
            this.toastr.success('Update info failed !');
          }
        });
      }
      else {
        this.toastr.warning('User name or password not correctly !');
      }
    });
    this.isDisplay = false;
  }
}
