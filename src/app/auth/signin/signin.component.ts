import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth } from 'src/app/models/auth.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  helperPasswordVisible = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
    });
  }

  onSubmit() {
    const loginCredentials: Auth = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password,
    }
    console.log(loginCredentials);
    this.authService.loginUser(loginCredentials)
      .subscribe(res => console.log(res), err => console.error(err));
  }
}
