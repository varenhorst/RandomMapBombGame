//Rough code. Need to overhaul.

$(document).ready(function() {

  var fieldHeight = $('.field').height();
  var fieldWidth = $('.field').width();
  buildGrid(fieldHeight,fieldWidth);
  setUpCharacterControls();
  collidesWith($('#character'),$('.wall'));


});


function buildGrid(height,width){
  var array = generateArray();
  var imageUrl = 'https://opengameart.org/sites/default/files/oga-textures/71276/bricks.png'
  var imageUrl1 = 'https://sesome.co.uk/wp-content/uploads/2017/02/hey-meme.jpg';
  var classArray = [];
  //collidesWith($('#character'),arrayTest);
	for(var i = 0; i < array.length; i++){
  	$('.field').append('<div class="node" id="'+ (i + 1) +'"></div>');
   		if(array[i]['endPoint'] == true && array[i]['bisect'] == false){
        $('#'+(i+1)).addClass('wall');
        classArray.push($('#'+(i+1)));
        //$('#'+p).addClass('field');
      	$('#'+(i+1)).css({background:'black'});
        $('#'+(i+1)).css('background-image','url(' + imageUrl + ')');
        $('#'+(i+1)).css('background-size','cover');
      }
      if(array[i]['bisect'] == true){
      	//$('#'+(i+1)).css({background:'yellow'});
      }
      if(array[i]['floor'] == true){
     	  $('#'+(i+1)).css('background-image','url(' + imageUrl1 + ')');
        $('#'+(i+1)).css('background-size','cover');
      }
      if(array[i]['color']){
      	$('#'+(i+1)).css({background:array[i]['color']});
      }
      if(array[i]['deletion']){
      	$('#'+(i+1)).css({background:'white'});
      }
      //console.log(array[i]['endPoint']);
  }
  spawnEnemies(array);
  return classArray;
}




