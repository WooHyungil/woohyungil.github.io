// 캔버스 크기 및 설정
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 1500;

// 이미지 구현
let img1 = new Image();
img1.src = "img1.png";

let img2 = new Image();
img2.src = "img2.png";

let img3 = new Image();
img3.src = "ufo.png";

// 비행기 변수 구현
let airplane = {
  x: parseInt(Math.random() * 500 + 100),
  y: 1100,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y, this.width, this.height);
    ctx.drawImage(img3, 0, 0, 800, 350);
  },
};

// 미사일 클래스 구현
class Missile {
  constructor() {
    let move = parseInt(Math.random() * 550 + 100);
    this.x = move;
    this.y = 260;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img2, this.x, this.y, this.width, this.height);
  }
}

// 방향키와 떨어지는 프레임 변수 설정
let timer = 0;
let missileArr = [];

let rightPressed = false;
let leftPressed = false;

let animation;

let seconds = 1;

// 미사일이 떨어지는것을 표현
function frame() {
  let missile = new Missile();
  animation = requestAnimationFrame(frame);
  timer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 10 == 0) {
    let missile = new Missile();
    missileArr.push(missile);
    missile.draw();
  }
  missileArr.forEach((a, i, o) => {
    if (a.y > 1300) {
      o.splice(i, 1);
    }

    a.y += 10;
    a.draw();
    a.draw();
    crash(airplane, a);
  });

  missile.draw();
  if (rightPressed == true) {
    airplane.x += 6;
  }

  if (leftPressed == true) {
    airplane.x -= 6;
  }

  airplane.draw();
}
frame();

// 충돌했을때
function crash(airplane, missile) {
  let air1 = airplane.x;

  let left1 = airplane.x;
  let right1 = airplane.x + airplane.width;
  let top1 = airplane.y;
  let bottom1 = airplane.y + airplane.height;

  let left2 = missile.x;
  let right2 = missile.x + missile.width;
  let top2 = missile.y;
  let bottom2 = missile.y + missile.height;

  if (air1 <= 8 || air1 >= 740) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  } else if (
    left1 < right2 &&
    right1 > left2 &&
    top1 < bottom2 &&
    bottom1 > top2
  ) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

// 키보드를 눌렀을때
document.addEventListener("keydown", keyDownHandler);
function keyDownHandler(e) {
  if (e.key == 37 || e.key == "ArrowRight") {
    rightPressed = true;
    leftPressed = false;
  } else if (e.key == 39 || e.key == "ArrowLeft") {
    leftPressed = true;
    rightPressed = false;
  }
}
