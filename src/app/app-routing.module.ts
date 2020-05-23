import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AboutformComponent } from './aboutform/aboutform.component';
import { Err404Component } from './err404/err404.component';

import { AuthGuard } from './services/auth.guard';
import { logginGuard } from './services/loggin.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'auth', component: AuthComponent, children: [
      { path: '', component: SigninComponent, },
      { path: 'register', component: SignupComponent },
    ]
  },
  { path: 'form/:id', component: AboutformComponent },
  { path: '**', component: Err404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
