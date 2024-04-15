const readline = require('readline');
const { Sala } = require('./helpers/roomClass');
const { validarSala } = require('./helpers/validation');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let salasDisponiveis = [
    new Sala(1, "Reunião", 20),
    new Sala(2, "Treinamento", 20),
    new Sala(3, "Conferência", 20)
];

console.log('\nBem-vindo ao sistema de reserva de salas!');

function visualizarSalasDisponiveis() {
    Sala.imprimirSalasDisponiveis(salasDisponiveis);
    menu();
}

function agendarReserva() {
    Sala.imprimirSalasDisponiveis(salasDisponiveis);
    rl.question('\nDigite o ID da sala que deseja reservar: ', (idSala) => {
        const salaSelecionada = salasDisponiveis.find(sala => sala.id === parseInt(idSala));
        if (!salaSelecionada) {
            console.log("Sala não encontrada.");
            menu();
            return;
        }
        rl.question('\nInforme a data em que deseja agendar sua reserva (no formato "DD/MM"): ', (dataInicio) => {
            rl.question('Informe a hora de início da reserva (no formato "HH:MM"): ', (horaInicio) => {
                rl.question('Informe a data de término da reserva (no formato "DD/MM"): ', (dataFim) => {
                    rl.question('Informe a hora de término da reserva (no formato "HH:MM"): ', (horaFim) => {
                        rl.question('Informe a quantidade de pessoas que irão participar da reunião: ', (quantidadePessoas) => {
                            if (!validarSala(salasDisponiveis, salaSelecionada.tipo, quantidadePessoas, dataInicio, horaInicio, dataFim, horaFim)) {
                                console.log("Parâmetros inválidos.");
                                menu();
                                return;
                            } 
                            salaSelecionada.reservar(dataInicio, horaInicio, dataFim, horaFim, quantidadePessoas);
                            menu();
                        });
                    });
                });
            });
        });
    });
}


function editarReserva() {
    Sala.imprimirSalasDisponiveis(salasDisponiveis);
    rl.question('\nDigite o ID da sala da qual deseja editar a reserva: ', (idSala) => {
        const salaSelecionada = salasDisponiveis.find(sala => sala.id === parseInt(idSala));
        if (!salaSelecionada) {
            console.log("Sala não encontrada.");
            menu();
            return;
        }
        rl.question('\nDigite o número da reserva que deseja editar: ', (numeroReserva) => {
            const indiceReserva = parseInt(numeroReserva) - 1;
            const reservaParaEditar = salaSelecionada.reservas[indiceReserva];
            if (!reservaParaEditar) {
                console.log("Reserva não encontrada.");
                menu();
                return;
            }
            rl.question('\nDigite a nova data e hora de início da reserva (no formato "DD/MM HH:MM"): ', (novaDataInicio) => {
                rl.question('Digite a nova data e hora de término da reserva (no formato "DD/MM HH:MM"): ', (novaDataFim) => {
                    rl.question('Digite a nova quantidade de pessoas: ', (novaQuantidadePessoas) => {
                        if (!validarSala(salasDisponiveis, salaSelecionada.tipo, novaQuantidadePessoas, novaDataInicio.split(' ')[0], novaDataInicio.split(' ')[1], novaDataFim.split(' ')[0], novaDataFim.split(' ')[1])) {
                            console.log("Parâmetros inválidos.");
                            menu();
                            return;
                        }
                        salaSelecionada.reservas[indiceReserva] = {
                            dataInicio: novaDataInicio.split(' ')[0],
                            horaInicio: novaDataInicio.split(' ')[1],
                            dataFim: novaDataFim.split(' ')[0],
                            horaFim: novaDataFim.split(' ')[1],
                            quantidadePessoas: novaQuantidadePessoas
                        };
                        console.log("Reserva editada com sucesso!");
                        menu();
                    });
                });
            });
        });
    });
}

function cancelarReserva() {
    Sala.imprimirSalasDisponiveis(salasDisponiveis);
    rl.question('\nDigite o ID da sala da qual deseja cancelar a reserva: ', (idSala) => {
        const salaSelecionada = salasDisponiveis.find(sala => sala.id === parseInt(idSala));
        if (!salaSelecionada) {
            console.log("Sala não encontrada.");
            menu();
            return;
        }
        rl.question('\nDigite o número da reserva que deseja cancelar: ', (numeroReserva) => {
            const indiceReserva = parseInt(numeroReserva) - 1;
            salaSelecionada.cancelarReserva(indiceReserva);
            menu();
        });
    });
}

function menu() {
    rl.question('\nEscolha uma opção:\n1. Visualizar salas disponíveis\n2. Agendar uma nova reserva\n3. Cancelar reserva\n4. Editar reserva\n5. Sair\n\n', (opcao) => {
        switch (opcao) {
            case '1':
                visualizarSalasDisponiveis();
                break;
            case '2':
                agendarReserva();
                break;
            case '3':
                cancelarReserva();
                break;
            case '4':
                editarReserva();
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log("Opção inválida.");
                menu();
                break;
        }
    });
}
menu();
