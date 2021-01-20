var dog, sadDog, happyDog;
var food, foodS, foodimage, foodStock, foodRef;
var feed, fedTime, lastFed;
var foodObj;
var database, value;
var milkimg, milkbottle;

function preload()
{
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
  milkimg = loadImage("Milk.png");
}

function setup() 
{
  createCanvas(1000, 400);

  foodObj = new Food();

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed your dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  milkbottle = createSprite(720, 220);
  milkbottle.addImage(milkimg);
  milkbottle.visible = false;
  milkbottle.scale = 0.09;
}

function draw() 
{
  background(46, 139, 87);

  foodObj.display();
  drawSprites();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data)
  {
    lastFed = data.val();
  });

  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12)
  {
    text("Last Fed : "+ lastFed % 12 + " PM", 350, 30);
  }
  else if (lastFed == 0)
  {
    text("Last Fed : 12 AM", 350, 30);
  }
  else
  {
    text("Last Fed : "+ lastFed + " AM", 350, 30);
  }

  fill(4, 23, 117)
  textSize(20)
  text(value, 400, dog.y-80)
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if (x <= 0)
  {
    x = 0;
  }
   else 
   {
     x = x - 1;
   }

  database.ref('/').update
  ({
     Food: x
  })
}

function feedDog()
{
  writeStock(foodS);
  milkbottle.visible = true;
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() -1);
  database.ref('/').update
  ({
     Food: foodObj.getFoodStock(),
     FeedTime: hour()
  })
}

function addFoods()
{
  foodS++;
  database.ref('/').update
  ({
     Food: foodS
  })
}
