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
			coord -= 5;
			if (coord < 0) {
				coord = 0;
			}
			console.log(coord);
			hero.style.left = coord + 'px';
			break;
		case 38: // ↑
			coord = parseInt(hero.style.top);
			coord -= 5;
			if (coord < 0) {
				coord = 0;
			}
			hero.style.top = coord + 'px';
			break;
		case 39: // →
			coord = parseInt(hero.style.left);
			coord += 5;
			if (coord > playGround.clientWidth - hero.clientWidth) {
				coord = playGround.clientWidth - hero.clientWidth;
			}
			hero.style.left = coord + 'px';
			break;
		case 40: // ↓
			coord = parseInt(hero.style.top);
			coord += 5;
			if (coord > playGround.clientHeight - hero.clientHeight) {
				coord = playGround.clientHeight - hero.clientHeight;
			}
			hero.style.top = coord + 'px';
			break;
		default:
			return;
	}
}