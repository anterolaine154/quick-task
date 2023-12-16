/*
Filename: ComplexCode.js

Description: This code creates a simulation of a solar system using HTML canvas and JavaScript. It includes complex calculations, animations, and user interaction.

Please note that running this code requires an HTML file that includes a canvas element with id "solar-system".
*/

// Get canvas and its 2D context
const canvas = document.getElementById("solar-system");
const ctx = canvas.getContext("2d");

// Set canvas properties
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define classes for celestial bodies
class CelestialBody {
  constructor(name, radius, color, distance, speed) {
    this.name = name;
    this.radius = radius;
    this.color = color;
    this.distance = distance;
    this.speed = speed;
    this.angle = Math.random() * Math.PI * 2;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(
      Math.cos(this.angle) * this.distance + canvas.width / 2,
      Math.sin(this.angle) * this.distance + canvas.height / 2,
      this.radius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.angle += this.speed;
    this.draw();
  }
}

// Create celestial bodies
const sun = new CelestialBody("Sun", 50, "yellow", 0, 0);
const earth = new CelestialBody("Earth", 10, "blue", 200, 0.01);
const moon = new CelestialBody("Moon", 5, "gray", 50, 0.05);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sun.update();
  earth.update();
  moon.update();
}

animate();

// Interaction
canvas.addEventListener("mousemove", (event) => {
  moon.distance = Math.sqrt(
    Math.pow(event.clientX - canvas.width / 2, 2) +
      Math.pow(event.clientY - canvas.height / 2, 2)
  );
});
canvas.addEventListener("click", () => {
  moon.speed += 0.01;
});

// Utility functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);