//declaring sprites variables
var trex,ground,surface,clouds,cloudgroup,obstaclegroup,score,restart,gameover;
//declaring image variables
var trex_run,groundimg,cloudimg,obs1,obs2,obs3,obs4,obs5,obs6,trexdie,restartimg,gameoverimg;
// gamestate
var PLAY,END,gamestate;
//uploading images
function preload(){
  trex_run=loadAnimation("trex1.png","trex3.png","trex4.png");
  trexdie=loadAnimation("trex_collided.png");
  groundimg=loadImage("ground2.png");
  cloudimg=loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
  restartimg=loadImage("restart.png");
  gameoverimg=loadImage("gameOver.png");
}
function setup() {
  createCanvas(400, 400);
  trex=createSprite(50,380,10,10);
  trex.addAnimation("Label1",trex_run);
  trex.addAnimation("Lable1.2",trexdie);
  trex.scale=0.5;
  ground=createSprite(200,380,400,10);
  ground.addImage("Lable2",groundimg);
  surface=createSprite(200,385,400,10);
  surface.visible=false;
  cloudgroup=createGroup();
  obstaclegroup=createGroup();
  //gamestate
  PLAY=1;
  END=0;
  gamestate=PLAY;
  //score
  score=0;
  restart=createSprite(200,200);
  restart.addImage(restartimg);
  restart.scale=0.5;
  restart.visible=false;
  gameover=createSprite(350,100);
  gameover.addImage(gameoverimg);
  gameover.scale=0.5;
  gameover.visible=false;
}

function draw() {
  background("White");
  if(gamestate===PLAY){
    ground.velocityX=-6;
  if(ground.x<0){
    ground.x=200;
  if(keyDown("space")&&trex.y>=356){
      trex.velocityY=-12;
  }
    spawnclouds();
    spawnobstacle();
  }
  trex.velocityY=trex.velocityY+1;
  score=score+1;
  if(obstaclegroup.isTouching(trex)){
    gamestate=END;
    trex.changeAnimation(trexdie);
  }
  }
  textSize(18);
  text("score -"+score,325,15)
  if(gamestate===END){
    ground.velocityX=0;
    trex.velocityY=0;
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setLifetimeEach(-1);
    obstaclegroup.setLifetimeEach(-1);
    restart.visible=true;
    gameover.visible=true;
    if(mousePressedOver(restart)){
     reset();
    }
  }
  trex.collide(surface);
  
  drawSprites();
}
function spawnclouds(){
  if(frameCount%120===0){
    var cloud=createSprite(400,200,10,10);
    cloud.addImage("Lable3",cloudimg);
    cloud.velocityX=-2;
    cloud.scale=0.7;
    cloud.lifeTime=200;
    cloud.depth=trex.depth-2;
    cloud.y=Math.round(random(320,200))
    cloudgroup.add(cloud);
  }
}
function spawnobstacle(){
  if(frameCount%120===0){
    var obstacle=createSprite(400,360);
    var randomno=Math.round(random(1,6));
    switch(randomno){
      case 1:obstacle.addImage(obs1);
      break;
      case 2:obstacle.addImage(obs2);
      break;
      case 3:obstacle.addImage(obs3);
      break;
      case 4:obstacle.addImage(obs4);
      break;
      case 5:obstacle.addImage(obs5);
      break;
      case 6:obstacle.addImage(obs6);
      break;
      default:break;
    } 
   obstacle.scale=0.5;
   obstacle.velocityX=-2;
   obstacle.lifeTime=200;
   obstaclegroup.add(obstacle);
  }
} 
function reset(){
  gamestate=PLAY;
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  trex.changeAnimation(trex_run);
  score=0;
  restart.visible=false;
  gameover.visible=false;
} 