function generateArray(){
	//finding endpoints at every 5 nodes
  var numberOfNodes = 450; // dependent on height and width of container. Need solution
  var gridArray = [];
  var intersectArray = []; // for testing *
  var randomComplexity = Math.ceil(Math.random()*12);
  var complexity = randomComplexity; // changes the amount of bisect areas to be taken out upon generation
  var randArray = getRandomBisectArray(complexity,12);
  var row = 1;
  var rowNumber = 1;
	var endPoint;
  var bisect;
  var bisectNum = 0;
  var color;
  var bisectConnect1; //which bisect the endpoints connect too
  var bisectConnect2;
  var deletion;
  var floor;
  var floorArea1; // floor area are the element around each grid bisect
  var floorArea2;
  var floorArea3;
  var floorArea4;
  var randomNumber = 1;


  for(var i = 0; i < numberOfNodes; i++){
    floorArea1 = 0;
    floorArea2 = 0;
    floorArea3 = 0;
    floorArea4 = 0;
  	bisectConnect1 = false;
    floor = false;
		bisectConnect2 = false;
		bisectConnect3 = false;
  	color = false;
  	bisect = false;
   	deletion = false;

  	if(i % 25 == 0 && i !=0){
    	row++;
      rowNumber = 1;
      endPoint = true;
    } else if(i !=0 ) {
    	rowNumber++;
    }
    // 426 is the beginning of the last row -> need solution for variable size
    if(rowNumber == 1 || rowNumber % 5 == 0 || i >= 426){
    	endPoint = true;
    } else {
    	endPoint = false;
    }
    if(row % 5 == 0 || row == 1){
    	endPoint = true;
    }
    if(row % 5 == 0 && row != 1){
    	// 25 is the number of items in each row.
    	if(rowNumber % 5 == 0 && rowNumber % 25 != 0){
      	bisect = true;
        floor = true;
        bisectNum++;
        intersectArray.push({bisectNumber:bisectNum,row:row,rowNumber:rowNumber});
      } else {
      	bisect = false;
      }
    }
    // ********************
    //  Getting the bisect connect numbers from each leg of each bisect
    if(row != 1 && rowNumber > 1 && bisect == false && endPoint == true && rowNumber < 25){
    	if(row < 5){
      	if(rowNumber == 5){
        	bisectConnect1 = 1;
      	//	color = 'blue';
     		}
        if(rowNumber == 10){
        	bisectConnect1 = 2;
         // color = 'orange';
        }
        if(rowNumber == 15){
        	bisectConnect1 = 3;
        }
        if(rowNumber == 20){
        	bisectConnect1 = 4;
        }
      }
      if(row == 5){
      	if(rowNumber < 5){
        	bisectConnect1 = 1;
        }
        if(rowNumber > 5 && rowNumber < 10){
        	bisectConnect1 = 1;
          bisectConnect2 = 2;
        }
        if(rowNumber > 10 && rowNumber < 15){
        	bisectConnect1 = 2;
          bisectConnect2 = 3;
        }
        if(rowNumber > 15 && rowNumber < 20){
        	bisectConnect1 = 3;
          bisectConnect2 = 4;
        }
        if(rowNumber > 20 && rowNumber < 25){
        	bisectConnect1 = 4;
          bisectConnect2 = 4;
        }
      }
      if(row > 5 && row < 10){
      	if(rowNumber == 5){
        	bisectConnect1 = 1;
          bisectConnect2 = 5;
      	//	color = 'blue';
     		}
        if(rowNumber == 10){
        	bisectConnect1 = 2;
          bisectConnect2 = 6;
         // color = 'orange';
        }
        if(rowNumber == 15){
        	bisectConnect1 = 3;
          bisectConnect2 = 7;
        }
        if(rowNumber == 20){
        	bisectConnect1 = 4;
          bisectConnect2 = 8;
        }
      }
      if(row == 10){
      	if(rowNumber < 5){
        	bisectConnect1 = 5;
        }
        if(rowNumber > 5 && rowNumber < 10){
        	bisectConnect1 = 5;
          bisectConnect2 = 6;
        }
        if(rowNumber > 10 && rowNumber < 15){
        	bisectConnect1 = 6;
          bisectConnect2 = 7;
        }
        if(rowNumber > 15 && rowNumber < 20){
        	bisectConnect1 = 7;
          bisectConnect2 = 8;
        }
        if(rowNumber > 20 && rowNumber < 25){
        	bisectConnect1 = 8;
         	bisectConnect2 = 8;
        }
      }
      if(row > 10 && row < 15){
      	if(rowNumber == 5){
        	bisectConnect1 = 5;
          bisectConnect2 = 9;
      	//	color = 'blue';
     		}
        if(rowNumber == 10){
        	bisectConnect1 = 6;
          bisectConnect2 = 10;
         // color = 'orange';
        }
        if(rowNumber == 15){
        	bisectConnect1 = 7;
          bisectConnect2 = 11;
        }
        if(rowNumber == 20){
        	bisectConnect1 = 8;
          bisectConnect2 = 12;
        }
      }
      if(row == 15){
      	if(rowNumber < 5){
        	bisectConnect1 = 9;
        }
        if(rowNumber > 5 && rowNumber < 10){
        	bisectConnect1 = 9;
          bisectConnect2 = 10;
        }
        if(rowNumber > 10 && rowNumber < 15){
        	bisectConnect1 = 10;
          bisectConnect2 = 11;
        }
        if(rowNumber > 15 && rowNumber < 20){
        	bisectConnect1 = 11;
          bisectConnect2 = 12;
        }
        if(rowNumber > 20 && rowNumber < 25){
        	bisectConnect1 = 12;
          bisectConnect2 = 12;
        }
      }
      if(row > 15 && row < 18){
      	if(rowNumber == 5){
        	bisectConnect1 = 9;
     		}
        if(rowNumber == 10){
        	bisectConnect1 = 10;
        }
        if(rowNumber == 15){
        	bisectConnect1 = 11;
        }
        if(rowNumber == 20){
        	bisectConnect1 = 12;
        }
      }
    }
    // ***********************************
    // inner layer
    if(row % 5 !=0 && endPoint == false){
    	if(row < 5){
      	if(rowNumber < 5){
         	floor = true;
          floorArea1 = 1;
        }
        if(rowNumber < 10 && rowNumber > 5){
        	floor = true;
          floorArea1 = 1;
          floorArea2 = 2;
        }
        if(rowNumber < 15 && rowNumber > 10){
        	floor = true;
          floorArea1 = 2;
          floorArea2 = 3;
        }
        if(rowNumber < 20 && rowNumber > 15){
        	floor = true;
          floorArea1 = 3
          floorArea2 = 4;
        }
        if(rowNumber < 25 && rowNumber > 20){
        	floor = true;
          floorArea1 = 4;
        }
      }
      if(row > 5 && row < 10){
      	if(rowNumber < 5){
         	floor = true;
          floorArea1 = 1;
          floorArea2 = 5;
        }
        if(rowNumber < 10 && rowNumber > 5){
        	floor = true;
          floorArea1 = 1;
          floorArea2 = 2;
          floorArea3 = 5;
          floorArea4 = 6;
        }
        if(rowNumber < 15 && rowNumber > 10){
        	floor = true;
          floorArea1 = 2;
          floorArea2 = 3;
          floorArea3 = 6;
          floorArea4 = 7;
        }
        if(rowNumber < 20 && rowNumber > 15){
      	 	floor = true;
          floorArea1 = 3;
          floorArea2 = 4;
          floorArea3 = 7;
          floorArea4 = 8;
        }
        if(rowNumber < 25 && rowNumber > 20){
        	floor = true;
          floorArea1 = 4;
          floorArea2 = 8;
        }
      }
      if(row > 10 && row < 15){
      	if(rowNumber < 5){
         	floor = true;
          floorArea1 = 5;
          floorArea2 = 9;
        }
        if(rowNumber < 10 && rowNumber > 5){
        	floor = true;
          floorArea1 = 5;
          floorArea2 = 6;
          floorArea3 = 9;
          floorArea4 = 10;
        }
        if(rowNumber < 15 && rowNumber > 10){
        	floor = true;
          floorArea1 = 6;
          floorArea2 = 7;
          floorArea3 = 10;
          floorArea4 = 11;
        }
        if(rowNumber < 20 && rowNumber > 15){
        	floor = true;
          floorArea1 = 7;
          floorArea2 = 8;
          floorArea3 = 11;
          floorArea4 = 12;
        }
        if(rowNumber < 25 && rowNumber > 20){
        	floor = true;
          floorArea1 = 8;
          floorArea2 = 12;
        }
      }
      if(row > 15 && row < 20){
     	 if(rowNumber < 5){
         	floor = true;
          floorArea1 = 9;
        }
        if(rowNumber < 10 && rowNumber > 5){
        	floor = true;
          floorArea1 = 9;
          floorArea2 = 10;
        }
        if(rowNumber < 15 && rowNumber > 10){
        	floor = true;
          floorArea1 = 10;
          floorArea2 = 11;
        }
        if(rowNumber < 20 && rowNumber > 15){
        	floor = true;
          floorArea1 = 11;
          floorArea2 = 12;
        }
        if(rowNumber < 25 && rowNumber > 20){
        	floor = true;
          floorArea1 = 12;
        }
      }
      // if(row > 20 && row < 25){
      // 	if(rowNumber < 5){
      //    	floor = true;
      //   }
      //   if(rowNumber < 10 && rowNumber > 5){
      //   	floor = true;
      //   }
      //   if(rowNumber < 15 && rowNumber > 10){
      //   	floor = true;
      //   }
      //   if(rowNumber < 20 && rowNumber > 15){
      //   	floor = true;
      //   }
      //   if(rowNumber < 25 && rowNumber > 20){
      //   	floor = true;
      //   }
      // }
    }
  gridArray.push({classId:i+1,row:row,item:rowNumber,endPoint:endPoint,bisect:bisect,color:color,bisectPos1:bisectConnect1,bisectPos2:bisectConnect2,bisectPos3:bisectConnect3,deletion:deletion,floor:floor,bisectNum:bisectNum,floorArea1:floorArea1,floorArea2:floorArea2,floorArea3:floorArea3,floorArea4:floorArea4});
  }

  // Going through grid array, identifying the map after each random generation
  var removedEndPoint;
  for(var p = 0; p < gridArray.length; p++){
    removedEndPoint = false;
    randomNumber = Math.ceil(Math.random()*5); // random number if random number equals 4 within floorarea, remove it. <- for making maps more dicy
  	if(randArray.indexOf(gridArray[p]['bisectPos1']) !== -1 || randArray.indexOf(gridArray[p]['bisectPos2']) !== -1) {
   		gridArray[p]['floor'] = true;
      gridArray[p]['endPoint'] = false;
      removedEndPoint = true;
		}
    if(gridArray[p]['bisect'] && randArray.indexOf(gridArray[p]['bisectNum']) == -1){
  		gridArray[p]['floor'] = false;
      gridArray[p]['bisect'] = false;
  	}
    if(randArray.indexOf(gridArray[p]['bisect']) !== -1){

    }
    if(randArray.indexOf(gridArray[p]['floorArea1']) !== - 1 || randArray.indexOf(gridArray[p]['floorArea2']) !== - 1 || randArray.indexOf(gridArray[p]['floorArea3']) !== - 1 || randArray.indexOf(gridArray[p]['floorArea4']) !== - 1){
     //console.log(randomNumber);
    } else {
      if(gridArray[p]['endPoint'] == false && !removedEndPoint && randomNumber == 5){
        gridArray[p]['floor'] = false;
        gridArray[p]['endPoint'] = true;
      }
    }
  }
  // filterGrid(intersectArray,gridArray); // MAYBE filter endpoints to remove random interesects
 	//console.log(gridArray);
 	return gridArray;
}



