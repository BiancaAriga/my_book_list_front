function criarCardLivro(livro) {
    let categoriaHtml = "";
    if (livro.categoria) {
        categoriaHtml = `<p class="livro__categoria d-inline-block mb-2">${livro.categoria}</p>`;
    } else {
        categoriaHtml = `<p class="livro__categoria livro__categoria--vazio d-inline-block mb-2">&nbsp;</p>`;
    }
    return `
        <li class="livros__item">
            <article class="card livro border-0 shadow-sm rounded-4">
                <div class="card-body">
                    <header class="d-flex flex-column align-items-start mb-2">
                        <h3 class="card-title fw-bold mb-1">${livro.nome}</h3>
                        <p class="card-text">por ${livro.autor}</p>
                    </header>
                    <section class="mb-2">
                        <p class="mb-2">
                            ${criarEstrelas(livro.rating)}
                        </p>
                        ${categoriaHtml}
                        <div class="livro__datas d-flex flex-column">
                            <time datetime="${livro.data_inicio ? livro.data_inicio : ''}">
                                <i class="fa-regular fa-calendar"></i>
                                Início: ${livro.data_inicio ? livro.data_inicio : ''}
                            </time>
                            <time datetime="${livro.data_fim ? livro.data_fim : ''}">
                                <i class="fa-regular fa-calendar"></i>
                                Fim: ${livro.data_fim ? livro.data_fim : ''}
                            </time>
                        </div>
                    </section>
                    <footer>
                        <button class="button button--editar"><i class="fa-solid fa-pen me-2"></i>Editar</button>
                        <button class="button"><i class="fa-solid fa-book me-2"></i>Notas</button>
                        <button class="button button--remover"><i class="fa-solid fa-trash"></i></button>
                    </footer>
                </div>
            </article>
        </li>
    `;
}

function criarEstrelas(rating) {
    let estrelas = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            estrelas += `
                <i class="fa-solid fa-star livro__star livro__star--highlight"></i>
            `;
        } else {
            estrelas += `
                <i class="fa-regular fa-star livro__star"></i>
            `;
        }
    }
    return estrelas;
}

function renderizarLivros(livros) {

    const container = document.querySelector(".livros__lista");

    container.innerHTML = "";

    livros.forEach((livro) => {

        container.innerHTML +=
            criarCardLivro(livro);
    });
}