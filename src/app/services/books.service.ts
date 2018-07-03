import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable, BehaviorSubject} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private headers = new Headers({ 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': '*' });
  private options: RequestOptions;
  public newBooks: Array<any> = [];
  public books = <BehaviorSubject<any>>new BehaviorSubject([]);
  private fetchBooks: Array<any>;
  constructor(private http: Http, private snackBar: MatSnackBar) {
    this.options = new RequestOptions({ headers: this.headers });
  }

  getBooks(){
    this.serverRequest('/assets/books.json', 'get').subscribe((success) => {
      success = success.json();
      this.fetchBooks = success;
      this.books.next(this.fetchBooks);
    })
  }

  updateBoks(book) {
    const bookIndex = this.fetchBooks.findIndex((previousBooks) => book.id === previousBooks.id);
    if (bookIndex > -1) 
      this.fetchBooks[bookIndex] = book;
    this.books.next(this.fetchBooks);
    this.snackBar.open('Book has updated successfully.', 'Updated', {
      duration: 2000,
    });
  }

  deleteBook(book) {
    const bookIndex = this.fetchBooks.findIndex((previousBooks) => book.id === previousBooks.id);
    if (bookIndex > -1)
      this.fetchBooks.splice(bookIndex, 1);
    this.books.next(this.fetchBooks);
    this.snackBar.open('Book has deleted successfully.', 'Deleted', {
      duration: 2000,
    });
  }

  addBooks(book) {
    this.fetchBooks.push(book);
    this.books.next(this.fetchBooks);
    this.snackBar.open('Book has added successfully.', 'Added', {
      duration: 2000,
    });
  }


  getAuthors(): Observable<any> {
    return new Observable(observer => {
      this.serverRequest('/assets/authors.json', 'get').subscribe((success) => {
        success = success.json();
        observer.next(success);
      })
    });
  }

  private serverRequest(url: string, type: string, data?: any): Observable<any> {
    if (type === 'get')
      return this.http[type](window.location.origin + url, this.options)
        .pipe(
          tap(data => console.log(url, data)),
          catchError(this.handleError(url, []))
        );;
    if (type === 'post' || type === 'put')
      return this.http[type](window.location.origin + url, data, this.options)
        .pipe(
          tap(data => console.log(url, data)),
          catchError(this.handleError(url, []))
        );;
  }

  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return result;
    };
  }
}

