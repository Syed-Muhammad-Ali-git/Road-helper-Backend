// Note: Main server file...!

// Importing libs...!
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import conectMongoDB from "./src/utils/db.js";
import userRoutes from "./src/routes/user-routes.js";
import { Server } from "socket.io";
import http from "http";


// Environment variables config...!
config({
  path: "./.env",
  debug: true
});

// Note: Use the centralized DB helper to connect to MongoDB

// Global variables...!
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
// Middlewares...!
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/user", userRoutes);

const io = new Server(server, { cors: "*" });

// Connect to DB, then start the server
conectMongoDB()

io.on("connection", (input) => {
  console.log(input.data);
})

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});