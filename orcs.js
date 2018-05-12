console.log("morjesta!");
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
var game = {
  points: 0,
};
var orcs = [];

var bullets = [];

var timerSource;

function Orc(x, y) {
  this.x = x;
  this.y = y;
  this.width = 85;
  this.height = 82;
  this.speed = 0.5;
  this.alive = true;

}
Orc.prototype.render = function() {
  var img = document.getElementById("enemy");
  ctx.drawImage(img, this.x, this.y);
/*  ctx.fillStyle = "lightgreen";
  ctx.fillRect(this.x, this.y, this.width, this.height);*/
}
Orc.prototype.update = function() {
  this.y = this.y + this.speed;
}

var player = {
  x: 100,
  y: canvas.height - 21,
  width: 20,
  height: 20,
  speed: 3,
  counter: 21,
  loadingTime: 20,
  render: function() {
    var img = document.getElementById("player");
    ctx.drawImage(img, this.x, this.y - 10);
  }
}

function Bullet(x, y) {
  this.x = player.x;
  this.y = player.y;
  this.width = 2;
  this.height = 15;
  this.speed = 3;
  this.alive = true;
}

Bullet.prototype.render = function() {
  var img = document.getElementById("projectile");
  ctx.drawImage(img, this.x, this.y - 50);

}
Bullet.prototype.update = function() {
  this.y = this.y - this.speed;
}
Bullet.prototype.hitsAnyOrc = function() {
  orcs.forEach((orc) => {
    var hitX = this.x > orc.x && this.x < orc.x + orc.width;
    var hitY = this.y < orc.y + orc.height && this.y > orc.y;
    if(hitX && hitY){
      console.log("ouch")
      orc.alive = false;
      this.alive = false;
    }
  });
}

/*
document.onkeydown = function() {
  document.getElementById('alarm').play();
}*/
var input = {
  left: false,
  right: false,
  up: false
}

window.addEventListener("keydown", function(event) {
  if(event.key === "ArrowLeft") {
    input.left = true;
  }
  if(event.key === "ArrowRight") {
    input.right = true;
  }
  if(event.key === "ArrowUp") {
    input.up = true;
    document.getElementById('alarm').play();
    console.log("arrowup is true")
  }

})
window.addEventListener("keyup", function(event) {
  if(event.key === "ArrowLeft") {
    input.left = false;
  }
  if(event.key === "ArrowRight") {
    input.right = false;
  }
  if(event.key === "ArrowUp") {
    input.up = false;
    console.log("arrowup is false")
  }
})

function loop() {
  update();
  render();
  setTimeout(loop, 10);

}

function update() {
  if(input.left === true) {
    player.x = player.x - player.speed;
  }
  if(input.right === true) {
    player.x = player.x + player.speed;
  }

  if(input.up === true) {
    player.counter++;
console.log(player.counter);
    if(player.counter > player.loadingTime){
      var bullet = new Bullet();
      bullets.push(bullet);
      player.counter = 0;

    }
  }

  if(player.x < 0) {
    player.x = 0;
  }
  if(player.x > canvas.width - player.width) {
    player.x = canvas.width - player.width;
  }
  for (var i = 0; i < orcs.length; i++) {
    var orc = orcs[i];
    orc.update();
  }

  for (var i = 0; i < bullets.length; i++) {
      var bullet = bullets[i];
      bullet.update();
      bullet.hitsAnyOrc();
  }
  bullets = bullets.filter(function(bullet){
    return bullet.alive;
  })
  orcs = orcs.filter(function(orc){
    return orc.alive;
  })

}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.render();
  for (var i = 0; i < orcs.length; i++) {
    var orc = orcs[i];
    orc.render();
    }
  for (var i = 0; i < bullets.length; i++) {
    var bullet = bullets[i];
    bullet.render();
  }
}


for (var i = 0; i < 3; i++) {
  var x = Math.random()*canvas.width
  var y = 0
  var orc = new Orc(x, y);
  orcs.push(orc);

}

loop();

setInterval(function(){
  var x = Math.random()*canvas.width
  var y = 0
  var orc = new Orc(x, y);
  orcs.push(orc);
}, 1000)
