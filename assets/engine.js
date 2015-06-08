// Variáveis do jogo
var canvas, contexto, ALTURA, LARGURA, frames = 0;

var chao = {
        y: 550,
        altura: 50,
        cor: "#ffdf70",

        desenha: function() {
            contexto.fillStyle = this.cor;
            contexto.fillRect(0, this.y, LARGURA, this.altura);
        }
    },

    bloco = {
        x: 50,
        y: 0,
        altura: 50,
        largura: 50,
        cor: "#ff4e4e",
        gravidade: 1.5,
        velocidade: 0,

        desenha: function() {
            contexto.fillStyle = this.cor;
            contexto.fillRect(this.x, this.y, this.largura, this.altura)
        },

        atualiza: function() {
            this.velocidade += this.gravidade;
            this.y += this.velocidade;

            if(this.y > chao.y - this.altura) {
                this.y = chao.y - this.altura;
            }
        },
};

function main() {

    // pagando a altura e largura da janela do usuário
    ALTURA = window.innerHeight;
    LARGURA = window.innerWidth;

    if(LARGURA >= 500) {
        LARGURA = 600;
        ALTURA = 600;
    }

    // criando o elemento canvas
    canvas = document.createElement("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000";

    // adicionando o elementos canvas no html
    contexto = canvas.getContext("2d");
    document.body.appendChild(canvas);

    // monitorando o clique do usuário
    document.addEventListener("mousedown", clique);

    roda();
}

//monitorar o clique do usuário
function clique(event) {
    alert("clicou");

}

// função onde irá "rodar" o jogo, loop do jogo
function roda() {

    atualiza();

    desenha();

    // criando o loop do jogo
    window.requestAnimationFrame(roda);
}

// local onde irá atualizar o status do personagem
function atualiza() {

    frames++;

    bloco.atualiza();

}

// desenhar o ambiente e o personagem
function desenha() {

    contexto.fillStyle = "#50beff";
    contexto.fillRect(0, 0, LARGURA, ALTURA);

    // desenhando o chão do jogo
    chao.desenha();

    // desenhando o player do jogo
    bloco.desenha();
}

// inicializa o jogo
main();
