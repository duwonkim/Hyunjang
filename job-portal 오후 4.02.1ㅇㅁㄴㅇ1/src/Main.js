// Main.js

import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import './Main.css';
import 'weather-icons/css/weather-icons.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { posts } from './posts';
import Banner1 from './CF/EX.png';
import Banner2 from './CF/GS.png';
import Banner3 from './CF/HY.png';
import Banner4 from './CF/SK.png';
import Banner5 from './CF/SM.png';
import Map from './Map';
import Sidebar from './Sidebar'; // Sidebar 컴포넌트 추가

const WeatherItem = ({ day, weather, getWeatherIcon }) => (
  <div className="weather-item">
    <p className="weather-label">{day} 날씨</p>
    {weather ? (
      <>
        <i className={`wi ${getWeatherIcon(weather.weather[0]?.icon)}`}></i>
        <p className="small-temp">{weather.temp}°C</p>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);

const PostItem = ({ post }) => {
  const mapRef = useRef();
  const locationCoordinates = {
    서울: [37.5665, 126.9780],
    부산: [35.1796, 129.0756],
    인천: [37.4563, 126.7052],
    대전: [36.3504, 127.3845],
    광주: [35.1595, 126.8526],
    울산: [35.5396, 129.3115],
    수원: [37.2636, 127.0286],
    성남: [37.4204, 127.1269],
    고양: [37.6584, 126.8320],
    용인: [37.2411, 127.1776],
    창원: [35.2279, 128.6811],
    부천: [37.5037, 126.7660],
    안산: [37.3219, 126.8309],
    남양주: [37.6367, 127.2165],
    천안: [36.8151, 127.1139],
    전주: [35.8242, 127.1480],
    대구: [35.8722, 128.6025]
  };

  const resetMap = (map, initialCoords) => {
    mapRef.current = map;
    mapRef.current.initialCoords = initialCoords;
  };

  const handleReset = () => {
    if (mapRef.current) {
      const initialCoords = mapRef.current.initialCoords;
      mapRef.current.setView(initialCoords, 13);
    }
  };

  return (
    <div className="post-item flip">
      <div className="card">
        <div className="front">
          <h2>{post.title}</h2>
          <p>직종: {getJobType(post.jobType)}</p>
          <p>단가: {post.price}</p>
          <p>날짜: {post.date}</p>
          <p>근무 위치: {post.location}</p>
        </div>
        <div className="back">
          <Map location={post.location} resetMap={resetMap} />
          <button className="reset-button" onClick={handleReset}>
            지도 초기화
          </button>
        </div>
      </div>
    </div>
  );
};

const PostCountItem = ({ day, postCount }) => (
  <div className="post-item">
    <p className="post-label">{day} 알바</p>
    <p className="post-count">{postCount}</p>
  </div>
);

const getJobType = (jobType) => {
  const jobTypeMap = {
    a: '직종 A',
    b: '직종 B',
    c: '직종 C',
    d: '직종 D',
    e: '직종 E',
    f: '직종 F',
    g: '직종 G',
  };
  return jobTypeMap[jobType] || '기타';
};

const getDayOfWeek = (date) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[date.getDay()];
};

const Main = () => {
  const [weather, setWeather] = useState(null);
  const [yesterdayWeather, setYesterdayWeather] = useState(null);
  const [tomorrowWeather, setTomorrowWeather] = useState(null);
  const [dayAfterTomorrowWeather, setDayAfterTomorrowWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=seoul&units=metric&lang=kr&appid=bfaa613564b6762cbea175fd750e8735`);
      const data = await response.json();
      setWeather(data.main ? { ...data.main, weather: data.weather } : null);
    };

    const fetchYesterdayWeather = async () => {
      const timestamp = Math.floor(Date.now() / 1000) - 86400;
      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=37.5665&lon=126.9780&dt=${timestamp}&units=metric&lang=kr&appid=bfaa613564b6762cbea175fd750e8735`);
      const data = await response.json();
      setYesterdayWeather(data.current);
    };

    const fetchTomorrowWeather = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=seoul&units=metric&lang=kr&appid=bfaa613564b6762cbea175fd750e8735`);
      const data = await response.json();
      setTomorrowWeather(data.list[8]?.main ? { ...data.list[8].main, weather: data.list[8].weather } : null);
    };

    const fetchDayAfterTomorrowWeather = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=seoul&units=metric&lang=kr&appid=bfaa613564b6762cbea175fd750e8735`);
      const data = await response.json();
      setDayAfterTomorrowWeather(data.list[16]?.main ? { ...data.list[16].main, weather: data.list[16].weather } : null);
    };

    fetchWeather();
    fetchYesterdayWeather();
    fetchTomorrowWeather();
    fetchDayAfterTomorrowWeather();
  }, []);

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      "01d": "wi-day-sunny",
      "01n": "wi-night-clear",
      "02d": "wi-day-cloudy",
      "02n": "wi-night-alt-cloudy",
      "03d": "wi-cloud",
      "03n": "wi-cloud",
      "04d": "wi-cloudy",
      "04n": "wi-cloudy",
      "09d": "wi-rain",
      "09n": "wi-rain",
      "10d": "wi-day-rain",
      "10n": "wi-night-rain",
      "11d": "wi-thunderstorm",
      "11n": "wi-thunderstorm",
      "13d": "wi-snow",
      "13n": "wi-snow",
      "50d": "wi-fog",
      "50n": "wi-fog"
    };
    return iconMap[iconCode] || "wi-na";
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const recentPosts = posts.slice(-18).reverse();

  const getPostCountByDate = (date) => {
    return posts.filter(post => post.date === date).length;
  };

  return (
    <div className="main-container">
      <Sidebar /> {/* Sidebar 컴포넌트 추가 */}
      <div className="weather-row">
        <WeatherItem day="어제" weather={yesterdayWeather} getWeatherIcon={getWeatherIcon} />
        <WeatherItem day="오늘" weather={weather} getWeatherIcon={getWeatherIcon} />
        <WeatherItem day={`내일 (${getDayOfWeek(tomorrow)})`} weather={tomorrowWeather} getWeatherIcon={getWeatherIcon} />
        <WeatherItem day={`모레 (${getDayOfWeek(dayAfterTomorrow)})`} weather={dayAfterTomorrowWeather} getWeatherIcon={getWeatherIcon} />
      </div>
      <div className='CF'>
        <Slider {...settings}>
          <div><img src={Banner1} alt="Banner 1" /></div>
          <div><img src={Banner2} alt="Banner 2" /></div>
          <div><img src={Banner3} alt="Banner 3" /></div>
          <div><img src={Banner4} alt="Banner 4" /></div>
          <div><img src={Banner5} alt="Banner 5" /></div>
        </Slider>
      </div>
      <div className="post-row">
        <PostCountItem day="오늘" postCount={getPostCountByDate('2024-05-29')} />
        <PostCountItem day={`내일 (${getDayOfWeek(tomorrow)})`} postCount={getPostCountByDate('2024-05-30')} />
        <PostCountItem day={`모레 (${getDayOfWeek(dayAfterTomorrow)})`} postCount={getPostCountByDate('2024-05-31')} />
      </div>
      <div className="tag">
        <div className="tag1">플래티넘 알바</div>
        <div className="tag2">상품안내 &gt;</div>
        <div className="tag2">신청하기 &gt;</div>
      </div>
      <div className="post-row1">
        {recentPosts.slice(0, 4).map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
      <div className="post-row1">
        {recentPosts.slice(4, 8).map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
      <div className="tag">
        <div className="tag1">프라임</div>
        <div className="tag2">상품안내 &gt;</div>
      </div>
      <div className="post-row2">
        {recentPosts.slice(8, 13).map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
      <div className="post-row2">
        {recentPosts.slice(13, 18).map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Main;