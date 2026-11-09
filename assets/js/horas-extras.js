function calcular() {
    const salario = numero('salario');
    const carga = numero('carga');
    const horas50 = numero('he50');
    const horas100 = numero('he100');
    const horasNoturnas = numero('noturnas');
    const diasUteis = numero('uteis');
    const domingos = numero('domingos');

    if (salario <= 0 || carga <= 0) {
        mostrarErro('Informe um salário e uma carga horária maiores que zero.');
        return;
    }

    if (horas50 < 0 || horas100 < 0 || horasNoturnas < 0 || diasUteis < 0 || domingos < 0) {
        mostrarErro('As horas e quantidades de dias não podem ser negativas.');
        return;
    }

    mostrarErro('');

    const valorHora = salario / carga;
    const extras50 = valorHora * 1.5 * horas50;
    const extras100 = valorHora * 2 * horas100;
    const adicionalNoturno = valorHora * 0.2 * horasNoturnas;

    let dsr = 0;
    if (diasUteis > 0) {
        dsr = (extras50 + extras100 + adicionalNoturno) / diasUteis * domingos;
    }

    $('r-hora').textContent = formatarMoeda(valorHora);
    $('r-he50').textContent = formatarMoeda(extras50);
    $('r-he100').textContent = formatarMoeda(extras100);
    $('r-noturno').textContent = formatarMoeda(adicionalNoturno);
    $('r-dsr').textContent = formatarMoeda(dsr);
    $('r-total').textContent = formatarMoeda(extras50 + extras100 + adicionalNoturno + dsr);
}

$('calcular').addEventListener('click', calcular);
