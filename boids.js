let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

window.onload = function() {
    const numBoids = 100;
    const maxSpeed = 3;
    const maxForce = 0.75;
    const separationDistance = 75;
    const alignmentDistance = 75;
    const cohesionDistance = 75;

    const boids = [];
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Initialize boids
    for (let i = 0; i < numBoids; i++) {
      const boid = {
        position: createVector(Math.random() * screenWidth, Math.random() * screenHeight),
        velocity: createVector(Math.random() * 2 - 1, Math.random() * 2 - 1),
        element: createBoidElement()
      };
      boids.push(boid);
    }

    function createVector(x, y) {
      return { x, y };
    }

    function createBoidElement() {
      const element = document.createElement('div');
      element.className = 'boid';
      element.style.zIndex = '-1';
      document.body.appendChild(element);
      return element;
    }

    function updateBoids() {
      for (let i = 0; i < numBoids; i++) {
        const boid = boids[i];
        const separation = separate(boid, boids);
        const alignment = align(boid, boids);
        const cohesion = cohere(boid, boids);

        // Apply the forces
        boid.velocity.x += separation.x + alignment.x + cohesion.x;
        boid.velocity.y += separation.y + alignment.y + cohesion.y;
        limitVelocity(boid.velocity, maxSpeed);
        boid.position.x += boid.velocity.x;
        boid.position.y += boid.velocity.y;

        // Wrap around the screen edges
        if (boid.position.x > screenWidth) boid.position.x = 0;
        if (boid.position.y > screenHeight) boid.position.y = 0;
        if (boid.position.x < 0) boid.position.x = screenWidth;
        if (boid.position.y < 0) boid.position.y = screenHeight;

        // Update the position of the boid element
        boid.element.style.left = boid.position.x + 'px';
        boid.element.style.top = boid.position.y + 'px';

      }
    }

    
    function separate(boid, boids) {
      const steering = createVector(0, 0);
      let count = 0;
    
      const nearbyBoids = getNearbyBoids(boid, boids, separationDistance);
    
      for (let i = 0; i < nearbyBoids.length; i++) {
        const otherBoid = nearbyBoids[i];
        const distance = calculateDistance(boid.position, otherBoid.position);
    
        if (distance > 0 && distance < separationDistance) {
          const diffX = boid.position.x - otherBoid.position.x;
          const diffY = boid.position.y - otherBoid.position.y;
    
          steering.x += diffX / distance;
          steering.y += diffY / distance;
          count++;
        }
      }
    
      // Avoid HTML elements
      const elements = document.getElementsByTagName("*");
      const avoidanceDistance = 50; // Distance to avoid HTML elements
    
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const rect = element.getBoundingClientRect();
        const elementPosition = createVector(rect.x + rect.width / 2, rect.y + rect.height / 2);
        const distance = calculateDistance(boid.position, elementPosition);
    
        if (distance > 0 && distance < avoidanceDistance) {
          const diffX = boid.position.x - elementPosition.x;
          const diffY = boid.position.y - elementPosition.y;
    
          steering.x += diffX / distance;
          steering.y += diffY / distance;
          count++;
        }
      }
    
      // Avoid mouse cursor
      const mousePosition = createVector(mouseX, mouseY); // Assuming you have mouse coordinates available
      const mouseDistance = calculateDistance(boid.position, mousePosition);
      const mouseAvoidanceDistance = 100; // Distance to avoid the mouse cursor
    
      if (mouseDistance > 0 && mouseDistance < mouseAvoidanceDistance) {
        const diffX = boid.position.x - mousePosition.x;
        const diffY = boid.position.y - mousePosition.y;
    
        steering.x += diffX / mouseDistance;
        steering.y += diffY / mouseDistance;
        count++;
      }
    
      if (count > 0) {
        steering.x /= count;
        steering.y /= count;
      }
    
      limitVector(steering, maxForce);
      return steering;
    }
    
    function getNearbyBoids(boid, boids, distanceThreshold) {
      const nearbyBoids = [];
    
      for (let i = 0; i < boids.length; i++) {
        const otherBoid = boids[i];
        const distance = calculateDistance(boid.position, otherBoid.position);
    
        if (distance > 0 && distance < distanceThreshold) {
          nearbyBoids.push(otherBoid);
        }
      }
    
      return nearbyBoids;
    }
    

    function align(boid, boids) {
      const steering = createVector(0, 0);
      let count = 0;

      for (let i = 0; i < numBoids; i++) {
        const otherBoid = boids[i];
        const distance = calculateDistance(boid.position, otherBoid.position);

        if (distance > 0 && distance < alignmentDistance) {
          steering.x += otherBoid.velocity.x;
          steering.y += otherBoid.velocity.y;
          count++;
        }
      }

      if (count > 0) {
        steering.x /= count;
        steering.y /= count;
      }

      limitVector(steering, maxForce);
      return steering;
    }

    function cohere(boid, boids) {
      const steering = createVector(0, 0);
      let count = 0;

      for (let i = 0; i < numBoids; i++) {
        const otherBoid = boids[i];
        const distance = calculateDistance(boid.position, otherBoid.position);

        if (distance > 0 && distance < cohesionDistance) {
          steering.x += otherBoid.position.x;
          steering.y += otherBoid.position.y;
          count++;
        }
      }

      if (count > 0) {
        steering.x /= count;
        steering.y /= count;
        steering.x -= boid.position.x;
        steering.y -= boid.position.y;
      }

      limitVector(steering, maxForce);
      return steering;
    }

    function calculateDistance(positionA, positionB) {
      const diffX = positionA.x - positionB.x;
      const diffY = positionA.y - positionB.y;
      return Math.sqrt(diffX * diffX + diffY * diffY);
    }

    function limitVelocity(velocity, maxSpeed) {
      const magnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);

      if (magnitude > maxSpeed) {
        velocity.x /= magnitude;
        velocity.y /= magnitude;
        velocity.x *= maxSpeed;
        velocity.y *= maxSpeed;
      }
    }

    function limitVector(vector, max) {
      const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

      if (magnitude > max) {
        vector.x /= magnitude;
        vector.y /= magnitude;
        vector.x *= max;
        vector.y *= max;
      }
    }

    function animate() {
      updateBoids();
      requestAnimationFrame(animate);
    }

    animate();
  };