
var modal = document.getElementById('modal-help');
var btnn = document.getElementById('btn-help');
var span = document.getElementsByClassName('close')[0];
var helpSound = new Audio("sounds/start.wav");


btnn.onclick = function () {
  modal.style.display = "block";
  helpSound.play();
}

span.onclick = function () {
  modal.style.display = "none";
  helpSound.play();
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    helpSound.play();
  }
}








//refactor window.onclick method
// function whatever(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
// whatever();
