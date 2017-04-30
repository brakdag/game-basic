/**
Objeto Marcador Muestra los FPS, los Frames, y la entrada de teclado
*/
var Marcador = function ()
{
	this.time = new Date();
	this.frame = 0;
	this.fps=0;
	this.x = 10;
	this.y= 25;
	this.lapse=0;
	this.fontsize = 20;
}
Marcador.prototype.draw = function(ctx,key,width,height)
{
	ctx.clearRect(0, 0, width, height);
	ctx.font= this.fontsize + "px Oswald, sans-serif";
	ctx.fillText("Frame : " + this.frame,this.x , this.y);
	ctx.fillText("FPS : "+ this.getFPS(),this.x , this.y +this.fontsize*1);
	ctx.fillText(">"+ key,this.x , this.y +this.fontsize*2);
}

Marcador.prototype.getFPS = function()
{
	var t = new Date();
	var time = t.getTime();
	this.lapse = time - this.time.getTime() ;
	this.time = t;
	this.fps= Math.round(1000/this.lapse*100)/100;	
	this.frame++;
	return this.fps;
}

/**
Clase Game, crea un juego en base a un canvas del document html
*/

var Game = function(){

	this.canvas = document.querySelector("#game"); 
	this.ctx = this.canvas.getContext("2d");
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.key=0;
}

Game.prototype.start = function()
{	
	// inicializa el display de frames y fps.
	this.display = new Marcador();
	// llama al loop
	this.loop();
}

Game.prototype.loop = function()
{
	// muesta el display en la pantalla
	this.display.draw(this.ctx,this.key,this.width,this.height);

	// genera el loop.
	var self = this;
	setTimeout(function(){self.loop();},30);
}

// crea el objeto game
var g = new Game();
//inicializa el teclado
document.addEventListener('keydown', function(event) { g.key = event.keyCode;});
//inicializa el game.
g.start();

