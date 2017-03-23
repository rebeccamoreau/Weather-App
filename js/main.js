//Create Skycons
var skycons = new Skycons({"color": "black"});

//List of Icon Descriptions
var desc = ["clear-day", "clear-night", "partly-cloudy-day", "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind", "fog"];

//Get Geolocation
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition);
} else {
	alert("Unable to get geolocation");
}

//show weather
function showPosition(position) {
	var apiKey = config.MY_KEY;
	var ur = "https://api.forecast.io/forecast/";
	var lat = position.coords.latitude;
	var long = position.coords.longitude;
	var data;

	$.getJSON(ur + apiKey + "/" + lat + "," + long + "?callback=?", function(data) {
		console.log(data);

		//Check for weather alerts and display them
		//Check if there are any alerts
		if (data.hasOwnProperty('alerts')) {
			for (var i = data.alerts.length - 1; i >= 0; i--) {
				alert(data.alerts[i].description);
			}
		}

		//Formats timestamp into hours, gets the weather for the next 8 hours
		var hours = [];
		for (i = 1; i <= 9; i++) {
			var x = new Date(data.hourly.data[i].time*1000);
			if (x.getHours()>12) {
				hours.push(x.getHours()-12 + ":00PM");
			} else if (x.getHours()==12) {
				hours.push(x.getHours() + ":00PM");
			} else if (x.getHours()===0) {
				hours.push("12:00AM");
			} else {
				hours.push(x.getHours() + ":00AM");
			}
		}

		//Display the current weather and skycon
		$("#today").html('<canvas id="icon1" width="100" height="100"></canvas><h2>Today</h2><h1>' + 
		Math.round(data.currently.temperature) + '&deg;F</h1><h4>'+ data.currently.summary + '</h4>');

		skycons.add(document.getElementById("icon1"), data.currently.icon);

		//Displays the next 8 hours of weather
		for (i = 0; i <= 7; i++) {
			$("#today").append(
				'<div class="col-sm-4"><h3>'+ hours[i] +'</h3></div><div class="col-sm-4 hourly"><canvas id="hourIcon' + i + 
				'" width="25" height="25"></canvas></div><div class="col-sm-4"><h3>' + Math.round(data.hourly.data[i].temperature) + 
				'&deg;F</h3></div>'
			);
			skycons.add(document.getElementById("hourIcon" + i), data.hourly.data[i].icon);
		}

		var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

		//Displays the weather for the next 6 days
		for (i = 1; i <= 6; i++) {
			var day = new Date(data.daily.data[i].time*1000);
			$("#daily").append('<div class="col-sm-4 dailyWeather"><canvas id="dailyIcon' + i + '" width="100" height="100"></canvas><h2>' + days[day.getDay()] 
				+ '</h2><h1>' + Math.round(data.daily.data[i].apparentTemperatureMax) + '&deg;/' + Math.round(data.daily.data[i].apparentTemperatureMin) +
				'&deg;F</h1><h4>' + data.daily.data[i].summary + '</h4></div>'
			);
			skycons.add(document.getElementById("dailyIcon" + i), data.daily.data[i].icon);
		}

		//Animates the skycons
		skycons.play();

	});
}