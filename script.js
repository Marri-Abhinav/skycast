var key ="0c843c2236ea4c5d924160704262506";

var cityname=document.getElementById("city-name");
var temperature=document.getElementById("temperature");
var condition =document.getElementById("condition");
var icon=document.getElementById("weather-icon");
var details = document.querySelector(".weather-details");


var button = document.querySelector("button");
button.addEventListener("click",getweather);
var input = document.getElementById("searchcity");

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getweather();
    }
});

    
function getweather()  {
    var city=document.getElementById("searchcity").value;
    if(!(city)){
        alert("Enter City name to search");
        return;
    }
    var url=`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=5&aqi=no&alerts=no
`;
     cityname.innerText = "Loading...";
     temperature.innerText = "...";
     condition.innerText = "Please wait";
     details.innerHTML = "";
     
   
    fetch(url)
    .then((response)=>{
        return response.json();
    })    
    .then((data)=>{
        cityname.innerText=data.location.name;
        temperature.innerText=data.current.temp_c + "°C";
        condition.innerText=data.current.condition.text;
        console.log(data);   
      icon.setAttribute("src", "https:" + data.current.condition.icon);
       
      details.innerHTML=`
       <p>Humidity :${data.current.humidity}%</p>
       <p>Wind :${data.current.wind_kph} km/h</p>
    
       `
       addforecast(data);
       let searches = JSON.parse(localStorage.getItem("cities")) || [];

      searches = searches.filter(item => item !== city);

      searches.push(city);
     localStorage.setItem("cities",JSON.stringify(searches));
     gethistory();   
    }) 
    .catch((error)=>{
        alert("something went wrong");
        console.log(error);
      
    })
     
}
function searchAgain(city){
    input.value=city;
    getweather();
}

   var list=document.getElementById("histlist");
    function gethistory(){
         let searches = JSON.parse(localStorage.getItem("cities")) || [];
         list.innerHTML = "";
        for (let i = searches.length - 1; i >= 0 && i >= searches.length - 10; i--) {
             list.innerHTML += `
       <li onclick="searchAgain('${searches[i]}')">
            ${searches[i]}
            </li>`;
     }

    }

function addforecast(data){
  
    var day=document.getElementById("day");
    day.innerHTML="";
    for(var i=0;i<5;i++){
        day.innerHTML+=`<div>
        <img src="https:${data.forecast.forecastday[i].day.condition.icon}" alt="icon">
        <p>${data.forecast.forecastday[i].day.avgtemp_c} °C</p>
        <div>
        `;
    }

}

gethistory();   
