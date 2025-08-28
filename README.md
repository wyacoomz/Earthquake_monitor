# Earthquake Visualizer 🌍

A React application that visualizes recent earthquake activity around the world. It provides both a **3D interactive globe** and a **list view** of earthquakes, with color-coded markers based on magnitude. Users can click on an earthquake in the list to fly to its location on the globe.

---

## Features

- **3D Globe View** using `react-globe.gl`  
- **Interactive Map View** using `react-leaflet`  
- **Earthquake List** with scroll and hover details  
- **Color-coded markers** based on magnitude:  
  - Low (≤3) → Green  
  - Medium (≤5) → Orange  
  - Strong (>5) → Red  
- **Fly to location** when clicking an earthquake in the list  
- **Stops globe rotation** when an earthquake is selected  
- **Floating legend** for marker colors  
- **Dark mode** toggle  
- Fully responsive

---

## Folder Structure

```
earthquake-visualizer/
├─ node_modules/
├─ public/
│ └─ earthquake.svg
├─ src/
│ ├─ assets/
│ ├─ components/
│ │ ├─ EarthquakeList.jsx
│ │ ├─ GlobeView.jsx
│ │ ├─ MapView.jsx
│ │ └─ Navbar.jsx
│ ├─ App.css
│ ├─ App.jsx
│ └─ main.jsx
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
└─ vite.config.js
```

---

## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/earthquake-visualizer.git
cd earthquake-visualizer

```
2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev
```

4 Open in your browser.
```
http://localhost:5173
```


## Technologies Used

- React 18 – UI library

- React-Leaflet – Interactive map visualization

- React-Globe.gl – 3D globe visualization

- Bootstrap 5 – UI components and layout

- Vite – Development server and build tool

- ESLint – Linting and code quality

## API

Data is fetched from the USGS Earthquake API:
```
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
```


## Usage

- Use the list on the left to view recent earthquakes.

- Click an earthquake to highlight it on the globe.

- Hover over points on the globe or map to see detailed info.

- Toggle dark mode using the button in the navbar.



 
