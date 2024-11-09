class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.speed = 3;
        this.level = 1;
        this.xp = 0;
        this.score = 0;
        this.maxHp = 100;
        this.currentHp = 100;
        this.invulnerable = false;
        this.invulnerableTime = 1000; // 1�ʰ� ����
        this.lastHitTime = 0;
    }

    move(keys, canvasWidth, canvasHeight) {
        if (keys.ArrowUp) this.y -= this.speed;
        if (keys.ArrowDown) this.y += this.speed;
        if (keys.ArrowLeft) this.x -= this.speed;
        if (keys.ArrowRight) this.x += this.speed;

        // ��� ó��
        this.x = Math.max(this.size / 2, Math.min(canvasWidth - this.size / 2, this.x));
        this.y = Math.max(this.size / 2, Math.min(canvasHeight - this.size / 2, this.y));
    }

    takeDamage(amount, currentTime) {
        // ���� ���� üũ
        if (this.invulnerable &&
            currentTime - this.lastHitTime < this.invulnerableTime) {
            return false;
        }

        // ������ ����
        this.currentHp = Math.max(0, this.currentHp - amount);
        this.lastHitTime = currentTime;
        this.invulnerable = true;

        // ���� �ð� �� ���� ����
        setTimeout(() => {
            this.invulnerable = false;
        }, this.invulnerableTime);

        return true;
    }

    gainXP() {
        this.xp += 1;
        if (this.xp >= this.level * 5) {
            this.levelUp();
            return true;
        }
        return false;
    }

    levelUp() {
        this.level++;
        this.xp = 0;
        this.currentHp = Math.min(this.maxHp, this.currentHp + 20);
    }
}