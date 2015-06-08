// Variáveis do jogo
var canvas, contexto, ALTURA, LARGURA, frames = 0;

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

}

//monitorar o clique do usuário
function clique() {

}

// função onde irá "rodar" o jogo, loop do jogo
function roda() {

}

// local onde irá atualizar o status do personagem
function atualiza() {

}

// desenhar o ambiente e o personagem
function desenha() {

}

// inicializa o jogo
main();
