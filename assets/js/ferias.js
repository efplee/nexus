$('calcular').onclick = () => {
  const sal = num('salario'), extra = num('variaveis'), faltas = num('faltas');
  if (!(sal > 0)) return erro('Informe um salário maior que zero.');
  if (extra < 0 || faltas < 0) return erro('Use valores iguais ou maiores que zero.');
  erro('');
  // CLT, art. 130: faltas injustificadas reduzem os dias de férias
  const dias = faltas <= 5 ? 30 : faltas <= 14 ? 24 : faltas <= 23 ? 18 : faltas <= 32 ? 12 : 0;
  const abonoDias = $('abono').value === 'sim' ? Math.floor(dias / 3) : 0;
  const dia = (sal + extra) / 30, ferias = dia * (dias - abonoDias), abono = dia * abonoDias;
  set('r-dias', `${dias} dias`);
  set('r-ferias', ferias);
  set('r-abono', abono);
  set('r-terco', (ferias + abono) / 3);
  set('r-total', (ferias + abono) * 4 / 3);
};
