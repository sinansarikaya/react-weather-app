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

  function createDate(dt) {
    const newDate = new Date(dt * 1000);
    return newDate.toDateString().slice(3);
  }

  function createDay(dt, type) {
    const day = new Date(dt * 1000);
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
    <>
      <aside>
        <div className={`aside ${theme}`}>
          <div className="aside-container">
            <div className="aside-header">
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
            </div>
            <div className="aside-main">
              <h1>{selected.name}</h1>
              <h2>
                <span>{createDate(weathers?.current?.dt)}</span>
                <span>{createDay(dt)}</span>
              </h2>
              {weathers?.current?.weather?.[0].icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${weathers?.current?.weather?.[0].icon}@2x.png`}
                />
              )}
              <span className="aside-degree">
                {Math.round(weathers?.current?.temp)}&#176;
              </span>
              <div className="aside-main-item">
                <div>
                  Feels Like
                  <span className="material-symbols-rounded">
                    device_thermostat
                  </span>
                </div>
                <span>{Math.round(weathers?.current?.feels_like)}&#176;</span>
              </div>
              <div className="aside-main-item">
                <div>
                  Day
                  <span className="material-symbols-rounded">light_mode</span>
                </div>
                <span>{Math.round(weathers?.daily?.[0]?.temp?.day)}&#176;</span>
              </div>
              <div className="aside-main-item">
                <div>
                  Night
                  <span className="material-symbols-rounded">bedtime</span>
                </div>
                <span>
                  {Math.round(weathers?.daily?.[0]?.temp?.night)}&#176;
                </span>
              </div>
              <div className="aside-main-item">
                <div>
                  Humidity
                  <ion-icon name="water"></ion-icon>
                </div>
                <span>{weathers?.current?.humidity}</span>
              </div>
              <div className="aside-main-item">
                <div>
                  Wind
                  <span className="material-symbols-rounded">air</span>
                </div>
                <span>{weathers?.current?.wind_speed}</span>
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
          </div>
        </div>
      </aside>
      <section>
        <div className="section-container">
          {weathers?.daily?.map((dayily, i) => (
            <div key={i} className={`grid-item ${theme}`}>
              <div className="grid-item-header">{createDate(dayily?.dt)}</div>
              <div className="grid-item-container">
                <img
                  src={`http://openweathermap.org/img/wn/${dayily?.weather?.[0].icon}@2x.png`}
                />
                <span>{createDay(dayily?.dt)}</span>
                <span>{dayily?.weather?.[0]?.description}</span>
              </div>
              <div className="grid-item-footer">
                <div>Min: {Math.round(dayily?.temp?.min)}&#176;</div>
                <div>Max: {Math.round(dayily?.temp?.max)}&#176;</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Weather;
