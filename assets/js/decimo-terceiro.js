function calcular() {
    const salario = numero('salario');
    const adicionais = numero('variaveis');
    const meses = numero('meses');

    if (salario <= 0) {
        mostrarErro('Informe um salário maior que zero.');
        return;
    }

    if (adicionais < 0) {
        mostrarErro('A média de adicionais não pode ser negativa.');
        return;
    }

    mostrarErro('');

    const total = (salario + adicionais) / 12 * meses;

    $('r-avos').textContent = meses + '/12';
    $('r-p1').textContent = formatarMoeda(total / 2);
    $('r-p2').textContent = formatarMoeda(total / 2);
    $('r-total').textContent = formatarMoeda(total);
}

$('calcular').addEventListener('click', calcular);
