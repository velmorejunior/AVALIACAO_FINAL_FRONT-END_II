"use strict";
const formRecado = document.querySelector("#recado");
const corpoTabela = document.querySelector('#corpo-tabela');
let usuario = undefined;
let editando = false;
let indiceEdicao = 0;
let indiceApagar = 0;
const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioAtual") || "");
function definirID() {
    let max = 0;
    const recados = recuperarRecados();
    recados.forEach(recado => {
        if (recado.id > max) {
            max = recado.id;
        }
    });
    return max + 1;
}
function recuperarRecados() {
    const recados = JSON.parse(localStorage.getItem(usuarioLogado) ?? '[]');
    return recados;
}
function gravarNaStorage(recado) {
    const lista = recuperarRecados();
    lista.push(recado);
    localStorage.setItem(usuarioLogado, JSON.stringify(lista));
}
function salvaRecado(event) {
    event.preventDefault();
    const descricao = formRecado.descricao.value;
    const detalhamento = formRecado.detalhamento.value;
    if (!descricao || !detalhamento) {
        alert("Preencher todos os campos");
        return;
    }
    if (editando) {
        const recados = recuperarRecados();
        recados[indiceEdicao].descricao = formRecado.descricao.value;
        recados[indiceEdicao].detalhamento = formRecado.detalhamento.value;
        localStorage.setItem(usuarioLogado, JSON.stringify(recados));
        editando = false;
    }
    else {
        const novoRecado = {
            id: definirID(),
            descricao: descricao,
            detalhamento: detalhamento,
        };
        gravarNaStorage(novoRecado);
    }
    preencherTabela();
    formRecado.reset();
}
function buscaID(id) {
    indiceApagar = id;
}
const preencherTabela = () => {
    const recados = recuperarRecados();
    corpoTabela.innerHTML = "";
    for (const recado of recados) {
        corpoTabela.innerHTML += `
        <tr>
            <td>${recado.id}</td>
            <td>${recado.descricao}</td=>
            <td>${recado.detalhamento}</td>
            <td class="botoes-tabela">
                <button class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#modalDeletaRecado" onclick ="buscaID(${recado.id})">Apagar</button>                
                <button class="btn btn-edit" onClick="editaRecado(${recado.id})">Editar</button>
        </tr>        
        `;
    }
};
const deletaRecado = (id) => {
    const recados = recuperarRecados();
    const indiceRecado = recados.findIndex((recado) => recado.id === id);
    if (indiceRecado < 0) {
        return;
    }
    recados.splice(indiceRecado, 1);
    localStorage.setItem(usuarioLogado, JSON.stringify(recados));
    preencherTabela();
};
const editaRecado = (id) => {
    const recados = recuperarRecados();
    const indiceRecado = recados.findIndex((recado) => recado.id === id);
    if (indiceRecado < 0) {
        return;
    }
    formRecado.descricao.value = recados[indiceRecado].descricao;
    formRecado.detalhamento.value = recados[indiceRecado].detalhamento;
    editando = true;
    indiceEdicao = indiceRecado;
};
formRecado.addEventListener('submit', salvaRecado);
document.addEventListener('DOMContentLoaded', preencherTabela);
