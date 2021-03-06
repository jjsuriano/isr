$(document).ready(function () {
  $("#starting-page").hide();
  $("#input-page").hide();
  $("#input-box-2").hide();
  $("#input-box-3").hide();
  $("#input-box-4").hide();
  $("#input-box-5").hide();
  $("#results-page").hide();

  let option = 0;
  let income = null;
  let expenses = null;
  let retirement = null;
  let health = null;
  let taxes = null;

  // = = = = = GENERAL = = = =

  $(".input-number").before("$");

  function formatCurrency(total) {
    let neg = false;
    if (total < 0) {
      neg = true;
      total = Math.abs(total);
    }

    if (isNaN(total) || total == 0) {
      return "$0.00";
    }

    return (
      (neg ? "-$" : "$") +
      parseFloat(total, 10)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        .toString()
    );
  }

  function resultsHeader(option, income, expenses, health, retirement) {
    let header = "";

    if (option == 1) {
      header =
        'Tu <span class="highlight-yellow">salario mensual</span> es <span class="highlight-blue">' +
        formatCurrency(income) +
        "</span>.";
    }

    if (option == 2) {
      header =
        'Tus <span class="highlight-yellow">ingresos</span> en el año fueron <span class="highlight-blue">' +
        formatCurrency(income) +
        "</span>.";
    }

    if (option == 3) {
      if (expenses == 0) {
        header =
          'Tus <span class="highlight-yellow">ingresos</span> en el año fueron <span class="highlight-blue">' +
          formatCurrency(income) +
          "</span> y no tuviste gastos en el año.";
      } else {
        header =
          'Tus <span class="highlight-yellow">ingresos</span> en el año fueron <span class="highlight-blue">' +
          formatCurrency(income) +
          '</span> y tus gastos en el año fueron <span class="highlight-blue">' +
          formatCurrency(expenses) +
          "</span>.";
      }
    }
    return header;
  }

  function resultsText1(results) {
    let salario = results[0];
    let isss = results[2];
    let afp = results[3];
    let porcentaje = parseInt(results[4] * 100);
    let exceso = formatCurrency(results[5]);
    let cuota = formatCurrency(results[6]);
    let impuestos = results[7];
    let liquidos = formatCurrency(salario - isss - afp - impuestos);

    let tramo = "";

    if (results[1] == 1) {
      tramo = "I";
      let part1 =
        'Significa que tu aportación al <span class="highlight-yellow">ISSS</span> es de <span class="highlight-blue">' +
        formatCurrency(isss) +
        '</span> y tu aportación al <span class="highlight-yellow">AFP</span> es de <span class="highlight-blue" id="result-afp">' +
        formatCurrency(afp) +
        "</span>. ";
      let part2 =
        '<br><br>Esto me dice que entras en el <span class="highlight-yellow" id="result-tramo">tramo ' +
        tramo +
        '</span> para el cálculo de tus impuestos. Si caes en este tramo <span class="highlight-blue">no tienes que pagar impuestos</span>.';
      let part3 =
        '<br><br>Si restamos todo esto de tu salario mensual, a ti <span class="highlight-green">te quedan ' +
        liquidos +
        "</span> para comprar y ahorrar.";
      return part1 + part2 + part3;
    } else if (results[1] == 2) {
      tramo = "II";
    } else if (results[1] == 3) {
      tramo = "III";
    } else if (results[1] == 4) {
      tramo = "IV";
    }

    let part1 =
      'Significa que tu aportación al <span class="highlight-yellow">ISSS</span> es de <span class="highlight-blue">' +
      formatCurrency(isss) +
      '</span> y tu aportación al <span class="highlight-yellow">AFP</span> es de <span class="highlight-blue" id="result-afp">' +
      formatCurrency(afp) +
      "</span>. ";
    let part2 =
      '<br><br>Esto me dice que entras en el <span class="highlight-yellow" id="result-tramo">tramo ' +
      tramo +
      '</span> para el cálculo de tus impuestos. Tus impuestos se dividen en dos partes, la cuota fija de <span class="highlight-yellow" id="result-cuota">' +
      cuota +
      '</span> y el <span class="highlight-yellow" id="result-porcentaje">' +
      porcentaje +
      '%</span> de <span class="highlight-yellow" id="result-porcion">' +
      exceso +
      '</span>, sumando esas dos partes nos da un total de <span class="highlight-blue" id="result-impuestos">' +
      formatCurrency(impuestos) +
      '</span> de <span class="highlight-yellow">impuestos</span>.';
    let part3 =
      '<br><br>Si restamos todo esto de tu salario mensual, a ti <span class="highlight-green">te quedan ' +
      liquidos +
      "</span> para comprar y ahorrar.";
    return part1 + part2 + part3;
  }

  function resultsText2(results) {
    let isss = results[2];
    let afp = results[3];
    let porcentaje = parseInt(results[4] * 100);
    let exceso = formatCurrency(results[5]);
    let cuota = formatCurrency(results[6]);
    let retenido = results[7];
    let impuestos = results[8];
    let part1 = "";
    let part2 = "";
    let part3 = "";

    if (option == 2) {
      if (results[9] == 1) {
        tramo = "I";
        part1 =
          'Durante todo el año tu aportaste <span class="highlight-blue">' +
          formatCurrency(isss) +
          ' </span> al <span class="highlight-yellow">ISSS</span> y <span class="highlight-blue">' +
          formatCurrency(afp) +
          '</span> al <span class="highlight-yellow">AFP</span>. <br><br>No nos olvidemos de los <span class="highlight-blue">' +
          formatCurrency(1600) +
          '</span> de gastos automáticos que corresponden a <span class="highlight-yellow">colegiatura</span> y <span class="highlight-yellow">salud</span>.';
        part2 =
          '<br><br>Esto me dice que entras en el <span class="highlight-yellow">tramo ' +
          tramo +
          '</span> para el cálculo de tus impuestos. Si caes en este tramo <span class="highlight-blue">no tienes que pagar impuestos</span>.';
        part3 =
          '<br><br>Entonces tu <span class="highlight-green">recibirás todas tus retenciones</span>, que son <span class="highlight-green">' +
          formatCurrency(retenido) +
          "</span> al final del año.";
        return part1 + part2 + part3;
      } else if (results[9] == 2) {
        tramo = "II";
      } else if (results[9] == 3) {
        tramo = "III";
      } else if (results[9] == 4) {
        tramo = "IV";
      }
      let resultado = impuestos - retenido;
      if (resultado < 0) {
        resultado = resultado * -1;
        part3 =
          '<br><br>Tus retenciones dan un total de <span class="highlight-blue">' +
          formatCurrency(retenido) +
          '</span> y si sacas la diferencia te darás cuenta que <span class="highlight-green"> recibirás ' +
          formatCurrency(resultado) +
          "</span> al final del año.";
      } else if (resultado > 0) {
        part3 =
          '<br><br>Tus retenciones dan un total de <span class="highlight-blue">' +
          formatCurrency(retenido) +
          '</span> y si sacas la diferencia te darás cuenta que <span class="highlight-red">te toca pagar ' +
          formatCurrency(resultado) +
          "</span> al final del año.";
      } else {
        part3 =
          '<br><br>Tus retenciones dan un total de <span class="highlight-blue">' +
          formatCurrency(retenido) +
          "</span>, entonces esto me dice que tu no debes ni te deben.";
      }
      part1 =
        'Durante todo el año tu aportaste <span class="highlight-blue">' +
        formatCurrency(isss) +
        ' </span> al <span class="highlight-yellow">ISSS</span> y <span class="highlight-blue">' +
        formatCurrency(afp) +
        '</span> al <span class="highlight-yellow">AFP</span>. <br><br>No nos olvidemos de los <span class="highlight-blue">' +
        formatCurrency(1600) +
        '</span> de gastos automáticos que corresponden a <span class="highlight-yellow">colegiatura</span> y <span class="highlight-yellow">salud</span>.';
      part2 =
        '<br><br>Esto me dice que entras en el <span class="highlight-yellow">tramo ' +
        tramo +
        '</span> para el cálculo de tus impuestos. Tus impuestos se dividen en dos partes, la cuota fija de <span class="highlight-yellow">' +
        cuota +
        '</span> y el <span class="highlight-yellow" id="result-porcentaje">' +
        porcentaje +
        '%</span> de <span class="highlight-yellow">' +
        exceso +
        '</span>, sumando esas dos partes nos da un total de <span class="highlight-blue">' +
        formatCurrency(impuestos) +
        '</span> de <span class="highlight-yellow">impuestos</span>.';

      return part1 + part2 + part3;
    }

    if (option == 3) {
      if (results[9] == 1) {
        tramo = "I";
        part1 =
          'A tus gastos hay que agregarle los <span class="highlight-blue">' +
          formatCurrency(1600) +
          '</span> automáticos que corresponden a <span class="highlight-blue">colegiatura</span> y <span class="highlight-blue">salud</span>.';
        part2 =
          '<br><br>Esto me dice que entras en el <span class="highlight-yellow">tramo ' +
          tramo +
          '</span> para el cálculo de tus impuestos. Si caes en este tramo <span class="highlight-blue">no tienes que pagar impuestos</span>.';
        part3 =
          '<br><br>Entonces tu <span class="highlight-green">recibirás todas tus retenciones</span>, que son <span class="highlight-green">' +
          formatCurrency(retenido) +
          "</span> al final del año.";
        return part1 + part2 + part3;
      } else if (results[9] == 2) {
        tramo = "II";
      } else if (results[9] == 3) {
        tramo = "III";
      } else if (results[9] == 4) {
        tramo = "IV";
      }
      let resultado = impuestos - retenido;
      if (resultado < 0) {
        resultado = resultado * -1;
        part3 =
          '<br><br>Tus <span class="highlight-blue">retenciones</span> dan un total de <span class="highlight-blue">' +
          formatCurrency(retenido) +
          '</span> y si sacas la diferencia te darás cuenta que <span class="highlight-green">recibirás ' +
          formatCurrency(resultado) +
          "</span> al final del año.";
      } else if (resultado > 0) {
        part3 =
          '<br><br>Tus <span class="highlight-blue">retenciones</span> dan un total de <span class="highlight-blue">' +
          formatCurrency(retenido) +
          '</span> y si sacas la diferencia te darás cuenta que <span class="highlight-red">te toca pagar ' +
          formatCurrency(resultado) +
          "</span> al final del año.";
      } else {
        part3 =
          '<br><br>Tus <span class="highlight-blue">retenciones</span> dan un total de <span class="highlight-blue">' +
          formatCurrency(retenido) +
          "</span>, entonces esto me dice que tu no debes ni te deben.";
      }
      part1 =
        'A tus gastos hay que agregarle los <span class="highlight-blue">' +
        formatCurrency(1600) +
        '</span> automáticos que corresponden a <span class="highlight-blue">colegiatura</span> y <span class="highlight-blue">salud</span>.';
      part2 =
        '<br><br>Esto me dice que entras en el <span class="highlight-yellow" id="result-tramo">tramo ' +
        tramo +
        '</span> para el cálculo de tus impuestos. Tus impuestos se dividen en dos partes, la cuota fija de <span class="highlight-yellow" id="result-cuota">' +
        cuota +
        '</span> y el <span class="highlight-yellow">' +
        porcentaje +
        '%</span> de <span class="highlight-yellow">' +
        exceso +
        '</span>, sumando esas dos partes nos da un total de <span class="highlight-blue">' +
        formatCurrency(impuestos) +
        '</span> de <span class="highlight-blue">impuestos</span>.';

      return part1 + part2 + part3;
    }
  }

  // = = = = = CON DEPENDENCIA MENSUAL = = = = =
  function impuesto_planilla_mensual(salario) {
    let isss = 0;
    let afp = 0;

    if (salario > 1000) {
      isss = 1000 * 0.03;
    } else {
      isss = salario * 0.03;
    }

    if (salario > 6500) {
      afp = 6500 * 0.0725;
    } else {
      afp = salario * 0.0725;
    }

    const gravado = salario - isss - afp;
    let tramo = 0;
    let porcentaje = 0;
    let base = 0;
    let cuota = 0;
    let exceso = 0;

    if (gravado <= 472) {
      tramo = 1;
      return [salario, tramo, isss, afp, 0.0, 0.0, 0.0, 0.0, 0.0];
    } else if (472.01 <= gravado && gravado <= 895.24) {
      tramo = 2;
      porcentaje = 0.1;
      base = 472;
      cuota = 17.67;
      exceso = gravado - base;
    } else if (895.25 <= gravado && gravado <= 2038.1) {
      tramo = 3;
      porcentaje = 0.2;
      base = 895.24;
      cuota = 60;
      exceso = gravado - base;
    } else if (gravado >= 2038.11) {
      tramo = 4;
      porcentaje = 0.3;
      base = 2038.1;
      cuota = 288.57;
      exceso = gravado - base;
    }
    let impuesto = exceso * porcentaje + cuota;
    return [salario, tramo, isss, afp, porcentaje, exceso, cuota, impuesto];
  }

  // = = = = = IMPUESTOS ANUALES = = = = =

  function impuestos_anual(ingresos, gastos, isss, afp, retenido) {
    let salud = 800;
    let colegiatura = 800;
    let gravado = ingresos - isss - afp - salud - colegiatura - gastos;
    let tramo = 0;
    let porcentaje = 0;
    let base = 0;
    let cuota = 0;
    let exceso = 0;

    if (option == 3) {
      retenido = ingresos * 0.1;
    }

    if (gravado <= 4064) {
      tramo = 1;
      return [ingresos, gastos, isss, afp, 0, 0, 0, retenido, 0, tramo];
    } else if (4064.01 <= gravado && gravado <= 9142.86) {
      tramo = 2;
      porcentaje = 0.1;
      base = 4064;
      cuota = 212.12;
      exceso = gravado - base;
    } else if (9142.87 <= gravado && gravado <= 22857.14) {
      tramo = 3;
      porcentaje = 0.2;
      base = 9142.86;
      cuota = 720;
      exceso = gravado - base;
    } else if (gravado >= 22857.15) {
      tramo = 4;
      porcentaje = 0.3;
      base = 22857.14;
      cuota = 3462.86;
      exceso = gravado - base;
    }
    let impuesto = exceso * porcentaje + cuota;
    return [
      ingresos,
      gastos,
      isss,
      afp,
      porcentaje,
      exceso,
      cuota,
      retenido,
      impuesto,
      tramo,
    ];
  }

  $("#start").click(function () {
    $("#welcome").fadeOut(500, function () {
      $("#starting-page").fadeIn(500);
    });
  });

  $("#choice-1").click(function () {
    $("#note-1").html(
      $("#note-1")
        .text()
        .replace(
          $("#note-1").text(),
          '<span class="highlight-blue">Tu salario mensual.</span> <br><br>Salario también es conocido como renumeración, sueldo o estipendio.'
        )
    );

    $("#starting-page").fadeOut(500, function () {
      $("#input-page").fadeIn(500, function () {
        $("#input-1").focus();
      });
    });
    option = 1;
  });

  $("#choice-2").click(function () {
    $("#note-1").html(
      $("#note-1")
        .text()
        .replace(
          $("#note-1").text(),
          '<span class="highlight-blue">Tus ingresos en todo el año.</span>'
        )
    );

    $("#starting-page").fadeOut(500, function () {
      $("#input-page").fadeIn(500);
    });
    option = 2;
  });

  $("#choice-3").click(function () {
    $("#note-1").html(
      $("#note-1")
        .text()
        .replace(
          $("#note-1").text(),
          '<span class="highlight-blue">Tus ingresos en todo el año.</span>'
        )
    );

    $("#starting-page").fadeOut(500, function () {
      $("#input-page").fadeIn(500);
    });
    option = 3;
  });

  $("#input-1").on("keypress", function (e) {
    income = $("#input-1").val();
    if (income != "") {
      income = parseFloat(income);
    }
    if (income == isNaN) {
      income = null;
    }
    if (e.which == 13 && income != null) {
      if (option == 1) {
        $("#results-header").html(
          $("#results-header")
            .text()
            .replace(
              $("#results-header").text(),
              resultsHeader(option, income, expenses, health, retirement)
            )
        );
        $("#results-text").html(
          $("#results-text")
            .text()
            .replace(
              $("#results-text").text(),
              resultsText1(impuesto_planilla_mensual(income))
            )
        );

        $("#input-page").fadeOut(500, function () {
          $("#results-page").fadeIn(500);
        });
      }

      if (option == 2) {
        $("#note-3").html(
          $("#note-3")
            .text()
            .replace(
              $("#note-3").text(),
              '<span class="highlight-blue">Tu aportación al ISSS en el año.</span>'
            )
        );

        $("#input-box-1").fadeOut(500, function () {
          $("#input-box-3").fadeIn(500);
        });
      }

      if (option == 3) {
        $("#note-2").html(
          $("#note-2")
            .text()
            .replace(
              $("#note-2").text(),
              '<span class="highlight-blue">Tus gastos en el año.</span> <br><br>Olvídate de los $800 de colegiatura y los $800 de salud, esos ya los tome en cuenta.'
            )
        );

        $("#input-box-1").fadeOut(500, function () {
          $("#input-box-2").fadeIn(500);
        });
      }

      document.activeElement.blur();
    }
  });

  $("#input-2").on("keypress", function (e) {
    expenses = $("#input-2").val();
    if (expenses != "") {
      expenses = parseFloat(expenses);
    }
    if (expenses == isNaN) {
      expenses = null;
    }

    if (e.which == 13) {
      if (option == 3) {
        $("#results-header").html(
          $("#results-header")
            .text()
            .replace(
              $("#results-header").text(),
              resultsHeader(option, income, expenses, health, retirement, taxes)
            )
        );
        $("#results-text").html(
          $("#results-text")
            .text()
            .replace(
              $("#results-text").text(),
              resultsText2(
                impuestos_anual(income, expenses, health, retirement, taxes)
              )
            )
        );

        $("#input-page").fadeOut(500, function () {
          $("#results-page").fadeIn(500);
        });
      }
      document.activeElement.blur();
    }
  });

  $("#input-3").on("keypress", function (e) {
    health = $("#input-3").val();
    if (health != "") {
      health = parseFloat(health);
    }

    if (health == isNaN) {
      health = null;
    }

    if (e.which == 13 && health != null) {
      if (option == 2) {
        $("#note-4").html(
          $("#note-4")
            .text()
            .replace(
              $("#note-4").text(),
              '<span class="highlight-blue">Tu aportación al AFP en el año.</span>'
            )
        );

        $("#input-box-3").fadeOut(500, function () {
          $("#input-box-4").fadeIn(500);
        });
      }
      document.activeElement.blur();
    }
  });

  $("#input-4").on("keypress", function (e) {
    retirement = $("#input-4").val();
    if (retirement != "") {
      retirement = parseFloat(retirement);
    }

    if (retirement == isNaN) {
      retirement = null;
    }

    if (e.which == 13 && retirement != null) {
      if (option == 2) {
        $("#note-5").html(
          $("#note-5")
            .text()
            .replace(
              $("#note-5").text(),
              '<span class="highlight-blue">Tu renta retenida en el año.</span>'
            )
        );

        $("#input-box-4").fadeOut(500, function () {
          $("#input-box-5").fadeIn(500);
        });
      }
      document.activeElement.blur();
    }
  });

  $("#input-5").on("keypress", function (e) {
    taxes = $("#input-5").val();
    if (taxes != "") {
      taxes = parseFloat(taxes);
    }

    if (taxes == isNaN) {
      taxes = null;
    }

    if (e.which == 13 && taxes != null) {
      if (option == 2) {
        $("#results-header").html(
          $("#results-header")
            .text()
            .replace(
              $("#results-header").text(),
              resultsHeader(option, income, expenses, health, retirement, taxes)
            )
        );
        $("#results-text").html(
          $("#results-text")
            .text()
            .replace(
              $("#results-text").text(),
              resultsText2(
                impuestos_anual(income, expenses, health, retirement, taxes)
              )
            )
        );

        $("#input-page").fadeOut(500, function () {
          $("#results-page").fadeIn(500);
        });
      }
      document.activeElement.blur();
    }
  });

  $("#reset").click(function () {
    $("#results-page").fadeOut(500, function () {
      $("#starting-page").fadeIn(500);
    });
    $("#input-1").val("");
    $("#input-2").val("");
    $("#input-3").val("");
    $("#input-4").val("");
    $("#input-5").val("");
    $("#input-box-1").show();
    $("#input-box-2").hide();
    $("#input-box-3").hide();
    $("#input-box-4").hide();
    $("#input-box-5").hide();
  });
});
