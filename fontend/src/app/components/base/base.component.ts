import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { Renderer2 } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RoleService } from 'src/app/services/role.service';
import { AccountService } from 'src/app/services/account.service';
import { JobService } from 'src/app/services/job.service';
import { DocumentCVService } from 'src/app/services/document-cv.service';
import { UserJobService } from 'src/app/services/userJob.service';
// import { ExcelServices } from 'src/app/services/excel.service';

const formatDate = (date: string | number | Date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 2),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

const removeSpaces = (control: AbstractControl) => {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})

export class BaseComponent {

  Data: any;
  selected_ID: any;
  searchString: any;
  UserID_get: any;
  UserName_get: any;
  checkInsert: boolean = false;
  titleModal: any;
  submitted: boolean = false;
  numberPage: any;
  page: any = 1;
  isDisplay: boolean = false;
  isDisplayImage: boolean = false;
  isDisplayDetail: boolean = false;
  isDisplayColor: boolean = false;
  listUserJob: any;

  constructor(
    public titleService: Title,
    public spinner: NgxSpinnerService,
    public router: Router,
    public fromBuilder: FormBuilder,
    public toastr: ToastrService,
    public appService: AppService,
    public renderer: Renderer2,
    public modal: NzModalService,
    public roleService: RoleService,
    public accountService: AccountService,
    public jobService: JobService,
    public documentCVService: DocumentCVService,
    public userJobService: UserJobService,
    // public excelService: ExcelServices
  ) { }

  listRole: any = [];
  listAccount: any = [];
  listJob: any = [];
  listDocumentCV: any = [];
  company_code: any;

  getInfo() {
    var infoUser = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo'))));
    return infoUser;
  }

  genRandonString(length: any) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    var charLength = chars.length;
    var result = '';
    for (var i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result.toString() ?? '';
  }

  getListRole = () => {
    this.roleService.getList().subscribe(
      (res: any) => {
        this.listRole = res.Data;
      }
    )
  };

  getListAccount = () => {
    this.accountService.getList().subscribe(
      (res: any) => {
        this.listAccount = res.Data;
      }
    )
  };

  getListDocumentCV = () => {
    this.documentCVService.getList().subscribe(
      (res: any) => {
        this.listDocumentCV = res.Data;
      }
    )
  };

  getListJob = () => {
    this.jobService.getList().subscribe(
      (res: any) => {
        this.listJob = res.Data;
      }
    )
  };

  getListJobByCompany = (company_code: any) => {
    if (company_code?.length > 0) {
      this.jobService.getListByCompany(company_code).subscribe(
        (res: any) => {
          this.listJob = res.Data;
        }
      )
    }
    else {
      this.getListJob();
    }
  };

  getListUserJobByCompany = (company_code: any) => {
    if (company_code?.length > 0) {
      this.userJobService.getListByCompany(company_code).subscribe(
        (res: any) => {
          this.listUserJob = res.Data;
        }
      )
    }
    else {
      this.getListUserJob();
    }
  };

  getListUserJob = () => {
    this.userJobService.getList().subscribe(
      (res: any) => {
        this.listUserJob = res.Data;
      }
    )
  }

  remove_sign = (str: string) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ|ị/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)
    return str;
  }
}
