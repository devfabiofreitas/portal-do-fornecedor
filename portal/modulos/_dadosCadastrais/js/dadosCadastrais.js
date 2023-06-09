function DadosCadastrais() {
  this.leaveStep = 0;
  this.formDados = {};

  this.init = function () {
    dadosCadastrais.listar();

    main.mascaraData('.data');

    $('#dataNascimento').datetimepicker({
      locale: 'pt-br',
      showClose: false,
      format: 'DD/MM/YYYY',
      widgetPositioning: {
        horizontal: "right",
        vertical: "auto"
      }
    });


    $("#preencher").click(function () {
      var campo = $('form.validar').find('.is-invalid').attr('id')
      var stepId = $("#" + campo).parents('.tab-pane').attr('id');
      var et = $('.nav-link[href="#' + stepId + '"]').attr('id');

      if ($('#' + et).click()) {
        $("#modalCamposObrigatorios").modal("hide")
      }
    });

    $(document).on("click", "#alterar", function () {
      if ($("#et-1").hasClass("active")) {
        dadosCadastrais.alterar("formResponsavelTecnico")
      }
      if ($("#et-2").hasClass("active")) {
        dadosCadastrais.alterar("formDadosEmpresa")
      }
      if ($("#et-4").hasClass("active")) {
        dadosCadastrais.alterarSenha("formAlterarSenha")
      }
    });


    $("#botaoDados").click(function () {
      el = $("#cnpj");
      if ($("#cnpj").val().trim() == "") {
        toastr.warning("Digite um CNPJ válido!");
      } else {
        var cnpj = $("#cnpj").val();
        cnpj = cnpj.replace(/\./g, "").replace(/\-/g, "").replace(/\//g, "");
        loading.open();
        $.ajax({
          url: "https://www.receitaws.com.br/v1/cnpj/" + cnpj,
          method: "GET",
          dataType: "jsonp",
          complete: function (xhr) {
            response = xhr.responseJSON;
            if (xhr.status == 200 && response.status == "OK") {
              if (response.situacao == "ATIVA") {
                $(el)
                  .parents(".container-body")
                  .find("#razaoSocial")
                  .val(response.nome);
                $(el)
                  .parents(".container-body")
                  .find("#nomeFantasia")
                  .val(response.fantasia);
                $(el)
                  .parents(".container-body")
                  .find("#dataAbertura")
                  .val(response.abertura);
                $(el)
                  .parents(".container-body")
                  .find("#logradouro")
                  .val(response.logradouro);
                $(el)
                  .parents(".container-body")
                  .find("#numero")
                  .val(response.numero);
                $(el)
                  .parents(".container-body")
                  .find("#complemento")
                  .val(response.complemento);
                $(el)
                  .parents(".container-body")
                  .find("#cep")
                  .val(response.cep.split(".").join(""));
                $(el)
                  .parents(".container-body")
                  .find("#bairro")
                  .val(response.bairro);
                $(el)
                  .parents(".container-body")
                  .find("#cidade")
                  .val(response.municipio);
                $(el)
                  .parents(".container-body")
                  .find("#estado")
                  .val(response.uf);
                $(el)
                  .parents(".container-body")
                  .find("#porte")
                  .val(response.porte);
                $(el)
                  .parents(".container-body")
                  .find("#tipo")
                  .val(response.tipo);
                $(el)
                  .parents(".container-body")
                  .find("#naturezaJuridica")
                  .val(response.natureza_juridica);
                loading.close();
              } else {
                loading.close();
                toastr.warning(
                  "Este CNPJ não está ativo!"
                );
              }
            } else {
              if (response == undefined) {
                loading.close();
                toastr.warning(
                  "Servidor sobrecarregado! Aguarde alguns minutos e tente novamente!"
                );
              } else {
                loading.close();
                toastr.warning(
                  response.message
                );
              }
            }
          },
        });
      }
    });



    $('[data-toggle="tooltip"]').tooltip();

    dadosCadastrais.listSmart();
    main.smartWizardButtons();
    main.SmartWizardCores();
    $(".nav-link").removeClass("inactive");
    $(".nav-link").addClass("done");

    $(document).on("focusout", ".cep", function () {
      el = this;
      if ($(this).val().trim() == "") {
        toastr.warning("Digite um CEP válido!");
      } else {
        loading.open();
        $.get("https://viacep.com.br/ws/" + $(this).val() + "/json")
          .done(function (result) {
            if (result.erro) {
              toastr.warning("Digite um CEP válido!");
              $("#logradouro, #bairro, #cidade, #estado").val("");
              return loading.close();
            }

            $(el).parents(".container-body").find(".logradouro").val(result.logradouro);
            $(el).parents(".container-body").find(".cidade").val(result.localidade);
            $(el).parents(".container-body").find(".bairro").val(result.bairro);
            $(el).parents(".container-body").find(".estado").val(result.uf);
            loading.close();
          })
          .fail(function () {
            toastr.warning("Aconteceu um imprevisto ao buscar pelo o CEP.");
            $("#logradouro, #bairro, #cidade, #estado").val("");

            loading.close();
          });
      }
    });

    $("#smartwizard").on("leaveStep", function (e, anchorObject, currentStepIndex, nextStepIndex, stepDirection) {
      var currentStepIndex = currentStepIndex + 1
      var nextStepIndex = nextStepIndex + 1
      var form = $("#step-" + currentStepIndex).find("form").attr("id")
      if (dadosCadastrais.leaveStep === 0) {
        if(nextStepIndex==3){
          $("#alterar").remove();
        } else{
          $("#alterar").remove();
          let html = '<button id="alterar" data-placement="top" title="Salvar" class="btn btn-success rounded-pill btn-save">SALVAR</button>';
          $("#controle-wizard").append(html);
        }
        if (form != undefined && currentStepIndex!=3) {
          var dadosAtuais = main.pegarDados($('#' + form))
          if (JSON.stringify(dadosCadastrais.formDados[form]) != JSON.stringify(dadosAtuais)) {
            Swal.fire({
              title: "Alterar",
              text: "Você alterou dados em seu cadastro, deseja salvar?",
              icon: 'warning',
              customClass: "false",
              confirmButtonColor: "#15CB76",
              confirmButtonText: "Sim",
              cancelButtonText: "Não",
              showCancelButton: true,
              reverseButtons: true,
            }).then((result) => {
              if (result.value) {
                dadosCadastrais.alterar(form, nextStepIndex);
                dadosCadastrais.leaveStep = 1;
                return false;
              } else {
                $('#modalCamposObrigatorios').find(".campos").remove()
                dadosCadastrais.listar(form)
                dadosCadastrais.leaveStep = 1;
                $("#et-" + nextStepIndex).click();
                return false;
              }
            });
            return false;
          }
        }
      } else {
        dadosCadastrais.leaveStep = 0;
        return true;
      }
    });


    $(document).on("change", ".bancoNumero", function () {
      var nomeBanco = $(this).find(":selected").text().split(" - ")[1];
      $(this).parents(".form-banco").find(".banco").val(nomeBanco)
    })

    $(document).on("change", ".tipo", function () {
      var documento = $(this).parents(".form-banco").find(".documento");
      if ($(this).val() == "CPF") {
        documento.val("");
        documento.addClass("mask-cpf");
        documento.addClass("validar-cpf");
        documento.removeClass("mask-cnpj");
      } else {
        documento.val("");
        documento.removeClass("mask-cpf");
        documento.removeClass("validar-cpf");
        documento.addClass("mask-cnpj");

      }
    });

    $("#telefonePais").change(function(){
      if(this.value != "Brasil"){
        $("#telefone").val("");
      }
    })
    $("#telefonePaisEmergencia").change(function(){
      if(this.value != "Brasil"){
        $("#telefoneEmergencia").val("");
      }
    })
  }

  this.listSmart = function () {
    $("#smartwizard").smartWizard({
      selected: 0,
      theme: "dots",
      justified: true,
      darkMode: false,
      autoAdjustHeight: false,
      cycleSteps: false,
      backButtonSupport: true,
      enableURLhash: false,
      transition: {
        animation: "fade",
        speed: "400",
        easing: "",
      },
      toolbarSettings: {
        toolbarPosition: "bottom",
        toolbarButtonPosition: "right",
        showNextButton: true,
        showPreviousButton: true,
        toolbarExtraButtons: [],
      },
      anchorSettings: {
        anchorClickable: true,
        enableAllAnchors: true,
        markDoneStep: true,
        markAllPreviousStepsAsDone: true,
        removeDoneStepOnNavigateBack: false,
        enableAnchorOnDoneStep: true,
      },
      keyboardSettings: {
        keyNavigation: false,
      },
      lang: {
        Proximo: "Proximo",
        Anterior: "Anterior",
      },
      disabledSteps: [],
      errorSteps: [],
      hiddenSteps: [],
    });
  };

  this.listar = function () {
    loading.open();
    var params = {};
    main.executarAPI("", "SELECT", "", JSON.stringify(params), function (obj) {
      if (obj.success) {
        for (var [key, value] of Object.entries(obj.elements[0])) {
          var datas = ["dataAbertura", "dataInicio", "dataNascimento"];

          if (datas.indexOf(key) != -1) {
            value = main.dateList(value);
          }
          $('#formResponsavelTecnico [name="' + key + '"]').val(value);
          $('#formDadosEmpresa [name="' + key + '"]').val(value);
          $('#formDadosBancarios [name="' + key + '"]').val(value);
          if(key=="bancoNumero"){
            dadosCadastrais.buscarBancos(value);
          }
        }
        $('.tab-content form').each(function () {
          var id = $(this).attr('id');
          var dados = main.pegarDados($('#' + id));
          dadosCadastrais.formDados[id] = dados;
        });
        dadosCadastrais.validarCamposObrigatorios();
        loading.close();

      } else {
        toastr.error(
          'Ocorreu um erro ao buscar o usuário. Tente novamente ou entre em contato com o suporte.',
          'Ops... !'
        );
        loading.close();
      }
    },
      'listarCadastros'
    );
  };

  this.alterar = function (form, nextStepIndex) {
    if (main.validarCampos("#" + form)) {
      Swal.fire(
        "Ops... !",
        "Por favor preencha os campos necessários.",
        "warning"
      );
    } else {
      var params = main.pegarDados($('#' + form));
      params['form'] = form;
      params['dataAbertura'] = main.dateInsert($("#dataAbertura").val())
      params['dataInicio'] = main.dateInsert($("#dataInicio").val())
      params['dataNascimento'] = main.dateInsert($("#dataNascimento").val())
      params['conta'] = $("#conta").val().trim()
      params['agencia'] = $("#agencia").val().trim()


      loading.open();
      main.executarAPI("", "UPDATE", "", JSON.stringify(params), function (obj) {
        if (obj.success) {
          if (nextStepIndex) {
            $("#et-" + nextStepIndex).click();
          }
          toastr.success('Dados alterados com sucesso.', 'Sucesso!');
          loading.close();
          dadosCadastrais.listar();
        } else {
          toastr.error(
            obj.message,
            'Ops... !'
          );
          loading.close();
        }
      },
        'alterarCadastros'
      );
    }
  };

  this.alterarSenha = function () {
    if (main.validarCampos('#formAlterarSenha')) {
      Swal.fire(
        "Ops... !",
        "Por favor preencha os campos necessários.",
        "warning"
      );
    } else {
      var params = main.pegarDados($('#formAlterarSenha'));
      var senha = $("#senhaNova").val();
      var senhaConfirma = $("#senhaNovaValida").val();
      if (senha != senhaConfirma) {
        $('.senha').removeClass('is-valid');
        $('.senha').addClass('is-invalid');
        Swal.fire("Oops!", "As senhas devem ser iguais!", "warning");
      } else {
        $('.senha').removeClass('is-invalid');
        $('.senha').addClass('is-valid');
        loading.open();
        main.executarAPI("", "UPDATE", "", JSON.stringify(params), function (obj) {
          if (obj.success) {
            Swal.fire({
              title: 'Senha alterada com sucesso!',
              type: 'success',
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: "#3085d6 ",
              confirmButtonText: "Ok",
              reverseButtons: true
            })
            $('#formAlterarSenha')[0].reset();
            loading.close();
          } else {
            toastr.error(
              'Ocorreu um erro. Verifique sua conexão com a internet, e tente novamente mais tarde.',
              'Ops... !'
            );
            loading.close();
          }
        },
          'alterarSenha'
        );
      }
    }
  };

  this.buscarBancos = function (codigo) {
    loading.open();
    var params = {};
    params['numeroBanco'] = codigo;
    main.executarAPI("", "SELECT", "", JSON.stringify(params), function (obj) {
      if (obj.success) {
          $(".bancoNumero").val(obj.elements[0].numero + " - " + obj.elements[0].nome);
      } else {
        toastr.error(
          'Ocorreu um erro ao buscar os bancos.',
          'Ops... !'
        );
        loading.close();
      }
    }, "listarBancos"
    );
  }

  this.validarCamposObrigatorios = function () {
    var formInvalidos = [];

    $('form.validar').each(function () {
      var formId = $(this).attr('id')

      var stepId = $(this).parents('.tab-pane').attr('id');

      var formNome = $('#smartwizard .nav-link[href="#' + stepId + '"]').find('.span-smart').attr('data-original-title');

      if (main.validarCampos('#' + formId)) {
        var camposVazios = [];
        $('#' + formId + ' .is-invalid').each(function () {

          var campoId = $(this).attr('id');
          var campoNome = $(this).parent().find('label').text().replace("*", '').trim();
          camposVazios.push({
            campoId,
            campoNome
          })

        })
        formInvalidos.push({
          formId: formId,
          formNome: formNome,
          camposVazios: camposVazios
        })

      }
    })

    if (formInvalidos.length > 0) {
      var html = '';

      for (var i = 0; i < formInvalidos.length; i++) {
        var form = formInvalidos[i];
        html += '<hr>';
        html += '<span class="tituloFormInvalido">' + form.formNome + '</span>';

        for (var j = 0; j < form.camposVazios.length; j++) {
          var campo = form.camposVazios[j];
          html += '<li class="campoFormInvalido">' + campo.campoNome + '</li>';
        }
      }
      $("#listaDadosPendentes").html(html)
      $("#modalCamposObrigatorios").modal("show");
    } else {
      $("#modalCamposObrigatorios").hide();
    }


  };
};

var dadosCadastrais = new DadosCadastrais();
dadosCadastrais.init();