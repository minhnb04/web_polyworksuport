import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {  
  constructor(@Inject(AppConfig) private readonly appConfig: AppConfiguration,private router: Router,private http : HttpClient) {}

  getList(): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + 'api/account')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  insert(account: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/account', account)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  register(account: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/account/register', account)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  updateInfor(account: any, id: any): Observable<any> {
    return this.http
      .put<any>(this.appConfig.API + 'api/account/'+id, account)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  delete(id: any): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.API + 'api/account/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
}
