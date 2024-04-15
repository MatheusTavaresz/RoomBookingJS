# Algoritmo para Determinar Salas Disponíveis para Reserva
Este projeto consiste em um sistema de reserva de salas, onde os usuários podem visualizar as salas disponíveis, agendar novas reservas, cancelar reservas existentes e editar informações de reservas já agendadas.
#### Funcionalidades Principais:
- Visualizar Salas Disponíveis: Os usuários podem ver a lista de salas disponíveis para reserva, incluindo informações como número da sala, tipo e capacidade.
- Agendar Reserva: Os usuários podem selecionar uma sala disponível e agendar uma nova reserva, fornecendo informações como data, hora de início e término da reserva, além do número de pessoas que participarão da reunião.
- Editar Reserva: Os usuários têm a capacidade de editar informações de uma reserva existente, como data, hora de início e término, e quantidade de pessoas.
- Cancelar Reserva: Os usuários podem cancelar uma reserva existente, removendo-a da lista de reservas da sala selecionada.

#### Validações Implementadas:
##### Validação de Data e Hora:
- As datas de início e término da reserva devem estar no formato "DD/MM".
- As horas de início e término da reserva devem estar no formato "HH:MM".
- A data de início da reserva não pode ser anterior à data atual.
- A data de início da reserva deve ser anterior à data de término.

##### Validação de Capacidade da Sala:
- A quantidade de pessoas na reserva não pode exceder a capacidade da sala selecionada.

##### Validação de Disponibilidade da Sala:
- Verifica se a sala selecionada está disponível no intervalo de tempo especificado para a reserva.
- Evita que uma reserva seja sobreposta a reservas existentes na mesma sala.

### Funcionamento Interno:
- O sistema utiliza classes em JavaScript para representar salas e reservas.
- As validações são feitas utilizando métodos estáticos e de instância das classes, garantindo modularidade e reutilização de código.
- A interface de linha de comando (CLI) é implementada usando o módulo readline do Node.js para interação com o usuário.

## Como Executar:
- Certifique-se de ter o Node.js instalado em seu sistema.
- Clone o repositório e navegue até o diretório raiz.
- Execute o comando ```node index.js``` para iniciar o sistema de reserva de salas.