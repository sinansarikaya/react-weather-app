import { useWeather } from "../context/WeatherContext";
import { useTheme } from "../context/ThemeContext";

function Weather() {
  const { cities, setCities, selected, setSelected, weathers, setWeathers } =
    useWeather();

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
      <br />
      <hr />
      City: {selected.name}
      <br />
      Temp: {weathers?.current?.temp}
      <br />
      Feels Like: {weathers?.current?.feels_like}
      <br />
      Humidity: {weathers?.current?.humidity}
      <br />
      Main: {weathers?.current?.weather?.[0].main}
      <br />
      Description: {weathers?.current?.weather?.[0].description}
      <br />
      Wind speed: {weathers?.current?.wind_speed}
      <br />
      Date: {day.toDateString().slice(3)}
      <br />
      Day: {createDate(dt)}
      <br />
      {weathers?.current?.weather?.[0].icon && (
        <img
          src={`http://openweathermap.org/img/wn/${weathers?.current?.weather?.[0].icon}@2x.png`}
        />
      )}
      {weathers?.daily?.map((dayily, i) => (
        <div key={i}> {dayily.temp.day}</div>
      ))}
      <br />
      <button onClick={() => setTheme(theme === "Dark" ? "Light" : "Dark")}>
        Change Theme
      </button>
    </div>
  );
}

export default Weather;
