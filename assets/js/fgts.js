const hoje = new Date();
$('data-ref').value = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;

$('calcular').onclick = () => {
  const sal = num('salario');
  if (!(sal > 0)) return erro('Informe um salário maior que zero.');
  if (num('saldo') < 0) return erro('O saldo do FGTS não pode ser negativo.');
  if (!$('data-admissao').value || !$('data-ref').value) return erro('Informe as datas de admissão e de referência.');
  const adm = data($('data-admissao').value), ref = data($('data-ref').value);
  if (ref < adm) return erro('A data de referência não pode ser anterior à admissão.');
  erro('');
  const meses = avos(adm, somaDias(ref, 1), Infinity), mensal = sal * 0.08;
  const saldo = $('saldo').value !== '' ? num('saldo') : mensal * meses;
  set('r-mensal', mensal);
  set('r-meses', `${meses} meses`);
  set('r-saldo', saldo);
  set('r-multa40', saldo * 0.4);
  set('r-multa20', saldo * 0.2);
  set('r-total', saldo * 1.4);
};
