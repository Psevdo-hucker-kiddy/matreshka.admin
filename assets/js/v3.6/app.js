
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, value, options = {}) {

        options = {
            path: '/',
            ...options
        };
      
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
      
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
      
        document.cookie = updatedCookie;
    }

    function deleteCookie(name) {
        setCookie(name, "", {
            'max-age': -1
        });
    }

(function ($) {

    'use strict';

    $('#add-user-form').on('submit', function(event) {

        event.preventDefault();

        let _this = $(this),
            _this_params = _this.serializeArray();

        $.post('/register-handler', {
            params: _this_params
        },
        function(data) {

            if(!data) return false;
            data = $.parseJSON(data);

            _this.find('.text-danger').text('');

            switch(data.type) {

                case 'registered' :  {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Аккаунт создан!',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    break;

                }

                default : {

                    $.each(data, function(index, value) {

                        switch(value.error_field) {

                            case 'timeout' : {

                                var timerInterval;

                                Swal.fire({
                                    title: 'Пожалуйста, подождите немного.',
                                    html: 'Попробуйте снова через <strong></strong> секунд.',
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
                                Command: toastr["error"](value.error_text, "Системная ошибка")

                                break;

                            }
                            case 'login' : {

                                $('#add-user-login_error').text(value.error_text);

                                break;

                            }
                            case 'password' : {

                                $('#add-user-password_error').text(value.error_text);

                                break;

                            }
                            default : {

                                toastr.options = {
                                    "newestOnTop": true,
                                    "progressBar": true,
                                };
                                Command: toastr["error"](value.error_text, "Неизвестная ошибка")

                                break;

                            }

                        }

                    });

                    break;

                }

            }

        });

    });

    $('.dropdown-inner').find('li').on('click', function() {
        var _this = $(this),
            _this_server = _this.data('server');

        $.post('/changeserver-handler', {
            server: _this_server
        },
        function(data) {

            document.location.reload();

        });
    });

    function initMetisMenu() {
        $("#side-menu").metisMenu();
    }

    function initLeftMenuCollapse() {
        $('#vertical-menu-btn').on('click', function (event) {
            event.preventDefault();
            $('body').toggleClass('sidebar-enable');

            if ($(window).width() >= 992) {
                $('body').toggleClass('vertical-collpsed');
            } else {
                $('body').removeClass('vertical-collpsed');
            }
        });
    }

    function initActiveMenu() {
        $("#sidebar-menu a").each(function () {
            var pageUrl = window.location.href.split(/[?#]/)[0];
            if (this.href == pageUrl) {
                $(this).addClass("active");
                $(this).parent().addClass("mm-active");
                $(this).parent().parent().addClass("mm-show");
                $(this).parent().parent().prev().addClass("mm-active");
                $(this).parent().parent().parent().addClass("mm-active");
                $(this).parent().parent().parent().parent().addClass("mm-show");
                $(this).parent().parent().parent().parent().parent().addClass("mm-active");
            }
        });
    }

    function initMenuItemScroll() {
        $(document).ready(function () {
            if ($("#sidebar-menu").length > 0 && $("#sidebar-menu .mm-active .active").length > 0) {
                var activeMenu = $("#sidebar-menu .mm-active .active").offset().top;
                if (activeMenu > 300) {
                    activeMenu = activeMenu - 300;
                    $(".vertical-menu .simplebar-content-wrapper").animate({ scrollTop: activeMenu }, "slow");
                }
            }
        });
    }

    function initHoriMenuActive() {
        $(".navbar-nav a").each(function () {
            var pageUrl = window.location.href.split(/[?#]/)[0];
            if (this.href == pageUrl) {
                $(this).addClass("active");
                $(this).parent().addClass("active");
                $(this).parent().parent().addClass("active");
                $(this).parent().parent().parent().addClass("active");
                $(this).parent().parent().parent().parent().addClass("active");
                $(this).parent().parent().parent().parent().parent().addClass("active");
                $(this).parent().parent().parent().parent().parent().parent().addClass("active");
            }
        });
    }

    function initFullScreen() {
        $('[data-bs-toggle="fullscreen"]').on("click", function (e) {
            e.preventDefault();
            $('body').toggleClass('fullscreen-enable');
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        });
        document.addEventListener('fullscreenchange', exitHandler);
        document.addEventListener("webkitfullscreenchange", exitHandler);
        document.addEventListener("mozfullscreenchange", exitHandler);
        function exitHandler() {
            if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                console.log('pressed');
                $('body').removeClass('fullscreen-enable');
            }
        }
    }

    function initRightSidebar() {
        $('.right-bar-toggle').on('click', function (e) {
            $('body').toggleClass('right-bar-enabled');
        });

        $(document).on('click', 'body', function (e) {
            if ($(e.target).closest('.right-bar-toggle, .right-bar').length > 0) {
                return;
            }

            $('body').removeClass('right-bar-enabled');
            return;
        });
    }

    function initDropdownMenu() {
        if (document.getElementById("topnav-menu-content")) {
            var elements = document.getElementById("topnav-menu-content").getElementsByTagName("a");
            for (var i = 0, len = elements.length; i < len; i++) {
                elements[i].onclick = function (elem) {
                    if (elem.target.getAttribute("href") === "#") {
                        elem.target.parentElement.classList.toggle("active");
                        elem.target.nextElementSibling.classList.toggle("show");
                    }
                }
            }
            window.addEventListener("resize", updateMenu);
        }
    }

    function updateMenu() {
        var elements = document.getElementById("topnav-menu-content").getElementsByTagName("a");
        for (var i = 0, len = elements.length; i < len; i++) {
            if (elements[i].parentElement.getAttribute("class") === "nav-item dropdown active") {
                elements[i].parentElement.classList.remove("active");
                if (elements[i].nextElementSibling !== null) {
                    elements[i].nextElementSibling.classList.remove("show");
                }
            }
        }
    }

    function initComponents() {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        });

        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl)
        });

        var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
        var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
            return new bootstrap.Offcanvas(offcanvasEl)
        })
    }

    function initPreloader() {
        $(window).on('load', function () {
            $('#status').fadeOut();
            $('#preloader').delay(350).fadeOut('slow');
        });
    }

    function initSettings() {

        var alreadyVisited = getCookie('theme-switch');
        if (!alreadyVisited) {
            var cookie_date = new Date();
            cookie_date.setMonth(cookie_date.getMonth() + 1);
            setCookie('theme-switch', 'auto-mode-switch', {secure: true, 'expires': cookie_date});
            alreadyVisited = getCookie('theme-switch');
            $(".right-bar input:checkbox").prop('checked', false);
            $("#" + alreadyVisited).prop('checked', true);
            updateThemeSetting("auto-mode-switch");
        }
        else {
            $(".right-bar input:checkbox").prop('checked', false);
            $("#" + alreadyVisited).prop('checked', true);
            updateThemeSetting(alreadyVisited);
        }

        $("#light-mode-switch, #dark-mode-switch, #auto-mode-switch").on("change", function (e) {
            updateThemeSetting(e.target.id);
        });

        $("#password-addon, #apassword-addon").on('click', function () {
            if ($(this).siblings('input').length > 0) {
                $(this).siblings('input').attr('type') == "password" ? $(this).siblings('input').attr('type', 'input') : $(this).siblings('input').attr('type', 'password');
            }
        });
    }

    function updateThemeSetting(id) {
        if ($("#auto-mode-switch").prop("checked") == true && id === "auto-mode-switch") {
            $("html").removeAttr("dir");
            $("#light-mode-switch").prop("checked", false);
            $("#dark-mode-switch").prop("checked", false);
            var now = new Date(Date.now());
            var now_hours = now.getHours();
            var cookie_date = new Date();
            cookie_date.setMonth(cookie_date.getMonth() + 1);
            setCookie('theme-switch', 'auto-mode-switch', {secure: true, 'expires': cookie_date});
            if(now_hours >= 18 || now_hours < 6) {
                $("#bootstrap-style").attr('href', '/assets/css/'+ styles_version +'/bootstrap-dark.min.css');
                $("#app-style").attr('href', '/assets/css/'+ styles_version +'/app-dark.min.css');
                $("body").attr('data-sidebar', 'dark');
                setCookie('theme', 'dark', {secure: true, 'expires': cookie_date});
            }
            else {
                $("#bootstrap-style").attr('href', '/assets/css/'+ styles_version +'/bootstrap.min.css');
                $("#app-style").attr('href', '/assets/css/'+ styles_version +'/app.min.css');
                $("body").attr('data-sidebar', 'light');
                setCookie('theme', 'light', {secure: true, 'expires': cookie_date});
            }
        } else if ($("#light-mode-switch").prop("checked") == true && id === "light-mode-switch") {
            $("html").removeAttr("dir");
            $("body").attr('data-sidebar', 'light');
            $("#dark-mode-switch").prop("checked", false);
            $("#auto-mode-switch").prop("checked", false);
            $("#bootstrap-style").attr('href', '/assets/css/'+ styles_version +'/bootstrap.min.css');
            $("#app-style").attr('href', '/assets/css/'+ styles_version +'/app.min.css');
            var cookie_date = new Date();
            cookie_date.setMonth(cookie_date.getMonth() + 1);
            setCookie('theme', 'light', {secure: true, 'expires': cookie_date});
            setCookie('theme-switch', 'light-mode-switch', {secure: true, 'expires': cookie_date});
        } else if ($("#dark-mode-switch").prop("checked") == true && id === "dark-mode-switch") {
            $("html").removeAttr("dir");
            $("body").attr('data-sidebar', 'dark');
            $("#light-mode-switch").prop("checked", false);
            $("#auto-mode-switch").prop("checked", false);
            $("#bootstrap-style").attr('href', '/assets/css/'+ styles_version +'/bootstrap-dark.min.css');
            $("#app-style").attr('href', '/assets/css/'+ styles_version +'/app-dark.min.css');
            var cookie_date = new Date();
            cookie_date.setMonth(cookie_date.getMonth() + 1);
            setCookie('theme', 'dark', {secure: true, 'expires': cookie_date});
            setCookie('theme-switch', 'dark-mode-switch', {secure: true, 'expires': cookie_date});
        }

    }

    function initCheckAll() {
        $('#checkAll').on('change', function () {
            $('.table-check .form-check-input').prop('checked', $(this).prop("checked"));
        });
        $('.table-check .form-check-input').change(function () {
            if ($('.table-check .form-check-input:checked').length == $('.table-check .form-check-input').length) {
                $('#checkAll').prop('checked', true);
            } else {
                $('#checkAll').prop('checked', false);
            }
        });
    }

    function init() {
        initMetisMenu();
        initLeftMenuCollapse();
        initActiveMenu();
        initMenuItemScroll();
        initHoriMenuActive();
        initFullScreen();
        initRightSidebar();
        initDropdownMenu();
        initComponents();
        initSettings();
        Waves.init();
        initCheckAll();
        initPreloader();
    }

    init();

})(jQuery)