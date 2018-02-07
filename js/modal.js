
var modal = document.getElementById('modal-help');
var btnn = document.getElementById('btn-help');
var span = document.getElementsByClassName('close')[0];

btnn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}








//refactor window.onclick method
// function whatever(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
// whatever();
