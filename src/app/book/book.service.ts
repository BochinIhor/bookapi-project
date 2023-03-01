import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Book } from "./book";
import {forkJoin, Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class BookService {

  private serviceUrl = "http://localhost:8080/portfolio/api/book";
  constructor(private httpService: HttpClient) {  }

  getAllBooks(): Observable<Book[]>{
    return this.httpService.get<Book[]>(this.serviceUrl);
  }

  getRequestedBook(book: Book): Observable<Book>{
    return this.httpService.get<Book>(`${this.serviceUrl}/${book.id}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.httpService.post<Book>(this.serviceUrl, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.httpService.put<Book>(`${this.serviceUrl}/${book.id}`, book);
  }

  deleteBook(id: number): Observable<Book> {
    return this.httpService.delete<Book>(`${this.serviceUrl}/${id}`);
  }

  deleteBooks(books: Book[]): Observable<Book[]> {
    return forkJoin(
      books.map((book) =>
        this.httpService.delete<Book>(`${this.serviceUrl}/${book.id}`)
      )
    );
  }
}
