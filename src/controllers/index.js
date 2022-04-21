const { client, TABLE_NAME } = require("../database");
const {v4} = require('uuid')

const putDataOnDB = async (data) => {
  //url, title, Publication Name, Date
  let promises = [];
  promises = data.map((el) => {
    const {link, title, source, date} = el;

    const news = {
        id: v4(),
        Url: link,
        Title: title,
        PublicationName: source,
        Date: date
    }

    try{
        return client.put({
            TableName: TABLE_NAME,
            Item: news
        }).promise()
    }catch(error) {
        console.error(error)
    }
  });

  await Promise.all(promises)
};

const filteringData = (dataObject, cb) => {

    if(!dataObject.hasOwnProperty("news_results")) throw new Error('EL OBJETO NO CONTIENE EL ARRAY CON LAS NEWS');

  const results = dataObject["news_results"];
  //filtro todas las news que tengas más de 2 dias de antiguedad
  const filterResults = results.filter((el) => {
    if (el.date.includes("día") || el.date.includes("day")) {
      if (el.date.slice(5, 6) <= 2) return el;
    } else if (el.date.includes("horas") || el.date.includes("hours")) {
      return el;
    }
  });
  return cb(filterResults);
};

module.exports = {
  putDataOnDB,
  filteringData,
};
