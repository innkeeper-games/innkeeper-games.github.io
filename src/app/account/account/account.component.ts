import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  
  displayName: string | undefined | null;
  serverIp: string | undefined | null;

  constructor() { }

  ngOnInit(): void {
    this.displayName = sessionStorage.getItem("display_name");
    this.serverIp = sessionStorage.getItem("server_ip");
  }

}
