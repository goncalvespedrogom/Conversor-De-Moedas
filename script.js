let dolar = 6.08; // aqui foi definido o valor do dolar

let usdInput = document.querySelector("#usd"); // peguei o o input do dolar
let brlInput = document.querySelector("#brl"); // peguei o input do real

usdInput.addEventListener("keyup", () => {
    convert("usd-to-brl")
})

brlInput.addEventListener("keyup", () => {
    convert("brl-to-usd")
})

usdInput.addEventListener("blur", () => {
    usdInput.value = formatCurrency(usdInput.value)
})

brlInput.addEventListener("blur", () => {
    brlInput.value = formatCurrency(brlInput.value)
})

usdInput.value = "1,00"
convert("usd-to-brl")

// funções
function formatCurrency(value) {
    let fixedValue = fixValue(value) // ajustar o valor
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2
    }
    let formatter = new Intl.NumberFormat("pt-BR", options) 
    return formatter.format(fixedValue) // formatar o número para a moeda
    
    // retorna o valor formatado
}

function fixValue(value) {
    let fixedValue = value.replace(",", ".") // substitui a virgula pelo ponto
    let floatValue = parseFloat(fixedValue) // transfomei a string do valor em um NUMBER
    if(floatValue == NaN) {
        floatValue = 0
    }
    return floatValue
}

function convert(type) {
    if(type == "usd-to-brl") {
        let fixedValue = fixValue(usdInput.value) // ajustar valor

        let result = fixedValue * dolar    // converter o valor
        result = result.toFixed(2) // aqui define que só terá dois números dps da vírgula para não bugar com aquele números infinitos

        brlInput.value = formatCurrency(result) // mostrar valor no campo do real
    }

    if(type == "brl-to-usd"){
        let fixedValue = fixValue(brlInput.value) // ajustar valor

        let result = fixedValue / dolar // converter o valor
        result = result.toFixed(2) // aqui define que só terá dois números dps da vírgula para não bugar com aquele números infinitos

        usdInput.value = formatCurrency(result) // mostrar valor no campo do real
    }
}