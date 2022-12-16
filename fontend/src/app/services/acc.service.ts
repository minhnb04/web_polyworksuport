import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccService {  
  constructor(@Inject(AppConfig) private readonly appConfig: AppConfiguration,private router: Router,private http : HttpClient) {}

  login(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/account/login',req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  updatePassword(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/account/updateInfo',req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
}
