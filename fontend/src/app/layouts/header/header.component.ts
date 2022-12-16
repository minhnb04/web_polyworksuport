import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private toastr: ToastrService
  ) { }
  accountInfor: any;


  ngOnInit(): void {
    this.accountInfor = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo'))));
    console.log(this.accountInfor);
  }

  logout() {
    localStorage.removeItem('UserInfo');
    this.toastr.success('Logout Successfully !');
  }
}
