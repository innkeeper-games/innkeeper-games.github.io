import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { SocketService } from 'src/app/socket.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authenticated: boolean = false;
  needAccount: boolean = false;

  subscription: Subscription | undefined;

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {

    if (this.router.url == "/sign-in") {
      this.needAccount = false;
    }
    else if (this.router.url == "/sign-up") {
      this.needAccount = true;
    }
    else if (this.router.url == "/account" && !this.authenticated) {
      this.router.navigate(['/sign-up']);
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.router.url == "/sign-in") {
        this.needAccount = false;
      }
      else if (this.router.url == "/sign-up") {
        this.needAccount = true;
      }
      else if (this.router.url == "/account" && !this.authenticated) {
        this.router.navigate(['/sign-up']);
      }
    });

    if (!this.socketService.channelIsRegistered("auth")) {
      this.socketService.register("auth");
    }
    this.subscription = this.socketService.channelReply.get("auth")?.subscribe((message: any) => {
      if (message["password_correct"] == true) {
        this.authenticated = true;
        this.router.navigate(['/account']);
      }
      else if (message["password_correct"] == false) {
        this.authenticated = false;
        this.router.navigate(['/sign-up']);
      }
    });
    
    this.authenticated = this.socketService.isAuthenticated();
    if (this.authenticated) {
      this.authenticated = true;
      this.router.navigate(['/account']);
    }
    else {
      this.authenticated = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
