function animateElement(id, animationName) {
  var elem = document.getElementById(id);
  elem.classList.add('animated', "infinity", animationName);
  elem.addEventListener('animationend', function () {
    elem.classList.remove('animated', "infinity", animationName);
  })
};

function animateOnClick(id, animationName){
  document.getElementById(id).onclick = function (e) {
    animateElement(id,animationName);
  }
};

var animationNames = [
  '',
  "bounce",
  "heartBeat",
  "tada",
  "swing",
  "rubberBand"
];

for (var i = 1; i < animationNames.length; i++) {
  animateOnClick(i + '', animationNames[i]);
}
