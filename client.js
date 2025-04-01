const axios = require("axios");

// Declare o token em um escopo mais amplo
let token;
let exercicios;

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
    token = response.data.accessToken;
    console.log("Token recebido:", token);

    // Usar o token para buscar os exercícios
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
  .then((response) => {
    // Salvar todos os exercícios
    exercicios = response.data;
    console.log(exercicios);

    // Exercicio 1: Soma valores
    const resultadoSoma = exercicios.soma.entrada.a + exercicios.soma.entrada.b;

    // Exercicio 2: Tamanho da string
    const resultadoTamanho = exercicios["tamanho-string"].entrada.string.length;

    // Exercício 3: Nome do usuário
    const email = exercicios["nome-do-usuario"].entrada.email;
    const posicArroba = email.indexOf("@");
    const nomeUsuario = email.slice(0, posicArroba);

    console.log("Soma:", resultadoSoma);
    console.log("Tamanho da string:", resultadoTamanho);
    console.log("Nome do usuário:", nomeUsuario);

    // Configuração de cabeçalhos comum
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Enviar todos os exercícios em paralelo
    return Promise.all([
      axios.post(
        "https://servidor-exercicios-js-eficaz.vercel.app/exercicio/soma",
        { resposta: resultadoSoma },
        { headers }
      ),
      axios.post(
        "https://servidor-exercicios-js-eficaz.vercel.app/exercicio/tamanho-string",
        { resposta: resultadoTamanho },
        { headers }
      ),
      axios.post(
        "https://servidor-exercicios-js-eficaz.vercel.app/exercicio/nome-do-usuario",
        { resposta: nomeUsuario },
        { headers }
      ),
    ]);
  })
  .then((responses) => {
    // responses é um array com as respostas de cada exercício
    console.log(responses[0].data);
    console.log(responses[1].data);
    console.log(responses[2].data);

    // Se quiser fazer mais alguma coisa com as respostas, pode fazer aqui
    return responses;
  })
  .catch((error) => {
    console.log("Erro:", error.message);
    if (error.response) {
      console.log("Detalhes do erro:", error.response.data);
    }
  });
