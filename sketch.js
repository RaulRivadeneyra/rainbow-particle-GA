const s = (p) => {
  
  
  let particleSys;
  let forceSys;
  
  // DOM
  let executeButton;
  let drawGridCheckbox;
  let particlesAmountSlider;
  let tilesAmountSlider;
  let particlesMagnitudeSlider;
  let tilesForceSlider;
  let canvasSizeSlider;
  
  // Vars
  let isGridDrawn = false;
  
  
  p.setup = function() {
    initializeDOM();
    
    p.createCanvas(400, 400);
    p.colorMode(p.HSB);

    executeSimulation()
  }

  p.draw = function() {   
    particleSys.run();
    forceSys.applyForces(particleSys.particles);
    if (isGridDrawn) forceSys.draw();
    //console.log(p.frameRate());
  }
  
  function initializeDOM() {
    p.createP("Canvas size:");
    canvasSizeSlider = p.createSlider(100, 1000, 400, 1);

    executeButton = p.createButton("Execute");
    executeButton.mousePressed(executeSimulation);
    drawGridCheckbox = p.createCheckbox('Display Grid', false);
    drawGridCheckbox.changed(toggleGridDraw);
    
    p.createP("Amount of particles:");
    particlesAmountSlider = p.createSlider(1, 200, 5, 1);
    p.createP("Magnitude of particles:");
    particlesMagnitudeSlider = p.createSlider(1, 20, 5, 1);
    p.createP("Amount of force tiles:");
    tilesAmountSlider = p.createSlider(1, 50, 5, 1);
    p.createP("Strength of force tiles:");
    tilesForceSlider = p.createSlider(0, 50, 5);

    
  }
  
  function executeSimulation() {
    p.resizeCanvas(canvasSizeSlider.value(), canvasSizeSlider.value());
    p.background(0,0, 20,1);
    
    // Initialize particles
    particleSys = particleSystem(p);
    particleSys.addParticles(particlesAmountSlider.value(), particlesMagnitudeSlider.value());
    
    // Initialize forces
    forceSys = forceSystem(p, tilesForceSlider.value());
    forceSys.start(tilesAmountSlider.value());
  }
  
  
  function toggleGridDraw() {
    isGridDrawn = !isGridDrawn
  }
}

let myp5 = new p5(s);