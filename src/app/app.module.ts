import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CompanyCardComponent } from './company-card/company-card.component';
import { MessageComponent } from './message/message.component';
import { FooterComponent } from './footer/footer.component';
import { AboutformComponent } from './aboutform/aboutform.component';
import { FormComponent } from './aboutform/form/form.component';
import { Err404Component } from './err404/err404.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    CreateCompanyComponent,
    CompanyCardComponent,
    MessageComponent,
    FooterComponent,
    AboutformComponent,
    FormComponent,
    Err404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
