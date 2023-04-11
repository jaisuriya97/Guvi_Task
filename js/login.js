$(document).ready(function(){
   
    $('.alert-danger ').hide();
    $('#emailAddress').on('keyup', function () {
        var email = $(this).val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var feedback = $(this).siblings('.invalid-feedback');
        if (!emailRegex.test(email)) {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            feedback.show();
        } else {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
            feedback.hide();
        }
    });
    $('.alert-danger ').hide();

    $('#submit').click(function(e){
        e.preventDefault();
        let email = $('#emailAddress').val();
        let password = $('#password').val();
        // alert(localStorage.getItem('email'))
        $.ajax({
            type: "POST",
            url: "./php/login.php",
            data: {email:email,password:password},
            success: function (msg) {
                alert(msg)
                if(msg === "error"){
                    $('.alert-danger ').show();
                }else{
                    localStorage.setItem('sessionId',msg)
                    alert(localStorage.getItem('sessionId'));
                    $('.alert-danger ').hide();
                    window.location.href='./profile.html';
                }
                
            }
        });

    })
})