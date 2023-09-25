const express = require("express");
const app = express();
const https = require("https");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

let temperature = "";
app.listen(3000, () => {
  console.log(`server running`);
});

app.get(`/`, (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post(`/`, (req, res) => {
  let temp = req.body.cityName;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${temp}&appid=40443b5a6f43c12faca0a27a979c7f98&units=metric`;
  https.get(URL, (res) => {
    res.on("data", (chunk) => {
      let parsedData = JSON.parse(chunk);
      temperature = parsedData.main.temp;
      //   console.log(temperature);
      return temperature;
    });
  });
  if (temp == "") {
    res.send("Enter valid City Name");
  } else {
    res.send(`The temperature of ${temp} is ${temperature}`);
  }

  // console.log(temp);
  //res.redirect(`/`);
});
