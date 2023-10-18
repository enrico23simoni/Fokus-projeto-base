const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const imagemPlayPause = document.querySelector('.app__card-primary-butto-icon');
const musicaFocoImput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somPlay = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');
const alarme = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoImput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

function precionaBotao (botao, contexto, temporizadorEmSegundos) {
    botao.addEventListener('click', () => {
        tempoDecorridoEmSegundos = temporizadorEmSegundos;
        morstrarTempo();
        botoes.forEach(function (contexto){ //desativa botoes
            contexto.classList.remove('active');
        })
        html.setAttribute('data-contexto', contexto); //altera fundo
        banner.setAttribute('src', `/imagens/${contexto}.png`); //altera imagem.
        botao.classList.add('active') //ativa botao
        switch (contexto) { //altera texto
            case "foco":
                titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
                break;
            case "descanso-curto":
                titulo.innerHTML = `
                Que tal dar uma respirada? 
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
                break;
            case "descanso-longo":
                titulo.innerHTML = `
                Hora de voltar à superfície.
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `
            default:
                break;
        }
    })
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        //alarme.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    morstrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar () {
    if (intervaloId){
        zerar();
        imagemPlayPause.setAttribute('src', '/imagens/play_arrow.png');
        somPause.play();
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000); //valores em milisegundos
    somPlay.play();
    iniciarOuPausarBt.textContent = "Pausar";
    imagemPlayPause.setAttribute('src', '/imagens/pause.png');
}

function zerar () {
    clearInterval(intervaloId)
    intervaloId = null;
    iniciarOuPausarBt.textContent = "Começar";
    imagemPlayPause.setAttribute('src', '/imagens/play_arrow.png');
}

precionaBotao(curtoBt, 'descanso-curto', 300);
precionaBotao(focoBt, 'foco', 1500);
precionaBotao(longoBt, 'descanso-longo', 900);

function morstrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000) //A propriedade DATE só trabalha com milisegundos por isso multiplicamos por 1000.
    const tempoFormatado = tempo.toLocaleTimeString ('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

morstrarTempo();