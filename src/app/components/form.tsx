"use client";
import React, { useState } from "react";

export const Form = ({ onBookCreated }) => {
  const [value, setValue] = useState({
    title: "",
    body: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      const data = await response.json();
      if (response.ok) {
        onBookCreated(data.book);
      }
      console.log("Success:", data.book);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm();
    setValue({
      title: "",
      body: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={value.title}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="body"
          placeholder="body"
          value={value.body}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">submit</button>
      </form>
    </>
  );
};
