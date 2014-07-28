(function() {
	var blocks = document.getElementsByClassName('block');
	var block;
	for ( var i = 0; i < 5; i++) {
		for(var j = 0; j < 5; j++) {
			block = document.getElementById(i + '' + j);
			block.style.top = (45 + i * 90) + 'px';
			block.style.left = (45 + j * 90) + 'px';
		}
	}
})();