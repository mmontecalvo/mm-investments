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

// Clase para generar los planes de inversión predeterminados

class Plan {
    constructor(name, bonds, shares, futures, cryptos){
        this.name = name;
        this.bonds = parseFloat(bonds);
        this.shares = parseFloat(shares);
        this.futures = parseFloat(futures);
        this.cryptos = parseFloat(cryptos);
    }

    takeProfit(){
        return (this.bonds*assets[0].takeProfit)+(this.shares*assets[1].takeProfit)+(this.futures*assets[2].takeProfit)+(this.cryptos*assets[3].takeProfit)
    }

    stopLoss(){
        return (this.bonds*assets[0].stopLoss)+(this.shares*assets[1].stopLoss)+(this.futures*assets[2].stopLoss)+(this.cryptos*assets[3].stopLoss)
    }
}

// Array de planes de inversión

const plans = [];

plans.push(new Plan("Riesgo bajo", 70, 20, 10, 0));
plans.push(new Plan("Riesgo medio", 50, 20, 15, 15));
plans.push(new Plan("Riesgo alto", 30, 15, 15, 40));

// Generación de cards

const container = document.getElementById("container");

plans.forEach((card, index) => {
    container.innerHTML += `
        <div id="card${index}" class="card">
            <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title"><strong>${card.name.toUpperCase()}</strong></h3>
                <p class="card-text"><strong>Take Profit Objetivo<span class="clarification">(*)</span>:</strong> <span class="tp">${card.takeProfit().toFixed(2)}%</span></p>
                <p class="card-text"><strong>Riesgo<span class="clarification">(*)</span>:</strong> <span class="sl">-${card.stopLoss().toFixed(2)}%</span></p>
                <p class="card-text"><strong>% de cartera por activo:</strong></p>
                <p class="card-text card-item"><strong>Bonos:</strong> ${card.bonds}%</p>
                <p class="card-text card-item"><strong>Acciones</strong> ${card.shares}%</p>
                <p class="card-text card-item"><strong>Futuros:</strong> ${card.futures}%</p>
                <p class="card-text card-item"><strong>Criptomonedas:</strong> ${card.cryptos}%</p>
                <span class="clarification">(*) Tasa Nominal Anual</span>
                <button id="btn${index}" class="btn btn-primary">Calcular</button>
            </div>
        </div>
    `
})

// Abrir formulario para ingresar valores de consulta

const btn0 = document.getElementById("btn0");

btn0.addEventListener('click', () => {
    card0.innerHTML = `
        <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title"><strong>RIESGO BAJO</strong></h3>
            <form id="idForm0">
                <div class="mb-3">
                    <label for="formGroupExampleInput" class="card-text"><strong>Valor a invertir: <span class="clarification">(USD)</span></strong></label>
                    <input type="text" class="form-control card-text" id="input0Value" placeholder="Entre $1,000 - $1,000,000" required>
                </div>
                <div class="mb-3">
                    <label for="formGroupExampleInput2" class="card-text"><strong>Plazo de tiempo: <span class="clarification">(meses)</span></strong></label>
                    <input type="text" class="form-control card-text" id="input0Months" placeholder="Entre 1 - 12 meses" required>
                </div>
                <button id="resetCard" class="btn btn-primary" onclick="location.reload();">Volver</button>
                <button type="submit" id="btnCalculate0" class="btn btn-primary">Calcular</button>
            </form>
        </div>
    `

    // Calcular resultado final con los valores ingresados

    const idForm0 = document.getElementById("idForm0");
    let input0Value = "";
    let input0Months = "";

    idForm0.onsubmit = () => {
        input0Value = parseFloat(document.getElementById("input0Value").value);
        input0Months = parseInt(document.getElementById("input0Months").value);
        card0.innerHTML = `
            <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title"><strong>RIESGO BAJO</strong></h3>
                <h4 class="card-text"><strong>Valor inicial:</strong></h4>
                <span class="card-text">${input0Value} USD</span>
                <h4 class="card-text"><strong>Tiempo de inversión:</strong></h4>
                <span class="card-text">${input0Months} meses</span>
                <h4 class="card-text"><strong>Valor a recibir:</strong></h4>
                <span class="card-text tp">${((((plans[0].bonds/100*input0Value)*(assets[0].takeProfit))+((plans[0].shares/100*input0Value)*(assets[1].takeProfit))+((plans[0].futures/100*input0Value)*(assets[2].takeProfit))+((plans[0].cryptos/100*input0Value)*(assets[3].takeProfit)))*(input0Months/12)+input0Value).toFixed(2)} USD</span>
                <button id="resetCard" class="btn btn-primary" onclick="location.reload();">Volver</button>
                <a id="confirmOp" class="btn btn-primary" href="./404.html">Confirmar Operación</a>
            </div>
        `
    }
})


const btn1 = document.getElementById("btn1");

