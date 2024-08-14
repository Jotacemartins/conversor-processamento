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
                return formatType === 'cpf' ? ['CPF'] : formatType === 'cnpj' ? ['CNPJ'] : ['Cartão'];
            }

            let cardNumber = String(row[0]);

            if (cardNumber.includes('E')) {
                cardNumber = Number(cardNumber).toFixed(0);
            }

            cardNumber = cardNumber.replace(/[^0-9]/g, '');

            if (formatType === "cartao1") {
                cardNumber = cardNumber.padStart(13, '0');
                return [formatCardNumber1(cardNumber)];
            } else if (formatType === "cpf") {
                cardNumber = cardNumber.padStart(11, '0');
                return [formatCPF(cardNumber)];
            } else if (formatType === "cartao2") {
                cardNumber = cardNumber.padStart(10, '0');
                return [formatCardNumber2(cardNumber)];
            } else if (formatType === "cnpj") {
                cardNumber = cardNumber.padStart(14, '0');
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
        link.textContent = 'Clique aqui para baixar o arquivo';
        link.style.display = 'block';

        document.getElementById('loadingMessage').style.display = 'none';
    };

    reader.readAsArrayBuffer(fileInput);
});

// Adiciona um evento ao input de arquivo para esconder o link de download quando um novo arquivo for selecionado
document.getElementById('fileInput').addEventListener('change', () => {
    document.getElementById('downloadLink').style.display = 'none'; // Esconde o link de download
});