function setUpCharacterControls(array){
  var audio = new Audio('footsteps-6.mp3');
  var audioBomb = new Audio('wallExplosion.mp3');
  var audioShoot = new Audio('bulletFire.wav');
  var pane = $('field'),
      box = $('#character'),
      w = pane.width() - box.width(),
      d = {},
      x = 5;

  function newv(v,a,b) {
      var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
      return n < 0 ? 0 : n > w ? w : n;
  }
  var keyPress = '';
  var keyPressTest = '';
  var direction;
  $(window).keydown(function(e) {
    if(e.keyCode != 0 && e.keyCode != 32){
      keyPressTest = e.keyCode;
      direction = figureDirection(keyPressTest);
    }
    if (e.keyCode === 66) { // B
      dropBomb($('#character'),$('.field'),audioBomb);
    }
    d[e.which] = true;
    keyPress = e.which;
    //audio.play();
  });
  $(window).keyup(function(e) {
    if(e.keyCode != 0 && e.keyCode != 32){
      keyPressTest = e.keyCode;
      direction = figureDirection(keyPressTest);
    } else {
      keyPressTest = keyPressTest;
      direction = direction;
    }
    d[e.which] = false;
    keyPress = '';
    audio.pause();
   });
  $(window).keypress(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault();
      fireWeapon($('#character'),$('.field'),direction,audioShoot);
    }
  });
  var collisionStop = 0;
  var rightValue = 39;
  var leftValue = 37;
  var topValue = 38;
  var bottomValue = 40;
  var classArray = ['collision-top','collision-bottom','collision-left','collision-right'];
    setInterval(function() {
      var className = $('#character').attr('class');
      if(typeof className != 'undefined' && className != ""){
        if(className.includes(classArray[0])){
          topValue = 0;
        } else {
          topValue = 38;
        }
        if(className.includes(classArray[1])){
          bottomValue = 0;
        } else {
          bottomValue = 40;
        }
        if(className.includes(classArray[2])){
          leftValue = 0;
        } else {
          leftValue = 37;
        }
        if(className.includes(classArray[3])){
          rightValue = 0;
        } else {
          rightValue = 39;
        }
      } else {
        rightValue = 39;
        leftValue = 37;
        topValue = 38;
        bottomValue = 40;
      }

    box.css({
        left: function(i,v) { return newv(v, leftValue, rightValue); },
        top: function(i,v) { return newv(v, topValue, bottomValue); }
    });

  }, 30);
}





