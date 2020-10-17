function particleSystem(p5) {
    return {
      particles: [],
      addParticles(amount, magnitude) {
        for (let i = 0; i < amount; i++) {
          let part = particle(p5, magnitude);
          part.setPosition(p5.width/2,p5.height/2);
          part.lifespan = 255;
          part.toggleLifespan();
          this.particles.push(part);
        }
      },
      run() {
        this.particles.forEach((particle, index, object) => {
          //particle.rotation += Math.random() - 0.5;
          particle.update();
          particle.draw();
          if (particle.hasLifespan && 
              particle.lifespan <= 0) {
            object.splice(index, 1)
          }
        });
      }
    }
  }