import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean;

  constructor(private snackbar: MatSnackBar,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.token ? true : false;

    this.authService.loggedIn.subscribe(data => {
      this.loggedIn = this.authService.token ? true : false;
    })
  }

  openSnackBar() {
    this.snackbar.open('Oops.. Functionality not yet added...', 'Dismiss', { duration: 2000 });
  }

  logout() {
    this.authService.logout();
  }
}
