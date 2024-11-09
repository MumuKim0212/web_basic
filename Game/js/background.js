class Background {
    constructor() {
        this.container = document.getElementById('starBackground');
        this.stars = [];
        this.numStars = 100; // ���� ���� ����
        this.createStars();

        // ȭ�� ũ�� ���� �� �� ���ġ
        window.addEventListener('resize', () => this.resize());
    }

    createStars() {
        // ���� ���� ����
        this.stars.forEach(star => star.element.remove());
        this.stars = [];

        // ���ο� ���� ����
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push(new Star(this.container));
        }
    }

    resize() {
        this.stars.forEach(star => star.reset());
    }
}