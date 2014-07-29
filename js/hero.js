window.onkeydown = function(e) {
	e = e || window.event;
	var code = e.keyCode || e.which;
	var coord;
	switch (code) {
		case 32: // space
			// lay bomb
			break;
		case 37: // ←
			coord = parseInt(hero.style.left);
			coord -= HERO_SPEED;
			if (coord < 0) {
				coord = 0;
			}
			if (isMoveable(null, coord)) {
				hero.style.left = coord + 'px';
			}
			break;
		case 38: // ↑
			coord = parseInt(hero.style.top);
			coord -= HERO_SPEED;
			if (coord < 0) {
				coord = 0;
			}
			if (isMoveable(coord, null)) {
				hero.style.top = coord + 'px';
			}
			break;
		case 39: // →
			coord = parseInt(hero.style.left);
			coord += HERO_SPEED;
			if (coord > playGround.clientWidth - hero.clientWidth) {
				coord = playGround.clientWidth - hero.clientWidth;
			}
			if (isMoveable(null, coord)) {
				hero.style.left = coord + 'px';
			}
			break;
		case 40: // ↓
			coord = parseInt(hero.style.top);
			coord += HERO_SPEED;
			if (coord > playGround.clientHeight - hero.clientHeight) {
				coord = playGround.clientHeight - hero.clientHeight;
			}
			if (isMoveable(coord, null)) {
				hero.style.top = coord + 'px';
			}
			break;
		default:
			return;
	}
}

function isMoveable(tb, rl) {
	var left = !rl ? parseInt(hero.style.left) : rl;
	var right = left + hero.clientWidth;
	var top = !tb ? parseInt(hero.style.top) : tb;
	var bottom = top + hero.clientHeight;
	//console.log('left: ' + left, ' right: ' + right, ' top: ' + top, ' bottom: ' + bottom);

	var lefts =   [ 45, 135, 225, 315, 405, 495 ];
	var rights =  [  0,  90, 180, 270, 360, 450 ];
	var tops =    [ 45, 135, 225, 315, 405, 495 ];
	var bottoms = [  0,  90, 180, 270, 360, 450 ];

	var horizontal = false;
	var vertical = false;

	for (var i = 0; i < 6; i++) {
		if (top >= bottoms[i] && bottom <= tops[i]) {
			horizontal = true;
		}
	}
	for (var j = 0; j < 6; j++) {
		if (left >= rights[j] && right <= lefts[j]) {
			vertical = true;
		}
	}
	return horizontal || vertical;
}

function locateBomb(x, y) {
    // as long as hero is on this location it is possible to locate bomb here - no need for explicit check

    //// CREATE bomb:
    var bomb = document.createElement("div");
    // style the bomb to append to the #playground :
    bomb.className = 'bomb';
    bomb.innerHTML = 'B!';

    // locate bomb in position x,y :
    bomb.style.left = x + "px";
    bomb.style.top = y + "px";
    // add some visual effects to the bomb per 400 milliseconds:
    var colorToSet = 'maroon'
    var bombVisualEffect = setInterval(function() {
        bomb.style.background = colorToSet;
        if (colorToSet == 'maroon') {
            colorToSet = 'black';
        } else {
            colorToSet = 'maroon';
        }
    },400);
    // append bomb to #playground
    document.getElementById("playground").appendChild(bomb);
    // detonate the bomb after 4 secs:
    setTimeout(function() {
        clearInterval(bombVisualEffect);
        // trigger flames:
        bomb.style.boxShadow = '0 0 120px 30px gold';
        setTimeout(function() {
            bomb.remove();
        }, 800)
        // kill heros if they are near
        killHeros(bomb.style.left, bomb.style.top);
    }, 4000);
}

function killHeros(x, y) {
    // remove 'px' and parse to int
    x = x.substring(0, x.indexOf('p'));
    x = parseInt(x);
    y = y.substring(0, y.indexOf('p'));
    y = parseInt(y);
    var isHeroKilled = false;
    var hero = document.getElementById("hero");
    // get hero location:
    var hX = document.getElementById("hero").style.left;
    var hY = document.getElementById("hero").style.top;
    // remove 'px' ant parse to int
    hX = hX.substring(0, hX.indexOf('p'));
    hX = parseInt(hX)
    hY = hY.substring(0, hY.indexOf('p'));
    hY = parseInt(hY);
    console.log('bomb: '+ x + ', ' + y);
    console.log('hero: '+ hX + ', ' + hY);
    //// check if hero is in the flame:
    // check horizontal:
    if (
        !(
            ((x - 90 > hX) && (x - 90) > (hX + 40))
            || ((x + 135) < hX && (x + 135) < (hX + 40))
            )
        ) {
            // check vertically
            if (
                !(
                    ((y - 90 > hY) && (y - 90) > (hY + 40))
                    || ((y + 135) < hY && (y + 135) < (hY + 40))
                    )
                ) {
                isHeroKilled = true;
            }
    }

    if (isHeroKilled) {
        alert("Hero is killed.");
    }
}


