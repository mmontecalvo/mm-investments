

const highRisk = (value, time) => value*(0.30*time/365)+value

const mediumRisk = (value, time) => value*(0.15*time/365)+value

const lowRisk = (value, time) => value*(0.05*time/365)+value

function profit(value, risk, time) {
    switch(risk) {
        case "3":
            alert(`Valor invertido: ${value} USD\nRiesgo: ${risk}\nTNA: 30%\nTiempo de inversión: ${time} días\nValor recibido: ${highRisk(value,time).toFixed(2)} USD`)
            break
        case "2":
            alert(`Valor invertido: ${value} USD\nRiesgo: ${risk}\nTNA: 15%\nTiempo de inversión: ${time} días\nValor recibido: ${mediumRisk(value,time).toFixed(2)} USD`)
            break
        case "1":
            alert(`Valor invertido: ${value} USD\nRiesgo: ${risk}\nTNA: 5%\nTiempo de inversión: ${time} días\nValor recibido: ${lowRisk(value,time).toFixed(2)} USD`)
            break
        default:
            alert("Operacion no valida")
    }
}

let answer

do {
    let value, risk, time

    do{
        value = parseFloat(prompt("Ingrese la cantidad de dinero que desea invertir en USD (entre $1,000 - $1,000,000)."))
        risk = prompt("Nivel de riesgo dispuesto a asumir: \n 1- BAJO \n 2- MEDIO \n 3- ALTO")
        time = parseInt(prompt("Plazo en días (entre 30 y 365 días)"))

        if((isNaN(value)) || (value < 1000) || (value > 1000000)){
            alert("Por favor, ingrese un monto de dinero válido (entre $1,000 - $1,000,000)")
        }

        if(risk !== "3" && risk !== "2" && risk !== "1") {
            alert("Por favor, ingrese un nivel de riesgo válido: \n 1- BAJO \n 2- MEDIO \n 3- ALTO")
        }

        if((time < 30) || (time > 365)) {
            alert("Por favor, ingrese una valor de tiempo válido (entre 30 y 365 días)")
        }
    } while(((isNaN(value)) || (value < 1000) || (value > 1000000)) || (risk !== "3" && risk !== "2" && risk !== "1") ||((time < 30) || (time > 365)))

    profit(value, risk, time)

    do {
        answer = prompt("¿Desea ingresar otra operacion?").toLowerCase()
    } while(answer != "si" && answer != "no")

} while(answer != "no")