import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule,MatSnackBarModule, MatListModule,MatIconModule, MatLineModule, MatToolbarModule, MatDialogModule, MatSelectModule, MatExpansionModule } from '@angular/material';
import { HttpModule } from "@angular/http";
import { BooksService } from './services/books.service';
import { AddUpdateBookComponent } from './component/add-update-book/add-update-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    AddUpdateBookComponent
  ],
 
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    MatLineModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule
  ],
   entryComponents: [
    AddUpdateBookComponent
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
