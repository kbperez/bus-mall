'use strict';

var imageFiles = [ //array of image files
  'bag.jgp', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg']

var currentOne
var currentTwo
var currentThree

var previousOne
var previousTwo
var previousThree


// The object constructor
function Image (name) {
  this.name = name; //image file name
  this.path = 'img/'+name; //path to imageFiles
//  console.log(this.name, this.path);
  this.displayed = 0;  //counter for times displayed
  this.selected = 0; //counter for times selected
}

var imageObjArr = [];
for (var i=0; i < imageFiles.length; i++) {
  imageObjArr.push (new Image(imageFiles[i]));
}


//Creating prototype methods

//Random number generator funciton
Image.prototype.random = function () {
  var rando = Math.floor(Math.random() * (imageFiles.length+1)); //Get a random nubmer 1-20
  return rando;
  }


Image.prototype.getImage = function () { //Function to get random number
  var currentOne = this.random();
  var currentTwo = this.random();
  var currentThree = this.random();
  while ((currentThree === currentOne) || (currentThree === currentTwo) || (currentTwo === currentOne)){
    currentTwo = this.random();
    currentThree = this.random();
    console.log(currentOne, currentTwo, currentThree);
  }
  console.log('after while loop',imageObjArr[currentOne], imageObjArr[currentTwo], imageObjArr[currentThree]);
document.getElementById("first").src = imageObjArr[currentOne].path;

  return [currentOne, currentTwo, currentThree];
}
var img = new Image('bag.jpg');
img.getImage();
