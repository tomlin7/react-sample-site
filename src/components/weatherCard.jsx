import skeletons from "./skeletons.module.css";
import styles from "./weatherCard.module.css";

import { FaWind } from "react-icons/fa";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";

import { BsCloudHaze, BsCloudSunFill, BsSunFill } from "react-icons/bs";

const WeatherSkeleton = () => (
  <div className={`${styles.weatherCard} ${skeletons.skeleton}`}>
    <div className={`${styles.weatherDate} ${skeletons.skeletonText}`}></div>
    <div className={styles.weatherContent}>
      <div>
        <span
          className={`${styles.weatherIcon} ${skeletons.skeletonIcon}`}
        ></span>
        <p className={skeletons.skeletonText}></p>
      </div>
      <p className={styles.weatherContentSep} />
      <div>
        <h1 className={skeletons.skeletonText}></h1>
        <p className={skeletons.skeletonText}></p>
      </div>
      <p className={styles.weatherContentSep} />
      <div>
        <p className={skeletons.skeletonText}></p>
        <p className={skeletons.skeletonText}></p>
      </div>
    </div>
  </div>
);

const getWeatherIcon = (icon) => {
  switch (icon) {
    case "01d":
    case "01n":
      return <BsSunFill />;
    case "02d":
    case "02n":
      return <BsCloudSunFill />;
    case "03d":
    case "03n":
      return <BsCloudHaze />;

    // ....
    // TODO: add more icons https://openweathermap.org/weather-conditions
    // icons: https://react-icons.github.io/react-icons/

    default:
      return <BsSunFill />;
  }
};

const WeatherCard = ({ weather, weatherDate }) => {
  return (
    <div className={styles.weatherCard}>
      <div className={styles.weatherDate}>
        <p>
          {weatherDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p>
          {weatherDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </div>
      <div className={styles.weatherContent}>
        <div>
          <span className={styles.weatherIcon}>
            {getWeatherIcon(weather.weather[0].icon)}
          </span>
          <p>{weather.weather[0].description}</p>
        </div>
        <p className={styles.weatherContentSep} />
        <div>
          <h1>{Math.round(weather.main.temp)}°C</h1>
          <p>
            <FaTemperatureThreeQuarters />
            {weather.main.pressure} mbar
          </p>
        </div>
        <p className={styles.weatherContentSep} />
        <div>
          <p>
            <FaWind />
            {weather.wind.speed} m/s Wind
          </p>
          <p>
            <IoWaterOutline />
            {weather.main.humidity}% humidity
          </p>
        </div>
      </div>
    </div>
  );
};

export { WeatherCard, WeatherSkeleton };
