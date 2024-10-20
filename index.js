import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.frankfurter.app/"

// Source all static files from the "public" folder
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", async (req, res) => {

    try {
        const response = await axios.get(`${API_URL}currencies`);
        const currencies = response.data;
        console.log(currencies);
        res.render("index.ejs", {currencies: currencies});
    } catch (error) {
        console.error("Failed to get data: " + error.message);
    }
    
});

app.post("/submit", async (req, res) => {
    const rates = await axios.get(`${API_URL}latest?base=${req.body.base}`);

    console.log(rates.data);
});

// Initiates port 
app.listen(port, () => {
    console.log("Server running on port " + port);
});