// CLASE PARA GENERAR LOS ACTIVOS DE INVERSIÓN

class Asset {
    constructor(name, takeProfit, stopLoss) {
        this.name = name.toLowerCase();
        this.takeProfit = parseFloat(takeProfit)/100;
        this.stopLoss = parseFloat(stopLoss)/100;
    }
}

// ARRAY DE LOS ACTIVOS DE INVERSIÓN

const assets = [];

assets.push(new Asset("bonos", 2, 0.5));
assets.push(new Asset("acciones", 10, 2.5));
assets.push(new Asset("futuros", 20, 5));
assets.push(new Asset("criptomonedas", 60, 30));

// CLASE PARA CREAR LOS PLANES DE INVERSIÓN PREDEFINIDOS

class Plan {
    constructor(name, bonds, shares, futures, cryptos){
        this.name = name;
        this.bonds = parseFloat(bonds);
        this.shares = parseFloat(shares);
        this.futures = parseFloat(futures);
        this.cryptos = parseFloat(cryptos);
    }

    // MÉTODO QUE CALCULA EL PORCENTAJE POTENCIAL DE GANANCIA DEL PLAN
    takeProfit(){
        return (this.bonds*assets[0].takeProfit)+(this.shares*assets[1].takeProfit)+(this.futures*assets[2].takeProfit)+(this.cryptos*assets[3].takeProfit)
    }

    // MÉTODO QUE CALCULA EL PORCENTAJE POTENCIAL DE PÉRDIDA DEL PLAN
    stopLoss(){
        return (this.bonds*assets[0].stopLoss)+(this.shares*assets[1].stopLoss)+(this.futures*assets[2].stopLoss)+(this.cryptos*assets[3].stopLoss)
    }
}

// ARRAY DE PLANES DE INVERSIÓN PREDEFINIDOS

const plans = [];

plans.push(new Plan("Riesgo bajo", 70, 20, 10, 0));
plans.push(new Plan("Riesgo medio", 50, 20, 15, 15));
plans.push(new Plan("Riesgo alto", 30, 15, 15, 40));

// FUNCIONES PARA CALCULAR EL DINERO POTENCIAL A RECIBIR SEGÚN CADA PLAN PREDEFINIDO

// RIESGO BAJO
const lowRisk = (value, time) => ((((plans[0].bonds/100*value)*(assets[0].takeProfit))+((plans[0].shares/100*value)*(assets[1].takeProfit))+((plans[0].futures/100*value)*(assets[2].takeProfit))+((plans[0].cryptos/100*value)*(assets[3].takeProfit)))*(time/12)+value).toFixed(2)

// RIESGO MEDIO
const mediumRisk = (value, time) => ((((plans[1].bonds/100*value)*(assets[0].takeProfit))+((plans[1].shares/100*value)*(assets[1].takeProfit))+((plans[1].futures/100*value)*(assets[2].takeProfit))+((plans[1].cryptos/100*value)*(assets[3].takeProfit)))*(time/12)+value).toFixed(2)

// RIESGO ALTO
const highRisk = (value, time) => ((((plans[2].bonds/100*value)*(assets[0].takeProfit))+((plans[2].shares/100*value)*(assets[1].takeProfit))+((plans[2].futures/100*value)*(assets[2].takeProfit))+((plans[2].cryptos/100*value)*(assets[3].takeProfit)))*(time/12)+value).toFixed(2)

// CONDICIONAL PARA APLICAR LA FUNCIÓN CORRESPONDIENTE A CADA PLAN PREDEFINIDO
function riskCalculator(name, value, time){
    let result = "";
    if (name === "RIESGO BAJO"){
        result = lowRisk(value, time);
        return result;
    } else if (name === "RIESGO MEDIO"){
        result = mediumRisk(value, time);
        return result;
    } else if (name === "RIESGO ALTO"){
        result = highRisk(value, time);
        return result;
    } else {
        console.log("riskCalculator Error")
    }
}

// CREACIÓN/CONSULTA DEL STORAGE

class Consultation {
    constructor(value, time, tp, sl, bonds, shares, futures, cryptos, result) {
        this.value = value;
        this.time = time;
        this.tp = tp;
        this.sl = sl;
        this.bonds = bonds;
        this.shares = shares;
        this.futures = futures;
        this.cryptos = cryptos;
        this.result = result;
    }
}

let consultations = []

if(localStorage.getItem('consultations')) {
    tareas =  JSON.parse(localStorage.getItem('consultations'));
} else {
    localStorage.setItem('consultations', JSON.stringify(consultations));
}

// GENERACIÓN DE CARDS DE LOS PLANES PREDEFINIDOS

const container = document.getElementById("container");
const cards =[] // ARRAY PARA GUARDAR EL NOMBRE (ID) DE CADA CARD, PARA LUEGO PODER APLICAR EL forEach()

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
    cards.push(`card${index}`)
})

// CREACIÓN DEL FORMULARIO PARA INGRESAR LOS VALORES DE LA CONSULTA

