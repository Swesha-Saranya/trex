var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudGroup, cloudImg;
var obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0; 
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver ,gameOver_img,restart_img, restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImg = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOver_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6+3*score/100);
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOver_img);
  restart = createSprite(300,140);
  restart.addImage(restart_img);
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(180);
  text("score: "+score,500,50);
  
  if(gameState === PLAY){
     score = score+Math.round(getFrameRate()/ 60);
    
    if(keyDown("space")) {
    trex.velocityY = -10;
      
  }
    trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
  
  if(obstacleGroup.isTouching(trex)){
     
     gameState = END;
     }
  }
  else if(gameState === END){
         gameOver.visible = true; 
         restart.visible = true; 
         ground.velocityX = 0;
         trex.velocityY = 0;
         obstacleGroup.setVelocityXEach(0);
         cloudGroup.setVelocityXEach(0);
         trex.changeAnimation("collided",trex_collided);
    
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
       reset();
       }
      }
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    trex.changeAnimation("running",trex_running);
    score = 0;
    
  }
  
  
  
  drawSprites();
  
}

function spawnClouds(){
  
  if( frameCount % 60 === 0){
    
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
  }
  
  
  
}
function spawnObstacles(){

  if( frameCount % 60 === 0){
    
    var obstacle = createSprite(600, 165, 40, 10);
    var rand = Math.round(random(1,6));
    switch(rand){
        
      case 1:obstacle.addImage(obstacle1);
      break;
      
      case 2:obstacle.addImage(obstacle2);
      break;
      
      case 3:obstacle.addImage(obstacle3);
      break;
      
      case 4:obstacle.addImage(obstacle4);
      break;
      
      case 5:obstacle.addImage(obstacle5);
      break;
      
      case 6:obstacle.addImage(obstacle6);
      break;
      
      default:break;
    }
    obstacle.scale = 0.5;
    obstacle.velocityX = -6;
    obstacle.lifetime = 200;
    obstacle.depth = trex.depth;
    trex.depth = trex.depth + 1;
    obstacleGroup.add(obstacle);
  }
  }