class Enemy {
    constructor(canvasWidth, canvasHeight) {
        this.size = 15;
        this.speed = 1;
        this.damage = 10;
        this.setRandomPosition(canvasWidth, canvasHeight);
    }

    setRandomPosition(canvasWidth, canvasHeight) {
        const side = Math.floor(Math.random() * 4);

        switch (side) {
            case 0: // 위
                this.x = Math.random() * canvasWidth;
                this.y = -20;
                break;
            case 1: // 오른쪽
                this.x = canvasWidth + 20;
                this.y = Math.random() * canvasHeight;
                break;
            case 2: // 아래
                this.x = Math.random() * canvasWidth;
                this.y = canvasHeight + 20;
                break;
            case 3: // 왼쪽
                this.x = -20;
                this.y = Math.random() * canvasHeight;
                break;
        }
    }

    moveToward(targetX, targetY) {
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const angle = Math.atan2(dy, dx);
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
    }
}