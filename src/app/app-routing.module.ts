import { Err404Component } from './err404/err404.component';
import { FormComponent } from './aboutform/form/form.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth', component: AuthComponent, children: [
      { path: '', component: SigninComponent, },
      { path: 'register', component: SignupComponent },
    ]
  },
  { path: 'form/:id', component: FormComponent },
  { path: '**', component: Err404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
