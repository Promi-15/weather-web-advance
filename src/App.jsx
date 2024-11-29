import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
const App = () => {
  const [city, setCity] = useState("Dhaka");
  const [weather, setWeather] = useState(null);

  const API_key = "c24ebb344096854386380018f34db72c";
  const fetchWeatherData = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`,
      );
      const data = await res.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const handleCityClick = (clickedCity) => {
    setCity(clickedCity)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const cityValue = e.target.city.value;
    setCity(cityValue);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const date = `${day}.${month}.${year}`;

  return (
    <div className="bg-[url('https://i.ibb.co.com/wd3LLVM/clouds-1867317-640.jpg')]  bg-cover bg-center min-h-screen w-full flex flex-row justify-between">
      {weather && weather.main && (
        <>
          <div className="relative w-2/3">
            <div className="text-white text-3xl p-10 ">The Weather</div>
            <div className="grid grid-cols-3 gap-3 absolute bottom-0 w-full p-5 ">
              <h1 className="text-5xl text-white">
                {(weather.main.temp - 273).toFixed(2)} deg
              </h1>
              <div className="text-white text-3xl">
                <h1>{weather.name}</h1>
                <br />
                <h1>{date}</h1>
              </div>
              <div className="text-white">
                {weather.weather && weather.weather[0]
                  ? weather.weather[0].description
                  : "Description not available"}
              </div>
            </div>
          </div>
          <div className="min-h-screen  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30  px-5 w-1/3">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row justify-between items-center gap-3">
                <input
                  type="text"
                  name="city"
                  className="bg-transparent border-b-2 p-7 w-full text-white"
                  placeholder="search location"
                />
                <button className="text-4xl bg-orange-500 p-5" type="submit">
                  <FaSearch />
                </button>
              </div>
            </form>
            <div
              className="border-b-2 p-6 pt-20 pb-20
         "
            >
              <ul className="space-y-8 text-white font-semibold">
                <li className="cursor-pointer" onClick={() => {handleCityClick("New York")}}>New York</li>
                <li className="cursor-pointer" onClick={() => {handleCityClick("California")}}>California</li>
                <li className="cursor-pointer" onClick={() => {handleCityClick("Paris")}}>Paris</li>
                <li className="cursor-pointer" onClick={() => {handleCityClick("Tokyo")}}>Tokyo</li>
              </ul>
            </div>

            <div className=" pt-20 ">
              <div className="space-y-10 text-white font-semibold flex flex-row items-center justify-between px-5">
                <h1>Cloudy</h1>
                <h1>{weather.clouds ? ` ${weather.clouds.all}%` : `empty`} </h1>
              </div>
              <div className="space-y-10 text-white font-semibold flex flex-row items-center justify-between px-5">
                <h1>Humidity</h1>
                <h1>{weather.main ? `${weather.main.humidity}%` : "N/A"}</h1>
              </div>
              <div className="space-y-10 text-white font-semibold flex flex-row items-center justify-between px-5">
                <h1>Wind</h1>
                <h1>{weather.wind ? `${weather.wind.speed} m/s` : "N/A"}</h1>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
