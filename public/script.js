const searchForm = document.getElementById("searchForm");
const input = document.querySelector(".search-form input");
const weatherListElement = document.getElementById("weaterList");
const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;
const appid = "91fd9d23b948375a0961ce3cd72bed9e";

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const inputValue = input.value;

  //regexp previnir espaços em branco.
  if (new RegExp("[^ ]+").test(inputValue)) {
    const weaterData = await getWeatherData(inputValue);
    renderWeaderCard(weaterData);
  } else {
    alert("Please type a city name!");
  }
});

const getWeatherData = async (cityName) => {
  return await fetch(`${apiUrl}?q=${cityName}&appid=${appid}&units=metric`)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => error);
};

const renderWeaderCard = (weaterData) => {
  console.log(weaterData);
  const { main, name, sys, weather } = weaterData;
  const liElement = document.createElement("li");
  const markup = `
    <div class="weather-card">
     <div class="card-header">
        <p>${name}</p>
        <span>${sys.country}</span>
      </div>
      <div class="card-body">
        <p class="temp-info"><span>${Math.round(main.temp)}</span>°C</p>
      </div>
      <div class="card-footer">
        <div class="weather-icon">
         <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
            weather[0]["icon"]
          }.svg"
          alt="sky-icon"
         >
      </div>
        <p class="sky-condition">${weather[0]["description"]}</p>
     </div>
    </div>
  `;

  liElement.innerHTML = markup;
  weatherListElement.append(liElement);
};
