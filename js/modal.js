var modalDie = document.getElementById('modal-die');
var modal = document.getElementById('modal-help');
var btnn = document.getElementById('btn-help');
var span = document.getElementsByClassName('close')[0];
var span2 = document.getElementsByClassName('close2')[0];
var helpSound = new Audio("sounds/start.wav");

// modalDie.style.display = "none";

// this ish works
btnn.onclick = function () {
  modal.style.display = "block";
  helpSound.play();
  console.log("clicked");
}

span.onclick = function () {
  modal.style.display = "none";
  helpSound.play();
  console.log("clicked");
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    helpSound.play();
  }
}

// GAME OVER MODAL

span2.onclick = function () {
  modalDie.style.display = "none";
  helpSound.play();
  console.log("clicked");
}

window.onclick = function (event) {
  if (event.target == modalDie) {
    modalDie.style.display = "none";
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
