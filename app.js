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

var imgTitle=[];
var selectedData=[];
var displayedData=[];

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
  console.log('function getImage');

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
  if (clickCounter <= 4) changeImage();
  console.log('clicked',e.target);
  imageObjArr[e.target.id].selected++;
  clickCounter++;
  console.log('clickCounter', clickCounter);
  if (clickCounter > 4){
    var ul = document.getElementById('photos');
    ul.innerHTML = '<li> ' + 'You have completed the selection process.  Thank you for participating.' + '</li>';
    dataTable();
  }
}


function changeImage () {
  console.log('function changeImage');

  var rndArr = getImage();
  var ul = document.getElementById('photos');
  var img = '';
  for (var i=0; i < rndArr.length; i++){
    img = img + '<img id="' + rndArr[i] + '" src="' + imageObjArr[rndArr[i]].path + '" >';

    imageObjArr[rndArr[i]].displayed++;
  }
  ul.innerHTML = img;

  document.getElementById(rndArr[0]).addEventListener('click', clickEvent);
  document.getElementById(rndArr[1]).addEventListener('click', clickEvent);
  document.getElementById(rndArr[2]).addEventListener('click', clickEvent);

}

function dataTable(){
  console.log('function dataTable');

  var backgroundSelected=[];
  var backgroundDisplayed=[];

  if (localStorage.title){
    getLocalStorage();
    }else{
        //Create array of chart titles and chart data
        for (var i=0; i < imageFiles.length; i++){
          //Table Data arrays
          imgTitle.push(imageFiles[i]);
          selectedData.push(imageObjArr[i].selected);
          displayedData.push(imageObjArr[i].displayed);
          }
    }

    //Set chart colors
  for (var i=0; i < imageFiles.length; i++){
    backgroundSelected.push('grey');
    backgroundDisplayed.push('blue');
  }


  console.log ('ImgTitle', imgTitle);
  console.log ('selectedData', selectedData);
  console.log ('displayedData', displayedData);

  //Call save function
  save();

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

//Function to save results locally
function save () {
  console.log('function save');

  var svTitle=[];
  var svSel=[];
  var svDis=[];

  //Create local storage
  localStorage.counter=clickCounter; //Locally save counter state

  for (var i=0; i < imageFiles.length; i++){
    svTitle.push(imageFiles[i]);
    svSel.push(imageObjArr[i].selected);
    svDis.push(imageObjArr[i].displayed);
    }

  localStorage.obj=JSON.stringify(imageObjArr);
  localStorage.title=JSON.stringify(svTitle);
  localStorage.selected=JSON.stringify(svSel);
  localStorage.displayed=JSON.stringify(svDis);

  console.log ('string imageObjArr', localStorage.obj);
//  console.log ('localStorage.title', localStorage.title);
//  console.log ('localStorage.selected', localStorage.selected);
//  console.log ('localStorage.displayed', localStorage.displayed);

}


function getLocalStorage(){
//Function to take localStorage and redraw my Table
console.log('function getLocalStorage');

imageObjArr = JSON.parse(localStorage.obj, ',');
  imgTitle = JSON.parse(localStorage.title,',');
  selectedData = JSON.parse(localStorage.selected,'.');
  displayedData = JSON.parse(localStorage.displayed,'.');

  console.log('parse imageObjArr', imageObjArr);
//  console.log('parse sel', selectedData);
//  console.log('parse dis',displayedData);
}

//Function to load the page
function load(){
  console.log('function load');

  if(localStorage.title) {
    dataTable();
  }else{
    changeImage();
    console.log('function changeImage');
  }
}

load();
console.log('end');
