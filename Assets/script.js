$(document).ready(function(){
    let city ="Seattle";
    let state = "Washington";
    let lat = "47.61";
    let lon = "-122.33";
    let futureWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + state + "&units=imperial&appid=ce99efa490b0418e7d05fa61fdd66974"
    let currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&units=imperial&appid=ce99efa490b0418e7d05fa61fdd66974"
    let uvIndex = "https://api.openweathermap.org/data/2.5/uvi?appid=ce99efa490b0418e7d05fa61fdd66974&lat=" + lat + "&lon=" + lon


    // Below is 5 day forecast noon weather conditions
    // Want to display Temperature, Humiditiy, Wind? Cloudy or not?
    $.ajax({
        url: futureWeather,
        method: "GET"
    })
    .then(function(response){
        console.log(response)
        //Day 1 Noon
        console.log(response.list[2])
        //Day 2 Noon
        console.log(response.list[10])
        //Day 3 Noon
        console.log(response.list[18])
        //Day 4 Noon
        console.log(response.list[26])
        //Day 5 Noon
        console.log(response.list[34])
    })

    // Below is current Weather conditions
    // Want to display temperature, humidity, wind, uv index
    $.ajax({
        url: currentWeather,
        method: "GET"
    })
    .then(function(current){
        console.log(current)
        // clouds - is .icon an image? Needs testing
        console.log(current.weather[0].description)
        // temp, humidity
        console.log(current.main.temp)
        console.log(current.main.humidity)
        // wind
        console.log(current.wind.speed)
        // uv index
        // youll want to grab this and append / add it as a text so lat = current.coord.lat
        console.log(current.coord.lon)
        console.log(current.coord.lat)
    })
    // Below is UV index
    $.ajax({
        url: uvIndex,
        method: "GET"
    })
    .then(function(uv){
        console.log(uv)
        console.log(uv.value)
    })


});