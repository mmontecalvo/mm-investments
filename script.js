// Clase para generar los distintos tipos de activos de inversión

class Asset {
    constructor(name, takeProfit, stopLoss) {
        this.name = name.toLowerCase();
        this.takeProfit = parseFloat(takeProfit)/100;
        this.stopLoss = parseFloat(stopLoss)/100;
    }
}

// Array de los activos de inversión

const assets = [];

assets.push(new Asset("bonos", 2, 0.5));
assets.push(new Asset("acciones", 10, 2.5));
assets.push(new Asset("futuros", 20, 5));
assets.push(new Asset("criptomonedas", 60, 30));

// Funciones para calcular los niveles de riesgo predefinidos

const highRisk = (value, time) => (((0.3*value)*(assets[0].takeProfit))+((0.15*value)*(assets[1].takeProfit))+((0.15*value)*(assets[2].takeProfit))+((0.4*value)*(assets[3].takeProfit)))*(time/365)+value

const mediumRisk = (value, time) => (((0.5*value)*(assets[0].takeProfit))+((0.2*value)*(assets[1].takeProfit))+((0.15*value)*(assets[2].takeProfit))+((0.15*value)*(assets[3].takeProfit)))*(time/365)+value

const lowRisk = (value, time) => (((0.7*value)*(assets[0].takeProfit))+((0.2*value)*(assets[1].takeProfit))+((0.1*value)*(assets[2].takeProfit))+((0*value)*(assets[3].takeProfit)))*(time/365)+value

// Funciones para calcular los niveles de riesgo personalizados

const customRisk = (value, time, bonds, shares, futures, cryptos) => ((((bonds/100)*value)*(assets[0].takeProfit))+(((shares/100)*value)*(assets[1].takeProfit))+(((futures/100)*value)*(assets[2].takeProfit))+(((cryptos/100)*value)*(assets[3].takeProfit)))*(time/365)+value

const customTP = (bonds, shares, futures, cryptos) => ((bonds*assets[0].takeProfit)+(shares*assets[1].takeProfit)+(futures*assets[2].takeProfit)+(cryptos*assets[3].takeProfit))

const customSL = (bonds, shares, futures, cryptos) => ((bonds*assets[0].stopLoss)+(shares*assets[1].stopLoss)+(futures*assets[2].stopLoss)+(cryptos*assets[3].stopLoss))

// Función de resultado final a devolver

const container = document.getElementById("container")

