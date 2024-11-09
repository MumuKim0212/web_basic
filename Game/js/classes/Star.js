class Star {
    constructor(container) {
        this.element = document.createElement('div');
        this.element.className = 'star';
        this.container = container;
        this.reset();
        this.container.appendChild(this.element);
    }

    reset() {
        // 위치 설정
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        // 크기 설정
        this.size = Math.random() * 2 + 1;

        // 반짝임 속도 설정
        const duration = (Math.random() * 3 + 2);

        // 별 스타일 적용
        this.element.style.cssText = `
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.size}px;
            height: ${this.size}px;
            animation-duration: ${duration}s;
            opacity: ${Math.random()};
        `;
    }
}