import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(@Inject(AppConfig) private readonly appConfig: AppConfiguration, private router: Router, private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + 'api/job')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  insert(job: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/job', job)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  update(job: any, id: any): Observable<any> {
    return this.http
      .put<any>(this.appConfig.API + 'api/job/' + id, job)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  delete(id: any): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.API + 'api/job/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getListByCompany(company_code: any): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + 'api/job/getByCompany/' + company_code)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
}
