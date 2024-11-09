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

        // 게임 상태 업데이트
        this.logic.update(deltaTime);

        // 화면 렌더링
        this.renderer.render();

        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

// 게임 시작
window.onload = () => new Game();