
import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Routes } from "./src/Routes/Routes.js";


const app = express();
const PORT = 8080;
const httpServer = createServer(app);
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


app.use("/api", Routes)

httpServer.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
  