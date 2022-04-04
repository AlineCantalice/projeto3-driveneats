/*
*  DECLARACAO DE VARIAVEIS
*/
let prato;
let bebida;
let sobremesa;
let valor;

/*
*  FUNCAO RESPONSAVEL POR ABRIR O MODAL
*/
function abrirModal(nomeModal) {

    //Recupera os elementos da tela
    let modal = document.getElementById(nomeModal);
    let nomePrato = prato.getElementsByTagName('h4')[0].innerText;
    let nomeBebida = bebida.getElementsByTagName('h4')[0].innerText;
    let nomeSobremesa = sobremesa.getElementsByTagName('h4')[0].innerText;

    //Verifica se o modal existe 
    if (typeof modal === 'undefined' || modal === null) {
        return;
    }

    //Recupera o preco dos produtos
    const precoPrato = Number(prato.getElementsByTagName('h5')[0].innerText.replace(',', '.').substr(3, 10)).toFixed(2);
    const precoBebida = Number(bebida.getElementsByTagName('h5')[0].innerText.replace(',', '.').substr(3, 10)).toFixed(2);
    const precoSobremesa = Number(sobremesa.getElementsByTagName('h5')[0].innerText.replace(',', '.').substr(3, 10)).toFixed(2);

    //Calcula o valor a partir do preco de cada produto
    valor = Number(precoPrato) + Number(precoBebida) + Number(precoSobremesa);

    //Prepara os textos que irao aparecer no modal
    let pratoModal = document.querySelector(".prato-modal");
    pratoModal.getElementsByTagName('p')[0].innerText = nomePrato;
    pratoModal.getElementsByTagName('p')[1].innerText = precoPrato.replace('.', ',');

    let bebidaModal = document.querySelector(".bebida-modal");
    bebidaModal.getElementsByTagName('p')[0].innerText = nomeBebida;
    bebidaModal.getElementsByTagName('p')[1].innerText = precoBebida.replace('.', ',');

    let sobremesaModal = document.querySelector(".sobremesa-modal");
    sobremesaModal.getElementsByTagName('p')[0].innerText = nomeSobremesa;
    sobremesaModal.getElementsByTagName('p')[1].innerText = precoSobremesa.replace('.', ',');

    let valorModal = document.querySelector(".valor");
    valorModal.getElementsByTagName('p')[1].innerText = "R$ " + valor.toFixed(2).replace('.', ',');

    //Modifica o valor do display para que o modal apareca
    modal.style.display = 'Block';
}

/*
*  FUNCAO RESPONSAVEL POR FECHAR O MODAL
*/
function fecharModal(nomeModal) {
    let modal = document.getElementById(nomeModal);

    //Verifica se o modal existe 
    if (typeof modal === 'undefined' || modal === null) {
        return;
    }

    //Modifica o valor do display para que o modal desapareca
    modal.style.display = 'none';
}

/*
* FUNCAO RESPONSAVEL POR ESCOLHER O PRODUTO DE ACORDO COM O ELEMENTO PAI,
* CHAMA A FUNCAO SELECIONAR PRODUTO() E ATIVARBOTAO()
*/
function escolherProduto(elemento) {
    const elementoPai = elemento.parentElement.id;

    switch (elementoPai) {
        case "prato":
            prato = selecionarProduto(elementoPai, elemento);
            break;
        case "bebidas":
            bebida = selecionarProduto(elementoPai, elemento);
            break;
        case "sobremesa":
            sobremesa = selecionarProduto(elementoPai, elemento);
            break;
    }
    ativarBotao();
}

/*
*   FUNCAO RESPONSAVEL POR SELECIONAR O PRODUTO,
*   ATRIBUI AS CLASSES E RETORNA O ELEMENTO PARA A FUNCAO ESCOLHER PRODUTO
*/
function selecionarProduto(elementoPai, elemento) {
    let selecionado = document.querySelector(`#${elementoPai}`).querySelector(".selecionado");
    let icone = elemento.getElementsByTagName("ion-icon")[0];

    if (selecionado !== null && selecionado !== elemento) {
        let iconeSelecionado = selecionado.getElementsByTagName("ion-icon")[0];

        elemento.classList.add("selecionado");
        selecionado.classList.remove("selecionado");

        if (iconeSelecionado !== null && iconeSelecionado !== icone) {
            icone.classList.add("mostrar");
            icone.classList.remove("escondido");
            iconeSelecionado.classList.remove("mostrar");
            iconeSelecionado.classList.add("escondido");
        }
    }
    elemento.classList.add("selecionado");
    icone.classList.add("mostrar");
    icone.classList.remove("escondido");

    return elemento;
}

/*
*   FUNCAO RESPONSAVEL POR VERIFICAR SE TRES ITENS FORAM SELECIONADOS 
*   E AIVAR O BOTAO ATRIBUINDO A CLASSE, RETORNA UM BOOLEAN
*/
function ativarBotao() {
    const button = document.querySelector(".botao");
    button.disable = true;
    if (prato && bebida && sobremesa) {
        button.disable = false;
        button.innerText = "Fechar pedido";
        button.classList.add("ativado");
        return true;
    }
    return false;
}

/*
*   FUNCAO RESPONSAVEL POR CHAMAR O MODAL, PARA ISSO
*   UTILIZA O RETORNO DE ATIVARBOTAO()
*/
function chamaModal() {
    if (ativarBotao()) {
        abrirModal("div-modal",);
    }
}

/*
*  FUNCAO RESPONSAVEL POR PREPARAR A MENSAGEM E MANDA-LA PARA O WHATSAPP,
*  PARA TESTA-LA MELHOR UTILIZAR NUMERO DE TELEFONE VALIDO
*/
function mandarMensagemWhatsApp() {
    //Recupera os textos das variaveis
    let nomePrato = prato.getElementsByTagName('h4')[0].innerText;
    let nomeBebida = bebida.getElementsByTagName('h4')[0].innerText;
    let nomeSobremesa = sobremesa.getElementsByTagName('h4')[0].innerText;

    //Abre o prompt para receberinformacoes do usuario
    const nome = prompt("Qual é o seu nome?");
    const endereco = prompt("Qual é o seu endereço?");

    //Constroi a mensagem
    let mensagem = `Olá, gostaria de fazer o pedido: \n- Prato: ${nomePrato}\n - Bebida: ${nomeBebida}\n - Sobremesa: ${nomeSobremesa}\n Total: R$ ${valor.toFixed(2).replace('.', ',')} \n\nNome: ${nome} \nEndereço: ${endereco}`;
    //Permite que a mensagem se mantenha na formatacao dada
    mensagem = window.encodeURIComponent(mensagem);
    //Abre a pagina do whatsapp web - inserir numero valido para teste
    window.open(`https://wa.me/+5599999999999?text=${mensagem}`);
}