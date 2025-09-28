

const apiKey = "YOUR_API_KEY_HERE";

const temperatureField = document.querySelector(".temp");
const placeField = document.querySelector(".place");
const regionField = document.querySelector(".region");
const dateField = document.querySelector(".dates");
const timeField = document.querySelector(".times")
const weatherField = document.querySelector(".condition p");
const form = document.querySelector('form');
const searchField = document.querySelector(".search_area")
const iconField = document.querySelector(".weather-icon")
const dayField = document.querySelector(".days")
const body = document.querySelector("body");

form.addEventListener('submit', searchLocation)

let place = 'Hyderabad'


const fetchDetails = async (place) => {
    let url = `http://api.weatherapi.com/v1/current.json?key={apiKey}&q=${place}&aqi=no`

    const res = await fetch(url)

    const data = await res.json()

    console.log(data)

    let locationName = data.location.name
    let time = data.location.localtime
    let region = data.location.region
    let temp = data.current.temp_c
    let conditionName = data.current.condition.text
    let iconUrl = data.current.condition.icon

    updateDetails(temp, locationName, time, conditionName, region, iconUrl)

}

function updateDetails(temp, locationName, time,condition, region, iconUrl){

    let splitDate = time.split(' ')[0]
    let splitTime = time.split(' ')[1]

    let dayName = new Date(splitDate).toLocaleDateString("en-US",{weekday:"long"});

    temperatureField.innerText = temp
    placeField.innerText = locationName
    dateField.innerText = splitDate
    dayField.innerText = dayName
    weatherField.innerText = condition
    timeField.innerText = splitTime
    regionField.innerText = region
    iconField.src = 'https:'+iconUrl;

}

function searchLocation(e){
    e.preventDefault()

    target = searchField.value

    fetchDetails(target)
}

function updateBackground(condition) {
  body.className = ""; // reset classes

  if (condition.includes("sunny")) {
    body.classList.add("sunny-bg");
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    body.classList.add("rainy-bg");
  } else if (condition.includes("cloud")) {
    body.classList.add("cloudy-bg");
  } else if (condition.includes("clear") && isNight()) {
    body.classList.add("night-bg");
  }
}

function isNight() {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 6;
}


fetchDetails(place)