import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authenticated: boolean = false;

  subscription: Subscription | undefined;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    if (!this.socketService.channelIsRegistered("auth")) {
      this.socketService.register("auth");
    }
    this.subscription = this.socketService.channelReply.get("auth")?.subscribe(
      (message: any) => {
        if (message["password_correct"] == true) {
          this.authenticated = true;
        }
      }
    );
    this.authenticated = this.socketService.isAuthenticated();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
