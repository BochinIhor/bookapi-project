package org.example.spring.service;

import org.example.spring.model.Book;

import java.util.List;

public interface BookService {
    //Save the record
    long save(Book book);

    //Get a single record
    Book get(long id);

    //Get all records
    List<Book> list();

    //Update the record
    void update(long id, Book book);

    //Delete a record
    void delete(long id);
}
