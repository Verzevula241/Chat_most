import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { HttpService2 } from 'app/services/http.service';
import { UsersElement } from 'app/interface/all.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<UsersElement> = new ReplaySubject<UsersElement>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private _http: HttpService2)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: UsersElement)
    {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<UsersElement>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<UsersElement>
    {
        // return this._httpClient.get<User>('api/common/user').pipe(
        //     tap((user) => {
        //         this._user.next(user);
        //     })
        // );

        return this._http.getCurrentUser().pipe(
                 tap((data) => {
                     console.log(data);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<UsersElement>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
