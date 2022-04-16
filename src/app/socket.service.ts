import { Injectable, OnInit } from '@angular/core';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit {

  socket: WebSocketSubject<any> | undefined;

  replySources: Map<string, Subject<any>>;
  public channelReply: Map<string, Observable<any>>;

  httpClient: HttpClient;

  authenticated: boolean = false;
  unsentMessages: Array<any> = [];
  
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.replySources = new Map<string, Subject<any>>();
    this.channelReply = new Map<string, Observable<any>>();
    this.establishWebsocket();
  }

  ngOnInit(): void {
    window.onfocus = (event: FocusEvent) => {
      if (this.socket == undefined || this.socket.isStopped) document.location.reload();
    };
  }

  establishWebsocket() {
    this.httpClient.get('https://ws.joincowork.com', {responseType: 'text', withCredentials: true}).subscribe(data => {

      this.socket = webSocket('wss://ws.joincowork.com:4433');

      this.socket.subscribe(
        message => {
          if (message["password_correct"] == true) {
            this.authenticated = true;
            sessionStorage.setItem("username", message["username"]);
            sessionStorage.setItem("account_id", message["account_id"]);
            sessionStorage.setItem("display_name", message["display_name"]);
            sessionStorage.setItem("server_ip", message["server_ip"]);
          }
          else if (message["account_creation_success"] == true) {
            this.establishWebsocket();
          }

          let channel: string = message["channel"];
          if (this.channelIsRegistered(channel)) {
            this.replySources.get(channel)?.next(message);
          }
        },
        function(err) {console.log(err)},
        this.connectToMain.bind(this)
      );

      let newUnsentMessages: any[] = [];
      for (let message of this.unsentMessages) {
        if (message["channel"] == "auth" || message["channel"] == "public") this.sendMessage(message);
        else newUnsentMessages.push(message);
      }
      this.unsentMessages = newUnsentMessages;

      window.setInterval(() => {
        this.sendMessage({channel: "auth", type: "pong"});
      }, 3000);
    });
  }

  connectToMain(): void {
    this.socket = webSocket('wss://ws.joincowork.com:4434');

    this.socket.subscribe(
      message => {

        if (message["password_correct"] == true) {
          sessionStorage.setItem("username", message["username"]);
          sessionStorage.setItem("account_id", message["account_id"]);
          sessionStorage.setItem("display_name", message["display_name"]);
        }

        let channel: string = message["channel"];
        if (this.channelIsRegistered(channel)) {
          this.replySources.get(channel)?.next(message);
        }
      },
      // reconnect on error or completion
      function(err) {console.log(err)},
      function() {console.log("complete")},
    );

    while (this.unsentMessages.length > 0) {
      this.sendMessage(this.unsentMessages.pop());
    }
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
  
  sendMessage(message: any): void {
    if (this.socket === undefined || (!this.authenticated && message["channel"] != "auth" && message["channel"] != "public")) {
      this.unsentMessages.push(message);
    }
    else {
      this.socket.next(message);
    }
  }

  channelIsRegistered(channel: string) {
    return this.replySources.has(channel);
  }

  register(channel: string) {
    this.replySources.set(channel, new Subject<any>());
    this.channelReply.set(channel, (this.replySources.get(channel) ?? new Subject<any>()).asObservable());
  }
}
