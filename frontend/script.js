function send(){
    const malhou = document.getElementById('acad').checked;
    const leu = document.getElementById('read').checked;
    const trabalhou = document.getElementById('work').checked;
    const bebeuAgua = document.getElementById('water').checked;
    const estudou = document.getElementById('study').checked;

    const date = new Date();
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`;

    const dados = {
        malhou: malhou,
        leu: leu,
        trabalhou: trabalhou,
        bebeu_agua: bebeuAgua,
        data_registro: dataFormatada,
        estudou: estudou 
    };
     
    fetch('http://localhost:3000/atividade', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(dados) 
    })
    .then(response => response.json()) 
    .then(data => {
        console.log('Sucesso:', data);
        alert('Enviado com sucesso!')
    })
    .catch((error) => {
        console.error('Erro:', error); 
    });
}
