function initGame() {
	document.getElementsByTagName('button')[0].style.display = "none";
	document.getElementById('play-ground').style.display = "block";
	
	pointContainer.value = points;
	liveContainer.value = lives;

	face.style.left = '168px';

	var gameId = setInterval(move, GAME_SPEED);
}

var playGround = document.getElementById('play-ground');
var face = document.getElementById('face');

var pointContainer = document.getElementById('points');
var liveContainer = document.getElementById('lives');
// ADJUST GAME SETTINGS FROM HERE
var MAX_ROCK_SPEED = 2;
var GAME_SPEED = 25;
var ROCK_FREQUENCY = 75;

var lives = 5;
var points = 0;

var ROCK_PATH = 'img/game/';
function getRockSource() {
	var n = Math.round(Math.random() * 17) + 1;
	return ROCK_PATH + 'rock' + n + '.png';
}
function getRockFlow() {
	var left = playGround.clientWidth - face.width;
	left = parseInt(left * Math.random());
	console.log(left);
	return left + 'px';
}

var rocks = [];
function addRock() {
	var rock = document.createElement('img');
	rock.setAttribute('src', getRockSource());
	rock.setAttribute('alt', 'rock');
	rock.setAttribute('data-speed', Math.floor(Math.random() * MAX_ROCK_SPEED) + 1);
	if (Math.random() < 0.5) {
		rock.setAttribute('class', 'rotate');
	}
	rock.style.width = '50px';
	rock.style.height = '50px';
	rock.style.position = 'absolute';
	rock.style.top = '0px';
	rock.style.left = getRockFlow();
	playGround.appendChild(rock);
	rocks.push(rock);
}

function advanceRocks() {
	for(var i = 0; i < rocks.length; i++) {
		rocks[i].style.top = (parseInt(rocks[i].style.top) + parseInt(rocks[i].getAttribute('data-speed'))) + 'px';
		if (hasLeftPlayGround(rocks[i])) {
			deleteRock(rocks[i]);
			pointContainer.value = ++points;
		}
	}
}
function hasLeftPlayGround(rock) {
	return parseInt(rock.style.top) > playGround.clientHeight;
}
function deleteRock(rock) {
	var index = rocks.indexOf(rock);
	if (index !== -1) {
		rocks.splice(index, 1);
	}
	playGround.removeChild(rock);
}
function detectCollisions() {
	var rock;
	for(var i = 0; i < rocks.length; i++) {
		rock = rocks[i];
		if (parseInt(rock.style.top) > playGround.clientHeight - face.height - rock.height) { //if the height allows collision
			if (Math.abs(parseInt(face.style.left) - parseInt(rock.style.left)) < face.width) { // if there is overlapping
				deleteRock(rock);
				liveContainer.value = --lives;
			}
		}
	}
}
function checkGameStatus() {
	if (lives < 0) {
		//clearInterval(gameId);
		alert('Game Over :(\nYour points: ' + points);
		var newGame = confirm('New Game?');
		if (newGame) {
			location.reload();
		}
		else {
			close();
		}
	}
}

// the main finction :)
function move() {
	if (Math.random() * ROCK_FREQUENCY < 1) {
		addRock();
	}
	advanceRocks();
	detectCollisions();
	checkGameStatus();
}

window.onkeydown = function(e) {
	//e = e || window.event;
	var code = e.keyCode || e.which;
	var diff;
	var pos = parseInt(face.style.left);
	if (code === 37) {
		diff = -5;
		if (pos + diff < 0) {
			pos = - diff;
		}
		pos += diff;
		face.style.left = pos + 'px';
	} else if (code === 39) {
		diff = 5;
		var lim = playGround.clientWidth - face.width;
		if (pos + diff > lim) {
			pos = lim - diff;
		}
		pos += diff;
		face.style.left = pos + 'px';
	}
}
