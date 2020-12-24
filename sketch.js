var PLAY = 1;
var END = 0;
var gameState = PLAY;
var mario, mario_running, backgroundImg;
var brickImg,obstaclesImg;
var score=0;
var bricks, obstacles;
var bricksGroup, obstaclesGroup;

function preload()
{
    mario_running = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
    backgroundImg = loadImage("bg.png");
    groundImg = loadImage("ground2.png");
    brickImg = loadImage("brick.png");
    obstaclesImgs = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
    jump_sound = loadSound("jump.mp3");
}

function setup(){
createCanvas(600,200);
// create a mario sprite

mario = createSprite(50,160,20,50);
ground = createSprite(200,190,400,20);
invisibleGround = createSprite(200,160,400,10);
invisibleGround.visible = false;
ground.addImage("ground",groundImg);

mario.addAnimation("running", mario_running);

bricksGroup = new Group();
obstaclesGroup = new Group();

// scale and position mario
mario.scale= 1.5;
mario.x=50;

}

function draw(){
    //set background color

 background(backgroundImg);
//make mario jump on pressing space bar
fill("black");
text("Score : "+ score,500,10);
ground.velocityX = -6;
//console.log(rand);
//console.log(mario.y);
if(ground.x<0){
     ground.x=ground.width/2;
    }

spawnBricks();
spawnObstacles();

if(keyDown("space") && mario.y>=100)
{
    mario.velocityY=-10;
    //mario.play(jump_sound);
    

}
//applying gravity
mario.velocityY = mario.velocityY + 0.5;
// stopping mario from falling off
mario.collide(invisibleGround);


drawSprites();
}

function spawnBricks()
{
    if(frameCount%60===0){
    
    bricks = createSprite(600,40,40,10);
    bricks.y = Math.round(random(10,80));
    
    bricks.velocityX=-3;
    
    bricks.addImage("brick_wall",brickImg);
    
    bricks.scale=0.8;
    
    mario.depth=bricks.depth;
   // mario.depth=mario.depth+1;
   if(mario.isTouching(bricks)){
    bricks.destroy();
    score = score+1;
    console.log("score + "+score);
}
    
    bricks.lifetime=200;
    
    //add each brick to the group
    bricksGroup.add(bricks);

    }   

}

function spawnObstacles()
{
    if(frameCount%100===0){
    obstacles = createSprite(600,130,40,10);
    obstacles.velocityX=-6;
    obstacles.addAnimation("obstacles",obstaclesImgs);
    obstacles.scale=0.8;
    obstacles.lifetime = 100;

    //add each obstacles to the group
    obstaclesGroup.add(obstacles);
    }   
}