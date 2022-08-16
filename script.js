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

// Funciones para calcular los niveles de riesgo predefinidos

const lowRisk = (value, time) => ((((plans[0].bonds/100*value)*(assets[0].takeProfit))+((plans[0].shares/100*value)*(assets[1].takeProfit))+((plans[0].futures/100*value)*(assets[2].takeProfit))+((plans[0].cryptos/100*value)*(assets[3].takeProfit)))*(time/12)+value).toFixed(2)

const mediumRisk = (value, time) => ((((plans[1].bonds/100*value)*(assets[0].takeProfit))+((plans[1].shares/100*value)*(assets[1].takeProfit))+((plans[1].futures/100*value)*(assets[2].takeProfit))+((plans[1].cryptos/100*value)*(assets[3].takeProfit)))*(time/12)+value).toFixed(2)

const highRisk = (value, time) => ((((plans[2].bonds/100*value)*(assets[0].takeProfit))+((plans[2].shares/100*value)*(assets[1].takeProfit))+((plans[2].futures/100*value)*(assets[2].takeProfit))+((plans[2].cryptos/100*value)*(assets[3].takeProfit)))*(time/12)+value).toFixed(2)

// Generación de cards

const container = document.getElementById("container");

plans.forEach((card, index) => {
    container.innerHTML += `
        <div id="card${index}" class="card">
            <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title"><strong>${card.name.toUpperCase()}</strong></h3>
                <p class="card-text"><strong>Take Profit Objetivo<span class="clarification">*</span>:</strong> <span class="tp">${card.takeProfit().toFixed(2)}%</span></p>
                <p class="card-text"><strong>Riesgo<span class="clarification">*</span>:</strong> <span class="sl">-${card.stopLoss().toFixed(2)}%</span></p>
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
                    <label for="input0Value" class="card-text"><strong>Valor a invertir: <span class="clarification">(USD)</span></strong></label>
                    <input type="number" class="form-control card-text" id="input0Value" placeholder="Entre $1,000 - $1,000,000" name="number" min="1000" max="1000000" step="0.01" required>
                </div>
                <div class="mb-3">
                    <label for="input0Months" class="card-text"><strong>Plazo de tiempo: <span class="clarification">(meses)</span></strong></label>
                    <input type="number" class="form-control card-text" id="input0Months" placeholder="Entre 1 - 12 meses" name="number" min="1" max="12" step="1" required>
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
                <span class="card-text tp">${lowRisk(input0Value, input0Months)} USD</span>
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
                    <label for="input1Value" class="card-text"><strong>Valor a invertir: <span class="clarification">(USD)</span></strong></label>
                    <input type="number" class="form-control card-text" id="input1Value" placeholder="Entre $1,000 - $1,000,000" name="number" min="1000" max="1000000" step="0.01" required>
                </div>
                <div class="mb-3">
                    <label for="input1Months" class="card-text"><strong>Plazo de tiempo: <span class="clarification">(meses)</span></strong></label>
                    <input type="number" class="form-control card-text" id="input1Months" placeholder="Entre 1 - 12 meses" name="number" min="1" max="12" step="1" required>
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
                <span class="card-text tp">${mediumRisk(input1Value, input1Months)} USD</span>
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
                    <label for="input2Value" class="card-text"><strong>Valor a invertir: <span class="clarification">(USD)</span></strong></label>
                    <input type="number" class="form-control card-text" id="input2Value" placeholder="Entre $1,000 - $1,000,000" name="number" min="1000" max="1000000" step="0.01" required>
                </div>
                <div class="mb-3">
                    <label for="input2Months" class="card-text"><strong>Plazo de tiempo: <span class="clarification">(meses)</span></strong></label>
                    <input type="number" class="form-control card-text" id="input2Months" placeholder="Entre 1 - 12 meses" name="number" min="1" max="12" step="1" required>
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
                <span class="card-text tp">${highRisk(input2Value, input2Months)} USD</span>
                <button id="resetCard" class="btn btn-primary" onclick="location.reload();">Volver</button>
                <a id="confirmOp" class="btn btn-primary" href="./404.html">Confirmar Operación</a>
            </div>
         `
    }
})


// Funciones para calcular el plan personalizado

const customRisk = (value, time, bonds, shares, futures, cryptos) => ((((bonds/100)*value)*(assets[0].takeProfit))+(((shares/100)*value)*(assets[1].takeProfit))+(((futures/100)*value)*(assets[2].takeProfit))+(((cryptos/100)*value)*(assets[3].takeProfit)))*(time/12)+value;

const customTP = (bonds, shares, futures, cryptos) => ((bonds*assets[0].takeProfit)+(shares*assets[1].takeProfit)+(futures*assets[2].takeProfit)+(cryptos*assets[3].takeProfit));

const customSL = (bonds, shares, futures, cryptos) => ((bonds*assets[0].stopLoss)+(shares*assets[1].stopLoss)+(futures*assets[2].stopLoss)+(cryptos*assets[3].stopLoss));

