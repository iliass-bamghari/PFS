import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_BASE_URL from "./config";
import backgroundImage from "./back.jpg"; // Replace with your image file path

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/books`);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", margin: 0, padding: 0 }}>
      <h1>PFS book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            <img src={book.cover} alt="" />
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>${book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;
