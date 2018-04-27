console.log("morjesta!");
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
var game = {
  points: 0,
};
var orcs = [];
var bullets = [];
function Orc(x, y) {
  this.x = x;
  this.y = y;
  this.width = 40;
  this.height = 40;
  this.speed = 0.5;

}
Orc.prototype.render = function() {
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(this.x, this.y, this.width, this.height);
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
  render: function() {
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }
}
var input = {
  left: false,
  right: false,
}
window.addEventListener("keydown", function(event) {
  if(event.key === "ArrowLeft") {
    input.left = true;
  }
  if(event.key === "ArrowRight") {
    input.right = true;
  }
})
window.addEventListener("keyup", function(event) {
  if(event.key === "ArrowLeft") {
    input.left = false;
  }
  if(event.key === "ArrowRight") {
    input.right = false;
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
}
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.render();
  for (var i = 0; i < orcs.length; i++) {
    var orc = orcs[i];
    orc.render();
  }

}

for (var i = 0; i < 3; i++) {
  var x = Math.random()*canvas.width
  var y = 0
  var orc = new Orc(x, y);
  orcs.push(orc);
}
loop();
