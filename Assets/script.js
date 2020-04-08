$(document).ready(function(){
    let city ="";
    let state = "";
    let lat = "";
    let lon = "";
    let apiKey = "ce99efa490b0418e7d05fa61fdd66974";


    //setting date header on the cards
    function todaysDate(){
        $("#todaysDate").text(moment().format('dddd, MMMM Do YYYY'))
        startDate = moment().format('MMMM Do YYYY')
        let nextDay = moment(startDate, "MMMM Do YYYY").add(1, 'days').format("MMMM Do YYYY")
        let next2Days = moment(startDate, "MMMM Do YYYY").add(2, 'days').format("MMMM Do YYYY")
        let next3Days = moment(startDate, "MMMM Do YYYY").add(3, 'days').format("MMMM Do YYYY")
        let next5Days = moment(startDate, "MMMM Do YYYY").add(5, 'days').format("MMMM Do YYYY")
        let next4Days = moment(startDate, "MMMM Do YYYY").add(4, 'days').format("MMMM Do YYYY")
        $("#day1").text(nextDay)
        $("#day2").text(next2Days)
        $("#day3").text(next3Days)
        $("#day4").text(next4Days)
        $("#day5").text(next5Days)
    }
    todaysDate();
    // setting everything to hide if the local storage is empty
    if (localStorage.getItem("City Choice")) {
        console.log("yes")
        getData()
    }else{
      $("#mainCard").attr("class", "col-sm-12 hidden")
      $("#future-temps").attr("class", "row hidden")
    }
    // on click button to set storage
    $("#search").on("click", function(){
      if(localStorage.getItem("City Choice")){
        addToPast(localStorage.getItem("City Choice"), localStorage.getItem("State Choice"))
      }
      let input = $("#formControlInput1")
      localStorage.setItem("City Choice", input.val())
      let stateSelection = $("#exampleFormControlSelect1")
      localStorage.setItem("State Choice", stateSelection.val())

        
        getData()
        
    })

    // function adding local storage to past searches
    function addToPast(city, state){
      var pastSearches = [];
      if (localStorage.getItem("past-searches") != null){
        pastSearches = JSON.parse(localStorage.getItem("past-searches"));
        console.log(pastSearches.length)
        console.log({city: city, state: state});
        pastSearches.push({city: city, state: state});
        console.log(pastSearches);
        if(pastSearches.length>5){
          pastSearches.shift();
        }
        localStorage.setItem("past-searches", JSON.stringify(pastSearches));
      }else{
        pastSearches.push({city: city, state: state});
          console.log({city: city, state: state});
          console.log(pastSearches);
          localStorage.setItem("past-searches", JSON.stringify(pastSearches));
      }
    }
    // function adding locally stored searches to buttons
    function pastBtns(){
      var pastSearches = [];
      if (localStorage.getItem("past-searches") != null){
        pastSearches = JSON.parse(localStorage.getItem("past-searches"));
        var recentFirst = pastSearches.reverse();
        recentFirst.forEach((entry) => {
          //console.log(entry)
          var newBtn = "<button id='"+entry.city+"_"+entry.state+"' class='btn btn-secondary col mb-2 mt-1 past-btn'>"+ entry.city+", "+entry.state+"</button>"
          $("#past-searches").append(newBtn)
        });
      }
    }
    pastBtns()

    $(".past-btn").on("click", function(){
      console.log(this.id)
      var past = this.id.split("_")
      console.log(past[0])
      console.log(past[1])
      if(localStorage.getItem("City Choice")){
        addToPast(localStorage.getItem("City Choice"), localStorage.getItem("State Choice"))
      }

      getData(past[0], past[1]);

    })
    // clearing everything
    $("#clear-btn").on("click", function(){
      localStorage.removeItem("City Choice");
      localStorage.removeItem("State Choice");
      localStorage.removeItem("past-searches");

    })
    // main function to do api calls
    function getData(city=localStorage.getItem("City Choice"), state=localStorage.getItem("State Choice")){
        city = city;
        localStorage.setItem("City Choice", city)
        state = state;
        localStorage.setItem("State Choice",state)
        $("#cityName")
          .text(city)
          .append(", " + state);

        // Below is current Weather conditions
        // Want to display temperature, humidity, wind, uv index
        $.ajax({
          url:
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "," +
            state +
            ",USA&units=imperial&appid=" +
            apiKey,
          method: "GET",
        }).then(function (current) {
          console.log(current);
          // Cloud Icons
          let iconCode = current.weather[0].icon;
          let iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
          let icon = $("<img data-toggle='tooltip'data-placement='right' title='"+ current.weather[0].description +"'>").attr("src", iconURL);
          $("#cityName").append(icon);

          console.log(current.weather[0].description)
          

          // temp, humidity
          console.log(current.main.temp);
          console.log(current.main.humidity+"%");
          $("#currentTemp").append(current.main.temp + "°F");
          if (current.main.temp > 80) {
            $("#currentTemp").attr("class", "card-text hot");
          } else if (current.main.temp < 50) {
            $("#currentTemp").attr("class", "card-text cold");
          } else if (current.main.temp > 50) {
            $("#currentTemp").attr("class", "card-text nice");
          }
          // changes jumbotron background
          if (current.weather[0].main === "Clear"){
            $("#jumbotronbg").attr("class", "jumbotron sunnyBG")
          }
          else if (current.weather[0].main === "Clouds"){
            $("#jumbotronbg").attr("class", "jumbotron fewScatBG")
          }
          else if (current.weather[0].main === "Rain" || current.weather[0].main === "Drizzle") {
            $("#jumbotronbg").attr("class", "jumbotron rainShowerBG")
          }
          else if (current.weather[0].main === "Thunderstorm") {
            $("#jumbotronbg").attr("class", "jumbotron thunderBG")
          }
          else if (current.weather[0].main === "Snow") {
            $("#jumbotronbg").attr("class", "jumbotron snowBG")
          }

          $("#currentHum").append(current.main.humidity+"%");
          // wind
          console.log(current.wind.speed+" mph");
          $("#currentWind").append(current.wind.speed+" mph");

          console.log(current.coord.lon);
          console.log(current.coord.lat);
          lat = current.coord.lat;
          lon = current.coord.lon;

          // Below is UV index from onecall and not forecast api anymore
          $.ajax({
            url:
              "https://api.openweathermap.org/data/2.5/onecall?lat=" +
              lat +
              "&lon=" +
              lon +
              "&units=imperial&appid=" +
              apiKey,
            method: "GET",
          }).then(function (onecall) {
            console.log(onecall);
            $("#currentUV").append(onecall.current.uvi);

            if (onecall.current.uvi < 2.9) {
              $("#currentUV").attr("class", "card-text uvLow");
            } else if (onecall.current.uvi < 5.9) {
              $("#currentUV").attr("class", "card-text uvMed");
            } else if (onecall.current.uvi < 7.9) {
              $("#currentUV").attr("class", "card-text uvHigh");
            } else if (onecall.current.uvi < 10.9) {
              $("#currentUV").attr("class", "card-text uvVeryHigh");
            } else if (onecall.current.uvi > 11) {
              $("#currentUV").attr("class", "card-text uvExt");
            }
            // for loop takes care of all days ahead now instead of each individual class being filled in
            for(var i = 1; i < 6; i++){
              var futureDay = onecall.daily[i]

              
              console.log(futureDay);
              let iconDay1Code = futureDay.weather[0].icon;
              let iconURL =
                "https://openweathermap.org/img/w/" + iconDay1Code + ".png";
              let iconDay1 = $("<img>").attr("src", iconURL);
              $("#day"+i+"Temp").append(futureDay.temp.day + "°F");
              $("#day"+i+"Humidity").append(futureDay.humidity+"%");
              $("#day"+i+"Wind").append(futureDay.wind_speed+" mph");
              $("#day"+i+"Clouds").append(iconDay1);

              if (futureDay.temp.day > 80) {
                $("#day"+i+"Temp").attr("class", "list-group-item hot");
              } else if (futureDay.temp.day < 50) {
                $("#day"+i+"Temp").attr("class", "list-group-item cold");
              } else if (futureDay.temp.day > 50) {
                $("#day"+i+"Temp").attr("class", "list-group-item nice");
              }
            }

          });
        });
    }
});

