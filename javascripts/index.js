/**
 * 
 */
//鼠标滚轮事件开始
if (window.addEventListener){
	window.addEventListener('DOMMouseScroll', wheel, false);
}
document.onmousewheel = wheel;

function handle(delta) {
	var radio_set=document.getElementsByName("radio-set");
	for(var i=0;i<radio_set.length;i++){
		if(radio_set[i].checked==true){
			id=radio_set[i].id.split("-");//id[2]用来区分到底哪个radio被点击
			if (delta <0){
				if((id[2]-0+1)<6){
					idStr="st-control-"+(id[2]-0+1);
					document.getElementById(idStr).checked=true;
				}
			}else{
				if((id[2]-1)>0){
					idStr="st-control-"+(id[2]-1);
					document.getElementById(idStr).checked=true;
				}
			}
			return;
		}
	}
}
 
function wheel(event){
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta/120; 
        if (window.opera) 
		delta = -delta;
    } else if (event.detail) {
        delta = -event.detail/3;
    }
    if (delta)
        handle(delta);
}
//鼠标滚轮事件结束