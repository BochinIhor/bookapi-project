import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BookComponent } from "./book/book.component";
import { HttpClientModule } from "@angular/common/http";
import { BookService } from "./book/book.service";
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSortModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
