/**
 * Created by atanasWin on 30/7/2014.
 */
function locateEvil(x, y, imgSrc, id, ward) {
    // CREATE evil hero:
    var evil = document.createElement('div');
    evil.setAttribute('id',id);
    // set ward to the evil:
    evil.setAttribute('data-ward', ward.toString());
    // style the evil:
    evil.className = 'evil';
    // set img in evil div:
    evil.style.backgroundImage = 'url("' + imgSrc + '")';
    console.log(imgSrc);
    console.log(evil.style.backgroundImage);
    // give location - x and y
    evil.style.left = x + 'px';
    evil.style.top = y + 'px';

    // append evil to the #playground
    document.getElementById('playground').appendChild(evil);
    if (id = 'nakov') {
        var naokov = document.getElementById('nakov');
        nakov.style.backgroundColor = 'dodgerblue';
        nakov.style.boxShadow = '0 0 15px 5px skyblue';
    }
}