// seleção dos elementos do DOM
let usdInput = document.querySelector("#usd");
let brlInput = document.querySelector("#brl");

// variável para armazenar a taxa de conversão obtida pela API
let dolar = 0;

// URL da API para buscar a taxa de conversão USD -> BRL
const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

// função para buscar a cotação atual do dólar
async function fetchExchangeRate() {
    try {
        const response = await fetch(API_URL); // Chamada à API
        const data = await response.json();
        dolar = data.rates.BRL; // obtém a taxa BRL (real) a partir da resposta da API
        console.log(`Taxa de câmbio USD -> BRL: ${dolar}`);
        convert("usd-to-brl"); // atualiza o campo BRL com base no valor inicial de USD
    } catch (error) {
        console.error("Erro ao buscar a taxa de câmbio:", error);
        alert("Não foi possível obter a taxa de câmbio. Tente novamente mais tarde.");
    }
}

// eventos para realizar a conversão
usdInput.addEventListener("keyup", () => {
    convert("usd-to-brl");
});

brlInput.addEventListener("keyup", () => {
    convert("brl-to-usd");
});

usdInput.addEventListener("blur", () => {
    usdInput.value = formatCurrency(usdInput.value);
});

brlInput.addEventListener("blur", () => {
    brlInput.value = formatCurrency(brlInput.value);
});

// inicializa o valor do dólar e a conversão
usdInput.value = "1,00";
fetchExchangeRate(); // obtém a cotação atual ao carregar a página

// funções utilitárias
function formatCurrency(value) {
    let fixedValue = fixValue(value); // ajustar o valor
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2,
    };
    let formatter = new Intl.NumberFormat("pt-BR", options);
    return formatter.format(fixedValue); // formatar o número para a moeda
}

function fixValue(value) {
    let fixedValue = value.replace(",", "."); // altera a vírgula pelo ponto
    let floatValue = parseFloat(fixedValue); // transforma a string do valor em um NUMBER
    if (isNaN(floatValue)) {
        floatValue = 0;
    }
    return floatValue;
}

function convert(type) {
    if (dolar === 0) {
        alert("A cotação ainda não foi carregada. Aguarde um momento.");
        return;
    }

    if (type == "usd-to-brl") {
        let fixedValue = fixValue(usdInput.value); // ajustar valor

        let result = fixedValue * dolar; // converter o valor
        result = result.toFixed(2); // limitar para dois decimais

        brlInput.value = formatCurrency(result); // mostrar valor no campo do real
    }

    if (type == "brl-to-usd") {
        let fixedValue = fixValue(brlInput.value); // ajustar valor

        let result = fixedValue / dolar; // converter o valor
        result = result.toFixed(2); // limitar para dois decimais

        usdInput.value = formatCurrency(result); // mostrar valor no campo do dólar
    }
}