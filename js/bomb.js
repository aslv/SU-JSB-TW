/**
 * Created by atanasWin on 30/7/2014.
 */
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
        killHeroes(bomb.style.left, bomb.style.top);
    }, 4000);
}

function killHeroes(x, y) {
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
