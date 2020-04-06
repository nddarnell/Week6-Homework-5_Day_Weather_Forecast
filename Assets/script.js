$(document).ready(function(){
    let city ="Seattle";
    let state = "wa";
    let country = "US";
    // not currently working :(
    let weather = "api.openweathermap.org/data/2.5/forecast/daily?q=Seattle,Wa&cnt=5&appid=ce99efa490b0418e7d05fa61fdd66974";
    // syntax pulled straight from openweather api.openweathermap.org/data/2.5/forecast/daily?q={city name},{state}&cnt={cnt}&appid={your api key}

    $.ajax({
        url: weather,
        method: "GET"
    })
    .then(function(response){
        console.log(response)
    })



});