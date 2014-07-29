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

	function isOverBomb() {
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
		return false;
	}
	return (horizontal || vertical) && !isOverBomb();
}