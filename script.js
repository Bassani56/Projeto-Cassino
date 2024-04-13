const input = document.getElementById('meuInput');

input.addEventListener('input', function() {
    let valor = input.value;
    console.log('Valor digitado:', valor);

    const botaoMetade = document.querySelector('.metade');
    botaoMetade.addEventListener('click', function(){
        valor = valor/2;
        input.value = valor;
        console.log("Valor metade: ", valor);
    });

    const botaoDobro = document.querySelector('.dobro');

    botaoDobro.addEventListener('click', function() {
        valor = valor*2;
        input.value = valor;
        console.log("Valor metade: ", valor);
    });

});

//ESCOLHA DAS CORES----------------------------------------------------------------------------
const botaoVermelho = document.querySelectorAll('.vermelho');
const botaoPreto = document.querySelectorAll('.preto');
const botaoBranco = document.querySelectorAll('.branco');
const botaoStart = document.querySelectorAll('.comecar');

const botoes = [...botaoVermelho, ...botaoPreto, ...botaoBranco, ...botaoStart];

let escolha = null;
const giros = document.querySelectorAll('.giro');

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        botoes.forEach(b => b.classList.remove('clicado'));
        botao.classList.add('clicado');
        escolha = botao;
        console.log(escolha);            
    });
});

for(let i = 0; i <= 2; i++){
    let botao = botoes[i];

    botao.addEventListener('click', () =>{
        giros.forEach(giro => {
            const divContainer = document.createElement('h2');
            botaoEscolhido = 

            divContainer.innerHTML = 'VOCE ESCOLHEU A COR ' + escolha.innerHTML;
            divContainer.style.color = 'white';
            divContainer.style.textAlign = 'center';
            divContainer.style.margin = '0px';
            divContainer.classList.add('teste');
            giro.innerHTML = '';
            giro.appendChild(divContainer);

            const novaDiv = document.createElement('div');
            giro.style.backgroundColor = '';
            novaDiv.classList.add('teste');
            novaDiv.style.height = '40px';
            novaDiv.style.width = '40px';
            novaDiv.style.marginLeft = '45%';
            novaDiv.style.backgroundColor = window.getComputedStyle(escolha).backgroundColor;
            giro.appendChild(novaDiv);
        });
    });
}

botoes[3].addEventListener('click', ()=>{
    Array.prototype.slice.call(giros).forEach(item => {
        const divContainer = item.querySelector('div.teste'); // Localiza o divContainer dentro de cada elemento em giro
        const innerContainer = item.querySelector('.teste');
        if (divContainer) {
            divContainer.remove(); // Remove o divContainer se encontrado
            innerContainer.remove();
        }
    });
    
    iniciaGame();
    setTimeout(() => {
        botoes[3].classList.remove('clicado');
        botoes[3].classList.add('comecar');

        dadosAleatorios();
    }, 4500);
});
    
//INICIA JOGO 
function iniciaGame(){
    const giros = document.querySelector('.giro');
    giros.innerHTML = '';

    function adicionarNumero(numero) {
        const contagem = document.createElement('h1'); // Cria um elemento h1 para cada número
        contagem.innerHTML = numero.toString(); // Define o texto como o número atual
        contagem.style.color = 'red'; // Define a cor do texto como branco
        contagem.style.fontSize = '70px';
        contagem.style.display = 'block';
        contagem.style.textAlign = 'center';
        contagem.style.margin = '0px';
        giros.appendChild(contagem); // Adiciona o elemento h1 ao elemento .giro
        
        // Após um intervalo de tempo, remove o número anterior da contagem regressiva
        setTimeout(() => {
            contagem.remove();
        }, 750); // Define o intervalo de tempo para 1 segundo
    }

    // Loop para adicionar os números à contagem regressiva
    let contador = 3;
    adicionarNumero(contador);
    const intervalo = setInterval(() => {
        contador--;
        adicionarNumero(contador);
        // Quando a contagem regressiva chegar a zero, limpa o intervalo
        if (contador === 0) {
            clearInterval(intervalo);
        }
    }, 750); // Define o intervalo entre a exibição de cada número para 1 segundos
}

let resultado = null;

function dadosAleatorios(){
    const giros = document.querySelector('.giro');
    giros.style.display = 'flex'; // Defina a div giros como um contêiner flexível
    giros.style.alignItems = 'center'; // Centralize verticalmente o conteúdo
    giros.style.justifyContent = 'center'; // Centralize horizontalmente o conteúdo

    function adicionarNumero(numero) {
        const contagem = document.createElement('div'); 
        contagem.classList.add('contador');
        contagem.style.width = '40px';
        contagem.style.height = '40px';
        contagem.style.display = 'flex'; // Defina a div giros como um contêiner flexível
        contagem.style.alignItems = 'center'; // Centralize verticalmente o conteúdo
        contagem.style.justifyContent = 'center'; // Centralize horizontalmente o conteúdo
        contagem.style.textAlign = 'center';
        contagem.style.borderRadius = '2px';
        contagem.style.color = 'white';
    
        if(numero == 14){
            contagem.style.color = 'red';
            contagem.style.backgroundColor = 'white';
        }
        else if(numero % 2 == 0){
            contagem.style.backgroundColor = 'red';
        }
        else{
            contagem.style.backgroundColor = 'rgb(30, 30, 20)';
        }
        contagem.textContent = numero.toString(); // Use textContent para definir o texto
        giros.appendChild(contagem);
        
        // Após um intervalo de tempo, remove o número anterior da contagem regressiva
        setTimeout(() => {
            resultado = contagem.style.backgroundColor;
            contagem.remove();
        }, 150); // Define o intervalo de tempo para 1 segundo

    }

    // Loop para adicionar os números à contagem regressiva
    function gerarNumeroAleatorio() {
        return Math.floor(Math.random() * 14) + 1;
    }

    let contador = 50;
    const intervalo = setInterval(() => {
        contador--;
        const numeroAleatorio = gerarNumeroAleatorio();
        adicionarNumero(numeroAleatorio);
        // Quando a contagem regressiva chegar a zero, limpa o intervalo
        if (contador === 0) {
            clearInterval(intervalo);
            verificaAcerto();
        }
    }, 150); // Define o intervalo entre a exibição de cada número para 100 milissegundos
}

function verificaAcerto(){
    const estiloEscolha = window.getComputedStyle(escolha);
    const corEscolha = estiloEscolha.backgroundColor;

    if(corEscolha === resultado){
        alert('Você acertou!');
    } else {
        alert('Você errou!');
    }
}