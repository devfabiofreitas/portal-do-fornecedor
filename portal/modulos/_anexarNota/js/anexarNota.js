function NotaFiscal() {
    this.state = 0;
    this.objetoPessoa = '';
    this.verificarDiaNota = '';
    this.objTemplate = '';
    this.projetoIsSas = false;

    var agora = new Date;
    var primeiroDia = moment().subtract(1, 'months').startOf('month').format('DD/MM/YYYY');
    var ultimoDia = moment().subtract(1, 'months').endOf('month').format('DD/MM/YYYY');
    var totalHoras = 0;

    /* var aprovacao = true; */


    this.init = async function () {
        loading.open();
        $('#periodoInicio').val(primeiroDia);
        $("#cnae").mask("0000-0/00");
        $('#periodoFim').val(ultimoDia);
        notaFiscal.listar();
        main.initHelpers();
        $("#btnModaltemplate").click(function () {
            $("#modaltemplate").modal("show");
            notaFiscal.template();
        });

        $(document).on("click", ".fechar", function () {
            let id = $(this).parents('.body-arquivo').attr('id');
            let url = $(this).data('value');
            Swal.fire({
                type: 'warning',
                title: "Excluir!",
                text: "Deseja realmente excluir esse arquivo?",
                showCancelButton: true,
                cancelButtonText: "Cancelar ",
                confirmButtonColor: "#dc3545 ",
                confirmButtonText: "Sim!",
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    notaFiscal.excluirArquivo(id, url);
                }
            });
        });

        $('.periodo').daterangepicker({
            singleDatePicker: true,
            autoApply: false,
            locale: {
                format: "DD/MM/YYYY",
                firstDay: 0,
                daysOfWeek: [
                    "Dom",
                    "Seg",
                    "Ter",
                    "Qua",
                    "Qui",
                    "Sex",
                    "Sab"
                ],
                monthNames: [
                    "Janeiro",
                    "Fevereiro",
                    "Março",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Agosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro"
                ]
            }
        });

        $('#salvar').click(function () {
            if (main.validarCampos('#formDados')) {
                Swal.fire("Ops... !", 'Por favor preencha os campos necessários.', "warning");
            } else {
                var uploadArquivo = $("#upload-file").val();
                if (uploadArquivo != "" && uploadArquivo != null) {
                    notaFiscal.verificarNota();
                    $(".label-upload").removeClass("bordaVermelha");
                    $(".texto").removeClass("textoPreeencher");
                    $(".iconUpload").removeClass("icon-Upload-color");
                } else {
                    $(".label-upload").addClass("bordaVermelha");
                    $(".iconUpload").addClass("icon-Upload-color");
                    $(".texto").addClass("textoPreeencher");
                    Swal.fire("Ops... !", 'Por favor anexe sua nota fiscal  ', "warning");
                }
            }
        });

        $('.periodo').on('change', function () {

            if (usuarioLancamentoHoras == 'H') {
                notaFiscal.listarHoras();
            }

            var periodoInicio = $("#periodoInicio").val().split("/");
            var periodoFim = $("#periodoFim").val().split("/");
        });

        $('#alterar').click(function () {
            notaFiscal.editar("formDados");
        });

        $(document).on('click', '.deleteFile', function () {
            $(this).parents('.body-arquivo').remove();
        });

        $(document).on('change', '#upload-file', function () {
            // main.anexos = []
            // main.infosAnexos = []
            var files = this.files;
            var nFiles = $('.lista-uploads .body-arquivo').length;
            for (var i = 0; i < files.length; i++) {
                var info = notaFiscal.validarArquivo(files[i]);
                var html = '';
                var id = 'file_' + (nFiles + i);

                html += '<div id="' + id + '" class="col-12 col-md-12 col-sm-12 body-arquivo unsaved text-center font-weight-bold mb-2">';
                if (info.error == undefined) {
                    html += '<div class="d-flex justify-content-between align-items-center">';
                    html += '<div class="d-flex align-items-center">'
                    html += '   <div><i class="fas fa-file-pdf pr-2"></i></div>';
                    html += '   <div class="file-name limitar-linha uma-linha pt-1"><a class="m-auto limitar-linha uma-linha">' + info.success + '</a></div> ';
                    html += '</div>'
                    html += '   <div id="close" class="text-right"><i data-value=""  class=" fechar fas fa-times ml-2"></i></div>';
                    html += '</div>'
                    var obj = {
                        "id": id,
                        "tipo": '',
                        "coluna": 'arquivos',
                        "caminho": 'notas_fiscais'
                    }
                    files[i].id = id
                    main.anexos.push(files[i]);
                    main.infosAnexos.push(obj);
                } else {
                    Swal.fire({
                        title: "Arquivo Inválido!",
                        text: "Clique para começar novamente!",
                        showCancelButton: false,
                        confirmButtonColor: "#15CB76",
                        confirmButtonText: "Ok",
                        reverseButtons: false
                    }).then((result) => {
                        if (result.value) {
                            location.reload();
                        }
                    });
                }
                html += '</div>';
                $('.lista-uploads').append(html);
                $('.campoUpload').addClass('d-none');
            }
        });

        $("#tipoTemplate").change(function () {
            var html = "";
            if (this.value == "horistas") {
                for (i in notaFiscal.objTemplate) {
                    html += `
                    - Cliente/Projeto: ${notaFiscal.objTemplate[i].Client}/${notaFiscal.objTemplate[i].Project} 
                    - Nome Consultor:  ${notaFiscal.objTemplate[i].User}
                    - Período: ${$("#periodoInicio").val()} a ${$("#periodoFim").val()}  -  (início mês, fechamento 30/31)
                    - Valor/Hora: R$00,00
                    - Valor total: R$00,00  
                    - Total de horas realizadas: ${notaFiscal.objTemplate[i].totalHoras}
                    - Dados bancários:  
                    Titular: ${notaFiscal.objTemplate[i].beneficiario}
                    Banco: ${notaFiscal.objTemplate[i].banco}
                    Ag: ${notaFiscal.objTemplate[i].agencia}
                    C/C: ${notaFiscal.objTemplate[i].conta}-${notaFiscal.objTemplate[i].digitoConta}
                    CNPJ: ${$("#cnpj").val()} `
                }

            } else {
                for (i in notaFiscal.objTemplate) {
                    html += `
                    - Cliente/Projeto: ${notaFiscal.objTemplate[i].Client}/${notaFiscal.objTemplate[i].Project} 
                    - Nome Consultor:  ${notaFiscal.objTemplate[i].User}
                    - Período: ${$("#periodoInicio").val()} a ${$("#periodoFim").val()}  -  (início mês, fechamento 30/31)
                    - Valor total: R$00,00  
                    - Total de horas realizadas: ${notaFiscal.objTemplate[i].totalHoras}
                    - Dados bancários:  
                    Titular: ${notaFiscal.objTemplate[i].beneficiario}
                    Banco: ${notaFiscal.objTemplate[i].banco}
                    Ag: ${notaFiscal.objTemplate[i].agencia}
                    C/C: ${notaFiscal.objTemplate[i].conta}-${notaFiscal.objTemplate[i].digitoConta} 
                    CNPJ: ${$("#cnpj").val()}  `
                }
            }
            $("#template").val(html);

        })
    }

    /* this.verificarAprovacaoHoras = function (){
        let params = {};
        params["mesReferencia"] =  moment().subtract(1,'months').startOf('month').format('YYYY-MM-DD');
        var formData = new FormData();
        formData.append('params', main.alterarValorJson(JSON.stringify(params)));
        var options  = { method: 'POST',
                       mode: 'cors',
                       cache: 'default' ,
                       body: formData};
      
        return fetch('../service/verificarAprovacaoHoras/index.php', options)
        .then(function(response) {
          return response.json()
        })
        .then((data) => {
          if(data.success){
            if(data.elements[0].aprovacao === "S"){
              aprovacao = true;
              return true;
            }
            aprovacao = false;
            return false;
          } else{
            aprovacao = false;
            return false;
          }
        });
    } */

    /*  this.verificarHorasMinimas = function(){
         if(totalHoras < 160 && !aprovacao){
             Swal.fire("Ops... !", 'Por favor, verifique se lançou todos os apontamentos referente ao mês anterior, caso já tenha lançado, aguarde a aprovação de suas horas antes de anexar sua nota.', "warning");
         } else {
             notaFiscal.verificarData();
         }
     }
  */
    this.template = function () {
        loading.open();
        var params = main.pegarDados($("#formDados"));
        main.executarAPI('', 'SELECT', '', JSON.stringify(params), async function (obj) {
            if (obj.success) {
                var html = '';
                notaFiscal.objTemplate = obj.elements;
                for (i in obj.elements) {
                    if ($("#tipoTemplate").val() == "horistas") {
                        html += `
                        - Cliente/Projeto: ${obj.elements[i].Client}/${obj.elements[i].Project} 
                        - Nome Consultor:  ${obj.elements[i].User}
                        - Período: ${$("#periodoInicio").val()} a ${$("#periodoFim").val()}  -  (início mês, fechamento 30/31)
                        - Valor/Hora: R$00,00
                        - Valor total: R$00,00  
                        - Total de horas realizadas: ${obj.elements[i].totalHoras == null ? "0" : obj.elements[i].totalHoras}
                        - Dados bancários:  
                        Titular: ${obj.elements[i].beneficiario}
                        Banco: ${obj.elements[i].banco}
                        Ag: ${obj.elements[i].agencia}
                        C/C: ${obj.elements[i].conta}-${obj.elements[i].digitoConta} 
                        CNPJ: ${$("#cnpj").val()} 

                         `
                    } else {
                        html += `
                        - Cliente/Projeto: ${obj.elements[i].Client}/${obj.elements[i].Project} 
                        - Nome Consultor:  ${obj.elements[i].User}
                        - Período: ${$("#periodoInicio").val()} a ${$("#periodoFim").val()}  -  (início mês, fechamento 30/31)
                        - Valor total: R$00,00  
                        - Total de horas realizadas: ${obj.elements[i].totalHoras == null ? "0" : obj.elements[i].totalHoras}
                        - Dados bancários:  
                        Titular: ${obj.elements[i].beneficiario}
                        Banco: ${obj.elements[i].banco}
                        Ag: ${obj.elements[i].agencia}
                        C/C: ${obj.elements[i].conta}-${obj.elements[i].digitoConta} 
                        CNPJ: ${$("#cnpj").val()} 
                        `
                    }
                }

                $("#template").val(html);
                loading.close();
            } else {
                $("#template").val(html);
                loading.close();
            }
        }, "listarTemplate");
    }

    this.listarHoras = async function () {
        var params = main.pegarDados($("#formDados"));

        params['periodoInicio'] = main.dateInsert($("#periodoInicio").val());
        params['periodoFim'] = main.dateInsert($("#periodoFim").val());

        main.executarAPI('', 'SELECT', '', JSON.stringify(params), async function (obj) {
            loading.close();
            if (obj.success) {
                var total_horas = 0;
                for (var i = 0; i < obj.elements.length; i++) {
                    total_horas += main.parseHoras(obj.elements[i].Duration_h);
                    if (obj.elements[i].Client == "SAS") {
                        notaFiscal.projetoIsSas = true;
                    }
                }
                var [horas] = main.parseMinutosToHoras(total_horas);
                totalHoras = horas;
                $('#totalHorasRealiazadas').val(horas);
                loading.close();
                notaFiscal.verificarData();
            } else {
                loading.close();
                $('#totalHorasRealiazadas').val('0');
                notaFiscal.verificarData();

            }
        }, "listarHoras");
    }

    this.listarHorasUteisMes = function () {
        loading.open();
        var params = {};
        params['periodoInicio'] = main.dateInsert($("#periodoInicio").val());
        params['periodoFim'] = main.dateInsert($("#periodoFim").val());
        return new Promise((resolve, reject) => {
            main.executarAPI('', 'SELECT', '', JSON.stringify(params), function (obj) {
                loading.close();
                if (obj.success) {
                    $("#horasUteis").val(obj.elements + ":00");
                } else {
                    $("#horasUteis").val("00:00");
                }
            }, "horasUteisMes");
        })
    }

    this.listar = function () {
        loading.open();
        var params = {};
        params['situacao'] != 'D'
        main.executarAPI("", "SELECT", "", JSON.stringify(params), function (obj) {
            if (obj.success) {
                notaFiscal.listarHorasUteisMes();
                var conta = obj.elements[0]['conta'];
                var digitoConta = obj.elements[0]['digitoConta'];
                var agencia = obj.elements[0]['agencia'];
                var digitoAgencia = obj.elements[0]['digitoAgencia'];
                for (var [key, value] of Object.entries(obj.elements[0])) {
                    if (key == "conta") {
                        $('#formDados [name="' + key + '"]').val(conta + '-' + digitoConta);
                    } else if (key == "agencia") {
                        $('#formDados [name="' + key + '"]').val(agencia + '-' + digitoAgencia);
                    } else {
                        $('#formDados [name="' + key + '"]').val(value);
                    }
                }
                $('.tab-content form').each(function (index) {
                    var id = $(this).attr('id');
                    var dados = main.pegarDados($('#' + id));
                    dadosCadastrais.formDados[id] = dados;
                });
                if (obj.elements[0]['lancamentoHoras'] == 'H') {
                    notaFiscal.listarHoras();
                } else if (obj.elements[0]['lancamentoHoras'] == 'D') {
                    loading.close();
                    $("input").attr("disabled", false);
                    $("#salvar").removeClass("d-none");
                    $("#totalHorasRealiazadas").removeAttr('readonly');

                }
            } else if (obj.status = 'SemEmpresa') {
                loading.close();
                Swal.fire({
                    title: "Empresa não cadastrada",
                    type: "error",
                    text: "Sua empresa não está cadastrada. Entre em contato com o Suporte antes de emitir sua nota",
                    showCancelButton: false,
                    confirmButtonColor: "#15CB76",
                    confirmButtonText: "Ok!",
                }).then((result) => {
                    window.location.href = "../../home.php";
                });
            }
        },
            'listarDados'
        );
    };

    this.validarArquivo = function (file) {
        var mime_types = ['application/pdf'];
        if (mime_types.indexOf(file.type) == -1) {
            return {
                "error": "Erro: tipo de arquivo não permitido - " + file.name
            };
        }
        if (file.size > 3 * 1024 * 1024) {
            return {
                "error": "Erro: ultrapassou o limite de    3MB - " + file.name
            };
        }
        return {
            "success": file.name
        };
    }

    this.verificarDataCadastro = function () {
        moment.locale("pt");
        const periodoInicial = moment($('#periodoInicio').val(), "DD/MM/YYYY");
        const periodoFinal = moment($('#periodoFim').val(), "DD/MM/YYYY");

        let periodo = moment().subtract(1, 'month').startOf('month');

        if (notaFiscal.projetoIsSas) {
            periodo = moment().subtract(2, 'month').startOf('month');
        }

        if ((periodoInicial < periodo || periodoFinal < periodo)) {
            Swal.fire("Ops... !", 'Não é possivel anexar notas do período anterior que ' + periodo.format("MMMM")[0].toUpperCase() + periodo.format("MMMM").substring(1), "warning");
            var primeiroDia = moment().subtract(1, 'months').startOf('month').format('DD/MM/YYYY');
            var ultimoDia = moment().subtract(1, 'months').endOf('month').format('DD/MM/YYYY');
            $('#periodoInicio').val(primeiroDia);
            $('#periodoFim').val(ultimoDia);
            return false
        }
        return true;
    }

    this.verificarData = function () {
        $.post("../service/verificarData/index.php", function () { })
            .done(function (result) {
                if ((result.search("gerenciador MySQL") > 0) || (result.search("erro na execução do Comando SQL") > 0)) {
                    loading.close();
                    Swal.fire("Ops... !", "Não foi possível estabelecer uma conexão com o Banco de Dados. Verifique sua conexão com a internet, e recarregue a página novamente. ", "warning");
                } else {
                    var obj = JSON.parse(result);
                    if (obj.success) {
                        notaFiscal.verificarDiaNota = obj.verificarDiaNota;
                        $("input").attr("disabled", false);
                        $("#salvar").removeClass("d-none");
                        Swal.fire("Ops... !", 'Prazo máximo para envio da nota fiscal é dia 10. Os consultores que fizerem a emissão e upload no portal após esse prazo estão sujeitos a atraso no pagamento equivalente a quantidade de dias de atraso na NF', "warning");
                    } else {
                        loading.close()
                        Swal.fire("Oops!", obj.message, "error");
                    }
                }
            })
            .fail(function () {
                loading.close();
                Swal.fire("Oops!", "Ocorreu um erro ao realizar o login. Verifique a conexão com a internet e tente novamente.", "error");
            });
    }

    this.verificarNota = function () {
        if (main.validarCampos('#formDados')) {
            Swal.fire("Ops... !", 'Por favor preencha os campos necessários.', "warning");
        } else {
            loading.open();

            var params = main.pegarDados($("#formDados"));

            if (params['totalHorasRealiazadas'] <= 0) {
                loading.close();
                Swal.fire("Ops... !", 'Total de horas não pode ser igual a 0', "warning");
            } else {
                var cnpj = $("#cnpj").val();
                var cnpj = cnpj.replace('.', '');
                var cnpj = cnpj.replace('.', '');
                var cnpj = cnpj.replace('/', '');
                var cnpj = cnpj.replace('-', '');
                var data = $("#periodoInicio").val().split("/");
                var caminho = "notas_fiscais/" + data[2] + "/" + data[1] + "/" + cnpj + "/";

                for (let i = 0; i < main.infosAnexos.length; i++) {
                    main.infosAnexos[i].caminho = caminho
                }

                main.executarAPI('', 'SELECT', '', JSON.stringify(params), function (obj) {
                    loading.close();
                    if (obj.success) {
                        Swal.fire({
                            type: "warning",
                            title: "Ops... !",
                            text: "Essa nota já esta cadastrada para o período selecionado!",
                            confirmButtonColor: "#15CB76",
                            confirmButtonText: "OK!",
                            reverseButtons: true
                        })
                    } else {
                        notaFiscal.cadastrar();
                    }
                }, "verificarNota");
            }
        }
    }

    this.cadastrar = function () {
        loading.open();
        var params = main.pegarDados($("#formDados"));
        var cnpj = $("#cnpj").val();
        var cnpj = cnpj.replace('.', '');
        var cnpj = cnpj.replace('.', '');
        var cnpj = cnpj.replace('/', '');
        var cnpj = cnpj.replace('-', '');
        var data = $("#periodoFim").val().split("/");
        var caminho = "notas_fiscais/" + data[2] + "/" + data[1] + "/" + cnpj + "/";
        params['mesReferencia'] = data[1] + "/" + data[2];
        main.infosAnexos[0].caminho = caminho;
        params['mes'] = data[1];
        params['nomeOriginal'] = main.anexos[0]['name'];
        params['valor'] = main.moneyInsert($('#valor').val());
        params['periodoInicio'] = main.dateInsert($("#periodoInicio").val());
        params['periodoFim'] = main.dateInsert($("#periodoFim").val());
        params['dataEmissao'] = main.dateInsert($("#dataEmissao").val());

        if (notaFiscal.verificarDiaNota == "true") {
            params['atraso'] = 'S';
        } else {
            params['atraso'] = 'N';
        }

        if (!notaFiscal.verificarDataCadastro()) {
            loading.close();
            return 0;
        }

        main.executarAPI('', 'INSERT', '', JSON.stringify(params), function (obj) {
            loading.close();
            if (obj.success) {
                notaFiscal.state = 1;
                main.anexos = [];
                main.infosAnexos = [];
                $('.lista-uploads').html('');
                $('#codigoConsultor').val('');
                $('#data').val('');
                toastr.success("Dados cadastrados com sucesso.", "Sucesso!");
                $("#upload-file").val('');
                $("#valor").val('');
                $('.campoUpload').removeClass('d-none');
                loading.close();
            } else {
                toastr.error("Ocorreu um erro. Verifique sua conexÃ£o com a internet, e tente novamente mais tarde.", "Ops... !");
                loading.close();
            }
        }, "anexarNota");
    }

    this.pegarArquivos = function (id) {
        var arquivos = $('#' + id).prop('files');
        if (arquivos) {
            var obj = {
                "id": "arquivo",
                "tipo": '',
                "coluna": 'arquivos',
                "caminho": 'arquivo_arquivoNotaFiscal/arquivoNotaFiscal_'
            }
            main.anexos.push(arquivos);
            main.infosAnexos.push(obj);
        }
    }

    this.excluirArquivo = function (id, url) {
        main.infosAnexos.map(function (obj, i) {
            if (obj.id == id) return i;
            else return 'foo';
        }).reverse().map(function (i) { // uso o reverse para ele usar indexes decrescentes
            if (typeof i == 'number') main.infosAnexos.splice(i, 1);
        })

        main.anexos.map(function (obj, i) {
            if (obj.id == id) return i;
            else return 'foo';
        }).reverse().map(function (i) { // uso o reverse para ele usar indexes decrescentes
            if (typeof i == 'number') main.anexos.splice(i, 1);
        })
        $('#' + id + '').remove();
        $("#upload-file").val('');
        $('.campoUpload').removeClass('d-none');
    }

    this.removerAcentoEvazio = function (str) {
        str = str.replace(/[ÀÁÂÃÄÅ]/g, "A");
        str = str.replace(/[àáâãäå]/g, "a");
        str = str.replace(/[ÈÉÊË]/g, "E");
        str = str.replace(/[^a-z0-9]/gi, '_')
        return str;
    }


}

let notaFiscal = new NotaFiscal();
notaFiscal.init();