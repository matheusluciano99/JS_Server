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

    // Exercicio 4: Jaca Wars!
    const vel = exercicios["jaca-wars"].entrada.v;
    const ang = exercicios["jaca-wars"].entrada.theta;
    const g = 9.8;
    const rad = (ang * Math.PI) / 180;
    const resultadoJaca = (vel * vel * Math.sin(2 * rad)) / g;
    const raioAlcance = 2;
    let acertou = -1; // já considerando que não acertou
    if (resultadoJaca >= 100 + raioAlcance) {
      acertou = 1;
    } else if (
      100 - raioAlcance < resultadoJaca &&
      resultadoJaca < 100 + raioAlcance
    ) {
      acertou = 0;
    }

    // Exercicio 5: Ano bissexto
    const ano = exercicios["ano-bissexto"].entrada.ano;
    let bissexto = false;
    if (ano % 4 === 0 && ano % 100 !== 0) {
      bissexto = true;
    } else if (ano % 400 === 0) {
      bissexto = true;
    }

    // Exercicio 6: Volume da PIZZA!
    const z = exercicios["volume-da-pizza"].entrada.z;
    const a = exercicios["volume-da-pizza"].entrada.a;

    // volume com Math.round
    const volume = Math.PI * Math.pow(z, 2) * a;
    const volumePizza = Math.round(volume);

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
      axios.post(
        "https://servidor-exercicios-js-eficaz.vercel.app/exercicio/jaca-wars",
        { resposta: acertou },
        { headers }
      ),
      axios.post(
        "https://servidor-exercicios-js-eficaz.vercel.app/exercicio/ano-bissexto",
        { resposta: bissexto },
        { headers }
      ),
      axios.post(
        "https://servidor-exercicios-js-eficaz.vercel.app/exercicio/volume-da-pizza",
        { resposta: volumePizza },
        { headers }
      ),
    ]);
  })
  .then((responses) => {
    // responses é um array com as respostas de cada exercício
    console.log(responses[0].data);
    console.log(responses[1].data);
    console.log(responses[2].data);
    console.log(responses[3].data);
    console.log(responses[4].data);

    // Se quiser fazer mais alguma coisa com as respostas, pode fazer aqui
    return responses;
  })
  .catch((error) => {
    console.log("Erro:", error.message);
    if (error.response) {
      console.log("Detalhes do erro:", error.response.data);
    }
  });
