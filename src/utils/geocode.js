const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWJ1emFyLW11Z2hpcyIsImEiOiJjbDQ0Mm02ZWYwZmI0M2NxeDYwZjdtYXl3In0._JTVJum4uhjuTqUuYn0XEA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
