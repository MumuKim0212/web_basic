class GameState {
    constructor(canvas) {
        this.canvas = canvas;
        this.init();
    }

    init() {
        this.player = new Player(this.canvas.width / 2, this.canvas.height / 2);
        this.enemies = [];
        this.projectiles = [];
        this.gems = [];
        this.gameOver = false;
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false
        };
    }
}