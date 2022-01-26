
let thing;


function setup() {
  createCanvas(windowWidth, windowHeight);

  thing = new thingMaker();
  background(0,255);
}


function draw() {
  // background(0,4);
  thing.update();
}


function thingMaker() {
  
  let factor = 12;
  

  this.pos = [];
  this.vel = [];
  
  this.scale = (height/factor)*0.5;

  this.index = -1;

  let col = width/factor;
  let row = height/(factor);
  

  for (let y = row/2;
       y < height-(row/2);
       y += row) {
    for (let x = col;
         x < width-(col);
         x += col) {

      this.pos.push(createVector(x,y));
      this.vel.push(random(1000));
    }
  } 
  

  this.update = function() {
    

    let scal = map(sin(frameCount*0.01),-1,1,
                   -this.scale,this.scale);
    

    beginShape();
    

    this.index += 1; 
    if (this.index > this.pos.length-1) {
      this.index = 0;
    }

    let ir = this.index;
    

    for (let i = 0; i < this.pos.length; i++) {
      

      this.vel[i] += 1;
      

      let xm = map(sin(this.vel[i]*0.01),-1,1,
                   -this.scale+scal,
                   this.scale+scal);
      let ym = map(cos(this.vel[i]*0.5),-1,1,
                   -this.scale+scal,
                   this.scale+scal);
      

      let xn = map(noise(i*0.05,this.pos[i].x*0.01,
                         this.vel[i]*0.05),0,1,
                   -this.scale+scal,this.scale+scal);
      let yn = map(noise(i*0.05,this.pos[i].x*0.01,
                         this.vel[i]*0.1),0,1,
                   -this.scale+scal,this.scale+scal);


      push();
      

      let xnt = map(noise(i*0.05,this.pos[ir].x*0.1,
                         frameCount*0.05),0,1,
                   -this.scale,this.scale);
      let ynt = map(noise(i*0.05,this.pos[ir].x*0.05,
                         frameCount*0.01),0,1,
                   -this.scale,this.scale);
      

      let d = dist(this.pos[i].x,
                   this.pos[i].y,
                   this.pos[ir].x,
                   this.pos[ir].y);
      if (d < this.scale*random(1,8)) {
        

        vertex(this.pos[i].x+xnt,
               this.pos[i].y+ynt);

        stroke(0,96);
        line(this.pos[i].x+xn+random(5),
                   this.pos[i].y+yn,
                   this.pos[ir].x+xnt+random(5),
                   this.pos[ir].y+ynt);     
      }
      pop();
    }
    

    fill(255,255);
    stroke(255,random(200,125),0,16);
    strokeWeight(random(1,2));

    let colr = random(175,200);
      fill(0,colr-75,colr,16);
    if (random() < 0.5) {
      fill(0,0,0,255);
    }
    if (noise(frameCount*0.1) > 0.55){
      fill(255,16);
      stroke(0,64);
    }
    if (noise(frameCount*0.1) < 0.35){
      fill(125,0,0,64);
      stroke(255,random(200,125),50,16);
    }
    endShape();
  }
}

function keyPressed(){
  if (keyCode === DOWN_ARROW) {
    let fc = frameCount;
    console.log('Generation '+fc);
    console.log('saving...');

    saveCanvas('Altereffects'+fc, 'png');
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width &&
    mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}



