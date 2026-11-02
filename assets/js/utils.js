// Funções usadas pelas calculadoras.
// atalho para document.getElementById
const $ = id => document.getElementById(id);
// lê um campo numérico; devolve 0 se estiver vazio ou inválido
const num = id => Number($(id)?.value) || 0;
// formata um número como moeda (R$ 1.234,56)
const brl = value => value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});
// escreve o resultado na tela; números viram moeda automaticamente
const set = (id, value) => {
    const elemento = $(id);
    if (elemento) elemento.textContent = typeof value === 'number' ? brl(value) : value;
};
// mostra (ou limpa) a mensagem de erro do formulário
const erro = mensagem => {
    const elemento = $('erro');
    if (elemento) elemento.textContent = mensagem || '';
};

// converte o texto do input date ("2024-03-15") em Date, sem problema de fuso horário
const data = valor => {
    const [ano, mes, dia] = valor.split('-').map(Number);
    return new Date(ano, mes - 1, dia);
};
// soma dias a uma data (aceita negativo)
const somaDias = (dataInicial, quantidade) =>
    new Date(dataInicial.getFullYear(), dataInicial.getMonth(), dataInicial.getDate() + quantidade);

// soma meses a uma data; se o dia não existir no mês de destino, usa o último dia dele
const somaMeses = (dataInicial, quantidade) => {
    const resultado = new Date(dataInicial.getFullYear(), dataInicial.getMonth() + quantidade, 1);
    const ultimoDia = new Date(resultado.getFullYear(), resultado.getMonth() + 1, 0).getDate();
    resultado.setDate(Math.min(dataInicial.getDate(), ultimoDia));
    return resultado;
};

// quantos aniversários de contrato já se completaram entre as duas datas
const anosCompletos = (inicio, fim) => {
    let anos = 0;
    while (somaMeses(inicio, 12 * (anos + 1)) <= fim) anos++;
    return anos;
};

// Conta meses completos; períodos restantes de 15 dias ou mais contam como um mês.
const avos = (inicio, fim, limite = 12) => {
    let meses = (fim.getFullYear() - inicio.getFullYear()) * 12 + fim.getMonth() - inicio.getMonth();
    if (somaMeses(inicio, meses) > fim) meses--;

    const diasRestantes = Math.round((fim - somaMeses(inicio, meses)) / 864e5);
    return Math.max(0, Math.min(limite, meses + (diasRestantes >= 15 ? 1 : 0)));
};
