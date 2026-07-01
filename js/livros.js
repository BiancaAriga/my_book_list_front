import {
    buscarLivrosApi,
    criarLivroApi,
    removerLivroApi,
    editarLivroApi,
    buscarTrechosApi,
    criarTrechoApi,
    removerTrechoApi
} from "./api.js";

import {
    renderizarLivros,
    atualizarEstrelas,
    renderizarTrechos
} from "./ui.js";

import { getStatus } from "./status.js";

let livros = [];

export async function carregarLivros(status) {
    try {
        livros = await buscarLivrosApi(status);
        renderizarLivros(livros);
    } catch (error) {
        console.error(error);
    }
}

function carregarLivro(id) {
    const livro = livros.find(
        livro => livro.id === Number(id)
    );
    return livro;
}


document.addEventListener(
    "DOMContentLoaded",
    carregarLivros(status = null)
);

const form = document.getElementById("livroFormAdicionar");

form.addEventListener(
    "submit",
    cadastrarLivro
);

async function cadastrarLivro(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const livro = { ...Object.fromEntries(formData),
        rating: Number(formData.get("rating")) || null,
        data_inicio: formData.get("data_inicio") || null,
        data_fim: formData.get("data_fim") || null,
        categoria: formData.get("categoria") || null
    };
    
    try {
        setSubmitLoading(form, true);
        const novoLivro = await criarLivroApi(livro);

        form.reset();
        atualizarEstrelas(form);

        await carregarLivros();

        const modalElement = document.getElementById("adicionarModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

    } catch (error) {
        console.error(error);
    } finally {
        setSubmitLoading(form, false);
    }
}

const formEditar = document.getElementById("livroFormEditar");

formEditar.addEventListener(
    "submit",
    editarLivro
);

async function editarLivro(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const livro = { ...Object.fromEntries(formData),
        rating: Number(formData.get("rating")) || null,
        data_inicio: formData.get("data_inicio") || null,
        data_fim: formData.get("data_fim") || null,
        categoria: formData.get("categoria") || null
    };
    
    try {
        setSubmitLoading(formEditar, true);
        const novoLivro = await editarLivroApi(livro.id, livro);

        formEditar.reset();
        atualizarEstrelas(formEditar);
        await carregarLivros(getStatus());

        const modalElement = document.getElementById("editarModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

    } catch (error) {
        console.error(error);
    } finally {
        setSubmitLoading(formEditar, false);
    }
}


const formTrecho = document.getElementById("livroFormTrecho");

function setSubmitLoading(form, isLoading) {
    if (!form) return;
    const btn = form.querySelector('[type="submit"]');
    if (!btn) return;

    if (isLoading) {
        btn.disabled = true;
        if (!btn.dataset.originalHtml) btn.dataset.originalHtml = btn.innerHTML;
        btn.innerHTML = '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>';
    } else {
        btn.disabled = false;
        if (btn.dataset.originalHtml) {
            btn.innerHTML = btn.dataset.originalHtml;
            delete btn.dataset.originalHtml;
        }
    }
}

formTrecho.addEventListener(
    "submit",
    adicionarTrecho
);

async function adicionarTrecho(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const trecho = { ...Object.fromEntries(formData) };

    try {
        setSubmitLoading(formTrecho, true);
        await criarTrechoApi(trecho.livro_id, trecho);
        formTrecho.reset();

        const trechosAtualizados = await carregarTrechos(trecho.livro_id);
        renderizarTrechos(trechosAtualizados || []);
    } catch (error) {
        console.error(error);
    } finally {
        setSubmitLoading(formTrecho, false);
    }
}


const livrosLista = document.querySelector(".livros__lista");

livrosLista.addEventListener("click", (event) => {
    
    const button = event.target.closest("[data-action]");
    if (!button) return;

    event.preventDefault();

    const { action, id } = button.dataset;

    switch (action) {
        case "remover": {
            const confirmou = confirm(
                `Deseja realmente remover o livro ${button.dataset.nome}?`
            );

            if (!confirmou) return;

            removerLivro(id);
            break;
        }

        case "editar":
            abrirModalEdicao(id);
            break;

        case "trecho":
            abrirModalTrecho(id);
            break;
    }
});

const trechosLista = document.querySelector(".trechos__lista");

trechosLista.addEventListener("click", (event) => {
    const button = event.target.closest(".trechos__botao--remover");

    if (!button) return;

    event.preventDefault();

    const trechoId = button.dataset.id;
    
    const livroId = document.querySelector("#trechoModal #livro_id")?.value;

    if (!trechoId || !livroId) return;

    removerTrecho(livroId, trechoId);
});

async function removerLivro(id) {
    const livro = carregarLivro(id);

    if (!livro) return;
    
    try {
        await removerLivroApi(id);
        await carregarLivros(getStatus());
    } catch (error) {
        console.error(error);
    }
}

async function removerTrecho(livroId, trechoId) {
    const confirmou = confirm("Deseja realmente remover este trecho?");

    if (!confirmou) return;

    try {
        await removerTrechoApi(trechoId);
        const trechosAtualizados = await carregarTrechos(livroId);
        renderizarTrechos(trechosAtualizados || []);
    } catch (error) {
        console.error(error);
    }
}

function abrirModalEdicao(id) {
    const livro = carregarLivro(id);

    if (!livro) return;

    const formEditar = document.getElementById("livroFormEditar");

    formEditar.querySelectorAll('input[name="rating"]').forEach((radio) => {
        radio.checked = false;
    });

    const radioSelecionado = formEditar.querySelector(`input[name="rating"][value="${livro.rating}"]`);
    if (radioSelecionado) {
        radioSelecionado.checked = true;
    }

    document.querySelector("#editarModal #nome").value = livro.nome;
    document.querySelector("#editarModal #autor").value = livro.autor;
    document.querySelector("#editarModal #categoria").value = livro.categoria;
    document.querySelector("#editarModal #status").value = livro.status;
    document.querySelector("#editarModal #data_inicio").value = livro.data_inicio;
    document.querySelector("#editarModal #data_fim").value = livro.data_fim;
    document.querySelector("#editarModal #id").value = livro.id;

    atualizarEstrelas(formEditar);

    const modalElement = document.getElementById("editarModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

async function carregarTrechos(livro_id) {
    try {
        const trechos = await buscarTrechosApi(livro_id);
        return trechos;
    } catch (error) {
        console.error(error);
    }
}

async function abrirModalTrecho(id) {
    const livro = livros.find(
        livro => livro.id === Number(id)
    );

    if (!livro) return;
    
    document.querySelector("#trechoModal #livro_id").value = livro.id;

    const trechos = await carregarTrechos(livro.id);

    renderizarTrechos(trechos)

    const modalElement = document.getElementById("trechoModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}