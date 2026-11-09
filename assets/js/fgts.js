const hoje = new Date();
const mesAtual = String(hoje.getMonth() + 1).padStart(2, '0');
const diaAtual = String(hoje.getDate()).padStart(2, '0');
$('data-ref').value = hoje.getFullYear() + '-' + mesAtual + '-' + diaAtual;

function calcular() {
    const salario = numero('salario');

    if (salario <= 0) {
        mostrarErro('Informe um salário maior que zero.');
        return;
    }

    if (numero('saldo') < 0) {
        mostrarErro('O saldo do FGTS não pode ser negativo.');
        return;
    }

    if (!$('data-admissao').value || !$('data-ref').value) {
        mostrarErro('Informe as datas de admissão e de referência.');
        return;
    }

    const admissao = lerData($('data-admissao').value);
    const referencia = lerData($('data-ref').value);

    if (referencia < admissao) {
        mostrarErro('A data de referência não pode ser anterior à admissão.');
        return;
    }

    mostrarErro('');

    const meses = contarMeses(admissao, somarDias(referencia, 1));
    const depositoMensal = salario * 0.08;

    let saldo = depositoMensal * meses;
    if ($('saldo').value !== '') {
        saldo = numero('saldo');
    }

    $('r-mensal').textContent = formatarMoeda(depositoMensal);
    $('r-meses').textContent = meses + ' meses';
    $('r-saldo').textContent = formatarMoeda(saldo);
    $('r-multa40').textContent = formatarMoeda(saldo * 0.4);
    $('r-multa20').textContent = formatarMoeda(saldo * 0.2);
    $('r-total').textContent = formatarMoeda(saldo * 1.4);
}

$('calcular').addEventListener('click', calcular);
