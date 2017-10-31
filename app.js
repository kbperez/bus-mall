'use strict';

var imageFiles = [ //array of image files
  'bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.jpg', 'water-can.jpg', 'wine-glass.jpg']

var currentOne;
var currentTwo;
var currentThree;

var clickCounter=0;

var pOne;
var pTwo;
var pThree;

// The object constructor
function Image (name) {
  this.name = name; //image file name
  this.path = './img/'+name; //path to imageFiles
//  console.log(this.name, this.path);
  this.displayed = 0;  //counter for times displayed
  this.selected = 0; //counter for times selected
  this.shown = false;
}

var imageObjArr = [];//Puttimg objects in array
for (var i=0; i < imageFiles.length; i++) {
  imageObjArr.push (new Image(imageFiles[i]));
}

//Creating helper functions

//Random number generator funciton
function random() {
  var rando = Math.floor(Math.random() * (imageFiles.length)); //Get a random nubmer 1-20
  return rando;
  }


function getImage() { //Function to get an array of random number
  currentOne = random();
  currentTwo = random();
  currentThree = random();
  while ((currentTwo === currentOne) ||
  (currentThree === currentTwo) || (currentThree === currentOne)
  || (pOne === currentThree) || (pOne === currentTwo) || (pOne === currentOne) ||
  (pTwo === currentThree) || (pTwo === currentTwo) || (pTwo === currentOne) ||
  (pThree === currentThree) || (pThree === currentTwo) || (pThree === currentOne))
  {
    currentTwo = random();
    currentThree = random();
    console.log('while');
  }
  return [currentOne, currentTwo, currentThree];

}


function clickEvent(e){
  if (clickCounter <= 4) changeImage();
  console.log('clicked',e.target);
  imageObjArr[e.target.id].selected++;
  clickCounter++;
  if (clickCounter > 4){
    var ul = document.getElementById('photos');
    ul.innerHTML = '<li> ' + 'Counter done' + '</li>';
  }
}

console.log('here');
  changeImage();
console.log('now here');

function changeImage () {
  var karen = getImage();
  var ul = document.getElementById('photos');
  var img = '';
  for (var i=0; i < karen.length; i++){
    img = img + '<img id="' + karen[i] + '" src="' + imageObjArr[karen[i]].path + '" >';

    imageObjArr[karen[i]].displayed++;
  }
  ul.innerHTML = img;

  document.getElementById(karen[0]).addEventListener('click', clickEvent);
  document.getElementById(karen[1]).addEventListener('click', clickEvent);
  document.getElementById(karen[2]).addEventListener('click', clickEvent);

  //Capture which images were just displayed
  pOne = karen[0];
  pTwo = karen[1];
  pThree = karen[2];
  console.log(pOne, pTwo, pThree);
}
