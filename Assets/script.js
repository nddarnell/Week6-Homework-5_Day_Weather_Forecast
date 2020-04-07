$(document).ready(function(){
    let city ="Seattle";
    let state = "Washington";
    let lat = "";
    let lon = "";
    let futureWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + state + "&units=imperial&appid=ce99efa490b0418e7d05fa61fdd66974"
    let currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&units=imperial&appid=ce99efa490b0418e7d05fa61fdd66974"
    let uvIndex = "https://api.openweathermap.org/data/2.5/uvi?appid=ce99efa490b0418e7d05fa61fdd66974&lat=" + lat + "&lon=" + lon



    function todaysDate(){
        $("#todaysDate").text(moment().format('MMMM Do YYYY'))
        startDate = moment().format('MMMM Do YYYY')
        let nextDay = moment(startDate, "MMMM Do YYYY").add(1, 'days').format("MMMM Do YYYY")
        let next2Days = moment(startDate, "MMMM Do YYYY").add(2, 'days').format("MMMM Do YYYY")
        let next3Days = moment(startDate, "MMMM Do YYYY").add(3, 'days').format("MMMM Do YYYY")
        let next4Days = moment(startDate, "MMMM Do YYYY").add(4, 'days').format("MMMM Do YYYY")
        let next5Days = moment(startDate, "MMMM Do YYYY").add(5, 'days').format("MMMM Do YYYY")
        $("#day1").text(nextDay)
        $("#day2").text(next2Days)
        $("#day3").text(next3Days)
        $("#day4").text(next4Days)
        $("#day5").text(next5Days)
    }
    todaysDate();
    // Below is 5 day forecast noon weather conditions
    // Want to display Temperature, Humiditiy, Wind? Cloudy or not?
    // wrap in search button
    
    $(".search").on("click", function(){
        $.ajax({
            url: futureWeather,
            method: "GET"
        })
        .then(function(future){
            console.log(future)
            //Day 1 Noon
            console.log(future.list[3])
            //Day 2 Noon
            console.log(future.list[11])
            //Day 3 Noon
            console.log(future.list[19])
            //Day 4 Noon
            console.log(future.list[27])
            //Day 5 Noon
            console.log(future.list[35])
            

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
            lat = current.coord.lat
            lon = current.coord.lon
            
    
            // Below is UV index
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=ce99efa490b0418e7d05fa61fdd66974&lat=" + lat + "&lon=" + lon,
                method: "GET"
            })
            .then(function(uv){
                console.log(uv)
                console.log(uv.value)
            })
    
    
    
            // search button working
            
            // changes icon of weather
            let iconCode = current.weather[0].icon
            let iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png"
            let icon = $("<img>").attr("src", iconURL)
            $("#cityName").append(icon)
        })

        
    })


    // if statement highlighting temp based on temp... if temp = 40 set attribute class = cold???
});