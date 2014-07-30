		   var hero = document.getElementById('hero');
           hero.style.top = '0px';
           hero.style.left = '0px';
           var playGround = document.getElementById('playground');
           var blocks = document.getElementsByClassName('block');


           var HERO_SPEED = 15;
           var EVIL_SPEED = 15;

           // experimentally
           var evilNakov = document.getElementById('nakov');
           evilNakov.style.top = '0px';
           evilNakov.style.left = '450px';
           if (!('data-ward' in evilNakov)) {
               evilNakov.setAttribute('data-ward', '-2');
           }