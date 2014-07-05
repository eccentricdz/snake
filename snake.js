// JavaScript Document

$(document).ready(function(){
var cw = window.innerWidth,
ch = window.innerHeight;
var coin = document.getElementById('coin');
var fail = document.getElementById('fail');
var myCanvas = document.getElementById('mycanvas'),
ctx = myCanvas.getContext('2d');
myCanvas.width = cw;
myCanvas.height = ch;
var snake = {
	size : 5,
	blockside : 25,
	dir : 'right'
}; 
var score = 0;
var food = null;

var animloop = null;
$(document).keydown(function(e)
{
	if(e.which == 37&&snake.dir!='right')
	snake.dir = 'left';
	if(e.which == 38&&snake.dir!= 'down')
	snake.dir = 'up';
	if(e.which == 39&&snake.dir!= 'left')
	snake.dir = 'right';
	if(e.which == 40&&snake.dir!= 'up')
	snake.dir = 'down';
	
}
);

var snakeBody = [];
init();

function Block(x,y)
{
	this.x = x;
	this.y = y;
}
function init()
{
	score = 0;
	snakeBody = [];
	snake = {
	size : 5,
	blockside : 25,
	dir : 'right'
};
	for(var i =snake.size;i>0;i--)
	{
		var newBlock = new Block((i*snake.blockside),snake.blockside);
		snakeBody.push(newBlock);
	}
	
	createFood();
	animloop = setInterval(animate, 50);
}

function createFood()
{
	var rx = Math.round(Math.random()*((cw)/snake.blockside));
	var ry = Math.round(Math.random()*((ch)/snake.blockside));
	food = {
		x : rx*snake.blockside,
		y : ry*snake.blockside
	};
	
	
}

function draw()
{
	
	ctx.fillStyle = '#ae4232';
	ctx.strokeStyle = '#211F1F';
	ctx.lineWidth = 2;
	for(var i =0;i<snakeBody.length;i++)
	{
		var block = snakeBody[i];
		ctx.fillRect(block.x,block.y,snake.blockside,snake.blockside);
		ctx.strokeRect(block.x,block.y,snake.blockside,snake.blockside);
		
	}
	
	ctx.fillRect(food.x, food.y, snake.blockside,snake.blockside);
		ctx.strokeRect(food.x, food.y, snake.blockside,snake.blockside);
}

function collides(x,y,block)
{
	return((x==block.x)&&(y==block.y));
}


function selfCollide(x,y)
{
	for(var i = 1;i<snakeBody.length;i++)
	{
		if(collides(x,y,snakeBody[i]))
		return true;
	}
	return false;
	
}
function animate()
{
	
	var nx, ny;
	var head = snakeBody[0];
	nx = head.x;
	ny = head.y;
	if(snake.dir == 'right')
	nx+= snake.blockside;
	if(snake.dir == 'left')
	nx-= snake.blockside;
	if(snake.dir == 'up')
	ny-= snake.blockside;
	if(snake.dir == 'down')
	ny+= snake.blockside;
	
if((nx>(cw-snake.blockside))||nx<0||ny<0||ny>(ch-snake.blockside)||selfCollide(nx,ny))
restart();
else
{
var tail = new Block(0,0);

if(collides(nx,ny,food))
{
	snake.size++;
	audioPlay(coin);
	score++;
	$('#score').html('Score : '+score);
	createFood();
}
else
{
tail = snakeBody.pop();
}
tail.x = nx;
tail.y = ny;
snakeBody.unshift(tail);
ctx.clearRect(0,0,cw,ch);
			draw();
}
}


function restart()
{
	clearInterval(animloop);
	audioPlay(fail);
	setTimeout(
	init, 2000);
}

function audioPlay(audio)
{
	audio.pause();
	audio.currentTime = 0;
	audio.play();
}



});