export function formatarData(data) {
    if (!data) return "";

    return new Date(data).toLocaleDateString("pt-BR");
}