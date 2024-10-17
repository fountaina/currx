import axios from "axios";
import express from "express";

const app = express();
const port = 3000;

// Source all static files from the "public" folder
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Initiates port 
app.listen(port, () => {
    console.log("Server running on port " + port);
});