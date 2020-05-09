$(document).ready(function(){
    $('#starting-page').hide();
    $('#input-page-1').hide();
    $('#results-page').hide();

    let option = 0;

    // = = = = = GENERAL = = = = =

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
            return [tramo, 0.0, 0.0, 0.0];
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
        return [tramo, porcentaje, cuota, impuesto];
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

    $('input[type="number"]').onfocus = function () {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }

    $('#input-1').on('keypress',function(e) {
        income = $('#input-1').val();
        if (income == '') {
            income = null;
        } else {
            income = parseFloat(income);
        }
        if(e.which == 13)  {
            if (option == 1 && income != null) {
                console.log(formatCurrency(income));
                console.log(impuesto_planilla_mensual(income));
            }

            if (option == 2 || option == 3) {
                console.log(option);
            }
        }
    });
});