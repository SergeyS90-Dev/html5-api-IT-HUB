//History API//
const content = document.getElementById("content");

let currentPage = 0;

function updateContent(page) {
  content.textContent = `Текущая страница: ${page}`;
}

document.getElementById("nextPage").onclick = () => {
  currentPage++;
  history.pushState({ page: currentPage }, "", `#page${currentPage}`);
  updateContent(currentPage);
};

document.getElementById("prevPage").onclick = () => {
  if (currentPage > 0) {
    currentPage--;
    history.pushState({ page: currentPage }, "", `#page${currentPage}`);
    updateContent(currentPage);
  }
};

document.getElementById("back").onclick = () => history.back();
document.getElementById("forward").onclick = () => history.forward();

window.onpopstate = (event) => {
  if (event.state && typeof event.state.page !== "undefined") {
    currentPage = event.state.page;
    updateContent(currentPage);
  } else {
    currentPage = 0;
    updateContent(currentPage);
  }
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let circles = [];

for (let i = 0; i < 5; i++) {
  circles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 15 + Math.random() * 10,
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4
  });
}

let mouse = { x: 0, y: 0 };

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach((c) => {
    c.x += c.dx;
    c.y += c.dy;

    if (c.x < 0 || c.x > canvas.width) c.dx *= -1;
    if (c.y < 0 || c.y > canvas.height) c.dy *= -1;

    let dist = Math.hypot(mouse.x - c.x, mouse.y - c.y);

    ctx.beginPath();
    ctx.arc(c.x, c.y, dist < 50 ? c.radius * 1.5 : c.radius, 0, Math.PI * 2);

    ctx.fillStyle = dist < 50 ? "orange" : "blue";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

//WEB WORKER//
let worker;

document.getElementById("startWorker").onclick = () => {
  const value = document.getElementById("number").value;
  const result = document.getElementById("result");

  if (!value) {
    result.textContent = "Ошибка: введите число";
    return;
  }

  worker = new Worker("worker.js");

  result.textContent = "Вычисление...";

  worker.postMessage(value);

  worker.onmessage = (e) => {
    result.textContent = `Результат: ${e.data}`;
    worker.terminate();
  };

  worker.onerror = () => {
    result.textContent = "Ошибка в воркере";
  };
};