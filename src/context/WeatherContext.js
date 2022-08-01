import { createContext, useContext, useState, useEffect } from "react";
import cityData from "../data/cities_of_turkey.json";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [selected, setSelected] = useState({
    id: 1,
    name: "Adana",
    latitude: "37.0000",
    longitude: "35.3213",
    population: 2183167,
    region: "Akdeniz",
    icon: "",
  });
  const [weathers, setWeathers] = useState({});

  const values = {
    cities,
    setCities,
    selected,
    setSelected,
    weathers,
    setWeathers,
  };

  const apiKey = "19fb000f0d23db04240d7d2a975c79f2";
  const units = "metric";

  //console.log(weathers?.current?.weather?.[0].icon);

  function getCities() {
    setCities(cityData);
  }
  const citylat = selected?.initialvalues?.[0].latitude
    ? selected?.initialvalues?.[0].latitude
    : selected.latitude;

  const citylon = selected?.initialvalues?.[0].longitude
    ? selected?.initialvalues?.[0].longitude
    : selected.longitude;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${citylat}&lon=${citylon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setWeathers(data));
    return;
  }, [selected]);

  useEffect(() => {
    getCities();
    return;
  }, []);

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
