//定义全局变量，保存画布和绘画上下文
var canvas;
var context;
window.onload=function(){
	canvas=document.getElementById("canvas");
	context=canvas.getContext("2d");
	//绘制迷宫背景
	drawMaze("./img/maze.png",268,5);
	//当用户按下键盘上的键时，运行ProcessKey()函数
	window.onkeydown=processKey;
}

var x=0;
var y=0;
function drawMaze(mazeFile,startingX,startingY){
	//加载迷宫图片
	imgMaze=new Image();
	imgMaze.onload=function(){
		//调整画布大小以适应迷宫图片
		canvas.width=imgMaze.width;
		canvas.height=imgMaze.height;

		//绘制迷宫
		var imgFace=document.getElementById("face");
		context.drawImage(imgMaze,0,0);
		//绘制笑脸
		x=startingX;
		y=startingY;
		context.drawImage(imgFace,x,y);
		context.stroke();
		//10毫秒后绘制下一帧
		setTimeout(drawFrame,10);
	};
	imgMaze.src=mazeFile;
}

//让笑脸动起来看，其实没有动，只是记录下方向
//该函数检查用户按下的是否为方向键，然后调整笑脸的速度，38是向上的键，该函数会忽略除方向之外的键
var dx=0;
var dy=0;
function processKey(e){
	//如果笑脸在移动，停止
	dx=0;
	dy=0;
	//按下向上键，向上移动
	if(e.keyCode==38){
		dy=-1;
	}
	//向下
	if(e.keyCode==40){
		dy=1;
	}
	//向左
	if(e.keyCode==37){
		dx=-1;
	}
	//向左
	if(e.keyCode==39){
		dx=1;
	}
}

//检测笑脸是否正在那个放下上移动
function drawFrame(){
	if(dx!=0||dy!=0){
		//画路径，使笑脸走过的路有颜色
		context.beginPath();
		context.fillStyle="rgb(254,244,207)";
		context.rect(x,y,15,15);
		context.fill();
		//增加安位置值
		x+=dx;
		y+=dy;
		//如果遇到障碍物
		if(checkForCollision()){
			x-=dx;
			y-=dy;
			dx=0;
			dy=0;
		}
		var imgFace=document.getElementById("face");
		context.drawImage(imgFace,x,y);
		//检测是否到达底部
		if(y>(canvas.height-17)){
			alert("you win!");
			return;
		}
	}
	//如果没有,10毫秒后自动刁颖drawFrame
	setTimeout(drawFrame,10);
}
//检测碰撞,基于像素颜色的碰撞测试
function checkForCollision(){
	var imgData=context.getImageData(x-1,y-1,15+2,15+2);
	var pixels=imgData.data;
	//检测其中的像素
	for(var i=0;n=pixels.length,i<n;i+=4){
		var red=pixels[i];
		var green=pixels[i+1];
		var blue=pixels[i+2];
		var alpha=pixels[i+3];

		//检测到黑色的墙
		if(red==0&&green==0&&blue==0){
			return true;
		}
		if(red==169&&green==169&&blue==169){
			return true;
		}
	}
	//没有碰到
	return false;
}

