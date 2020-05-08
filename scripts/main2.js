$(document).ready(function(){
    $('input[type="radio"]').click(function(){
        var inputValue = $(this).attr("value");
        console.log(inputValue);
    });

    document.ontouchmove = function(e){
        e.preventDefault();
        }

    $('input[type="number"]').onfocus = function () {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }
});