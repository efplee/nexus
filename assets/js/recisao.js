const botaoMulta = document.querySelector('.switch');

botaoMulta.addEventListener('click', function () {
    botaoMulta.classList.toggle('ativo');
    botaoMulta.setAttribute('aria-pressed', botaoMulta.classList.contains('ativo'));
});

function calcular() {
    const salario = numero('salario');
    const tipo = $('tipo-rescisao').value;

    if (salario <= 0) {
        mostrarErro('Informe o salário base.');
        return;
    }

    if (!tipo) {
        mostrarErro('Selecione o tipo de rescisão.');
        return;
    }

    if (!$('data-admissao').value || !$('data-demissao').value) {
        mostrarErro('Informe as datas de admissão e demissão.');
        return;
    }

    const admissao = lerData($('data-admissao').value);
    const demissao = lerData($('data-demissao').value);

    if (demissao < admissao) {
        mostrarErro('A data de demissão não pode ser anterior à de admissão.');
        return;
    }

    mostrarErro('');

    const valorDia = salario / 30;
    const diasAviso = Math.min(30 + 3 * anosCompletos(admissao, demissao), 90);

    let aviso = 0;
    let diasProjetados = 0;

    if ($('aviso-previo').value === 'sim') {
        if (tipo === 'sem-justa-causa') {
            aviso = valorDia * diasAviso;
            diasProjetados = diasAviso;
        } else if (tipo === 'acordo') {
            diasProjetados = Math.floor(diasAviso / 2);
            aviso = valorDia * diasProjetados;
        } else if (tipo === 'pedido') {
            aviso = -salario;
        }
    }

    const dataFinal = somarDias(demissao, diasProjetados);
    const diaSeguinte = somarDias(dataFinal, 1);

    const mesmoMes = admissao.getFullYear() === demissao.getFullYear() && admissao.getMonth() === demissao.getMonth();
    let diasTrabalhados = demissao.getDate();
    if (mesmoMes) {
        diasTrabalhados = demissao.getDate() - admissao.getDate() + 1;
    }
    const saldoSalario = valorDia * Math.min(diasTrabalhados, 30);

    let feriasVencidas = 0;
    if ($('ferias-vencidas').value === 'sim') {
        feriasVencidas = salario * 4 / 3;
    }

    const temDireito = tipo !== 'justa-causa';

    let feriasProporcionais = 0;
    if (temDireito && $('ferias-proporcionais').value === 'sim') {
        const inicioPeriodo = somarMeses(admissao, 12 * anosCompletos(admissao, dataFinal));
        feriasProporcionais = salario / 12 * avos(inicioPeriodo, diaSeguinte) * 4 / 3;
    }

    let decimoTerceiro = 0;
    if (temDireito && $('decimo-terceiro').value === 'sim') {
        const inicioAno = new Date(dataFinal.getFullYear(), 0, 1);
        const inicioContagem = admissao > inicioAno ? admissao : inicioAno;
        decimoTerceiro = salario / 12 * avos(inicioContagem, diaSeguinte);
    }

    let taxaMulta = 0;
    if (tipo === 'sem-justa-causa') {
        taxaMulta = 0.4;
    } else if (tipo === 'acordo') {
        taxaMulta = 0.2;
    }

    let multaFgts = 0;
    if (botaoMulta.classList.contains('ativo')) {
        multaFgts = taxaMulta * salario * 0.08 * contarMeses(admissao, diaSeguinte);
    }

    $('saldo-salario').textContent = formatarMoeda(saldoSalario);
    $('resultado-ferias-vencidas').textContent = formatarMoeda(feriasVencidas);
    $('resultado-ferias').textContent = formatarMoeda(feriasProporcionais);
    $('resultado-13').textContent = formatarMoeda(decimoTerceiro);
    $('resultado-aviso').textContent = formatarMoeda(aviso);
    $('resultado-fgts').textContent = formatarMoeda(multaFgts);
    $('total').textContent = formatarMoeda(saldoSalario + feriasVencidas + feriasProporcionais + decimoTerceiro + aviso + multaFgts);
}

$('calcular').addEventListener('click', calcular);
