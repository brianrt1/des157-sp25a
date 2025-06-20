(function() {
    // Configuration
    const ELEMENTS = {
      trees: {
        total: 34,
        src: "images/trees-04.png",
        className: "tree-img",
        containerID: "treeContainer",
        yPos: -200,
        rotation: 90,
        transformOrigin: "50% 190px"
      },
      cities: {
        total: 6,
        src: "images/city-1.png", 
        className: "city-img",
        containerID: "cityContainer",
        yPos: -202,
        rotation: 10,
        transformOrigin: "50% 195px"
      },
      oilRigs: {
        total: 3,
        src: "images/oil-rig-01.png",
        className: "oil-rig-img", 
        containerID: "oilRigContainer",
        yPos: -205,
        rotation: 90,
        transformOrigin: "50% 200px"
      },
      antennas: {
        total: 5,
        src: "images/antenna-01.png",
        className: "antenna-img",
        containerID: "antennaContainer", 
        yPos: -202,
        rotation: 55,
        transformOrigin: "50% 195px"
      },
      nuclear: {
        total: 3,
        src: "images/nuclear-1.png",
        className: "nuclear-img",
        containerID: "nuclearContainer",
        yPos: -202,
        rotation: 40,
        transformOrigin: "50% 195px"
      },
      smokestacks: {
        total: 5,
        src: "images/smokestacks-1.png",
        className: "smokestacks-img",
        containerID: "smokestacksContainer",
        yPos: -202,
        rotation: 25,
        transformOrigin: "50% 195px"
      },
      spaceJunk: {
        total: 3,
        src: "images/space-junk-1.png",
        className: "space-junk-img",
        containerID: "spaceJunkContainer",
        yPos: -202,
        rotation: 57,
        transformOrigin: "50% 195px"
      }
    };
  
    // Global state object - keeps everything organized
    const gameState = {
      isReinterpretationMode: false,
      splashesDisabled: false,
      navShown: { nav2: false, nav3: false, nav4: false, nav5: false },
      elements: {}, // Will hold all element arrays
      counts: {}, // Will hold all current counts
      containers: {}, // Will hold all container references
      intervals: { rotation: null, growth: null, shrink: null }
    };

    // Function to get current tutorial elements (mobile or desktop)
    function getCurrentTutorialElements() {
      const isDesktop = window.innerWidth >= 800;
      
      if (isDesktop) {
        return {
          right: document.querySelector(".tutorial-right-desktop"),
          left: document.querySelector(".tutorial-left-desktop"), 
          center: document.querySelector(".tutorial-center-desktop")
        };
      } else {
        return {
          right: document.querySelector(".tutorial-right-mobile"),
          left: document.querySelector(".tutorial-left-mobile"), 
          center: document.querySelector(".tutorial-center-mobile")
        };
      }
    }

    // Function to animate text using SplitText
    function animateText(selector, staggerAmount = 1) {
      try {
        if (typeof gsap === 'undefined' || typeof SplitText === 'undefined') {
          return;
        }
        
        const element = document.querySelector(selector);
        if (!element) {
          return;
        }
        
        // Clear any existing SplitText instances on this element
        if (element._splitText) {
          element._splitText.revert();
        }
        
        // Make sure parent element is visible first
        gsap.set(element, { opacity: 1 });
        
        const split = SplitText.create(selector, { type: "chars words lines" });
        element._splitText = split; // Store reference for cleanup
        
        // Set initial state for characters
        gsap.set(split.chars, { y: 100, autoAlpha: 0 });
        
        // Animate in
        gsap.to(split.chars, {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          stagger: { amount: staggerAmount, from: "left" },
          ease: "power2.out"
        });
        
      } catch (error) {
        // Silent error handling
      }
    }

    // Function to animate tutorial text when shown
    function animateTutorialText(element) {
      const textElement = element.querySelector('p');
      if (!textElement) return;
      
      const className = textElement.className;
      if (className) {
        // Add a small delay to ensure element is visible
        setTimeout(() => {
          animateText(`.${className}`, 0.8);
        }, 100);
      }
    }
  
    // Function to reset cursor to center
    function resetCursorToCenter() {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const centerElement = document.createElement('div');
      centerElement.style.position = 'fixed';
      centerElement.style.left = centerX + 'px';
      centerElement.style.top = centerY + 'px';
      centerElement.style.width = '1px';
      centerElement.style.height = '1px';
      centerElement.style.pointerEvents = 'none';
      centerElement.style.zIndex = '9999';
      document.body.appendChild(centerElement);
      
      const event = new MouseEvent('mousemove', {
        clientX: centerX,
        clientY: centerY,
        bubbles: true
      });
      document.dispatchEvent(event);
      
      setTimeout(() => {
        document.body.removeChild(centerElement);
      }, 100);
    }
  
    // Unified function to create any element
    function createElement(type) {
      const config = ELEMENTS[type];
      const img = document.createElement("img");
      img.src = config.src;
      img.className = config.className;
      return img;
    }
  
    // Calculate viewport edge position
    function getViewportEdgePosition(angle) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const maxDistance = Math.max(window.innerWidth, window.innerHeight);
      const radians = (angle - 90) * (Math.PI / 180);
      const edgeX = centerX + Math.cos(radians) * maxDistance;
      const edgeY = centerY + Math.sin(radians) * maxDistance;
      return { x: edgeX, y: edgeY };
    }
  
    // Unified function to initialize elements of any type
    function initializeElements(type) {
      const config = ELEMENTS[type];
      if (!config) {
        return;
      }
      
      const container = gameState.containers[type];
      if (!container) {
        return;
      }
      
      const total = gameState.isReinterpretationMode && type === 'trees' ? 34 : 
                    gameState.isReinterpretationMode && type === 'cities' ? 12 : config.total;
      
      gameState.elements[type] = [];
      gameState.counts[type] = 0;
      
      for (let i = 0; i < total; i++) {
        const element = createElement(type);
        container.appendChild(element);
        const rotationAngle = (360 / total) * i;
        
        gsap.set(element, {
          rotation: rotationAngle + config.rotation,
          transformOrigin: config.transformOrigin,
          opacity: 0,
          scale: 0,
          y: config.yPos
        });
        
        gameState.elements[type].push({
          element: element,
          index: i,
          angle: rotationAngle,
          grown: false
        });
      }
    }
  
    // Unified function to grow any element type
    function growRandomElement(type) {
      if (!gameState.elements[type] || !Array.isArray(gameState.elements[type])) {
        return;
      }
      
      const ungrownElements = gameState.elements[type].filter(item => item && !item.grown);
      if (ungrownElements.length === 0) return;
      
      const randomElement = ungrownElements[Math.floor(Math.random() * ungrownElements.length)];
      if (!randomElement || !randomElement.element) {
        return;
      }
      
      const config = ELEMENTS[type];
      const container = document.getElementById("rotationContainer");
      if (!container) {
        return;
      }
      
      // Get animation positions
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;
      const currentRotation = gsap.getProperty(container, "rotation") || 0;
      const absoluteAngle = randomElement.angle + currentRotation;
      const edgePos = getViewportEdgePosition(absoluteAngle);
      const offsetX = edgePos.x - containerCenterX;
      const offsetY = edgePos.y - containerCenterY;
      const localOffsetX = offsetX;
      const localOffsetY = offsetY + 210;
      
      // Animate from edge to planet
      gsap.set(randomElement.element, {
        x: localOffsetX,
        y: localOffsetY,
        opacity: 0,
        scale: 0.2
      });
      
      const tl = gsap.timeline();
      tl.to(randomElement.element, {
        opacity: 1,
        duration: 0.3
      }).to(randomElement.element, {
        x: 0,
        y: config.yPos,
        scale: 1,
        duration: 1.2,
        ease: "bounce.out"
      });
      
      randomElement.grown = true;
      gameState.counts[type]++;
      updateTimeEra();
    }
  
    // Unified function to shrink any element type
    function shrinkRandomElement(type) {
      const grownElements = gameState.elements[type].filter(item => item.grown);
      if (grownElements.length === 0) return;
      
      const randomElement = grownElements[Math.floor(Math.random() * grownElements.length)];
      const config = ELEMENTS[type];
      const container = document.getElementById("rotationContainer");
      
      // Get animation positions
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;
      const currentRotation = gsap.getProperty(container, "rotation") || 0;
      const absoluteAngle = randomElement.angle + currentRotation;
      const edgePos = getViewportEdgePosition(absoluteAngle);
      const offsetX = edgePos.x - containerCenterX;
      const offsetY = edgePos.y - containerCenterY + 210;
      
      // Animate to edge
      gsap.to(randomElement.element, {
        x: offsetX,
        y: offsetY,
        opacity: 0,
        scale: 0.1,
        duration: 1.0,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(randomElement.element, {
            x: 0,
            y: config.yPos,
            scale: 0
          });
        }
      });
      
      randomElement.grown = false;
      gameState.counts[type]--;
      updateTimeEra();
    }
  
    // Start world rotation
    function startRotation(speed = 60) {
      if (gameState.intervals.rotation) {
        clearInterval(gameState.intervals.rotation);
        gameState.intervals.rotation = null;
      }
      
      if (speed < 0) {
        gameState.intervals.rotation = gsap.to("#rotationContainer", {
          rotation: "-=360",
          duration: Math.abs(speed),
          ease: "none",
          repeat: -1
        });
      } else {
        gameState.intervals.rotation = gsap.to("#rotationContainer", {
          rotation: "+=360", 
          duration: speed,
          ease: "none",
          repeat: -1
        });
      }
    }
  
    // Clear all containers and reset state
    function clearAll() {
      const elementTypes = ['trees', 'cities', 'oilRigs', 'antennas', 'nuclear', 'smokestacks', 'spaceJunk'];
      
      for (let i = 0; i < elementTypes.length; i++) {
        const type = elementTypes[i];
        if (gameState.containers[type]) {
          gameState.containers[type].innerHTML = '';
        }
        gameState.elements[type] = [];
        gameState.counts[type] = 0;
      }
    }
  
    // Initialize all element types
    function initializeAll() {
      const elementTypes = ['trees', 'cities', 'oilRigs', 'antennas', 'nuclear', 'smokestacks', 'spaceJunk'];
      
      for (let i = 0; i < elementTypes.length; i++) {
        const type = elementTypes[i];
        initializeElements(type);
      }
    }
  
    // Special functions for reinterpretation mode
    function removeIndustrialBuildings() {
      const industrialTypes = ['oilRigs', 'antennas', 'nuclear', 'smokestacks', 'spaceJunk'];
      const industrialElements = [];
      
      industrialTypes.forEach(type => {
        gameState.elements[type].filter(item => item.grown).forEach(item => {
          industrialElements.push({...item, type});
        });
      });

      industrialElements.forEach((item, index) => {
        setTimeout(() => {
          const container = document.getElementById("rotationContainer");
          const containerRect = container.getBoundingClientRect();
          const containerCenterX = containerRect.left + containerRect.width / 2;
          const containerCenterY = containerRect.top + containerRect.height / 2;
          const currentRotation = gsap.getProperty(container, "rotation") || 0;
          const absoluteAngle = item.angle + currentRotation;
          const edgePos = getViewportEdgePosition(absoluteAngle);
          const offsetX = edgePos.x - containerCenterX;
          const offsetY = edgePos.y - containerCenterY + 210;

          gsap.to(item.element, {
            x: offsetX,
            y: offsetY,
            opacity: 0,
            scale: 0.1,
            duration: 1.0,
            ease: "power2.in",
            onComplete: () => {
              if (item.element && item.element.parentNode) {
                item.element.parentNode.removeChild(item.element);
              }
              item.grown = false;
            }
          });
        }, index * 100);
      });
    }
  


    function animateAllElementsOffWorld() {
      const allElements = [];
      
    // Refactor later
    const elementTypes = Object.keys(ELEMENTS);

for (let i = 0; i < elementTypes.length; i++) {
  const type = elementTypes[i];
  const elements = gameState.elements[type];

  for (let j = 0; j < elements.length; j++) {
    const item = elements[j];

    if (item.grown) {
      const newItem = Object.assign({}, item);
      newItem.type = type;
      allElements.push(newItem);
    }
  }
}

      // Shuffle to avoid spiral effect
      const shuffledElements = allElements.sort(() => Math.random() - 0.5);

      shuffledElements.forEach((item, index) => {
        setTimeout(() => {
          const container = document.getElementById("rotationContainer");
          const containerRect = container.getBoundingClientRect();
          const containerCenterX = containerRect.left + containerRect.width / 2;
          const containerCenterY = containerRect.top + containerRect.height / 2;
          const currentRotation = gsap.getProperty(container, "rotation") || 0;
          const absoluteAngle = item.angle + currentRotation;
          const edgePos = getViewportEdgePosition(absoluteAngle);
          const offsetX = edgePos.x - containerCenterX;
          const offsetY = edgePos.y - containerCenterY + 210;

          gsap.to(item.element, {
            x: offsetX,
            y: offsetY,
            opacity: 0,
            scale: 0.1,
            duration: 1.0,
            ease: "power2.in",
            onComplete: () => {
              if (item.element && item.element.parentNode) {
                item.element.parentNode.removeChild(item.element);
              }
              item.grown = false;
            }
          });
        }, index * 80);
      });
    }
  
    // Mode switching functions
    function enterReinterpretationMode() {
      gameState.isReinterpretationMode = true;
      gameState.splashesDisabled = true;
      
      removeIndustrialBuildings();
      
      setTimeout(() => {
        clearAll();
        initializeElements('trees');
        initializeElements('cities');
        
        setTimeout(() => {
          // Start with more trees initially
          for (let i = 0; i < 12; i++) {
            setTimeout(() => growRandomElement('trees'), i * 200);
          }
          // Start with more cities initially (grow 8 out of 12 available)
          for (let i = 0; i < 8; i++) {
            setTimeout(() => growRandomElement('cities'), i * 300 + 1000);
          }
        }, 500);
      }, 1500);
    }
  
    function resetTo3050AD() {
      if (!gameState.isReinterpretationMode) return;
      
      animateAllElementsOffWorld();
      
      setTimeout(() => {
        gameState.isReinterpretationMode = false;
        clearAll();
        initializeAll();
        
        setTimeout(() => {
          const industrialTypes = ['oilRigs', 'antennas', 'cities', 'nuclear', 'smokestacks', 'spaceJunk'];
          industrialTypes.forEach((type, typeIndex) => {
            const total = ELEMENTS[type].total;
            for (let i = 0; i < total; i++) {
              setTimeout(() => growRandomElement(type), i * 100 + typeIndex * 50);
            }
          });
        }, 500);
      }, 1500);
    }
  
    // Time era calculation with automatic progression
    function updateTimeEra() {
      const treePercentage = gameState.counts.trees / ELEMENTS.trees.total;
      
      // Check if all industrial types are full using traditional for loop
      const industrialTypes = ['oilRigs', 'antennas', 'nuclear', 'smokestacks', 'spaceJunk'];
      let allIndustrialFull = true;
      
      for (let i = 0; i < industrialTypes.length; i++) {
        const type = industrialTypes[i];
        if (gameState.counts[type] < ELEMENTS[type].total) {
          allIndustrialFull = false;
          break;
        }
      }
      
      let era = "Beginning";
      let bgColor = "rgba(0, 0, 0, 0.7)";
      
      if (gameState.isReinterpretationMode) {
        era = "A Better Future";
        bgColor = "rgba(0, 150, 0, 0.8)";
      } else {
        if (treePercentage === 0 && allIndustrialFull) {
          era = "3050 AD";
          bgColor = "rgba(10, 220, 120, 0.7)";
        } else if (treePercentage >= 1.0 && allIndustrialFull) {
          era = "2250 AD";
          bgColor = "rgba(40, 160, 80, 0.7)";
        } else if (treePercentage >= 1.0) {
          era = "1750 AD";
          bgColor = "rgba(60, 120, 60, 0.7)";
        } else if (treePercentage > 0) {
          era = "1300 AD";
          bgColor = "rgba(90, 70, 50, 0.7)";
        } else {
          era = "1050 AD";
          bgColor = "rgba(100, 50, 50, 0.7)";
        }
      }
      
      const timeIndicator = document.getElementById('timeIndicator');
      if (timeIndicator) {
        timeIndicator.textContent = era;
        gsap.to(timeIndicator, { background: bgColor, duration: 0.5 });
      }
      
      // Show navigation at key points
      if (!gameState.splashesDisabled) {
        // Change trigger to 34 trees (all trees grown)
        if (gameState.counts.trees === 34 && !gameState.navShown.nav2) {
          showNav('2');
          gameState.navShown.nav2 = true;
        }
        if (treePercentage >= 1.0 && allIndustrialFull && !gameState.navShown.nav3) {
          showNav('3');
          gameState.navShown.nav3 = true;
          
          // Start automatic tree removal after nav-3 is shown to ensure progression
          setTimeout(() => {
            const autoRemovalInterval = setInterval(() => {
              if (gameState.counts.trees > 0 && !gameState.navShown.nav4) {
                shrinkRandomElement('trees');
              } else {
                clearInterval(autoRemovalInterval);
              }
            }, 800);
          }, 3000); // Give user 3 seconds to see nav-3, then start auto-removal
        }
        if (treePercentage === 0 && allIndustrialFull && !gameState.navShown.nav4) {
          showNav('4');
          gameState.navShown.nav4 = true;
        }
      }
    }
  
    // Show navigation overlays - UPDATED with text animation
    function showNav(navName) {
      const nav = document.querySelector(`.nav-${navName}`);
      if (!nav) {
        return;
      }
      nav.style.display = "flex";
      gsap.set(nav, { y: window.innerHeight, opacity: 0 });
      gsap.to(nav, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          resetCursorToCenter();
          // Animate text after nav is fully visible
          setTimeout(() => {
            animateText(`.text-${navName}`, 0.4);
          }, 100);
        }
      });
    }
  
    // Setup zone-based interaction (original system)
    function setupZoneInteraction() {
      const leftZone = document.getElementById('leftZone');
      const centerZone = document.getElementById('centerZone');
      const rightZone = document.getElementById('rightZone');
      
      if (!leftZone || !centerZone || !rightZone) {
        return;
      }

      // Clear intervals when mouse leaves zones
      function clearIntervals() {
        if (gameState.intervals.growth) {
          clearInterval(gameState.intervals.growth);
          gameState.intervals.growth = null;
        }
        if (gameState.intervals.shrink) {
          clearInterval(gameState.intervals.shrink);
          gameState.intervals.shrink = null;
        }
        
        // Remove active classes
        leftZone.classList.remove('active');
        centerZone.classList.remove('active');
        rightZone.classList.remove('active');
      }

      // Right zone: advance time (grow elements)
      function handleRightZone() {
        clearIntervals();
        rightZone.classList.add('active');
        startRotation(20);
        
        if (gameState.isReinterpretationMode) {
          gameState.intervals.growth = setInterval(() => {
            const maxTrees = 34;
            const maxCities = 12;
            
            // In reinterpretation mode, grow both trees and cities simultaneously
            const canGrowTrees = gameState.counts.trees < maxTrees;
            const canGrowCities = gameState.counts.cities < maxCities;
            
            if (canGrowTrees && canGrowCities) {
              // Both can grow - randomly choose with preference for trees
              if (Math.random() < 0.7) {
                growRandomElement('trees');
              } else {
                growRandomElement('cities');
              }
            } else if (canGrowTrees) {
              // Only trees can grow
              growRandomElement('trees');
            } else if (canGrowCities) {
              // Only cities can grow
              growRandomElement('cities');
            }
          }, 400);
        } else {
          // Normal growth logic using traditional if statements
          gameState.intervals.growth = setInterval(() => {
            const treePercentage = gameState.counts.trees / ELEMENTS.trees.total;
            
            // Check if all industrial is full using traditional loop
            const industrialTypes = ['oilRigs', 'antennas', 'nuclear', 'smokestacks', 'spaceJunk'];
            let allIndustrialFull = true;
            
            for (let i = 0; i < industrialTypes.length; i++) {
              const type = industrialTypes[i];
              if (gameState.counts[type] < ELEMENTS[type].total) {
                allIndustrialFull = false;
                break;
              }
            }
            
            if (gameState.counts.trees < ELEMENTS.trees.total && !allIndustrialFull) {
              growRandomElement('trees');
            } else if (treePercentage >= 1.0 && !allIndustrialFull) {
              // Grow industrial elements using traditional loop
              const growOrder = ['oilRigs', 'antennas', 'cities', 'nuclear', 'smokestacks', 'spaceJunk'];
              
              for (let i = 0; i < growOrder.length; i++) {
                const type = growOrder[i];
                if (gameState.counts[type] < ELEMENTS[type].total) {
                  growRandomElement(type);
                  break;
                }
              }
            } else if (allIndustrialFull && gameState.counts.trees > 0) {
              // Aggressively remove trees once all industrial is built
              if (Math.random() < 0.9) {
                shrinkRandomElement('trees');
              }
            }
          }, 600);
        }
      }

      // Left zone: reverse time (shrink elements)
      function handleLeftZone() {
        clearIntervals();
        leftZone.classList.add('active');
        startRotation(-20);
        
        if (gameState.isReinterpretationMode) {
          resetTo3050AD();
          return;
        }
        
        // Shrink elements in reverse order using traditional approach
        gameState.intervals.shrink = setInterval(() => {
          const shrinkOrder = ['spaceJunk', 'smokestacks', 'nuclear', 'cities', 'antennas', 'oilRigs', 'trees'];
          
          for (let i = 0; i < shrinkOrder.length; i++) {
            const type = shrinkOrder[i];
            if (gameState.counts[type] > 0) {
              shrinkRandomElement(type);
              break;
            }
          }
        }, 800);
      }

      // Center zone: slow time
      function handleCenterZone() {
        clearIntervals();
        centerZone.classList.add('active');
        startRotation(60);
      }

      // Mouse events
      rightZone.addEventListener('mouseenter', handleRightZone);
      leftZone.addEventListener('mouseenter', handleLeftZone);
      centerZone.addEventListener('mouseenter', handleCenterZone);

      // Touch events for mobile
      rightZone.addEventListener('touchstart', handleRightZone, { passive: true });
      leftZone.addEventListener('touchstart', handleLeftZone, { passive: true });
      centerZone.addEventListener('touchstart', handleCenterZone, { passive: true });

      // Clear intervals when leaving zones
      leftZone.addEventListener('mouseleave', clearIntervals);
      centerZone.addEventListener('mouseleave', clearIntervals);
      rightZone.addEventListener('mouseleave', clearIntervals);
      
      // Clear intervals when touch ends
      leftZone.addEventListener('touchend', clearIntervals, { passive: true });
      centerZone.addEventListener('touchend', clearIntervals, { passive: true });
      rightZone.addEventListener('touchend', clearIntervals, { passive: true });
    }
  
    // Main initialization
    document.addEventListener("DOMContentLoaded", () => {
      console.log("DOM loaded, initializing...");
      
      // Initialize containers with error checking
      const elementTypes = ['trees', 'cities', 'oilRigs', 'antennas', 'nuclear', 'smokestacks', 'spaceJunk'];
      let allContainersFound = true;
      
      for (let i = 0; i < elementTypes.length; i++) {
        const type = elementTypes[i];
        const containerID = ELEMENTS[type].containerID;
        const container = document.getElementById(containerID);
        
        if (!container) {
          console.error(`Container not found: ${containerID}`);
          allContainersFound = false;
        } else {
          gameState.containers[type] = container;
          gameState.counts[type] = 0;
        }
      }
      
      if (!allContainersFound) {
        console.error("Some containers missing - initialization aborted");
        return;
      }
      
      // Check for required elements
      const timeIndicator = document.getElementById('timeIndicator');
      if (!timeIndicator) {
        console.error("Time indicator not found");
        return;
      }
      
      console.log("All containers found, proceeding with initialization...");
      
      // Initialize elements and start
      initializeAll();
      startRotation();
      updateTimeEra();
      
      // Start with a few trees
      setTimeout(() => {
        for (let i = 0; i < 4; i++) {
          setTimeout(() => growRandomElement('trees'), i * 1200);
        }
      }, 2000);
      
      // Event listeners
      window.addEventListener('enterReinterpretationMode', enterReinterpretationMode);
      
      // Setup other components
      setupZoneInteraction();
      setupTutorial();
      setupNavigationButtons();
      setupCursorHiding();
      
      // Setup initial text animation for the first nav that's visible
      setTimeout(() => {
        animateText('.text', 0.1);
      }, 500);
      
      console.log("Initialization complete");
    });
  

  
    // Tutorial setup
    function setupTutorial() {
      const zones = {
        right: document.getElementById("rightZone"),
        left: document.getElementById("leftZone"),
        center: document.getElementById("centerZone")
      };
      
      let tutorialStep = 0;
      let currentTutorialElements = getCurrentTutorialElements();
      
      // Check if tutorial elements exist
      if (!currentTutorialElements.right || !currentTutorialElements.left || !currentTutorialElements.center) {
        console.error('Tutorial elements not found:', currentTutorialElements);
        return;
      }
      
      // Update tutorial elements on resize
      function updateTutorialElements() {
        // Hide all current elements safely
        if (currentTutorialElements.right && currentTutorialElements.right.style) {
          currentTutorialElements.right.style.display = "none";
        }
        if (currentTutorialElements.left && currentTutorialElements.left.style) {
          currentTutorialElements.left.style.display = "none";
        }
        if (currentTutorialElements.center && currentTutorialElements.center.style) {
          currentTutorialElements.center.style.display = "none";
        }
        
        // Get new elements and reset tutorial
        currentTutorialElements = getCurrentTutorialElements();
        tutorialStep = 0;
        
        // Show first tutorial element safely
        if (currentTutorialElements.right && currentTutorialElements.right.style) {
          currentTutorialElements.right.style.display = "block";
          currentTutorialElements.right.style.opacity = "1";
          
          // Animate the first tutorial text
          setTimeout(() => {
            const isDesktop = window.innerWidth >= 800;
            const textClass = isDesktop ? '.text-tutorial-right-desktop' : '.text-tutorial-right-mobile';
            animateText(textClass, 0.3);
          }, 500);
        }
      }
      
      // Setup resize listener
      window.addEventListener('resize', updateTutorialElements);
      
      // Show first tutorial element
      if (currentTutorialElements.right) {
        currentTutorialElements.right.style.display = "block";
        currentTutorialElements.right.style.opacity = "1";
      }
      if (currentTutorialElements.left) {
        currentTutorialElements.left.style.display = "none";
      }
      if (currentTutorialElements.center) {
        currentTutorialElements.center.style.display = "none";
      }
      
      // Animate the first tutorial text
      setTimeout(() => {
        const isDesktop = window.innerWidth >= 800;
        const textClass = isDesktop ? '.text-tutorial-right-desktop' : '.text-tutorial-right-mobile';
        animateText(textClass, 0.3);
      }, 500);
      
      function fadeOutAndShowNext(currentElement, nextElement, textClass) {
        if (!currentElement || !currentElement.style) return;
        
        // Clear any existing SplitText before fading out
        const currentTextElement = currentElement.querySelector('p');
        if (currentTextElement && currentTextElement._splitText) {
          currentTextElement._splitText.revert();
        }
        
        currentElement.classList.add("fade-out");
        setTimeout(() => {
          currentElement.style.display = "none";
          currentElement.style.opacity = "0";
          currentElement.classList.remove("fade-out");
          
          if (nextElement && nextElement.style) {
            nextElement.style.display = "block";
            nextElement.style.opacity = "1";
            
            // Animate the new text
            setTimeout(() => {
              if (textClass) {
                animateText(textClass, 0.3);
              }
            }, 50);
          }
        }, 600);
      }
      
      zones.right.addEventListener("mouseenter", () => {
        if (tutorialStep === 0) {
          const isDesktop = window.innerWidth >= 800;
          const textClass = isDesktop ? '.text-tutorial-left-desktop' : '.text-tutorial-left-mobile';
          fadeOutAndShowNext(currentTutorialElements.right, currentTutorialElements.left, textClass);
          tutorialStep = 1;
        }
      });
      
      zones.left.addEventListener("mouseenter", () => {
        if (tutorialStep === 1) {
          const isDesktop = window.innerWidth >= 800;
          const textClass = isDesktop ? '.text-tutorial-center-desktop' : '.text-tutorial-center-mobile';
          fadeOutAndShowNext(currentTutorialElements.left, currentTutorialElements.center, textClass);
          tutorialStep = 2;
        }
      });
      
      zones.center.addEventListener("mouseenter", () => {
        if (tutorialStep === 2) {
          fadeOutAndShowNext(currentTutorialElements.center, null, '');
          tutorialStep = 3;
        }
      });
    }

    // Navigation buttons setup
    function setupNavigationButtons() {
      const navConfigs = [
        { button: ".nav-window .button", nav: ".nav-1" },
        { button: ".nav-window-2 .button", nav: ".nav-2" },
        { button: ".nav-window-3 .button", nav: ".nav-3" },
        { button: ".nav-window-4 .button", nav: ".nav-4", showNext: ".nav-5" },
        { button: ".nav-window-5 .button", nav: ".nav-5", triggerReinterpretation: true }
      ];
      
      navConfigs.forEach((config, index) => {
        const button = document.querySelector(config.button);
        const nav = document.querySelector(config.nav);
        
        if (!button || !nav) {
          return;
        }
        
        function handleButtonClick() {
          resetCursorToCenter();
          gsap.to(nav, {
            y: -window.innerHeight,
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => {
              nav.style.display = "none";
              
              if (config.showNext) {
                setTimeout(() => {
                  const nextNav = document.querySelector(config.showNext);
                  if (nextNav) {
                    nextNav.style.display = "flex";
                    gsap.set(nextNav, { y: window.innerHeight, opacity: 0 });
                    gsap.to(nextNav, {
                      y: 0, opacity: 1, duration: 1.2, ease: "power2.out",
                      onComplete: () => {
                        resetCursorToCenter();
                        // Animate text for the next nav
                        setTimeout(() => {
                          animateText('.text-5', 0.4);
                        }, 200);
                      }
                    });
                  }
                }, 100);
              }
              
              if (config.triggerReinterpretation) {
                setTimeout(() => {
                  window.dispatchEvent(new CustomEvent('enterReinterpretationMode'));
                }, 200);
              }
            }
          });
        }
        
        // Add both click and touch events for mobile compatibility
        button.addEventListener("click", handleButtonClick);
        button.addEventListener("touchend", (e) => {
          e.preventDefault(); // Prevent double-firing on mobile
          resetCursorToCenter();
          handleButtonClick();
        });
      });
    }
  
    // Cursor hiding setup
    function setupCursorHiding() {
      let cursorTimer;
      
      function resetCursorTimer() {
        document.body.style.cursor = "default";
        clearTimeout(cursorTimer);
        cursorTimer = setTimeout(() => {
          document.body.style.cursor = "none";
        }, 6000);
      }
      
      document.addEventListener("mousemove", resetCursorTimer);
      resetCursorTimer();
    }

    function visuallyHideScrollbar() {
        const style = document.createElement('style');
        style.id = 'hide-scroll-style';
        style.innerHTML = `
          body {
            overflow: scroll; /* Keep scroll working */
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE */
          }
      
          body::-webkit-scrollbar {
            width: 0px;
            height: 0px;
            display: none; /* Chrome & Safari */
          }
        `;
        document.head.appendChild(style);
      }
      
  })();