class GameLogic {
    constructor(state, renderer) {
        this.state = state;
        this.renderer = renderer;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (this.state.keys.hasOwnProperty(e.key)) {
                this.state.keys[e.key] = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (this.state.keys.hasOwnProperty(e.key)) {
                this.state.keys[e.key] = false;
            }
        });

        document.getElementById('restartButton').addEventListener('click', () => {
            this.restartGame();
        });
    }

    update(deltaTime) {
        if (this.state.gameOver) return;

        this.state.player.move(this.state.keys, this.state.canvas.width, this.state.canvas.height);
        this.updateProjectiles();
        this.updateEnemies();
        this.checkCollisions();
        this.spawnEntities(deltaTime);
        this.updateUI();
    }

    updateProjectiles() {
        this.state.projectiles.forEach(projectile => projectile.move());
        this.state.projectiles = this.state.projectiles.filter(
            projectile => !projectile.isOutOfBounds(this.state.canvas.width, this.state.canvas.height)
        );
    }

    updateEnemies() {
        this.state.enemies.forEach(enemy => {
            enemy.moveToward(this.state.player.x, this.state.player.y);
        });
    }

    checkCollisions() {
        this.checkProjectileEnemyCollisions();
        this.checkPlayerEnemyCollisions();
        this.checkPlayerGemCollisions();
    }

    checkProjectileEnemyCollisions() {
        for (let i = this.state.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.state.projectiles[i];
            for (let j = this.state.enemies.length - 1; j >= 0; j--) {
                const enemy = this.state.enemies[j];
                const dx = projectile.x - enemy.x;
                const dy = projectile.y - enemy.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < enemy.size + projectile.size) {
                    this.state.gems.push(new Gem(enemy.x, enemy.y));
                    this.state.enemies.splice(j, 1);
                    this.state.projectiles.splice(i, 1);
                    this.state.player.score += 10;
                    break;
                }
            }
        }
    }

    checkPlayerEnemyCollisions() {
        this.state.enemies.forEach(enemy => {
            const dx = this.state.player.x - enemy.x;
            const dy = this.state.player.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (enemy.size + this.state.player.size) / 2;

            if (distance < minDistance) {
                if (this.state.player.takeDamage(enemy.damage, Date.now())) {
                    this.renderer.updateHPBar();
                    this.checkGameOver();
                }
            }
        });
    }

    checkPlayerGemCollisions() {
        for (let i = this.state.gems.length - 1; i >= 0; i--) {
            const gem = this.state.gems[i];
            const dx = this.state.player.x - gem.x;
            const dy = this.state.player.y - gem.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.state.player.size + gem.size) {
                this.state.gems.splice(i, 1);
                if (this.state.player.gainXP()) {
                    this.renderer.updateHPBar();
                }
            }
        }
    }

    spawnEntities(deltaTime) {
        // 적 생성 (초당 약 1회)
        if (Math.random() < deltaTime / 1000) {
            this.state.enemies.push(new Enemy(this.state.canvas.width, this.state.canvas.height));
        }

        // 발사체 생성 (초당 약 2회)
        if (Math.random() < deltaTime / 500) {
            this.state.projectiles.push(new Projectile(this.state.player.x, this.state.player.y));
        }
    }

    updateUI() {
        const stats = document.getElementById('stats');
        stats.textContent = `Level: ${this.state.player.level} | XP: ${this.state.player.xp} | Score: ${this.state.player.score}`;
    }

    checkGameOver() {
        if (this.state.player.currentHp <= 0) {
            this.state.gameOver = true;
            document.getElementById('restartButton').style.display = 'block';
        }
    }

    restartGame() {
        this.state.init();
        document.getElementById('restartButton').style.display = 'none';
        this.renderer.updateHPBar();
    }
}