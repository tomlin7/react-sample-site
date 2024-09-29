import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import placeholder from "../assets/user.png";
import styles from "./dashboard.module.css";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { FaWind } from "react-icons/fa";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { IoIosRainy } from "react-icons/io";
import { IoWaterOutline } from "react-icons/io5";

const API_KEY = "88695513e54b104f3158161469e3f8c2";
const NEWS_API_KEY = "e0caae7e4ed34866b1a9bfe10525f1b3";
const LOCATION = "Ranchi";

const WeatherSkeleton = () => (
  <div className={`${styles.weatherCard} ${styles.skeleton}`}>
    <div className={`${styles.weatherDate} ${styles.skeletonText}`}></div>
    <div className={styles.weatherContent}>
      <div>
        <span className={`${styles.weatherIcon} ${styles.skeletonIcon}`}></span>
        <p className={styles.skeletonText}></p>
      </div>
      <p className={styles.weatherContentSep} />
      <div>
        <h1 className={styles.skeletonText}></h1>
        <p className={styles.skeletonText}></p>
      </div>
      <p className={styles.weatherContentSep} />
      <div>
        <p className={styles.skeletonText}></p>
        <p className={styles.skeletonText}></p>
      </div>
    </div>
  </div>
);

const NewsSkeleton = () => (
  <div className={`${styles.newsCard} ${styles.skeleton}`}>
    <div className={styles.newsImageContainer}>
      <div className={`${styles.newsImage} ${styles.skeletonImage}`}></div>
      <div className={styles.newsTitle}>
        <h3 className={styles.skeletonText}></h3>
        <h3 className={styles.skeletonText}></h3>
      </div>
    </div>
    <div className={styles.newsContent}>
      <p className={styles.skeletonText}></p>
      <p className={styles.skeletonText}></p>
    </div>
  </div>
);

