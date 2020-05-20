import { Auth } from './../../models/auth.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  passwordMatch = false;

  helperPasswordVisible = false;
  helperConfirmPasswordVisible = false;

  constructor(private authService: AuthService) { }

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
    const regCredentials: Auth = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmPassword
    }
    console.log(regCredentials);
    this.authService.registerUser(regCredentials, this.signupForm.value.advertise)
      .subscribe(res => console.log(res), err => console.error(err));
  }

}
