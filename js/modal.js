var modal = document.getElementById('modal-help');
var btnn = document.getElementById('btn-help');
var span = document.getElementsByClassName('close')[0];
// ====================== //
var modalDie = document.getElementById('modal-die');
var span2 = document.getElementsByClassName('close2')[0];
var helpOpen = new Audio("sounds/BOTW_Secret.wav");
var helpClose = new Audio("sounds/WW_PauseMenu_Close.wav");
var naviListen = new Audio("sounds/OOT_Navi_Listen1.wav");
var naviWatchOut = new Audio("sounds/OOT_Navi_WatchOut1.wav");


// modalDie.style.display = "none";

// this ish works
btnn.onclick = function () {
  modal.style.display = "block";
  helpOpen.play();
  console.log("clicked");
}

span.onclick = function () {
  modal.style.display = "none";
  helpClose.play();
  naviListen.play();
  console.log("clicked");
}

// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//     console.log('does it work???')
//     helpSound.play();
//   }
// }

// GAME OVER MODAL

span2.onclick = function () {
  modalDie.style.display = "none";
  helpClose.play();
  naviWatchOut.play();
  console.log("clicked");
}

// window.onclick = function (event) {
//   if (event.target == modalDie) {
//     modalDie.style.display = "none";
//     helpSound.play();
//   }
// }


window.onclick = function(event){
  if (event.target == modal){
    modal.style.display = "none";
    helpClose.play();
    naviListen.play();
  }
  if (event.target == modalDie){
    modalDie.style.display = "none";
    helpClose.play();
    naviWatchOut.play();
  }

}
