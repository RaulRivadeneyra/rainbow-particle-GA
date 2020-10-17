function forceSystem(p5, strength){
    return{
      forceTiles: [],
      strength: strength,
      start(amount){
        let width = p5.width / amount;
        for (let x = 0; x < amount; x++) {
          for (let y = 0; y < amount; y++) {
            let tile = forceTile(p5);
            tile.origin.x = x * width;
            tile.origin.y = y * width;
            tile.width = width;
            this.forceTiles.push(tile);
          }
        }
      },
      draw(){
        this.forceTiles.forEach(tile => {
          tile.draw();
        })
      },
      applyForces(particles){
        this.forceTiles.forEach(tile => {
          tile.color = 200;
          particles.forEach(particle => {
            if (tile.isColliding(particle)){
              tile.color = 0;
              let v1 = {
                mag: particle.mag,
                angle: particle.angle
              }
              let v2 = {
                mag: tile.mag,
                angle: tile.angle
              }
              let angle = this.angleBetweenVectors(v1, v2);    
              let sign = Math.sin(tile.angle - particle.angle);
              if (sign >= 0){
                particle.angle += angle * (this.strength/100);
              } else {
                particle.angle -= angle * (this.strength/100);
              }
              particle.mag += (tile.mag - particle.mag) *
                                (this.strength/100);
            }
          })
        })
      },
      angleBetweenVectors(v1, v2){
        let vx1 = Math.cos(v1.angle) * v1.mag;
        let vy1 = Math.sin(v1.angle) * v1.mag;
        let vx2 = Math.cos(v2.angle) * v2.mag;
        let vy2 = Math.sin(v2.angle) * v2.mag;
        let dot = (vx1 * vx2) + (vy1 * vy2);
        return Math.acos(dot/(v1.mag * v2.mag))
      }
    }
  }