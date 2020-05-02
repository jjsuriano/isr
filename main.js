$(document).ready(function(){
    $('#ingresos').keyup(function(){
        $('#isr').text(formatCurrency($('#ingresos').val()*0.1));
        $('#sal').text(formatCurrency(greaterThan5664($('#ingresos').val())));
        $('#ing').text(formatCurrency($('#ingresos').val()));
        $('#col').text(formatCurrency(greaterThan5664($('#ingresos').val())));
        $('#gra').text(formatCurrency(totalGravado($('#ingresos').val(), $('#gastos').val())));
        $('#ren').text(formatCurrency(rentaHonorarios($('#ingresos').val(), $('#gastos').val())));
        $('#dif').text(formatCurrency(diferencia($('#ingresos').val(), $('#gastos').val())));
    });

    $('#gastos').keyup(function(){
        $('#gas').text(formatCurrency($('#gastos').val()));
        $('#dif').text(formatCurrency(diferencia($('#ingresos').val(), $('#gastos').val())));
        $('#gra').text(formatCurrency(totalGravado($('#ingresos').val(), $('#gastos').val())));
        $('#ren').text(formatCurrency(rentaHonorarios($('#ingresos').val(), $('#gastos').val())));
    });

    $('#salario').keyup(function(){
      var opcion = $('input[name=salarioOpciones]:checked', '#tiempo').val()
      var salario = $('#salario').val();
        if (opcion == 1) {
          $('#sala').text(formatCurrency(salario));
          $('#isss').text(formatCurrency(isss(salario)));
          $('#afp').text(formatCurrency(afp(salario)));
          $('#imp').text(formatCurrency(rentaFijos(salario)));
          $('#grvd').text(formatCurrency(gravado(salario)));
          $('#lib').text(formatCurrency(libre(salario)));

          $('#salaq').text(formatCurrency(salario*2));
          $('#isssq').text(formatCurrency(isss(salario*2)));
          $('#afpq').text(formatCurrency(afp(salario*2)));
          $('#impq').text(formatCurrency(rentaFijos(salario*2)));
          $('#grvdq').text(formatCurrency(gravado(salario*2)));
          $('#libq').text(formatCurrency(libre(salario*2)));

          $('#salam').text(formatCurrency(salario*4));
          $('#isssm').text(formatCurrency(isss(salario*4)));
          $('#afpm').text(formatCurrency(afp(salario*4)));
          $('#impm').text(formatCurrency(rentaFijos(salario*4)));
          $('#grvdm').text(formatCurrency(gravado(salario*4)));
          $('#libm').text(formatCurrency(libre(salario*4)));

        } else if (opcion == 2) {


          $('#sala').text(formatCurrency(salario/2));
          $('#isss').text(formatCurrency(isss(salario/2)));
          $('#afp').text(formatCurrency(afp(salario/2)));
          $('#imp').text(formatCurrency(rentaFijos(salario/2)));
          $('#grvd').text(formatCurrency(gravado(salario/2)));
          $('#lib').text(formatCurrency(libre(salario/2)));

          $('#salaq').text(formatCurrency(salario));
          $('#isssq').text(formatCurrency(isss(salario)));
          $('#afpq').text(formatCurrency(afp(salario)));
          $('#impq').text(formatCurrency(rentaFijos(salario)));
          $('#grvdq').text(formatCurrency(gravado(salario)));
          $('#libq').text(formatCurrency(libre(salario)));

          $('#salam').text(formatCurrency(salario*2));
          $('#isssm').text(formatCurrency(isss(salario*2)));
          $('#afpm').text(formatCurrency(afp(salario*2)));
          $('#impm').text(formatCurrency(rentaFijos(salario*2)));
          $('#grvdm').text(formatCurrency(gravado(salario*2)));
          $('#libm').text(formatCurrency(libre(salario*2)));
        } else if (opcion == 3) {

          $('#sala').text(formatCurrency(salario/4));
          $('#isss').text(formatCurrency(isss(salario/4)));
          $('#afp').text(formatCurrency(afp(salario/4)));
          $('#imp').text(formatCurrency(rentaFijos(salario/4)));
          $('#grvd').text(formatCurrency(gravado(salario/4)));
          $('#lib').text(formatCurrency(libre(salario/4)));

          $('#salaq').text(formatCurrency(salario/2));
          $('#isssq').text(formatCurrency(isss(salario/2)));
          $('#afpq').text(formatCurrency(afp(salario/2)));
          $('#impq').text(formatCurrency(rentaFijos(salario/2)));
          $('#grvdq').text(formatCurrency(gravado(salario/2)));
          $('#libq').text(formatCurrency(libre(salario/2)));

          $('#salam').text(formatCurrency(salario));
          $('#isssm').text(formatCurrency(isss(salario)));
          $('#afpm').text(formatCurrency(afp(salario)));
          $('#impm').text(formatCurrency(rentaFijos(salario)));
          $('#grvdm').text(formatCurrency(gravado(salario)));
          $('#libm').text(formatCurrency(libre(salario)));
        }
    });

    $('#tiempo').on('change', function() {
        var opcion = $('input[name=salarioOpciones]:checked', '#tiempo').val()
        var salario = $('#salario').val();
          if (opcion == 1) {
            $('#sala').text(formatCurrency(salario));
            $('#isss').text(formatCurrency(isss(salario)));
            $('#afp').text(formatCurrency(afp(salario)));
            $('#imp').text(formatCurrency(rentaFijos(salario)));
            $('#grvd').text(formatCurrency(gravado(salario)));
            $('#lib').text(formatCurrency(libre(salario)));

            $('#salaq').text(formatCurrency(salario*2));
            $('#isssq').text(formatCurrency(isss(salario*2)));
            $('#afpq').text(formatCurrency(afp(salario*2)));
            $('#impq').text(formatCurrency(rentaFijos(salario*2)));
            $('#grvdq').text(formatCurrency(gravado(salario*2)));
            $('#libq').text(formatCurrency(libre(salario*2)));

            $('#salam').text(formatCurrency(salario*4));
            $('#isssm').text(formatCurrency(isss(salario*4)));
            $('#afpm').text(formatCurrency(afp(salario*4)));
            $('#impm').text(formatCurrency(rentaFijos(salario*4)));
            $('#grvdm').text(formatCurrency(gravado(salario*4)));
            $('#libm').text(formatCurrency(libre(salario*4)));

          } else if (opcion == 2) {


            $('#sala').text(formatCurrency(salario/2));
            $('#isss').text(formatCurrency(isss(salario/2)));
            $('#afp').text(formatCurrency(afp(salario/2)));
            $('#imp').text(formatCurrency(rentaFijos(salario/2)));
            $('#grvd').text(formatCurrency(gravado(salario/2)));
            $('#lib').text(formatCurrency(libre(salario/2)));

            $('#salaq').text(formatCurrency(salario));
            $('#isssq').text(formatCurrency(isss(salario)));
            $('#afpq').text(formatCurrency(afp(salario)));
            $('#impq').text(formatCurrency(rentaFijos(salario)));
            $('#grvdq').text(formatCurrency(gravado(salario)));
            $('#libq').text(formatCurrency(libre(salario)));

            $('#salam').text(formatCurrency(salario*2));
            $('#isssm').text(formatCurrency(isss(salario*2)));
            $('#afpm').text(formatCurrency(afp(salario*2)));
            $('#impm').text(formatCurrency(rentaFijos(salario*2)));
            $('#grvdm').text(formatCurrency(gravado(salario*2)));
            $('#libm').text(formatCurrency(libre(salario*2)));
          } else if (opcion == 3) {

            $('#sala').text(formatCurrency(salario/4));
            $('#isss').text(formatCurrency(isss(salario/4)));
            $('#afp').text(formatCurrency(afp(salario/4)));
            $('#imp').text(formatCurrency(rentaFijos(salario/4)));
            $('#grvd').text(formatCurrency(gravado(salario/4)));
            $('#lib').text(formatCurrency(libre(salario/4)));

            $('#salaq').text(formatCurrency(salario/2));
            $('#isssq').text(formatCurrency(isss(salario/2)));
            $('#afpq').text(formatCurrency(afp(salario/2)));
            $('#impq').text(formatCurrency(rentaFijos(salario/2)));
            $('#grvdq').text(formatCurrency(gravado(salario/2)));
            $('#libq').text(formatCurrency(libre(salario/2)));

            $('#salam').text(formatCurrency(salario));
            $('#isssm').text(formatCurrency(isss(salario)));
            $('#afpm').text(formatCurrency(afp(salario)));
            $('#impm').text(formatCurrency(rentaFijos(salario)));
            $('#grvdm').text(formatCurrency(gravado(salario)));
            $('#libm').text(formatCurrency(libre(salario)));
          }
    });

    var opcion = $('input[name=salarioOpciones]:checked', '#tiempo').val()



function formatCurrency(total) {
    var neg = false;
    if(total < 0) {
        neg = true;
        total = Math.abs(total);
    }

    if (isNaN(total) || total == 0) {
      return ""
    }

    return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}

function totalGravado(ingresos, gastos) {
    var salud = 800;
    var colegiatura = 800;
    var total_gravado = ingresos - salud - colegiatura - gastos;
    if (total_gravado < 0 || total_gravado <= 4064) {
      return 0;
    }
    return total_gravado;
}

function greaterThan5664(num) {
  if (num > 5664) {
    return 800;
  }
  return 0;
}

function rentaHonorarios(ingresos, gastos){
    var total_gravado = totalGravado(ingresos, gastos);
    var porcentaje = 0;
    var base = 0;
    var cuota = 0;
    var exceso = 0;
    if (total_gravado <= 4064) {
        return 0;
    } else if (4064.01 <= total_gravado && total_gravado <= 9142.86) {
        porcentaje = 0.1;
        base = 4064;
        cuota = 212.12;
        exceso = total_gravado - base

    } else if (9142.87 <= total_gravado && total_gravado <= 22857.14) {
        porcentaje = 0.2;
        base = 9142.86;
        cuota = 720;
        exceso = total_gravado - base
    } else if (total_gravado >= 22857.15) {
        porcentaje = 0.3;
        base = 22857.14;
        cuota = 3462.86;
        exceso = total_gravado - base
    }
    return (exceso * porcentaje) + cuota
}

function retenido(ingresos) {
  return ingresos * 0.1
}

function diferencia(ingresos, gastos) {
    var dif = rentaHonorarios(ingresos, gastos) - retenido(ingresos)
    return dif
}

function isss(salario) {
  if (salario > 1000) {
    return 1000*0.03
  }
  return salario*0.03
}

function afp(salario) {
  if (salario > 6500) {
    return 6500*0.0725
  }
  return salario*0.0725
}

function gravado(salario) {
  return salario - isss(salario) - afp(salario);
}

function rentaFijos(salario) {
  var total_gravado = salario - isss(salario) - afp(salario);
  var porcentaje = 0;
  var base = 0;
  var cuota = 0;
  var exceso = 0;
  var opcion = $('input[name=salarioOpciones]:checked', '#tiempo').val()
    console.log(opcion)
  console.log(total_gravado)

  if (opcion == 1) {
    if (total_gravado <= 118) {
        return 0;
    } else if (118.01 <= total_gravado && total_gravado <= 223.81) {
        porcentaje = 0.1;
        base = 118;
        cuota = 4.42;
        exceso = total_gravado - base

    } else if (223.82 <= total_gravado && total_gravado <= 509.52) {
        porcentaje = 0.2;
        base = 223.81;
        cuota = 15;
        exceso = total_gravado - base
    } else if (total_gravado >= 509.53) {
        porcentaje = 0.3;
        base = 509.52;
        cuota = 72.14;
        exceso = total_gravado - base
    }
  } else if (opcion == 2) {
    if (total_gravado <= 236) {
        return 0;
    } else if (236.01 <= total_gravado && total_gravado <= 447.62) {
        porcentaje = 0.1;
        base = 236;
        cuota = 8.83;
        exceso = total_gravado - base

    } else if (447.63 <= total_gravado && total_gravado <= 1019.05) {
        porcentaje = 0.2;
        base = 447.62;
        cuota = 30;
        exceso = total_gravado - base
    } else if (total_gravado >= 1019.06) {
        porcentaje = 0.3;
        base = 1019.05;
        cuota = 114.28;
        exceso = total_gravado - base
    }
  } else if (opcion == 3) {
    if (total_gravado <= 472) {
        return 0;
    } else if (472.01 <= total_gravado && total_gravado <= 895.24) {
        porcentaje = 0.1;
        base = 472;
        cuota = 17.67;
        exceso = total_gravado - base

    } else if (895.25 <= total_gravado && total_gravado <= 2038.10) {
        porcentaje = 0.2;
        base = 895.24;
        cuota = 50;
        exceso = total_gravado - base
    } else if (total_gravado >= 2038.11) {
        porcentaje = 0.3;
        base = 2038.10;
        cuota = 288.57;
        exceso = total_gravado - base
    }
  }
  return (exceso * porcentaje) + cuota
}
function libre(salario) {
  return salario - isss(salario) - afp(salario) - rentaFijos(salario)
}

});
