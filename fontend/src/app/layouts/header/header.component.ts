import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    public accountService: AccountService,
  ) { }
  accountInfor: any;
  isDisplayVIP: any = false;
  isVIPaccount: any;

  ngOnInit(): void {
    this.accountInfor = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo'))));
    this.isVIPaccount = this.accountInfor.isVIP;
    console.log(this.accountInfor);
  }

  logout() {
    localStorage.removeItem('UserInfo');
    this.toastr.success('Logout Successfully !');
  }

  handleOk(): void {
    this.accountService.updateInfor({isVIP: true}, this.accountInfor._id).subscribe(
      (res: any) => {
        if (res.StatusCode == 200) {
          this.toastr.success('Success !');
          this.isVIPaccount = true;
        }
        else {
          this.toastr.success('Fail !');
        }
      }
    );
    this.isDisplayVIP = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isDisplayVIP = false;
  }

  openVIP() {
    this.isDisplayVIP = true;
  }
}
