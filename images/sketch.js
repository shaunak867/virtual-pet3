var dog,happydog,foodS,database,foodStock
var fedTime,lastFed


//Create variables here

function preload()
{
  dogImage = loadImage("images/dogImg.png")
  happydog = loadImage("images/dogImg1.png")
  //load images here
}

function setup() {
  createCanvas(1000,1000);
  foodObj = new Milk()
  dog = createSprite(800,250,80,20)
  dog.addImage("saddog",dogImage)
  dog.addImage("happydog",happydog)
dog.scale = 0.4
database = firebase.database()
foodStock = database.ref('Food')
foodStock.on("value",readStock)

feed = createButton("feed the dog")
feed.position(700,95)
feed.mousePressed(feedDog)

addfood = createButton("Add Food")
addfood.position(800,95)
addfood.mousePressed(addFoods)

readState = database.ref('gameState')
readState.on("value",function(data){
  gameState = data.val();
})
}


function draw() {  
  background(46,139,87)
  drawSprites();
  foodObj.display()
  fedTime = database.ref('feedTime')
  fedTime.on("value",function(data){
lastFed = data.val()

  })
  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
text("last Fed :"+lastFed%12+"PM",300,100)
  }
  else if(lastFed==0){
    text("last Fed :12 AM",300,100)

  }
  else{
    text("last Fed :"+lastFed +"AM",300,100)
  }
  //add styles here

  
  textSize(20)
  fill("white")
  stroke("black")
  text("note:press UP_ARROW key to feed rani milk",50,30)

  
  
}
function addFoods(){
foodS++;
database.ref('/').update({
  Food:foodS
})
}
function feedDog(){
dog.changeImage("happydog",happydog)
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
Food:foodObj.getFoodStock(),
feedTime:hour()
})
}




function readStock(data){
foodS = data.val()
foodObj.updateFoodStock(foodS)
}
function writeStock(x){
if(x<=0){
x=0
}
else{

  x=x-1
}
database.ref('/').update({
food:x

})


}