cards.forEach((name, index) => {
    const btn = document.getElementById(`btn${index}`);
    const card = document.getElementById(name);
    const planName = plans[index].name.toUpperCase(); // GUARDO NOMBRE DEL PLAN PARA PODER APLICAR LA FUNCIÓN DE RIESGO CORRESPONDIENTE

    btn.addEventListener('click', () => {
        card.innerHTML = `
            <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title"><strong>${planName}</strong></h3>
                <form id="planForm${index}">
                    <div class="mb-3">
                        <label for="input${index}Value" class="card-text"><strong>Valor a invertir: <span class="clarification">(USD)</span></strong></label>
                        <input type="number" class="form-control card-text" id="input${index}Value" placeholder="Entre $1,000 - $1,000,000" name="number" min="1000" max="1000000" step="0.01" required>
                    </div>
                    <div class="mb-3">
                        <label for="input${index}Months" class="card-text"><strong>Plazo de tiempo: <span class="clarification">(meses)</span></strong></label>
                        <input type="number" class="form-control card-text" id="input${index}Months" placeholder="Entre 1 - 12 meses" name="number" min="1" max="12" step="1" required>
                    </div>
                    <button id="resetCard" class="btn btn-primary" onclick="location.reload();">Volver</button>
                    <button type="submit" id="btnCalculate${index}" class="btn btn-primary">Calcular</button>
                </form>
            </div>
        `
    
        // RESPUESTA AL USUARIO CON LOS VALORES INGRESADOS EN EL FORMULARIO
    
        const planForm = document.getElementById(`planForm${index}`);
        let inputValue = "";
        let inputMonths = "";
    
        planForm.onsubmit = () => {
            inputValue = parseFloat(document.getElementById(`input${index}Value`).value);
            inputMonths = parseInt(document.getElementById(`input${index}Months`).value);
            card.innerHTML = `
                <img src="https://profesionalesyempresarios.com/wp-content/uploads/2022/04/motivosparainvertr.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title"><strong>${planName}</strong></h3>
                    <h4 class="card-text"><strong>Valor inicial:</strong></h4>
                    <span class="card-text">${inputValue} USD</span>
                    <h4 class="card-text"><strong>Tiempo de inversión:</strong></h4>
                    <span class="card-text">${inputMonths} meses</span>
                    <h4 class="card-text"><strong>Valor a recibir:</strong></h4>
                    <span class="card-text tp">${riskCalculator(planName, inputValue, inputMonths)} USD</span>
                    <button id="resetCard" class="btn btn-primary" onclick="location.reload();">Volver</button>
                    <a id="confirmOp" class="btn btn-primary" href="./404.html">Confirmar Operación</a>
                </div>
            `
        }
    })
})

// FUNCIONES PARA CALCULAR UN PLAN PERSONALIZADO POR EL USUARIO

// FUNCIÓN PARA CALCULAR EL DINERO POTENCIAL A RECIBIR
const customRisk = (value, time, bonds, shares, futures, cryptos) => ((((bonds/100)*value)*(assets[0].takeProfit))+(((shares/100)*value)*(assets[1].takeProfit))+(((futures/100)*value)*(assets[2].takeProfit))+(((cryptos/100)*value)*(assets[3].takeProfit)))*(time/12)+value;

// FUNCIÓN QUE CALCULA EL PORCENTAJE POTENCIAL DE GANANCIA DEL PLAN
const customTP = (bonds, shares, futures, cryptos) => ((bonds*assets[0].takeProfit)+(shares*assets[1].takeProfit)+(futures*assets[2].takeProfit)+(cryptos*assets[3].takeProfit));

// FUNCIÓN QUE CALCULA EL PORCENTAJE POTENCIAL DE PÉRDIDA DEL PLAN
const customSL = (bonds, shares, futures, cryptos) => ((bonds*assets[0].stopLoss)+(shares*assets[1].stopLoss)+(futures*assets[2].stopLoss)+(cryptos*assets[3].stopLoss));

