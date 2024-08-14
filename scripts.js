// Função de login simples para demonstração
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'processamento' && password === '0433@') {
        alert('Login bem-sucedido!');
        // Exibir o conversor após login bem-sucedido
        document.querySelector('.container').style.display = 'block';
        document.getElementById('loginContainer').style.display = 'none';
    } else {
        alert('Usuário ou senha incorretos.');
    }
}

// Alternância de tema (claro/escuro)
document.getElementById('themeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    
    // Alterna o ícone entre lua e sol
    const isDarkMode = document.body.classList.contains('dark-mode');
    this.textContent = isDarkMode ? '☀️' : '🌙';
});

// Função para converter arquivos
document.getElementById('convertButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput').files[0];
    const formatType = document.getElementById('formatSelect').value;

    if (!fileInput) {
        alert('Por favor, selecione um arquivo!');
        return;
    }

    document.getElementById('loadingMessage').style.display = 'block';

    const reader = new FileReader();

    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(sheet, {header: 1, defval: '', raw: true});

        const updatedRows = rows.map((row, index) => {
            if (index === 0) {
                // Definindo o cabeçalho com base no tipo de formatação escolhido
                return formatType === 'cpf' ? ['CPF'] : formatType === 'cnpj' ? ['CNPJ'] : ['Cartão'];
            }

            let cardNumber = String(row[0]).replace(/[^0-9]/g, ''); // Remove caracteres não numéricos

            if (formatType === "cartao1") {
                cardNumber = cardNumber.padStart(13, '0'); // Preenche com zeros à esquerda até 13 dígitos
                return [formatCardNumber1(cardNumber)];
            } else if (formatType === "cpf") {
                cardNumber = cardNumber.padStart(11, '0'); // Preenche com zeros à esquerda até 11 dígitos
                return [formatCPF(cardNumber)];
            } else if (formatType === "cartao2") {
                cardNumber = cardNumber.padStart(10, '0'); // Preenche com zeros à esquerda até 10 dígitos
                return [formatCardNumber2(cardNumber)];
            } else if (formatType === "cnpj") {
                cardNumber = cardNumber.padStart(14, '0'); // Preenche com zeros à esquerda até 14 dígitos
                return [formatCNPJ(cardNumber)];
            }

            return row;
        });

        const newSheet = XLSX.utils.aoa_to_sheet(updatedRows);
        const newWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Dados Convertidos');

        const newFileName = 'Dados Convertidos.xlsx';
        const wbout = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });

        const link = document.getElementById('downloadLink');
        link.href = URL.createObjectURL(blob);
        link.download = newFileName;
        link.textContent = 'Baixar Arquivo';
        link.style.display = 'block';

        document.getElementById('loadingMessage').style.display = 'none';
    };

    reader.readAsArrayBuffer(fileInput);
});

// Adiciona um evento ao input de arquivo para esconder o link de download quando um novo arquivo for selecionado
document.getElementById('fileInput').addEventListener('change', () => {
    document.getElementById('downloadLink').style.display = 'none'; // Esconde o link de download
    document.getElementById('loadingMessage').style.display = 'none'; // Esconde a mensagem de carregamento
});

// Funções para formatar números
function formatCardNumber1(num) {
    return `${num.slice(0, 2)}.${num.slice(2, 4)}.${num.slice(4, 12)}-${num.slice(12)}`;
}

function formatCardNumber2(num) {
    return `${num.slice(0, 1)}.${num.slice(1, 4)}.${num.slice(4, 7)}.${num.slice(7)}`;
}

function formatCPF(num) {
    return `${num.slice(0, 3)}.${num.slice(3, 6)}.${num.slice(6, 9)}-${num.slice(9)}`;
}

function formatCNPJ(num) {
    return `${num.slice(0, 2)}.${num.slice(2, 5)}.${num.slice(5, 8)}/${num.slice(8, 12)}-${num.slice(12)}`;
}
