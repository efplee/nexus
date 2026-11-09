function $(id) {
    return document.getElementById(id);
}

function numero(id) {
    return parseFloat($(id).value) || 0;
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function mostrarErro(mensagem) {
    $('erro').textContent = mensagem;
}

function lerData(texto) {
    const partes = texto.split('-');
    return new Date(partes[0], partes[1] - 1, partes[2]);
}

function somarDias(data, dias) {
    return new Date(data.getFullYear(), data.getMonth(), data.getDate() + dias);
}

function somarMeses(data, meses) {
    const novaData = new Date(data.getFullYear(), data.getMonth() + meses, 1);
    const ultimoDia = new Date(novaData.getFullYear(), novaData.getMonth() + 1, 0).getDate();
    novaData.setDate(Math.min(data.getDate(), ultimoDia));
    return novaData;
}

function anosCompletos(inicio, fim) {
    let anos = 0;
    while (somarMeses(inicio, 12 * (anos + 1)) <= fim) {
        anos++;
    }
    return anos;
}

function contarMeses(inicio, fim) {
    let meses = (fim.getFullYear() - inicio.getFullYear()) * 12 + fim.getMonth() - inicio.getMonth();
    if (somarMeses(inicio, meses) > fim) {
        meses--;
    }

    const diasQueSobram = Math.round((fim - somarMeses(inicio, meses)) / (1000 * 60 * 60 * 24));
    if (diasQueSobram >= 15) {
        meses++;
    }

    return Math.max(0, meses);
}

function avos(inicio, fim) {
    return Math.min(12, contarMeses(inicio, fim));
}
