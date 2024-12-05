import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.frankfurter.app/"

// Source all static files from the "public" folder
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", async (req, res) => {

    try {
        const response = await axios.get(`${API_URL}currencies`);
        const currencies = response.data;
        console.log(currencies);
        res.render("index.ejs", {currencies: currencies});
    } catch (error) {
        console.error("Failed to get data: " + error.message);
        res.render("index.ejs");
    }

    // res.render("index.ejs");
    
});

let newAmount;

app.post("/submit", async (req, res) => {
    // const rates = await axios.get(`${API_URL}latest?base=${req.body.base}`);

    console.log(req.body);
    // console.log(req.body.amount);
    
    // converts client's amount between currency pairs.
    async function convert(from, to, amount) {

        try {
            const response = await axios.get(`https://api.frankfurter.app/latest?base=${from}&symbols=${to}`);
            const data = response.data;
            const convertedAmount = (amount * data.rates[to]).toFixed(2);
            console.log("Converted amount value: " + convertedAmount);
            return Number(convertedAmount);
        } catch (error) {
            console.error("Failed to make request due to: " + error.message);
        }

    }
    // Usage
    newAmount = await convert(`${req.body.base}`, `${req.body.new}`, Number(req.body.amount));
    console.log("New Amount: " + newAmount);

});

app.get("/updates", (req, res) => {
    //Simulate delay
    setTimeout(() => {
        res.json({newAmount: newAmount});
    }, 2000);
});


// Initiates port 
app.listen(port, () => {
    console.log("Server running on port " + port);
});

// converts client's amount between currency pairs.
async function convert(from, to, amount) {
    const response = await axios.get(`https://api.frankfurter.app/latest?base=${from}&symbols=${to}`);
    const data = response.data;
    const convertedAmount = (amount * data.rates[to]).toFixed(2);
    console.log("Converted amount value: " + convertedAmount);
    return Number(convertedAmount);
}