const DashboardPage = () => {
  const [user, setUser] = useState({
    name: "Anurag Das",
    username: "anurag123",
    email: "anuragdas@gmail.com",
    mobile: "",
    shareData: false,
    categories: ["Horror", "Thriller", "Action"],
  });

  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem("categories"));
    // if (categories) {
    //   setUser((prevUser) => ({
    //     ...prevUser,
    //     categories: categories,
    //   }));
    // }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
    }

    // setUser(user);
  }, []);

  const navigate = useNavigate();

  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timerTime, setTimerTime] = useState({
    hours: 0,
    minutes: 1,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const totalTime = useRef(0);
  const timerRef = useRef(null);
  const [newsLoading, setNewsLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
    fetchNewsData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    totalTime.current =
      timerTime.hours * 3600 + timerTime.minutes * 60 + timerTime.seconds;
  }, [timerTime]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevElapsed) => {
          if (prevElapsed >= totalTime.current) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return totalTime.current;
          }
          return prevElapsed + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setWeatherLoading(false);
    }
  };

  const fetchNewsData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
      );
      const data = await response.json();
      setNews(data.articles[0]);
    } catch (error) {
      console.error("Error fetching news data:", error);
    } finally {
      setNewsLoading(false);
    }
  };

  const handleTimeInput = (unit, value) => {
    if (value === "") {
      setTimerTime((prevTime) => ({
        ...prevTime,
        [unit]: 0,
      }));
      return;
    }

    const numValue = Number(value);
    if (isNaN(numValue)) return;

    setTimerTime((prevTime) => ({
      ...prevTime,
      [unit]: Math.min(
        unit === "hours" ? 23 : 59,
        Math.max(0, Math.floor(numValue))
      ),
    }));
  };

  const handleTimerChange = (unit, value) => {
    setTimerTime((prevTime) => ({
      ...prevTime,
      [unit]: Math.max(0, prevTime[unit] + value),
    }));
  };

  const toggleTimer = () => {
    if (!isRunning && elapsedTime >= totalTime.current) {
      // reset
      setElapsedTime(0);
    }
    setIsRunning(!isRunning);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const calculateRotation = () => {
    return (elapsedTime / totalTime.current) * 360;
  };

  const browseEntertainment = () => {
    navigate("/entertainment");
  };

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        {/* User Card */}
        <div className={styles.userCard}>
          <img
            src={placeholder}
            width={80}
            height={80}
            alt="User avatar"
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <h2>{user.username}</h2>
            <div className={styles.categories}>
              {user.categories.length <= 6 &&
                user.categories.map((category) => (
                  <span key={category} className={styles.category}>
                    {category}
                  </span>
                ))}

              {user.categories.length > 6 &&
                user.categories.slice(0, 5).map((category) => (
                  <span key={category} className={styles.category}>
                    {category}
                  </span>
                ))}
              {user.categories.length > 6 && (
                <span className={styles.category}>
                  +{user.categories.length - 5} more
                </span>
              )}
            </div>
            <button className={styles.signoutButton}>Sign out</button>
          </div>
        </div>

        {/* Weather Card */}
        {weatherLoading ? (
          <WeatherSkeleton />
        ) : weather ? (
          <div className={styles.weatherCard}>
            <div className={styles.weatherDate}>
              {currentTime.toLocaleString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>

            <div className={styles.weatherContent}>
              <div>
                <span className={styles.weatherIcon}>
                  <IoIosRainy />
                </span>
                <p>Heavy rain</p>
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
                  {weather.wind.speed} km/h Wind
                </p>
                <p>
                  <IoWaterOutline />
                  {weather.main.humidity}% humidity
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Error fetching weather data</p>
        )}

        {/* Notes Card */}
        <div className={styles.notesCard}>
          <h3>All notes</h3>
          <textarea
            defaultValue={
              "This is how I am going to learn MERN Stack in next 3 months."
            }
          ></textarea>
        </div>

        {/* News Card */}
        {newsLoading ? (
          <NewsSkeleton />
        ) : news ? (
          <div className={styles.newsCard}>
            <div className={styles.newsImageContainer}>
              <img
                src={news.urlToImage}
                alt={news.title}
                className={styles.newsImage}
              />
              <div className={styles.newsTitle}>
                <h3>{news.title}</h3>
              </div>
            </div>
            <div className={styles.newsContent}>
              <p>{news.description}</p>
            </div>
          </div>
        ) : (
          <p>Error fetching news data</p>
        )}

        {/* Timer Card */}
        <div className={styles.timerCard}>
          <div className={styles.timeCircleContainer}>
            <div className={styles.timerCircle}>
              <svg className={styles.chronograph} viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="5"
                  strokeDasharray="283"
                  strokeDashoffset={(283 * calculateRotation()) / 360}
                  className={styles.timerCircleAnimation}
                />
              </svg>
              <span className={styles.timerDisplay}>
                {formatTime(
                  isRunning
                    ? totalTime.current - elapsedTime
                    : totalTime.current
                )}
              </span>
            </div>
          </div>
          <div className={styles.timerControls}>
            <div className={styles.timeButtons}>
              <div className={styles.timeButton}>
                <div>Hours</div>
                <button onClick={() => handleTimerChange("hours", 1)}>
                  <BsFillCaretUpFill />
                </button>
                <input
                  className={styles.timeInput}
                  type="number"
                  value={String(timerTime.hours).padStart(2, "0")}
                  onChange={(e) => handleTimeInput("hours", e.target.value)}
                  min="0"
                  max="23"
                />
                <button onClick={() => handleTimerChange("hours", -1)}>
                  <BsFillCaretDownFill />
                </button>
              </div>
              <div className={styles.timeButtonSep}>
                <span className={styles.timeText}>:</span>
              </div>
              <div className={styles.timeButton}>
                <div>Minutes</div>
                <button onClick={() => handleTimerChange("minutes", 1)}>
                  <BsFillCaretUpFill />
                </button>
                <input
                  className={styles.timeInput}
                  type="number"
                  value={String(timerTime.minutes).padStart(2, "0")}
                  onChange={(e) => handleTimeInput("minutes", e.target.value)}
                  min="0"
                  max="59"
                />
                <button onClick={() => handleTimerChange("minutes", -1)}>
                  <BsFillCaretDownFill />
                </button>
              </div>
              <div className={styles.timeButtonSep}>
                <span className={styles.timeText}>:</span>
              </div>
              <div className={styles.timeButton}>
                <div>Seconds</div>
                <button onClick={() => handleTimerChange("seconds", 1)}>
                  <BsFillCaretUpFill />
                </button>
                <input
                  className={styles.timeInput}
                  type="number"
                  value={String(timerTime.seconds).padStart(2, "0")}
                  onChange={(e) => handleTimeInput("seconds", e.target.value)}
                  min="0"
                  max="59"
                />
                <button onClick={() => handleTimerChange("seconds", -1)}>
                  <BsFillCaretDownFill />
                </button>
              </div>
            </div>
            <button className={styles.startButton} onClick={toggleTimer}>
              {isRunning ? "Stop" : "Start"}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.footer} onClick={browseEntertainment}>
        <button className={styles.browseButton}>Browse</button>
      </div>
    </div>
  );
};

export default DashboardPage;
