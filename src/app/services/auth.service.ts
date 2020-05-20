import { Auth } from './../models/auth.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: HttpClient) { }

  public registerUser(auth: Auth, advertise: boolean) {
    const authDetails = { ...auth, advertise };
    return this.http.post('http://localhost:3200/auth/register', authDetails);
  }
  public loginUser(auth: Auth) {
    return this.http.post('http://localhost:3200/auth/login', auth);
  }
}
