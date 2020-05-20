import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})
export class CompanyCardComponent implements OnInit {

  constructor(private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar() {
    this.snackbar.open('Oops.. Functionality not yet added...', 'Dismiss', { duration: 2000 });
  }
}
