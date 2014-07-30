var Ward = Object.freeze({ up: 1, right: 2, down: -1, left: -2 });

function evilStartMoving() {
	var evils = document.getElementsByClassName('evil');
	var evil;
	var ward;
	var coord;
	var len;
	var wards;
	for (var i = 0; i < evils.length; i++) {
		evil = evils[i];
		ward = parseInt(evil.getAttribute('data-ward'));
		//console.log(ward);
		wards = mayChangeWard(evil);
		len = wards.length;
		if (len > 2 && Math.random() < .5) { // once in two moves, when we are at crossroad
			wards.push(ward); // increasing chances to choose current ward
			ward = wards[Math.floor(Math.random() * wards.length)];
			//evil.removeAttribute('data-ward');
			evil.setAttribute('data-ward', ward.toString());
		}
		switch (ward) {
			case Ward.up:
				coord = parseInt(evil.style.top);
				coord -= EVIL_SPEED;
				if (coord < 0) {
					evil.removeAttribute('data-ward');
					evil.setAttribute('data-ward', (-ward).toString());
					break;
				}
				evil.style.top = coord + 'px';
				break;
			case Ward.right:
				coord = parseInt(evil.style.left);
				coord += EVIL_SPEED;
				if (coord > playGround.clientWidth - evil.clientWidth) {
					evil.removeAttribute('data-ward');
					evil.setAttribute('data-ward', (-ward).toString());
					break;
				}
				evil.style.left = coord + 'px';
				break;
			case Ward.down:
			coord = parseInt(evil.style.top);
				coord += EVIL_SPEED;
				if (coord > playGround.clientHeight - evil.clientHeight) {
					evil.removeAttribute('data-ward');
					evil.setAttribute('data-ward', (-ward).toString());
					break;
				}
				evil.style.top = coord + 'px';
				break;
			case Ward.left:
				coord = parseInt(evil.style.left);
				coord -= EVIL_SPEED;
				if (coord < 0) {
					evil.removeAttribute('data-ward');
					evil.setAttribute('data-ward', (-ward).toString());
					break;
				}
				evil.style.left = coord + 'px';
				break;
			default:
				return;
		}
	}

	function mayChangeWard(evil) {
		var possibleWards = [];

		var left = parseInt(evil.style.left);
		var right = left + evil.clientWidth + 6;
		var top = parseInt(evil.style.top);
		var bottom = top + evil.clientHeight + 6;

		var lefts =   [ 45, 135, 225, 315, 405, 495 ];
		var rights =  [  0,  90, 180, 270, 360, 450 ];
		var tops =    [ 45, 135, 225, 315, 405, 495 ];
		var bottoms = [  0,  90, 180, 270, 360, 450 ];

		var horizontal = false;
		var vertical = false;

		for (var i = 0; i < 6; i++) {
			if (top >= bottoms[i] && bottom <= tops[i]) {
				horizontal = true;
				break;
			}
		}
		for (var j = 0; j < 6; j++) {
			if (left >= rights[j] && right <= lefts[j]) {
				vertical = true;
				break;
			}
		}

		if (vertical) {
			if (top > 0 && !wouldBeOverBomb(left, right, top - EVIL_SPEED, bottom - EVIL_SPEED)) {
				possibleWards.push(Ward.up);
			}
			if (bottom < playGround.clientHeight && !wouldBeOverBomb(left, right, top + EVIL_SPEED, bottom + EVIL_SPEED)) {
				possibleWards.push(Ward.down);
			}
		}
		if (horizontal) {
			if (left > 0 && !wouldBeOverBomb(left - EVIL_SPEED, right - EVIL_SPEED, top, bottom)) {
				possibleWards.push(Ward.left);
			}
			if (right < playGround.clientWidth && !wouldBeOverBomb(left + EVIL_SPEED, right + EVIL_SPEED, top, bottom)) {
				possibleWards.push(Ward.right);
			}
		}
		//console.log(possibleWards);
		return possibleWards;

		function wouldBeOverBomb(left, right, top, bottom) {
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
	}
}