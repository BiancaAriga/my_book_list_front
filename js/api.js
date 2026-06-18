const API_URL = "http://127.0.0.1:8000";

async function buscarLivros() {
    const response = await fetch(`${API_URL}/livros`);
    return await response.json();
}


async function criarLivro(livro) {
    const response = await fetch(`${API_URL}/livros`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(livro)
    });
    return await response.json();
}