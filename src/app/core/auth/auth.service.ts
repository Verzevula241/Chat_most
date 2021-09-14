import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import  VarObject  from 'app/services/var.objects';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _http: VarObject
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { login: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(this._http.baseUrl + this._http.token, credentials).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    // signInUsingToken(): Observable<any>
    // {
    //     // Renew token
    //     // return this._httpClient.post('api/auth/refresh-access-token', {
    //     //     accessToken: this.accessToken
    //     // }).pipe(
    //     //     catchError(() =>

    //     //         // Return false
    //     //         of(false)
    //     //     ),
    //     //     switchMap((response: any) => {

    //     //         // Store the access token in the local storage
    //     //         this.accessToken = response.accessToken;

    //     //         // Set the authenticated flag to true
    //     //         this._authenticated = true;

    //     //         // Store the user on the user service
    //     //         this._userService.user = response.user;

    //     //         // Return true
    //     //         return of(true);
    //     //     })
    //     // );
    //     return
    // }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        this.deleteCookie('.AspNetCore.Cookies');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }


    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    deleteCookie(name: any) {
        this.setCookie(name, '', {
          'max-age': -1
        });
      }


      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      setCookie(name: string | number | boolean, value: string | number | boolean, options: any = {}) {

        options = {
          path: '/',
          // при необходимости добавьте другие значения по умолчанию
          ...options
        };
        if (options.expires instanceof Date) {
          options.expires = options.expires.toUTCString();
        }
        let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        // eslint-disable-next-line guard-for-in
        for (const optionKey in options) {
          updatedCookie += '; ' + optionKey;
          const optionValue = options[optionKey];
          if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
          }
        }
        document.cookie = updatedCookie;
      }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        // return this.signInUsingToken();
        return of(true);
    }
}
