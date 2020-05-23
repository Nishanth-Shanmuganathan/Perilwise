import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Auth } from './../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  admin: boolean;
  loggedIn = new Subject<[string, boolean]>()

  constructor(
    public http: HttpClient,
    private router: Router
  ) { }

  public registerUser(auth: Auth, advertise: boolean) {
    const authDetails = { ...auth, advertise };
    return this.http.post<{ token: string, admin: boolean }>('http://localhost:3200/auth/register', authDetails)
      .pipe(tap(res => {
        this.token = res.token;
        this.admin = res.admin;
        localStorage.setItem('token', this.token);
        localStorage.setItem('admin', this.admin.toString());
      }));
  }

  public loginUser(auth: Auth) {
    return this.http.post<{ token: string, admin: boolean }>('http://localhost:3200/auth/login', auth)
      .pipe(tap(res => {
        this.token = res.token;
        this.admin = res.admin;
        localStorage.setItem('token', this.token);
        localStorage.setItem('admin', this.admin.toString());
        this.loggedIn.next([this.token, this.admin]);

      }));
  }

  public getToken() {
    this.token = localStorage.getItem('token');
    this.admin = localStorage.getItem('admin') === 'true' ? true : false;
    this.loggedIn.next([this.token, this.admin]);
  }

  public logout() {
    this.admin = null;
    this.token = null;
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    this.loggedIn.next([this.token, this.admin]);
    if (!this.admin && !this.token) {
      this.router.navigate(['/auth']);
    }
  }

  public errorHandler(err) {
    if (err.error.message === 'AUTHENTICATION_DENIED') {
      return 'Email Id or Password incorrect...';
    } else if (err.error.message === 'PASSWORD_MISMATCH') {
      return 'Passwords mismatch...';
    } else if (err.error.message === 'EMAIL_ALREADY_EXISTS') {
      return 'Email Id already exists...';
    } else if (err.error.message === 'ERROR_IN_FETCHING_DATA') {
      return 'Error loading resource..';
    } else if (err.status === 500) {
      return 'Oops..Something wrong with servers...';
    } else {
      return 'An unknown error occurred...'
    }

  }
}
