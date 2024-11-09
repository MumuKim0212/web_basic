class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.state = new GameState(this.canvas);
        this.renderer = new Renderer(this.canvas, this.state);
        this.logic = new GameLogic(this.state, this.renderer);
        this.background = new Background();

        this.lastTime = 0;
        this.init();
    }

    init() {
        this.gameLoop(0);
    }

    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        // ���� ���� ������Ʈ
        this.logic.update(deltaTime);

        // ȭ�� ������
        this.renderer.render();

        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

// ���� ����
window.onload = () => new Game();