function abrirModal(nomeModal){
    let modal = document.getElementById(nomeModal);

    if(typeof modal == 'undefined' || modal === null){
        return;
    }
    modal.style.display = 'Block';
}

function fecharModal(nomeModal){
    let modal = document.getElementById(nomeModal);

    if(typeof modal == 'undefined' || modal === null){
        return;
    }
    modal.style.display = 'none';
}