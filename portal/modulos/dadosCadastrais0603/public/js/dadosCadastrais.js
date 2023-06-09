function DadosCadastrais() {
  this.leaveStep = 0;
  this.formDados = {};
  this.temCampoAlterado = false;

  this.init = function () {
    
    $('#dataNascimento').datetimepicker({
      locale: 'pt-br',
      showClose: false,
      format: 'DD/MM/YYYY',
      widgetPositioning: {
        horizontal: "right",
        vertical: "auto"
      }
    });

    $('.mask-data').mask('00/00/0000')
    /**
     * Inicializa o smartwizard
     */
    $("#smartwizard").smartWizard({
        theme: "dots",
        darkMode: false,
        autoAdjustHeight: false,
        cycleSteps: false,
        enableURLhash: false,
        transition: {
          animation: "fade",
          speed: "400",
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
        }
      });

    /**
     * Registra se algum campo foi alterado, permitindo
     * exibir o alerta antes de alterar o menu
     */
    $('select, input').on('change', function() {
        dadosCadastrais.temCampoAlterado = true;
    })
    main.smartWizardButtons();
    main.SmartWizardCores();


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

    /**
     * Exibe um alerta ao trocar de menu, se house alteracao
     * em algum campo
     */
    $('#smartwizard').on('leaveStep', function (e, anchorObject, currentStepIndex, nextStepIndex, stepDirection) {
        if (dadosCadastrais.temCampoAlterado) {
            e.preventDefault();
            Swal.fire({
                title: "Campos alterados",
                text: "Dados não salvos serão perdidos, deseja sair deste menu?",
                icon: 'warning',
                customClass: "false",
                confirmButtonColor: "#15CB76",
                confirmButtonText: "Sim",
                cancelButtonText: "Não",
                showCancelButton: true,
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    dadosCadastrais.temCampoAlterado = false;
                    $('#smartwizard').smartWizard('goToStep', nextStepIndex, true);
                } else {
                    return false;
                }
            })
        }
    })

    /**
     * Altera o titulo do menu atual
     */
    $('#smartwizard').on('showStep', function (e, anchorObject, stepIndex, stepDirection) {
        $('#tituloStep').text(anchorObject[0].title);
        dadosCadastrais.temCampoAlterado = false;
    });

    /**
     * Consulta informações do CNPJ utilizando uma API externa
     * Atualiza os campos com as informações recebidas
     */
    $("#btnAtualizarDadosEmpresa").on('click', function () {
      let cnpj = $('#cnpj').val().trim();
      let formDadosEmpresa = $('#formDadosEmpresa');
      if (cnpj == "") {
        toastr.warning("Digite um CNPJ válido!");
      } else {
        cnpj = cnpj.replace(/\./g, "").replace(/\-/g, "").replace(/\//g, "");
        loading.open();
        $.get("https://www.receitaws.com.br/v1/cnpj/" + cnpj, function(data, status, xhr) {
          if (status == 'success' && data.status == 'OK') {
            if (data.situacao == 'ATIVA') {
              formDadosEmpresa.find("#razaoSocial").val(data.nome);
              formDadosEmpresa.find("#nomeFantasia").val(data.fantasia);
              formDadosEmpresa.find("#tipo").val(data.tipo);
              formDadosEmpresa.find("#porte").val(data.porte);
              formDadosEmpresa.find("#naturezaJuridica").val(data.natureza_juridica);

              let dataAbertura = data.abertura.split('/').reverse().join('-');
              formDadosEmpresa.find("#dataAbertura").val(dataAbertura);

              formDadosEmpresa.find("#cep").val(data.cep.split(".").join(""));
              formDadosEmpresa.find("#logradouro").val(data.logradouro);
              formDadosEmpresa.find("#numero").val(data.numero);
              formDadosEmpresa.find("#complemento").val(data.complemento);
              formDadosEmpresa.find("#bairro").val(data.bairro);
              formDadosEmpresa.find("#cidade").val(data.municipio);
              formDadosEmpresa.find("#estado").val(data.uf);
            } else {
              toastr.warning("Este CNPJ não está ativo!");
            }
          } else {
            toastr.warning("Não foi possível consultar a situação do CNPJ informado. Tente novamente mais tarde.");
          }
        }, 
        'jsonp')
          .always(function() {
            loading.close();
          })
      }
    });

  }

  /**
   * Verifica se existem formularios com campos vazios
   * Adiciona o nome dos campos ao modal de aviso
   */
  
  $(function() {
    var temMensagemSwal = window.location.search.substr(1).includes('&status=');
    if (!temMensagemSwal) {
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
    }
  })

  /**
   * Exibe ou oculta a senha na aba de alterar senha
   */

  $('#mostrarNovaSenha').on('click', function(e) {
    e.preventDefault();
    let inputNovaSenha = $('#senhaNova');
    let iconExibirSenha = $('#mostrarNovaSenha');

    if (inputNovaSenha.attr('type') == 'password') {
        inputNovaSenha.attr('type', 'text');
        iconExibirSenha.attr('class', 'fa fa-eye');
    } else {
        inputNovaSenha.attr('type', 'password');
        iconExibirSenha.attr('class', 'fa fa-eye-slash');
    }
  });

  $('#mostrarConfirmarNovaSenha').on('click', function(e) {
    e.preventDefault();
    let inputNovaSenha = $('#senhaNovaValida');
    let iconExibirSenha = $('#mostrarConfirmarNovaSenha');

    if (inputNovaSenha.attr('type') == 'password') {
        inputNovaSenha.attr('type', 'text');
        iconExibirSenha.attr('class', 'fa fa-eye');
    } else {
        inputNovaSenha.attr('type', 'password');
        iconExibirSenha.attr('class', 'fa fa-eye-slash');
    }
  });

  /**
   * Não faço ideia do que isso faz
   */
  $('[data-toggle="tooltip"]').tooltip();


  

};

var dadosCadastrais = new DadosCadastrais();
dadosCadastrais.init();