var trex,treximage;
var ground,groundimage;
var inviground;
var cloudimage;
var cloudgroup;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstaclegroup;
var PLAY=1;
var END=0;
var score=0;
var gamestate=PLAY;
var deadtrex;
var gameover,gameoverimg;
var restart,restartimg;
var jumpsound,diesound,sound100;


function preload(){
  treximage=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  deadtrex=loadAnimation("trex_collided.png");
  restartimg=loadImage("restart.png");
  gameoverimg=loadImage("gameOver.png");
  jumpsound=loadSound("jump.mp3");
  diesound=loadSound("die.mp3");
  sound100=loadSound("checkPoint.mp3");
  
}
function setup() {
  createCanvas(600,300);
  trex=createSprite(50,260,20,20);
  trex.addAnimation("trex",treximage);
  trex.addAnimation("dead",deadtrex);
  trex.scale=0.7;
  
  ground=createSprite(300,270,600,10);
  ground.addImage("ground",groundimage);
  ground.velocityX=-7;
  
  inviground=createSprite(300,280,600,10);
  inviground.visible=false;
  
  cloudgroup=new Group();
  obstaclegroup=new Group();
  
  gameover=createSprite(300,100,20,20);
  restart=createSprite(300,150);
  gameover.addImage("gameover",gameoverimg);
  restart.addImage("restart",restartimg);
  
  gameover.visible=false;
  restart.visible=false;
  
  gamestate=PLAY;
  
  
}

function draw() {
  background("white");
  
  textSize(23)
  text("score="+ Math.round(score),400,30);
  
  
  if (gamestate===PLAY){
    ground.velocityX=-5 ;
    score+=0.2;
    
    console.log(trex.y)
    
    if (ground.x<0){
      ground.x=ground.width/2;
    }

      if (keyDown("space")&&trex.y>242){
      trex.velocityY=-10;
        jumpsound.play();
    }
    
    trex.velocityY=trex.velocityY+0.5;
    
    spawnobstacles();
    spawnclouds(); 
    if (score%100===0){
      sound100.play();
    }
    
    if(trex.isTouching(obstaclegroup)){
        gamestate=END;
      diesound.play();
       //trex.velocityY = -12 
        
      }
}
  
  else if(gamestate===END){
    ground.velocityX=0;
      obstaclegroup.setVelocityXEach(0);
      cloudgroup.setVelocityXEach(0);
      cloudgroup.setLifetimeEach(-5);
      obstaclegroup.setLifetimeEach(-6);
      trex.velocityY=0;
    trex.changeAnimation("dead",deadtrex);
     restart.visible=true;
    gameover.visible=true;  
    
    if (mousePressedOver(restart)){
      restartgame();
    }
  }
  
  
  
  

  
 trex.collide(inviground);
  
  
  
  
  drawSprites();
  
  
}

function restartgame(){
 gamestate=PLAY;
 restart.visible=false;
 gameover.visible=false;
  cloudgroup.destroyEach();
  obstaclegroup.destroyEach();
  trex.changeAnimation("trex",treximage);
  score=0;
}

function spawnclouds(){
  if (frameCount%80===0){
    var cloud=createSprite(600,Math.round(random(1,150)),20,20);
    cloud.addImage("cloud",cloudimage);
    cloud.velocityX=-5;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloud.lifetime=120;
    cloudgroup.add(cloud); 
  }
}



function spawnobstacles(){
  if (frameCount%70===0){
    var obstacle=createSprite(600,250,20,20);
   obstacle.velocityX=-7;
   var rnum=Math.round(random(1,6));
    switch(rnum){
      
      case 1:obstacle.addImage(obstacle1);
             break;
        
      case 2:obstacle.addImage(obstacle2);
            break;
            
      case 3:obstacle.addImage(obstacle3);
            break
        
      case 4:obstacle.addImage(obstacle4);
             break;
        
      case 5:obstacle.addImage(obstacle5);
            break;
            
      case 6:obstacle.addImage(obstacle6);
            break;
        
    }
    obstacle.lifetime=150;
    obstacle.scale=0.7;
    obstaclegroup.add(obstacle);
  }
}





