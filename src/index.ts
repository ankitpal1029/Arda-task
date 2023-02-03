import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Wasaaa");
});

app.listen(port, () => {
  console.log(`[server]: server is runing at http://localhost:${port}`);
});
