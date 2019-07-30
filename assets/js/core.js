var onlyNumber = function(){
    var e = document.getElementById('phone');

    if (!/^[0-9]+$/.test(e.value)) { 
        // alert("Please enter onyl number.");
        e.value = e.value.substring(0,e.value.length-1);
    }
}

$('.btn-next').click(function(){
    let url = $(this).data('url');
    let pathname = window.location.pathname;

    switch (pathname) {
        case '/step2':
            let check = $('input[name="radio"]').is(':checked');
            let check2 = $('input[name="radio2"]').is(':checked');
            if(!check) { 
                alert("selecciona un ingreso mensual") 
            } else if(!check2){
                alert("selecciona si puedes comprobar tus ingresos") 
            } else {
                window.location.pathname = url;
            }
            break;
        case '/step3':
            let check3 = $('input[name="radio"]').is(':checked');
            if(!check3) {
                alert('selecciona un estatus laboral')
            } else {
               window.location.pathname = url; 
            }
            break;
        case '/step4':
            let check4 = $('input[name="radio"]').is(':checked');
            if(!check4) {
                alert('selecciona una opción')
            } else {
               window.location.pathname = url; 
            }
            break;
        case '/step6':
            let terms = $('input#terms').val();
            let privacy = $('input#terms').val();
            if(!$("#terms").prop("checked")){
                alert('Debes aceptar los Términos y condiciones');
            } else if(!$("#privacy").prop("checked")){
                alert('Debes aceptar el Aviso de privacidad');
            } else {
                window.location.pathname = url; 
            }
            break;
    }
    
})

$('input.cbx[type=checkbox]').click(function(){
  let valCheck = $('input.cbx[type=checkbox]').is(':checked');
  if (valCheck) {
      $('.hidden-box').fadeIn('slow');
      $('#textInfo').fadeOut('slow');
  }else{
      $('.hidden-box').fadeOut();
      $('#textInfo').fadeIn();
  };
});


var createLead = function(){
    // var switchLender;

    // $('body').on('click', '.btn-action', function() {
    //     let value = $(this).parent().parent().find('.box-image img').attr('alt');
    //     console.log(value);
    //     switch (value) {
    //         case 'Kueski':
    //             switchLender = 'http://offers.inbox-labs-tracking.com/aff_c?offer_id=2486&aff_id=1910&url_id=20386&source=sms';              
    //             break;
    //         case 'Azteca':
    //             switchLender = 'http://ntvn.io/W1a36';
    //             break;
    //         case 'AskRobin':
    //             switchLender = 'https://robinacademia.com/?a=23&c=113&s1=Credigenio';
    //             break;
    //         case 'Coru':
    //             switchLender = 'https://afiliacion.net/?a=1988640&c=8890&s1=AI_AgenciaIvan_MX-SMS';
    //             break;
    //         default:
    //             console.log('error al colocar al lender');
    //             break;
    //     }
     
    // });

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
            // terms = $('input#terms').val(),
            // privacy = $('input#privacy').val(),
            terms = true,
            privacy = true,
            dateRegister = dateFull,
            dateHour = hourFull,
            emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        //  else if(!$("#terms").prop("checked")){
        //     alert('Debes aceptar los Términos y condiciones')
        // } else if(!$("#privacy").prop("checked")) {
        //     alert('Debes aceptar El aviso de privacidad')
        // }
            
        //Validations Form
        if(phone == ''){
            alert('Ingresa un teléfono válido')
        } else if(phone.length < 10){
            alert('tu teléfono debe ser de 10 dígitos'); 
        } else if(email == '') {
            alert('Ingresa un correo electrónico válido')
        } else if(emailRegex.test(email) == false) {
            alert('Ingresa un correo electrónico válido')
        } else {

            $.ajax({ 
                url:'https://prestamagico.com/create/?',
                //url:'http://localhost:1337/create/?',  
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
                       fbq('track', 'SubmitApplication');
                    } else {
                      console.log('este teléfono ya se encuentra registrado')  
                    };
                    document.getElementById("form-lead").reset();
                    // $('#modalLender').modal('hide');
                    // window.open(switchLender);
                    setTimeout(function(){
                      window.location.pathname = '/step2';
                    }, 800);  

                }
            }); 
        }


    })
}


createLead();










