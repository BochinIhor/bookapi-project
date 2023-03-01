package org.example.spring.dao;

import org.example.spring.model.Book;

import java.util.List;

public interface BookDAO {
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
