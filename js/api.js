const API_URL = "http://127.0.0.1:8000";

export async function buscarLivrosApi(status) {
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


export async function criarLivroApi(livro) {
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

export async function removerLivroApi(id) {
    const response = await fetch(`${API_URL}/livros/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Erro ao remover livro");
    }
}

export async function editarLivroApi(id, livro) {
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

export async function buscarTrechosApi(livro_id) {
    const response = await fetch(`${API_URL}/livros/${livro_id}/trechos`);
    
    if (!response.ok) {
        throw new Error("Erro ao buscar trechos");
    }
    
    return await response.json();
}

export async function criarTrechoApi(livro_id, trecho) {
    const response = await fetch(`${API_URL}/livros/${livro_id}/trechos`, {
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

export async function removerTrechoApi(trecho_id) {
    const response = await fetch(`${API_URL}/trechos/${trecho_id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Erro ao remover trecho");
    }
}
