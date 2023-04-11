$(document).ready(function () {
  alert(localStorage.getItem("sessionId"))
  if (localStorage.getItem("sessionId") === null) {
    window.location.href = "./index.html";
  } else {
    $.ajax({
      url: "./php/profile.php", // Replace with the URL of your PHP script
      type: "GET",
      data: {
        session_id: localStorage.getItem('sessionId'),
      },
      success: function (response) {
        // if(!response){
        //   alert("false");
        // }
        if (response.length > 0) {
          var sessionData = JSON.parse(response);
          var email = sessionData.email; // Do something with the session data
          // var password = sessionData.password;
          // alert(sessionData.email);
          $("#email").text(sessionData.email);
          $("#Password").text(sessionData.password);
          $("#password").val(sessionData.password);
          $.ajax({
            url: "./php/profile.php",
            type: "POST",
            data: { mail: email },
            success: function (res) {
              var jsonObject = JSON.parse(res);
              console.log(jsonObject)
              $("#fname").text(jsonObject.fname);
              $("#inputFirstName").val(jsonObject.fname);
              $("#lname").text(jsonObject.lname);
              $("#inputLastName").val(jsonObject.lname);
              $("#phone").text(jsonObject.phone);
              $("#inputEmailAddress").val(jsonObject.email);
              $("#inputPhone").val(jsonObject.phone);
              var formData = {
                email:jsonObject.email,
                password: " ",
                fname: " ",
                lname: " ",
                address: " ",
                gender: " ",
                phone: " ",
                dob: " ",
                action: "onload",
              };
            
              // Send the POST request to the PHP script
              $.ajax({
                type: "POST",
                url: "./php/profile.php",
                data: formData,
                success: function (response) {
                  alert("onload"+response);
                  // Handle the response from the PHP script
                },
              });
            },
            error: function (xhr, status, error) {
              window.location.href = "./login.html";
            },
          });
        } else {
          window.location.href = "./index.html";
        }
      },
      error: function (xhr, status, error) {
        window.location.href = "./login.html"; // Handle the error
      },
    });
  }

  //get sessionDetails

  // validation

  $("#inputFirstName").on("keyup", function () {
    var fname = $(this).val();
    var regex = /^[a-zA-Z]+(([',.-][a-zA-Z ])?[a-zA-Z]*)*$/;
    var feedback = $(this).siblings(".invalid-feedback");

    if (!regex.test(fname) || fname.length < 5) {
      $(this).addClass("is-invalid");
      feedback.show();
    } else {
      $(this).removeClass("is-invalid").addClass("is-valid");
      feedback.hide();
    }
  });

  // LastName validation
  $("#inputLastName").on("keyup", function () {
    var lname = $(this).val();
    var feedback = $(this).siblings(".invalid-feedback");

    if (!isNaN(lname)) {
      $(this).addClass("is-invalid");
      feedback.show();
    } else {
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      feedback.hide();
    }
  });

  // Validate email input on type
  $("#inputEmailAddress").on("keyup", function () {
    var email = $(this).val();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var feedback = $(this).siblings(".invalid-feedback");
    if (!emailRegex.test(email)) {
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      feedback.show();
    } else {
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      feedback.hide();
    }
  });

  // Validate password input on type
  $("#password").on("input", function () {
    var password = $(this).val();
    var passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    var feedback = $(this).siblings(".invalid-feedback");
    if (!passwordRegex.test(password)) {
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      feedback.show();
    } else {
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      feedback.hide();
    }
  });

  // Validate confirm password input on type
  $("#cpassword").on("input", function () {
    var feedback = $(this).siblings(".invalid-feedback");
    var password = $("#password").val();
    var confirmPassword = $(this).val();
    if (confirmPassword !== password) {
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      feedback.show();
    } else {
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      feedback.hide();
    }
  });

  $("#inputPhone").on("keyup", function () {
    var feedback = $(this).siblings(".invalid-feedback");
    var Phone = $(this).val();
    var mobileRegex = /^(\+91|0)?[6789]\d{9}$/;
    if (!mobileRegex.test(Phone)) {
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      feedback.show();
    } else {
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      feedback.hide();
    }
  });

  $("#Address").on("keyup", function () {
    var feedback = $(this).siblings(".invalid-feedback");
    var address = $(this).val();
    if (address.length === 0) {
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      feedback.show();
    } else {
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      feedback.hide();
    }
  });

  $("#Address").on("focus", function () {
    var feedback = $(this).siblings(".invalid-feedback");
    var address = $(this).val();
    if (address.length === 0) {
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      feedback.show();
    } else {
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      feedback.hide();
    }
  });

  $("#submit").on("click", function (e) {
    if ($(".is-invalid").length > 0 || ($("#password").val().length === 0) || $('input[name="flexRadioDisabled"]:checked').val() === undefined  ) {
      alert("🚨Check The Input");
      e.preventDefault();
    } else {
      // let fname = $('#inputFirstName').val();
      // let lname = ;
      // let password = $('#password').val();
      // let phone = $('#inputPhone').val();
      // let dob = $('#inputBirthday').val();
      // let address = $('#Address').val();
      // var genderValue = ;
      // alert(fname);
      // alert(lname);
      // alert(password);
      // alert(phone);
      // alert(dob);
      // alert(address);
      // alert(genderValue);
      //call ajax hear

      $.ajax({
        url: "./php/profile.php", // Replace with the URL of your PHP script
        type: "GET",
        data: {
          session_id: localStorage.getItem('sessionId'),
        }, success: function (re) {

          let jsonObject = JSON.parse(re);
          alert(jsonObject);
          var formData = {
            email: jsonObject.email,
            password: $("#password").val(),
            fname: $("#inputFirstName").val(),
            lname: $("#inputLastName").val(),
            address: $("#Address").val(),
            gender: $('input[name="flexRadioDisabled"]:checked').val(),
            phone: $("#inputPhone").val(),
            dob: $("#inputBirthday").val(),
            update: "toupdate",
          };
          $.ajax({
            type: "POST",
            url: "./php/profile.php",
            data: formData,
            success: function (respe) {
              console.log(respe);
              alert("updated✅");
              let jsonObject = JSON.parse(respe);
              $("#fname").text(jsonObject.fname);
              $("#inputFirstName").val(jsonObject.fname);
              $("#lname").text(jsonObject.lname);
              $("#inputLastName").val(jsonObject.lname);
              $("#phone").text(jsonObject.phone);
              $("#inputEmailAddress").val(jsonObject.email);
              $("#inputPhone").val(jsonObject.phone);
              $("#Dob").text(jsonObject.dob);
              $("#Gender").text(jsonObject.gender);
              $("#address").text(jsonObject.address);
              var today = new Date();
              var birthdateObj = new Date(jsonObject.dob);
              var age = today.getFullYear() - birthdateObj.getFullYear();
              var monthDiff = today.getMonth() - birthdateObj.getMonth();
              if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < birthdateObj.getDate())
              ) {
                age--;
                $("#Age").text(age--);
              }
              $("#Age").text(age);
              // Handle the response from the PHP script
            },
          });

        }
      });
    }
  });

  $("#logout").on("click", function () {
    $.ajax({
      url: "./php/profile.php",
      type: "POST",
      data: { destory: "yes", session_id: localStorage.getItem("sessionId") },
      success: function (response) {
        // handle success
        console.log(response);
        localStorage.clear();
        window.location.href = "./index.html";
      },
      error: function (xhr, status, error) {
        // handle error
      },
    });
  });
});

//mongodb Update
$(document).ready(function () {
  
});
