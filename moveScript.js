function movemouse() {
    var button = document.getElementById("button");
    var val = Math.random()*84+8;
    button.style.left = val + "%"
    var val = Math.random()*30;
    button.style.top = val+ "%"
}