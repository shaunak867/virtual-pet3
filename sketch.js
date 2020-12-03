var dog,happydog,foodS,database,foodStock
var fedTime,lastFed


//Create variables here

function preload()
{
  dogImage = loadImage("images/dogImg.png")
  happydog = loadImage("images/dogImg1.png")
  garden = loadImage("images/Garden.png")
  bedroom = loadImage("images/Bed Room.png")
  washroom = loadImage("images/Wash Room.png")
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
fedTime = database.ref('feedTime') 
fedTime.on("value",function(data){
lastFed = data.val();

})



}


function draw() {  
  background(46,139,87)
  drawSprites();

  currentTime = hour()
if(currentTime==(lastFed)){
update("playing")
foodObj.garden()
}else if(currentTime==(lastFed+2)){
update("sleeping")
foodObj.bedroom()}
else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
update("bathing")

foodObj.washroom()
}else{
update("Hungry")
foodObj.display()
}
if(gameState!="Hungry"){
  feed.hide();
  addfood.hide();
  dog.remove();
  }else{
    feed.show();
  addfood.show();
  dog.changeImage("saddog",dogImage);
  
  }
  
  
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



function update(state){
database.ref('/').update({
gameState:state
});
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



