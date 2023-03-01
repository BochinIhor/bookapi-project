import { Component, OnInit, ViewChild } from '@angular/core';
import {BookService} from "./book.service";
import {Book, BookColumns} from "./book";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit{
  displayedColumns: string[] = BookColumns.map((col) => col.key);
  columnsSchema: any = BookColumns;
  myDataSource = new MatTableDataSource<Book>();
  valid: any = {};
  books: Book[];
  book = new Book();
  constructor(private bookService: BookService) {  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getAllBooks()
      .subscribe(bookData => {
        this.myDataSource.data = bookData;
        this.sortBooks();
      });
  }

  sortBooks(): void {
    this.myDataSource.sort = this.sort;
  }

  addBook(): void {
    const newBook: Book = {
      id: null,
      title: '',
      author: '',
      isEdit: true,
      isSelected: false,
    }
    this.bookService.addBook(newBook);
    this.bookService.getRequestedBook(newBook)
      .subscribe(response => {
        newBook.id = response.id
      })
    this.myDataSource.data = [...this.myDataSource.data, newBook];
    this.sortBooks();
  }

  editBook(book: Book) {
    if (book.id === 0) {
      book.id = null;
      this.bookService.addBook(book).subscribe(() => book.isEdit = false)
    } else {
      this.bookService.updateBook(book).subscribe(() => book.isEdit = false)
    }
  }

  deleteBook(row_id: number): void {
    this.bookService.deleteBook(row_id);
    this.myDataSource.data = this.myDataSource.data.filter((book: Book) => book.id !== row_id);
  }

  removeSelectedBooks() {
    const books = this.myDataSource.data.filter((b: Book) => b.isSelected);
    this.bookService.deleteBooks(books);
    this.myDataSource.data = this.myDataSource.data.filter((b: Book) => !b.isSelected);
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }

  isAllSelected() {
    return this.myDataSource.data.every((item) => item.isSelected)
  }

  isAnySelected() {
    return this.myDataSource.data.some((item) => item.isSelected)
  }

  selectAll(event: any) {
    this.myDataSource.data = this.myDataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }

}
