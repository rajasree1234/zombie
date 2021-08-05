var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,ground_image,invisible_ground;
var girl,girl_running,zombie,zombie_running;
var obstaclesGroup,obstacle;
var jumpSound,dieSound,checkpointSound;
var score;
var gameOver,restart,gameOverImage,restartImage;

function preload(){
    ground_image=loadImage("Background.png");
  girl_running=loadImage("girl.png");
  zombie_running=loadImage("zombie.png");
  
  obstacle=loadImage("obstacle.png");
  
  jumpSound = loadSound("jump.wav")
  dieSound = loadSound("die.wav")
  checkPointSound = loadSound("checkPoint.mp3")
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  
  score=0;
  
}

function setup() {
    ground=createSprite(0,0,0,0);
  ground.shapeColor="white";
ground.addImage("ground_image",ground_image);
ground.scale=1.5;
   ground.velocityX=-10
  
   girl=createSprite(300,420,600,10);
  girl.addImage("girl_running",girl_running);

  girl.scale=0.18;
  girl.velocityX=2;
  girl.debug=false;
  girl.setCollider("rectangle",0,0,girl.width,girl.height)
  
  
  zombie=createSprite(50,410,600,10);
  zombie.addImage("zombie_running",zombie_running);
  zombie.scale=0.175;
  zombie.debug=false;
  zombie.velocityY=-13;
  zombie.velocityX=Math.round(random(1,2));
  
  invisible_ground=createSprite(300,470,600,10);
  invisible_ground.visible=false;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,180);
  restart.addImage(restartImage);
  
  obstaclesGroup=new Group();
  
  score=0;
}

function draw() {
createCanvas(windowWidth,windowHeight);
background("ground");

 
   girl.velocityY = girl.velocityY + 0.8;
   girl.collide(invisible_ground); 
     
    
   zombie.velocityY = zombie.velocityY + 0.8;
   zombie.collide=invisible_ground; 
     
     
      if (gameState===PLAY){
       gameOver.visible=false;
     restart.visible=false;
        zombie.y=girl.y;
      score = score + Math.round(getFrameRate()/60);
    
       spawnObstacles();
      if (obstaclesGroup.isTouching(zombie)){
        zombie.velocityY=-13;
      }
    ground.velocityX = -(4 + 3*score/100);
        
      if (ground.x < 0){
         ground.x =ground.width/2;
       }
     
        if(score>0 && score%100 === 0){
          checkPointSound.play() 
       }
       
    if((keyDown("space")&& girl.y >= 220)) {
      girl.velocityY = -12;
       jumpSound.play();
     }  
     
     if (girl.isTouching(obstaclesGroup)){
       gameState=END;
        dieSound.play();
     }
     }
   else if ( gameState===END) {
     gameOver.visible=true;
     restart.visible=true;
     ground.velocityX = 0;
        girl.velocityY = 0;
    
        zombie.x=girl.x;
     if (zombie.isTouching(girl)) {
       girl.destroy();
     }
     
       obstaclesGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
     
       if(mousePressedOver(restart)) {
         reset();
       }
   } 
     
    
     drawSprites();
     fill("lightpink");
     textSize(20);
text("score:"+score,200,350);
drawSprites();
}

function reset(){
    gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  girl.changeImage("girl_running",girl_running);
    obstaclesGroup.destroyEach();
    score=0;
    zombie.x=50;
  }
  
  function spawnObstacles() {
     if (frameCount % 60 === 0){
     var obstacle = createSprite(600,450,10,40);
     obstacle.velocityX = -6 ;
     
      
     var rand = Math.round(random(1,6));
       obstacle.addImage(obstacle);
     obstacle.scale=0.1;
        obstaclesGroup.add(obstacle);
      obstacle.debug=false;
  obstacle.setCollider("circle",0,0,1);
     }
       
  }
  
  