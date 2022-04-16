import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    let submission = {channel: "auth", type: "sign_in", username: f.value["username"], password: f.value["password"]};
    this.socketService.sendMessage(submission);
  }

}
