var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var survivalTime=0;
var jungle,jungleImg;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImg = loadImage("jungle.jpg");
 
}

function setup() {
  createCanvas(400,400);
  
  jungle = createSprite(0,0,400,400);
  jungle.addImage(jungleImg);
  jungle.scale = 1.1;
  jungle.velocityX = -2;
  
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  ground.visible = false;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("red");
  if(ground.x<0){
  ground.x=ground.width/2;
  }
  if(jungle.x<0){
  jungle.x=jungle.width/2;
  }
  if(keyDown("space")){
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY+0.8;
  monkey.collide(ground);
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.05;
  }
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+5;
    switch (score){
        case 10:monkey.scale=0.12;
        break;
         case 20:monkey.scale=0.14;
        break;
         case 30:monkey.scale=0.16;
        break;
         case 40:monkey.scale=0.18;
        break;
        
    }
  }
  Stone();
  Bananas();
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("score : "+ score,300,50);
  
}

function Stone(){
if(frameCount%200===0){
  var stone = createSprite(400,340,50,20);
  stone.addImage(obstacleImage);
  stone.scale = 0.1;
  stone.velocityX = -2;
  obstacleGroup.add(stone);
}  
  
}

function Bananas(){
if(frameCount%100===0){
  var banana = createSprite(400,200,50,20);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -2;
  FoodGroup.add(banana);
}  
}