import React, { useState } from "react";
import classes from "./WeatherApp.module.css";

import { default as scattered_clouds } from "../assets/cloud.png";
import { default as shower_rain } from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import { default as rain } from "../assets/rain.png";
import search_icon from "../assets/search.png";
import { default as clear_sky } from "../assets/clear.png";
import { default as snow } from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

export const WeatherApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState("");

  const apiKey = "1c96e4c2fe798b5ae6491155d3acfb47";

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const search = async (event) => {
    event.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=Metric&appid=${apiKey}`;
    if (inputValue === "") return;
    const response = await fetch(url);
    const data = await response.json();
    setWeatherData(data);
  };

  const images = {
    Thunderstorm: shower_rain,
    Drizzle: shower_rain,
    Rain: rain,
    Snow: snow,
    Mist: wind_icon,
    Smoke: wind_icon,
    Haze: wind_icon,
    Dust: wind_icon,
    Fog: wind_icon,
    Sand: wind_icon,
    Ash: wind_icon,
    Squall: wind_icon,
    Tornado: wind_icon,
    Clear: clear_sky,
    Clouds: scattered_clouds,
  };

  return (
    <div className={classes.container}>
      <div className={classes["top-bar"]}>
        <form onSubmit={search}>
          <input
            type="text"
            className={classes.cityInput}
            placeholder="Search"
            onChange={inputChangeHandler}
          />
        </form>
        <div className={classes["search-icon"]} onClick={search}>
          <img src={search_icon} alt="searchIcon" />
        </div>
      </div>
      {weatherData !== "" && (
        <>
          <div className={classes["weather-image"]}>
            <img src={images[weatherData.weather[0].main]} alt="weatherimg" />
          </div>
          <div className={classes["weather-temp"]}>
            {weatherData.main.temp.toFixed()}°C
          </div>
          <div className={classes.text}>
            {weatherData.weather[0].description}
          </div>
          <div className={classes["weather-location"]}>
            {weatherData.name} / {weatherData.sys.country}
          </div>
          <div className={classes["data-container"]}>
            <div className={classes.element}>
              <img src={humidity_icon} alt="" className={classes.icon} />
              <div className={classes.data}>
                <div className={classes["humidity-percent"]}>
                  {weatherData.main.humidity}%
                </div>
                <div className={classes.text}>Humidity</div>
              </div>
            </div>
            <div className={classes.element}>
              <img src={wind_icon} alt="wind" className={classes.icon} />
              <div className={classes.data}>
                <div className={classes["humidity-percent"]}>
                  {weatherData.wind.speed} km/h
                </div>
                <div className={classes.text}>Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
