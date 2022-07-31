function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function drawRandomSquares(width=30){
  
  for (let x=0; x<displayWidth; x+=width){
    for (let y=0; y<displayHeight; y+=width){
      fill(getRandomInt(256), getRandomInt(256), getRandomInt(256));
      rect(x, y, width, width);
    }
  }
}
function drawStep(aX=200, aY=200, bX=250, bY=200){
  lenX = bX - aX;
  lenY = bY - aY;
  startTriangelPointX = aX+lenX *1/3;
  startTriangelPointY = aY + lenY * 1/3;

  endTriangelPointX = aX+lenX *2/3;
  endTriangelPointY = aY+lenY *2/3;
  stroke(255, 0,0);
  line(aX, aY, startTriangelPoint, 200);
  
  stroke(0, 255, 0);
  line(startTriangelPoint, 200, endTriangelPoint, 200);

  stroke(255, 0,0);
  line(endTriangelPoint, 200, bX, bY );
}

function drawAngleCirc(x, y, radius, angle, color=255){
  angle = Math.PI*angle;
  ellipse(x, y, radius*2);
  fill(255, 0, 0);
  line(x, y, x+Math.cos(angle)*radius, y+Math.sin(angle)*radius);
  fill(255);
}

function test(){
  for (let i=0; i<100; i+=2){
    print(i/10);
  }
}

function test2(){
  ax = 100;
  ay = 100;
  bx = 200;
  by = 200;
  strokeWeight(4);
  drawAngleCirc(ax, ay, 99, 1/3);
  drawAngleCirc(ax, ay, 66, 1/3);
  drawAngleCirc(ax, ay, 33, 1/3);
  strokeWeight(2);
  line(ax, ay, bx , by);
  line(ax,ay,ax+200, ay);
  line(ax,ay,ax, ay+200);
}

function test3(ax, ay, bx, by){
  line(ax, ay, bx, by);
}

function knob(x, y, r=3){
  push();
  noStroke();
  fill(0);
  ellipse(x,y,r);
  pop();
}

function test4(){
  circle(50, 50, 25*2);
  push();
  fill(255, 0, 0);
  knob(100,100,25);
  circle(100, 50, 25*2);
  pop();
  circle(150, 50, 25*2);

}

function prettyLine(ax, ay, bx, by){
  // -- knob(ax,ay, 3);
  // -- knob(bx,by, 3);
  line(ax, ay, bx, by);
}

function tripleLine(ax, ay, bx, by){
  lenx = bx - ax;
  leny = by - ay;
  stroke(255, 0, 0);
  print("a:", ax, ",",ay, " b:", bx, ",", by);
  print("lenx: ", lenx, " ", "leny: ", leny);
  firstx = ax + lenx*1/3;
  firsty = ay + leny*1/3;
  print("firstx: ",firstx);
  print("firsty: ",firsty);
  secondx = ax + lenx * 2/3; 
  secondy = ay + leny * 2/3;
  print("secondx: ", secondx);
  print("secondy: ", secondy);
  prettyLine(ax, ay, firstx, firsty);
  prettyLine(firstx, firsty, secondx, secondy);
  prettyLine(secondx, secondy, bx, by);
}

lines = [];

