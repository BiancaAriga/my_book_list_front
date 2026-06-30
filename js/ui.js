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
                        <button class="button button--editar" data-action="editar" data-id="${livro.id ?? ''}"><i class="fa-solid fa-pen me-2"></i>Editar</button>
                        <button class="button button--trecho" data-action="trecho" data-id="${livro.id ?? ''}"><i class="fa-solid fa-book me-2"></i>Trechos</button>
                        <button type="button" class="button button--remover livro__remover" data-action="remover" data-id="${livro.id ?? ''}" data-nome="${livro.nome ?? ''}"><i class="fa-solid fa-trash"></i></button>
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
                <i class="fa-regular fa-star livro__star livro__star--highlight"></i>
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

document.addEventListener('change', (event) => {
    const radio = event.target.closest('input[name="rating"]');
    if (!radio) return;

    const group = radio.closest('.rating_radios');
    if (!group) return;

    atualizarEstrelas(group);
});


function atualizarEstrelas(group) {
    if (!group) return;

    const rating = Number(
        group.querySelector('input[name="rating"]:checked')?.value || 0
    );

    group.querySelectorAll('.livro__star').forEach((star, index) => {
        star.classList.toggle('livro__star--highlight', index < rating);
    });
}

const tabs = document.querySelectorAll(".nav-link[data-status]");
tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(t =>
            t.classList.remove("active")
        );

        tab.classList.add("active");

        carregarLivros(tab.dataset.status)
    });
});