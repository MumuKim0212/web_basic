class Background {
    constructor() {
        this.container = document.getElementById('starBackground');
        this.stars = [];
        this.numStars = 100; // 별의 개수 조정
        this.createStars();

        // 화면 크기 변경 시 별 재배치
        window.addEventListener('resize', () => this.resize());
    }

    createStars() {
        // 기존 별들 제거
        this.stars.forEach(star => star.element.remove());
        this.stars = [];

        // 새로운 별들 생성
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push(new Star(this.container));
        }
    }

    resize() {
        this.stars.forEach(star => star.reset());
    }
}