// VERIFICADOR PARA COMPROBAR QUE LA SUMA DE LOS PORCENTAJES INGRESADOS POR EL USUARIO DE 100%
function verificador(value, months, bonds, shares, futures, cryptos){
    if(bonds + shares + futures + cryptos !== 100){
        customCard.innerHTML = `
            <div class="card-body">
                <h3 class="card-title"><strong>RIESGO PERSONALIZADO</strong></h3>
                <span class="card-alert">¡El total de la suma de los porcentajes de cartera de cada activo debe ser igual a <strong>100%</strong>!</span>
                <button id="resetCard" class="btn btn-primary" onclick="location.reload();">Volver</button>
            </div>
        `
    } else { // SI LOS DATOS SON CORRECTOS RESETEO EL FORM Y CREO LA CARD DEL RESULTADO DE LA CONSULTA
        customForm.reset()
        customCard.innerHTML = `
            <div class="card-body">
                <h3 class="card-title"><strong>RIESGO PERSONALIZADO</strong></h3>
                <h4 class="card-text"><strong>Valor inicial:</strong> <span class="card-text">${value} USD</span></h4>
                <h4 class="card-text"><strong>Tiempo de inversión:</strong> <span class="card-text">${months} meses</span></h4>
                <p class="card-text"><strong>Take Profit Objetivo<span class="clarification">*</span>:</strong> <span class="tp">${customTP(bonds, shares, futures, cryptos).toFixed(2)}%</span></p>
                <p class="card-text"><strong>Riesgo<span class="clarification">*</span>:</strong> <span class="sl">-${customSL(bonds, shares, futures, cryptos).toFixed(2)}%</span></p>
                <p class="card-text"><strong>% de cartera por activo:</strong></p>
                <p class="card-text card-item"><strong>Bonos:</strong> ${bonds}%</p>
                <p class="card-text card-item"><strong>Acciones</strong> ${shares}%</p>
                <p class="card-text card-item"><strong>Futuros:</strong> ${futures}%</p>
                <p class="card-text card-item"><strong>Criptomonedas:</strong> ${cryptos}%</p>
                <h4 class="card-text"><strong>Valor a recibir:</strong> <span class="card-text tp">${customRisk(value, months, bonds, shares, futures, cryptos).toFixed(2)} USD</span></h4>
                <span class="clarification clarification--block">(*) Tasa Nominal Anual</span>
                <button id="resetCard" class="btn btn-primary" onclick="location.reload();">Volver</button>
                <a id="confirmOp" class="btn btn-primary" href="./404.html">Confirmar Operación</a>
            </div>
        `
        // ACTUALIZACIÓN DEL STORAGE
        const consultation = new Consultation(value, months, customTP(bonds, shares, futures, cryptos).toFixed(2), customSL(bonds, shares, futures, cryptos).toFixed(2), bonds, shares, futures, cryptos, customRisk(value, months, bonds, shares, futures, cryptos).toFixed(2));

        consultations.push(consultation);

        localStorage.setItem('consultations', JSON.stringify(consultations));
    }
    
}

// FUNCIONALIDAD DEL FORMULARIO DE LA CARD DE RIESGO PERSONALIZADO

const customForm = document.getElementById("customForm");
const customCard = document.getElementById("customCard");

customForm.addEventListener('submit', (e) => {
    const dataForm = new FormData(e.target)
    // PASO LOS DATOS DEL FORMULARIO A FORMATO DE NÚMEROS PARA EL VERIFICADOR
    const inputCustomValue = parseFloat(dataForm.get("value"));
    const inputCustomMonths = parseInt(dataForm.get("months"));
    const inputBonds = parseInt(dataForm.get("inputBonds"));
    const inputShares = parseInt(dataForm.get("inputShares"));
    const inputFutures = parseInt(dataForm.get("inputFutures"));
    const inputCryptos = parseInt(dataForm.get("inputCryptos"));

    verificador(inputCustomValue, inputCustomMonths, inputBonds, inputShares, inputFutures, inputCryptos);
})

// CARD DE ÚLTIMA CONSULTA REALIZADA POR EL USUARIO

const historyBtn = document.getElementById("historyBtn")
const history = document.getElementById("history")

historyBtn.addEventListener('click', () => {
    const arrayStorage = JSON.parse(localStorage.getItem('consultations'))

    history.innerHTML = ""

    arrayStorage.forEach((consultation, index) => {
        history.innerHTML += `
        <div id="historyCard${index}" class="card custom-card">
            <div class="card-body">
                <h3 class="card-title"><strong>RIESGO PERSONALIZADO</strong></h3>
                <h4 class="card-text"><strong>Valor inicial:</strong> <span class="card-text">${consultation.value} USD</span></h4>
                <h4 class="card-text"><strong>Tiempo de inversión:</strong> <span class="card-text">${consultation.time} meses</span></h4>
                <p class="card-text"><strong>Take Profit Objetivo<span class="clarification">*</span>:</strong> <span class="tp">${consultation.tp}%</span></p>
                <p class="card-text"><strong>Riesgo<span class="clarification">*</span>:</strong> <span class="sl">-${consultation.sl}%</span></p>
                <p class="card-text"><strong>% de cartera por activo:</strong></p>
                <p class="card-text card-item"><strong>Bonos:</strong> ${consultation.bonds}%</p>
                <p class="card-text card-item"><strong>Acciones</strong> ${consultation.shares}%</p>
                <p class="card-text card-item"><strong>Futuros:</strong> ${consultation.futures}%</p>
                <p class="card-text card-item"><strong>Criptomonedas:</strong> ${consultation.cryptos}%</p>
                <h4 class="card-text"><strong>Valor a recibir:</strong> <span class="card-text tp">${consultation.result} USD</span></h4>
                <span class="clarification clarification--block">(*) Tasa Nominal Anual</span>
                <a id="confirmOp" class="btn btn-primary" href="./404.html">Confirmar Operación</a>
                <button id="eliminate" class="btn btn-primary">Eliminar</button>
            </div>
        </div>
    `
    })

    arrayStorage.forEach((consultation, index) => {
        const historyCard = document.getElementById(`historyCard${index}`)

        historyCard.children[0].children[13].addEventListener('click', () => {
            historyCard.remove() //DOM
            consultations.splice(index, 1) //Array
            localStorage.setItem('consultations', JSON.stringify(consultations)) //Local storage
        })
    })
})