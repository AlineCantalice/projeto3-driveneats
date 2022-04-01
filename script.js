function abrirModal(nomeModal) {
    let modal = document.getElementById(nomeModal);

    if (typeof modal == 'undefined' || modal === null) {
        return;
    }
    modal.style.display = 'Block';
}

function fecharModal(nomeModal) {
    let modal = document.getElementById(nomeModal);

    if (typeof modal == 'undefined' || modal === null) {
        return;
    }
    modal.style.display = 'none';
}

function escolherProduto(elemento) {

    const elementoPai = elemento.parentElement;
    switch (elementoPai.id) {
        case "prato":
            const prato = selecionarProduto(elementoPai, elemento);
            console.log(prato);
            break;
        case "bebidas":
            const bebida = selecionarProduto(elementoPai, elemento);
            console.log(bebida);
            break;
        case "sobremesa":
            const sobremesa = selecionarProduto(elementoPai, elemento);
            console.log(sobremesa);
            break;
    }

}

function selecionarProduto(elementoPai, elemento) {
    const lista = elementoPai.children;
    const selecionado = document.querySelector(".selecionado");
    for (let i = 0; i < lista.length; i++) {
        if (selecionado !== null || selecionado === elemento) {
            elemento.classList.add("selecionado");
            lista[i].classList.remove("selecionado");
        }
    }
    elemento.classList.add("selecionado");
    return elemento;
}