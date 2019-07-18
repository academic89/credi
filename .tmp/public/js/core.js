var onlyNumber = function(){
    var e = document.getElementById('phone');

    if (!/^[0-9]+$/.test(e.value)) { 
        // alert("Please enter onyl number.");
        e.value = e.value.substring(0,e.value.length-1);
    }
}


var createLead = function(){
    var switchLender;

    $('body').on('click', '.btn-action', function() {
        let value = $(this).parent().parent().find('.box-image img').attr('alt');
        console.log(value);
        switch (value) {
            case 'Kueski':
                switchLender = 'https://ojo7.ltroute.com/click.track?CID=411912&AFID=428585';              
                break;
            case 'Lime':
                switchLender = 'https://ojo7.ltroute.com/click.track?CID=426193&AFID=428585';
                break;
            case 'Vivus':
                switchLender = 'https://ojo7.ltroute.com/click.track?CID=418396&AFID=428585';
                break;
            case 'Dineria':
                switchLender = 'https://ojo7.ltroute.com/click.track?CID=426227&AFID=428585';
                break;
            default:
                console.log('error al colocar al lender');
                break;
        }
     
    });

    $('#form-lead').submit(function(event){
        event.preventDefault();

        var date = new Date();
        var d  = date.getDate();
        var day = (d < 10) ? '0' + d : d;
        var m = date.getMonth() + 1;
        var month = (m < 10) ? '0' + m : m;
        var yy = date.getYear();
        var year = (yy < 1000) ? yy + 1900 : yy;
        
        var h = date.getHours();
        var hour = (h < 10) ? '0' + h : h;
        var mi = date.getMinutes();
        var minute = (mi < 10) ? '0' + mi : mi;
        var s = date.getSeconds();
        var second = (s < 10) ? '0' + s : s;


        var dateFull = day + "/" + month + "/" + year;
        var hourFull = hour + ':' + minute + ':' + second;

        // monto = $('input[name=accessible-radio]:checked').val(),
        var phone = $('#phone').val(),
            email = $('#email').val(),
            terms = $('input#terms').val(),
            privacy = $('input#privacy').val(),
            dateRegister = dateFull,
            dateHour = hourFull,
            emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            
        //Validations Form
        if(phone == ''){
            alert('Ingresa un teléfono válido')
        } else if(phone.length < 10){
            alert('tu teléfono debe ser de 10 dígitos'); 
        } else if(email == '') {
            alert('Ingresa un correo electrónico válido')
        } else if(emailRegex.test(email) == false) {
            alert('Ingresa un correo electrónico válido')
        } else if(!$("#terms").prop("checked")){
            alert('Debes aceptar los Términos y condiciones')
        } else if(!$("#privacy").prop("checked")) {
            alert('Debes aceptar El aviso de privacidad')
        } else {

            $.ajax({ 
		        //url:'https://credigenio.mx/create/?',
                url:'http://localhost:1337/create/?',  
                type: 'POST', 
                contentType: 'application/json', 
                data: JSON.stringify({ 
                    phone: phone,
                    email: email,
                    terms: terms,
                    privacy: privacy,
                    dateRegister: dateRegister,
                    hourRegister: dateHour
                }), 
                error: function(jqXhr, textStatus, errorThrown) { 
                  alert('error en el servicio');  
              }, 
              success: function(data, textStatus, jQxhr){
                  	
                    // console.log('link', switchLender);
                    console.log('data', data);
                    if(data.success){
                       // fbq('track', 'Lead');
                    } else {
                      console.log('este teléfono ya se encuentra registrado')  
                    };
                    document.getElementById("form-lead").reset();
                    $('#modalLender').modal('hide');
                    window.open(switchLender);  

                }
            }); 
        }


    })
}

// var items = $('.card');

// $('#monto').click(function(){
//     items.sort(function(a, b){
//         return -$(a).data('monto') - -$(b).data('monto');
//     });

//     items.appendTo('.box-options');
// });

// $('#plazo').click(function(){
//     items.sort(function(a, b){
//         return -$(a).data('plazo') - -$(b).data('plazo');
//     });

//     items.appendTo('.box-options');
// });

// $('#interes').click(function(){
//     items.sort(function(a, b){
//         return +$(a).data('interes') - +$(b).data('interes');
//     });

//     items.appendTo('.box-options');
// });

createLead();










