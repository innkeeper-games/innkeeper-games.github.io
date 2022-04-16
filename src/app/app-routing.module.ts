import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account/account.component';
import { AuthComponent } from './account/auth/auth.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'blog/:path',
    component: BlogComponent
  },
  {
    path: 'blog/:path/:index',
    component: BlogComponent
  },
  {
    path: 'sign-in',
    component: AuthComponent
  },
  {
    path: 'sign-up',
    component: AuthComponent
  },
  {
    path: 'account',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
