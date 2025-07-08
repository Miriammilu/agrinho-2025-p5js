let lixo;
let lixeira;
let rio;
let chuva = [];
let lixoSolto = false;
let lixoNoRio = false;

function setup() {
  createCanvas(800, 600);

  lixo = {
    x: 100,
    y: 400,
    w: 50,
    h: 50,
    dragging: false,
    solto: false
  };

  lixeira = {
    x: 600,
    y: 400,
    w: 80,
    h: 100
  };

  rio = {
    y: 520,
    cor: color(100, 200, 255)
  };
}

function draw() {
  background(220);

  // Rio
  fill(rio.cor);
  rect(0, rio.y, width, height - rio.y);

  // Lixeira
  fill(100);
  rect(lixeira.x, lixeira.y, lixeira.w, lixeira.h);
  fill(255);
  text("LIXEIRA", lixeira.x + 5, lixeira.y - 5);

  // Lixo
  fill(150, 75, 0);
  rect(lixo.x, lixo.y, lixo.w, lixo.h);

  // Chuva
  if (lixoSolto) {
    gerarChuva();
    atualizarChuva();
  }

  // Lixo indo para o rio
  if (lixoSolto && lixo.y < rio.y) {
    lixo.y += 1;
  } else if (lixo.y >= rio.y && !lixoNoRio) {
    lixoNoRio = true;
    rio.cor = color(90, 150, 150); // Rio poluído
  }

  if (lixoNoRio) {
    fill(255, 0, 0);
    textSize(24);
    text("O LIXO POLUIU O RIO!", 280, 100);
  }
}

function mousePressed() {
  if (
    mouseX > lixo.x &&
    mouseX < lixo.x + lixo.w &&
    mouseY > lixo.y &&
    mouseY < lixo.y + lixo.h
  ) {
    lixo.dragging = true;
  }
}

function mouseReleased() {
  if (lixo.dragging) {
    lixo.dragging = false;

    // Verifica se foi solto na lixeira
    if (
      lixo.x > lixeira.x &&
      lixo.x < lixeira.x + lixeira.w &&
      lixo.y > lixeira.y &&
      lixo.y < lixeira.y + lixeira.h
    ) {
      lixo.x = -100; // Some com o lixo
      fill(0, 255, 0);
      text("Parabéns! Você ajudou o meio ambiente!", 200, 80);
    } else {
      lixoSolto = true;
    }
  }
}

function mouseDragged() {
  if (lixo.dragging) {
    lixo.x = mouseX - lixo.w / 2;
    lixo.y = mouseY - lixo.h / 2;
  }
}

// Chuva
function gerarChuva() {
  if (frameCount % 5 == 0) {
    chuva.push({ x: random(width), y: 0 });
  }
}

function atualizarChuva() {
  fill(0, 100, 255);
  for (let i = 0; i < chuva.length; i++) {
    ellipse(chuva[i].x, chuva[i].y, 5, 10);
    chuva[i].y += 5;
  }
}
