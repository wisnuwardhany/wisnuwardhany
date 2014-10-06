document.write('<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></scr'+'ipt>');
document.write('<link href="http://kontactr.com/kpu/facebox.css" media="screen" rel="stylesheet" type="text/css"/>');
document.write('<script src="http://kontactr.com/kpu/facebox.js" type="text/javascript"></scr'+'ipt>');
document.write('<script type="text/javascript">');
document.write('jQuery(document).ready(function($) {');
document.write("  $('a[rel*=facebox]').facebox() ");
document.write('})');
document.write('</scr'+'ipt>');
document.write('<div id="kontactr-form" style="display:none;">');
document.write('<iframe src="http://kontactr.com/xuser/'+id+'" width="400px" height="600px" frameborder="0"></iframe>');
document.write('</div>');
if(t == 1)
	document.write('<a href="#kontactr-form" rel="facebox">'+ctxt+'</a>');
else if(t == 2)
	document.write('<a href="#kontactr-form" rel="facebox"><img src="http://3.bp.blogspot.com/-j8vyDh441i8/VCj1_j1UanI/AAAAAAAABE4/HCr-As39OZs/s1600/klik-disini11.gif" alt="Order Now" /></a>');
else if(t == 3)
	document.write('<a href="#kontactr-form" rel="facebox"><img src="http://kontactr.com/pics/big.gif" alt="Contact me" /></a>');
else
	document.write('<a href="#kontactr-form" rel="facebox">Contact Me</a>');
