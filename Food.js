class Food
{
  constructor()
  {
    this.foodStock = 20;
    this.lastFed = 0;
    this.x = 0;
    this.image = loadImage("Milk.png");   
  }
    
  updateFoodStock(food)
  {
    this.foodStock = foodS;
    database.ref('/').update(
    {
      Food: foodS
    })
  }

  getFoodStock()
  {
    this.x = database.ref('Food');
    this.x.on("value", (data) =>
    {
      this.foodStock = data.val();
    })
  }

  deductFood()
  {
    this.foodStock --;
    updateFoodStock(this.foodStock);
  }
    
  display()
  {
    var x = 80, y = 100;
    imageMode(CENTER);
    //image(this.image, 720, 220, 70, 70);

    if(this.foodStock != 0)
    {
      for(var i = 0; i < this.foodStock; i++)
      {
        if(i % 10 == 0)
        {
          x = 80;
          y = y + 50;
        }

        image(this.image, x, y, 50, 50);
        x = x + 30; 
      }
    }
  }
}