function getRandomBisectArray(complexity,interCount){
	var arr = []
	while(arr.length < complexity){
    var randomnumber = Math.ceil(Math.random()*interCount);
    if(arr.indexOf(randomnumber) > -1) continue;
    arr[arr.length] = randomnumber;
	}
  var myarray= arr;
	myarray.sort(function(a,b){
    return a - b
	})
	return myarray;
}
var timer;
function collidesWith(element1,element2) {
    setInterval(function(){
    var i = 0;
    var hitsTop = $('.detectorTop').collision(".wall");
    var hitsBottom = $('.detectorBottom').collision(".wall");
    var hitsLeft = $('.detectorLeft').collision(".wall");
    var hitsRight = $('.detectorRight').collision(".wall");
    var hitsArray = ({top:hitsTop,bottom:hitsBottom,left:hitsLeft,right:hitsRight});
    //if(hits)
    for(i in hitsArray){
      if(hitsArray[i].length > 0){
        element1.addClass('collision-'+i);
      } else {
        if(element1.hasClass('collision-'+i)){
          element1.removeClass('collision-'+i);
        }
      }
    }
  },200)
}

var p = 0;
//var bombArray = [];
function dropBomb(element,container,audio){ // for shits
    var bombRadius = 100;
    container.append('<div id="bomb'+p+'" class="bomb"></div>');
    appendBombSensor($('#bomb'+p),p,bombRadius);
    $('#bomb'+p).css({top:element.css('top'), left:element.css('left'),height:'20px',width:'20px',background:'yellow',position:'absolute'});
    //bombArray.push($('#bomb'+p));
    bombTime($('#bomb'+p),p,audio);
    p++;
}
function bombTime(bomb,index,audio){
  blinkMe(bomb);
  var explosion;
  var possibleHits = $('.bombSensor'+index).collision('.wall');
  var enemyHits = $('.bombSensor'+index).collision('.enemy');
  console.log(enemyHits);
  if(possibleHits.length > 0){
    explosion = true;
  } else {
    explosion = false;
  }
  if(enemyHits.length > 0){
    enemyExplosion = true
  } else {
    enemyExplosion = false;
  }
  setTimeout(function(){
    if(explosion){
      explodeWall(possibleHits);
    }
    if(enemyExplosion){
      killEnemy(enemyHits);
    }
    audio.play();
    bomb.remove();
  },1000)
}
function explodeWall(elements){
  for(var i = 0; i < elements.length; i++){
    $('#'+elements[i]['id']).removeClass('wall');
    $('#'+elements[i]['id']).addClass('exploded');
  }
}
function appendBombSensor(element,index,bombRadius){
  element.append('<div class="bombSensor'+index+'"></div>');
  $('.bombSensor'+index).css({height:bombRadius,width:bombRadius,border:'1px solid black',position:'relative',transform:'translate(-40%,-50%)',borderRadius:'50%',top:'50%'});
  return '.bombSensor'+index;
}

