"use client";
import { BookType } from "@/types";
import Link from "next/link";
import { Form } from "../components/form";
import { useEffect, useState } from "react";

const deleteBook = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/book/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json;
};

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

  const addNewBook = async (newBook: BookType) => {
    await setBooks((currentBooks) => [...currentBooks, newBook]);
  };

  const handleDelete = async (id: number) => {
    await deleteBook(id);
    //削除されたIDと異なるIDを持つ本のみを新しい配列に格納する
    const newBooks = books.filter((book) => book.id !== id);
    setBooks(newBooks);
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
                <Link href={`books/${book.id}`}>Show</Link>
              </td>
              <td>
                <Link href={`books/${book.id}/edit`}>Edit</Link>
              </td>
              <td>
                <Link href="" onClick={() => handleDelete(book.id)}>
                  Destroy
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>New Book</h1>
      <Form
        onBookCreated={addNewBook}
        endPointUrl={`http://localhost:3000/api/book`}
        method={"POST"}
        pageTo={""}
      />
    </>
  );
};

export default BooksIndex;
