// Variáveis do jogo
var canvas, contexto, ALTURA, LARGURA, frames = 0, maxPulos = 3, velocidade = 6, estadoAtual,

estados = {
    inicioDeJogo: 0,
    jogando: 1,
    fimDeJogo: 2
}

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
        forcaDoPulo: 20,
        qntPulos: 0,

        desenha: function() {
            contexto.fillStyle = this.cor;
            contexto.fillRect(this.x, this.y, this.largura, this.altura)
        },

        atualiza: function() {
            this.velocidade += this.gravidade;
            this.y += this.velocidade;

            if(this.y > chao.y - this.altura) {
                this.y = chao.y - this.altura;
                this.qntPulos = 0;
            }
        },

        pula: function() {
            if(this.qntPulos < maxPulos) {
               this.velocidade = -this.forcaDoPulo;
               this.qntPulos++;
           }
        },
    },

    obstaculos = {
        _obs: [],
        cores: ["#ffbc1c", "#ff1c1c", "#ff85e1", "#52a7ff", "#78ff5d"],
        tempoInsere: 0,

        insere: function() {
            this._obs.push({
                x: LARGURA,
                largura: 30 + Math.floor(18 * Math.random()),
                altura: 30 + Math.floor(71 * Math.random()),
                cor: this.cores[Math.floor(5 * Math.random())]
            });

            this.tempoInsere = 30 + Math.floor(21 * Math.random());
        },

        desenha: function() {
            for(var i = 0, tam = this._obs.length; i < tam; i++) {
                var obs = this._obs[i];
                contexto.fillStyle = obs.cor;
                contexto.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
            }
        },

        atualiza: function() {

            if(this.tempoInsere == 0)
                this.insere();
            else
                this.tempoInsere--;

            // acessando cada posição do array de obstaculos
            for(var i = 0, tam = this._obs.length; i < tam; i++) {
                var obs = this._obs[i];

                obs.x -= velocidade;

                // removando os obstaculos ao final da canvas
                if(obs.x <= -obs.largura) {
                    this._obs.splice(i, 1);
                    tam--;
                    i--;
                }
            }
        },


    };

function main() {

    // pagando a altura e largura da janela do usuário
    ALTURA = window.innerHeight;
    LARGURA = window.innerWidth;

    if(LARGURA >= 500) {
        LARGURA = 800;
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

    // definindo o está atual do jogo
    estadoAtual = estados.inicioDeJogo;
    roda();
}

//monitorar o clique do usuário
function clique(event) {
    if(estadoAtual == estados.jogando) 
        bloco.pula();

    else if(estadoAtual == estados.inicioDeJogo)
        estadoAtual = estados.jogando;

    else if(estadoAtual == estados.fimDeJogo)
        estadoAtual = estados.inicioDeJogo;
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

    if(estadoAtual == estados.jogando) 
        obstaculos.atualiza();    
}

// desenhar o ambiente e o personagem
function desenha() {

    contexto.fillStyle = "#50beff";
    contexto.fillRect(0, 0, LARGURA, ALTURA);

    if(estadoAtual == estados.inicioDeJogo) {
        contexto.fillStyle = "green";
        contexto.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50, 100, 100);
    }
    
    else if(estadoAtual == estados.fimDeJogo) {
        contexto.fillStyle = "red";
        contexto.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50, 100, 100);
    }
    
    else if(estadoAtual == estados.jogando) {
        // desenhando os obstaculos
        obstaculos.desenha();
    }
    
    // desenhando o chão do jogo
    chao.desenha();

    // desenhando o player do jogo
    bloco.desenha();
}

// inicializa o jogo
main();
