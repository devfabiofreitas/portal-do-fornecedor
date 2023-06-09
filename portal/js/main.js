function Main() {
    this.anexos = [];
    this.infosAnexos = [];
    this.dadosOriginais = [];
    this.dadosAlterados = [];

    this.init = function () {
        $(document).on("keyup", ".mask-celular", function () {
            this.value = main.mascararCelular(this.value,$(this).parents(".form-group").prev().find(".tipoTelefone").val());
        });

        $(document).on("keyup", ".mask-cpf", function () {
            this.value = main.mascararCpf(this.value);
        });

        $(document).on("keyup", ".mask-cnpj", function () {
            this.value = main.mascaraCnpj(this.value);
        });

        $(document).on("keyup", ".mask-cep", function () {
            this.value = main.mascararCEP(this.value);
        });
        $(document).on("keyup change", ".mask-data-input", function () {
            $(this).mask('99/99/9999');
        });

        $(document).on("keyup change", ".mask-money", function () {
            $(this).mask('000.000.000.000.000,00', {
                reverse: true
            });
        });

        $(document).on("blur", ".validar-cpf", function () {
            if (this.value != "") {
                if (!main.validarCpf(this.value)) {
                    swal.fire("Ops... !", "Por favor, digite um cpf válido!", "warning");
                    this.value = "";
                }
            }
        });

        $('.btn-add-foto').click(function () {
            $(this).parents('.foto').trigger('click');
        });

        toastr.options = {
            "positionClass": "toast-top-right"
        }

        $("#smartwizard").on("showStep", function (e, anchorObject, stepIndex, stepDirection) {
            var span = $(anchorObject[0]).find('.span-smart');
            $('.header-pag .cadastro').text(' / ' + $(span).data('original-title'));
            if ($('.nome-identificacao').val() != undefined && $('.nome-identificacao').val() != '') $('.header-pag .identificacao').text(' / ' + $('.nome-identificacao').val());
        });

        $(document).on('change', function () {
            if ($('.nome-identificacao').val() != undefined && $('.nome-identificacao').val() != '') $('.header-pag .identificacao').text(' / ' + $('.nome-identificacao').val());
        });
    }

    this.initHelpers = function () {

        Handlebars.registerHelper('h_limitar_telefones', function (jsonTelefone, qtd) {
            var retorno = "";
            if (jsonTelefone && jsonTelefone != '') {
                for (var i = 0; i < jsonTelefone.length && i < qtd; i++) {
                    retorno += '<p  data-toggle="tooltip" title="' + jsonTelefone[i].telefone + '" class="mb-0 quebra-linha">' + jsonTelefone[i].tipo + ': ' + jsonTelefone[i].telefone + '</p>';
                }
            }
            return new Handlebars.SafeString(retorno);
        });

        Handlebars.registerHelper('h_situacao', function (situacao) {
            var retorno = "";
            if (situacao == "H") {
                retorno += 'Habilitado';
            } else if (situacao == "D") {
                retorno += 'Desabilitado';
            }
            return new Handlebars.SafeString(retorno);
        });

        Handlebars.registerHelper('h_data', function (data) {
            var retorno = "";
            if (data != "") {
                retorno = main.dateTimeList(data);
            }
            if (retorno == "00/00/0000") {
                retorno = ''
            }
            return new Handlebars.SafeString(retorno);
        });

        Handlebars.registerHelper('h_numeros', function (num) {
            var retorno = 0;
            if (num != "" && num != null) {
                retorno = num.toLocaleString('pt-br', {
                    minimumFractionDigits: 2
                });
            }
            return new Handlebars.SafeString(retorno);
        });

        Handlebars.registerHelper('retirarContato', function (contato, numero) {
            if (typeof numero != "object") {
                if (contato != "Contato") {
                    return contato + ": " + numero;
                }
            }
        });

        Handlebars.registerHelper('_retirarContato', function (tipo, telefone, idx) {
            if (tipo == "Celular Pessoal") {
                if (idx == 1) {
                    return new Handlebars.SafeString(tipo + ': ' + telefone);
                }
            }
        })

        Handlebars.registerHelper('logo-in-table', function (logo, chave) {
            var retorno = "";
            if (logo != "" && logo != null) {
                if (chave) {
                    var json = isJson(logo);

                    function isJson(str) {
                        try {
                            return JSON.parse(str);
                        } catch (e) {
                            return str;
                        }
                    }

                    var dataFoto = new Date(Math.max.apply(null, json.map(function (e) {
                        if (e.Tipo == chave) {
                            return new Date(e.Data);
                        } else {
                            return false;
                        }
                    })));

                    var foto = json.filter(e => {
                        var d = new Date(e.Data);
                        return d.getTime() == dataFoto.getTime() && e.Tipo == chave;
                    })[0];
                    if (foto && foto.Status != 'Excluído') {
                        retorno = "internetfiles/" + foto.caminho + foto.MD5;
                    } else {
                        retorno = 'adm/img/user.jpg';
                    }
                } else {
                    retorno = 'internetfiles/' + logo;
                }
            } else {
                retorno = 'adm/img/user.jpg';
            }

            return new Handlebars.SafeString(retorno);
        });

        // Handlebars.registerHelper('h_perido', function (data, dataFim) {

        //     retorno = main.h_perido(data, dataFim);

        //     return new Handlebars.SafeString(retorno);            
        // });
    }

    this.h_perido = function (data, dataFim) {
        var retorno = '';

        if ((data != '' && data != null && data != undefined) && (dataFim != '' && dataFim != null && dataFim != undefined)) {
            var inicio = data.split("-").reverse().join("/")
            var starts = moment().format("DD/MM/YYYY");
            var starts = starts.split('/');
            if (data.indexOf('/') == -1) {
                var data = data.split('-');
                var ends = moment([data[0], data[1], data[2]]);
            } else {
                var data = data.split('/');
                var ends = moment([data[2], data[1], data[0]]);
            }



            if (dataFim != undefined && dataFim != '' && dataFim != '00-00-0000') {
                var starts = moment(dataFim).format("DD/MM/YYYY");
                var starts = starts.split('/');
            }

            if (starts != "Invalid date") {

                var starts = moment([starts[2], starts[1], starts[0]]);

                var years = starts.diff(ends, 'year');
                ends.add(years, 'years');

                var months = starts.diff(ends, 'months');
                ends.add(months, 'months');

                // var days = starts.diff(ends, 'days');

                if (years != 0) {
                    if (months == 0) {
                        retorno = years + ' ano(s)';
                    } else {
                        retorno = years + ' ano(s) e ' + months + ' mês(es) ';
                    }
                } else {
                    retorno = months + ' mês(es)';
                }
            } else {
                retorno = '';
            }

        } else {
            retorno = '';
        }

        return retorno;
    }

    this.configBuscarCep = function (classe) {
        $(document).on('focusout', '.' + classe, function () {
            el = this;
            if ($(this).val().trim() == "") {
                toastr.warning("Digite um CEP válido!");
            } else {
                loading.open();
                $.get("https://viacep.com.br/ws/" + $(this).val() + "/json").done(function (result) {
                    if (result.erro) {
                        toastr.warning("Digite um CEP válido!");
                        return loading.close();
                    }

                    $(el).parents('.container-body').find('.logradouro').val(result.logradouro);
                    $(el).parents('.container-body').find('.bairro').val(result.bairro);
                    $(el).parents('.container-body').find('.cidade').val(result.localidade);
                    $(el).parents('.container-body').find('.estado').val(result.uf);
                    loading.close();
                }).fail(function () {
                    toastr.warning("Aconteceu um imprevisto ao buscar pelo o CEP.");
                    $(el).parents('.container-body').find('.logradouro').val('');
                    $(el).parents('.container-body').find('.bairro').val('');
                    $(el).parents('.container-body').find('.cidade').val('');
                    $(el).parents('.container-body').find('.estado').val('');
                    loading.close();
                });
            }
        });
    }

    this.configurarUpload = function (id, types, tipo) {
        $('#' + id).change(function () {
            var input = this;
            if ($(this).val()) {
                var img = this.files[0];
                var fileType = img["type"];
                var validImageTypes = types;


                var validExt = $.map(validImageTypes, function (val, i) {
                    var retorno = val.split('/');
                    return ' .' + retorno[1];
                });
                if ($.inArray(fileType, validImageTypes) < 0) {
                    $(this).val('');
                    swal.fire("Ops... !", "Arquivo não suportado. Extensões permitidas: " + validExt, "warning");
                } else {
                    var f = new FileReader();
                    f.onload = function (e) {
                        if (tipo && tipo == 'background') {
                            $(input).parents('.label-img').find('.foto-img').css('background-image', 'url(' + e.target.result + ')');
                        } else {
                            $(input).parents('.label-img').find('.foto-img').attr("src", e.target.result);
                        }
                        $(input).parents('.label-img').find('.btn-excluir-foto').removeClass('d-none');
                        $(input).parents('.label-img').find('.btn-add-foto').addClass('d-none');;
                    }
                    f.readAsDataURL(img);
                }
            }
        });
    }

    this.pegarImagemPerfil = function (idInput, id, tipo, coluna, caminho) {
        var img = $('#' + idInput).prop('files')[0];

        var obj = {
            "id": id,
            "tipo": tipo,
            "coluna": coluna,
            "caminho": caminho
        }

        main.infosAnexos.push(obj);

        if (img) {
            main.anexos.push(img);
        }
    }

    this.downloadFile = function (url, filename) {
        filename = filename ? filename : null;
        var link = document.createElement("a");
        link.setAttribute("style", "display: none");
        link.setAttribute("download", filename);
        link.setAttribute('target', '_blank');
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    this.moneyInsert = function (valor) {
        if (valor != undefined && valor != "") {
            valor = valor.replace(/[,]/g, "");
            valor = valor.replace(/[.]/g, "");
            var num = valor.length;
            if (num > 2) {
                valor = valor.substr(0, num - 2) + "." + valor.substr(num - 2, num);
            }
            return valor
        } else {
            return '';
        }

        // if (valor != undefined && valor != "") {
        //     var newValor = valor.replace('.', '');
        //     return newValor.replace(',', '.');
        // } else {
        //     return '';
        // }

    }

    this.dateInsert = function (date) {
        if (date != undefined) {
            var newDate = date.split('/').reverse().join('-');
            return newDate;
        } else {
            return '';
        }
    }

    this.dateList = function (date) {
        if (date != undefined && date != "" && date != '0000-00-00') {
            var newDate = date.split('-').reverse().join('/');
            return newDate;
        } else {
            return '';
        }
    }

    this.dateTimeList = function (date) {
        var newDate = '';
        if (date && date != '') {
            date = date.split(' ');
            newDate = date[0].split('-').reverse().join('/');
        }
        return newDate;
    }

    this.dateAndTimeList = function (date) {
        var newDate = '';
        if (date && date != '') {
            date = date.split(' ');
            newDate = date[0].split('-').reverse().join('/') + ' ' + date[1];
        }
        return newDate;
    }

    this.mascararCelular = function (v,tipo) {
        if (v) {
            if(tipo == "Estados unidos"){
                var number = v.replace(/[^\d]/g, "");
                number = number.replace(/(\d{3})(\d{0,3})(\d{0,3})/, function(match, p1, p2, p3) {
                    if (p2.length < 1)
                        return "(" + p1 + ") ";
                    else if (p3.length < 1)
                        return "(" + p1 + ") " + p2;
                    return "(" + p1 + ") " + p2 + "-" + p3;
                });
                if(number.length <= 13){
                    return number;
                }else{
                    max = number.length - 14
                    number = number.substring(0, number.length - max);
                    return number;
                }
            }else if(tipo == "Espanha"){
                var number = v.replace(/[^\d]/g, "");
                number = number.replace(/(\d{3})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/, function(match, p1, p2, p3,p4,p5) {
                    if (p2.length < 1)
                        return p1 + " " + p2 ;
                    else if (p3.length < 1)
                        return   p1 + " " + p2 + " " + p3;
                    else if(p4.length < 1)
                        return  p1 + " " + p2 + " " + p3 + " " + p4;
                    return p1 + " " + p2 + " " + p3 + " " + p4;
                });
                return number;
                
            }else if(tipo == "Portugal"){
                var number = v.replace(/[^\d]/g, "");
                number = number.replace(/(\d{3})(\d{0,3})(\d{0,3})/, function(match, p1, p2, p3) {
                    if (p1.length < 1)
                        return p1 
                    else if (p2.length < 1)
                        return  p1 + " " + p2 + " " + p3 
                    return p1 + " " + p2 + " " + p3 
                });
                if(number.length <= 10){
                    return number;
                }else{
                    max = number.length - 11
                    number = number.substring(0, number.length - max);
                    return number;
                }
            }else if(tipo == "Irlanda"){
                var number = v.replace(/[^\d]/g, "");
                number = number.replace(/(\d{3})(\d{0,3})(\d{0,4})/, function(match, p1, p2, p3) {
                    if (p1.length < 1)
                        return p1 
                    else if (p2.length < 1)
                        return  p1 + " " + p2 + " " + p3 
                    return p1 + " " + p2 + " " + p3 
                });
                if(number.length <= 11){
                    return number;
                }else{
                    max = number.length - 12
                    number = number.substring(0, number.length - max);
                    return number;
                }
            }else{
                v = v.replace(/\D/g, "");
                v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
                v = v.replace(/^(.{9})(\d)/, "$1-$2");
    
                if (v.length > 14) {
                    v = v.replace(/\-/, "");
                    v = v.replace(/^(.{10})(\d)/, "$1-$2");
                } else {
                    v = v.replace(/\-/, "");
                    v = v.replace(/^(.{9})(\d)/, "$1-$2");
                }
    
                if (v.length == 16) {
                    v = v.substring(0, v.length - 1);
                } else if (v.length > 16) {
                    max = v.length - 15;
                    v = v.substring(0, v.length - max);
                }
                return v;
            }

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

    this.mascararCEP = function (v) {
        if (v) {
            v = v.replace(/\D/g, "");
            v = v.replace(/^(.{5})(\d)/, "$1-$2");
            // 486.649.118-35
            // 07714-570
            if (v.length == 10) {
                v = v.substring(0, v.length - 1);
            } else if (v.length > 10) {
                max = v.length - 9;
                v = v.substring(0, v.length - max);
            }
            return v;
        } else {
            return "";
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

    this.mascaraData = function (el, tipo) {
        $.extend(true, $.fn.datetimepicker.defaults, {
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-clock-o',
                up: 'fa fa-arrow-up',
                down: 'fa fa-arrow-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-calendar-check',
                clear: 'fa fa-trash-alt',
                close: 'fa fa-times-circle'
            }
        });

        var formato = '';

        switch (tipo) {
            case 'data':
                formato = 'DD/MM/YYYY';
                break;
            case 'mes':
                formato = 'MM';
                break;
            case 'mes-ano':
                formato = 'MM/YYYY';
                break;
            case 'horas':
                formato = 'HH:mm';
                break;
            default:
                formato = 'DD/MM/YYYY';
                break;
        }

        $('body').on('focus', el, function () {
            $(el).datetimepicker({
                locale: 'pt-br',
                showClose: false,
                // debug:true,
                format: formato,
                widgetPositioning: {
                    horizontal: "left",
                    vertical: "auto"
                }

            });
        })
    }

    this.mascaraformatReal = function (int) {
        var tmp = int + '';
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if (tmp.length > 6)
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        return tmp;

    }


    this.parseHoras = function (horario) {
        // divide a string em duas partes, separado por dois-pontos, e transforma em número
        let [hora, minuto] = horario.split(':').map(v => parseInt(v));
        if (!minuto) { // para o caso de não ter os minutos
            minuto = 0;
        }
        return minuto + (hora * 60);
    }

    this.returnHorasMinutos = function (horario) {
        // divide a string em duas partes, separado por dois-pontos, e transforma em número
        let [hora, minuto] = horario.split(':').map(v => parseInt(v));
        return [hora, minuto]
    }

    this.parseMinutosToHoras = function (tempo) {
        let horas = Math.floor(tempo / 60);
        let minutos = tempo - (horas * 60);
        return [horas, minutos];
    }



    this.duracaoHoras = function (entrada1, saida1) {
        let soma = Math.abs(main.parseHoras(saida1) - main.parseHoras(entrada1));
        let horas = Math.floor(soma / 60);
        let minutos = soma - (horas * 60);
        if (soma != 0) {
            return [horas, minutos];
        } else {
            horas = 0;
            minutos = 0;
            return [horas, minutos];
        }
    }



    this.formatMoney = function (n, c, d, t) {
        c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }

    this.logo_in_table = function (logo, chave) {
        var retorno = "";
        if (logo != "" && logo != null) {
            if (chave) {

                var json = isJson(logo);

                function isJson(str) {
                    try {
                        return JSON.parse(str);
                    } catch (e) {
                        return str;
                    }
                }

                var dataFoto = new Date(Math.max.apply(null, json.map(function (e) {
                    if (e.Tipo == chave) {
                        return new Date(e.Data);
                    } else {
                        return false;
                    }
                })));

                var foto = json.filter(e => {
                    var d = new Date(e.Data);
                    return d.getTime() == dataFoto.getTime() && e.Tipo == chave;
                })[0];
                if (foto && foto.Status != 'Excluído' && foto.Status != 'Excluido') {
                    retorno = "internetfiles/" + foto.caminho + foto.MD5;
                } else {
                    retorno = 'adm/img/user.jpg';
                }
            } else {
                retorno = 'internetfiles/' + logo;
            }
        } else {
            retorno = 'adm/img/user.jpg';
        }

        return retorno;
    }

    this.validarCpf = function (cpf) {
        cpf = cpf.replace(/[^0-9]/g, '');
        var numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;
        if (cpf.length < 11) {
            return false;
        }
        for (i = 0; i < cpf.length - 1; i++)
            if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        if (!digitos_iguais) {
            numeros = cpf.substring(0, 9);
            digitos = cpf.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;
            numeros = cpf.substring(0, 10);
            soma = 0;
            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;
            return true;
        } else
            return false;
    }

    this.validarCampos = function (formulario) {
        var valido = false;
        $(formulario + ' .obrigatorio').each(function () {
            if (!$(this).val()) {
                $(this).addClass('is-invalid');
                valido = true;
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        return valido;
    }

    this.mudarVisualizacao = function (modo) {
        if (modo == 'salvar') {
            $('#salvar').removeClass('d-none');
            $('#alterar').addClass('d-none');
            $('#limpar').removeClass('d-none');
            // $('#voltar').addClass('d-none');
            $('#download').addClass('d-none');
        }
        if (modo == 'alterar') {
            $('#salvar').addClass('d-none');
            $('#alterar').removeClass('d-none');
            $('#limpar').removeClass('d-none');
            // $('#voltar').addClass('d-none');
            $('#download').addClass('d-none');
        }

        if (modo == 'visualizar-arquivo') {
            $('#salvar').addClass('d-none');
            $('#alterar').addClass('d-none');
            $('#limpar').addClass('d-none');
            $('#voltar').removeClass('d-none');
            $('#download').removeClass('d-none');
        }
    }

    this.processarHtmlHandlebars = function (script_id, elements) {
        var source = $(script_id).html();
        var template = Handlebars.compile(source);
        if (elements == "") {
            return source;
        } else {
            return template(elements);
        }
    }

    this.executarAPI = function (procedure, tipo, acao, params, callback, service) {
        var formData = new FormData();
        formData.append('params', main.alterarValorJson(params));
        formData.append('procedure', procedure);
        formData.append('tipo', tipo);
        formData.append('acao', acao);

        if (main.anexos.length > 0 && main.infosAnexos.length > 0) {
            var totalfiles = main.anexos.length;
            for (var index = 0; index < totalfiles; index++) {
                formData.append("files[]", main.anexos[index]);
            }

            formData.append("infoFiles", JSON.stringify(main.infosAnexos));
        } else if (main.infosAnexos.length > 0) {
            formData.append("infoFiles", JSON.stringify(main.infosAnexos));
        }



        var parametros = JSON.parse(params);
        if (parametros.idImg && $('#' + parametros.idImg).val() != '') {
            var imagem = document.getElementById(parametros.idImg).files[0];
            formData.append("imagem", imagem);
        }

        if (!service) {
            service = '../service/geral/';
        } else {
            if (service.indexOf('/') == -1) {
                service = '../service/' + service + '/';
            } else {
                service = service;
            }
        }

        $.ajax({
            url: service,
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                var retorno = main.convertToJson(data);
                if(retorno['alias'] == 'SESSAO_INVALIDA'){
                    var url = (window.parent.location.href).replace('modulos', 'login') 
                    window.parent.location.href = url + '?time=expirado';  
                } else {
                    callback(retorno);
                }
            },
            error: function (err) {
                callback({
                    'success': false,
                    'message': 'Não foi possível estabelecer uma conexão com o Banco de Dados. Verifique sua conexão com a internet, e recarregue a página novamente.'
                });
            }
        });
    }

    this.getFormData = function (form) {
        var unindexed_array = form.serializeArray();
        var indexed_array = {};
        $.map(unindexed_array, function (n, i) {
            if ($('#' + form[0].id + ' .form-control[name="' + n['name'] + '"]').parents('.body-dados-multiplos').length == 0) {
                var name = n['name'].split('-');
                if (name.length > 1) name = name[0];
                indexed_array[name] = n['value'];
            }
        });

        if ($(form).find('.body-dados-multiplos').length > 0) {
            $(form).find('.body-dados-multiplos').each(function () {
                var id = $(this).attr('id');
                var arr = [];
                if (id == undefined) id = $(this).find('.form-row').attr('id');
                $(this).find('.container-body').each(function () {
                    if (!$(this).hasClass('nao-alterar')) {
                        var obj = {};
                        $(this).find('.form-control').each(function () {
                            if ($(this).parents('.body-dados-multiplos-2').length == 0) {
                                var name = $(this).attr('name').split('-');
                                if (name.length > 1) name = name[0];
                                if ($(this).hasClass('mask-money')) {
                                    if ($(this).val() != '') {
                                        obj[name] = parseFloat(Number(main.moneyInsert($(this).val())).toFixed(2));
                                    } else {
                                        obj[name] = $(this).val()
                                    }
                                } else {
                                    var valor = $(this).val();
                                    if ($(this).hasClass('campo-inteiro') && valor != '') {
                                        valor = parseInt(valor);
                                    }
                                    if ($(this).hasClass('campo-decimal') && valor != '') {
                                        valor = valor.replaceAll('.', '')
                                        valor = parseFloat(valor.replaceAll(',', '.'));
                                    }
                                    obj[name] = valor;
                                }
                            }
                        });

                        if ($(this).find('.body-dados-multiplos-2').length > 0) {
                            $(this).find('.body-dados-multiplos-2').each(function () {
                                var id2 = $(this).attr('id').split('-');
                                var id2 = id2[0];
                                var obj2 = {};
                                $(this).find('.form-control').each(function () {
                                    var name = $(this).attr('name').split('-');
                                    if (name.length > 1) name = name[0];

                                    if ($(this).hasClass('mask-money')) {
                                        if ($(this).val() != '') {
                                            obj2[name] = parseFloat(Number(main.moneyInsert($(this).val())).toFixed(2));
                                        } else {
                                            obj2[name] = $(this).val()
                                        }
                                    } else {
                                        var valor = $(this).val();
                                        if ($(this).hasClass('campo-inteiro') && valor != '') {
                                            valor = parseInt(valor);
                                        }
                                        if ($(this).hasClass('campo-decimal') && valor != '') {
                                            valor = valor.replaceAll('.', '')
                                            valor = parseFloat(valor.replaceAll(',', '.'));
                                        }
                                        obj2[name] = valor;
                                    }
                                });
                                obj[id2] = obj2;
                            });
                        }
                        arr.push(obj);
                    }
                });
                indexed_array[id] = arr;
            });
        }

        return indexed_array;
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

        if ($(form).find('.body-dados-multiplos').length > 0) {
            $(form).find('.body-dados-multiplos').each(function () {
                var id = $(this).attr('id');
                var arr = [];
                if (id == undefined) id = $(this).find('.form-row').attr('id');

                $(this).find('.container-body').each(function () {
                    if (!$(this).hasClass('nao-alterar')) {

                        var obj = {};
                        $(this).find('.form-control').each(function () {
                            if ($(this).parents('.body-dados-multiplos-2').length == 0) {
                                var name = $(this).attr('name').split('-');
                                if (name.length > 1) name = name[0];
                                if ($(this).hasClass('mask-money')) {
                                    if ($(this).val() != '') {
                                        obj[name] = Number(main.moneyInsert($(this).val())).toFixed(2);
                                    } else {
                                        obj[name] = $(this).val()
                                    }

                                } else if ($(this).hasClass('input-tipo-data')) {
                                    obj[name] = main.dateInsert($(this).val());
                                } else {
                                    if ($(this).val()) {
                                        obj[name] = $(this).val().replaceAll('"', "'");
                                    } else {
                                        obj[name] = $(this).val();
                                    }
                                }
                            }
                        });

                        if ($(this).find('.body-dados-multiplos-2').length > 0) {
                            $(this).find('.body-dados-multiplos-2').each(function () {

                                var id2 = $(this).attr('id').split('-');
                                var id2 = id2[0];
                                var obj2 = {};
                                $(this).find('.form-control').each(function () {
                                    var name = $(this).attr('name').split('-');
                                    if (name.length > 1) name = name[0];
                                    // obj2[name] = $(this).val();
                                    if ($(this).hasClass('mask-money')) {
                                        if ($(this).val() != '') {
                                            obj2[name] = Number(main.moneyInsert($(this).val())).toFixed(2);
                                        } else {
                                            obj2[name] = $(this).val()
                                        }
                                    } else if ($(this).hasClass('input-tipo-data')) {
                                        obj2[name] = main.dateInsert($(this).val());
                                    } else {
                                        if ($(this).val()) {
                                            obj2[name] = $(this).val().replaceAll('"', "'");
                                        } else {
                                            obj2[name] = $(this).val();
                                        }
                                    }
                                });
                                obj[id2] = obj2;
                            });
                        }

                        var qtdVazios = 0;
                        for (var [key, value] of Object.entries(obj)) {
                            if (value == '') qtdVazios++;
                        }

                        if (qtdVazios != Object.keys(obj).length) {
                            arr.push(obj);
                        }
                    }
                });

                if (arr.length > 0) {
                    indexed_array[id] = arr;
                }
            });
        } else {
            $.map(unindexed_array, function (n, i) {
                if ($('#' + form[0].id + ' .form-control[name="' + n['name'] + '"]').parents('.body-dados-multiplos').length == 0) {
                    var name = n['name'].split('-');
                    if (name.length > 1) name = name[0];
                    if ($('#' + form[0].id + ' .form-control[name="' + n['name'] + '"]').hasClass('mask-money')) {
                        indexed_array[name] = Number(main.moneyInsert(n['value'])).toFixed(2);
                    } else if ($('#' + form[0].id + ' .form-control[name="' + n['name'] + '"]').hasClass('input-tipo-data')) {
                        indexed_array[name] = main.dateInsert(n['value']);
                    } else {
                        if (n['value']) {
                            indexed_array[name] = n['value'].replaceAll('"', "'")
                        } else {
                            indexed_array[name] = n['value'];
                        }
                    }
                }
            });
        }

        return indexed_array;
    }

    this.alterarValorJson = function (jsonParametro) {
        var json = jsonParametro;
        if (json.indexOf('\\r\\n') != -1) {
            json = json.replaceAll("\\r\\n", "\\\\r\\\\n")
        } else if (json.indexOf('\\n') != -1) {
            json = json.split("\\n").join("\\\\n")
        }
        try {
            return json
        } catch (error) {
            return jsonParametro
        }
    }

    this.filtrar = function (form) {
        var html = '';
        $('#' + form + ' .form-control').each(function () {
            if ($(this).val() != "") {
                if (!$(this).is("select")) {
                    nome = $(this).val();
                } else {
                    nome = $(this).find('option[value="' + $(this).val() + '"]').text();
                }
                html += '<div class="py-2 mr-2">';
                html += '   <a href="javascript:void(0)" data-value="' + $(this).attr('name') + '" class="excluir-filtro"><i class="fa fa-times text-secondary mr-1"></i></a>';
                html += '   <button class="btn btn-secondary rounded-pill"><img class="mr-1" width="13px" src="../../../img/filter-white.svg">' + $(this).prev('label').text() + ': ' + nome + '</button>';
                html += '</div>';
            }
        });

        html += '<a href="javascript:void(0)" class="excluir-filtros font-weight-bold text-secondary">Limpar Filtros</a>';
        $('#activeFilters').html(html);
        if ($('#activeFilters div').length == 0) $('#activeFilters').html('');
    }

    this.numeroParaMoeda = function (numero) {
        if (numero != undefined && numero != "" && numero != null || numero == 0) {
            var numero = numero.toFixed(2).split('.');
            numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
            return numero.join(',');
        } else {
            return "";
        }
    }

    this.numeroMoedaSemCifrao = function (numero) {
        if (numero != undefined && numero != "") {
            var numero = numero.toFixed(2).split('.');

            numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
            return numero.join(',');
        } else {
            return "";
        }
    }

    this.setarLog = function (dadosOriginais, dadosAlterados) {

        var log = {};
        var dadosAntigos = {};
        var dadosNovos = {};

        for (var [key, value] of Object.entries(dadosOriginais)) {
            if ($.isArray(dadosOriginais[key])) {
                var tmpJson = dadosAlterados[key];
                var tmpArrAntigo = [];
                var tmpArr = [];
                $(tmpJson).each(function (index) {
                    if (dadosOriginais[key][index]) {
                        var diferente = 0;
                        for (var [chave, valor] of Object.entries(this)) {
                            if (this[chave] != dadosOriginais[key][index][chave]) {
                                diferente++;
                            }
                        }
                        if (diferente > 0) {
                            tmpArrAntigo.push(dadosOriginais[key][index]);
                            tmpArr.push(this);
                        }
                    } else {
                        tmpArr.push(this);
                    }
                });
                if (tmpArr.length > 0) {
                    dadosAntigos[key] = tmpArrAntigo;
                    dadosNovos[key] = tmpArr;
                    // log[key] = tmpArr;
                }
            } else {
                if (dadosOriginais[key] != dadosAlterados[key]) {
                    dadosAntigos[key] = dadosOriginais[key];
                    dadosNovos[key] = dadosAlterados[key];
                    // log[key] = dadosAlterados[key];
                }
            }
        }

        log = {
            dadosAntigos,
            dadosNovos
        }

        if (main.infosAnexos.length > 0) {
            log['dadosNovos']['documentos'] = main.infosAnexos;
        }

        return log;
    }

    this.criarLog_BK = function (dadosAntigos, form) {

        var dadosNovos = {};
        if (dadosAntigos.length > 0) {
            dadosAntigos = dadosAntigos.filter(function (v, i) {
                return v.form == form;
            });

            var antigo = dadosAntigos[0].dados;
        } else {
            var antigo = [];
        }

        dadosAntigos = {};

        if (form == 'formDadosResponsavel') {
            var params = [];
            params['comercial'] = main.getConsultores('comercial', projetos.consultores);
            for (i = 0; i < params['comercial'].length; i++) {
                params['comercial'][i]['descricaoConsultor'] = $('.descri-' + params['comercial'][i]['codigo']).val()
            }
            params['lider'] = main.getConsultores('lider', projetos.lideres);
            for (i = 0; i < params['lider'].length; i++) {
                params['lider'][i]['descricaoConsultor'] = $('.descri-' + params['lider'][i]['codigo']).val()
            }

            var novos = params;

        } else {
            var novos = main.pegarDados($("#" + form));
        }

        for (var [key, value] of Object.entries(novos)) {
            if (antigo[key] != undefined) {
                if (value != antigo[key]) {
                    dadosNovos[key] = value;
                    dadosAntigos[key] = antigo[key];
                }
            } else {
                if (value != '') { dadosNovos[key] = value; }
                dadosAntigos[key] = "";
            }
        }

        if (Object.keys(antigo).length > 0) {
            log = {
                dadosAntigos,
                dadosNovos
            }
        } else {
            log = { dadosNovos }
        }

        if (main.infosAnexos.length > 0) {
            log['dadosNovos']['documentos'] = main.infosAnexos;
        }

        return log;
    }

    this.criarLog = function (dadosAntigos, form, jsonExcluido, getConsultor) {
        var dadosNovos = {};

        if (dadosAntigos.length > 0) {
            dadosAntigos = dadosAntigos.filter(function (v, i) {
                return v.form == form;
            });

            var antigo = dadosAntigos[0].dados;
        } else {
            var antigo = [];
        }
        if (form == 'formDadosResponsavel') {
            var params = [];
            params['comercial'] = main.getConsultores('comercial', projetos.consultores);
            for (i = 0; i < params['comercial'].length; i++) {
                params['comercial'][i]['descricaoConsultor'] = $('.descri-' + params['comercial'][i]['codigo']).val()
            }
            params['lider'] = main.getConsultores('lider', projetos.lideres);
            for (i = 0; i < params['lider'].length; i++) {
                params['lider'][i]['descricaoConsultor'] = $('.descri-' + params['lider'][i]['codigo']).val()
            }
            var novos = params;
        } else {
            var novos = main.pegarDados($("#" + form));


            if (getConsultor) {
                getConsultor = JSON.parse(getConsultor);
                getConsultor.map(function (v, i) {
                    if (v.id == "lider" || v.id == "pre_venda") {
                        novos[v.id] = main.getConsultores(v.id, v.json);
                    } else {
                        novos[v.id] = main.getConsultores(v.id, v.json)[0];
                    }
                });
            }
        }

        if (jsonExcluido[form] == undefined) {
            jsonExcluido[form] = []

        }
        dadosAntigos = {};
        var arr = [];
        for (var [key, value] of Object.entries(novos)) {
            if (typeof value == 'object') {
                if (getConsultor && getConsultor.length > 0) {
                    if (antigo[key]) {
                        if (antigo[key].codigo != novos[key].codigo) {
                            dadosAntigos[key] = antigo[key];
                            dadosNovos[key] = novos[key];
                        }
                    } else {
                        dadosNovos[key] = novos[key];
                    }


                } else {
                    var posicaoTrocar = 0;
                    var linhasTabela = $("#" + form).find('.container-body');
                    if (antigo[key] != undefined) {
                        if (novos[key].length != antigo[key].length || novos[key].length != antigo[key].length - jsonExcluido[form].length) {
                            if (jsonExcluido[form].length > 0) {
                                for (let i = 0; i < antigo[key].length; i++) {
                                    if (jsonExcluido[form].indexOf(i) == -1) {
                                        for (let k = 0; k < linhasTabela.length; k++) {
                                            if ($(linhasTabela[k]).attr('id') == i) {
                                                var objLog = {};
                                                $(linhasTabela[k]).find('.form-control').each(function () {
                                                    if ($(this).parents(".container-body").attr("id") != '') {
                                                        var name = $(this).attr('name').split('-');
                                                        if (name.length > 1) name = name[0];
                                                        if ($(this).hasClass('mask-money')) {
                                                            objLog[name] = Number(main.moneyInsert($(this).val())).toFixed(2);
                                                        } else if ($(this).hasClass('input-tipo-data')) {
                                                            objLog[name] = main.dateInsert($(this).val());
                                                        } else {
                                                            objLog[name] = $(this).val();
                                                        }
                                                        var qtdVazios = 0;
                                                        for (var [key, value] of Object.entries(objLog)) {
                                                            if (value == '') qtdVazios++;
                                                        }

                                                    }

                                                });
                                                if (Object.keys(objLog).length != 0) {
                                                    arr.push(objLog);
                                                    var arrayNovosVal = [];
                                                    var arrayAntigosVal = [];
                                                    for (const [keyNovo, valueNovo] of Object.entries(arr[posicaoTrocar])) {
                                                        for (const [keyAnt, valueAnt] of Object.entries(antigo[key][i])) {
                                                            if (keyNovo == keyAnt) {
                                                                if (valueNovo != valueAnt) {
                                                                    if (dadosAntigos[key] != null && dadosAntigos[key].length > 0) {
                                                                        if (arrayAntigosVal.indexOf(antigo[key][i]) == -1) {
                                                                            arrayAntigosVal.push(antigo[key][i])
                                                                            dadosAntigos[key].push(antigo[key][i])
                                                                        }
                                                                    } else {
                                                                        arrayAntigosVal.push(antigo[key][i])
                                                                        dadosAntigos[key] = [antigo[key][i]];
                                                                    }
                                                                    if (dadosNovos[key] != null && dadosNovos[key].length > 0) {
                                                                        if (arrayNovosVal.indexOf(arr[posicaoTrocar]) == -1) {
                                                                            arrayNovosVal.push(arr[posicaoTrocar])
                                                                            dadosNovos[key].push(arr[posicaoTrocar])
                                                                        }
                                                                    } else {
                                                                        arrayNovosVal.push(arr[posicaoTrocar])
                                                                        dadosNovos[key] = [arr[posicaoTrocar]];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    posicaoTrocar++
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                for (let k = 0; k < linhasTabela.length; k++) {
                                    var objLog = {};
                                    if ($(linhasTabela[k]).attr('id') != '') {
                                        $(linhasTabela[k]).find('.form-control').each(function () {
                                            var name = $(this).attr('name').split('-');
                                            if (name.length > 1) name = name[0];
                                            if ($(this).hasClass('mask-money')) {
                                                objLog[name] = Number(main.moneyInsert($(this).val())).toFixed(2);
                                            } else if ($(this).hasClass('input-tipo-data')) {
                                                objLog[name] = main.dateInsert($(this).val());
                                            } else {
                                                objLog[name] = $(this).val();
                                            }
                                            var qtdVazios = 0;
                                            for (var [key, value] of Object.entries(objLog)) {
                                                if (value == '') qtdVazios++;
                                            }
                                        });
                                        arr.push(objLog);
                                        var arrayNovosVal = [];
                                        var arrayAntigosVal = [];
                                        for (const [keyNovo, valueNovo] of Object.entries(arr[posicaoTrocar])) {
                                            if (antigo[key] != '') {
                                                if (antigo[key][k] != undefined) {
                                                    for (const [keyAnt, valueAnt] of Object.entries(antigo[key][k])) {

                                                        if (keyNovo == keyAnt) {
                                                            if (valueNovo != valueAnt) {
                                                                if (dadosAntigos[key] != null && dadosAntigos[key].length > 0) {
                                                                    if (arrayAntigosVal.indexOf(antigo[key][k]) == -1) {
                                                                        arrayAntigosVal.push(antigo[key][k])
                                                                        dadosAntigos[key].push(antigo[key][k])
                                                                    }
                                                                } else {
                                                                    arrayAntigosVal.push(antigo[key][k])
                                                                    dadosAntigos[key] = [antigo[key][k]];
                                                                }

                                                                if (dadosNovos[key] != null && dadosNovos[key].length > 0) {
                                                                    if (arrayNovosVal.indexOf(arr[posicaoTrocar]) == -1) {
                                                                        arrayNovosVal.push(arr[posicaoTrocar])
                                                                        dadosNovos[key].push(arr[posicaoTrocar])
                                                                    }
                                                                } else {
                                                                    arrayNovosVal.push(arr[posicaoTrocar])
                                                                    dadosNovos[key] = [arr[posicaoTrocar]];
                                                                }
                                                            }
                                                        }

                                                    }
                                                }
                                            }
                                        }
                                        posicaoTrocar++
                                    }
                                }
                            }
                        } else {
                            for (let k = 0; k < linhasTabela.length; k++) {
                                var objLog = {};
                                if ($(linhasTabela[k]).attr('id') != '') {
                                    $(linhasTabela[k]).find('.form-control').each(function () {
                                        var name = $(this).attr('name').split('-');
                                        if (name.length > 1) name = name[0];
                                        if ($(this).hasClass('mask-money')) {
                                            objLog[name] = Number(main.moneyInsert($(this).val())).toFixed(2);
                                        } else if ($(this).hasClass('input-tipo-data')) {
                                            objLog[name] = main.dateInsert($(this).val());
                                        } else {
                                            objLog[name] = $(this).val();
                                        }
                                        var qtdVazios = 0;
                                        for (var [key, value] of Object.entries(objLog)) {
                                            if (value == '') qtdVazios++;
                                        }
                                    });
                                    arr.push(objLog);
                                    if (Object.keys(objLog).length != 0) {
                                        var arrayNovosVal = [];
                                        var arrayAntigosVal = [];
                                        for (const [keyNovo, valueNovo] of Object.entries(arr[posicaoTrocar])) {
                                            if (antigo[key] != '' && antigo[key] != undefined) {
                                                if (antigo[key][k] != undefined) {
                                                    for (const [keyAnt, valueAnt] of Object.entries(antigo[key][k])) {

                                                        if (keyNovo == keyAnt) {
                                                            if (valueNovo != valueAnt) {

                                                                if (dadosAntigos[key] != null && dadosAntigos[key].length > 0) {
                                                                    if (arrayAntigosVal.indexOf(antigo[key][k]) == -1) {
                                                                        arrayAntigosVal.push(antigo[key][k])
                                                                        dadosAntigos[key].push(antigo[key][k])
                                                                    }
                                                                } else {
                                                                    arrayAntigosVal.push(antigo[key][k])
                                                                    dadosAntigos[key] = [antigo[key][k]];
                                                                }

                                                                if (dadosNovos[key] != null && dadosNovos[key].length > 0) {
                                                                    if (arrayNovosVal.indexOf(arr[posicaoTrocar]) == -1) {
                                                                        arrayNovosVal.push(arr[posicaoTrocar])
                                                                        dadosNovos[key].push(arr[posicaoTrocar])
                                                                    }
                                                                } else {
                                                                    arrayNovosVal.push(arr[posicaoTrocar])
                                                                    dadosNovos[key] = [arr[posicaoTrocar]];
                                                                }
                                                            }
                                                        }

                                                    }
                                                }
                                            }
                                        }
                                        posicaoTrocar++
                                    }
                                }
                            }
                        }
                        var arrNovos = []
                        var linhasTabela = $("#" + form).find('.container-body')
                        var countAdd = novos[key].length - (antigo[key].length - jsonExcluido[form].length);
                        if (countAdd > 0) {
                            dadosNovos[key + " adicionado"] = [];
                            for (let idx = linhasTabela.length; idx > linhasTabela.length - countAdd; idx--) {
                                var obj = {};
                                $(linhasTabela[idx - 1]).find('.form-control').each(function () {
                                    var name = $(this).attr('name').split('-');
                                    if (name.length > 1) name = name[0];
                                    if ($(this).hasClass('mask-money')) {
                                        obj[name] = Number(main.moneyInsert($(this).val())).toFixed(2);
                                    } else if ($(this).hasClass('input-tipo-data')) {
                                        obj[name] = main.dateInsert($(this).val());
                                    } else {
                                        obj[name] = $(this).val();
                                    }

                                    var qtdVazios = 0;
                                    for (var [key, value] of Object.entries(obj)) {
                                        if (value == '') qtdVazios++;
                                    }
                                });
                                arrNovos.push(obj);
                            }
                            dadosNovos[key + " adicionado"] = arrNovos
                        }
                        if (jsonExcluido[form].length > 0) {
                            dadosAntigos[key + " deletado"] = [];
                            $(jsonExcluido[form]).map(function (i, val) {
                                dadosAntigos[key + " deletado"].push(antigo[key][val])
                            })
                        }
                    } else {
                        var arrayNovosVal = [];
                        var arrayAntigosVal = [];
                        $(novos[key]).each(function (index) {
                            for (var [chave, idx] of Object.entries(this)) {
                                if (dadosNovos[key] != null && dadosNovos[key].length > 0) {
                                    if (arrayNovosVal.indexOf(this) == -1) {
                                        arrayNovosVal.push(this)
                                        dadosNovos[key].push(this)
                                    }
                                } else {
                                    arrayNovosVal.push(this)
                                    dadosNovos[key] = [this];
                                }
                            }
                        })
                    }
                }
            } else {
                if (form != "formSenioridade") {
                    if (antigo[key] != undefined) {
                        if (value != antigo[key]) {
                            dadosNovos[key] = value;
                            dadosAntigos[key] = antigo[key];
                        }
                    } else {
                        if (value != '') { dadosNovos[key] = value; }
                        dadosAntigos[key] = "";
                    }
                }

            }
        }
        if (form == "formSenioridade") {
            var senioridade = [];
            $("#tabela-senioridade tbody").find("tr").each(function (index, value) {
                senioridade.push({
                    "Senioridade": parseInt($(this).find('.senioridade').text()),
                    "Nome": $(this).find('.nome').html(),
                    "FLAH": $(this).find('.flah').val(),
                    "Horas": $(this).find('.hora').val(),
                    "P_Min": $(this).find('.p_min').val(),
                    "P_Max": $(this).find('.p_max').val(),
                    "Descricao": $(this).find('.descricao').text()
                });
            });

            var arrayAntigosVal = [];
            var arrayNovosVal = [];
            for (i in antigo) {
                for (var [keyAntigo, valueAntigo] of Object.entries(antigo[i])) {
                    for (var [keyNovo, valueNovo] of Object.entries(senioridade[i])) {
                        if (keyAntigo == keyNovo) {
                            if (valueNovo != valueAntigo) {
                                if (dadosAntigos["senioridade"] != null && dadosAntigos["senioridade"].length > 0) {
                                    if (arrayAntigosVal.indexOf(antigo[i]) == -1) {
                                        arrayAntigosVal.push(antigo[i])
                                        dadosAntigos["senioridade"].push(antigo[i])
                                    }
                                } else {
                                    arrayAntigosVal.push(antigo[i])
                                    dadosAntigos["senioridade"] = [antigo[i]];
                                }
                                if (dadosNovos["senioridade"] != null && dadosNovos["senioridade"].length > 0) {
                                    if (arrayNovosVal.indexOf(senioridade[i]) == -1) {
                                        arrayNovosVal.push(senioridade[i])
                                        dadosNovos["senioridade"].push(senioridade[i])
                                    }
                                } else {
                                    arrayNovosVal.push(senioridade[i])
                                    dadosNovos["senioridade"] = [senioridade[i]];
                                }
                            }
                        }
                    }
                }
            }
        }
        if (Object.keys(antigo).length > 0) {

            log = {
                dadosAntigos,
                dadosNovos: dadosNovos
            }
        } else {
            log = { dadosNovos: dadosNovos }
        }
        if (main.infosAnexos.length > 0) {
            log['dadosNovos']['documentos'] = main.infosAnexos;
        }
        // return main.teste(log)
        return log
    }

    this.convertToJson = function (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return str;
        }
    }

    this.getConsultores = function (id, consultores) {
        var arr = [];

        $('.body-consultor-json#' + id).find('.body-consultor').each(function () {
            if (!$(this).hasClass('nao-alterar')) {
                var obj = {};
                var id = $(this).data('value');
                var imagem = '';

                var consultor = consultores.filter(function (value, key) {
                    return value.codigo == id;
                });

                if (consultor[0]) {
                    var jsonDoc = main.convertToJson(consultor[0]['documentos']);
                    if (jsonDoc && jsonDoc != null) {
                        var dataFoto = new Date(Math.max.apply(null, jsonDoc.map(function (e) {
                            if (e.Tipo == 'Foto de Perfil') {
                                return new Date(e.Data);
                            } else {
                                return false;
                            }

                        })));

                        var foto = jsonDoc.filter(e => {
                            var d = new Date(e.Data);
                            return d.getTime() == dataFoto.getTime() && e.Tipo == 'Foto de Perfil';
                        })[0];

                    }

                    if (foto && foto.Status != 'Excluído') {
                        imagem = [foto];
                    }

                    obj = {
                        codigo: consultor[0]['codigo'],
                        nome: consultor[0]['nome'],
                        endereco: main.convertToJson(consultor[0]['endereco']),
                        telefone: main.convertToJson(consultor[0]['telefone']),
                        email: consultor[0]['email'],
                        documentos: imagem
                    }

                    arr.push(obj);
                } else {
                    return '';
                }
            }
        });
        return arr;
    }

    this.changeStartConsultor = function (botao, id, consultores) {
        $(document).on('change', '.btn-add-consultor.' + botao, function () {

            var select = $(this).parents('.form-row')[0];
            var select = $(select).find('select');
            var cod = $(this).parents('.body-multi-content').find('select').val();
            var codProposta = $(this).parents('.body-multi-content-proposta').find('select').val();

            var dados = {
                elements: ''
            };

            if (cod != '') {
                if ($("#" + id).find('#consultor-' + cod).length == 0) {
                    dados.elements = consultores.filter(function (value, key) {
                        return value.codigo == cod;
                    });
                    for (var [key, value] of Object.entries(dados.elements[0])) {

                        if (key == 'telefone' || key == 'endereco') {

                            var json = main.convertToJson(value)
                            // if(json){
                            //     var json = json.filter(function(v){
                            //          if(v.contato){
                            //              delete v
                            //              return '';
                            //          }else{
                            //             return v;
                            //          }
                            //      })

                            // }else{
                            //     json = '';
                            // }

                            dados.elements[0][key] = main.convertToJson(json);
                        }
                    }

                    var html = main.processarHtmlHandlebars('#template-visualizar-pessoa', dados);

                    if (codProposta == undefined) {
                        $('#' + id).append(html);
                    } else {
                        $('#' + id).html(html);
                        $('#' + id).find('.bt-menos').remove();
                    }
                }

                $(select).find('option[value="' + cod + '"]').prop('hidden', true);
                $(select).val('');
            }
        });
    }

    this.startConsultor = function (botao, id, consultores) {
        $(document).on('click', '.btn-add-consultor.' + botao, function () {
            var select = $(this).parents('.form-row')[0];
            var select = $(select).find('select');
            var cod = $(this).parents('.body-multi-content').find('select').val();
            var codProposta = $(this).parents('.body-multi-content-proposta').find('select').val();
            var dados = {
                elements: ''
            };

            if (cod != '') {

                if ($("#" + id).find('#consultor-' + cod).length == 0) {
                    dados.elements = consultores.filter(function (value, key) {
                        return value.codigo == cod;
                    });
                    for (var [key, value] of Object.entries(dados.elements[0])) {
                        if (key == 'telefone' || key == 'endereco') {
                            dados.elements[0][key] = main.convertToJson(value);
                        }
                    }

                    var html = main.processarHtmlHandlebars('#template-visualizar-pessoa', dados);

                    if (codProposta == undefined) {
                        $('#' + id).append(html);
                    } else {
                        $('#' + id).html(html);
                    }

                }

                $(select).find('option[value="' + cod + '"]').prop('hidden', true);
                $(select).val('');
            }
        });
    }

    this.CardOuTabela = function (value) {
        if (value == "Tabela") {
            $('.TabelaParaCard').addClass('d-none');
            $('.CardParaTabela').removeClass('d-none');
            $('.btn-tabela').addClass('border-blue-active');
            $('.btn-card').removeClass('border-blue-active');
            $('.btn-tabela').attr('disabled', true);
            $('.btn-card').attr('disabled', false);
        } else {
            $('.TabelaParaCard').removeClass('d-none');
            $('.CardParaTabela').addClass('d-none');
            $('.btn-card').addClass('border-blue-active');
            $('.btn-tabela').removeClass('border-blue-active');
            $('.btn-card').attr('disabled', true);
            $('.btn-tabela').attr('disabled', false);
        }
    }

    this.BotaoMenos = function (form, body) {
        var formulario = '#' + form;
        quantidade = $(formulario + ' .btn-remove').length;
        if (quantidade == 2) {
            $(body).remove();
            $(formulario + ' .btn-remove').attr('disabled', true);
        } else {
            $(formulario + ' .btn-remove').attr('disabled', false);

            $(body).remove();
        }
    }

    this.smartWizardButtons = function () {
        $(window).on('load', function () {
            $('.sw-btn-next').html('<svg xmlns="http://www.w3.org/2000/svg" width="7.876" height="13.777" viewBox="0 0 7.876 13.777"><g id="icon-arrow" transform="translate(0 13.777) rotate(-90)"><path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M5.5,6.887.289,1.678A.985.985,0,1,1,1.684.288l5.906,5.9a.983.983,0,0,1,.029,1.358L1.688,13.49A.985.985,0,0,1,.293,12.1Z" transform="translate(13.777) rotate(90)" fill="#fff"/></g></svg>');
            $('.sw-btn-prev').html('<svg xmlns="http://www.w3.org/2000/svg" width="7.876" height="13.777" viewBox="0 0 7.876 13.777"><g id="icon-arrow" transform="translate(7.876) rotate(90)"><path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M5.5,6.887.289,1.678A.985.985,0,1,1,1.684.288l5.906,5.9a.983.983,0,0,1,.029,1.358L1.688,13.49A.985.985,0,0,1,.293,12.1Z" transform="translate(13.777) rotate(90)" fill="#fff"/></g></svg>');
        });
    }

    this.SmartWizardCores = function () {
        $('ul .nav-link').removeClass('trocarCorNav');
        $('ul .nav-link').removeClass('done');

        $('.tab-pane').each(function () {
            var vazio = 0;

            $(this).find('.form-control').each(function () {
                if ($(this).val() != '') vazio = 1;
            });

            if (vazio > 0) {
                var id = $(this).attr('id');
                $('ul .nav-link ').each(function () {

                    if ($(this).attr('href') == '#' + id) {
                        $(this).addClass('trocarCorNav');
                        $(this).addClass('done');
                    }
                })
            }
        });
    }

    this.apelido = function (texto) {
        return main.removeAcento(texto).replace(/ /g, "_").toLowerCase();
    }

    this.removeAcento = function (text) {
        text = text.toLowerCase();
        text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
        text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
        return text;
    }
}
let main = new Main();
main.init();