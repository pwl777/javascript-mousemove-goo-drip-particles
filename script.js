/* ------ JavaScript - HTML Canvas Particles 3/4 - Interactive 4 Different Style Trailing Particles ------ */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d'); // ctx is short for context.
ctx.canvas.width = window.innerWidth; // setting window width.
ctx.canvas.height = window.innerHeight; // setting window height.
let particleArray = [];
const numberOfParticles = 700; // increases the amount of particles.

// get mouse position
const mouse = {
    x: null,
    y: null
}
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});
setInterval(function(){
    mouse.x = undefined;
    mouse.y = undefined;
}, 200);

// create particles
class Particle {
    constructor(x, y, size, color, weight){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        this.size -= 0.1; // make the goo reset more often by shrinking the particle size.
        if (this.size < 0){
            this.x = (mouse.x + ((Math.random() * 20) - 10));
            this.y = (mouse.y + ((Math.random() * 20) - 10));
            this.size = (Math.random() * 12) + 10;
            this.weight = (Math.random() * 2) - 0.5;
        }
        this.y += this.weight;
        this.weight += 0.2;
        // NOTE # add this statement to stop particles getting stuck at the bottom of screen: 
        if ((this.y > canvas.height-this.size) && (this.weight > 0.5)){ this.weight *= -0.5; };
        if (this.y > canvas.height - this.size){  
            this.weight *= -0.2; // this controls the particle bounce.
        };
    }
}

function init(){
    particleArray = [];
    for (let i = 0; i < numberOfParticles; i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = (Math.random() * 10) + 5;
        let color = '#13690f';
        let weight = 1;
        particleArray.push(new Particle(x, y, size, color, weight));
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = 'rgba(0,0,0,0.08)'; // length of trails can be tweaked by changing the opacity value of rgba.
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++){
        particleArray[i].update();
        particleArray[i].draw();
    }
    requestAnimationFrame(animate);
}
init();
animate();

