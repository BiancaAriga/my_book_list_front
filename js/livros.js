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