import { Component, OnInit, HostBinding } from '@angular/core';

import { routeFadeStateTrigger } from '../shared/animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [routeFadeStateTrigger]
})
export class AuthComponent implements OnInit {

  @HostBinding('@routeFadeState') routeAnimation = true;

  constructor() { }

  ngOnInit(): void {
  }

}
