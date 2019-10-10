
var canvas; 
var ctx ;
var rect = {};
var drag = false;
var imageObj = null;
var flag = 0;

$(function() {
console.log("Hello World");
    $("#myimg").click(function(e) {
        //console.log(offset)
        var offset = $("#myimg").offset();
        console.log($("#myimg"));
        var relativeX = (e.pageX - offset.left);
        var relativeY = (e.pageY - offset.top);
        var temp = $("#myimg")
        var formdata = {"img_size":{"width":temp.css("width"),"height":temp.css("height")}
                ,"coordinates":{"x":relativeX,"y":relativeY},"img_name":temp.attr("src")};
        $.ajax({
                type:'POST',
                contentType: 'application/json',
                data: JSON.stringify(formdata),
                dataType: 'json',
                url: 'http://35.227.183.188:5000/clickpost',
                success: function (e) {
                    add_caption(e);
                    //var temp1 = $("#cap");
                    //temp1.text(e.caption);
                    //console.log(e);
                },
                error: function(error) {
                    console.log(error);
                },
        }); 
    });
    
    function add_caption(e){
        $("#new_cap").append(			
		     sprintf(`<h1 id="cap"> %s </h1>`,e.caption));
	}	

	function clickEffect(e){
        console.log("fuck")
		var d=document.createElement("div");
		d.className="clickEffect";
		d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
		document.body.appendChild(d);
		d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
    }
	//document.addEventListener('click',clickEffect);
	$("#myimg").click(clickEffect);
    
	/*
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
        //ctx.strokeStyle = "red";
        //ctx.strokeRect(50, 100, 200, 300);
	    
        canvas.addEventListener('mousedown', mouseDown, false);
	    canvas.addEventListener('mouseup', mouseUp, false);
	    canvas.addEventListener('mousemove', mouseMove, false);
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
        $("#card_container").append(			
		sprintf(`<div class="card mb-3" style="max-width: 540px;">
                                <div class="row no-gutters">
                                    <div class="col-md-4">
                                        <img src="%s" class="card-img" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <!--h5 class="card-title">Card title</h5-->
                                            <p class="card-text">"%s"</p>
                                            <!--p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p-->
                                        </div>
                                    </div>
                                </div>
                            </div>`,e.filename,e.caption));	
	}	
	
	function mouseUp(e) { 
            var left = $("#myimg").offset().left;
            var top = $("#myimg").offset().top;
	        //ctx.clearRect(0, 0, 2000, 2000);
	        rect.w = (e.pageX - left) - rect.startX;
	        rect.h = (e.pageY - top) - rect.startY;
	        //ctx.strokeStyle = 'red';
	        //ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
            //console.log(rect.startX,e.pageX-left,rect.startY,e.pageY-top)
            console.log(rect.w,rect.h)
            if (rect.w > 100 && rect.h > 100){
                var relativeX = (e.pageX - left);
                var relativeY = (e.pageY - top);
                var temp = $("#myimg")
                var formdata = {"img_size":{"width":temp.css("width"),"height":temp.css("height")}
                    ,"coordinates":{"x":relativeX,"y":relativeY},"img_name":temp.attr("src")
                    ,"rectangles":{"x_left":rect.startX+"px","x_right":e.pageX-left+"px","y_top":rect.startY+"px","y_bottom":e.pageY-top+"px"}};
                $.ajax({
                    type:'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(formdata),
                    dataType: 'json',
                    url: 'http://35.227.183.188:5000/getpost',
                    success: function (e) {	
                        console.log(e.caption);
						if(e != 0){
                    		//$("#card_img").attr("src",e.filename); 
                    		//$("#card_cap").text(e.caption);
                            add_card(e);
                    		//$(".preview img").show(); // Display image element
                		}else{
                    		alert('file not uploaded');
                		}
                        //var temp1 = $("#card_img");
                        //temp1.text(e.filename);
                    },
                    error: function(error) {
                        console.log(error);
                    },
	            });
            }
            else{
                if(flag==1){
                    alert("Please Drag a large area!"); 
                }
            }
                drag = false; }
	
	function mouseMove(e) {
	    if (drag) {
            flag = 1;
            var left = $("#myimg").offset().left;
            var top = $("#myimg").offset().top;
	        ctx.clearRect(0, 0, 2000, 2000);
	        rect.w = (e.pageX - left) - rect.startX;
	        rect.h = (e.pageY - top) - rect.startY;
	        ctx.strokeStyle = 'red';
	        ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
            console.log(rect.startX,e.pageX-left,rect.startY,e.pageY-top)
	    }
    }
	init();*/
});
