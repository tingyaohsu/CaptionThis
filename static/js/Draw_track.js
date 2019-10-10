
var canvas; 
var ctx ;
var rect = {};
var drag = false;
var imageObj = null;
var flag = 0;
var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;
var dot_flag = false;
var min_X, min_Y, max_X, max_Y = 0;


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
        var left = $("#myimg").offset().left;
        var top = $("#myimg").offset().top;
        var pageX = event.touches[0].clientX;
        var pageY = event.touches[0].clientY;
        prevX = currX;
        prevY = currY;
        currX = pageX - left;
        currY = pageY - top;
        
        min_X = currX;
        max_X = currX;
        min_Y = currY;
        max_Y = currY;
        
        drag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
	}

    function touchEnd(event) { 
            var left = $("#myimg").offset().left;
            var top = $("#myimg").offset().top;
            var pageX = event.changedTouches[0].clientX;
            var pageY = event.changedTouches[0].clientY;
            console.log("leave:",pageX,pageY)
	        rect.w = (pageX - left) - rect.startX;
	        rect.h = (pageY - top) - rect.startY;
            var relativeX = (pageX - left);
            var relativeY = (pageY - top);
            if(min_X<0){
                min_X=0;
            }
            if(min_Y<0){
                min_Y=0;
            }
            var temp = $("#myimg")
            var formdata = {"img_size":{"width":temp.css("width"),"height":temp.css("height")}
                    ,"coordinates":{"x":relativeX,"y":relativeY},"img_name":temp.attr("src")
                    ,"rectangles":{"x_left":min_X+"px","x_right":max_X+"px","y_top":min_Y+"px","y_bottom":max_Y+"px"}};
                touch_mask(event);
                $.ajax({
                    type:'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(formdata),
                    dataType: 'json',
                    url: 'http://35.227.183.188:5000/drawpost',
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
	function touchMove(event) {
        var pageX = event.changedTouches[0].clientX;
        var pageY = event.changedTouches[0].clientY;
        if (drag) {
            var left = $("#myimg").offset().left;
            var top = $("#myimg").offset().top;
            prevX = currX;
            prevY = currY;
            currX = pageX - left;
            currY = pageY - top;
            if(currX<min_X){
                min_X = currX
            }
            if(currX>max_X){
                max_X = currX
            }
            if(currY<min_Y){
                min_Y = currY
            }
            if(currY>max_Y){
                max_Y = currY
            }
            draw();
        }	
    }
    function touch_mask(event){
        var pageX = event.changedTouches[0].clientX;
        var pageY = event.changedTouches[0].clientY;
	    ctx.clearRect(0, 0, 5000, 5000);
	    console.log("check")
        ctx.globalAlpha=0.5;
        ctx.fillStyle="white";
	    ctx.fillRect(min_X,min_Y,max_X-min_X,max_Y-min_Y);
    }	
	function mouseDown(e) {
        var left = $("#myimg").offset().left;
        var top = $("#myimg").offset().top;
        prevX = currX;
        prevY = currY;
        currX = e.pageX - left;
        currY = e.pageY - top;
        
        min_X = currX;
        max_X = currX;
        min_Y = currY;
        max_Y = currY;
        
        drag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
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
	    console.log(e.pageX)
	    console.log(e.pageY)
        ctx.globalAlpha=0.5;
        ctx.fillStyle="white";
	    ctx.fillRect(min_X,min_Y,max_X-min_X,max_Y-min_Y);
    }
	function mouseUp(e) { 
            var left = $("#myimg").offset().left;
            var top = $("#myimg").offset().top;
	        rect.w = (e.pageX - left) - rect.startX;
	        rect.h = (e.pageY - top) - rect.startY;
            console.log("range",min_X,max_X,min_Y,max_Y)
            var relativeX = (e.pageX - left);
            var relativeY = (e.pageY - top);
            if(min_X<0){
                min_X=0;
            }
            if(min_Y<0){
                min_Y=0;
            }
            var temp = $("#myimg")
            var formdata = {"img_size":{"width":temp.css("width"),"height":temp.css("height")}
                    ,"coordinates":{"x":relativeX,"y":relativeY},"img_name":temp.attr("src")
                    ,"rectangles":{"x_left":min_X+"px","x_right":max_X+"px","y_top":min_Y+"px","y_bottom":max_Y+"px"}};
                mask(e);
                $.ajax({
                    type:'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(formdata),
                    dataType: 'json',
                    url: 'http://35.227.183.188:5000/drawpost',
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
            var left = $("#myimg").offset().left;
            var top = $("#myimg").offset().top;
            prevX = currX;
            prevY = currY;
            currX = e.pageX - left;
            currY = e.pageY - top;
            if(currX<min_X){
                min_X = currX
            }
            if(currX>max_X){
                max_X = currX
            }
            if(currY<min_Y){
                min_Y = currY
            }
            if(currY>max_Y){
                max_Y = currY
            }
            draw();
        }	
    }

    function draw() {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.globalAlpha=1;
            ctx.strokeStyle = 'red';
            ctx.lineWidth = '8';
            ctx.stroke();
            ctx.closePath();
    }
	init();
});
