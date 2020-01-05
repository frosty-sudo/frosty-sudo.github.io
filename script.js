var button1 = document.getElementById("button1")
var button2 = document.getElementById("button2")
var button3 = document.getElementById("button3")
var button4 = document.getElementById("button4")
var rip = document.getElementById("rip")
var wrapper = document.getElementById("wrapper")
var sure = document.getElementById("sure")

function yes() {
  rip.style.display = "block"
  button3.style.display = "none"
  button4.style.display = "none"
  sure.style.display = "none"
}

function no() {
  button3.style.display = "none"
  button4.style.display = "none"
  button1.style.display = "unset"
  button2.style.display = "unset"
  wrapper.style.textAlign = "center"
  sure.style.display = "none"
}

function launch() {
 sure.style.display = "block"
 button1.style.display = "none"
 button2.style.display = "none";
 button3.style.display = "unset";
 button4.style.display = "unset";
 wrapper.style.textAlign = "center"
}


function test() {
  button1.style.display = "none";
  button2.style.display = "none";
  document.getElementById("testBanner").style.visibility = "visible";
}