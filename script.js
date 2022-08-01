class Asset {
    constructor(name, takeProfit, stopLoss) {
        this.name = name.toLowerCase();
        this.takeProfit = parseFloat(takeProfit)/100;
        this.stopLoss = parseFloat(stopLoss)/100;
    }
}

const assets = [];

assets.push(new Asset("bonos", 2, 0.5));
assets.push(new Asset("acciones", 10, 2.5));
assets.push(new Asset("futuros", 20, 5));
assets.push(new Asset("criptomonedas", 60, 30));

const highRisk = (value, time) => (((0.3*value)*(assets[0].takeProfit))+((0.15*value)*(assets[1].takeProfit))+((0.15*value)*(assets[2].takeProfit))+((0.4*value)*(assets[3].takeProfit)))*(time/365)+value

const mediumRisk = (value, time) => (((0.5*value)*(assets[0].takeProfit))+((0.2*value)*(assets[1].takeProfit))+((0.15*value)*(assets[2].takeProfit))+((0.15*value)*(assets[3].takeProfit)))*(time/365)+value

const lowRisk = (value, time) => (((0.7*value)*(assets[0].takeProfit))+((0.2*value)*(assets[1].takeProfit))+((0.1*value)*(assets[2].takeProfit))+((0*value)*(assets[3].takeProfit)))*(time/365)+value

const customRisk = (value, time, bonds, shares, futures, cryptos) => ((((bonds/100)*value)*(assets[0].takeProfit))+(((shares/100)*value)*(assets[1].takeProfit))+(((futures/100)*value)*(assets[2].takeProfit))+(((cryptos/100)*value)*(assets[3].takeProfit)))*(time/365)+value

const customTP = (bonds, shares, futures, cryptos) => ((bonds*assets[0].takeProfit)+(shares*assets[1].takeProfit)+(futures*assets[2].takeProfit)+(cryptos*assets[3].takeProfit))

const customSL = (bonds, shares, futures, cryptos) => ((bonds*assets[0].stopLoss)+(shares*assets[1].stopLoss)+(futures*assets[2].stopLoss)+(cryptos*assets[3].stopLoss))

function profit(value, risk, time, bonds, shares, futures, cryptos) {
    switch(risk) {
        case "4":
            alert(`Valor invertido: ${value} USD\nRiesgo: PERSONALIZADO (-${customSL(bonds, shares, futures, cryptos).toFixed(2)}%)\nTake Profit Objetivo: ${customTP(bonds, shares, futures, cryptos).toFixed(2)}%\nTiempo de inversión: ${time} días\nValor recibido: ${customRisk(value,time, bonds, shares, futures, cryptos).toFixed(2)} USD`)
            break
        case "3":
            alert(`Valor invertido: ${value} USD\nRiesgo: ALTO (-13%)\nTake Profit Objetivo: 29.1%\nTiempo de inversión: ${time} días\nValor recibido: ${highRisk(value,time).toFixed(2)} USD`)
            break
        case "2":
            alert(`Valor invertido: ${value} USD\nRiesgo: MEDIO (-6%)\nTake Profit Objetivo: 15%\nTiempo de inversión: ${time} días\nValor recibido: ${mediumRisk(value,time).toFixed(2)} USD`)
            break
        case "1":
            alert(`Valor invertido: ${value} USD\nRiesgo: BAJO (-1%)\nTake Profit Objetivo: 5.4%\nTiempo de inversión: ${time} días\nValor recibido: ${lowRisk(value,time).toFixed(2)} USD`)
            break
        default:
            alert("Operacion no valida")
    }
}

let answer

do {
    let value, risk, time, bonds, shares, futures, cryptos

    do{
        value = parseFloat(prompt("Ingrese la cantidad de dinero que desea invertir en USD (entre $1,000 - $1,000,000)."))
        risk = prompt("Nivel de riesgo dispuesto a asumir: \n 1- BAJO \n 2- MEDIO \n 3- ALTO \n 4- PERSONALIZADO")
        time = parseInt(prompt("Plazo en días (entre 30 y 365 días)"))

        if((isNaN(value)) || (value < 1000) || (value > 1000000)){
            alert("Por favor, ingrese un monto de dinero válido (entre $1,000 - $1,000,000)")
        }

        if(risk == "4"){
            do{
                bonds = parseFloat(prompt("Ingrese el porcentaje de su capital que desea invertir en Bonos. (Activos de bajo riesgo)"))
                shares = parseFloat(prompt("Ingrese el porcentaje de su capital que desea invertir en Acciones. (Activos de riesgo medio/alto)"))
                futures = parseFloat(prompt("Ingrese el porcentaje de su capital que desea invertir en Futuros. (Activos de riesgo medio/alto)"))
                cryptos = parseFloat(prompt("Ingrese el porcentaje de su capital que desea invertir en Criptomonedas. (Activos de alto riesgo)"))

                if((bonds < 0) || (bonds > 100) || (shares < 0) || (shares > 100) || (futures < 0) || (futures > 100) || (cryptos < 0) || (cryptos > 100)) {
                    alert("Por favor, ingrese un porcentaje válido: 0 a 100")
                }

                if(bonds + shares + futures + cryptos !== 100) {
                    alert("Por favor, la suma de los porcentajes destinada a cada uno de los cuatro activos debe ser igual a 100")
                }

            } while ((bonds < 0) || (bonds > 100) || (shares < 0) || (shares > 100) || (futures < 0) || (futures > 100) || (cryptos < 0) || (cryptos > 100) || (bonds + shares + futures + cryptos !== 100))
        }

        if(risk !== "4" && risk !== "3" && risk !== "2" && risk !== "1") {
            alert("Por favor, ingrese un nivel de riesgo válido: \n 1- BAJO \n 2- MEDIO \n 3- ALTO \n 4- PERSONALIZADO")
        }

        if((time < 30) || (time > 365)) {
            alert("Por favor, ingrese una valor de tiempo válido (entre 30 y 365 días)")
        }
    } while(((isNaN(value)) || (value < 1000) || (value > 1000000)) || (risk !== "4" && risk !== "3" && risk !== "2" && risk !== "1") ||((time < 30) || (time > 365)))

    profit(value, risk, time, bonds, shares, futures, cryptos)

    do {
        answer = prompt("¿Desea ingresar otra operacion?").toLowerCase()
    } while(answer != "si" && answer != "no")

} while(answer != "no")