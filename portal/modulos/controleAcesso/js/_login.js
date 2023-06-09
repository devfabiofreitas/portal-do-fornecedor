function Login() {
    this.init = function () {

        var preencherUsuario = localStorage.getItem('usuario');

        if (preencherUsuario != null && preencherUsuario != 'undefined') {
            $('#usuario').val(preencherUsuario);
        }


        $('#formLogin').on('submit', function (e) {
            e.preventDefault();
            login.logar();
        });

        $('#formResponsavelTecnico').on('submit', function (e) {
            $("#responsavelTecnicoModal").modal('hide');
            e.preventDefault();
            login.logar();
        });

        $('[data-toggle="tooltip"]').tooltip();

        $('#formFaleConosco').on('submit', function (e) {
            e.preventDefault();
            login.faleConosco();
        });

        $('#formAlterarSenha input').on('keypress', function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                login.AlterarSenha();
            }
        });

        $('#logout').click(function () {
            window.location = '../modulos/controleAcesso/service/logoff/';
        });

        $('#usuario').keyup(function () {
            
            var txt = $(this).val().trim();
            
            if(isNaN(parseInt(txt.charAt(0)))){
                 $('#usuario').removeClass('mask-cpf');
                 $('#usuario').removeClass('mask-cnpj');
            } else {
                if ($(this).val().replace(/[^0-9]/g, "").length <= 11 ){
                    $('#usuario').removeClass('mask-cnpj');
                    $('#usuario').addClass('mask-cpf');  
                } else {
                    $('#usuario').removeClass('mask-cpf');
                    $('#usuario').addClass('mask-cnpj');
                }
            }
        });

        $('#mostrar').click(function (e) {
            e.preventDefault();
            if ($('#senha').attr('type') == 'password') {
                $('#senha').attr('type', 'text');
                $('#mostrar').attr('class', 'fa fa-eye');
            } else {
                $('#senha').attr('type', 'password');
                $('#mostrar').attr('class', 'fa fa-eye-slash');
            }
        });

        $(document).on("keyup", ".mask-cnpj", function () {
            this.value = login.mascaraCnpj(this.value);
        });

        $(document).on("keyup", ".mask-cpf", function () {
            this.value = login.mascararCpf(this.value);
        });

        var url_string = window.location.href;
        var url = new URL(url_string);
        time = url.searchParams.get("time");

        if (time && time == 'expirado') {
            Swal.fire("Oops!", "Tempo de sessão expirado! <br> Faça login novamente para continuar no sistema.", "warning");
        }
    }

    this.mascaraCnpj = function (v) {
        if (v) {
            v = v.replace(/\D/g, '');
            v = v.replace(/^(\d{2})(\d)/g, "$1.$2");
            v = v.replace(/^(.{6})(\d)/, "$1.$2");
            v = v.replace(/^(.{10})(\d)/, "$1/$2");
            v = v.replace(/^(.{15})(\d)/, "$1-$2");
            return v;
        } else {
            return "";
        }
    }

    this.mascararCpf = function (v) {
        if (v) {
            v = v.replace(/\D/g, "");
            v = v.replace(/^(\d{3})(\d)/g, "$1.$2");
            v = v.replace(/^(.{7})(\d)/, "$1.$2");
            v = v.replace(/^(.{11})(\d)/, "$1-$2");

            if (v.length == 15) {
                v = v.substring(0, v.length - 1);
            } else if (v.length > 15) {
                max = v.length - 14;
                v = v.substring(0, v.length - max);
            }
            return v;
        } else {
            return "";
        }
    }

    this.validarCampos = function (idForm) {
        var valido = false;

        $(idForm + ' .campo-obrigatorio').each(function () {
            if ($(this).hasClass("obrigatorio") == true) {
                if ($(this).val() == null || $(this).val() == '') {
                    $(this).parent().find('.form-control').removeClass('is-valid');
                    $(this).parent().find('.form-control').addClass('is-invalid');
                    $(this).parents('.input-icon').removeClass('is-valid');
                    $(this).parents('.input-icon').addClass('is-invalid');
                    $(this).parents('.form-group').find('.invalid-feedback').removeClass('sr-only');
                    valido = true;
                } else {

                    $(this).parent().find('.form-control').addClass('is-valid');
                    $(this).parent().find('.form-control').removeClass('is-invalid');
                    $(this).parents('.input-icon').addClass('is-valid');
                    $(this).parents('.input-icon').removeClass('is-invalid');
                    $(this).parents('.form-group').find('.invalid-feedback').addClass('sr-only');
                }
            }
        });

        return valido;
    }

    this.pegarDados = function (form) {
        $("textarea").each(function () {
            try {
                this.value = this.value.replaceAll('"', "'")
            } catch (error) {
            }
        })
        $("input").each(function () {
            try {
                this.value = this.value.replaceAll('"', "'")
            } catch (error) {
            }
        })
        var unindexed_array = form.serializeArray();
        var indexed_array = {};


        $.map(unindexed_array, function (n, i) {
            var name = n['name'].split('-');
            if (name.length > 1) name = name[0];

            if (n['value']) {
                indexed_array[name] = n['value'].replaceAll('"', "'")
            } else {
                indexed_array[name] = n['value'];
            }
        });


        return indexed_array;
    }

    this.logar = function () {
        if (!login.validarCampos('#formLogin')) {
            if (navigator.onLine) {
                loading.open();

                var formLogin = login.pegarDados($("#formLogin"));

                var formData = new FormData();
                var params = login.pegarDados($("#formResponsavelTecnico"));
                formData.append('params', JSON.stringify(params));

                $('#responsavelTecnico').children('option').remove();

                $.ajax({
                    url: '../modulos/controleAcesso/service/login/index.php',
                    type: 'POST',
                    data: formData,
                    headers: formLogin,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        if ((result.search("gerenciador MySQL") > 0) || (result.search("erro na execução do Comando SQL") > 0)) {
                            loading.close();
                            Swal.fire("Ops... !", "Não foi possível estabelecer uma conexão com o Banco de Dados. Verifique sua conexão com a internet, e recarregue a página novamente. ", "warning");
                        } else {
                            var obj = login.convertToJson(result);

                            if (obj.success) {
                                if ($('#guardarUsuario').is(':checked')) {
                                    localStorage.setItem('usuario', formLogin["usuario"]);
                                }

                                if (obj.elements && obj.elements.length) {
                                    for (var i = 0; i < obj.elements.length; i++) {
                                        $('#responsavelTecnico').append('<option value="' + obj.elements[i]['codigo'] + '">' + obj.elements[i]['nome'] + '</option>');
                                    }
                                    loading.close();
                                    $("#responsavelTecnicoModal").modal('show');
                                } else {
                                    login.verificarGestor();
                                }
                            } else {
                                loading.close();
                                if(obj.status == 'bloqueado'){
                                        Swal.fire({
                                        type: 'error',
                                        title: obj.message,
                                        showCancelButton: false,
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: 'Ok'
                                    });
                                } else if (obj.status == 'inexistente') {
                                        Swal.fire({
                                        type: 'error',
                                        title: obj.message,
                                        showCancelButton: false,
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: 'Ok'
                                    });
                                } else {
                                    Swal.fire({
                                        type: 'error',
                                        title: obj.message,
                                        html: "<p>Lembre-se para primeiro acesso os dados são o CNPJ e CPF, conforme exemplo abaixo:</p>" +
                                         "<p>Quantidade de tentativas realizadas: " + obj.tentativas + "</p>" +
                                         "<p>Com 4 tentativas  o acesso será bloqueado</p>",
                                        footer: "<b>Usuário:</b> CNPJ (XX.XXX.XXX/XXXX-XX) Símbolos são adicionados automaticamente <b>Senha:</b> CPF(XXXXXXXXXXX) Não digitar nenhum símbolo",
                                        showCancelButton: false,
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: 'Ok'
                                    });
                                }
                            }
                        }
                    },
                    error: function (err) {
                        loading.close();
                        Swal.fire({
                            type: 'error',
                            text: 'Não foi possível estabelecer uma conexão com o Banco de Dados. Verifique sua conexão com a internet, e recarregue a página novamente.',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        });
                    }
                });

            } else {
                loading.close();
                Swal.fire("Oops!", "Parece que você não está conectado a internet. Verifique a conexão e tente novamente.", "warning");
            }
        }
    }

    this.verificarGestor = function(){
        $.ajax({
            url: '../modulos/controleAcesso/service/verificarGestor/index.php',
            type: 'POST',
            data: "",
            cache: false,
            contentType: false,
            processData: false,
            success: function (result) {
                if ((result.search("gerenciador MySQL") > 0) || (result.search("erro na execução do Comando SQL") > 0)) {
                    loading.close();
                    Swal.fire("Ops... !", "Não foi possível estabelecer uma conexão com o Banco de Dados. Verifique sua conexão com a internet, e recarregue a página novamente. ", "warning");
                } else {
                    loading.close();
                    window.location.href = '../modulos/';
                }
            },
            error: function (err) {
                loading.close();
                Swal.fire({
                    type: 'error',
                    text: 'Não foi possível estabelecer uma conexão com o Banco de Dados. Verifique sua conexão com a internet, e recarregue a página novamente.',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                });
            }
        });
    }

    this.faleConosco = function () {
        var params = login.pegarDados($("#formFaleConosco"));

        if (login.validarCampos('#formFaleConosco')) {
            Swal.fire("Ops... !", 'Por favor preencha os campos necessários.', "warning");
            loading.close();
        } else {
            $.post("../modulos/controleAcesso/service/faleConosco/", "&nome=" + params['nome'] + "&usuario=" + params['usuario'] + "&email=" + params['email'] + "&categoria=" + params['categoria'] + "&mensagem=" + params['mensagem'], function () { })
                .done(function (result) {
                    $('#faleConoscoModal').modal('hide');
                    if ((result.search("gerenciador MySQL") > 0) || (result.search("erro na execução do Comando SQL") > 0)) {
                        loading.close();
                        Swal.fire("Ops... !", "Não foi possível estabelecer uma conexão com o Banco de Dados. Verifique sua conexão com a internet, e recarregue a página novamente. ", "warning");
                    } else {
                        var obj = JSON.parse(result);
                        if (obj.success) {
                            loading.close();
                            Swal.fire({
                                title: 'Email enviado com sucesso!',
                                text: "Sua solicitação foi enviada com sucesso!",
                                icon: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Ok'
                            }).then((result) => {
                                window.location.href = '../login/';
                            });
                        } else {
                            loading.close()
                            Swal.fire("Oops!", obj.message, "error");
                        }
                    }
                })
                .fail(function () {
                    loading.close();
                    $('.modal').modal('hide');
                    Swal.fire("Oops!", "Ocorreu um erro ao enviar o email de recuperação. Verifique a conexão com a internet e tente novamente.", "error");
                });
        }
    }

    this.convertToJson = function (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return str;
        }
    }
};
var login = new Login();
login.init();