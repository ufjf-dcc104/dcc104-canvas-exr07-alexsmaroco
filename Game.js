var canvas;
var ctx;
var pc;
var dt;
var images;
var anterior = 0;
var frame = 0;
var levels = [];
var levelAtual = 1;
var cont = 2;

function init(){
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 520;
  canvas.height = 480;
  ctx = canvas.getContext("2d");
  images = new ImageLoader();
  images.load("pc","pc.png");
  var map1 = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map1.images = images;
  map1.setCells([
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,3,3,1,0,1],
    [1,1,1,0,1,0,1,0,0,0,1,2,1],
    [1,0,0,0,1,0,1,0,1,1,1,1,1],
    [1,0,1,1,1,0,1,0,1,0,0,2,1],
    [1,0,1,2,0,0,1,0,0,0,1,0,1],
    [1,0,0,3,3,1,0,0,1,1,1,0,1],
    [1,0,1,1,1,0,0,1,1,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,0,1,4,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]);
  
  var map2 = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map2.images = images;
  map2.setCells([
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,3,3,1,0,1],
    [1,1,0,0,0,0,1,0,0,0,0,2,1],
    [1,0,0,0,0,1,0,0,1,1,0,1,1],
    [1,0,1,1,0,0,1,0,1,0,3,2,1],
    [1,0,1,1,1,0,1,0,0,0,1,0,1],
    [1,0,1,1,1,0,0,0,1,0,1,0,1],
    [1,1,4,1,1,1,0,1,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]);
  
  levels.push(map1);
  levels.push(map2);
  pc = new Sprite();
  pc.x = 60;
  pc.y = 60;
  pc.comida = 100;
  pc.images = images;
  initControls();
  requestAnimationFrame(passo);
}

function desenhaInfo() {
	if(pc.comida < 0) {
		this.ctx.font = "50px Arial";
		this.ctx.fillStyle = "red";
		this.ctx.fillText("Voce perdeu!", 50, canvas.height/2);
	}
  this.ctx.font = "15px Arial";
  this.ctx.fillStyle = "orange";
  this.ctx.fillText("Comida: ", 17, 17);
  this.ctx.fillRect(80, 0,pc.comida+1,20);
}

function passo(t){
  dt = (t-anterior)/1000;
  requestAnimationFrame(passo);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate((canvas.width/2)-2*pc.x,(canvas.height/2)-2*pc.y);
  ctx.scale(2,2);
  
  
  if(pc.comida > 0) {
	pc.mover(levels[levelAtual-1], dt);
  }
  
  
  
  levels[levelAtual-1].desenhar(ctx);
  pc.desenhar(ctx);
  
  if(pc.gy != -1 && pc.gx != -1 && levels[levelAtual-1].cells[pc.gy][pc.gx] == 4) {
	levelCompleto(dt);
  }
  ctx.restore();
  desenhaInfo();
  anterior = t;
}

function levelCompleto(dt) {
	cont-=dt;
	if(cont < 0) {
		this.levelAtual+=1;
		pc.x = 60;
		pc.y = 60;
		cont = 2;
	} else {
		this.ctx.font = "20px Arial";
		this.ctx.fillStyle = "red";
		this.ctx.fillText("Level completo!", this.pc.x-50, this.pc.y);
	}
}

function initControls(){
  addEventListener('keydown', function(e){
    switch (e.keyCode) {
      case 37:
        pc.vx = -100;
		pc.vy = 0;
        pc.pose = 2;
        e.preventDefault();
        break;
      case 38:
        pc.vy = -100;
		pc.vx = 0;
        pc.pose = 3;
        e.preventDefault();
        break;
      case 39:
        pc.vx = 100;
		pc.vy = 0;
        pc.pose = 0;
        e.preventDefault();
        break;
      case 40:
        pc.vy = 100;
		pc.vx = 0;
        pc.pose = 1;
        e.preventDefault();
        break;
      default:

    }
  });
  addEventListener('keyup', function(e){
    switch (e.keyCode) {
      case 37:
		pc.vx = 0;
		break;
      case 39:
        pc.vx = 0;
        //pc.pose = 4;
        break;
      case 38:
		pc.vy = 0;
		break;
      case 40:
        pc.vy = 0;
        break;
      default:

    }
  });
}
