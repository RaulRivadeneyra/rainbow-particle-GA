function particle(p5, magnitude) {
  return {
    position: {
      x: 0,
      y: 0
    },
    angle: p5.random(0, p5.TWO_PI),
    mag: magnitude,
    lifespan: 0,
    hasLifespan: false,
    update() {
      
      //Update rotation
      this.angle %= Math.PI * 2;
      //Update position
      this.position.x += Math.cos(this.angle) *
        this.mag;
      this.position.y -= Math.sin(this.angle) *
        this.mag;
      
      //Update lifespan
      if (this.hasLifespan) this.lifespan -= 1;
      
    },
    draw(){
      p5.stroke(Math.abs(p5.degrees(this.angle)), 100, 100, this.lifespan/255);
      p5.strokeWeight(6);
      p5.point(this.position.x, this.position.y);
    },
    setPosition(x, y){
      this.position.x = x;
      this.position.y = y;
    },
    toggleLifespan(){
      this.hasLifespan = !this.hasLifespan;
    }
  }
}