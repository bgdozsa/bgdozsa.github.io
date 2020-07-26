function getWeatherData() {
    let adatok =
    {
        "weathers": [
            {"dayNumber": 0, "temperature": -11.2},
            {"dayNumber": 1, "temperature": 14.4},
            {"dayNumber": 2, "temperature": 13.0},
            {"dayNumber": 3, "temperature": 17.3},
            {"dayNumber": 4, "temperature": 21.7},
            {"dayNumber": 5, "temperature": 18.2},
            {"dayNumber": 6, "temperature": 28.0}
        ],
        "offers": [
            {"upperLimit": 0, "offerMessage": "Ma forró csokit is árusítunk."},
            {"upperLimit": 15, "offerMessage": "Melegedj át egy teával nálunk!"},
            {"upperLimit": 20, "offerMessage": "Ma finom sütivel várunk."},
            {"upperLimit": 25, "offerMessage": "Ma fagyit is kínálunk."},
            {"upperLimit": 99, "offerMessage": "Hűtsd le magad egy jéghideg limonádéval!"}
        ]
    }
    return adatok
}

let data = getWeatherData()

function weatherWidget() {
    const day = document.querySelector("#day").value
    const temperatureDiv = document.querySelector("#temperature")
    const temperature = findWeather(day).temperature
    const offerMessage = findOffer(temperature).offerMessage

    temperatureDiv.innerHTML = COrF(temperature)
    temperatureDiv.innerHTML += "<br><span class='offer'>" + offerMessage + "</span>"

    const minDiv = document.querySelector("#min")
    minDiv.innerHTML = "Minimum: " + COrF(minTemperature())
    const maxDiv = document.querySelector("#max")
    maxDiv.innerHTML = "Maximum: " + COrF(maxTemperature())
    const avgDiv = document.querySelector("#avg")
    avgDiv.innerHTML = "Átlag: " + COrF(avgTemperature().toFixed(2))
}

function COrF(temperature) {
    const degree = document.querySelector("[name=degree]:checked").value
    if (degree == "c") {
        return String(temperature) + " &deg;C"
    } else {
        return String((temperature * 1.8 + 32).toFixed(2)) + "F"
    }
}

function findWeather(day) {
    for (let weather of data.weathers) {
        if (weather.dayNumber == day) {
            return weather
        } 
    }
}

function findOffer(temp) {
    for (let offer of data.offers) {
        if (temp <= offer.upperLimit) {
            return offer;
        }
    }
}


function minTemperature() {
    let min = data.weathers.length != 0 ? data.weathers[0].temperature : 0
    for (let i = 0; i < data.weathers.length; i++) {
        if (min > data.weathers[i].temperature) {
            min = data.weathers[i].temperature
        }        
    }
    return min
}


function maxTemperature() {
    let max = data.weathers.length != 0 ? data.weathers[0].temperature : 0
    for (let i = 0; i < data.weathers.length; i++) {
        if (max < data.weathers[i].temperature) {
            max = data.weathers[i].temperature
        }        
    }
    return max
}


function avgTemperature() {
    let avg = 0
    for (let i = 0; i < data.weathers.length; i++) {
        avg += data.weathers[i].temperature
    }
    return data.weathers.length != 0 ? avg / data.weathers.length : 0
}