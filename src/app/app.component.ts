import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'innkeeper-games.github.io';
  constructor() {
    document.domain = "innkeepergames.com";
    console.log(document.domain);
  }
}
