const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static files
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "NodeJs",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "NodeJs",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "NodeJs",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Search again. You must provide an address",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Search again",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404",
    name: "NodeJs",
    errorMsg: "Article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404",
    name: "NodeJs",
    errorMsg: "Page Not found",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
