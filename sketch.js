var windowHeightm4
var midX
var midY
var fan
var blade
var nFans
var fans
var fanOn
var bubble
var air
var fanStrength
var box
var score



function setup() {
	angleMode(DEGREES)
	windowHeightm4 = windowHeight-4
	midX = windowWidth/2
	midY = windowHeightm4/2
	fans = []
	nFans = 4
	fanOn = "off"	
	air = 0.99
	fanStrength = 4
	score = 0


		
	createCanvas(windowWidth,windowHeightm4)
	
    for(var i = 0; i < nFans; i++) {
		for(var j = 0;j < 2; j++) {
			fan = {
				x: windowWidth/4+(i*windowWidth/2),
				y: windowHeightm4/4+(j*windowHeightm4/2),
				angle: 0,
				radius: 50,
				centerd: 20,
				speed: 15
			}
		fans.push(fan)
		}
	}
	blade = {
		gap: 5,
		w: 20,
		h: 50
	}
	
	bubble = {
		x: windowWidth/2,
		y: windowHeightm4/2,
		d: 30,
		speedX: 0 ,
		speedY: 0
	}
	box = {
		x:75,
		y:75,
		l:50,

		
		
	}
	moveBox()
}


function draw(){
	drawBg()
	//text(nFans, 100,100)
	for(var i = 0; i < nFans; i++){
		//text(i,100,100+i*100)
		drawFan(fans[i])
		textAlign(CENTER)
		text(i+1, fans[i].x, fans[i].y - 70)
		textAlign(LEFT)
		
	}
	
	if(fanOn !== "off") {
		fans[fanOn].angle = fans[fanOn].angle+fans[fanOn].speed
	}
	
	drawBox ()
	drawBubble()
	moveBubble ()
	
	if (colliding() === true) {
		moveBox()
		bubble.x = windowWidth/2
		bubble.y = windowHeightm4/2
		score = score+1
	}
	
	gameOver()
}

function drawBg () {
background(0,0,0)
//vertical
line(midX, 0, midX, windowHeightm4)
//horizontal
line(0, midY, windowWidth, midY)
textSize(15)
textFont("Courier New")
text("score: " + score, 0,10)

}

function drawFan(fan) {
	var r = fan.centerd/2+blade.h
	var x
	push();
	fill("white")
	//noStroke()
	translate(fan.x, fan.y)
	rotate(fan.angle)
	//rotatingfan
	stroke(0,0,0)
	rect(-blade.w/2,-fan.centerd/2+blade.gap,blade.w,-blade.h)
	rotate(120)
	rect(-blade.w/2,-fan.centerd/2+blade.gap,blade.w,-blade.h)
	rotate(120)
	rect(-blade.w/2,-fan.centerd/2+blade.gap,blade.w,-blade.h)
	fill(255,255,255)
	stroke(0,0,0)
	ellipse(0,0,fan.centerd,fan.centerd)
	stroke(255,255,255)
	noFill()
	circle(0,0,r*2)
	
	
	rotate(-fan.angle)
	//lines
	for(var y = -r; y < r; y+=r/3) {
		x = sqrt(r*r-y*y)
		line(-x,y,x,y)
		
	}
	rotate(240)	
	
	for(var y = -r; y < r; y+=r/3) {
		x = sqrt(r*r-y*y)
		line(-x,y,x,y)
		
	}
	
	
	
	
	pop();	
	
}

function keyTyped(){
	if(key === '1') {
		fanOn = 0
	}
	
	if(key === '2') {
		fanOn = 1
	}
	
	if(key === '3') {
		fanOn = 2
	}
	
	if(key === '4') {
		fanOn = 3
	}
	
	if(key === ' ') {
		fanOn = "off"
	}
	

}

function drawBubble() {
	stroke('darkblue')
	fill('lightblue')
	ellipse(bubble.x, bubble.y, bubble.d, bubble.d)
	fill('white')
	ellipse(bubble.x-5, bubble.y-5, bubble.d/4, bubble.d/4)
	stroke(255,255,255)
}

function moveBubble() {
	if(fanOn !== "off") {
		
	
		var vectorX = bubble.x-fans[fanOn].x
		var vectorY = bubble.y-fans[fanOn].y
		var r2 = vectorX*vectorX + vectorY*vectorY
		accelerationX = fanStrength*vectorX/r2
		accelerationY = fanStrength*vectorY/r2
		
		bubble.speedX = bubble.speedX + accelerationX
		bubble.speedY = bubble.speedY + accelerationY
	}
	bubble.speedX = bubble.speedX * air
	bubble.speedY = bubble.speedY * air

	bubble.x = bubble.x + bubble.speedX
	bubble.y = bubble.y + bubble.speedY
	
}

function drawBox() {	
	
	if(frameCount%60 >= 30){
	stroke(255,255,0)	
	} else {
		stroke(255,0,0)
	}
	
	fill(0,0,0)
	rect(box.x, box.y, box.l, box.l)
	//stroke(255,0,0)
	line(box.x,box.y,box.x+box.l,box.y+box.l)
	line(box.x+box.l,box.y,box.x,box.y+box.l)
	//stroke(255,255,255)
}
function moveBox(){
	switch(int(random(0,8))) {
		case 0:
		box.x = 75
		box.y = 75
		break;
		case 1:
		box.x = windowWidth/2-box.l/2
		box.y = 75
		break;
		case 2:
		box.x = windowWidth-75-box.l
		box.y = 75
		break;
		case 3:
		box.x = 75
		box.y = windowHeightm4/2-box.l/2
		break;
		case 4:
		box.x = windowWidth-75-box.l
		box.y = windowHeightm4/2-box.l/2
		break;
		case 5:
		box.x = 75
		box.y = windowHeightm4-75-box.l
		break;
		case 6:
		box.x = windowWidth/2-box.l/2
		box.y = windowHeightm4-75-box.l
		break;
		case 7:
		box.x = windowWidth-75-box.l
		box.y = windowHeightm4-75-box.l
	}
}
	
function colliding() {
	if(bubble.x > box.x && bubble.x < box.x+box.l && bubble.y > box.y && bubble.y < box.y+box.l) {
		return true;
	} else {
		return false;
	}

}

function gameOver () {
	if(bubble.x > windowWidth || bubble.x < 0 || bubble.y > windowHeightm4 || bubble.y < 0){
		background(0,0,0)
		textSize(50)
		textAlign(CENTER, CENTER)
		text ("game over", windowWidth/2, windowHeightm4/2)
		noLoop()
	}
}


