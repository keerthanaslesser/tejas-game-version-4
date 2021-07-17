class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }


  start() {
    obstaclesGroup = new Group();
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(200, 300);
    car1.addImage(car1Img);

    car2 = createSprite(500, 350);
    car2.addImage(car2Img);

    cars = [car1, car2];
    obstaclesGroup = new Group();
  }


  







  play() {
    form.hide();


    
    Player.getPlayersInfo();


    if (allPlayers !== undefined) {

      background(rgb(198, 135, 103));
      image(raceTrack, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

      var index = 0;

      var x = 300;
      var y;

      for (var plr in allPlayers) {
        index = index + 1;



        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;


        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;



        if (index === player.index) {

          fill("green");
          ellipse(x, y, 60, 60);


          camera.position.y = cars[index - 1].position.y;
        }
      }


      
      if (obstaclesGroup.isTouching(cars[0]) || obstaclesGroup.isTouching(cars[1])) {

        gameState = 2;
      }
      drawSprites();



    }


  }

  spawnObstacles() {
    if (frameCount % 80 === 0) {
      obstacles = createSprite(Math.round(random(75, 400)), 0);
      obstacles.velocityY = 6;
      obstacles.scale = 0.2;
      var rand = Math.round(random(1, 2));
      if (rand === 1) {
        obstacles.addImage(cone)
      } else
        if (rand === 2) {
          obstacles.addImage(barrior)
        }
      obstacles.lifetime = 200;
      obstaclesGroup.add(obstacles);
      //alert(obstaclesGroup);
    }
  }








  





end()
{
  text("Game Over", 500, 500);
}


  handlePlayerControls() {

  if (keyIsDown(UP_ARROW)) {
    player.positionY += 10;
    player.update();
  }

  if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
    player.positionX -= 5;
    player.update();
  }

  if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
    player.positionX += 5;
    player.update();
  }

}}






