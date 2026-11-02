const chave = document.querySelector('.switch');
chave.onclick = () => {
  const ativo = chave.classList.toggle('ativo');
  chave.setAttribute('aria-pressed', String(ativo));
};

$('calcular').onclick = () => {
  const sal = num('salario'), tipo = $('tipo-rescisao').value;
  if (!(sal > 0)) return erro('Informe o salário base.');
  if (!tipo) return erro('Selecione o tipo de rescisão.');
  if (!$('data-admissao').value || !$('data-demissao').value) return erro('Informe as datas de admissão e demissão.');
  const adm = data($('data-admissao').value), dem = data($('data-demissao').value);
  if (dem < adm) return erro('A data de demissão não pode ser anterior à de admissão.');
  erro('');

  const dia = sal / 30;
  const diasAviso = Math.min(30 + 3 * anosCompletos(adm, dem), 90);

  // Aviso prévio: "Sim" = indenizado / não cumprido
  let aviso = 0, projecao = 0;
  if ($('aviso-previo').value === 'sim') {
    if (tipo === 'sem-justa-causa') { aviso = dia * diasAviso; projecao = diasAviso; }
    if (tipo === 'acordo') { projecao = Math.floor(diasAviso / 2); aviso = dia * projecao; }
    if (tipo === 'pedido') aviso = -sal; // desconto de 30 dias não cumpridos
  }

  const fim = somaDias(dem, projecao), fimExcl = somaDias(fim, 1); // aviso indenizado conta como tempo de serviço
  const mesmoMes = adm.getFullYear() === dem.getFullYear() && adm.getMonth() === dem.getMonth();
  const saldo = dia * Math.min(mesmoMes ? dem.getDate() - adm.getDate() + 1 : dem.getDate(), 30);
  const vencidas = $('ferias-vencidas').value === 'sim' ? sal * 4 / 3 : 0;

  const devido = tipo !== 'justa-causa'; // justa causa perde férias e 13º proporcionais
  const iniFerias = somaMeses(adm, 12 * anosCompletos(adm, fim));
  const feriasProp = devido && $('ferias-proporcionais').value === 'sim' ? sal / 12 * avos(iniFerias, fimExcl) * 4 / 3 : 0;
  const iniAno = new Date(fim.getFullYear(), 0, 1);
  const decimo = devido && $('decimo-terceiro').value === 'sim' ? sal / 12 * avos(adm > iniAno ? adm : iniAno, fimExcl) : 0;

  // Multa do FGTS sobre saldo estimado (8% ao mês, sem correção)
  const taxa = { 'sem-justa-causa': 0.4, acordo: 0.2 }[tipo] || 0;
  const multa = chave.classList.contains('ativo') ? taxa * sal * 0.08 * avos(adm, fimExcl, Infinity) : 0;

  set('saldo-salario', saldo);
  set('resultado-ferias-vencidas', vencidas);
  set('resultado-ferias', feriasProp);
  set('resultado-13', decimo);
  set('resultado-aviso', aviso);
  set('resultado-fgts', multa);
  set('total', saldo + vencidas + feriasProp + decimo + aviso + multa);
};
