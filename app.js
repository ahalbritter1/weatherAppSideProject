
const button = document.querySelector('.button')
const inputValue = document.querySelector('.inputValue')
const nameInput = document.querySelector('.name');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity');
const temp = document.querySelector('.temp');
const forecastDayTwo = document.querySelector(".forecastDay2");
const forecastDayThree = document.querySelector(".forecastDay3");
const forecastDayFour = document.querySelector(".forecastDay4");
const forecastH1 = document.querySelector(".forecastH1");

button.addEventListener('click', function() {
    $('body').css("background-image", `url("")`);
    renderImage();
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=a1defeaa1aba1697435b986b6773c5de')
.then(response => response.json())
.then(data => {
    console.log(data);
    let nameValue = data.name;
    let tempValue = data.main.temp;
    let descValue = data.weather[0].description;
    let humidityValue = data.main.humidity; 
    let latCoord = data.coord.lat;
    let lonCoord = data.coord.lon;
    let fahrenheit = (tempValue - 273.15) * 9 / 5 + 32;
    let correctFahrenheit = fahrenheit.toFixed(0);

    nameInput.innerHTML = nameValue;
    temp.innerHTML = correctFahrenheit + "&#8457";
    description.innerHTML = descValue.toUpperCase();
    humidity.innerHTML = "Humidity " + humidityValue + "%";

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latCoord+'&lon='+lonCoord+'&exclude=hourly,minutely&appid=a1defeaa1aba1697435b986b6773c5de')
    .then(resp => resp.json())
    .then(forecastData => {
        console.log(forecastData);
        let forecastDayTwoValue = forecastData.daily[0].temp.day;
        let forecastDayThreeValue = forecastData.daily[1].temp.day;
        let forecastDayFourValue = forecastData.daily[2].temp.day;

        function fahrenheitSet(x) {
        return (x - 273.15) * 9 / 5 + 32;
        }
        forecastH1.innerHTML = "3-Day Outlook: Average Temp During Day";
        forecastDayTwo.innerHTML = "Day Two: " + fahrenheitSet(forecastDayTwoValue).toFixed(0) + "&#8457";
        forecastDayThree.innerHTML = "Day Three: " + fahrenheitSet(forecastDayThreeValue).toFixed(0) + "&#8457";
        forecastDayFour.innerHTML = "Day Four: " + fahrenheitSet(forecastDayFourValue).toFixed(0) + "&#8457";
    })
.catch(error => console.error(error))
})
  

function renderImage() {
    fetch("https://api.unsplash.com/search/photos?page=1&query="+inputValue.value+'&client_id=2TGPy7eqrrXFN-oJlxY_6JC5jVzGh7W_KzOulvBKX5w')
    .then(response => response.json())
    .then(data => {
        console.log(data);


    let photoSearchArray = [
        data.results[8].urls.regular,
        data.results[7].urls.regular,
        data.results[6].urls.regular,
        data.results[5].urls.regular,
        data.results[4].urls.regular,
        data.results[3].urls.regular,
        data.results[2].urls.regular,
        data.results[1].urls.regular,
        data.results[0].urls.regular,
    ]   
    let randomSearch = Math.floor(Math.random() * 10);
    console.log(randomSearch);
    let photoSearch = photoSearchArray[randomSearch];
    $('body').css("background-image", `url(${photoSearch})`);
    $('body').css("background-repeat", "no-repeat").css("background-size", "cover").css("background-position", "20% 20%");
    }
    )}
});
