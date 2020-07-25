let temperatures = [-11.2, 14.4, 13.0, 17.3, 21.7, 18.2, 28]
let temperatureUpperLimits = [0, 15, 20, 25, 99]
let offers = [
    "Ma forró csokit is árusítunk.",
    "Melegedj át egy teával nálunk!",
    "Ma finom sütivel várunk.",
    "Ma fagyit is kínálunk.",
    "Hűtsd le magad egy jéghideg limonádéval!"]


function weatherWidget() {
    const day = document.querySelector("#day").value
    const temperatureDiv = document.querySelector("#temperature")
    temperatureDiv.innerHTML = temperatures[day] + " &deg;C"

    for (let i = 0; i < temperatureUpperLimits.length; i++) {
        if (temperatures[day] <= temperatureUpperLimits[i]) {
            temperatureDiv.innerHTML += "<br>" + offers[i]
            break
        }
    }

    const minDiv = document.querySelector("#min")
    minDiv.innerHTML = "Minimum: " + minTemperature() + " &deg;C"
    const maxDiv = document.querySelector("#max")
    maxDiv.innerHTML = "Maximum: " + maxTemperature() + " &deg;C"
    const avgDiv = document.querySelector("#avg")
    avgDiv.innerHTML = "Átlag: " + avgTemperature().toFixed(2) + " &deg;C"
}


function minTemperature() {
    let min = temperatures.length != 0 ? temperatures[0] : 0
    for (let i = 0; i < temperatures.length; i++) {
        if (min > temperatures[i]) {
            min = temperatures[i]
        }        
    }
    return min
}


function maxTemperature() {
    let max = temperatures.length != 0 ? temperatures[0] : 0
    for (let i = 0; i < temperatures.length; i++) {
        if (max < temperatures[i]) {
            max = temperatures[i]
        }        
    }
    return max
}


function avgTemperature() {
    let avg = 0
    for (let i = 0; i < temperatures.length; i++) {
        avg += temperatures[i]
    }
    return temperatures.length != 0 ? avg / temperatures.length : 0
}