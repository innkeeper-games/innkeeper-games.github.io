import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  path: string;
  index: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    this.path = this.route.snapshot.paramMap.get("path") as string;
    this.index = this.route.snapshot.paramMap.get("index") as string;
    if (this.path == null) {
      this.path = "";
    }
    else {
      if (this.index == null) {
        this.index = "";
      }
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.path = this.route.snapshot.paramMap.get("path") as string;
      this.index = this.route.snapshot.paramMap.get("index") as string;

      if (this.path == null) {
        this.path = "";
      }
      else {
        if (this.index != null) {
          this.path += "/" + this.index;
        }
      }
    });

    window.addEventListener("message", (event) => {
      if (event.origin !== "https://blog.innkeepergames.com")
        return;
      this.onLoad(event.data.height, event.data.path);
    }, false);
  }

  ngOnInit(): void {
  }

  onLoad(height: number, path: string): void {
    let blog: HTMLIFrameElement = document.getElementById("blog") as HTMLIFrameElement;
    blog.height = height + "px";
    this.path = path;
    this.router.navigate(["/blog" + path]);
  }

}
