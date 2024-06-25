// Variáveis do jogo
let bola;
let raqueteEsquerda;
let raqueteDireita;
let placarEsquerda = 0;
let placarDireita = 0;

function setup() {
  createCanvas(800, 400);
  
  // Criando a bola no centro da tela
  bola = new Bola(width / 2, height / 2);
  
  // Criando as raquetes
  raqueteEsquerda = new Raquete(true); // jogador da esquerda
  raqueteDireita = new Raquete(false); // jogador da direita
}

function draw() {
  background(0);
  
  // Mostrar placar
  textAlign(CENTER);
  fill(255);
  textSize(32);
  text(placarEsquerda, width / 4, 50); // placar do jogador da esquerda
  text(placarDireita, 3 * width / 4, 50); // placar do jogador da direita
  
  // Atualizar e mostrar a bola
  bola.atualizar();
  bola.mostrar();
  
  // Atualizar e mostrar as raquetes
  raqueteEsquerda.atualizar();
  raqueteDireita.atualizar();
  raqueteEsquerda.mostrar();
  raqueteDireita.mostrar();
  
  // Verificar colisão da bola com as raquetes
  raqueteEsquerda.verificarColisao(bola);
  raqueteDireita.verificarColisao(bola);
  
  // Verificar se a bola passou pelas raquetes (marcar ponto)
  if (bola.saiuDaTela()) {
    if (bola.x < 0) {
      placarDireita++;
    } else {
      placarEsquerda++;
    }
    bola.reiniciar();
  }
}

// Classe da bola
class Bola {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.raio = 10;
    this.reiniciar();
  }
  
  reiniciar() {
    this.x = width / 2;
    this.y = height / 2;
    let angulo = random(-PI/4, PI/4);
    this.velocidadeX = 5 * Math.cos(angulo);
    this.velocidadeY = 5 * Math.sin(angulo);
  }
  
  atualizar() {
    this.x += this.velocidadeX;
    this.y += this.velocidadeY;
    
    // Verificar colisão com as paredes verticais
    if (this.y - this.raio < 0 || this.y + this.raio > height) {
      this.velocidadeY *= -1;
      let novoAngulo = random(-PI/4, PI/4);
      this.velocidadeX = 5 * Math.cos(novoAngulo) * (this.velocidadeX > 0 ? 1 : -1);
    }
  }
  
  mostrar() {
    fill(255);
    ellipse(this.x, this.y, this.raio * 2);
  }
  
  saiuDaTela() {
    return (this.x - this.raio > width || this.x + this.raio < 0);
  }
}

// Classe das raquetes
class Raquete {
  constructor(ehEsquerda) {
    this.largura = 10;
    this.altura = 80;
    this.y = height / 2 - this.altura / 2;
    this.ehEsquerda = ehEsquerda;
    this.x = this.ehEsquerda ? this.largura : width - this.largura;
    this.velocidade = 10;
  }
  
  atualizar() {
    if (this.ehEsquerda) {
      if (keyIsDown(87)) { // tecla 'W'
        this.y -= this.velocidade;
      }
      if (keyIsDown(83)) { // tecla 'S'
        this.y += this.velocidade;
      }
    } else {
      if (keyIsDown(UP_ARROW)) {
        this.y -= this.velocidade;
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.y += this.velocidade;
      }
    }
    
    // Limitar a posição da raquete dentro da tela
    this.y = constrain(this.y, 0, height - this.altura);
  }
  
  mostrar() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.largura, this.altura);
  }
  
  // Verificar colisão com a bola
  verificarColisao(bola) {
    if (this.ehEsquerda) {
      if (bola.x - bola.raio < this.x + this.largura / 2 &&
          bola.y > this.y - this.altura / 2 &&
          bola.y < this.y + this.altura / 2) {
        bola.velocidadeX *= -1;
      }
    } else {
      if (bola.x + bola.raio > this.x - this.largura / 2 &&
          bola.y > this.y - this.altura / 2 &&
          bola.y < this.y + this.altura / 2) {
        bola.velocidadeX *= -1;
      }
    }
  }
}
