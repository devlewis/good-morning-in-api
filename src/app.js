require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const { CLIENT_ORIGIN } = require("./config");
const app = express();
const countriesRouter = require("./countries-router");
const fetch = require("node-fetch");
const bodyParser = express.json();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);

app.get("/api/countries/all", (req, res) => {
  const url = "https://restcountries-v1.p.rapidapi.com/all";
  const options = {
    headers: {
      "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.COUNTRIES_API_TOKEN,
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((responseJson) => res.status(200).json(responseJson));
});

app.get("/api/country/:country", (req, res) => {
  console.log(req.params);
  const { country } = req.params;
  console.log(country);
  const url = `https://restcountries-v1.p.rapidapi.com/name/${country}`;
  const options = {
    headers: {
      "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.COUNTRIES_API_TOKEN,
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((responseJson) => res.status(200).json(responseJson));
});

app.get(
  "/api/lat/:lat/long/:long/timeStampShort/:timeStampShort",
  (req, res) => {
    const { lat, long, timeStampShort } = req.params;
    const url =
      "https://maps.googleapis.com/maps/api/timezone/json?location=" +
      lat +
      "," +
      long +
      "&timestamp=" +
      timeStampShort +
      `&key=${process.env.GOOGLE_API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((responseJson) => res.status(200).json(responseJson));
  }
);

app.get(
  "/api/countryCapital/:countryCapital/countryCode/:countryCode",
  (req, res) => {
    console.log(req.params);
    const { countryCapital, countryCode } = req.params;
    console.log(countryCapital);
    const url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      countryCapital +
      "&components=country:" +
      countryCode +
      `&key=${process.env.GOOGLE_API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((responseJson) => res.status(200).json(responseJson));
  }
);

app.post("/api/gt", bodyParser, (req, res) => {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_API_KEY}`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((responseJson) => res.status(200).json(responseJson));
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
