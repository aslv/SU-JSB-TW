window.onkeydown = function(e) {
	e = e || window.event;
	var code = e.keyCode || e.which;
	var coord;
	switch (code) {
		case 32: // space
			locateBomb(parseInt(hero.style.left), parseInt(hero.style.top));
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

	function isOverBomb() {/*
		var bombs = document.getElementsByClassName('bomb');
		var bomb;
		var bLeft; var bRight; var bTop; var bBottom;
		for (var i = 0; i < bombs.length; i++) {
			bomb = bombs[i];
			bLeft = parseInt(bomb.style.left);
			bRight = bLeft + bomb.clientWidth;
			bTop = parseInt(bomb.style.top);
			bBottom = bTop + bomb.clientHeight;

			if (bottom > bTop && top < bBottom) {
				if ((left < bLeft && bLeft < right) || (left < bRight && bRight < right) || (left == bLeft && right == bRight)) {
					return true;
				}
			}
		}
		return false;*/return false;
	}


	return (horizontal || vertical) && !isOverBomb();
}
function isHeroColliding() {
    var hero = document.getElementById('hero');

    var x = hero.style.left;
    x = x.substring(0, x.indexOf('p'));
    x = parseInt(x);

    var y = hero.style.top;
    y = y.substring(0, y.indexOf('p'));
    y = parseInt(y);

    idsToCheck = ['nakov','georgiev','alexandra','petq','kurtev', 'karamfilov'];
    for (i in idsToCheck) {
        if (document.getElementById(idsToCheck[i])) {
            var badGuy = document.getElementById(idsToCheck[i]);
            var x1= badGuy.style.left;
            x1 = x1.substring(0, x1.indexOf('p'));
            x1 = parseInt(x1);

            var y1= badGuy.style.top;
            y1 = y1.substring(0, y1.indexOf('p'));
            y1 = parseInt(y1);

            if (
                ((x + 45) > x1 && ((x + 45) < x1 + 45) && ((y == y1)||(y > y1 && y+45 < y1) || (y < y1 && y > y1+45))) ||
                (x < x1+45 && (x > x1) && ((y == y1)||(y > y1 && y+45 < y1) || (y < y1 && y > y1+45))) ||
                (x == x1) && ((y == y1)||(y > y1 && y+45 < y1) || (y < y1 && y > y1+45))
                ) {
                console.log('hero is killed')
                hero.remove();
                setTimeout(function() { location.reload(); }, 1500);
            }
        }
    }
}
