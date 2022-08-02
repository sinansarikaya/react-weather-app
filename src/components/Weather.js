import { useWeather } from "../context/WeatherContext";
import { useTheme } from "../context/ThemeContext";

function Weather() {
  const {
    cities,
    setCities,
    selected,
    setSelected,
    weathers,
    setWeathers,
    unit,
    setUnit,
  } = useWeather();

  const { theme, setTheme } = useTheme();

  const handleChange = (e) => {
    const newValue = e.target.value.split(",");
    setSelected({
      id: newValue[0],
      name: newValue[1],
      latitude: newValue[2],
      longitude: newValue[3],
      population: newValue[4],
      region: newValue[5],
    });
  };
  const handleSwitch = () => {
    setUnit(unit == "metric" ? "imperial" : "metric");
  };
  const dt = weathers?.current?.dt;
  const day = new Date(dt * 1000);

  function createDate(dt, type) {
    var day = new Date(dt * 1000);
    if (type === "long") {
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return day.toLocaleString("en-us", options);
    } else {
      return day.toLocaleString("en-us", { weekday: "long" });
    }
  }

  return (
    <div>
      <aside>
        <div className="aside-conteiner">
          <select onChange={handleChange}>
            {cities.map((city) => (
              <option
                key={city.id}
                value={[
                  city.id,
                  city.name,
                  city.latitude,
                  city.longitude,
                  city.population,
                  city.region,
                ]}
              >
                {city.name}
              </option>
            ))}
          </select>
          <h1 className="city-title">{selected.name}</h1>
          {weathers?.current?.weather?.[0].icon && (
            <img
              src={`http://openweathermap.org/img/wn/${weathers?.current?.weather?.[0].icon}@2x.png`}
            />
          )}
          <div className="aside-info">
            <div className="info-item">
              {weathers?.current?.weather?.[0].description}
            </div>
            <div className="info-item info-date">
              <div> {day.toDateString().slice(3)}</div>
              <div> {createDate(dt)}</div>
            </div>
            <div className="info-item currentTemp">
              {Math.round(weathers?.current?.temp)}&#176;
            </div>

            <div className="info-item info-footer">
              <div className="info-item items">
                <div className="sub-items">
                  Feels Like
                  <span className="material-symbols-rounded">
                    device_thermostat
                  </span>
                </div>
                <div>{Math.round(weathers?.current?.feels_like)}&#176;</div>
              </div>

              <div className="info-item humidity items">
                <div className="sub-items">
                  Day
                  <span className="material-symbols-rounded">light_mode</span>
                </div>
                <div>{Math.round(weathers?.daily?.[0]?.temp?.day)}&#176;</div>
              </div>

              <div className="info-item humidity items">
                <div className="sub-items">
                  Night
                  <span className="material-symbols-rounded">bedtime</span>
                </div>
                <div>{Math.round(weathers?.daily?.[0]?.temp?.night)}&#176;</div>
              </div>

              <div className="info-item humidity items">
                <div className="sub-items">
                  Humidity
                  <ion-icon name="water"></ion-icon>
                </div>
                <div>{weathers?.current?.humidity}</div>
              </div>

              <div className="info-item humidity items">
                <div className="sub-items">
                  Wind
                  <span className="material-symbols-rounded">air</span>
                </div>
                <div>{weathers?.current?.wind_speed}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="aside-footer">
          <span
            className="mode"
            onClick={() => setTheme(theme === "Dark" ? "Light" : "Dark")}
          >
            {theme === "Dark" ? (
              <ion-icon name="sunny"></ion-icon>
            ) : (
              <ion-icon name="moon"></ion-icon>
            )}
          </span>

          <div className="unity">
            <div>C</div>
            <div>
              <label className="switch">
                <input type="checkbox" onChange={handleSwitch} />
                <span className="slider round"></span>
              </label>
            </div>
            <div>F</div>
          </div>

          <a
            href="https://github.com/sinansarikaya/react-weather-app"
            target="_blank"
            className={`logo-github ${theme}`}
          >
            <ion-icon name="logo-github"></ion-icon>
          </a>
        </div>
      </aside>
      <section>
        {weathers?.daily?.map((dayily, i) => (
          <div key={i} className="grid-items">
            <img
              src={`http://openweathermap.org/img/wn/${dayily?.weather?.[0].icon}@2x.png`}
            />
            <br />
            {Math.round(dayily.temp.day)}&#176;
            <div>{dayily?.weather?.[0]?.description}</div>
            <div>{Math.round(dayily?.temp?.day)}&#176;</div>
            <div className="night_degree">
              {Math.round(dayily?.temp?.night)}&#176;
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Weather;
