function calcular() {
    const salario = numero('salario');
    const adicionais = numero('variaveis');
    const faltas = numero('faltas');

    if (salario <= 0) {
        mostrarErro('Informe um salário maior que zero.');
        return;
    }

    if (adicionais < 0 || faltas < 0) {
        mostrarErro('Use valores iguais ou maiores que zero.');
        return;
    }

    mostrarErro('');

    let dias = 0;
    if (faltas <= 5) {
        dias = 30;
    } else if (faltas <= 14) {
        dias = 24;
    } else if (faltas <= 23) {
        dias = 18;
    } else if (faltas <= 32) {
        dias = 12;
    }

    let diasVendidos = 0;
    if ($('abono').value === 'sim') {
        diasVendidos = Math.floor(dias / 3);
    }

    const valorDia = (salario + adicionais) / 30;
    const ferias = valorDia * (dias - diasVendidos);
    const abono = valorDia * diasVendidos;

    $('r-dias').textContent = dias + ' dias';
    $('r-ferias').textContent = formatarMoeda(ferias);
    $('r-abono').textContent = formatarMoeda(abono);
    $('r-terco').textContent = formatarMoeda((ferias + abono) / 3);
    $('r-total').textContent = formatarMoeda((ferias + abono) * 4 / 3);
}

$('calcular').addEventListener('click', calcular);
