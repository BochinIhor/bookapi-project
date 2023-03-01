import { Component, OnInit, ViewChild } from '@angular/core';
import {BookService} from "./book.service";
import {Book, BookColumns} from "./book";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit{
  displayedColumns: string[] = BookColumns.map((col) => col.key);
  columnsSchema: any = BookColumns;
  dataSource = new MatTableDataSource<Book>();
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
        this.dataSource.data = bookData;
        //this.dataSource.sort = this.sort;
        this.sortBooks();
      });
  }

  sortBooks(): void {
    this.dataSource.sort = this.sort;
  }

  addBook(): void {
    const newBook: Book = {
      id: 0,
      title: '',
      author: '',
      isEdit: true,
      isSelected: false,
    }
    this.dataSource.data = [newBook, ...this.dataSource.data];
  }

  editBook(book: Book) {
    if (book.id === 0) {
      book.id = null;
      this.bookService.addBook(book).subscribe(() => book.isEdit = false)
    } else {
      this.bookService.updateBook(book).subscribe(() => book.isEdit = false)
    }
  }

  deleteBook(Id: number): void {
    this.bookService.deleteBook(Id)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(
          (book: Book) => book.id !== Id,
        )
      })
  }

  removeSelectedBooks() {
    const books = this.dataSource.data.filter((b: Book) => b.isSelected)
          this.bookService.deleteBooks(books).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (b: Book) => !b.isSelected,
            )
          })
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
    return this.dataSource.data.every((item) => item.isSelected)
  }

  isAnySelected() {
    return this.dataSource.data.some((item) => item.isSelected)
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }

}
