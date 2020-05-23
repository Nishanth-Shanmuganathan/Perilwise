import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './../../services/auth.service';

import { Auth } from 'src/app/models/auth.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  signinForm: FormGroup;

  helperStatus = 'pristine';
  helperPasswordVisible = false;
  helperServerError: string;

  constructor(private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
    });
  }

  onSubmit() {
    this.helperStatus = 'loading';
    if (this.signinForm.invalid) {
      return;
    }
    const loginCredentials: Auth = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password,
    }
    this.authService.loginUser(loginCredentials)
      .subscribe(res => {
        this.helperStatus = 'pristine';
        if (res.token) {
          this.route.navigate(['']);
        }
      }, err => {
        this.helperStatus = 'pristine';
        this.helperServerError = this.authService.errorHandler(err);
      });
  }
}
