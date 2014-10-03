/* -----------------------------------------------
=============== By Wisnu Wardhany ================
============== www.wisnuwardhany.tk ==============
----------------------------------------------- */
function click(e) {
if (document.all) {
if (event.button == 2 || event.button == 3) {
alert(message);
return false;}}
else {
if (e.button == 2 || e.button == 3) {
e.preventDefault();
e.stopPropagation();
alert(message);
return false;}}
}if (document.all) {
document.onmousedown = click;
}else { document.onclick = click;}