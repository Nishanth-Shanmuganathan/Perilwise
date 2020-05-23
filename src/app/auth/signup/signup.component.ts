import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';

import { Auth } from './../../models/auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm: FormGroup;
  passwordMatch = false;

  helperStatus = 'pristine';
  helperServerError: String;
  helperPasswordVisible = false;
  helperConfirmPasswordVisible = false;

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      advertise: new FormControl(false)
    });
  }

  checkMatch() {
    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      this.signupForm.get('confirmPassword').setErrors({ invalid: true });
    }
  }

  onSubmit() {
    this.helperStatus = 'loading';
    const regCredentials: Auth = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmPassword
    }
    // console.log(regCredentials);
    this.authService.registerUser(regCredentials, this.signupForm.value.advertise)
      .subscribe(res => {
        this.helperStatus = 'pristine';
        // console.log(res);
        if (res.token) {
          this.route.navigate(['']);
        }
      }, err => {
        this.helperStatus = 'pristine';
        this.helperServerError = this.authService.errorHandler(err);
      });
  }

}
