/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import VarObject from 'app/services/var.objects';

@Component({
    selector: 'app-signal-chat',
    templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit {
    public async: any;
    message = 'test message for you';
    messages: string[] = [];
    token = localStorage['token'];
    private _hubConnection: HubConnection | undefined;
    constructor(private _variables: VarObject) { }


    ngOnInit(): void {
        this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this._variables.baseUrl + '/signalr/chat', {
                accessTokenFactory: () => this.token,
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this._hubConnection.start().catch(err => console.error(err.toString()));

        this._hubConnection.on('connected', (data) => {
            console.table(data.dashboard);
        });

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

        postMessage(this._variables.baseUrl + '/api/test/messsage/close', { message: `Sent: ${this.message}` }).then((response) => {
            console.log(response);
        }, (response)=> {
            console.log(response);
        });
    }


}
