import { Component, OnInit, OnDestroy, Renderer2, NgModule } from '@angular/core';
import { AccService } from 'src/app/services/acc.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/services/app.service';
import { RequestLogin } from 'src/app/models/inputModels/RequestLogin';
import { ResponseLogin } from 'src/app/models/outputModels/ResponseLogin';
import { AccountService } from 'src/app/services/account.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  requestLogin = new RequestLogin();
  isDisplay: boolean = false;
  genderSelect: any;
  companySelect: any;
  listCompany: any;

  AddForm = new FormGroup({
    full_name: new FormControl(null),
    email: new FormControl(null),
    user_name: new FormControl(null),
    dob: new FormControl(null),
    address: new FormControl(null),
    password: new FormControl(null),
  })

  LoginForm = new FormGroup({
    UserName: new FormControl(null, Validators.required),
    Password: new FormControl(null, Validators.required),
  });

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private AppService: AppService,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService,
    private AccService: AccService,
    public accountService: AccountService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'login-page');
    this.cookieService.deleteAll;
    this.getCompany();
  }

  getCompany() {
    this.companyService.getList().subscribe(
      (res: any) => {
        this.listCompany = res.Data;
      }
    );
  }

  Ridrect() {
    this.AppService.login();
  }

  logIn() {
    if (this.LoginForm.valid) {
      this.requestLogin.UserName = this.LoginForm.value.UserName;
      this.requestLogin.Password = this.LoginForm.value.Password;
      let req = {
        user_name: this.requestLogin.UserName,
        password: this.requestLogin.Password,
      };
      this.AccService.login(req).subscribe((z) => {
        if (z.StatusCode == 200) {
          localStorage.setItem('UserInfo', JSON.stringify(z.Data.UserInfo));
          if (!z.Data?.Role == null) {
            this.toastr.warning('You are not have permission !');
          }
          else {
            if (z.Data.Role?.role_code == '001') {
              this.AppService.login();
              this.toastr.success('Login successfully !');
            }

            if (z.Data.Role?.role_code == 'STAFF') {
              this.AppService.loginForStaffPortal();
              this.toastr.success('Login successfully !');
            }
            else {
              this.toastr.warning('You are not have permission !');
            }
          }

        } else {
          this.toastr.warning('Login Failed !');
          localStorage.removeItem('UserInfo');
        }
      });
    } else {
      this.toastr.error('Fill all blank Input', 'Failed !');
      this.spinner.hide();
    }
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-page');
  }

  registerUser() {
    this.isDisplay = true;
    this.AddForm.reset();
  }

  handleOk(): void {
    var req: any = {
      full_name: this.AddForm.value.full_name,
      user_name: this.AddForm.value.user_name,
      email: this.AddForm.value.email,
      password: this.AddForm.value.password,
      dob: this.AddForm.value.dob,
      address: this.AddForm.value.address,
      gender: this.genderSelect,
      admin: false,
      active: true,
      role_code: 'STAFF',
      company_code: this.companySelect,
      isVIP: false
    }
    req.created_at = new Date();
    this.accountService.register(req).subscribe(
      (res: any) => {
        if (res.StatusCode == 200) {
          this.toastr.success('Success !');
        }
        else {
          this.toastr.warning(res.Message);
        }
      }
    );
    this.isDisplay = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isDisplay = false;
  }
}
