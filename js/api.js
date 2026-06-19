const API_URL = "http://127.0.0.1:8000";

async function buscarLivrosApi() {
    const response = await fetch(`${API_URL}/livros`);

    if (!response.ok) {
        throw new Error("Erro ao buscar livros");
    }
    
    return await response.json();
}


async function criarLivroApi(livro) {
    const response = await fetch(`${API_URL}/livros`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(livro)
    });

    if (!response.ok) {
        throw new Error("Erro ao criar livro");
    }

    return await response.json();
}

async function removerLivroApi(id) {
    const response = await fetch(`${API_URL}/livros/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Erro ao remover livro");
    }
}