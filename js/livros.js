let livros = [];

async function carregarLivros() {
    try {
        livros = await buscarLivrosApi();
        renderizarLivros(livros);
    } catch (error) {
        console.error(error);
    }
}


document.addEventListener(
    "DOMContentLoaded",
    carregarLivros
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
        const novoLivro = await criarLivroApi(livro);

        form.reset();
        atualizarEstrelas(form);

        await carregarLivros();

        const modalElement = document.getElementById("adicionarModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

    } catch (error) {
        console.error(error);
    }
}

const formEditar = document.getElementById("editarModalLabel");

formEditar.addEventListener(
    "submit",
    editarLivro
);

/*async function editarLivro(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const livro = { ...Object.fromEntries(formData),
        rating: Number(formData.get("rating")) || null,
        data_inicio: formData.get("data_inicio") || null,
        data_fim: formData.get("data_fim") || null,
        categoria: formData.get("categoria") || null
    };
    
    try {
        const novoLivro = await criarLivroApi(livro);

        form.reset();
        atualizarEstrelas(form);

        await carregarLivros();

        const modalElement = document.getElementById("adicionarModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

    } catch (error) {
        console.error(error);
    }
}
*/
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

        case "notas":
            abrirNotas(id);
            break;
    }
});

async function removerLivro(id) {
    try {
        await removerLivroApi(id);
        await carregarLivros();
    } catch (error) {
        console.error(error);
    }
}

function abrirModalEdicao(id) {
    const livro = livros.find(
        livro => livro.id === Number(id)
    );

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
    document.querySelector("#editarModal #data_inicio").value = livro.data_inicio;
    document.querySelector("#editarModal #data_fim").value = livro.data_fim;
    document.querySelector("#editarModal #id").value = livro.id;

    atualizarEstrelas(formEditar);

    const modalElement = document.getElementById("editarModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}