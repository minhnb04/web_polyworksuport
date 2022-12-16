import { ResponseLogin } from '../models/outputModels/ResponseLogin';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

export class common {
  public LoginResult: ResponseLogin | undefined;
  public PortalResult: any;
  public cookieService: CookieService | undefined;
  public CheckLogin() {
    this.LoginResult = new ResponseLogin();
    this.LoginResult = this.getUserinfo();
    if (!this.LoginResult) {
      localStorage.removeItem('AccountInfo');
      this.router.navigate(['/login']);
    }
  }
  
  constructor(private router: Router) {}

  public getUserinfo() {
    this.LoginResult = JSON.parse(localStorage.getItem('AccountInfo') || '{}');
    return this.LoginResult;
  }

  login() {
    this.router.navigate(['/']);
  }
  logout() {
    localStorage.removeItem('AccountInfo');
    this.router.navigate(['/login']);
  }
}