function createTriangle(ax, ay, bx, by, col){
  lenx = bx - ax;
  leny = by - ay;
  stroke(col[0], col[1], col[2]);
  firstx = ax + lenx*1/3;
  firsty = ay + leny*1/3;
  secondx = ax + lenx * 2/3; 
  secondy = ay + leny * 2/3;
  baseDeltaX = secondx - firstx;
  baseDeltaY = secondy - firsty;
  baseAbsLength = Math.sqrt(baseDeltaX*baseDeltaX + baseDeltaY*baseDeltaY);
  //print(Math.atan2(bx-ax, by-ay)*Math.PI);
  topX = firstx + Math.cos(Math.PI/3+Math.atan2(by-ay, bx-ax))*baseAbsLength;
  topY = firsty + Math.sin(Math.PI/3+Math.atan2(by-ay, bx-ax))*baseAbsLength;
  //print(Math.cos(Math.PI/3)*baseAbsLength);
  // -- knob(topX, topY);
  //deltaY = sqrt(3/2)*a
  //deltaX = a/2
  
  // lines.push(
  //   [[ax,ay] , [firstx,firsty]],
  //   [[firstx,firsty], [topX, topY]],
  //   [[topX, topY], [secondx, secondy]],
  //   [[secondx, secondy], [bx,by]]
  //   );

  prettyLine(ax, ay, firstx, firsty);
  prettyLine(firstx, firsty, topX, topY);
  prettyLine(topX, topY, secondx, secondy);
  //prettyLine(firstx, firsty, secondx, secondy);
  prettyLine(secondx, secondy, bx, by);
  return [
[[ax,ay] , [firstx,firsty]],
[[firstx,firsty], [topX, topY]],
[[topX, topY], [secondx, secondy]],
[[secondx, secondy], [bx,by]]];
}

function createStar(){
   for (let i=Math.PI*0; i< 2*Math.PI; i+=Math.PI*1/6){
    tripleLine(100,100, 100+50 * Math.cos(i), 100+ 50*Math.sin(i));
    print(i);
  }
  prettyLine(100,100,170,170);

}
function testAngle(){
  ax = 100;
  ay = 100;
  bx = 200;
  by = 100;
  length = 100;
  angle = Math.PI*0;
  strokeWeight(5);
  prettyLine(ax, ay, bx, by);
  stroke(0, 0, 255);
  strokeWeight(1);
  prettyLine(ax, ay, ax+Math.cos(angle)*length, ay+Math.sin(angle)*length);
  //print(Math.atan2(Math.cos(angle)*length, Math.sin(angle)*length));
  print(Math.atan2(by-ay, bx-ax));
}


firstPointX = 0;
firstPointY = 0;
oneDrawed = false;

function mousePressed() {
  firstPointX = mouseX;
  firstPointY = mouseY;
}

function mouseReleased() {
  l = createTriangle(firstPointX, firstPointY, mouseX, mouseY, [getRandomInt(256), getRandomInt(256), getRandomInt(256)]);
  l.forEach(function(el, index){
    lines.push(el);
  });
  oneDrawed = true;
  firstPointX = 0;
  firstPointY = 0;
}

function testDraw(){
  deltaTheta = Math.PI/3;

}

function arrayTest(){
  let testarr = [];
  testarr.push(12);
}

function nextIteration(){
  newlines = [];
  col = [getRandomInt(256), getRandomInt(256), getRandomInt(256)];
  lines.forEach(function(l, index, array){
    push();
    stroke(220);
    strokeWeight(4);
    p1 = l[0];
    p2 = l[1];
    line(p1[0], p1[1], p2[0], p2[1]);
    
    l = createTriangle(p1[0], p1[1], p2[0], p2[1], col);
      l.forEach(function(el, index){
      newlines.push(el);
    });
    pop();
  });
  lines = newlines;
}

function testLines(){
  p1 = [10,10];
  p2 = [25,25];
  p3 = [50,25];
  p4 = [75,75];

  l1 = [p1,p2];
  l2 = [p2,p3];
  l3 = [p3,p4];

  lines = [l1, l2, l3];
  newlines = [];
  lines.forEach(function(line, index, array){
    newlines.push(line);newlines.push(line);newlines.push(line);
  });

  lines = newlines;
  print(lines);
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  background(220);
  //tripleLine(100, 100, 123, 276);
  //createTriangle(100,100,200,200);
  //testAngle();
  //testLines();
  
}

function cl(){

  background(220);
  lines = [];
}



function draw() {
  if (keyIsPressed === true) {
    print(keyCode);
    if (keyCode == 67){
      cl();
    }
    if (keyCode == 39 && oneDrawed){
      nextIteration();
    }
    if (keyCode == 83){
      drawRandomSquares();
    }
  }
  // clear();
  // prettyLine(firstPointX, firstPointY, mouseX, mouseY);
}

