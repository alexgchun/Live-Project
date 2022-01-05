const toTop = document.querySelector('.to-top');
const bottom = window.outerHeight 
//how dows it get outerHeight?
console.log(bottom)

window.addEventListener("scroll", () => {
    if (window.scrollY > bottom) {//doesn't make sense to me
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})
//toggle

const checkbox = document.getElementById("checkbox");


checkbox.addEventListener('change', () => {
    //change theme of website
    document.body.classList.toggle('dark');
    document.getElementById('card-body').classList.toggle('dark');
    document.getElementById('card-body2').classList.toggle('dark');
    document.getElementById('card-body3').classList.toggle('dark');
})


//API

const app = {
    init: () => {//function gets called when page loads 
      document
        .getElementById('btnGet')
        .addEventListener('click', app.fetchWeather);
      document
        .getElementById('btnCurrent')
        .addEventListener('click', app.getLocation);
    },
    fetchWeather: (ev) => {
      //use the values from latitude and longitude to fetch the weather
      let lat = document.getElementById('latitude').value;
      let lon = document.getElementById('longitude').value;//hard coded values, unless you got location, then it uses those values
      let key = 'e67cee420d20c3d187fa0617502557d3';
      let lang = 'en';
      let units = 'imperial';
      let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
      //fetch the weather
      fetch(url)//make a call to the api, promised based function, response object
        .then((resp) => {//if response is not ok, throw err 
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();//response obj
        })
        .then((data) => {//i guess data is best practice
          app.showWeather(data);
        })
        .catch(console.err);
    },
    getLocation: (ev) => {
      let opts = {
        enableHighAccuracy: true,
        timeout: 1000 * 10, //10 seconds
        maximumAge: 1000 * 60 * 5, //5 minutes
      };
      navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);// opts?
      //navigator.geolocation.getCurrentPosition(success, error, [options])
      //thisgets the position of users location, and returns parameter(position)
    },
    ftw: (position) => {
      //got position
      document.getElementById('latitude').value =//success, fill in form (lat and long)
        position.coords.latitude.toFixed(2);//2 decimal places
      document.getElementById('longitude').value =
        position.coords.longitude.toFixed(2);
    },
    wtf: (err) => {
      //geolocation failed
      console.error(err);
    },
    showWeather: (resp) => {
      console.log(resp);//the returned data
      let row = document.querySelector('.weather.row');
      //clear out the old weather and add the new
      // row.innerHTML = '';
      row.innerHTML = resp.daily//innerhtml replaces, idk
         .map((day, idx) => {//day is a variable, we are using for dt(represent day in the returned obj ), idx is like i
          if (idx <= 2) {//map used for navigating objects, this is a loop
            let dt = new Date(day.dt * 1000); //timestamp * 1000 date time, number of seconds, js timestamps is on ms
            let sr = new Date(day.sunrise * 1000).toTimeString();
            let ss = new Date(day.sunset * 1000).toTimeString();
            return `<div class="col">
                <div class="card">
                <h5 class="card-title p-2">${dt.toDateString()}</h5>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      day.weather[0].icon
                    }@4x.png"
                    class="card-img-top"
                    alt="${day.weather[0].description}"
                  />
                  <div class="card-body">
                    <h3 class="card-title gear">${day.weather[0].main}</h3>
                    <p class="card-text">High ${day.temp.max}&deg;C Low ${
              day.temp.min
            }&deg;C</p>
                    <p class="card-text">High Feels like ${
                      day.feels_like.day
                    }&deg;C</p>
                    <p class="card-text">Pressure ${day.pressure}mb</p>
                    <p class="card-text">Humidity ${day.humidity}%</p>
                    <p class="card-text">UV Index ${day.uvi}</p>
                    <p class="card-text">Precipitation ${day.pop * 100}%</p>
                    <p class="card-text">Dewpoint ${day.dew_point}</p>
                    <p class="card-text">Wind ${day.wind_speed}m/s, ${
            day.wind_deg
            }&deg;</p>
                    <p class="card-text">Sunrise ${sr}</p>
                    <p class="card-text">Sunset ${ss}</p>
                    <button id="btnGear" onclick="getGear()" type="button" class="btn btn-primary mb-3">
                    Get Gear
                    </button>
                  </div>
                </div>
              </div>
            </div>`;
          }
        })
        .join(' ');
    },
  };
  
app.init();

function getGear() {
  let daysWeather = document.querySelector(".gear").innerText
  if (daysWeather == "Rain"){
    console.log("hello")
  }
}
//ask forest about data vs resp
/*
button -> GET GEAR

onclick, if day.weather[0].description == "clouds" {
  target="_blank" amazon.com => goretex etc
}
clear
clouds
mist smoke
haze
 dust
fog
sand
dust
ash
 sqall
 tornado
 snow
 rain
 drizzle
 thunderstorm

*/