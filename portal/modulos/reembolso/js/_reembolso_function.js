function Reembolso() {
  this.elementReembolso = [];
  this.permissaoReembolso = true;
  this.init = async function () {
    reembolso.listarBancos();
    await Promise.allSettled([reembolso.validarPermissaoReembolso(), reembolso.listar()])
  }

  $(document).on("blur", ".agencia", function(){
    if($(this).val().length < 4){
      Swal.fire(
        "Ops... !",
        "Digite uma agência válida",
        "warning"
      );
      $(this).val("");
    };
  });

  $('#newTimesheet').click(async function () {
    if (!reembolso.permissaoReembolso) {
      Swal.fire(
        'Ops... !',
        'Você precisa ter a partir de 3 meses de Empresa para poder solicitar algum reembolso',
        'warning'
      );
      return;
    }
    if (reembolso.verificarReembolsoAnterior()) {
      $('#formDados')[0].reset();
      $(".divLinkNota").addClass("d-none")
      $(".area-upload").removeClass("d-none");
      $(".item").addClass("d-none");
      $(".tipoItem").removeClass("d-none");


      $(".form-control").attr('disabled', false);
      main.mudarVisualizacao('salvar');
      $('#modalCadastro').modal('show');
      $(".modal-body").removeClass('overflow-x-hidden');
    } else {
      Swal.fire(
        'Ops... !',
        'Você já realizou os reembolsos disponivies.',
        'warning'
      );
    }
  });

  $("#salvar").click(function () {
    reembolso.cadastrar();
  });


  $(document).on('click', '.visualizar', function () {
    $('#salvar').addClass('d-none');
    $('#alterar').addClass('d-none');
    $('#limpar').addClass('d-none');
    $(".form-control").attr('disabled', true);
    codigo = parseInt($(this).data('value'));
    $(".area-upload").addClass("d-none");
    $(".divLinkNota").removeClass("d-none")
    $(".item").removeClass("d-none");
    $(".tipoItem").addClass("d-none");
    $('#modalCadastro').modal('show');
    reembolso.listarDados(codigo);
  });

  $(document).on('change', '.inputUpload', function () {
    // main.anexos = []
    // main.infosAnexos = []
    var files = this.files;
    var nFiles = $(this).parents("#notaFiscal").find('.lista-uploads .body-arquivo').length;
    for (var i = 0; i < files.length; i++) {
      var info = reembolso.validarArquivo(files[i]);
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
          "caminho": 'notas_reembolso'
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
      $(this).parents("#notaFiscal").find('.lista-uploads').append(html);
    }
  });

  $(document).on("click", ".fechar", function () {
    let id = $(this).parents('.body-arquivo').attr('id');
    let url = $(this).data('value');
    Swal.fire({
      title: "Excluir!",
      text: "Deseja realmente excluir esse arquivo?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar ",
      confirmButtonColor: "#dc3545 ",
      confirmButtonText: "Sim!",
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        reembolso.excluirArquivo(id, url);
      }
    });
  });

  $(document).on("keyup blur", ".number", function () {
    let valor = $(this).val()
    $(this).val(valor.replace(/\D/g, ""));
  });

  $(document).on("change", ".bancoNumero", function () {
    let nomeBanco = $(this).find(":selected").text().split(" - ")[1];
    $(this).parents(".form-row").find(".banco").val(nomeBanco)
  })

  this.validarArquivo = function (file) {
    var mime_types = ['text/xml', 'application/pdf'];
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
  }

  this.verificarInicioEmpresa = function (params) {
    var formData = new FormData();
    formData.append('params', main.alterarValorJson(params));
    var options = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      body: formData
    };

    return fetch('../service/verificarInicioEmpresa/index.php', options)
      .then(function (response) {
        return response.json()
      })
      .then((data) => {
        if (data.success) {
          return data.elements[0].dataInicio;
        } else {
          return '0000-00-00';
        }
      });
  }

  this.verificarReembolsoAnterior = function () {
    let cont = 0;
    let items = reembolso.elementReembolso;
    let contAprovado = 0;
    if (items.length < 1) {
      return true;
    }
    for (const element of items) {
      if(element.status == "A" && element.tipoItem === null){
        $("#tipoItem option[value='MC']").remove();
        contAprovado += 1;
      }
      if (element.tipoItem!= null && element.tipoItem.indexOf("MC") > -1 && element.status != "R") {
        return false;
      }

      if (element.tipoItem!= null && element.tipoItem.indexOf("C") > -1 && element.status != "R") {
        cont += 1;
        $("#tipoItem option[value='C']").remove();
        $("#tipoItem option[value='MC']").remove();
      }

      if (element.tipoItem!= null && element.tipoItem.indexOf("M") > -1 && element.status != "R") {
        cont += 1;
        $("#tipoItem option[value='M']").remove();
        $("#tipoItem option[value='MC']").remove();
      }
    }

    if(contAprovado >=2){
      $("#tipoItem option[value='C']").remove();
      $("#tipoItem option[value='M']").remove();
      return false;
    }
    
    if (cont >= 2) {
      return false;
    }

    if((cont + contAprovado) >= 2){
      return false;
    }

    return true;
  }

  this.validarPermissaoReembolso = async function () {
    const hoje = moment();
    let params = {};
    const dataInicio = await reembolso.verificarInicioEmpresa(JSON.stringify(params));
    if (dataInicio === '0000-00-00') {
      reembolso.permissaoReembolso = false;
      return;
    }
    const diff = hoje.diff(dataInicio, 'days');

    if (diff >= 90) {
      reembolso.permissaoReembolso = true;
      return;
    }
    reembolso.permissaoReembolso = false;
  }

  this.listarReembolso = function (params) {
    var formData = new FormData();
    formData.append('params', main.alterarValorJson(params));
    var options = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      body: formData
    };

    return fetch('../service/listarReembolso/index.php', options)
      .then(function (response) {
        return response.json()
      })
      .then((data) => { return [data.success, data.elements] });
  }


  this.listarDados = function (codigo) {
    loading.open();
    var params = {};
    params['codigo'] = codigo;

    main.executarAPI('', 'SELECT', '', JSON.stringify(params), function (obj) {
      if (obj.success) {
        let projetosChange = '';
        for (var [key, value] of Object.entries(obj.elements[0])) {
          if (key != 'dataCadastro') {
            if(key=="bancoNumero"){
              $("#bancoNumero").val(value).change();
            }
            if (key === "caminhoNota") {
              $("#linkNotaFiscal").attr("href", "../../../../internetfiles/" + value)
            }
            $('#formDados [name="' + key + '"]').val(value).trigger('change');

          } else {
            $('#formDados [name="' + key + '"]')
              .val(main.dateTimeList(value))
              .trigger('blur');
          }
        }
        loading.close();
      } else {
        toastr.error(
          'Ocorreu um erro. Verifique sua conexão com a internet, e tente novamente mais tarde.',
          'Ops... !'
        );
        loading.close();
      }
    }, "listarReembolsoByCodigo"
    );
  };

  this.listar = async function () {
    loading.open();
    let params = {};
    let [success, items] = await reembolso.listarReembolso(JSON.stringify(params));
    let $table = $('#mainTable');
    if (success) {
      reembolso.elementReembolso = items;
      $table.bootstrapTable('destroy');
      $table.bootstrapTable({
        data: items,
        undefinedText: '',
        pageSize: 7,
        paginationParts: 'pageList',
        theadClasses: 'text-center',
        columns: [{
          field: 'item',
          title: 'Item',
          sortable: true,
          width: '18',
          widthUnit: '%',
          class: 'text-center td-align-center text-nowrap',
          formatter: function (value) {
            return value;
          },
        },
        {
          field: 'dataCadastro',
          title: 'Data de Solicitação',
          sortable: true,
          width: '18',
          widthUnit: '%',
          class: 'text-center td-align-center text-nowrap',
          formatter: function (value) {
            return main.dateTimeList(value);
          },
        },
        {
          field: 'valorReembolso',
          title: 'Valor Reembolso',
          sortable: true,
          width: '18',
          widthUnit: '%',
          class: 'text-center td-align-center text-nowrap',
          formatter: function (value, row) {
            let retorno = '';
            if (value) {
              retorno = value;
            }
            else {
              if (row.status === "R") {
                retorno = "00.00";
              }
              if (row.status == "E") {
                retorno = "Em Análise"
              }
            }

            return retorno;
          },
        },
        {
          field: 'status',
          title: 'Status',
          sortable: true,
          width: '18',
          widthUnit: '%',
          class: 'text-center td-align-center text-nowrap',
          formatter: function (value) {
            var retorno = '';
            switch (value) {
              case 'E':
                retorno = 'Em Análise';
                break;
              case 'A':
                retorno = 'Aprovada';
                break;
              case 'R':
                retorno = 'Reprovada';
                break;
            }
            return retorno;
          },
        },
        {
          field: 'codigo',
          title: 'Ações',
          width: '10',
          widthUnit: '%',
          class: 'text-center',
          formatter: function (value) {
            var retorno = '';
            retorno += '<div class="d-flex justify-content-center mx-1">';
            retorno +=
              '    <a href="#" class="visualizar mr-2" " data-value="' +
              value +
              '" title="Visualizar"><i class="fas fa-eye text-secondary"></i></a>';
            retorno += '</div>';
            return retorno;
          },
        }
        ],
      });
      $('.table td').each(function () {
        if ($(this).find('.tooltip-content')) {
          $(this).attr('data-container', 'body');
          $(this).attr('data-toggle', 'tooltip');
          $(this).attr('data-placement', 'bottom');
          $(this).attr(
            'data-original-title',
            $(this).find('.tooltip-content').text()
          );
        }
      });
      $('[data-toggle="tooltip"]').tooltip();
      loading.close();
    } else {
      reembolso.elementReembolso = [];
      $table.bootstrapTable('destroy');
      $table.bootstrapTable();
      $('#bodyReembolso').html('<td colspan="6">Não há reembolsos solicitados.</td>');
      loading.close();
    }
  };

  this.listarBancos = function () {
    loading.open();
    let params = {};

    $(".bancoNumero").append("<option value=''>Selecione</option>");

    main.executarAPI(
      "",
      "SELECT",
      "",
      JSON.stringify(params),
      function (obj) {
        if (obj.success) {
          for (i in obj.elements) {
            $(".bancoNumero").append("<option value='" + +obj.elements[i].numero + "'>" + obj.elements[i].numero + " - " + obj.elements[i].nome + "</option>");
          }
        } else {
          loading.close();
        }
      }, "listarBancos"
    );

    loading.close();
  }

  this.cadastrar = function () {

    if (main.validarCampos('#formDados')) {
      Swal.fire(
        'Ops... !',
        'Por favor preencha os campos necessários.',
        'warning'
      );
      return 0;
    } else {
      var params = main.pegarDados($("#formDados"));

      var caminho = "notas_reembolso/";

      for (let i = 0; i < main.infosAnexos.length; i++) {
        main.infosAnexos[i].caminho = caminho
      }

      params['limiteReembolso'] = 500.00;
      params['item'] = $('#tipoItem :selected').text();

      Swal.fire({
        title: "Termos",
        html:
          "<p align='left'><strong>A responsável pela empresa contratada declara que receberá da BlueShift Brasil LTDA " +
          "o valor indicado no item anterior referente à compra de equipamentos para prestação de serviços.</strong></p>" +

          "<p align='left'>1.    No caso de rescisão do contrato de prestação de serviços anteriormente ao prazo de 1 ano a partir da compra, " +
          "os valores serão descontados dos valores a serem pagos a CONTRATADA no momento do encerramento." +

          "</p>" +
          "<p align='left'>2.    As notas fiscais referentes à compra dos equipamentos são parte integrante do presente termo.</p> ",
        icon: "warning",
        width: 600,
        showCancelButton: true,
        cancelButtonText: "Não, discordo dos termos e não seguirei com o reembolso. ",
        confirmButtonColor: "#15CB76 ",
        confirmButtonText: "Sim, aceito os termos. ",
        reverseBSwaluttons: true,
      }).then((result) => {
        if (result.value) {
          loading.open();
          main.executarAPI('', 'INSERT', '', JSON.stringify(params), function (obj) {
            loading.close();
            if (obj.success) {
              notaFiscal.state = 1;
              main.anexos = [];
              main.infosAnexos = [];
              $('.lista-uploads').html('')
              $('#codigoConsultor').val('')
              $('#data').val('')
              toastr.success("Dados cadastrados com sucesso.", "Sucesso!");
              $("#upload-file").val('');
              $("#valor").val('');
              reembolso.listar();
              $('#modalCadastro').modal('hide');
              loading.close();

            } else {
              toastr.error("Ocorreu um erro. Verifique sua conexÃ£o com a internet, e tente novamente mais tarde.", "Ops... !");
              loading.close();
            }
          }, "cadastrarReembolso");
        }
      });
    }
  }
}



let reembolso = new Reembolso();
reembolso.init();