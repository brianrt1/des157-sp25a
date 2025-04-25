/* const statsByDay = {
    monday:    { time: "09m 22s", weather: "Sunny",        transport: "Bicycle", avg_speed_mph: 13 },
    tuesday:   { time: "10m 41s", weather: "Partly Cloudy", transport: "Bicycle", avg_speed_mph: 13 },
    wednesday: { time: "12m 02s", weather: "Sunny",        transport: "Bicycle", avg_speed_mph: 12 },
    thursday:  { time: "11m 03s", weather: "Sunny",        transport: "Bicycle", avg_speed_mph: 12 },
    friday:    { time: "11m 45s", weather: "Sunny",        transport: "Bicycle", avg_speed_mph: 12 },
};
  
  function updateOverlays(day) {
    const stat = statsByDay[day.toLowerCase()];
    if (!stat) return;
  
    document.querySelector(".time-icon p").textContent = stat.time;
    document.querySelector(".weather-icon p").textContent = stat.weather;
    document.querySelector(".transport-icon p").textContent = stat.transport;
    document.querySelector(".speed-icon p").textContent = `${stat.avg_speed_mph}mph avg.`;
  }
  
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const day = e.target.textContent;
      updateOverlays(day);
      document.querySelector('.data-display').scrollTo({ top: 0, behavior: 'smooth' }); // Reset scroll position
    });
  });
   */

let statsByDay = {};


fetch('data/data.json')
  .then(res => res.json())
  .then(data => {
    // Transform array into key-value object for fast lookup
    data.commute_stats.forEach(stat => {
      statsByDay[stat.day.toLowerCase()] = stat;
    });

    // Enable day selection once data is ready
    initNavigation();
  })
  .catch(error => {
    console.error("Failed to load commute data:", error);
  });

function updateOverlays(day) {
  const stat = statsByDay[day.toLowerCase()];
  if (!stat) return;

  document.querySelector(".time-icon p").textContent = stat.time;
  document.querySelector(".weather-icon p").textContent = stat.weather;
  document.querySelector(".transport-icon p").textContent = stat.transport;
  document.querySelector(".speed-icon p").textContent = `${stat.avg_speed_mph}mph avg.`;
}

function initNavigation() {
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const day = e.target.textContent.trim();
      updateOverlays(day);
      document.querySelector('.data-display').scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}
