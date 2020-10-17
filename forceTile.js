function forceTile(p5) {
    let width = 0;
    let origin = {
      x: 0,
      y: 0
    }
    return {
      origin,
      width,
      color: 200,
      //Vector properties
      mag: p5.random(1, 3),
      angle: p5.random(0, p5.TWO_PI),
      draw() {
        p5.stroke(this.color, 100, 100, 1);
        p5.noFill();
        p5.strokeWeight(1);
        p5.rect(this.origin.x, this.origin.y,
          this.width, this.width);
        let centerX = this.origin.x + (this.width / 2);
        let centerY = this.origin.y + (this.width / 2);
        let modifiedMag = this.mag * (this.width/25);
        p5.strokeWeight(1);
        p5.line(centerX, centerY,
              centerX + (Math.cos(this.angle) * modifiedMag),
              centerY - (Math.sin(this.angle) * modifiedMag));
      },
      isColliding(particle){
        if (particle.position.x >= this.origin.x && 
            particle.position.y >= this.origin.y &&
            particle.position.x <= this.origin.x + this.width &&
            particle.position.y <= this.origin.y + this.width){
          return true
        } else {
          return false
        }
      }
    }
  }