function verificador(value, months, bonds, shares, futures, cryptos){
    if(bonds + shares + futures + cryptos !== 100){
        customCard.innerHTML = `
            <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title"><strong>RIESGO PERSONALIZADO</strong></h3>
                <span class="card-alert">¡El total de la suma de los porcentajes de cartera de cada activo debe ser igual a <strong>100%</strong>!</span>
                <button id="resetCard" class="btn btn-primary" onclick="location.reload();">Volver</button>
            </div>
        `
    } else {
        idFormCustom.reset()
        customCard.innerHTML = `
            <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title"><strong>RIESGO PERSONALIZADO</strong></h3>
                <h4 class="card-text"><strong>Valor inicial:</strong></h4>
                <span class="card-text">${value} USD</span>
                <h4 class="card-text"><strong>Tiempo de inversión:</strong></h4>
                <span class="card-text">${months} meses</span>
                <p class="card-text"><strong>Take Profit Objetivo<span class="clarification">*</span>:</strong> <span class="tp">${customTP(bonds, shares, futures, cryptos)}%</span></p>
                <p class="card-text"><strong>Riesgo<span class="clarification">*</span>:</strong> <span class="sl">-${customSL(bonds, shares, futures, cryptos)}%</span></p>
                <p class="card-text"><strong>% de cartera por activo:</strong></p>
                <p class="card-text card-item"><strong>Bonos:</strong> ${bonds}%</p>
                <p class="card-text card-item"><strong>Acciones</strong> ${shares}%</p>
                <p class="card-text card-item"><strong>Futuros:</strong> ${futures}%</p>
                <p class="card-text card-item"><strong>Criptomonedas:</strong> ${cryptos}%</p>
                <h4 class="card-text"><strong>Valor a recibir:</strong></h4>
                <span class="card-text tp">${customRisk(value, months, bonds, shares, futures, cryptos)} USD</span>
                <span class="clarification clarification--block">(*) Tasa Nominal Anual</span>
                <button id="resetCard" class="btn btn-primary" onclick="location.reload();">Volver</button>
                <a id="confirmOp" class="btn btn-primary" href="./404.html">Confirmar Operación</a>
            </div>
        `
    }
    
}

// Calcular plan personalizado

const idFormCustom = document.getElementById("idFormCustom");
const customCard = document.getElementById("customCard");

idFormCustom.addEventListener('submit', () => {
    const inputCustomValue = parseFloat(document.getElementById("inputCustomValue").value);
    const inputCustomMonths = parseInt(document.getElementById("inputCustomMonths").value);
    const inputBonds = parseInt(document.getElementById("inputBonds").value);
    const inputShares = parseInt(document.getElementById("inputShares").value);
    const inputFutures = parseInt(document.getElementById("inputFutures").value);
    const inputCryptos = parseInt(document.getElementById("inputCryptos").value);

    verificador(inputCustomValue, inputCustomMonths, inputBonds, inputShares, inputFutures, inputCryptos)

    // idFormCustom.reset()

    // customCard.innerHTML = `
    //     <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
    //     <div class="card-body">
    //         <h3 class="card-title"><strong>RIESGO PERSONALIZADO</strong></h3>
    //         <h4 class="card-text"><strong>Valor inicial:</strong></h4>
    //         <span class="card-text">${inputCustomValue} USD</span>
    //         <h4 class="card-text"><strong>Tiempo de inversión:</strong></h4>
    //         <span class="card-text">${inputCustomMonths} meses</span>
    //         <p class="card-text"><strong>Take Profit Objetivo<span class="clarification">*</span>:</strong> <span class="tp">${customTP(inputBonds, inputShares, inputFutures, inputCryptos)}%</span></p>
    //         <p class="card-text"><strong>Riesgo<span class="clarification">*</span>:</strong> <span class="sl">-${customSL(inputBonds, inputShares, inputFutures, inputCryptos)}%</span></p>
    //         <p class="card-text"><strong>% de cartera por activo:</strong></p>
    //         <p class="card-text card-item"><strong>Bonos:</strong> ${inputBonds}%</p>
    //         <p class="card-text card-item"><strong>Acciones</strong> ${inputShares}%</p>
    //         <p class="card-text card-item"><strong>Futuros:</strong> ${inputFutures}%</p>
    //         <p class="card-text card-item"><strong>Criptomonedas:</strong> ${inputCryptos}%</p>
    //         <h4 class="card-text"><strong>Valor a recibir:</strong></h4>
    //         <span class="card-text tp">${customRisk(inputCustomValue, inputCustomMonths, inputBonds, inputShares, inputFutures, inputCryptos)} USD</span>
    //         <span class="clarification clarification--block">(*) Tasa Nominal Anual</span>
    //         <button id="resetCard" class="btn btn-primary" onclick="location.reload();">Volver</button>
    //         <a id="confirmOp" class="btn btn-primary" href="./404.html">Confirmar Operación</a>
    //     </div>
    // `
})