var onlyNumber = function(){
    var e = document.getElementById('phone');

    if (!/^[0-9]+$/.test(e.value)) { 
        // alert("Please enter onyl number.");
        e.value = e.value.substring(0,e.value.length-1);
    }
}

var createLead = function(){

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


        var monto = $('input[name=accessible-radio]:checked').val(),
            phone = $('#phone').val(),
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
        	console.log('monto', monto);
        	console.log('phone', phone);
        	console.log('email', email);
        	console.log('terms', terms);
        	console.log('privacy', privacy);
        	console.log('dateRegister', dateRegister);
        	console.log('dateHour', dateHour);


            $.ajax({ 
		        //url:'https://credigenio.mx/create/?',
                url:'http://localhost:1337/create/?',  
                type: 'POST', 
                contentType: 'application/json', 
                data: JSON.stringify({ 
                    monto: monto,
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
		    				document.getElementById("form-lead").reset();
                    $('#exampleModalCenter').modal({
                        backdrop: false,
                        show: true
                    }); 
                    $('.modal').css('background','rgba(0,0,0,0.5)');
                    setTimeout(function(){
                        $('.spinner').fadeOut('slow');
												// fbq('track', 'Lead');
                        setTimeout(function(){
                            $('.fa-check-circle').fadeIn('slow');
                            $('#msg').text('¡Hemos encontrado tu mejor opción!');

                            setTimeout(function(){
                                $('.fa-check-circle').fadeOut();
                                $('#msg').fadeOut();
                                setTimeout(function(){
                                    $('.kueski').fadeIn('slow');
                                    $('.kueski-row').css('display','flex');
                                },500)
                            },500)
                        },800);
                    },4000);
                }
            }); 
        }


    })
}

$(document).ready(function(){
    createLead();
})