var x = 0;
var timeIndex = 0;
var bulletArray = [];
var bulletTimeArray = []; // to limit fire-rate;
function fireWeapon(character,container,direction,audio){
  var newDate = new Date().getSeconds(); // get seconds of when function is fired
  bulletTimeArray.push(newDate);
  if(bulletTimeArray[timeIndex] != bulletTimeArray[timeIndex-3]){ // if second != seconds of last fire, run transformation
    var range = 350;
    var classArray = ['collision-top','collision-bottom','collision-left','collision-right'];
    var className = $('#character').attr('class');
    container.append('<div id="bullet'+x+'" class="bullet"></div>');
    $('#bullet'+x).css({top:parseFloat(character.css('top')) + 8 + 'px', left:parseFloat(character.css('left')) + 8 + 'px',height:'10px',width:'10px',background:'blue',position:'absolute'});
    switch (direction) {
      case 'right':
        $('#bullet'+x).css({left:parseFloat(character.css('left')) + range, transition:'1s ease-out'});
        break;
      case 'left':
        $('#bullet'+x).css({left:parseFloat(character.css('left')) - range, transition:'1s ease-out'});
        break;
      case 'top':
        $('#bullet'+x).css({top:parseFloat(character.css('top')) - range, transition:'1s ease-out'});
        break;
      case 'bottom':
        $('#bullet'+x).css({top:parseFloat(character.css('top')) + range, transition:'1s ease-out'});
        break;
    }
    bulletArray.push($('#bullet'+x));
    bulletTime(bulletArray[x],x,audio);
    x++;
  }
  timeIndex++;
  // var timeout = setTimeout(function(){
  //   $('#bullet'+x).remove();
  //   x = 0;
  // },2000)

}
function bulletTime(bullet,index,audio){
  //bullet.animate({left: '250px'});
  audio.play();
  var interval = setInterval(function(){
    if($('#bullet'+index).collision('.wall').length > 0){
      bullet.remove();
      return;
    }
  },100)
  setTimeout(function(){
    clearInterval(interval);
    bullet.remove();
  },1000)
}

