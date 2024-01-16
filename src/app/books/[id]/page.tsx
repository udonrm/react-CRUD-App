"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BookDetail = () => {
  const { id } = useParams();

  const [book, setBook] = useState({
    id: "",
    title: "",
    body: "",
  });

  useEffect(() => {
    const fetchSingleBook = async () => {
      const response = await fetch(`http://localhost:3000/api/book/${id}`);
      const data = await response.json();
      setBook(data.book);
    };
    fetchSingleBook();
  }, [id]);

  return (
    <>
      <div key={book.id}>
        <p>
          <strong>Title: </strong>
          {book.title}
        </p>
        <p>
          <strong>Body: </strong>
          {book.body}
        </p>
      </div>
      <Link href={`${book.id}/edit`}>Edit</Link>|<Link href="/">Back</Link>
    </>
  );
};

export default BookDetail;
