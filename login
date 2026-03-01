

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Авторизация | Панель администратора Matreshka</title>
    <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="application-name" content="Matreshka Panel">
<meta name="theme-color" content="#8649D4">
<meta name="description" content="Панель администратора Matreshka">
<meta name="robots" content="none">
<meta name="yandex-verification" content="4d9e93a09b42e7a3" />
<script type="text/javascript">
(function(m, e, t, r, i, k, a) {
    m[i] = m[i] || function() {
        (m[i].a = m[i].a || []).push(arguments)
    };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) {
            return;
        }
    }
    k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k,
        a)
})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(92870891, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
});
</script>
<noscript>
    <div><img src="https://mc.yandex.ru/watch/92870891" style="position:absolute; left:-9999px;" alt="" /></div>
</noscript>    <link href="/assets/libs/select2/select2.min.css" rel="stylesheet" type="text/css" />

<link href="/assets/css/v3.0/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
<link href="/assets/css/v3.0/app.min.css" id="app-style" rel="stylesheet" type="text/css" /><link href="/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
<link href="/assets/libs/toastr/build/toastr.min.css" rel="stylesheet" type="text/css" />
<link href="/assets/libs/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />
<link href="/assets/libs/bootstrap-datepicker/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css">
<link href="/assets/libs/spectrum-colorpicker2/spectrum.min.css" rel="stylesheet" type="text/css">
<link href="/assets/libs/bootstrap-timepicker/css/bootstrap-timepicker.min.css" rel="stylesheet" type="text/css">
<link href="/assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css" rel="stylesheet" type="text/css" />
<link href="/assets/libs/@chenfengyuan/datepicker/datepicker.min.css" rel="stylesheet">
<link href="/assets/css/v3.0/main.css" rel="stylesheet" type="text/css" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />    <link href="/assets/css/v3.0/custom/_profile.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="/assets/libs/owl.carousel/assets/owl.carousel.min.css">
    <link rel="stylesheet" href="/assets/libs/owl.carousel/assets/owl.theme.default.min.css">
</head>

<body class="auth-body-bg">
    <div>
        <div class="container-fluid p-0">
            <div class="row g-0">
                <div class="col-xl-9">
                    <div class="auth-full-bg pt-lg-5 p-4">
                        <div class="w-100">
                            <div class="bg-overlay"></div>
                            <div class="d-flex h-100 flex-column">
                                <div class="p-4 mt-auto">
                                    <div class="row justify-content-center">
                                        <div class="col-lg-7">
                                            <div class="text-center">

                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3">
                    <div class="auth-full-page-content p-md-5 p-4">
                        <div class="w-100">

                            <div class="d-flex flex-column h-100">
                                <div class="mb-4 mb-md-5">
                                    <a href="/" class="d-block auth-logo">
                                        <img src="/assets/images/logo-mini.svg" alt="" height="40" class="auth-logo-dark">
                                        <img src="/assets/images/logo-mini.svg" alt="" height="40" class="auth-logo-light">
                                    </a>
                                </div>
                                <div class="my-auto">

                                    <div>
                                        <h5 class="text-primary">Matreshka Admin Panel</h5>
                                        <p class="text-muted">Authorization is required to continue.</p>
                                    </div>

                                    <div class="mt-4">
                                        <form class="form-horizontal" id="login-form">

                                            <div class="mb-3 login-block">
                                                <label for="login" class="form-label">Login</label>
                                                <input type="text" autocomplete="off" autofocus required class="form-control" id="login" placeholder="Enter your username" name="login" value="">
                                                <span class="text-danger" id="login_error"></span>
                                            </div>

                                            <div class="mb-3 password-block">
                                                <label class="form-label">Password</label>
                                                <div class="input-group auth-pass-inputgroup">
                                                    <input type="password" autocomplete="off" required name="password" class="form-control" placeholder="Enter the password" aria-label="Password" aria-describedby="password-addon" value="">
                                                    <button class="btn btn-light" type="button" id="password-addon"><i class="mdi mdi-eye-outline"></i></button>
                                                </div>
                                                <span class="text-danger" id="password_error"></span>
                                            </div>

                                            <div class="mb-3 qr-block">
                                                <div class="mb-3 align-items-center justify-content-center d-flex flex-column">
                                                    <h4 class="card-title">Two-factor authorization</h4>
                                                    <p class="card-title-desc text-center qr-desc"></p>
                                                    <img class="img-thumbnail img-fluid" src="" data-holder-rendered="true">
                                                </div>
                                                <label class="form-label">Code from the application</label>
                                                <input type="code" autocomplete="off" name="code" class="form-control text-center" placeholder="Enter the code" aria-label="Code" aria-describedby="code-addon" value="">
                                                <span class="text-danger" id="code_error"></span>
                                            </div>

                                            <div class="mt-3 d-grid">
                                                <button class="btn btn-primary waves-effect waves-light" type="submit" value="Login">
                                                    <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> 
                                                    <span>Log in to the system</span>
                                            </button>
                                            </div>

                                            <div class="mt-4 text-center">
                                                <a class="text-muted"><i class="mdi mdi-lock me-1"></i>Forgot your password? Contact the senior administration</a>
                                            </div>

                                        </form>
                                        <!--
                                        <div class="mt-5 text-center">
                                            <p>Нет аккаунта? <a href="/register" class="fw-medium text-primary"> Создать прямо сейчас</a></p>
                                        </div>
                                        -->
                                    </div>
                                </div>

                                <div class="mt-4 mt-md-5 text-center">
                                    <p class="mb-0">
                                        <script>document.write(new Date().getFullYear())</script> © Matreshka Team.
                                    </p>
                                    <div class="dropdown d-inline-block">
                                        <button type="button" class="btn waves-effect" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img src="assets/images/flags/en.jpg" alt="Язык" height="16">
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-end" style="">

                                            <a href="/login?lang=ru" class="dropdown-item notify-item language" data-lang="ru">
                                                <img src="assets/images/flags/ru.jpg" alt="user-image" class="me-1" height="12"> <span class="align-middle">Русский</span>
                                            </a>

                                            <a href="/login?lang=en" class="dropdown-item notify-item language" data-lang="en">
                                                <img src="assets/images/flags/en.jpg" alt="user-image" class="me-1" height="12"> <span class="align-middle">English</span>
                                            </a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<div class="right-bar">
    <div data-simplebar class="h-100">
        <div class="rightbar-title d-flex align-items-center px-3 py-4">

            <h5 class="m-0 me-2">Settings</h5>

            <a href="javascript:void(0);" class="right-bar-toggle ms-auto">
                <i class="mdi mdi-close noti-icon"></i>
            </a>
        </div>

        <hr class="mt-0" />
        <h6 class="text-center mb-0">Mode selection</h6>

        <div class="p-4">
            <div class="mb-2">
                <img src="/assets/images/themes/auto-theme.svg" class="img-fluid img-thumbnail" alt="">
            </div>
            <div class="form-check form-switch mb-3">
                <input class="form-check-input theme-choice" type="checkbox" id="auto-mode-switch" checked>
                <label class="form-check-label" for="auto-mode-switch">Auto</label>
            </div>

            <div class="mb-2">
                <img src="/assets/images/themes/light-theme.svg" class="img-fluid img-thumbnail" alt="">
            </div>
            <div class="form-check form-switch mb-3">
                <input class="form-check-input theme-choice" type="checkbox" id="light-mode-switch">
                <label class="form-check-label" for="light-mode-switch">Light theme</label>
            </div>

            <div class="mb-2">
                <img src="/assets/images/themes/dark-theme.svg" class="img-fluid img-thumbnail" alt="">
            </div>
            <div class="form-check form-switch mb-3">
                <input class="form-check-input theme-choice" type="checkbox" id="dark-mode-switch" data-bsStyle="/assets/css/bootstrap-dark.min.css" data-appStyle="/assets/css/app-dark.min.css">
                <label class="form-check-label" for="dark-mode-switch">Dark theme</label>
            </div>
        </div>

    </div>
