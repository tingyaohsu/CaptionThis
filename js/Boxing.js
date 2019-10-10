
var canvas; 
var ctx ;
var rect = {};
var drag = false;
var imageObj = null;
var flag = 0;

$(function() {
console.log("Hello World");
	
    function init() {
        var width = $("#myimg").css("width");
        var height = $("#myimg").css("height");
        var left = $("#myimg").offset().left;
        var top = $("#myimg").offset().top;
        canvas = document.getElementById('myCanvas');
        ctx = canvas.getContext('2d');

        canvas.width = parseInt(width.replace("px", ""));
        canvas.height = parseInt(height.replace("px", ""));
        $("#myCanvas").css("top","-"+height);
	    
        canvas.addEventListener('mousedown', mouseDown, false);
	    canvas.addEventListener('mouseup', mouseUp, false);
	    canvas.addEventListener('mousemove', mouseMove, false);
        canvas.addEventListener('touchstart', touchStart, false);
	    canvas.addEventListener('touchend', touchEnd, false);
	    canvas.addEventListener('touchmove', touchMove, false);
	}
    
    function touchStart(event) { 
        flag = 0;
        var left = $("#myimg").offset().left;
        var top = $("#myimg").offset().top;
        var pageX = event.touches[0].clientX;
        var pageY = event.touches[0].clientY;
        //console.log("fuck");
	    rect.startX = pageX - left;
	    rect.startY = pageY - top;
	    drag = true;
        //console.log(pageX)
        //console.log(pageY)
        console.log("OK")
    }
    function touchEnd(event) {
        var left = $("#myimg").offset().left;
        var top = $("#myimg").offset().top;
        var pageX = event.changedTouches[0].clientX;
        var pageY = event.changedTouches[0].clientY;
        console.log("leave:",pageX,pageY)
	    rect.w = (pageX - left) - rect.startX;
	    rect.h = (pageY - top) - rect.startY;
            //console.log(rect.w,rect.h)
            var relativeX = (pageX - left);
            var relativeY = (pageY - top);
            var temp = $("#myimg")
            var formdata = {"img_size":{"width":temp.css("width"),"height":temp.css("height")}
                    ,"coordinates":{"x":relativeX,"y":relativeY},"img_name":temp.attr("src")
                    ,"rectangles":{"x_left":rect.startX+"px","x_right":pageX-left+"px","y_top":rect.startY+"px","y_bottom":pageY-top+"px"}};
                touch_mask(event);
                $.ajax({
                    type:'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(formdata),
                    dataType: 'json',
                    url: 'http://35.227.183.188:5000/boxpost',
                    success: function (e) {
                        //console.log(e.coordinates)
                        //console.log(e.caption);
						if(e != 0){
                            add_card(e);
                		}else{
                    		alert('file not uploaded');
                		}
                    },
                    error: function(error) {
                        console.log(error);
                    },
	            });
                drag = false; 
    }
    function touchMove(event) {
        var pageX = event.changedTouches[0].clientX;
        var pageY = event.changedTouches[0].clientY;
	    if (drag) {
            flag = 1;
            var left = $("#myimg").offset().left;
            var top = $("#myimg").offset().top;
	        ctx.clearRect(0, 0, 5000, 5000);
	        rect.w = (pageX - left) - rect.startX;
	        rect.h = (pageY - top) - rect.startY;
            ctx.globalAlpha=1;
	        ctx.strokeStyle = 'red';
            ctx.lineWidth = '8';
	        ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
            //console.log(rect.startX,pageX-left,rect.startY,pageY-top)
        }
    }
    function touch_mask(event){
        //var pageX = event.touches[0].clientX;
        //var pageY = event.touches[0].clientY;
        var pageX = event.changedTouches[0].clientX;
        var pageY = event.changedTouches[0].clientY;
	    ctx.clearRect(0, 0, 5000, 5000);
	    console.log("check")
	    //console.log(e.pageX)
	    //console.log(e.pageY)
        ctx.globalAlpha=0.5;
        ctx.fillStyle="white";
	    ctx.fillRect(rect.startX,rect.startY, pageX-rect.startX,pageY-rect.startY);
    }	
	function mouseDown(e) {
        flag = 0;
        var left = $("#myimg").offset().left;
        var top = $("#myimg").offset().top;
        console.log("fuck");
	    rect.startX = e.pageX - left;
	    rect.startY = e.pageY - top;
	    drag = true;
	}

	function add_card(e) {
        console.log(e.filename)
        console.log(e.caption)
        $("#partial").prepend(			
		     sprintf(`<div class="card mb-3" style="max-width:%s;">
                                <div class="row no-gutters">
                                    <div class="col-md-4">
                                        <img src="%s" style="object-fit:scale-down; max-height:206px;" class="card-img" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h1 class="card-text" id="cap_im">%s</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>`,"100%",e.filename,e.caption));
	    ctx.clearRect(0, 0, 5000, 5000);
	}	
	
    function mask(e){
	    ctx.clearRect(0, 0, 2000, 2000);
	    console.log("check")
	    //console.log(e.pageX)
	    //console.log(e.pageY)
        ctx.globalAlpha=0.5;
        ctx.fillStyle="white";
	    ctx.fillRect(rect.startX,rect.startY, e.pageX-rect.startX,e.pageY-rect.startY);
    }
	function mouseUp(e) { 
            var left = $("#myimg").offset().left;
            var top = $("#myimg").offset().top;
	        rect.w = (e.pageX - left) - rect.startX;
	        rect.h = (e.pageY - top) - rect.startY;
            console.log(rect.w,rect.h)
            var relativeX = (e.pageX - left);
            var relativeY = (e.pageY - top);
            var temp = $("#myimg")
            var formdata = {"img_size":{"width":temp.css("width"),"height":temp.css("height")}
                    ,"coordinates":{"x":relativeX,"y":relativeY},"img_name":temp.attr("src")
                    ,"rectangles":{"x_left":rect.startX+"px","x_right":e.pageX-left+"px","y_top":rect.startY+"px","y_bottom":e.pageY-top+"px"}};
                mask(e);
                $.ajax({
                    type:'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(formdata),
                    dataType: 'json',
                    url: 'http://35.227.183.188:5000/boxpost',
                    success: function (e) {
                        console.log(e.coordinates)
                        //console.log(e.caption);
						if(e != 0){
                            add_card(e);
                		}else{
                    		alert('file not uploaded');
                		}
                    },
                    error: function(error) {
                        console.log(error);
                    },
	            });
                drag = false; 
    }
	function mouseMove(e) {
	    if (drag) {
            flag = 1;
            var left = $("#myimg").offset().left;
            var top = $("#myimg").offset().top;
	        ctx.clearRect(0, 0, 2000, 2000);
	        rect.w = (e.pageX - left) - rect.startX;
	        rect.h = (e.pageY - top) - rect.startY;
            ctx.globalAlpha=1;
	        ctx.strokeStyle = 'red';
            ctx.lineWidth = '8';
	        ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
            console.log(rect.startX,e.pageX-left,rect.startY,e.pageY-top)
	    }
    }
	init();
});
