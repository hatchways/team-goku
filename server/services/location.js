let nodeGeocoder = require("node-geocoder");

let options = {
  provider: "openstreetmap",
};

let geoCoder = nodeGeocoder(options);

let lat;
let long;

const geocode = async (address) => {
  geoCoder
    .geocode(address)
    .then((res) => {
      lat = res[0]["latitude"];
      long = res[0]["longitude"];

      console.log(lat, long);

      const loc_obj = {
        lat: lat,
        long: long,
      };
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = geocode;
