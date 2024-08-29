Number Formatter
Descrição
Este projeto é um conversor que transforma números em formatos específicos de CPF, CNPJ e cartões de crédito. Além disso, inclui uma interface de front-end bonita e intuitiva para que os usuários possam acessar e utilizar a ferramenta diretamente no navegador.

Funcionalidades
Conversão para CPF: Converte uma sequência de números em um formato de CPF (XXX.XXX.XXX-XX).
Conversão para CNPJ: Converte uma sequência de números em um formato de CNPJ (XX.XXX.XXX/XXXX-XX).
Conversão para Cartão de Crédito: Converte uma sequência de números em um formato de cartão de crédito (XXXX XXXX XXXX XXXX).
Exemplo de Uso
javascript
Copiar código
const formatNumber = require('path/to/your/module');

// Exemplo para CPF
const cpf = formatNumber.toCPF('12345678901');
console.log(cpf); // Saída: 123.456.789-01

// Exemplo para CNPJ
const cnpj = formatNumber.toCNPJ('12345678000195');
console.log(cnpj); // Saída: 12.345.678/0001-95

// Exemplo para Cartão de Crédito
const creditCard = formatNumber.toCreditCard('1234567812345678');
console.log(creditCard); // Saída: 1234 5678 1234 5678
Instalação
Clone este repositório e instale as dependências necessárias:

bash
Copiar código
git clone
cd
npm install
Como Usar
Após a instalação, você pode importar o módulo em seu projeto e utilizá-lo para formatar números ou acessar a interface de front-end para uso direto:

bash
Copiar código
npm start
Depois, acesse http://localhost:3000 no seu navegador para usar a interface gráfica.

Tecnologias Utilizadas
JavaScript: Linguagem principal utilizada para a lógica de formatação.
Node.js: Ambiente de execução para JavaScript.
React: Usado para construir o front-end.
CSS: Para estilização da interface de usuário.
Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.

Autor
Jhonatha Cunha Martins
