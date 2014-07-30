/**
 * Created by atanasWin on 30/7/2014.
 */
function locateEvil(x, y, imgSrc, id) {
    // CREATE evil hero:
    var evil = document.createElement('div');
    evil.setAttribute('id',id);

     evil.setAttribute('data-ward', '-2');
    // style the evil:
    evil.className = 'evil';
    // set img in evil div:
    evil.innerHTML = '<img src="' + imgSrc + '" alt="evil hero img"></img>';
    // give location - x and y
    evil.style.left = x + 'px';
    evil.style.top = y + 'px';
    // append evil to the #playground
    document.getElementById('playground').appendChild(evil);

}