# 🌦️ Weather App

A modern and responsive **React-based Weather Application** that allows users to check real-time weather data using either their **current location (GPS tracking)** or by **searching any city worldwide**.  

🔗 **Live Demo:** [https://wather-vert.vercel.app/]

---

## 🚀 Features

✅ **Live Weather Data** – Displays temperature, humidity, wind speed, and sky condition in real time.  
✅ **Current Location Support** – Detects your location automatically and shows the weather instantly.  
✅ **Search by City** – Type any city name to get accurate weather information.  
✅ **Dynamic UI** – Background color/gradient changes according to the weather (Sunny, Rainy, Cloudy, etc.).  
✅ **Responsive Design** – Works seamlessly across mobile, tablet, and desktop devices.  
✅ **Error Handling** – Gracefully handles invalid city names or denied location permissions.  

---

## 🧠 How It Works

1. On load, the app asks for your **location permission** using the browser’s Geolocation API.  
2. If allowed, it fetches your current coordinates and gets weather data via the **Weather API**.  
3. You can also **manually search** for any city and see the live weather instantly.  
4. The app dynamically updates the **UI gradient and icons** based on weather conditions.  

---

## 🛠️ Tech Stack

- ⚛️ **React (Vite)**
- 🎨 **Tailwind CSS**
- 🌍 **WeatherAPI / OpenWeatherMap**
- 🧩 **Lucide Icons**
- 🚀 **Deployed on [Vercel](https://vercel.com)**

---

## ⚙️ Installation & Setup

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/anuj-1104/wather_app.git

# Go into the project folder
cd wather_app

# Install dependencies
npm install

# Start development server
npm run dev
