import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Perilwise';
  loggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getToken();
    this.authService.loggedIn.subscribe(data => {
      this.loggedIn = this.authService.token ? true : false;
    })
  }
}
