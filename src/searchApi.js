require("dotenv").config();
const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(process.env.API_KEY);
const { filteringData, putDataOnDB } = require("./controllers/index");

const params = {
  q: "Dolar",
  tbm: "nws",
  engine: "google",
  gl: "ar",
  num: 100,
};

const callback = function (data) {
  filteringData(data, putDataOnDB);
};

module.exports = {
  search,
  params,
  callback,
};
