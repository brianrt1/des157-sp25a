(function() {
    document.addEventListener("DOMContentLoaded", () => {
        const container = document.getElementById("rotationContainer");
        const treeContainer = document.getElementById("treeContainer");
        const oilRigContainer = document.getElementById("oilRigContainer");
        const timeIndicator = document.getElementById("timeIndicator");
        const leftZone = document.getElementById("leftZone");
        const centerZone = document.getElementById("centerZone");
        const rightZone = document.getElementById("rightZone");
        const totalTrees = 34;
        const totalOilRigs = 3;
        let trees = [];
        let oilRigs = [];
        let currentTreeCount = 0;
        let currentOilRigCount = 0;
        let rotationTween;
        let growthInterval;
        let shrinkInterval;
        // Start the world rotation with GSAP
        function startRotation(speed = 60) {
        if (rotationTween) rotationTween.kill();
        if (speed < 0) {
        rotationTween = gsap.to(container, {
        rotation: "-=360",
        duration: Math.abs(speed),
        ease: "none",
        repeat: -1
         });
         } else {
        rotationTween = gsap.to(container, {
        rotation: "+=360",
        duration: speed,
        ease: "none",
        repeat: -1
         });
         }
         }
        // Create tree image
        function createTreeImage() {
        const img = document.createElement("img");
        img.src = "images/trees-04.png";
        img.className = "tree-img";
        return img;
         }
        // Create oil rig image
        function createOilRigImage() {
        const img = document.createElement("img");
        img.src = "images/oil-rig-01.png";
        img.className = "oil-rig-img";
        return img;
         }
        // Calculate viewport edge position for a given angle
        function getViewportEdgePosition(angle) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const maxDistance = Math.max(window.innerWidth, window.innerHeight);
        // Convert angle to radians and calculate edge position
        const radians = (angle - 90) * (Math.PI / 180); // -90 to align with top
        const edgeX = centerX + Math.cos(radians) * maxDistance;
        const edgeY = centerY + Math.sin(radians) * maxDistance;
        return { x: edgeX, y: edgeY };
         }
        // Initialize all trees using GSAP's rotation positioning
        function initializeTrees() {
        for (let i = 0; i < totalTrees; i++) {
        const tree = createTreeImage();
        treeContainer.appendChild(tree);
        const rotationAngle = (360 / totalTrees) * i;
        // Set initial position on planet surface (hidden)
        gsap.set(tree, {
        rotation: rotationAngle + 90,
        transformOrigin: "50% 190px",
        opacity: 0,
        scale: 0,
        y: -200 // On planet surface
         });
        trees.push({
        element: tree,
        index: i,
        angle: rotationAngle,
        grown: false
         });
         }
         }
        // Initialize all oil rigs using GSAP's rotation positioning
        function initializeOilRigs() {
        for (let i = 0; i < totalOilRigs; i++) {
        const oilRig = createOilRigImage();
        oilRigContainer.appendChild(oilRig);
        const rotationAngle = (360 / totalOilRigs) * i;
        // Set initial position on planet surface (hidden)
        gsap.set(oilRig, {
        rotation: rotationAngle + 90,
        transformOrigin: "50% 200px", // Slightly closer to surface due to larger size
        opacity: 0,
        scale: 0,
        y: -205 // Slightly closer to planet surface
         });
        oilRigs.push({
        element: oilRig,
        index: i,
        angle: rotationAngle,
        grown: false
         });
         }
         }
        // Grow a random tree with proper viewport edge animation
        function growRandomTree() {
        const ungrownTrees = trees.filter(tree => !tree.grown);
        if (ungrownTrees.length === 0) return;
        const randomIndex = Math.floor(Math.random() * ungrownTrees.length);
        const treeToGrow = ungrownTrees[randomIndex];
        // Get the tree's world position (accounting for rotation)
        const containerRect = container.getBoundingClientRect();
        const containerCenterX = containerRect.left + containerRect.width / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;
        // Calculate the tree's angle relative to current container rotation
        const currentRotation = gsap.getProperty(container, "rotation") || 0;
        const absoluteAngle = treeToGrow.angle + currentRotation;
        // Get viewport edge position for this angle
        const edgePos = getViewportEdgePosition(absoluteAngle);
        // Calculate offset from container center to viewport edge
        const offsetX = edgePos.x - containerCenterX;
        const offsetY = edgePos.y - containerCenterY;
        // Convert world coordinates to local tree container coordinates
        const localOffsetX = offsetX;
        const localOffsetY = offsetY + 210; // Account for tree container offset
        const tl = gsap.timeline();
        // Start from viewport edge
        gsap.set(treeToGrow.element, {
        x: localOffsetX,
        y: localOffsetY,
        opacity: 0,
        scale: 0.2
         });
        // Animate to planet surface
        tl.to(treeToGrow.element, {
        opacity: 1,
        duration: 0.3
         })
         .to(treeToGrow.element, {
        x: 0,
        y: -200, // Planet surface position
        scale: 1,
        duration: 1.2,
        ease: "bounce.out"
         });
        treeToGrow.grown = true;
        currentTreeCount++;
        updateTimeEra();
         }
        // Grow a random oil rig with proper viewport edge animation
        function growRandomOilRig() {
        const ungrownOilRigs = oilRigs.filter(oilRig => !oilRig.grown);
        if (ungrownOilRigs.length === 0) return;
        const randomIndex = Math.floor(Math.random() * ungrownOilRigs.length);
        const oilRigToGrow = ungrownOilRigs[randomIndex];
        // Get the oil rig's world position (accounting for rotation)
        const containerRect = container.getBoundingClientRect();
        const containerCenterX = containerRect.left + containerRect.width / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;
        // Calculate the oil rig's angle relative to current container rotation
        const currentRotation = gsap.getProperty(container, "rotation") || 0;
        const absoluteAngle = oilRigToGrow.angle + currentRotation;
        // Get viewport edge position for this angle
        const edgePos = getViewportEdgePosition(absoluteAngle);
        // Calculate offset from container center to viewport edge
        const offsetX = edgePos.x - containerCenterX;
        const offsetY = edgePos.y - containerCenterY;
        // Convert world coordinates to local oil rig container coordinates
        const localOffsetX = offsetX;
        const localOffsetY = offsetY + 210; // Account for oil rig container offset
        const tl = gsap.timeline();
        // Start from viewport edge
        gsap.set(oilRigToGrow.element, {
        x: localOffsetX,
        y: localOffsetY,
        opacity: 0,
        scale: 0.2
         });
        // Animate to planet surface
        tl.to(oilRigToGrow.element, {
        opacity: 1,
        duration: 0.3
         })
         .to(oilRigToGrow.element, {
        x: 0,
        y: -205, // Planet surface position
        scale: 1,
        duration: 1.2,
        ease: "bounce.out"
         });
        oilRigToGrow.grown = true;
        currentOilRigCount++;
        updateTimeEra();
         }
        // Shrink a random grown tree back to viewport edge
        function shrinkRandomTree() {
        const grownTrees = trees.filter(tree => tree.grown);
        if (grownTrees.length === 0) return;
        const randomIndex = Math.floor(Math.random() * grownTrees.length);
        const treeToShrink = grownTrees[randomIndex];
        // Get current world position for pickup direction
        const containerRect = container.getBoundingClientRect();
        const containerCenterX = containerRect.left + containerRect.width / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;
        const currentRotation = gsap.getProperty(container, "rotation") || 0;
        const absoluteAngle = treeToShrink.angle + currentRotation;
        const edgePos = getViewportEdgePosition(absoluteAngle);
        const offsetX = edgePos.x - containerCenterX;
        const offsetY = edgePos.y - containerCenterY + 210;
        // Animate tree being "picked up" to viewport edge
        gsap.to(treeToShrink.element, {
        x: offsetX,
        y: offsetY,
        opacity: 0,
        scale: 0.1,
        duration: 1.0,
        ease: "power2.in",
        onComplete: () => {
        // Reset position after animation
        gsap.set(treeToShrink.element, {
        x: 0,
        y: -200,
        scale: 0
         });
         }
         });
        treeToShrink.grown = false;
        currentTreeCount--;
        updateTimeEra();
         }
        // Shrink a random grown oil rig back to viewport edge
        function shrinkRandomOilRig() {
        const grownOilRigs = oilRigs.filter(oilRig => oilRig.grown);
        if (grownOilRigs.length === 0) return;
        const randomIndex = Math.floor(Math.random() * grownOilRigs.length);
        const oilRigToShrink = grownOilRigs[randomIndex];
        // Get current world position for pickup direction
        const containerRect = container.getBoundingClientRect();
        const containerCenterX = containerRect.left + containerRect.width / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;
        const currentRotation = gsap.getProperty(container, "rotation") || 0;
        const absoluteAngle = oilRigToShrink.angle + currentRotation;
        const edgePos = getViewportEdgePosition(absoluteAngle);
        const offsetX = edgePos.x - containerCenterX;
        const offsetY = edgePos.y - containerCenterY + 210;
        // Animate oil rig being "picked up" to viewport edge
        gsap.to(oilRigToShrink.element, {
        x: offsetX,
        y: offsetY,
        opacity: 0,
        scale: 0.1,
        duration: 1.0,
        ease: "power2.in",
        onComplete: () => {
        // Reset position after animation
        gsap.set(oilRigToShrink.element, {
        x: 0,
        y: -205,
        scale: 0
         });
         }
         });
        oilRigToShrink.grown = false;
        currentOilRigCount--;
        updateTimeEra();
         }
        // Update the time era display
        function updateTimeEra() {
        const treePercentage = currentTreeCount / totalTrees;
        const oilRigPercentage = currentOilRigCount / totalOilRigs;
        let era = "Beginning";
        let bgColor = "rgba(0, 0, 0, 0.7)";
        
        // Determine era based on tree and oil rig counts - check most specific conditions first
        if (treePercentage === 0 && oilRigPercentage >= 1) {
        era = "3050 AD";
        bgColor = "rgba(10, 220, 120, 0.7)";
         } else if (treePercentage > 0 && treePercentage < 0.5 && oilRigPercentage >= 1) {
        era = "2750 AD";
        bgColor = "rgba(20, 200, 100, 0.7)";
         } else if (treePercentage >= 0.5 && treePercentage < 1.0 && oilRigPercentage >= 1) {
        era = "2500 AD";
        bgColor = "rgba(30, 180, 90, 0.7)";
         } else if (treePercentage >= 1.0 && oilRigPercentage >= 1) {
        era = "2250 AD";
        bgColor = "rgba(40, 160, 80, 0.7)";
         } else if (treePercentage >= 1.0 && oilRigPercentage > 0 && oilRigPercentage < 1) {
        era = "2025 AD";
        bgColor = "rgba(50, 140, 70, 0.7)";
         } else if (treePercentage >= 1.0 && oilRigPercentage === 0) {
        era = "1750 AD";
        bgColor = "rgba(60, 120, 60, 0.7)";
         } else if (treePercentage >= 0.35 && treePercentage < 1.0 && oilRigPercentage === 0) {
        era = "1500 AD";
        bgColor = "rgba(80, 100, 50, 0.7)";
         } else if (treePercentage > 0 && treePercentage < 0.35 && oilRigPercentage === 0) {
        era = "1300 AD";
        bgColor = "rgba(90, 70, 50, 0.7)";
         } else if (treePercentage === 0 && oilRigPercentage === 0) {
        era = "1050 AD";
        bgColor = "rgba(100, 50, 50, 0.7)";
         }
        
        timeIndicator.textContent = `${era}`;
        gsap.to(timeIndicator, { background: bgColor, duration: 0.5 });
         }
        // Check if oil rigs should start appearing (after trees are filled - 1750 AD)
        function shouldOilRigsAppear() {
        const treePercentage = currentTreeCount / totalTrees;
        return treePercentage >= 1.0; // Only after all trees are grown (1750 AD)
         }
        // Check if trees should start declining (2500 AD - when oil rigs are maxed)
        function shouldTreesDecline() {
        const oilRigPercentage = currentOilRigCount / totalOilRigs;
        return oilRigPercentage >= 1.0; // Trees start declining when all oil rigs are built
         }
        // Handle mouse movement
        document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const windowWidth = window.innerWidth;
        const leftBoundary = windowWidth * 0.3;
        const rightBoundary = windowWidth * 0.7;
        clearInterval(growthInterval);
        clearInterval(shrinkInterval);
        leftZone.classList.remove('active');
        centerZone.classList.remove('active');
        rightZone.classList.remove('active');
        if (mouseX < leftBoundary) {
        leftZone.classList.add('active');
        startRotation(-20);
        shrinkInterval = setInterval(() => {
        // Going backwards in time: Remove oil rigs first, then trees
        if (currentOilRigCount > 0) {
        shrinkRandomOilRig();
         } else if (currentTreeCount > 0) {
        shrinkRandomTree();
         }
         }, 800);
         } else if (mouseX > rightBoundary) {
        rightZone.classList.add('active');
        startRotation(20);
        growthInterval = setInterval(() => {
        // Going forward in time: Add trees first (until full), then oil rigs, then remove trees
        const treePercentage = currentTreeCount / totalTrees;
        const oilRigPercentage = currentOilRigCount / totalOilRigs;
        if (currentTreeCount < totalTrees && !shouldTreesDecline()) {
        // Still growing trees (before 1750 or before trees start declining at 2500)
        growRandomTree();
         } else if (shouldOilRigsAppear() && currentOilRigCount < totalOilRigs) {
        // Trees are full, now grow oil rigs (1750-2250)
        growRandomOilRig();
         } else if (shouldTreesDecline() && currentTreeCount > 0) {
        // Oil rigs are maxed, now decline trees (2500-3050)
        if (Math.random() < 0.7) { // Higher chance to remove trees in decline phase
        shrinkRandomTree();
         }
         }
         }, 600);
         } else {
        centerZone.classList.add('active');
        startRotation(60);
         }
         });
        // Initialize everything
        initializeTrees();
        initializeOilRigs();
        startRotation();
        updateTimeEra();
        // Start with a few trees
        setTimeout(() => {
        for (let i = 0; i < 4; i++) {
        setTimeout(growRandomTree, i * 1200);
         }
         }, 2000);
         });
  })();