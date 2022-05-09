export class Entity {
    constructor(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.color = c;
        this.size = {
            width: w,
            height: h,
        };
        this.scale = 1;
        this.bounty = 50;
        this.reward = 0;
        this.type = 0;
        this.velocity = 1;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size.width, this.size.height);
    }
    update(canvas){
        switch (this.type) {
             case 0:
                 this.x += this.velocity;
                 break;
                 case 1:
                     if(this.y > canvas.height - this.size.height){
                         this.y -= this.velocity;
                     }
                    break;
                 case 2:
                     this.x -= this.velocity;
                     break;
                   
        }
    }

    updateReward() {
        this.reward = this.bounty / this.scale;
    }

    spawn(canvas) {
        const rN = Math.random();
        if (rN > 0.6) {
            this.type = 0; // Left
            this.y =  Math.floor(Math.random() * (canvas.height - this.size.height + 1 ));
        } else if (rN < 0.2) {
            this.type = 1; // Bottom
            this.x =  Math.floor(Math.random() * (canvas.width + 199 )) + 200;
            this.y =  canvas.height - this.size.height;
        } else {
            this.type = 2; // Right
            this.y =  Math.floor(Math.random() * (canvas.height - this.size.height + 1 ));
        }    
       
    }
}