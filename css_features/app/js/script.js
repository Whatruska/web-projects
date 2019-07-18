function animateElement(elem, animationName) {
  elem.classList.add('animated', "infinity", animationName);
  elem.addEventListener('animationend', function () {
    elem.classList.remove('animated', "infinity", animationName);
  })
};

function animateOnClick(elem, animationName){
    elem.onclick = function (e) {
    animateElement(elem,animationName);
  }
};

var animationNames = [
  "bounce",
  "tada",
  "rubberBand"
];

var cards = document.getElementsByClassName('cv-card');
for (var i = 0; i < cards.length; i++) {
  animateOnClick(cards[i],animationNames[i]);
}

document.getElementById('footer').onclick = function () {
  this.style.opacity = 0;
}
