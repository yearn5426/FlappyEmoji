function addLoadevent(func){
    var oldOnload = window.onload;
    if(typeof oldOnload != 'function'){
        window.onload = func;
    } else {
        window.onload = function(){
            oldOnload();
            func();
        };
    }
}
function Pipe(topNum, bottomNum, left){
    if(!document.getElementById) return false;

    var top = document.getElementById(topNum);
    var bottom = document.getElementById(bottomNum);
    top.style.left = bottom.style.left = left;
    var topHeight = parseInt(Math.random(Date.currentTime)*141) + 80;
    top.style.height = topHeight + "px";
    var bottomHeight = 300 - topHeight;
    bottom.style.height = bottomHeight + "px";
    this.top = top;
    this.bottom = bottom;
    return this;
}
function init(){
    if(!document.getElementById) return false;
    
    bird = document.getElementById("bird");
    upSpeed = 16;
    speed = 1;
    bird.style.top= "190px";
    count = 0;
    document.getElementById("count").innerHTML = ("Your Score is "+ count);
    pipe1 = new Pipe("top1", "bottom1", "200px");
    pipe2 = new Pipe("top2", "bottom2", "339px");
    
    fall();
    jump();
    move(pipe1);
    move(pipe2);
}
function jump() {
    document.onkeydown = function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if( e && e.keyCode == 38){
            upSpeed = 16;
            fly();
        }
    }
}
function fly() {
    var ypos = parseInt(bird.style.top);
    if(typeof bird.fall == 'number'){
        clearTimeout(bird.fall);
        bird.fall = 'no';
    }
    if(typeof bird.fly == 'number'){
        clearTimeout(bird.fly);
        bird.fly = 'no';
    }
    if(ypos <= 1 ){
        gameOver();
        return;
    }else if( upSpeed <= 0){
        speed = 1;
        fall();
        return;
    }
    if( ( ypos - upSpeed) > 1){
        ypos -= upSpeed;
        upSpeed = upSpeed - 2;
    } else {
        ypos = 1;
    }
    bird.style.top = ypos + "px";
    bird.fly = setTimeout("fly()",50);
}
function fall() {
    var ypos = parseInt(bird.style.top);
    if( ypos >= 378){
        gameOver();
        return;
    }
    if( ( ypos + speed ) < 378) {
        ypos = ypos + speed;
        if(speed < 16){
            speed = speed + 2;
        }
    }else{
        ypos = 378;
    }
    bird.style.top = ypos + "px";
    bird.fall = setTimeout("fall()",50);
}
function move(pipe) {
    var topHeight = parseInt(pipe.top.style.height);
    var bottomHeight = parseInt(pipe.bottom.style.height);
    var xpos = parseInt(pipe.top.style.left);
    if(xpos <= 110 && xpos >= 50){
        var birdTop = parseInt(bird.style.top);
        if( birdTop < topHeight || birdTop> (380 - bottomHeight)){
            gameOver();
            return ;
        }
    }
    if(xpos == 48){
        count ++;
        document.getElementById("count").innerHTML = ("Your Score is "+ count);
    }
    if( xpos >= -40 ){
        xpos --;
    } else {
        topHeight = parseInt(Math.random(Date.currentTime)*141) + 80;
        pipe.top.style.height = topHeight + "px";
        bottomHeight = 300 - topHeight;
        pipe.bottom.style.height = bottomHeight + "px";
        xpos = 239;
    }
    pipe.top.style.left = pipe.bottom.style.left = xpos + "px";
    pipe.move = setTimeout(function(){move(pipe)},12);
}
function gameOver() {
    clearTimeout(pipe1.move);
    clearTimeout(pipe2.move);
    clearTimeout(bird.fall);
    clearTimeout(bird.fly);
    alert("Game over! Your Score is "+ count);
}
addLoadevent(init);
