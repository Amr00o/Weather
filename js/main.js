// Today var
let todayName = document.getElementById("todayName")
let todayNumber = document.getElementById("todayNumber")
let todayMonth = document.getElementById("todayMonth")
let todayLocation = document.getElementById("todayLocation")
let todayTemp = document.getElementById("todayTemp")
let todayImg = document.getElementById("todayImg")
let todayText = document.getElementById("todayText")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("windDirection")
let weatherData

// Next data
let nextDay = document.getElementsByClassName("nextDay")
let nextMaxTemp = document.getElementsByClassName("nextMaxTemp")
let nextMinTemp = document.getElementsByClassName("nextMinTemp")
let nextImg = document.getElementsByClassName("nextImg")
let nextText = document.getElementsByClassName("nextText")

// search
let searchInput = document.getElementById("search")



// API
async function getData(cityName) {
    let weatherResponse = await fetch(`//api.weatherapi.com/v1/forecast.json?key=d00279ffd09e41c1bb895906232308&q=${cityName}&days=3 `)
    let weatherData = await weatherResponse.json()
    return weatherData
}


// today data
function displayToday(data) {

    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleString("en-US",{weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayImg.setAttribute("src",data.current.condition.icon)
    todayText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
}

// next days data
function displayNextData(data) {
    let forecastData = data.forecast.forecastday
    for (let i = 0; i < 2 ; i++) {
        let nextDate = new Date(forecastData[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
        nextImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        nextText[i].innerHTML = forecastData[i+1].day.condition.text
        
    }
    
}
// start app
async function startApp(city="Cairo") {
   let weatherData = await getData(city)
   if (!weatherData.error) {
    displayToday(weatherData)
    displayNextData(weatherData)
   }

}
startApp()

searchInput.addEventListener("input", function(){
    startApp(searchInput.value)
})