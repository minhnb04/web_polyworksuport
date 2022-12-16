import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleService {  
  constructor(@Inject(AppConfig) private readonly appConfig: AppConfiguration,private router: Router,private http : HttpClient) {}

  getList(): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + 'api/role')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  insert(role: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + 'api/role', role)
      .pipe(
        map((z) => {
          return z;
        })
    );
  }

  update(role: any, id: any): Observable<any> {
    return this.http
      .put<any>(this.appConfig.API + 'api/role/' + id, role)
      .pipe(
        map((z) => {
          return z;
        })
    );
  }

  delete(id: any): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.API + 'api/role/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
}
