var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running , monkeystops;
var ground, banana, bananaGroup;


var obstaclesGroup, obstacle;

var score;


function preload(){
  
 monkey_stops = loadImage("sprite_0.png") 
  
   monkey_running = loadAnimation("sprite_0.png","sprite_1.png",
                                 "sprite_2.png","sprite_3.png",
                                 "sprite_4.png","sprite_5.png", 
                                 "sprite_6.png","sprite_7.png","sprite_8.png");
  
   
  bananaImage = loadImage("banana.png")
  
  obstacleImage= loadImage("obstacle.png");
  
 
}

function setup() {
  createCanvas(580, 430);
  
  
  
  monkey= createSprite(50,360,20,50);
  monkey.scale = 0.10;
  monkey.addAnimation("running", monkey_running);
  
 
  
  ground = createSprite(50, 390,580,20);
  ground.x = ground.width /2;
  

  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  

  monkey.setCollider("circle",0,0,200);
  monkey.debug = true;
  
 
  
  score = 0;
  
}

function draw() {
  
  background(180);
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    
    
    
    
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -15;
    }
    
   
    monkey.velocityY = monkey.velocityY + 0.8
    spawnBanana();
    spawnObstacles();
    
    if(bananaGroup.isTouching(monkey)){
        score = score + 1;
      bananaGroup.destroyEach();
    }
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     
      ground.velocityX = 0;
      monkey.velocityY = 0;
    bananaGroup.destroyEach()     
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);    
    monkey.destroy() ;
    // monkey.changeAnimation("stops", monkey_stops);
   }
  
 
 monkey.collide(ground);
  drawSprites();
}

function spawnObstacles(){
  if (frameCount % 100 === 0) {
     obstacle = createSprite(600,360,40,10);
    obstacle.addImage(obstacleImage)
    obstacle.x = Math.round(random(580, 560))
    //obstacle.scale = 0.4;
   obstacle.velocityX = -5;
  obstacle.scale = 0.15;
    
   obstacle.lifetime = 250;
   obstacle.debug = true; 
   obstacle.setCollider("circle", 0, 0, 200)  
   /*obstacle.depth = trex.depth
    trex.depth = trex.depth + 1;*/
    
    
   obstacleGroup.add(obstacle);
}
}
function spawnBanana(){
  if (frameCount % 150 === 0) {
     banana = createSprite(600,250,40,10);
    banana.addImage(bananaImage)
    banana.y = Math.round(random(200, 250))
    //banana.scale = 0.4;
    banana.velocityX = -4;
    banana.scale = 0.15;
    banana.lifetime = 150;
    bananaGroup.add(banana);
  
  
  
  
  
  
  
  
  
  
  
  }
}