/*Így kapom meg az adatokat*/
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

    /*hőmérséklet objektum adattömbjének feltöltése*/
    for (let i = 0; i < data.weathers.length; i++) {
        hom.ertekek[i] = data.weathers[i].temperature;
    }
    const minDiv = document.querySelector("#min")
    minDiv.innerHTML = "Minimum: " + COrF(hom.minTemperature())
    const maxDiv = document.querySelector("#max")
    maxDiv.innerHTML = "Maximum: " + COrF(hom.maxTemperature())
    const avgDiv = document.querySelector("#avg")
    avgDiv.innerHTML = "Átlag: " + COrF(hom.avgTemperature().toFixed(2))
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


/*hőmérséklet objektum*/
let hom = {
    ertekek: [],
    minTemperature: function() { return Math.min.apply(null, this.ertekek) },
    maxTemperature: function() { return Math.max.apply(null, this.ertekek) },
    avgTemperature: function() {
        let avg = 0
        for (let i = 0; i < this.ertekek.length; i++) {
            avg += this.ertekek[i]
        }
        return this.ertekek.length != 0 ? avg / this.ertekek.length : 0
    }
}

