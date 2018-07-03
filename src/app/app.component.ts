import { Component, Inject} from '@angular/core';
import { BooksService } from './services/books.service';
import { Observable, } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddUpdateBookComponent } from './component/add-update-book/add-update-book.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'app';
  books: Observable<any>;
  constructor(private bookService: BooksService, private dialog: MatDialog) { }
  ngOnInit() {
    this.books = this.bookService.books;
    this.bookService.getBooks();
  }

  addUpdateBook(book?) {
    this.dialog.open(AddUpdateBookComponent, {
      width: '350px',
      data: { book: book, books: this.books}
    });
  }

  deleteBook(book) {
    this.bookService.deleteBook(book);
  }
  
}



