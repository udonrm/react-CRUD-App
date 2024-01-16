"use client";
import { BookType } from "@/types";
import Link from "next/link";
import { Form } from "../components/form";
import { useEffect, useState } from "react";

const BooksIndex = () => {
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      const res = await fetch(`http://localhost:3000/api/book`, {
        cache: "no-store",
      });

      const data = await res.json();
      setBooks(data.books);
    };
    fetchAllBooks();
  }, []);

  useEffect(() => {
    console.log(books);
  }, [books]);

  const addNewBook = async (newBook: BookType) => {
    await setBooks((currentBooks) => [...currentBooks, newBook]);
  };

  return (
    <>
      <h1>Books</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book: BookType) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.body}</td>
              <td>
                <Link href="">Show</Link>
              </td>
              <td>
                <Link href="">Edit</Link>
              </td>
              <td>
                <Link href="">Destroy</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>New Book</h1>
      <Form onBookCreated={addNewBook} />
    </>
  );
};

export default BooksIndex;
