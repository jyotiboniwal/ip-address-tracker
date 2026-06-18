const API_KEY = "at_BMW3tGIPNZZYQPceyNQarjlzRXaAx";
const Url = `https://geo.ipify.org/api/v2/country,city?apiKey=`;

const searchBtn = document.querySelector("#searchBtn");
const ip = document.querySelector("#ip");
const loc = document.querySelector("#location");
const timezone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");

let map;
let marker;
let cicle;

// function to fetch the data from API
async function fetchData() {
  const userInput = document.querySelector("#userInput").value;
  console.log(`${Url}${API_KEY}&ipAddress=${userInput}`);
  try {
    const response = await fetch(`${Url}${API_KEY}&ipAddress=${userInput}`);
    let data = await response.json();
    return data;
  } catch (err) {
    console.log("ERROR:", err);
  }
}

// displaying the data
async function displayData() {
  const data = await fetchData();

  // setting the data value
  ip.textContent = data.ip;
  loc.textContent = `${data.location.region},${data.location.country}`;
  timezone.textContent = data.location.timezone;
  isp.textContent = data.isp;

  let latitude = data.location.lat;
  let longitude = data.location.lng;

  // localstorage for longitude and latitude
  let longitudeData = localStorage.setItem("long", longitude);
  let latitudeData = localStorage.setItem("lat", latitude);

  showMap();
}
function showMap() {
  let lat = localStorage.getItem("lat");
  let long = localStorage.getItem("long");

  if (map) {
    map.remove();
  }

  if (lat !== null && long !== null) {
    map = L.map("map").setView([lat, long], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    marker = L.marker([lat, long]).addTo(map);

    circle = L.circle([lat, long], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(map);
  }
}

// search button listner
searchBtn.addEventListener("click", displayData);

// window load
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    displayData();
  }
});
