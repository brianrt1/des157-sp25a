/* (function(){
  'use strict';
  
    async function getCommuteData(){
    const response = await fetch('data/data.json');
    const data = await response.json();
    var statsByDay = {};
    
    // Transform array into key-value object for fast lookup
    for(var i = 0; i < data.commute_stats.length; i++){
      var stat = data.commute_stats[i];
      statsByDay[stat.day.toLowerCase()] = stat;
    }
    
    // Enable day selection once data is ready
    initNavigation(statsByDay);
  }
  
  function updateOverlays(day, statsByDay){
    var stat = statsByDay[day.toLowerCase()];
    if(!stat) return;
    
    document.querySelector(".time-icon p").textContent = stat.time;
    document.querySelector(".weather-icon p").textContent = stat.weather;
    document.querySelector(".transport-icon p").textContent = stat.transport;
    document.querySelector(".speed-icon p").textContent = stat.avg_speed_mph + "mph avg.";
    document.querySelector('.window-2').classList.add('active');
    document.querySelector('.arrow').classList.add('active-1');
  }
  
  function initNavigation(statsByDay){
    var links = document.querySelectorAll('nav ul li a');
    
    for(var i = 0; i < links.length; i++){
      links[i].addEventListener('click', function(event){
        event.preventDefault();
        var day = event.target.textContent.trim();
        updateOverlays(day, statsByDay);
        document.querySelector('.data-display').scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
  
  // Start loading the data when script runs
  getCommuteData().catch(function(error) {
    console.error("Failed to load commute data:", error);
  });
  
})(); // end IIFE */

/* V2 */

(function(){
  'use strict';
  
    async function getCommuteData(){
    const response = await fetch('data/data.json');
    const data = await response.json();
    var statsByDay = {};
    
    // Transform array into key-value object for fast lookup
    for(var i = 0; i < data.commute_stats.length; i++){
      var stat = data.commute_stats[i];
      statsByDay[stat.day.toLowerCase()] = stat;
    }
    
    // Enable day selection once data is ready
    initNavigation(statsByDay);
  }
  
  function updateOverlays(day, statsByDay){
    var stat = statsByDay[day.toLowerCase()];
    if(!stat) return;
    
    document.querySelector(".time-icon p").textContent = stat.time;
    document.querySelector(".weather-icon p").textContent = stat.weather;
    document.querySelector(".transport-icon p").textContent = stat.transport;
    document.querySelector(".speed-icon p").textContent = stat.avg_speed_mph + "mph avg.";
    document.querySelector('.window-2').classList.add('active');
    document.querySelector('.arrow').classList.add('active-1');
  }
  
  function initNavigation(statsByDay){
    var links = document.querySelectorAll('nav ul li a');
    
    for(var i = 0; i < links.length; i++){
      links[i].addEventListener('click', function(event){
        event.preventDefault();
        
        for(var j = 0; j < links.length; j++){
          links[j].classList.remove('active-day');
        }
        
        event.target.classList.add('active-day');
        
        var day = event.target.textContent.trim();
        updateOverlays(day, statsByDay);
        document.querySelector('.data-display').scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
  

  getCommuteData().catch(function(error) {
    console.error("Failed to load commute data:", error);
  });
  
})(); // end IIFE