function addButtonAdd() {
    if(!$('.type').is('.addservices')) {
        $('<div class="type addservices" style="background: url(//icons.veryicon.com/png/System/Small%20%26%20Flat/sign%20add.png) no-repeat"><h4>Добавить услугу</h4></div>').appendTo('div#orders');
    }
    $("div.addservices").click(function() {
        $('div#services').show();
    });
}

function addSofasToBasket (div){
    var id = $(div).parent().attr('data-modal');
    $(div).clone().append('<span class="del" onclick="delOrder(this)">×</span>').prependTo('div#orders');
    addButtonAdd();
    $('div#basket').show();
    calcCost($(div).children("p").children("b").text());
    hideModal(id);
    $('div#services').hide();
}

function delOrder(div) {

    var minusPrice = parseInt($(div).parent().children("p").children("b").text());
    calcCost( minusPrice*-1 );

    if ($("div#basket div.type").length == 2) {
        $(div).parent().parent().html('');
        $('div#basket').hide();
        $('div#services').show();
    } else {
        $(div).parent().remove();
    }
}

function calcCarpet(width,height) {
    var s = ((width*height)/10000).toFixed(2);
    var cost = (s*150).toFixed();
    $('i.sCarpet').html(s);
    $('b.costCarpet').html(cost);
}

function addCarpet(div) {
    var cost = $('b.costCarpet').text();
    var s = $('i.sCarpet').text();
    var width = $('input#widthCarpet').val();
    var height = $('input#heightCarpet').val();
    addButtonAdd();
    calcCost(cost);
    $('div#basket').show();
    $('div#orders').prepend('<div class="type" style="background: url(//white-stripe.com/wp-content/uploads/2016/12/gUBE_ZBPCJ0-300x173.jpg)"><p><b>'+cost+'</b> р</p><h4>Чистка ковра ('+width+'см x '+height+'см) '+s+' м²</h4><span class="del" onclick="delOrder(this)">×</span></div>');
    $('#carpetModal').modal('hide');
    $('div#services').hide();

    $("div.addservices").click(function() {
        $('div#services').show();
    });
}

function calcCost(value) {
    var current = parseInt($('p.costOrder b').text());
    value = parseInt(value);
    var newVal = (current)+(value);
    $('p.costOrder b').html(newVal);
}
 function activeModal(id){
     $(id).modal('show');
 }
 function hideModal(id) {
     var div = '#'+id
     $(div).modal('hide');
 }

$( function() {

    $("div.workarea div.type").click(function() {
        addSofasToBasket(this);
    });

    $('input#widthCarpet').on('mousemove', function(event){
        calcCarpet( $(this).val(),$('input#heightCarpet').val());
    });
    $('input#heightCarpet').on('mousemove', function(event){
        calcCarpet( $('input#widthCarpet').val(),$(this).val());
    });


    $.datepicker.setDefaults({
        closeText: 'Закрыть',
        minDate: new Date(),
        prevText: '<Пред',
        nextText: 'След>',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Нед',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        showAnim: 'slideDown',
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    } );
    $("#datepicker").datepicker();
} );