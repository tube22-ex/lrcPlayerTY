class CanvasDrawer {
    constructor(canvasId, offsetPercentage) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = 25;
        this.canvas.width = window.innerWidth;
        this.canvasW = this.canvas.width;
        this.canvasH = this.canvas.height;
        this.ctx.textBaseline = 'top';
        this.offsetPercentage = offsetPercentage;
    }

    draw(text) {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
        this.ctx.font = "25px serif";
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(text, this.canvasW - (text.length * 12) - (this.canvasW * this.offsetPercentage), 20);
    }

    resize() {
        this.canvas.height = 25;
        this.canvas.width = window.innerWidth;
        this.canvasW = this.canvas.width;
        this.canvasH = this.canvas.height;
    }
}

// 利用例
const speedDrawer = new CanvasDrawer('canvas', 0.10);
const timeDrawer = new CanvasDrawer('canvas1', 0.13);

function drawSpeed(speed) {
    speedDrawer.draw(speed);
}

function drawTime(time) {
    timeDrawer.draw(`${time} x${videoSpeedAry[playSpeedIndex]}`);
}

function resizeWindow() {
    speedDrawer.resize();
    timeDrawer.resize();
}

window.addEventListener('resize', resizeWindow);
