
var canvas; 
var ctx ;
var newRect ;
var rect = {};
var drag = false;
var imageObj = null;
var flag = 0;
var rects = [];
var isRecDown=false;
var timeOver = false;
var unlocked_rect = [];

var move;
var up;
var down;
var out;

function reOffset(){ 

    var left = $("#myimg").offset().left;
    var top = $("#myimg").offset().top;
    $("#myCanvas").css("top", top).css("left", left);

    var BoundingBox=canvas.getBoundingClientRect();
    offsetX=BoundingBox.left;
    offsetY=BoundingBox.top;        

}

window.onscroll=function(e){ reOffset(); }
window.onresize=function(e){ reOffset(); }

$(function() {

    setInterval(reOffset, 0.01);
    // Submit Button
    setTimeout(function() {
        $("#submit_btn").show().click(function(){
            if (rects.length < 3) {
                var check = confirm("Do you still want to submit since you select less than two area?");
                if (check == true) {
                    console.log(rects)
                    location.reload();
                }
            }
            else{
                console.log(rects)
                location.reload();
            }
        }); 
    }, 6000);
    // $('#submit_btn').delay(5000).show(0)
    $("#reset").click(function(){
        var check = confirm("Do you really want to reset ?");
        if (check == true) {
            location.reload();
            timeOver = false;
        }  
    });  

    console.log(timeOver);

    var width = $("#myimg").css("width");
    var height = $("#myimg").css("height");
    var left = $("#myimg").offset().left;
    var top = $("#myimg").offset().top;
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    canvas.width = parseInt(width.replace("px", ""));
    canvas.height = parseInt(height.replace("px", ""));
    // $("#myCanvas").css("top","-"+height);
    $("#myCanvas").css("top", top).css("left", left);
    // $("#myCanvas").attr("width", 775).attr("height", 581);

    var drawRectangleOnCanvas = {

        handleMouseDown:function(e){
          // tell the browser we're handling this event
            e.preventDefault();
            e.stopPropagation();
            
            rect.startX = e.clientX-offsetX;
            rect.startY = e.clientY-offsetY;

            isRecDown=true;

        },

        handleMouseUp:function(e){
          // tell the browser we're handling this event
            e.preventDefault();
            e.stopPropagation();

            rect.w = (e.clientX - left) - rect.startX;
            rect.h = (e.clientY - top) - rect.startY;

            // Put your mouseup stuff here
            isRecDown=false;
            if (rect.w > 50 && rect.h > 50){
                rects.push(newRect);
            }
            drawRectangleOnCanvas.drawAll();
        },

        drawAll:function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = '3';

            // if (timeOver == false){
            for(var i=0;i<rects.length;i++){
                var r=rects[i];
                ctx.strokeStyle = 'red';
                ctx.globalAlpha=1;
                ctx.strokeRect(r.left,r.top,r.right-r.left,r.bottom-r.top);

                ctx.globalAlpha=0.5;
                ctx.fillStyle="white";
                ctx.fillRect(r.left,r.top,r.right-r.left,r.bottom-r.top);
            }
            // }
        },

        handleMouseOut:function(e){
          // tell the browser we're handling this event
            e.preventDefault();
            e.stopPropagation();

            rect.overX = e.clientX - offsetX;
            rect.overY = e.clientY - offsetY;

            // Put your mouseOut stuff here
            isRecDown=false;
        },

        handleMouseMove:function(e){
            
            if(!isRecDown){return;}
            // tell the browser we're handling this event
            e.preventDefault();
            e.stopPropagation();

            rect.overX = e.clientX - offsetX;
            rect.overY = e.clientY - offsetY;

            newRect={

                left:Math.min(rect.startX,rect.overX),
                right:Math.max(rect.startX,rect.overX),
                top:Math.min(rect.startY,rect.overY),
                bottom:Math.max(rect.startY,rect.overY),
                color:"red"

            }

            drawRectangleOnCanvas.drawAll();
            ctx.globalAlpha=1;
            ctx.strokeStyle = 'red';
            ctx.lineWidth = '3';
            ctx.strokeRect(rect.startX,rect.startY,rect.overX-rect.startX,rect.overY-rect.startY);
        }
    }

    move = drawRectangleOnCanvas.handleMouseMove;
    down = drawRectangleOnCanvas.handleMouseDown;
    up = drawRectangleOnCanvas.handleMouseUp;
    out = drawRectangleOnCanvas.handleMouseOut;

    function init() {

        if (timeOver == false) {

        	console.log(rects);
            console.log("please draw");
            
            $("#undo").click(function(){
                if (timeOver == false) {
                    rects.pop();
                    drawRectangleOnCanvas.drawAll();
                    console.log(rects);
                    console.log("Dead");
                }  
            });
         
            canvas.addEventListener("mousemove", move);
            canvas.addEventListener("mousedown", down);
            canvas.addEventListener("mouseup", up);
            canvas.addEventListener("mouseout", out);
        }

	}

    init();
    
});

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            // timer = duration;
            display.textContent = "Times up ! Please Submit !";
            if (timeOver == false) {
                timeOverfun();
            }
            timeOver = true;
            $("#undo").hide();
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 1,
        display = document.getElementById('time');
    startTimer(fiveMinutes, display);
};

function timeOverfun(){

    ctx.globalAlpha=0.5;
    ctx.fillStyle="yellow";
    ctx.fillRect(0,0,2000,2000);

    canvas.removeEventListener("mousemove", move);
    canvas.removeEventListener("mousedown", down);
    canvas.removeEventListener("mouseup", up);
    canvas.removeEventListener("mouseout", out);

    console.log("remove all")

}
