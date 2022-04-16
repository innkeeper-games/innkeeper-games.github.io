import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
  }

  onSubmit(g: NgForm) {
    let submission = {channel: "auth", type: "sign_up", username: g.value["username"], password: g.value["password"]};
    this.socketService.sendMessage(submission);
  }

}
