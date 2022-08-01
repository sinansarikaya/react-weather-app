import { useWeather } from "../context/WeatherContext";

function Weather() {
  const { cities, setCities, selected, setSelected, weathers, setWeathers } =
    useWeather();

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
      Date: {day.toDateString()}
      <br />
      <img
        src={`http://openweathermap.org/img/wn/${weathers?.current?.weather?.[0].icon}@2x.png`}
      />
    </div>
  );
}

export default Weather;
