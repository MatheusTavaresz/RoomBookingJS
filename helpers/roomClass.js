class Sala {
    constructor(id, tipo, capacidade) {
        this.id = id;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.reservas = [];
    }

    reservar(dataInicio, horaInicio, dataFim, horaFim, quantidadePessoas) {
        const currentDate = new Date();
        const dataInicioObj = this.createDateObj(dataInicio, horaInicio);
        const dataFimObj = this.createDateObj(dataFim, horaFim);

        if (dataInicioObj < currentDate) {
            console.error("A data/hora de início da reunião deve ser maior ou igual à data/hora atual");
            return;
        }

        if (dataInicioObj >= dataFimObj) {
            console.error("A data/hora de início da reunião deve ser anterior à data/hora de fim");
            return;
        }

        if (this.isReservaOverlapping(dataInicioObj, dataFimObj)) {
            console.error("Há uma reserva existente entre os horários selecionados.");
            return;
        }

        if (this.isDuplicateReservation(dataInicio, horaInicio)) {
            console.error("Já existe uma reserva para a mesma data e hora de início.");
            return;
        }

        this.reservas.push({ dataInicio, horaInicio, dataFim, horaFim, quantidadePessoas });
        console.log("Reserva realizada com sucesso!");
    }

    editarReserva(indice, dataInicio, horaInicio, dataFim, horaFim, quantidadePessoas) {
        if (indice < 0 || indice >= this.reservas.length) {
            console.log("Índice de reserva inválido.");
            return;
        }
        this.reservas[indice] = { dataInicio, horaInicio, dataFim, horaFim, quantidadePessoas };
        console.log("Reserva editada com sucesso!");
    }

    cancelarReserva(indice) {
        if (indice < 0 || indice >= this.reservas.length) {
            console.log("Índice inválido.");
            return;
        }
        this.reservas.splice(indice, 1);
        console.log("Reserva cancelada com sucesso!");
    }

    static imprimirSalasDisponiveis(salas) {
        console.log("Salas disponíveis para reserva:");
        salas.forEach(sala => {
            console.log(`\nNúmero da sala: ${sala.id}\nTipo da sala: ${sala.tipo}\nCapacidade: ${sala.capacidade}`);
            sala.imprimirReservas();
        });
    }

    imprimirReservas() {
        console.log(" Reservas:");
        if (this.reservas.length === 0) {
            console.log(" - Nenhuma reserva.");
        } else {
            this.reservas.forEach((reserva, indice) => {
                console.log(`${indice + 1}: ${reserva.dataInicio} das ${reserva.horaInicio} até ${reserva.dataFim} as ${reserva.horaFim} - ${reserva.quantidadePessoas} pessoas`);
            });
        }
    }

    createDateObj(data, hora) {
        const [dia, mes] = data.split('/');
        const [horaStr, minutoStr] = hora.split(':');
        const ano = new Date().getFullYear();
        return new Date(ano, mes - 1, dia, horaStr, minutoStr);
    }

    isDuplicateReservation(data, hora) {
        return this.reservas.some(reserva => reserva.dataInicio === data && reserva.horaInicio === hora);
    }

    isReservaOverlapping(dataInicioObj, dataFimObj) {
        return this.reservas.some(reserva => {
            const reservaInicio = this.createDateObj(reserva.dataInicio, reserva.horaInicio);
            const reservaFim = this.createDateObj(reserva.dataFim, reserva.horaFim);
            return (dataInicioObj >= reservaInicio && dataInicioObj < reservaFim) ||
                   (dataFimObj > reservaInicio && dataFimObj <= reservaFim) ||
                   (dataInicioObj <= reservaInicio && dataFimObj >= reservaFim);
        });
    }
}

module.exports = {
    Sala
};
