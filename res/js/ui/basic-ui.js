export class Cursor {
  constructor() {
    this.img = new Image();
    this.path = "./res/img/basic-ui/cursor.png";
    this.img.src = this.path;
    this.size = {
      width: 18,
      height: 26,
    };
  }

  draw(ctx, x, y) {
    this.x = x - 2;
    this.y = y;
    ctx.drawImage(this.img, this.x, this.y, this.size.width, this.size.height);
  }
}

export class Background {
  constructor() {
    this.img = new Image();
    this.path = "./res/img/basic-ui/background.png";
    this.img.src = this.path;
  }

  draw(canvas, ctx) {
    ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
  }
}

export class Stack {
  constructor() {
    this.img = new Image();
    this.path = "./res/img/basic-ui/bullet.png";
    this.img.src = this.path;
    this.maxRounds = 8;
    this.rounds = 8;
    this.scale = 0.1;
    this.size = {
      width: 173 * this.scale,
      height: 513 * this.scale,
    };
    this.signImg = new Image();
    this.signImgPath = "./res/img/basic-ui/sign.png";
    this.signImg.src = this.signImgPath;
    this.signImgScale = 2;
    this.signSize = {
      width: 300 * this.signImgScale,
      height: 200 * this.signImgScale,
    };
  }

  draw(canvas, ctx) {
    if (this.rounds > 0) {
      for (let i = 1; i <= this.rounds; i++) {
        ctx.drawImage(
          this.img,
          (this.size.width + 5) * i,
          canvas.height - this.size.height - 25,
          this.size.width,
          this.size.height
        );
      }
    } else {
      ctx.drawImage(this.signImg, canvas.width / 2, canvas.height / 2, this.signSize.width, this.signSize.height);  
      ctx.font = "40px VT323";
      ctx.fillStyle = "black";
      ctx.fillText(
        "Zmáčkni R pro nový zásobník",
        canvas.width / 2 + 36,
        canvas.height / 2 + 170
      );
    }
  }

  shoot() {
    if (this.rounds > 0) {
      this.rounds--;
    }
  }

  reload() {
    this.rounds = this.maxRounds;
  }
}

export class Score {
    constructor() {
        this.score = 0;
    }

    draw(canvas, ctx) {
        ctx.font = "40px VT323";
        ctx.fillStyle = "black";
        ctx.fillText(
        `Skóre: ${this.score}`,
        canvas.width - 500,
        50
      );
    }
}

export class HighScore{
  constructor() {
    this.score = 0;
}

draw(canvas, ctx) {
    ctx.font = "40px VT323";
    ctx.fillStyle = "black";
    ctx.fillText(
    `Nejlepší skóre: ${this.score}`,
    canvas.width - 500,
    100
  );
}
}

export class Countdown{
  constructor(seconds){
     this.seconds=seconds;
     this.timer = setInterval(() => {
           this.update();
     }, 1000);
  }
  draw(canvas,ctx){
    let minutes = Math.floor(this.seconds / 60);
    let secondsLeft = this.seconds %60;
    ctx.font = "32px VT323";
    ctx.fillStyle = "black";
    ctx.fillText(`${minutes}:${secondsLeft}`, canvas.width / 2, 50);
  }
  start() {
    this.timer = setInterval(() => {
      this.update();
}, 1000);
  }
  update() {
    console.log("update");
    if(this.seconds > 0)return this.seconds--;
    clearInterval(this.timer);
    
  }


}