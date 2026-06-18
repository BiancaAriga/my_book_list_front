async function carregarLivros() {
    try {
        const livros = await buscarLivros();
        renderizarLivros(livros);
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener(
    "DOMContentLoaded",
    carregarLivros
);

const form = document.getElementById("livroForm");

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
        const novoLivro = await criarLivro(livro);

        form.reset();

        await carregarLivros();

        const modalElement = document.getElementById("adicionarModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        
    } catch (error) {
        console.error(error);
    }
}