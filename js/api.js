const API_URL = "http://127.0.0.1:8000";

async function buscarLivrosApi(status) {
    let response;
    if (status) {
        response = await fetch(`${API_URL}/livros?status=${status}`);
    } else {
        response = await fetch(`${API_URL}/livros`);
    }
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

async function editarLivroApi(id, livro) {
    const response = await fetch(`${API_URL}/livros/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(livro)
    });

    if (!response.ok) {
        throw new Error("Erro ao editar livro");
    }

    return await response.json();
}

async function criarTrechoApi(livro_id, trecho) {
    const response = await fetch(`${API_URL}/trechos/${livro_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trecho)
    });

    if (!response.ok) {
        throw new Error("Erro ao criar trecho");
    }

    return await response.json();
}
