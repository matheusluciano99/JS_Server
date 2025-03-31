const axios = require("axios");
axios
  .get("https://catfact.ninja/fact")
  .then((response) => console.log(response.data.fact));

// send a POST request
axios({
  method: "post",
  url: "https://servidor-exercicios-js-eficaz.vercel.app/token",
  data: { username: "matheuslaos" },
}).then(
  (response) => {
    console.log(response);
  },
  (error) => {
    console.log(error);
  }
);
