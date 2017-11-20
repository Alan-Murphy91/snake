var foodPos = [];
var up = false;
var down = false;
var left = false;
var right = false;

for(var x=0; x<1000; x++){
    foodPos.push(Math.floor(Math.random() * 278)+1);
}

var s = new snake();
function setup() {
    createCanvas(400,400); 
}


function draw() {
    background(50);
    s.food();
    s.showSnake();
    s.updatePosition();
    s.hitDetection();
}


function snake() {
    var snakeLength = 0;
    this.x = 1;
    this.y = 0;
    this.speed = 1;
    this.directionx = 1;
    this.directiony = 0;
    var foodx = foodPos[0];
    var foody = foodPos[1];
    this.count = 0;
    var priorPositions = [];
    var currentPositions = [];
    var currentPos = [];
    
    this.food = function() {
        fill(255,153,0);
        noStroke();
        rect(foodx,foody, 15, 15);        
    }
    
    this.showSnake = function(){
        currentPositions = [];
        fill(0,128,0);
        noStroke();
        rect(this.x, this.y, 19, 19);
        priorPositions.push(this.x);
        priorPositions.push(this.y);
        currentPos = [Math.floor(this.x),Math.floor(this.y)];

        for(var i=0; i<snakeLength; i+=2){
            fill(0,128,0);
            noStroke();
            rect(priorPositions[priorPositions.length - (i+2)],priorPositions[priorPositions.length - (i+1)], 19, 19);
            
            currentPositions.push([Math.floor(priorPositions[priorPositions.length - (i+2)]), Math.floor(priorPositions[priorPositions.length - (i+1)])]);
                                   
        }
        currentPositions.shift();
        for(var j=0; j<currentPositions.length; j++){
            if(dist(currentPos[0],currentPos[1],currentPositions[j][0],currentPositions[j][1]) < 1){
                alert('Game Over!');
            }
            }
            console.log(currentPos[0],currentPos[1]);
        }
    

    
    this.updatePosition = function(){
        this.x = this.x + this.directionx/this.speed;
        this.y = this.y + this.directiony/this.speed;
        
//        this.x = constrain(this.x,0,294);
//        this.y = constrain(this.y,0,294);
        
        this.x = constrain(this.x,0,781);
        this.y = constrain(this.y,0,881);        
    }
    
    this.hitDetection = function() {
        if(Math.floor(dist(this.x,this.y,foodx,foody)) < 15){
            this.count += 2;
            foodx = foodPos[this.count];
            foody = foodPos[this.count + 1];
            snakeLength+=30;
            this.speed -= 0.03;
        }
    }
}

function keyPressed(){
    if (keyCode == UP_ARROW && down === false){
        up = true;
        down = false;
        left = false;
        right = false;
        s.directionx = 0;
        s.directiony = -1;
    }
    if (keyCode == DOWN_ARROW && up === false){
        up = false;
        down = true;
        left = false;
        right = false;
        s.directionx = 0;
        s.directiony = 1;
    }
    if (keyCode == LEFT_ARROW && right === false){
        up = false;
        down = false;
        left = true;
        right = false;
        s.directionx = -1;
        s.directiony = 0;
    }
    if (keyCode == RIGHT_ARROW && left === false){
        up = false;
        down = false;
        left = false;
        right = true;
        s.directionx = 1;
        s.directiony = 0;       
    }
}