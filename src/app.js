import express from "express";
import "dotenv/config";
import api from "./api/index.js";

const app = express();

// Middleware JSON-datan lukemiseen
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.use("/public", express.static("public"));

// Etusivu
app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

// GET: Kaikki resurssit
app.get("/api/resource", (req, res) => {
  res.json({
    id: 99,
    title: "My first item",
  });
});

// GET: Yksittäinen resurssi
app.get("/api/resource/:id", (req, res) => {
  res.json({
    id: req.params.id,
    title: "Resource " + req.params.id,
  });
});

// POST: Vastaanota JSON-dataa
app.post("/api/resource", (req, res) => {
  res.status(201).json({
    your_request: req.body,
  });
});

app.use("/api/v1", api);

export default app;
