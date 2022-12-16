import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { common } from '../commons/app.common';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  
  public com: common | undefined;

  constructor(private router: Router) {}

  login() {    
    this.com = new common(this.router);
    var jsonInfo = this.com.getUserinfo();
    if (jsonInfo != undefined) {
      this.router.navigate(['/admin']);
    }
  }

  logout() {
    localStorage.removeItem('UserInfo');
    this.router.navigate(['/login']);
  }
}

