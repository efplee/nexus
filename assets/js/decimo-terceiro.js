$('calcular').onclick = () => {
  const sal = num('salario'), extra = num('variaveis'), meses = num('meses');
  if (!(sal > 0)) return erro('Informe um salário maior que zero.');
  if (extra < 0) return erro('A média de adicionais não pode ser negativa.');
  erro('');
  const total = (sal + extra) / 12 * meses;
  set('r-avos', `${meses}/12`);
  set('r-p1', total / 2);
  set('r-p2', total / 2);
  set('r-total', total);
};
