class Star {
    constructor(container) {
        this.element = document.createElement('div');
        this.element.className = 'star';
        this.container = container;
        this.reset();
        this.container.appendChild(this.element);
    }

    reset() {
        // ��ġ ����
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        // ũ�� ����
        this.size = Math.random() * 2 + 1;

        // ��¦�� �ӵ� ����
        const duration = (Math.random() * 3 + 2);

        // �� ��Ÿ�� ����
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