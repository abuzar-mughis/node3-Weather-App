const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c847b9380b65ab585fd8ce55fae7f9a8&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(
        undefined,
        `Weather is ${body.current.weather_descriptions}. Temperature is ${body.current.temperature}C degrees, and It's feels like ${body.current.feelslike}C degrees out.`
      );
    }
  });
};

module.exports = forecast;
