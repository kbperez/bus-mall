 'use strict';

var imageFiles = [ //array of image files
  'bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']

var currentOne;
var currentTwo;
var currentThree;

var clickCounter=0;

var  pOne;
var  pTwo;
var  pThree;

// The object constructor
function Image (name) {
  this.name = name; //image file name
  this.path = './img/'+name+'.jpg'; //path to imageFiles
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
  while ((rando === pOne) || (rando === pTwo) || (rando === pThree)) {
  rando = Math.floor(Math.random() * (imageFiles.length));
  }
  return rando;
  }


function getImage() { //Function to get an array of random number
  currentOne = random();
  currentTwo = random();
  currentThree = random();
  while ((currentTwo === currentOne) ||
  (currentThree === currentTwo) || (currentThree === currentOne))

  {
    currentTwo = random();
    currentThree = random();
    console.log('while');
  }
  pOne = currentOne;
  pTwo = currentTwo;
  pThree = currentThree;

  return [currentOne, currentTwo, currentThree];

}


function clickEvent(e){
  if (clickCounter <= 24) changeImage();
  console.log('clicked',e.target);
  imageObjArr[e.target.id].selected++;
  clickCounter++;
  if (clickCounter > 24){
    var ul = document.getElementById('photos');
    ul.innerHTML = '<li> ' + 'You have completed the selection process.  Thank you for participating.' + '</li>';
    dataTable();
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

}

function dataTable(){
  var imgTitle=[];
  var selectedData=[];
  var displayedData=[];
  var backgroundSelected=[];
  var backgroundDisplayed=[];

//Create array of chart titles and chart data
for (var i=0; i < imageFiles.length; i++){
  imgTitle.push(imageFiles[i]);
  selectedData.push(imageObjArr[i].selected);
  displayedData.push(imageObjArr[i].displayed);
  backgroundSelected.push('grey');
  backgroundDisplayed.push('blue');

}
console.log('selected data', selectedData);
console.log('displayed data', displayedData);
var canvas = document.getElementById('chart');
var ctx = canvas.getContext('2d');

var chart = new Chart (ctx, {
  type: 'bar',
  data: {
    labels: imgTitle,
    datasets: [
      {
      label: 'Times Selected',
      data: selectedData,
      backgroundColor: backgroundSelected,
      borderWidth: 1,
    },
    {
      label: 'Times Displayed',
      data: displayedData,
      backgroundColor: backgroundDisplayed,
      borderWidth: 1,
    }]
  },
  options: {}
});

  }
