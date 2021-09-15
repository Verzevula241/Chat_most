/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AllObjects, UsersElement } from 'app/interface/all.interface';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
  }),
};

@Injectable({providedIn: 'root'})
export class HttpService2 {
  heroesUrl = 'api/heroes';  // URL to web api
  admin: string = '/admin';
  account: string = '/account';
  baseUrl: string = 'https://dev.mb-spb.com';
  apiv1: string = '/api/v1';
  token: string = '/api/v1/account/token';
  cookie: string = '/api/v1/account/login';
  logout: string = '/api/v1/account/logout';
  contractor: string = '/contractor';
  statistic: string = '/statistic';
  building: string = '/builderobject';
  user: string = '/user';
  users: string = '/users';
  settings: string = '/settings';
  chat: string = '/chat';
  message: string = '/message';

  constructor(
    private http: HttpClient) {
  }

  //////// Get methods //////////

  /** GET Users from the server */
  getAll(): Observable<any> {
    return this.http.get<AllObjects>(this.baseUrl + this.apiv1 + this.admin + '/all')
      .pipe(
        tap((data) => {
          console.warn(data);
        }),
        catchError((error) => {
            console.log('Caught in CatchError. Returning 0');
            return of(0);
          } )
          );
  }
  getCurrentUser(): Observable<any> {
    return this.http.get<AllObjects>(this.baseUrl + this.apiv1 + this.account + '/me')
      .pipe(
        tap((data) => {
          console.warn(data);
        }),
        catchError((error) => {
            console.log('Caught in CatchError. Returning 0');
            return of(0);
          } )
          );
  }

  logOut(): Observable<any>{
    const url = this.baseUrl + this.logout;
    return this.http.get<any>(url).pipe(catchError((error) => {
        console.log('Caught in CatchError. Returning 0');
        return of(0);
      } ));
  };

}
