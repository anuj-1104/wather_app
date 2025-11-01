import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  Wind,
  Droplets,
  Eye,
  Gauge,
  MapPin,
  Search,
  Thermometer,
  Sunrise,
  Sunset,
  Navigation,
  Wifi,
} from "lucide-react";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cityname, setCityName] = useState("Surat");
  const [searchCity, setSearchCity] = useState("");
  const [activeTab, setActiveTab] = useState("today");

  const api = import.meta.env.VITE_WEATHER_API_KEY;
  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${api}&q=${city}&days=3&aqi=no`
      );
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setLoading(true);
      setError("Network Problum..");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWeather(cityname);
  }, [cityname]);

  const getWeatherGradient = (condition) => {
    const text = condition?.toLowerCase() || "";

    if (text.includes("rain") || text.includes("drizzle"))
      return "bg-gradient-to-br from-gray-700 via-blue-900 to-black";

    if (text.includes("cloud"))
      return "bg-gradient-to-br from-blue-300 via-blue-300 to-blue-600";

    if (text.includes("mist") || text.includes("fog"))
      return "bg-gradient-to-br from-purple-400 via-gray-400 to-gray-700";

    if (text.includes("clear"))
      return "bg-gradient-to-br from-yellow-400 via-amber-400 to-gray-500";

    if (text.includes("snow"))
      return "bg-gradient-to-br from-cyan-200 via-white to-blue-300";

    if (text.includes("thunder"))
      return "bg-gradient-to-br from-black via-gray-900 to-yellow-600";

    return "bg-gradient-to-br from-indigo-500 via-purple-600 to-gray-600";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchCity.trim()) return;
    setCityName(searchCity.trim());
    setSearchCity("");
  };

  //🔍Search Your latitude and longitude
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            setError("");
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const loc = await res.json();
            const city = loc.city || loc.locality || "Your Location";
            fetchWeather(city);
          } catch (error) {
            fetchWeather("Surat"); // fallback city
          }
        },
        () => fetchWeather("Surat") // fallback on error
      );
    } else {
      fetchWeather("Surat"); // fallback if geolocation unsupported
    }
  };

  const [time, setTime] = useState();

  setInterval(() => {
    setTime(new Date().toLocaleTimeString().toUpperCase());
  }, 1000);

  //🔃 loading the data and wather fatch
  if (loading || !weather) {
    return (
      <>
        <div className="min-h-screen bg-linear-to-br cursor-not-allowed from-black to-blue-600  items-center justify-center">
          <div className="  font-semibold text-center text-white text-2xl p-4">
            {new Date().toLocaleDateString()}
            <br />
            {time}
          </div>
          <div className="text-white mt-50 text-center">
            <div className="animate-pulse rounded-full h-16 w-16 border-4 border-white  mx-auto mb-4">
              {error === "" ? (
                <Sun className="w-14 h-14  animate-spin" />
              ) : (
                <Wifi className="w-14 h-14 " />
              )}
            </div>
            <p className="text-xl">Loading Weather...</p>
          </div>
        </div>
      </>
    );
  }

  const gradient = getWeatherGradient(weather.current.condition.text);

  return (
    <div
      className={`min-h-screen bg-linear-to-br ${gradient} transition-all duration-1000`}
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-4xl font-bold text-white flex items-center gap-2">
              <Cloud className="w-10 h-10 animate-bounce" />
              Weather
            </h1>

            {/* Search & Location */}
            <form
              onSubmit={handleSearch}
              className="flex gap-2 w-full md:w-auto"
            >
              <div className="relative flex-1 md:flex-initial">
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder="Search city..."
                  className="px-4 py-2 pr-10 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white/50 w-full md:w-64"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-white/70 animate-bounce" />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                Search
              </button>
              <button
                type="button"
                onClick={getCurrentLocation}
                className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                <Navigation className="w-5 h-5" />
              </button>
            </form>
          </div>
        </header>

        {error && (
          <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 text-white px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Current Weather Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 mb-8 border border-white/20 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-white/80 mb-2">
                <MapPin className="w-5 h-5 animate-pulse" />
                <span className="text-lg">{weather.location.name}</span>
              </div>
              <div className="text-6xl md:text-7xl font-bold text-white mb-2">
                {weather.current.temp_c}°C
              </div>
              <div className="text-xl text-white/80 mb-4">
                Feels like {weather.current.feelslike_c}°C
              </div>
              <div className="text-2xl text-white font-semibold">
                {weather.current.condition.text}
              </div>
              <div className="text-white/60 mt-2">
                {weather.location.localtime}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Wind className="w-5 h-5 animate-pulse" />
                  <span className="text-sm opacity-80 font-semibold">Wind</span>
                </div>
                <div className="text-xl font-semibold">
                  {weather.current.wind_kph} km/h
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="w-5 h-5 animate-pulse" />
                  <span className="text-sm opacity-80 font-semibold">
                    Humidity
                  </span>
                </div>
                <div className="text-xl font-semibold">
                  {weather.current.humidity}%
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-5 h-5 animate-pulse" />
                  <span className="text-sm opacity-80 font-semibold">
                    Visibility
                  </span>
                </div>
                <div className="text-xl font-semibold">
                  {weather.forecast.forecastday[0].day.avgvis_km} km
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Gauge className="w-5 h-5 animate-pulse" />
                  <span className="text-sm opacity-80 font-semibold">
                    Pressure
                  </span>
                </div>
                <div className="text-xl font-semibold">
                  {weather.current.pressure_mb} mb
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-around mt-6 pt-6 border-t border-white/20">
            <div className="text-center text-white">
              <Sunrise className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm opacity-80">Sunrise</div>
              <div className="text-lg font-semibold">
                {weather.forecast.forecastday[0].astro.sunrise}
              </div>
            </div>
            <div className="text-center text-white">
              <Sunset className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm opacity-80">Sunset</div>
              <div className="text-lg font-semibold">
                {weather.forecast.forecastday[0].astro.sunset}
              </div>
            </div>
            <div className="text-center text-white">
              <Thermometer className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm opacity-80">UV Index</div>
              <div className="text-lg font-semibold">
                {weather.forecast.forecastday[0].day.uv}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "today"
                ? "bg-white text-blue-600"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            Today
          </button>

          <button
            onClick={() => setActiveTab("week")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "week"
                ? "bg-white text-blue-600"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            7-Day Forecast
          </button>
        </div>

        {/* Hourly Forecast */}
        {activeTab === "today" && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              Hourly Forecast
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {weather.forecast.forecastday[0].hour.map((hour, i) => (
                <div key={i} className="shrink-0 text-center text-white">
                  <div className="text-sm opacity-80 mb-2">
                    {new Date(hour.time).toLocaleTimeString([], {
                      hour: "numeric",
                      hour12: true,
                    })}
                  </div>
                  <img
                    src={hour.condition.icon}
                    alt={hour.condition.text}
                    className="w-8 h-8 mx-auto mb-2"
                  />
                  <div className="font-semibold">{hour.temp_c}°</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7-Day Forecast */}
        {activeTab === "week" && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              7-Day Forecast
            </h3>
            <div className="space-y-3">
              {weather.forecast.forecastday.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-white font-medium w-24">
                      {new Date(day.date).toLocaleDateString("en-IN", {
                        weekday: "short",
                      })}
                    </div>
                    <img
                      src={day.day.condition.icon}
                      alt={day.day.condition.text}
                      className="w-8 h-8"
                    />
                    <div className="text-white/80 text-sm">
                      {day.day.daily_chance_of_rain}% rain
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-white">
                    <span className="opacity-80">{day.day.mintemp_c}°</span>
                    <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-blue-400 to-orange-400 rounded-full"
                        style={{
                          width: `${
                            ((day.day.maxtemp_c - day.day.mintemp_c) / 20) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="font-semibold">{day.day.maxtemp_c}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
