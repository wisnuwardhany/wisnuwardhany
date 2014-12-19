/* -----------------------------------------------
=============== By Wisnu Wardhany ================
============== www.wisnuwardhany.com ==============
----------------------------------------------- */
function init_widget_jne(width,height,title,background,color,token){
	document.getElementById("widget_jne_id").innerHTML='<iframe src="http://www.piresta.com/widget/widget_jne_mv1?iframe=1&title='+encodeURIComponent(title)+'&background='+encodeURIComponent(background)+'&color='+encodeURIComponent(color)+'&h='+window.location.host+'&token='+token+'" width="'+width+'" height="'+height+'" style="border:1px solid #ccc" border="0"></iframe>';
}

