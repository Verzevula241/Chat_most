/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';

@Component({
    selector: 'app-signal-chat',
    templateUrl: 'chat.component.html'
})
export class SignalChatComponent implements OnInit {
    public async: any;
    private baseUrl = 'http://ng-test.dmsoft.ru';
    message = 'test message for you';
    messages: string[] = [];

    private _hubConnection: HubConnection | undefined;
    constructor() { }


    ngOnInit(): void {
        const token = localStorage['token'];
        this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.baseUrl + '/signalr/close', {
                accessTokenFactory: () => token,
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this._hubConnection.start().catch(err => console.error(err.toString()));

        this._hubConnection.on('message', (data)=> {
            console.log('open hub message:');
            console.log(data);
        });


        this._hubConnection.on('started', (data)=> {
            console.log(data);
        });
    }

    public sendMessage(): void {
        const postMessage = async (url = '', data = {})=>  fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

        postMessage(this.baseUrl + '/api/test/messsage/close', { message: `Sent: ${this.message}` }).then((response) => {
            console.log(response);
        }, (response)=> {
            console.log(response);
        });
    }


}
