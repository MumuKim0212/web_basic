class Renderer {
    constructor(canvas, state) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.state = state;
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPlayer();
        this.drawEnemies();
        this.drawProjectiles();
        this.drawGems();

        if (this.state.gameOver) {
            this.drawGameOver();
        }
    }

    drawPlayer() {
        this.ctx.fillStyle = this.state.player.invulnerable ? '#87CEEB' : '#4A90E2';
        this.ctx.beginPath();
        this.ctx.arc(
            this.state.player.x,
            this.state.player.y,
            this.state.player.size / 2,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
    }

    drawEnemies() {
        this.ctx.fillStyle = '#E24A4A';
        this.state.enemies.forEach(enemy => {
            this.ctx.beginPath();
            this.ctx.arc(enemy.x, enemy.y, enemy.size / 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawProjectiles() {
        this.ctx.fillStyle = '#90E24A';
        this.state.projectiles.forEach(projectile => {
            this.ctx.beginPath();
            this.ctx.arc(projectile.x, projectile.y, projectile.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawGems() {
        this.ctx.fillStyle = '#E2E24A';
        this.state.gems.forEach(gem => {
            this.ctx.beginPath();
            this.ctx.arc(gem.x, gem.y, gem.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawGameOver() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = '24px Arial';
        this.ctx.fillText(
            `Final Score: ${this.state.player.score}`,
            this.canvas.width / 2,
            this.canvas.height / 2 + 40
        );
    }

    updateHPBar() {
        const hpFill = document.getElementById('hpFill');
        const hpPercentage = (this.state.player.currentHp / this.state.player.maxHp) * 100;
        hpFill.style.width = `${hpPercentage}%`;

        // HP 바 색상 변경
        if (hpPercentage > 60) {
            hpFill.style.background = '#4CAF50'; // 녹색
        } else if (hpPercentage > 30) {
            hpFill.style.background = '#FFC107'; // 노란색
        } else {
            hpFill.style.background = '#F44336'; // 빨간색
        }

        // HP 상태 콘솔에 출력
        console.log(`Current HP: ${this.state.player.currentHp}/${this.state.player.maxHp}`);
    }
}