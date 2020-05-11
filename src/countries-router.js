const express = require("express");

const bodyParser = express.json();

const countriesRouter = express.Router();

countriesRouter.route("/all").get((req, res) => {
  const options = {
    headers: new Headers({
      "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.COUNTRIES_API_TOKEN,
    }),
  };
  fetch(options).then((res) => res.json());
});
