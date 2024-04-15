function validarSala(salas, tipoDesejado, quantidadePessoas, horarioDesejado) {
    if (!Array.isArray(salas) || salas.length === 0) {
        console.error("Lista de salas disponíveis vazia.");
        return false;
    }

    const tiposSalas = salas.map(sala => sala.tipo);
    if (!tiposSalas.includes(tipoDesejado)) {
        console.error("Tipo de sala desejado não é válido.");
        return false;
    }

    const salaSelecionada = salas.find(sala => sala.tipo === tipoDesejado);
    if (quantidadePessoas > salaSelecionada.capacidade) {
        console.error("A quantidade de pessoas excede a capacidade da sala.");
        return false;
    }
    
    return true;
}

module.exports = {
    validarSala
};
