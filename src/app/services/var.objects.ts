import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export default class VarObject {

    heroesUrl = 'api/heroes';
    admin: string = '/admin';
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

    constructor() {
    }

}
