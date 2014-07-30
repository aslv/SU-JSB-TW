var Ward = Object.freeze({ up: 1, right: 2, down: -1, left: -2 });

function evilStartMoving() {
	var evils = document.getElementsByClassName('evil');
	var evil;
	var ward;
	var coord;
	for (var i = 0; i < evils.length; i++) {
		evil = evils[i];/*
		if (!('data-ward' in evil)) {
			evil.setAttribute('data-ward', '-2');
		}*/
		ward = parseInt(evil.getAttribute('data-ward'));
		console.log(ward);
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
}