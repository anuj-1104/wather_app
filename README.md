# 🌤️ React Weather Dashboard

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)

A responsive, data-rich weather dashboard built with React. It provides real-time meteorological data, interactive forecasts, and a seamless user experience for tracking global weather conditions.

## ✨ Features & Tech Stack

*   **Real-Time Metrics:** Displays current temperature, humidity, wind speed, and atmospheric pressure.
*   **Dynamic Search:** Search for any global city to instantly retrieve and render its climate data.
*   **Responsive Layout:** A mobile-first dashboard design that adapts perfectly to desktop, tablet, and mobile screens.
*   **Core Stack:** React.js, CSS/Tailwind for UI styling, and Axios/Fetch for asynchronous API requests.

## 🚀 Getting Started

Follow these steps to run the dashboard locally on your machine.

1.  **Clone the repository:** 
    `git clone https://github.com/anuj-1104/react-weather-dashboard.git`
2.  **Install dependencies:** 
    Navigate into the project directory and run `npm install`.
3.  **Configure Environment:** 
    Create a `.env` file in the root directory and add your provider's API key (e.g., `REACT_APP_WEATHER_API_KEY=your_key_here`).
4.  **Launch the App:** 
    Run `npm start` (or `npm run dev` if using Vite) to spin up the local development server.

## 📡 API Integration

This dashboard relies on an external weather provider to populate its data streams.

*   **Data Source:** Built to integrate with standard weather APIs (like OpenWeatherMap or WeatherAPI).
*   **Data Flow:** The application fetches JSON payloads asynchronously and maps the data to the React component state for UI rendering.
*   **Error Handling:** Includes graceful fallback UI states for failed API calls, timeouts, or invalid city searches.
