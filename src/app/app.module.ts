import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';

import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';

// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    // ConfirmDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
