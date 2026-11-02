$('calcular').onclick = () => {
  const sal = num('salario'), carga = num('carga');
  if (!(sal > 0) || !(carga > 0)) return erro('Informe um salário e uma carga horária maiores que zero.');
  if ([num('he50'), num('he100'), num('noturnas'), num('uteis'), num('domingos')].some(valor => valor < 0)) return erro('As horas e quantidades de dias não podem ser negativas.');
  erro('');
  const hora = sal / carga;
  const he50 = hora * 1.5 * num('he50'), he100 = hora * 2 * num('he100'), noturno = hora * 0.2 * num('noturnas');
  const dsr = num('uteis') > 0 ? (he50 + he100 + noturno) / num('uteis') * num('domingos') : 0;
  set('r-hora', hora);
  set('r-he50', he50);
  set('r-he100', he100);
  set('r-noturno', noturno);
  set('r-dsr', dsr);
  set('r-total', he50 + he100 + noturno + dsr);
};
