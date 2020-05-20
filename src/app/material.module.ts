import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout'

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatCardModule,
    MatSnackBarModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatCardModule,
    MatSnackBarModule
  ]
})

export class MaterialModule { }
