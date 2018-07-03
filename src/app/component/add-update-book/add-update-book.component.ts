import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from '../../services/books.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-add-update-book',
  templateUrl: './add-update-book.component.html',
  styleUrls: ['./add-update-book.component.css']
})
export class AddUpdateBookComponent implements OnInit {
  authors: Observable<any>;
  bookForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddUpdateBookComponent>, public formBuilder: FormBuilder, private bookServie: BooksService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.bookForm = formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      ISBN: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.authors = this.bookServie.getAuthors();
    if (this.data.book) {
      this.bookForm.patchValue(this.data.book);
      console.log(this.bookForm.value)
    }

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewBook() {
    if (this.data.book) {
      this.bookServie.updateBoks(Object.assign({}, {
        publishingDate: new Date().toString(),
        id: this.data.book.id,
        publisher: this.data.book.publisher,
        edition: this.data.book.edition,
        chapters: this.data.book.chapters
      }, this.bookForm.value))
    } else {
      this.bookServie.addBooks(Object.assign({}, {
        publishingDate: new Date().toString(),
        id: new Date().getTime(),
        publisher: "Me",
        edition: "First",
        chapters: []
      }, this.bookForm.value))
    }
    this.dialogRef.close();
    console.log(this.bookForm.value)
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }
}