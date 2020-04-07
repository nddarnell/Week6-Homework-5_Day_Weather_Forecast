$(document).ready(function(){
    let city ="";
    let state = "";
    let lat = "";
    let lon = "";
    let futureWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + state + "&units=imperial&appid=ce99efa490b0418e7d05fa61fdd66974"
    let currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&units=imperial&appid=ce99efa490b0418e7d05fa61fdd66974"
    



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
        let input = $("#formControlInput1")
        localStorage.setItem("City Choice", input.val())
        let stateSelection = $("#exampleFormControlSelect1")
        localStorage.setItem("State Choice", stateSelection.val())

        let cityReturn = localStorage.getItem("City Choice")
        let stateReturn = localStorage.getItem("State Choice")
        city = cityReturn
        state = stateReturn
        $("#cityName").text(city).append(", " + state)


        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + state + "&units=imperial&appid=ce99efa490b0418e7d05fa61fdd66974",
            method: "GET"
        })
        .then(function(future){
            console.log(future)
            //Day 1 Noon
            console.log(future.list[3])
            let iconDay1Code = future.list[3].weather[0].icon
            let iconURL = "https://openweathermap.org/img/w/" + iconDay1Code + ".png"
            let iconDay1 = $("<img>").attr("src", iconURL)
            $("#day1Temp").append(future.list[3].main.temp)
            $("#day1Humidity").append(future.list[3].main.humidity)
            $("#day1Wind").append(future.list[3].wind.speed)
            $("#day1Clouds").append(iconDay1)
            
            if (future.list[3].main.temp > 80){
                $("#day1Temp").attr("class", "list-group-item hot")
            }else if(future.list[3].main.temp < 50){
                $("#day1Temp").attr("class", "list-group-item cold")
            }else if(future.list[3].main.temp > 50){
                $("#day1Temp").attr("class", "list-group-item nice")
            }
            //Day 2 Noon
            console.log(future.list[11])
            let iconDay2Code = future.list[11].weather[0].icon
            let iconURL2 = "https://openweathermap.org/img/w/" + iconDay2Code + ".png"
            let iconDay2 = $("<img>").attr("src", iconURL2)
            $("#day2Temp").append(future.list[11].main.temp)
            $("#day2Humidity").append(future.list[11].main.humidity)
            $("#day2Wind").append(future.list[11].wind.speed)
            $("#day2Clouds").append(iconDay2)
            
            if (future.list[11].main.temp > 80){
                $("#day2Temp").attr("class", "list-group-item hot")
            }else if(future.list[11].main.temp < 50){
                $("#day2Temp").attr("class", "list-group-item cold")
            }else if(future.list[11].main.temp > 50){
                $("#day2Temp").attr("class", "list-group-item nice")
            }
            //Day 3 Noon
            console.log(future.list[19])
            let iconDay3Code = future.list[19].weather[0].icon
            let iconURL3 = "https://openweathermap.org/img/w/" + iconDay3Code + ".png"
            let iconDay3 = $("<img>").attr("src", iconURL3)
            $("#day3Temp").append(future.list[19].main.temp)
            $("#day3Humidity").append(future.list[19].main.humidity)
            $("#day3Wind").append(future.list[19].wind.speed)
            $("#day3Clouds").append(iconDay3)
            
            if (future.list[19].main.temp > 80){
                $("#day3Temp").attr("class", "list-group-item hot")
            }else if(future.list[19].main.temp < 50){
                $("#day3Temp").attr("class", "list-group-item cold")
            }else if(future.list[19].main.temp > 50){
                $("#day3Temp").attr("class", "list-group-item nice")
            }
            //Day 4 Noon
            console.log(future.list[27])
            let iconDay4Code = future.list[27].weather[0].icon
            let iconURL4 = "https://openweathermap.org/img/w/" + iconDay4Code + ".png"
            let iconDay4 = $("<img>").attr("src", iconURL4)
            $("#day4Temp").append(future.list[27].main.temp)
            $("#day4Humidity").append(future.list[27].main.humidity)
            $("#day4Wind").append(future.list[27].wind.speed)
            $("#day4Clouds").append(iconDay4)
            
            if (future.list[27].main.temp > 80){
                $("#day4Temp").attr("class", "list-group-item hot")
            }else if(future.list[27].main.temp < 50){
                $("#day4Temp").attr("class", "list-group-item cold")
            }else if(future.list[27].main.temp > 50){
                $("#day4Temp").attr("class", "list-group-item nice")
            }
            //Day 5 Noon
            console.log(future.list[35])
            let iconDay5Code = future.list[35].weather[0].icon
            let iconURL5 = "https://openweathermap.org/img/w/" + iconDay5Code + ".png"
            let iconDay5 = $("<img>").attr("src", iconURL5)
            $("#day5Temp").append(future.list[35].main.temp)
            $("#day5Humidity").append(future.list[35].main.humidity)
            $("#day5Wind").append(future.list[35].wind.speed)
            $("#day5Clouds").append(iconDay5)
            
            if (future.list[35].main.temp > 80){
                $("#day5Temp").attr("class", "list-group-item hot")
            }else if(future.list[35].main.temp < 50){
                $("#day5Temp").attr("class", "list-group-item cold")
            }else if(future.list[35].main.temp > 50){
                $("#day5Temp").attr("class", "list-group-item nice")
            }

        })
    
        // Below is current Weather conditions
        // Want to display temperature, humidity, wind, uv index
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&units=imperial&appid=ce99efa490b0418e7d05fa61fdd66974",
            method: "GET"
        })
        .then(function(current){
            console.log(current)
            // Cloud Icons
            let iconCode = current.weather[0].icon
            let iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png"
            let icon = $("<img>").attr("src", iconURL)
            $("#cityName").append(icon)
            // temp, humidity
            console.log(current.main.temp)
            console.log(current.main.humidity)
            $("#currentTemp").append(current.main.temp)
            if (current.main.temp > 80){
                $("#currentTemp").attr("class", "card-text hot")
            }else if(current.main.temp < 50){
                $("#currentTemp").attr("class", "card-text cold")
            }else if(current.main.temp > 50){
                $("#currentTemp").attr("class", "card-text nice")
            }

            $("#currentHum").append(current.main.humidity)
            // wind
            console.log(current.wind.speed)
            $("#currentWind").append(current.wind.speed)

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
                $("#currentUV").append(uv.value)
                
                if(uv.value < 2.9){
                    $("#currentUV").attr("class", "card-text uvLow")
                }
                else if(uv.value < 5.9){
                    $("#currentUV").attr("class", "card-text uvMed")
                }
                else if(uv.value < 7.9){
                    $("#currentUV").attr("class", "card-text uvHigh")
                }
                else if(uv.value < 10.9){
                    $("#currentUV").attr("class", "card-text uvVeryHigh")
                }
                else if(uv.value > 11){
                    $("#currentUV").attr("class", "card-text uvExt")
                }

            })
    
    
    
            
            

        })

        
    })


    // if statement highlighting temp based on temp... if temp = 40 set attribute class = cold???
});