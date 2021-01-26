/**
 * 
 */
(()=>{
	

	const API_KEY = "d7cea9a4812a1126df2ae9ad656cae74";
	const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";
	const weather = document.querySelector(".weather-text");
	
	let letlng = () =>{
		
		return new Promise((resolve,reject)=>{
			let coord = {};
			navigator.geolocation.getCurrentPosition((position) =>{
				coord.lat = position.coords.latitude;
				coord.lng = position.coords.longitude;
				resolve(coord);
			})
		})
	}
	
	let saveWeather = (location, temp) =>{
		let weatherObj = {};
		let maxAge = new Data();
		maxAge = maxAge.setHours(maxAge.getHours()+1);
		weatherObj.loc = location;
		weatherObj.temp = temp;
		weatherObj.maxAge = maxAge;
		
		localStorage.setItem("weather", JSON.stringify(weatherObj));
		
	}
	
	let getWeather = () =>{
			letlng()
		.then((coord)=>{
			
			let url = `${WEATHER_URL}lat=${coord.lat}&lon=${coord.lng}&appid=${API_KEY}&units=metric`;
			fetch(url)
			.then(response => response.json())
			.then(json => {
				loadWeather(json.name, json.main.temp);
				
			})
			
		})	
	}
	
	
	
	function loadWeather(location, temp){
		weather.innerHTML = `${temp}℃ @ ${location}`;
	
	}
	
	let init = () => {
		let parsedWeather = JSON.parse(localStorage.getItem("weather"));
		let now = new Date();
		if(parsedWeather){
			if(now > parsedWeather.maxAge){
				getWeather()
			}else{
				loadWeather(parsedWeather.loc, parsedWeather.temp);
			}
		}else{
			getWeather();
			
		}
	}
	
	init();

})();