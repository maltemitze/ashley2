const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let offset = 0;

// 👉 Herz-Grenzen berechnen
let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;

for (let i = 0; i < 600; i++) {
    let t = i / 20;

    let x = 16 * Math.pow(Math.sin(t), 3);
    let y = 13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
}

const heartCenterX = (minX + maxX) / 2;
const heartCenterY = (minY + maxY) / 2;

function start() {
    document.getElementById("textBox").style.display = "none";
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const scale = 12;

    for (let i = 0; i < 600; i++) {
        let t = (i + offset) / 20;

        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t);

        // 👉 perfekt zentriert
        let px = cx + (x - heartCenterX) * scale;
        let py = cy - (y - heartCenterY) * scale;

        ctx.fillStyle = "hotpink";

        if (i % 15 === 0) {
            ctx.font = "14px Arial";
            ctx.textAlign = "center";
            ctx.fillText("I love you", px, py);
        } else {
            ctx.fillRect(px, py, 2, 2);
        }
    }

    offset += 0.8;
    requestAnimationFrame(draw);
}