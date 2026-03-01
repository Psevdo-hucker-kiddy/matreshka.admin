const socket = io({
    path: '/sockets',
    query: {
        page: 'admin'
    }
});

(function ($) {

    'use strict';

    $('.qr-block').hide();
    $("#login-form").find('button[type="submit"]').find('i').hide();

    $("#login-form").submit(function(event) {

        event.preventDefault();

        let _this = $(this),
            _this_params = _this.serializeArray(),
            login = _this_params.find(param => param.name == 'login').value || null,
            code = _this_params.find(param => param.name == 'code').value || null;

        _this.find('button[type="submit"]').attr('disabled', true);
        _this.find('button[type="submit"]').find('i').fadeIn(250);

        $.post('/login-handler', {
            params: _this_params
        },
        function(data) {

            if(!data) return false;
            data = $.parseJSON(data);

            $('.text-danger').text('');

            switch(data.type) {

                case 'logged' :  {

                    _this.find('button[type="submit"]').find('span').text(Language.Redirecting + '...');

                    location.href = '/profile';

                    break;

                }

                case '2fa' : {
                    
                    socket.emit('admin', '2fa_auth', {exist: data.exist, name: login, code: code}, (response) => {

                        if(response) {

                            switch(response.type) {

                                case 'qr' : {

                                    if(response.success && response.qr && response.key) {

                                        $('.qr-block img').attr('src', response.qr);
                                        $('.qr-block .qr-desc').html(Language.TwoFA_Text_1 + response.key);

                                        _this.find('button[type="submit"]').attr('disabled', false);
                                        _this.find('button[type="submit"]').find('i').fadeOut(250);
                                        _this.find('button[type="submit"]').find('span').text(Language.Check_Code);

                                    }
                                    else
                                        if(response.error) {

                                            toastr.options = {
                                                "newestOnTop": true,
                                                "progressBar": true,
                                            };
                                            Command: toastr["error"](response.error, Language.System_Error)

                                        }

                                    break;

                                }

                                case 'verify' : {

                                    if(response.success) {

                                        _this.find('button[type="submit"]').find('span').text(Language.Login + '...');

                                        setTimeout(function() {
                                        
                                            _this.submit();

                                        }, 1000);

                                    }
                                    else
                                        if(response.error) {

                                            $('#code_error').text(response.error);

                                            _this.find('button[type="submit"]').attr('disabled', false);
                                            _this.find('button[type="submit"]').find('i').fadeOut(250);
                                            _this.find('button[type="submit"]').find('span').text(Language.Check_Code);

                                        }

                                    break;

                                }

                                case 'login' : {

                                    if(response.success) {

                                        $('.qr-block img').hide();
                                        $('.qr-block .qr-desc').html(Language.TwoFA_Text_2);

                                        _this.find('button[type="submit"]').attr('disabled', false);
                                        _this.find('button[type="submit"]').find('i').fadeOut(250);
                                        _this.find('button[type="submit"]').find('span').text(Language.Check_Code);

                                    }

                                    break;

                                }

                            }

                            _this.find('.login-block').hide();
                            _this.find('.password-block').hide();

                            $('.qr-block').fadeIn(250);

                        }
                    
                    });

                    break;

                }

                default : {

                    _this.find('button[type="submit"]').attr('disabled', false);
                    _this.find('button[type="submit"]').find('i').fadeOut(250);
                    _this.find('button[type="submit"]').find('span').text(Language.Enter_System);

                    $.each(data, function(index, value) {

                        switch(value.error_field) {

                            case 'timeout' : {

                                var timerInterval;

                                Swal.fire({
                                    title: Language.Please_Wait + '.',
                                    html: Language.Try_Again + '.',
                                    timer: Math.round(value.timeout_sec * 1000),
                                    timerProgressBar: true,
                                    confirmButtonColor: "#8649D4",
                                    onBeforeOpen:function () {
                                        Swal.showLoading()
                                        timerInterval = setInterval(function() {
                                        Swal.getContent().querySelector('strong')
                                            .textContent = Swal.getTimerLeft()
                                        }, 100)
                                    },
                                    onClose: function () {
                                        clearInterval(timerInterval)
                                    }
                                }).then(function (result) {
                                    if (
                                        result.dismiss === Swal.DismissReason.timer
                                    ) {
                                        //console.log('Автоматическое закрывание');
                                    }
                                });

                                break;

                            }
                            case 'system' : {

                                toastr.options = {
                                    "newestOnTop": true,
                                    "progressBar": true,
                                };
                                Command: toastr["error"](value.error_text, Language.System_Error)

                                break;

                            }
                            case 'login' : {

                                $('#login_error').text(value.error_text);

                                break;

                            }
                            case 'password' : {

                                $('#password_error').text(value.error_text);

                                break;

                            }
                            case 'code' : {

                                $('#code_error').text(value.error_text);

                                break;

                            }
                            default : {

                                toastr.options = {
                                    "newestOnTop": true,
                                    "progressBar": true,
                                };
                                Command: toastr["error"](value.error_text, Language.Unknown_Error)

                                break;

                            }

                        }

                    });

                    break;

                }

            }
        });

    });

})(jQuery)