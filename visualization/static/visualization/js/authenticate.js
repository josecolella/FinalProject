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

    var checkPasswordStrength  = function(password) {

        var passwordStrength;

        var weak = /[a-z]{4,10}/;
        var secure = /[a-zA-Z\d]{4,25}/
        var strong = /[\w\d&^%$#*]{4,25}/;

        if(weak.test(password)) {
            passwordStrength = 'Weak'
        } else if(secure.test(password)) {
            passwordStrength = 'Secure'
        } else if(strong.test(password)) {
            passwordStrength = 'Strong'
        }


    };

    $(document).on('click', '#signinbutton', function(e) {
        e.preventDefault();
        var validUsername = checkValidUsername();
        var password = $.trim($("[name=password]").val());

        if (password.length !== 0 && validUsername) {
            var username = $("[name=username]").val();



            var signIn = function() {
                 $.ajax({
                    url: '/accounts/authenticate',
                    type: 'POST',
                    dataType: 'json',
                    headers: {
                        'X-CSRFToken' : $.cookie('csrftoken')
                    },
                    data: {
                        username: username,
                        password: password
                    },
                    success: function(data) {
                        console.log(data);
                        if(data.status !== 0) {
                            location.href = data.status
                        } else if(data.status == 0)
                            alertify.error("Unsuccessful Sign In");
                    },
                    error: function(data) {
                        alertify.error("User could not be saved")
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

            signIn();

        } else {
            alertify.error('Not valid Sign in');
        }

    });



    $(document).on('click', '#signupbutton', function(e) {
        e.preventDefault();
        var validUsername = checkValidUsername();
        var validPassword = checkPasswordEquality();


        if (!validUsername || !validPassword) {
            if (!validUsername) {
                console.log("Not Valid")
            }
            if (!validPassword) {
                console.log("Not Valid")
            }

        } else {
            var username = $.trim($("[name=username]").val());
            var password = $.trim($("[name=password1]").val());
            var password2 = $.trim($("[name=password2]").val());

            var signUp = function() {

                $.ajax({
                    url: '/accounts/authenticate',
                    type: 'POST',
                    dataType: 'json',
                    headers: {
                        'X-CSRFToken' : $.cookie('csrftoken')
                    },
                    data: {
                        username: username,
                        password1: password,
                        password2: password2
                    },
                    success: function(data) {
                        console.log(data);
                        if(data.status == 1) {
                            console.log("HERE");

                            location.href = '/';
                            alertify.success("Your account has been created");
                        } else if(data.status == 0) {
                            alertify.error("Unable to create account");
                        }
                    },
                    error: function(data) {
                        alertify.error("User could not be saved")
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

            signUp();

        }

    });


    $(document).on('click', '#signinbutton', function() {

    });





});