'use strict';

import { getContatos, getContatos, postContato, putContato, deleteContato } from "./contatos.js";

const novoContato = {
    "nome": "Manoel Gomes",
    "celular": "11 96014-6666",
    "foto": "https://wp.abcdoabc.com.br/wp-content/uploads/2023/12/manoel-gomes-sbt.jpg",
    "email": "canetaAzul@gmail.com",
    "endereco": "Av. Pipoca com sal, 429",
    "cidade": "Chique-Chique"
}

// function criaContato(contato) {
//     let container = document.getElementById('containerUsers');
    
//     let containerUsuario = document.createElement('div');
//     containerUsuario.className = 'userItemContainer';

//     let containerId = document.createElement('div');
//     containerId.className = 'containerId';
//     let containerTextoId = document.createElement('p');
//     containerTextoId.textContent = contato.id;
//     containerId.appendChild(containerTextoId);

//     let containerNome = document.createElement('div');
//     containerNome.className = 'containerNome';
//     let containerTextoNome = document.createElement('p');
//     containerTextoNome.textContent = contato.nome;
//     containerNome.appendChild(containerTextoNome);

//     let containerImagem = document.createElement('div');
//     containerImagem.className = 'containerImagem';
//     let containerTextoImagem = document.createElement('p');
//     containerTextoImagem.textContent = contato.foto; 
//     containerImagem.appendChild(containerTextoImagem);

//     let containerAcoes = document.createElement('div');
//     containerAcoes.className = 'containerAcoes';

//     let btnAtualizar = document.createElement('div');
//     btnAtualizar.className = 'btnAtualizar containerEstilo';
//     let txtAtualizar = document.createElement('p');
//     txtAtualizar.textContent = 'Atualizar';
//     btnAtualizar.appendChild(txtAtualizar);

//     let btnDeletar = document.createElement('div');
//     btnDeletar.className = 'btnDeletar containerEstiloVermelho';
//     let txtDeletar = document.createElement('p');
//     txtDeletar.textContent = 'Deletar';
//     btnDeletar.appendChild(txtDeletar);

//     containerAcoes.appendChild(btnAtualizar);
//     containerAcoes.appendChild(btnDeletar);

//     containerUsuario.append(containerId, containerNome, containerImagem, containerAcoes);
//     container.append(containerUsuario);
// }


function criaContato(contato) {

    let container = document.getElementById('containerUsers');
    
        let card = document.createElement('div');
        card.className = 'userItemContainer';
    
        let foto = document.createElement('img');
        foto.src = contato.foto;
        foto.className = 'fotoUser';
    
        let info = document.createElement('div');
        info.className = 'infoUser';
    
        let nome = document.createElement('h3');
        nome.textContent = contato.nome;
    
        let email = document.createElement('p');
        email.textContent = contato.email;
    
        let cidade = document.createElement('p');
        cidade.textContent = contato.cidade;
    
        let endereco = document.createElement('p');
        endereco.textContent = contato.endereco;
    
        info.append(nome, email, cidade, endereco);
    
        let containerAcoes = document.createElement('div');
        containerAcoes.className = 'containerAcoes';
    
        let btnAtualizar = document.createElement('button');
        btnAtualizar.className = 'btnAtualizar';
        btnAtualizar.textContent = '✏️';
    
        let btnDeletar = document.createElement('button');
        btnDeletar.className = 'btnDeletar';
        btnDeletar.textContent = '🗑️';
    
        btnDeletar.addEventListener('click', async () => {
    
            await deleteContato(contato.id);
    
            card.remove();
        });
    
       
        btnAtualizar.addEventListener('click', () => {
    
            document.getElementById('nome').value = contato.nome;
            document.getElementById('imagem').value = contato.foto;
            document.getElementById('email').value = contato.email;
            document.getElementById('cidade').value = contato.cidade;
            document.getElementById('endereco').value = contato.endereco;
    
            editarContato(contato.id);
        });
    
     containerAcoes.append(btnAtualizar, btnDeletar);
    
     card.append(foto, info, containerAcoes);
    
    container.append(card);
}

const btnSalvar = document.getElementById('salvar');

btnSalvar.addEventListener('click', salvarContato);

async function salvarContato() {

    const contato = {

        nome: document.getElementById('nome').value,
        foto: document.getElementById('fotoInput').files,
        email: document.getElementById('email').value,
        cidade: document.getElementById('cidade').value,
        endereco: document.getElementById('endereco').value
    };

    const novoContato = await postContato(contato);

    criaContato(novoContato);
}

async function preencherLista() {
    let contatos = await getContatos();

    contatos.forEach((contato) =>{
        if(contato.nome != '' && contato.foto != '' && contato.nome != null && contato.nome != undefined && contato.foto != null && contato.foto != undefined) {
            criaContato(contato);
        }
    });
}

function editarContato(id) {

    btnSalvar.textContent = 'Atualizar';

    btnSalvar.onclick = async () => {

        const contatoAtualizado = {

            nome: document.getElementById('nome').value,
            foto: document.getElementById('imagem').value,
            email: document.getElementById('email').value,
            cidade: document.getElementById('cidade').value,
            endereco: document.getElementById('endereco').value
        };

        await putContato(id, contatoAtualizado);

        location.reload();
    };
}