btn1.addEventListener('click', () => {
    card1.innerHTML = `
        <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title"><strong>RIESGO MEDIO</strong></h3>
            <form id="idForm1">
                <div class="mb-3">
                    <label for="formGroupExampleInput" class="card-text"><strong>Valor a invertir: <span class="clarification">(USD)</span></strong></label>
                    <input type="text" class="form-control card-text" id="input1Value" placeholder="Entre $1,000 - $1,000,000" required>
                </div>
                <div class="mb-3">
                    <label for="formGroupExampleInput2" class="card-text"><strong>Plazo de tiempo: <span class="clarification">(meses)</span></strong></label>
                    <input type="text" class="form-control card-text" id="input1Months" placeholder="Entre 1 - 12 meses" required>
                </div>
                <button id="resetCard" class="btn btn-primary" onclick="location.reload();">Volver</button>
                <button type="submit" id="btnCalculate1" class="btn btn-primary">Calcular</button>
            </form>
        </div>
    `

    // Calcular resultado final con los valores ingresados

    const idForm1 = document.getElementById("idForm1");
    let input1Value = "";
    let input1Months = "";

    idForm1.onsubmit = () => {
        input1Value = parseFloat(document.getElementById("input1Value").value);
        input1Months = parseInt(document.getElementById("input1Months").value);
        card1.innerHTML = `
            <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title"><strong>RIESGO MEDIO</strong></h3>
                <h4 class="card-text"><strong>Valor inicial:</strong></h4>
                <span class="card-text">${input1Value} USD</span>
                <h4 class="card-text"><strong>Tiempo de inversión:</strong></h4>
                <span class="card-text">${input1Months} meses</span>
                <h4 class="card-text"><strong>Valor a recibir:</strong></h4>
                <span class="card-text tp">${((((plans[1].bonds/100*input1Value)*(assets[0].takeProfit))+((plans[1].shares/100*input1Value)*(assets[1].takeProfit))+((plans[1].futures/100*input1Value)*(assets[2].takeProfit))+((plans[1].cryptos/100*input1Value)*(assets[3].takeProfit)))*(input1Months/12)+input1Value).toFixed(2)} USD</span>
                <button id="resetCard" class="btn btn-primary" onclick="location.reload();">Volver</button>
                <a id="confirmOp" class="btn btn-primary" href="./404.html">Confirmar Operación</a>
            </div>
        `
    }
})


const btn2 = document.getElementById("btn2");

btn2.addEventListener('click', () => {
    card2.innerHTML = `
        <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title"><strong>RIESGO ALTO</strong></h3>
            <form id="idForm2">
                <div class="mb-3">
                    <label for="formGroupExampleInput" class="card-text"><strong>Valor a invertir: <span class="clarification">(USD)</span></strong></label>
                    <input type="text" class="form-control card-text" id="input2Value" placeholder="Entre $1,000 - $1,000,000" required>
                </div>
                <div class="mb-3">
                    <label for="formGroupExampleInput2" class="card-text"><strong>Plazo de tiempo: <span class="clarification">(meses)</span></strong></label>
                    <input type="text" class="form-control card-text" id="input2Months" placeholder="Entre 1 - 12 meses" required>
                </div>
                <button id="resetCard" class="btn btn-primary" onclick="location.reload();">Volver</button>
                <button type="submit" id="btnCalculate2" class="btn btn-primary">Calcular</button>
            </form>
        </div>
    `

    // Calcular resultado final con los valores ingresados

    const idForm2 = document.getElementById("idForm2");
    let input2Value = "";
    let input2Months = "";

    idForm2.onsubmit = () => {
        input2Value = parseFloat(document.getElementById("input2Value").value);
        input2Months = parseInt(document.getElementById("input2Months").value);
        card2.innerHTML = `
            <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title"><strong>RIESGO ALTO</strong></h3>
                <h4 class="card-text"><strong>Valor inicial:</strong></h4>
                <span class="card-text">${input2Value} USD</span>
                <h4 class="card-text"><strong>Tiempo de inversión:</strong></h4>
                <span class="card-text">${input2Months} meses</span>
                <h4 class="card-text"><strong>Valor a recibir:</strong></h4>
                <span class="card-text tp">${((((plans[2].bonds/100*input2Value)*(assets[0].takeProfit))+((plans[2].shares/100*input2Value)*(assets[1].takeProfit))+((plans[2].futures/100*input2Value)*(assets[2].takeProfit))+((plans[2].cryptos/100*input2Value)*(assets[3].takeProfit)))*(input2Months/12)+input2Value).toFixed(2)} USD</span>
                <button id="resetCard" class="btn btn-primary" onclick="location.reload();">Volver</button>
                <a id="confirmOp" class="btn btn-primary" href="./404.html">Confirmar Operación</a>
            </div>
         `
    }
})






/*

// Funciones para calcular los niveles de riesgo predefinidos

// const highRisk = (value, time) => (((0.3*value)*(assets[0].takeProfit))+((0.15*value)*(assets[1].takeProfit))+((0.15*value)*(assets[2].takeProfit))+((0.4*value)*(assets[3].takeProfit)))*(time/365)+value

// const mediumRisk = (value, time) => (((0.5*value)*(assets[0].takeProfit))+((0.2*value)*(assets[1].takeProfit))+((0.15*value)*(assets[2].takeProfit))+((0.15*value)*(assets[3].takeProfit)))*(time/365)+value

const lowRisk = () => (((0.7*input0Value)*(assets[0].takeProfit))+((0.2*input0Value)*(assets[1].takeProfit))+((0.1*input0Value)*(assets[2].takeProfit))+((0*input0Value)*(assets[3].takeProfit)))*(input0Months/365)+input0Value

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



*/