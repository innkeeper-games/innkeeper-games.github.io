import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SafePipeModule } from 'safe-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account/account.component';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './account/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogComponent,
    HomeComponent,
    HeaderComponent,
    AccountComponent,
    SignInComponent,
    SignUpComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SafePipeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
