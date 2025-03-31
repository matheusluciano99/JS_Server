const axios = require("axios");
axios
  .get("https://catfact.ninja/fact")
  .then((response) => console.log(response.data.fact));

// send a POST request
axios({
  method: "post",
  url: "https://servidor-exercicios-js-eficaz.vercel.app/token",
  data: { username: "matheuslaos" },
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})
  .then((response) => {
    // Extrair o token da resposta
    const token = response.data.accessToken;
    console.log("Token recebido:", token);

    // Usar o token na próxima requisição
    return axios.get(
      "https://servidor-exercicios-js-eficaz.vercel.app/exercicio",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  })
  .then(
    (response) => {
      console.log(response.data);
    },
    (error) => {
      console.log(error);
    }
  );

// // get request
// axios
//   .get("https://servidor-exercicios-js-eficaz.vercel.app/exercicio", {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: "Bearer TOKEN",
//     },
//   })
//   .then((response) => console.log(response.data))
//   .catch((error) => console.log(error));
