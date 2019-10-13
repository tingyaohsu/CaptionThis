var canvas = document.getElementById('canvasarea'),
        context = canvas.getContext('2d');
         base_image = new Image();
        base_image.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg'; //Load Image ;
base_image.onload = function(){
    context.drawImage(base_image,0,0);
}
var strokeWidth = 4;
drawCount = 1;

            canvas.addEventListener("mousemove", function (e) {
                    drawRectangleOnCanvas.handleMouseMove(e);
            }, false);
            canvas.addEventListener("mousedown", function (e) {
                    drawRectangleOnCanvas.handleMouseDown(e);
            }, false);
            canvas.addEventListener("mouseup", function (e) {
                    drawRectangleOnCanvas.handleMouseUp(e);
            }, false);
            canvas.addEventListener("mouseout", function (e) {
                 drawRectangleOnCanvas.handleMouseOut(e);
            }, false);

function reOffset(){
              var BB=canvas.getBoundingClientRect();
              recOffsetX=BB.left;
              recOffsetY=BB.top;        
            }
            var recOffsetX,recOffsetY;
            reOffset();
            window.onscroll=function(e){ reOffset(); }
            window.onresize=function(e){ reOffset(); }

            var isRecDown=false;
            var startX,startY;

            var rects=[];
            var newRect;
var drawRectangleOnCanvas={
                handleMouseDown:function(e){
                  // tell the browser we're handling this event
                  e.preventDefault();
                  e.stopPropagation();

                  startX=parseInt(e.clientX-recOffsetX);
                  startY=parseInt(e.clientY-recOffsetY);

                  // Put your mousedown stuff here
                  isRecDown=true;
                },

                handleMouseUp:function(e){
                  // tell the browser we're handling this event
                  e.preventDefault();
                  e.stopPropagation();

                  mouseX=parseInt(e.clientX-recOffsetX);
                  mouseY=parseInt(e.clientY-recOffsetY);

                  // Put your mouseup stuff here
                  isRecDown=false;

                  //if(!willOverlap(newRect)){
                    rects.push(newRect);
                  //}
                  drawRectangleOnCanvas.drawAll();
                },

                drawAll:function(){
                  context.clearRect(0, 0, canvas.width, canvas.height);
                  context.lineWidth=strokeWidth;
                  //context.strokeStyle=$('div.dropdown-menu').find('.selected').attr('data-color');
                  for(var i=0;i<rects.length;i++){
                    var r=rects[i];
                    context.strokeStyle = r.color;
                    context.globalAlpha=1;
                    context.strokeRect(r.left,r.top,r.right-r.left,r.bottom-r.top);

                    context.beginPath();
                    context.arc(r.left, r.top, 15, 0, Math.PI*2, true); 
                    context.closePath();
                    context.fillStyle = r.color;
                    context.fill();

                    var text = drawCount;
                    context.fillStyle = "#fff";
                    var font = "bold " + 2 +"px serif";
                    context.font = font;
                    var width = context.measureText(text).width;
                    var height = context.measureText("w").width; // this is a GUESS of height
                    context.fillText(text, r.left - (width/2) ,r.top + (height/2));

                  }
                },

                handleMouseOut:function(e){
                  // tell the browser we're handling this event
                  e.preventDefault();
                  e.stopPropagation();

                  mouseX=parseInt(e.clientX-recOffsetX);
                  mouseY=parseInt(e.clientY-recOffsetY);

                  // Put your mouseOut stuff here
                  isRecDown=false;
                },

                handleMouseMove:function(e){
                  if(!isRecDown){return;}
                  // tell the browser we're handling this event
                  e.preventDefault();
                  e.stopPropagation();

                  mouseX=parseInt(e.clientX-recOffsetX);
                  mouseY=parseInt(e.clientY-recOffsetY);
                  newRect={
                    left:Math.min(startX,mouseX),
                    right:Math.max(startX,mouseX),
                    top:Math.min(startY,mouseY),
                    bottom:Math.max(startY,mouseY),
                    color:"#000000"
                  }
                  drawRectangleOnCanvas.drawAll();
                  context.strokeStyle = "#000000";
                  context.lineWidth = strokeWidth;
                  context.globalAlpha=1;
                  context.strokeRect(startX,startY,mouseX-startX,mouseY-startY);
                }
            }