function result(value, risk, time, bonds, shares, futures, cryptos) {
    switch(risk) {
        case "4":
            container.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><strong>Valor invertido:</strong> ${value} USD</h5>
                    <p class="card-text"><strong>Riesgo:</strong> PERSONALIZADO (-${customSL(bonds, shares, futures, cryptos).toFixed(2)}%)</p>
                    <p class="card-text"><strong>% de cartera por activo:</strong>${customs.map((asset) => " " + asset.name.toUpperCase() + ": " + asset.percentage + "%")}</p>
                    <p class="card-text"><strong>Take Profit Objetivo:</strong> ${customTP(bonds, shares, futures, cryptos).toFixed(2)}%</p>
                    <p class="card-text"><strong>Tiempo de inversión:</strong> ${time} días</p>
                    <h6 class="card-title"><strong>Valor a recibir:</strong> ${customRisk(value,time, bonds, shares, futures, cryptos).toFixed(2)} USD</h6>
                    <a href="#" class="btn btn-primary">Confirmar</a>
                </div>
            </div>
            `
            // alert(`
            // Valor invertido: ${value} USD
            // Riesgo: PERSONALIZADO (-${customSL(bonds, shares, futures, cryptos).toFixed(2)}%)
            // % de cartera por activo:${customs.map((asset) => " " + asset.name.toUpperCase() + ": " + asset.percentage + "%")}
            // Take Profit Objetivo: ${customTP(bonds, shares, futures, cryptos).toFixed(2)}%
            // Tiempo de inversión: ${time} días
            // Valor recibido: ${customRisk(value,time, bonds, shares, futures, cryptos).toFixed(2)} USD`)
            break
        case "3":
            container.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><strong>Valor invertido:</strong> ${value} USD</h5>
                    <p class="card-text"><strong>Riesgo:</strong> ALTO (-13%)</p>
                    <p class="card-text"><strong>% de cartera por activo:</strong> BONOS: 30%, ACCIONES: 15%, FUTUROS: 15%, CRIPTOMONEDAS: 40%</p>
                    <p class="card-text"><strong>Take Profit Objetivo:</strong> 29.1%</p>
                    <p class="card-text"><strong>Tiempo de inversión:</strong> ${time} días</p>
                    <h6 class="card-title"><strong>Valor a recibir:</strong> ${highRisk(value,time).toFixed(2)} USD</h6>
                    <a href="#" class="btn btn-primary">Confirmar</a>
                </div>
            </div>
            `
            // alert(`Valor invertido: ${value} USD
            // Riesgo: ALTO (-13%)
            // Take Profit Objetivo: 29.1%
            // Tiempo de inversión: ${time} días
            // Valor recibido: ${highRisk(value,time).toFixed(2)} USD`)
            break
        case "2":
            container.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><strong>Valor invertido:</strong> ${value} USD</h5>
                    <p class="card-text"><strong>Riesgo:</strong> MEDIO (-6%)</p>
                    <p class="card-text"><strong>% de cartera por activo:</strong> BONOS: 50%, ACCIONES: 20%, FUTUROS: 15%, CRIPTOMONEDAS: 15%</p>
                    <p class="card-text"><strong>Take Profit Objetivo:</strong> 15%</p>
                    <p class="card-text"><strong>Tiempo de inversión:</strong> ${time} días</p>
                    <h6 class="card-title"><strong>Valor a recibir:</strong> ${mediumRisk(value,time).toFixed(2)} USD</h6>
                    <a href="#" class="btn btn-primary">Confirmar</a>
                </div>
            </div>
            `
            // alert(`
            // Valor invertido: ${value} USD
            // Riesgo: MEDIO (-6%)
            // Take Profit Objetivo: 15%
            // Tiempo de inversión: ${time} días
            // Valor recibido: ${mediumRisk(value,time).toFixed(2)} USD`)
            break
        case "1":
            container.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><strong>Valor invertido:</strong> ${value} USD</h5>
                    <p class="card-text"><strong>Riesgo:</strong> BAJO (-1%)</p>
                    <p class="card-text"><strong>% de cartera por activo:</strong> BONOS: 70%, ACCIONES: 20%, FUTUROS: 10%</p>
                    <p class="card-text"><strong>Take Profit Objetivo:</strong> 5.4%</p>
                    <p class="card-text"><strong>Tiempo de inversión:</strong> ${time} días</p>
                    <h6 class="card-title"><strong>Valor a recibir:</strong> ${lowRisk(value,time).toFixed(2)} USD</h6>
                    <a href="#" class="btn btn-primary">Confirmar</a>
                </div>
            </div>
            `
            // alert(`
            // Valor invertido: ${value} USD
            // Riesgo: BAJO (-1%)
            // Take Profit Objetivo: 5.4%
            // Tiempo de inversión: ${time} días
            // Valor recibido: ${lowRisk(value,time).toFixed(2)} USD`)
            break
        default:
            alert("Operacion no valida")
    }
}

// Procedimiento para obtener información del usuario

let answer, customs

class AssetCustomPortfolio {
    constructor(name, percentage) {
        this.name = name.toLowerCase();
        this.percentage = percentage;
    }
}

const custom = [] // Array para guardar los porcentajes del value que quiere invertir el usuario en cada activo, en caso de elegir el modo personalizado.

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

    custom.push(new AssetCustomPortfolio("Bonos", bonds));
    custom.push(new AssetCustomPortfolio("Acciones", shares));
    custom.push(new AssetCustomPortfolio("Futuros", futures));
    custom.push(new AssetCustomPortfolio("Criptomonedas", cryptos));
    customs = custom.filter((asset) => asset.percentage > 0) // Si el usuario no quiere invertir nada en algún activo, aquí descarto el quede en 0%

    result(value, risk, time, bonds, shares, futures, cryptos)

    custom.splice(0, 4); // Si el usuario decide hacer una nueva operación, vacío el array para guardar la nueva respuesta

    do {
        answer = prompt("¿Desea calcular otra operacion?").toLowerCase()
    } while(answer != "si" && answer != "no")

} while(answer != "no")



