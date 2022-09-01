// HEADER DE PRECIOS DE ACTIVOS

const assetPrices = document.getElementById('assetPrices');
const keyToken = "9a105e96895f672842db646035a5851e0c76fc2d";
const imgShares = ["https://assets.stickpng.com/images/580b57fcd9996e24bc43c516.png","https://www.pngmart.com/files/10/Tesla-Logo-PNG-Clipart.png"];
const imgFutures = ["https://cdn-icons-png.flaticon.com/128/6727/6727443.png","https://cdn-icons-png.flaticon.com/512/44/44781.png"];
const imgCryptos = ["https://cdn-icons-png.flaticon.com/512/25/25180.png","https://assets.stickpng.com/images/5a7593f664538c292dec1bbe.png"];

fetch(`https://api.tiingo.com/iex/?tickers=aapl,tsla&token=${keyToken}`)
.then(respuesta => respuesta.json())
.then((data) => {
    data.forEach((asset, index) => {
        assetPrices.innerHTML += `
        <div class="asset">
            <picture class="asset__logo">
                <img src="${imgShares[index]}" alt="">
            </picture>
            <strong class="asset__ticker">${asset.ticker}</strong>
            <p class="asset__price">${asset.last}</p>
        </div>
        `
    })
})

fetch(`https://api.tiingo.com/tiingo/fx/top?tickers=xauusd,eurusd&token=${keyToken}`)
.then(respuesta => respuesta.json())
.then((data) => {
    data.forEach((asset, index) => {
        assetPrices.innerHTML += `
        <div class="asset">
            <picture class="asset__logo">
                <img src="${imgFutures[index]}" alt="">
            </picture>
            <strong class="asset__ticker">${asset.ticker.toUpperCase()}</strong>
            <p class="asset__price">${asset.askPrice}</p>
        </div>
        `
    })
})

fetch(`https://api.tiingo.com/tiingo/crypto/prices?tickers=btcusd,ethusd&token=${keyToken}`)
.then(respuesta => respuesta.json())
.then((data) => {
    data.forEach((asset, index) => {
        assetPrices.innerHTML += `
        <div class="asset">
            <picture class="asset__logo">
                <img src="${imgCryptos[index]}" alt="">
            </picture>
            <strong class="asset__ticker">${asset.ticker.toUpperCase()}</strong>
            <p class="asset__price">${asset.priceData[0].close.toFixed(2)}</p>
        </div>
        `
    })
})

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

const consultations =  JSON.parse(localStorage.getItem("consultations")) ?? []

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

// FOR PARA GENERAR ALERTA EN LOS BOTONES DE CONFIRMAR OPERACIÓN
function btnAlert(array){
    for (let i = 0; i < array.length; i++) {
        array[i].onclick = () => {
            Swal.fire({
                html:
                '<p class="alert-text">Para confirmar la operación debes ingresar a tu cuenta.</P>',
                icon: 'warning',
                iconColor: '#01C5CE',
                showCancelButton: true,
                confirmButtonColor: '#014776',
                cancelButtonColor: '#01C5CE',
                confirmButtonText: '<a class="alert-btn" href="./login.html">Ingresar</a>',
                cancelButtonText: '<span class="alert-btn">Volver</span>'
            })
        }
    }
}

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
                    <button class="confirmOp btn btn-primary">Confirmar Operación</button>
                </div>
            `
            // GENERO ALERTA PARA LOS BOTONES DE CONFIRMAR OPERACIÓN
            const confirmOp = document.getElementsByClassName('confirmOp');
            btnAlert(confirmOp);
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
        Swal.fire({
            html:
            '<h3 class="alert-title"><strong>ERROR</strong></h3>' +
            '<p class="alert-text">¡El total de la suma de los porcentajes de cartera de cada activo debe ser igual a <strong>100%</strong>!</P>',
            icon: 'error',
            iconColor: '#AF173B',
            showCancelButton: false,
            confirmButtonColor: '#014776',
            confirmButtonText: '<span class="alert-btn">Ok</span>',
            width: '50rem',
        })
        customForm.reset()
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
                <button class="confirmOp btn btn-primary">Confirmar Operación</button>
            </div>
        `
        // GENERO ALERTA PARA LOS BOTONES DE CONFIRMAR OPERACIÓN
        const confirmOp = document.getElementsByClassName('confirmOp');
        btnAlert(confirmOp);

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
    e.preventDefault();
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
                    <button class="confirmOp btn btn-primary">Confirmar Operación</button>
                    <button id="eliminate" class="btn btn-primary">Eliminar</button>
                </div>
            </div>
        `
        // GENERO ALERTA PARA LOS BOTONES DE CONFIRMAR OPERACIÓN
        const confirmOp = document.getElementsByClassName('confirmOp');
        btnAlert(confirmOp);  
    })

    arrayStorage.forEach((consultation, index) => {
        const historyCard = document.getElementById(`historyCard${index}`)

        historyCard.children[0].children[13].addEventListener('click', () => {
            Toastify({
                text: "Operación eliminada.",
                className: "alert-text",
                style: {
                  background: "#AF173B",
                  color: "#E7E7E7",
                }
            }).showToast();

            historyCard.remove() // DOM
            consultations.splice(index, 1) // ARRAY
            localStorage.setItem('consultations', JSON.stringify(consultations)) // LOCAL STORAGE
        })
    })
})
