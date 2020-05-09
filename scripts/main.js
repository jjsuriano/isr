$(document).ready(function(){
    $('#starting-page').hide();
    $('#input-page-1').hide();
    $('#results-page').hide();

    let option = 0;

    // = = = = = GENERAL = = = = 

    function formatCurrency(total) {
        let neg = false;
        if(total < 0) {
            neg = true;
            total = Math.abs(total);
        }
    
        if (isNaN(total) || total == 0) {
          return "$0.00"
        }
    
        return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
    }

    function resultsHeader(option, income) {
        let header = "";

        if (option == 1) {
            header = 'Si tus ingresos mensuales son de <span class="highlight-blue" id="result-income">'+ formatCurrency(income) +'</span>';
        }

        if (option == 2) {

        }

        if (option == 3) {

        }
        return header;

    }

    function resultsText(option, results) {
        let salario = results[0];
        let isss = results[2];
        let afp = results[3];
        let porcentaje = parseInt(results[4]*100);
        let exceso = formatCurrency(results[5]);
        let cuota = formatCurrency(results[6]);
        let impuestos = results[7];
        let liquidos = formatCurrency(salario - isss - afp - impuestos);

        if (option == 1) {
            let tramo = ""

            if (results[1] == 1) {               
                tramo = "I";
                let part1 = 'Tu aportación al <span class="highlight-red">ISSS</span> es de <span class="highlight-blue" id="result-isss">'+ formatCurrency(isss) + '</span> y tu aportación al <span class="highlight-red">AFP</span> es de <span class="highlight-blue" id="result-afp">'+ formatCurrency(afp) +'</span>. ';
                let part2 = '<br><br>Esto significa que entras en el <span class="highlight-red" id="result-tramo">tramo ' + tramo + '</span> para el cálculo de tus impuestos. Si caes en este tramo <span class="highlight-blue">no tienes que pagar impuestos</span>.';
                let part3 = '<br><br>Si restamos todo esto de tu salario mensual, a ti te quedan <span class="highlight-blue" id="result-final">'+ liquidos +'</span> para comprar y ahorrar.';
                return part1 + part2 + part3;
            } else if (results[1] == 2 ) {
                tramo = "II";
            } else if (results[1] == 3 ) {
                tramo = "III";
            } else if (results[1] == 4 ) {
                tramo = "IV";
            }

            let part1 = 'Tu aportación al <span class="highlight-red">ISSS</span> es de <span class="highlight-blue" id="result-isss">'+ formatCurrency(isss) + '</span>, tu aportación al <span class="highlight-red">AFP</span> es de <span class="highlight-blue" id="result-afp">'+ formatCurrency(afp) +'</span>. ';
            let part2 = '<br><br>Esto significa que entras en el <span class="highlight-red" id="result-tramo">tramo ' + tramo + '</span> para el cálculo de tus impuestos. Tus impuestos se dividen en dos partes, la cuota fija de <span class="highlight-red" id="result-cuota">' + cuota + '</span> y el <span class="highlight-red" id="result-porcentaje">' + porcentaje + '%</span> de <span class="highlight-red" id="result-porcion">' + exceso + '</span>, sumando esas dos partes nos da un total de <span class="highlight-blue" id="result-impuestos">' + formatCurrency(impuestos) + '</span> de <span class="highlight-red">impuestos</span>.';
            let part3 = '<br><br>Si restamos todo esto de tu salario mensual, a ti te quedan <span class="highlight-blue" id="result-final">'+ liquidos +'</span> para comprar y ahorrar.';
            return part1 + part2 + part3;
        }

        if (option == 2) {

        }

        if (option == 3) {

        }
    }

    // = = = = = CON DEPENDENCIA = = = = = 
    function impuesto_planilla_mensual(salario) {
        let isss = 0
        let afp = 0;
    
        if (salario > 1000) {
            isss = 1000*0.03
        }
        isss = salario*0.03
    
        if (salario > 6500) {
            afp = 6500*0.0725
        }
        afp = salario*0.0725
    
        const gravado = salario - isss - afp;
        let tramo = 0
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
        } else if (895.25 <= gravado && gravado <= 2038.10) {
            tramo = 3;
            porcentaje = 0.2;
            base = 895.24;
            cuota = 50;
            exceso = gravado - base
        } else if (gravado >= 2038.11) {
            tramo = 4;
            porcentaje = 0.3;
            base = 2038.10;
            cuota = 288.57;
            exceso = gravado - base;
        }
        let impuesto = (exceso * porcentaje) + cuota;
        return [salario, tramo, isss, afp, porcentaje, exceso, cuota, impuesto];
    }
    
    $('#start').click(function(){
        $('#welcome').fadeOut(500, function(){
            $('#starting-page').fadeIn(500);
        })
    });

    $('#choice-1').click(function(){
        $('#starting-page').fadeOut(500, function() {
            $('#input-page-1').fadeIn(500);
        })
        option = 1;
    });

    $('#input-1').on('keypress',function(e) {
        income = $('#input-1').val();
        if (income == '') {
            income = null;
        } else {
            income = parseFloat(income);
        }
        if(e.which == 13)  {
            if (option == 1 && income != null) {
                $('#results-header').html($('#results-header').text().replace($('#results-header').text(), resultsHeader(1, income)));
                $('#results-text').html($('#results-text').text().replace($('#results-text').text(), resultsText(1, impuesto_planilla_mensual(income))));
                
                $('#input-page-1').fadeOut(500, function(){
                    $('#results-page').fadeIn(500);
                })
                document.activeElement.blur();
            }

            if (option == 2 || option == 3) {
                console.log(option);
            }
        }
    });
    
    $('#reset').click(function(){
        $('#results-page').fadeOut(500, function() {
            $('#starting-page').fadeIn(500);
        });
        $('#input-1').val('');
    });

});