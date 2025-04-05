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

    // Exercício 7: mru
    const s0 = exercicios.mru.entrada.s0;
    const v = exercicios.mru.entrada.v;
    const t = exercicios.mru.entrada.t;
    const s = s0 + v * t;
    const respostaMRU = s;

    // Exercício 8: Inverte string
    const string = exercicios["inverte-string"].entrada.string;
    const stringInvertida = string.split("").reverse().join("");

    // Exercicio 9: Soma Valores
    const objeto = exercicios["soma-valores"].entrada.objeto;
    const somaValores = Object.values(objeto).reduce(
      (soma, valor) => soma + valor,
      0
    );

    // Exercício 10: n-esimo numero primo
    const n = exercicios["n-esimo-primo"].entrada.n;
    let contador = 0;
    let numero = 1;
    let nEsimoPrimo = 0;
    while (contador < n) {
      numero++;
      let primo = true;
      for (let i = 2; i <= Math.sqrt(numero); i++) {
        if (numero % i === 0) {
          primo = false;
          break;
        }
      }
      if (primo) {
        contador++;
        nEsimoPrimo = numero;
      }
    }

    // Exercicio 11: Maior prefixo comum
    const strings = exercicios["maior-prefixo-comum"].entrada.strings;
    // Encontrar o maior prefixo comum entre todas as strings
    let maiorPrefixo = "";

    // Verificar todos os pares possíveis de strings
    for (let i = 0; i < strings.length; i++) {
      for (let j = i + 1; j < strings.length; j++) {
        // Encontrar o prefixo comum entre este par de strings
        let prefixoAtual = "";
        const str1 = strings[i];
        const str2 = strings[j];
        let k = 0;

        // Comparar caracteres em ambas as strings
        while (k < str1.length && k < str2.length && str1[k] === str2[k]) {
          prefixoAtual += str1[k];
          k++;
        }

        // Atualizar o maior prefixo se este for maior
        if (prefixoAtual.length > maiorPrefixo.length) {
          maiorPrefixo = prefixoAtual;
        }
      }
    }

    const prefixo = maiorPrefixo;

    // Exercicio 12: Soma segundo e maior
    const numeros =
      exercicios["soma-segundo-maior-e-menor-numeros"].entrada.numeros;
    const numerosOrdenados = numeros.sort((a, b) => b - a);
    const segundoMaior = numerosOrdenados[1];
    const segundoMenor = numerosOrdenados[numerosOrdenados.length - 2];
    const somaSegundoMaior = segundoMaior + segundoMenor;

    // Exercício 13: Conta Palindromos
    const palavras = exercicios["conta-palindromos"].entrada.palavras;
    const palindromos = palavras.filter((palavra) => {
      const palavraInvertida = palavra.split("").reverse().join("");
      return palavra === palavraInvertida;
    });
    const quantidadePalindromos = palindromos.length;

    // Exercicio 14: Soma de strings de inteiros
    const stringsInteiros =
      exercicios["soma-de-strings-de-ints"].entrada.strings;
    const somaStringsInteiros = stringsInteiros
      .map((str) => parseInt(str, 10) || 0) // Convert to numbers, replace NaN with 0
      .reduce((soma, numero) => soma + numero, 0); // Add all numbers

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
      axios.post(
        "https://servidor-exercicios-js-eficaz.vercel.app/exercicio/mru",
        { resposta: respostaMRU },
        { headers }
      ),
      axios.post(
        "https://servidor-exercicios-js-eficaz.vercel.app/exercicio/inverte-string",
        { resposta: stringInvertida },
        { headers }
      ),
      axios.post(
        "https://servidor-exercicios-js-eficaz.vercel.app/exercicio/soma-valores",
        { resposta: somaValores },
        { headers }
      ),
      axios.post(
        "https://servidor-exercicios-js-eficaz.vercel.app/exercicio/n-esimo-primo",
        { resposta: nEsimoPrimo },
        { headers }
      ),
      axios.post(
        "https://servidor-exercicios-js-eficaz.vercel.app/exercicio/maior-prefixo-comum",
        { resposta: prefixo },
        { headers }
      ),
      axios.post(
        "https://servidor-exercicios-js-eficaz.vercel.app/exercicio/soma-segundo-maior-e-menor-numeros",
        { resposta: somaSegundoMaior },
        { headers }
      ),
      axios.post(
        "https://servidor-exercicios-js-eficaz.vercel.app/exercicio/conta-palindromos",
        { resposta: quantidadePalindromos },
        { headers }
      ),
      axios.post(
        "https://servidor-exercicios-js-eficaz.vercel.app/exercicio/soma-de-strings-de-ints",
        { resposta: somaStringsInteiros },
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
    console.log(responses[5].data);
    console.log(responses[6].data);
    console.log(responses[7].data);
    console.log(responses[8].data);
    console.log(responses[9].data);
    console.log(responses[10].data);
    console.log(responses[11].data);
    console.log(responses[12].data);
    console.log(responses[13].data);

    // Se quiser fazer mais alguma coisa com as respostas, pode fazer aqui
    return responses;
  })
  .catch((error) => {
    console.log("Erro:", error.message);
    if (error.response) {
      console.log("Detalhes do erro:", error.response.data);
    }
  });
