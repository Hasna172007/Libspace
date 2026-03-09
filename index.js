import express from "express";
import dotenv from "dotenv";
import connectDb from "./Config/db.js";
import userRouter from "./routes/user.route.js";
import bookRouter from "./routes/book.route.js";
dotenv.config();

const app = express();

app.use(express.json());

const PORT =  5000;

app.listen(5000, () => {
  connectDb();
  console.log(`Server running on port 5000`);
});

app.use("/api/authuser", userRouter);
app.use("/api/book", bookRouter);

app.get("/",(req,res) => {
  res.send('Libspace API is running');
});

app.post("/api/books", (req, res) => {
  const { title, author, price } = req.body;

  const book = {
    title,
    author,
    price,
  };

  res.json({
    message: "Book added successfully",
    book,
  });
});

app.get("/api/books/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    message: "Single book fetched",
    id: id
  });
});

app.get("/api/books", (req, res) => {
  res.json({
    message: "Books fetched successfully",
    books: [
      {
        title: "javascript basics",
        author: "john",
        price: 300
      }
    ]
  });
});

app.post("/api/books", async (req, res) => {
  const { title, author, price } = req.body;

  const newBook = new Book({
    title,
    author,
    price
  });

  const savedBook = await newBook.save();

  res.json({
    message: "Book added successfully",
    book: savedBook
  });
});

app.post("/api/books", async (req, res) => {
  try {
    const book = new Book(req.body);

    const savedBook = await book.save();

    res.json({
      message: "Book added successfully",
      book: savedBook
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});