</div>

<div class="rightbar-overlay"></div>
<!-- JAVASCRIPT -->
<script src="/assets/libs/jquery/jquery.min.js"></script>
<script src="/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="/assets/libs/metismenu/metisMenu.min.js"></script>
<script src="/assets/libs/simplebar/simplebar.min.js"></script>
<script src="/assets/libs/node-waves/waves.min.js"></script>
<script src="/assets/libs/toastr/build/toastr.min.js"></script>
<script src="/assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script src="/assets/libs/bootstrap-datepicker/locales/bootstrap-datepicker.ru.min.js"></script>
<script>
var styles_version = 'v3.0';
$.fn.datepicker.defaults.language = 'ru';
$.fn.datepicker.defaults.clearBtn = true;
</script>
<script src="/assets/libs/spectrum-colorpicker2/spectrum.min.js"></script>
<script src="/assets/libs/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>
<script src="/assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js"></script>
<script src="/assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
<script src="/assets/libs/@chenfengyuan/datepicker/datepicker.min.js"></script>
<script src="/assets/libs/sweetalert2/sweetalert2.min.js"></script>
<script src="/assets/libs/select2/select2.min.js"></script>
<script src="/assets/libs/jquery-cookies/jquery.cookie.js"></script>
<script src="/assets/js/socket.io.min.js"></script>
<script src="/assets/js/v3.6/app.js"></script>
<script>
    var Language = {"TwoFA_Text_1":"The account does not have 2FA enabled.\u003Cbr\u003ETo continue, you need to configure its operation.\u003Cbr\u003EScan the QR code with a suitable application, such as Google Authenticator, or copy the key from below and paste it into the application manually:\u003Cbr\u003E","TwoFA_Text_2":"The account has 2FA enabled.\u003Cbr\u003ETo continue, you must enter the code from the application","Login":"Login","Check_Code":"Check the code","Enter_System":"Log in to the system","System_Error":"System error","Unknown_Error":"Unknown error","Please_Wait":"Please wait a bit","Try_Again":"Try again in \u003Cstrong\u003E\u003C\/strong\u003E seconds","Redirecting":"Redirecting"};
</script>

<script src="/assets/libs/owl.carousel/owl.carousel.min.js"></script>

<script src="/assets/js/auth-2-carousel.init.js"></script>
<script src="/assets/js/v3.6/auth/auth-login.js"></script>

</body>
</html>