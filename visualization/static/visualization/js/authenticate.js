/**
 * Created by josecolella on 04/05/2014.
 */
$(function () {


    $(document).on('click', '#signup',function() {
        var fetchSingUpForm = function() {
            $.get("/accounts/signup", function(data) {
                $(".form-container").html(data);
            })
                .fail(function() {
                    console.log("Error");
                })
                .done(function() {
                    console.log("Success");
                });

        };

        fetchSingUpForm();
    });


    $(document).on('click', '#signin', function() {
        var fetchSingInForm = function() {
            $.get("/accounts/signin", function(data) {
                $(".form-container").html(data);
            })
                .fail(function() {
                    console.log("Error")
                })
                .done(function() {
                    console.log("Success")
                });

        };

        fetchSingInForm();
    });



    var checkValidUsername = function() {

        var isValidUsername;
        var regex = /^[a-zA-Z]+[a-zA-Z0-9]+$/;
        var username = $.trim($("[name=username]").val());

        if (!regex.test(username)) {
            isValidUsername = false;
        } else {
            isValidUsername = true;
        }

        return isValidUsername;

    };

    var checkPasswordEquality = function() {
        var isEqual;
        if ($("[name=password1]").val() === $("[name=password2]").val()) {
            isEqual = true;
        } else {
            isEqual = false;
        }

        return isEqual;

    };

    $(document).on('click', '#signupbutton', function() {
        var validUsername = checkValidUsername();
        var validPassword = checkPasswordEquality();

        if(validUsername && validPassword) {
            var username = $.trim($("[name=username]").val());
            var password = $.trim($("[name=password1]").val());

            var singup = function() {

                $.ajax({
                    url: '/accounts/authenticate',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        username: username,
                        password: password
                    },
                    success: function(data) {
                        console.log(data);
                    },
                    error: function() {
                        console.log("Error");
                    }
                })
                    .done(function() {
                        console.log("success");
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                    });

            };
        }
        if (!validUsername) {
            console.log("Not valid username");
        }
        if(!validPassword) {
            console.log("Not valid password");
        }

    });


    $(document).on('click', '#signinbutton', function() {

    });





});