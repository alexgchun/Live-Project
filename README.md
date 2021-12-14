# Live-Project
# Introduction
For the last two weeks of my time at the tech academy, I worked on a Life Style website using HTML, CSS, JavaScript, and BootStrap. Using vanilla JavaScript was a great way to really understand the fundamentals, and work on problem solving. Although I could have spent countless hours styling the site to perfection, I learned that it would be better to make a highly functional website, that is responsive and easy to navigate. The form functionality story and api were the two main challenges I faced.
## Sign up Modal with FormSpree
This Modal collects user data (name, email, phone) and sends it to formspree.io, mimicing form functionality using POST.
> <form
            action="https://formspree.io/f/xjvlbddl"
            method="POST"
          >
        <div class="input-group mb-3">
          
          <input type="text" name="Name" class="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          
          <input type="email" name="Email" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group mb-3">
          
          <input type="tel" name="Phone" class="form-control" placeholder="Phone Number" aria-label="Username" aria-describedby="basic-addon1" required>
        </div>
        <div class="form-check">
          <input class="form-check-input" name="Terms" type="checkbox" value="" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            I accept the Terms of Use & Privacy Policy
          </label>
          
          </div>
        <div class="form-check">
          <input class="form-check-input" name="Send Emails" type="checkbox" value="" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            I agree to receiving emails
          </label>
          </div>
            <div class="send-btn">
            <button class="btn btn-primary" type="submit">Send</button>
            </div>


          </form>
## Open Weather Map API
For story 9 and 10, I was tasked with creating a API that gets the user's coordinates by using the built-in JS geolocation, and requests data from the API website in the form of an object. Then I used a fetch function to input the latitude and longitude.
>const app = {
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
                    <h3 class="card-title">${day.weather[0].main}</h3>
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
                  </div>
                </div>
              </div>
            </div>`;
          }
        })
        .join(' ');
    },
  };
  

#Other Skills
responsive ness media queries
#Bugs
dark mode cards

