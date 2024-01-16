"use client";
import { Form } from "@/app/components/form";
import { BookType } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditBook = () => {
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
      console.log(data.book);
      setBook(data.book);
    };
    fetchSingleBook();
  }, [id]);

  const handleEditBook = (updatedBook: BookType) => {
    console.log("Updated Book:", updatedBook);
  };

  return (
    <>
      <h2>
        <strong>Editing Book</strong>
      </h2>
      <Form
        onBookCreated={handleEditBook}
        endPointUrl={`http://localhost:3000/api/book/${id}`}
        initialValue={book}
        method={"PUT"}
        pageTo={`/books/${book.id}`}
      />
      <Link href={`/books/${book.id}`}>Show</Link>|
      <Link href="/books">Back</Link>
    </>
  );
};

export default EditBook;