function spawnEnemies(gridArray){
  var difficulty = 1;
  var randomNumber;
  for(var i = 0; i < gridArray.length; i++){
    randomNumber = Math.ceil(Math.random()*200);
    if(gridArray[i]['bisect'] == true && randomNumber > 100){
      appendEnemy(gridArray[i]['classId']);
    //  $('#'+gridArray[i]['classId']).css({'background-image':'none',background:'black'});
    }
  }
}
function appendEnemy(classId){
  setTimeout(function(){
    var xPos = $('#'+classId).offset().left - 85;
    var yPos = $('#'+classId).offset().top - 40;
    $('.field').append('<div class="enemy enemy'+ classId +'" id="enemy"></div>');
    appendEnemySensor(classId,'enemy');
    $('.enemy'+classId).css({top:yPos,left:xPos,position:'absolute',background:'red',width:'20px',height:'20px'});
  },2000)
}
function appendEnemySensor(elementId,type){
  attackRadius = 500;
  $('.'+type+elementId).append('<div class="enemySensor'+ elementId +'"></div>');
  $('.enemySensor'+elementId).css({width:attackRadius,height:attackRadius,position:'absolute',transform:'translate(-43%,-45%)',border:''});
  activateEnemy('.enemySensor'+elementId,$('.'+type+elementId),$('.enemySensor'+elementId),elementId);
}

function activateEnemy(enemySensorClassName,enemyClass,enemySensorClass,id){
  var i = 0; //
  var interval = setInterval(function(){
    if($('#character').collision(enemySensorClass).length > 0){
      enemyFire(enemyClass,enemySensorClass,id,i);
    }
    if(enemyClass.hasClass('enemyDead')){
      clearInterval(interval);
    }
    i++;
  },250)
}

var hitsonplayer = 0;
function enemyFire(enemyClass,enemySensorClass,id,index){ // character is in range of enemy
  var characterEnemyVector = getVector($('#character'),enemyClass);
  $('.container').append('<div class="enemyFire" id='+id+'enemyFire'+ index +'></div>');
  $('#'+id+'enemyFire'+index).css({left:enemyClass.offset().left + 'px',top:enemyClass.offset().top + 'px'})
  setTimeout(function(){
    $('#'+id+'enemyFire'+index).css({left:characterEnemyVector[0]['left']+'px',top:characterEnemyVector[0]['top']+'px',transition:'.7s ease-out',position:'absolute'});
  },1)
  var interval = setInterval(function(){
    // console.log('hey');
    if($('#'+id+'enemyFire'+index).collision('#character').length > 0){
      clearInterval(interval);
      $('#'+id+'enemyFire'+index).remove();
      hitsonplayer++
      $('#character').addClass('hit'+hitsonplayer);
      updateHealthBar(hitsonplayer);
      if(hitsonplayer == 10){
        // dead
      }
    } else if($('#'+id+'enemyFire'+index).collision('.wall').length > 0){
      clearInterval(interval);
      $('#'+id+'enemyFire'+index).remove();
    }
  },100)
  setTimeout(function(){
    $('#'+id+'enemyFire'+index).remove();
    clearInterval(interval);
  },700)

}
function getVector(to,from){ // gets angle and distance from to
    var vectorArray = [];
    var xPosTo = to.offset().left;
    var yPosTo = to.offset().top;
    var xPosFrom = from.offset().left;
    var yPosFrom = from.offset().top;
    var distanceFromTo = Math.hypot(xPosTo-xPosFrom, yPosTo-yPosFrom);
    var angleDegress = Math.atan2(yPosTo - yPosFrom, xPosTo - xPosFrom) * 180 / Math.PI;
    vectorArray.push({left:xPosTo,top:yPosTo});
    return vectorArray;

}





function figureDirection(code){
  if(code === 38){
    return 'top';
  } else if(code === 40){
    return 'bottom';
  } else if(code === 39){
    return 'right';
  } else if(code === 37){
    return 'left';
  } else if(code === null){
    return 'right';
  }
}
function blinkMe(element){
   element.fadeOut(300).fadeIn(300);
   element.fadeOut(300).fadeIn(300);
}


function updateHealthBar(hits){
  $('.health-bar-inner').css({width:hits*10+'%'});
}


function killEnemy(hits){
  for(var i = 0; i < hits.length; i++){
    $('#'+hits[i]['id']).addClass('enemyDead');
    hits[i].remove();
  }
}
