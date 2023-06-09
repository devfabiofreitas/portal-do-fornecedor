function Reembolso() {
  this.elementReembolso = [];
  this.permissaoReembolso = true;
  this.reembolsosSolicitados = {};
  this.valorQuilometroCarro = 1.23;
  this.valorQuilometroMoto = 0.65;
  this.reembolsosListados = [];

  $(".salvar-pedido").click(function () {
    reembolso.enviarEmail();
  });
  $('#newReembolso').click(async function () {
    $('#formDadosReembolso')[0].reset();
    $(".divLinkNota").addClass("d-none")
    $(".area-upload").removeClass("d-none");
    $(".tipoItem").removeClass("d-none");
    $(".form-control").attr('disabled', false);
    reembolso.esconderItens();
    main.mudarVisualizacao('salvar');
    $(".body-arquivo").remove();
    main.anexos = []
    main.infosAnexos = []
    $('#modalCadastro').modal('show');
    $(".modal-body").removeClass('overflow-x-hidden');
  });

  $('.salvarPedido').click(function () {
    $('#formDadosBancarios')[0].reset();
    $(".form-control").attr('disabled', false);
    main.mudarVisualizacao('salvar');
    reembolso.listarBancosUsuario();
    $(".modal-body").removeClass('overflow-x-hidden');
  });


  $("#salvar-banco").click(function () {
    reembolso.salvarBanco();
  });

  this.salvarBanco = function () {
    loading.open();
    var params = main.pegarDados($('#formDadosBancarios'));
    params['jsonBancarios'] = [{"tipo": "PF", "banco": params['banco'], "conta": params['conta'], "agencia": params['agencia'], "documento": params['cpf'], "bancoNumero": params['bancoNumero'], "digitoConta": params['contaDigito'], "digitoAgencia": params['agenciaDigito']}]

    main.executarAPI(
      '',
      'UPDATE',
      '',
      JSON.stringify(params),
      function (obj) {
          if (obj.success) {
              paginaAtual = 0;
              $('#modalCadastro').modal('hide');
              loading.close();
              toastr.success('Dados cadastrados com sucesso.', 'Sucesso!');
          } else {
              toastr.error(
                  obj.message,
                  'Ops... !'
              );
              loading.close();
          }
      } , "cadastrarBanco"
    );
  }
  $('.dateRange').daterangepicker({
    singleDatePicker: true,
    autoApply: true,
    linkedCalendars: false,
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
  ]}
  });

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

  $(document).on('change', '#pedagio', function() {
    $(".qtdPedagio").addClass("d-none");
    $(".valorPedagio").addClass("d-none");

    $("#qtdPedagio").val("");
    $("#valorPedagio").val("");
    $("#valorPedagio").trigger("change");

    if($(this).find(":selected").val() == "SIM"){
      $(".qtdPedagio").removeClass("d-none");
      $(".valorPedagio").removeClass("d-none");
    } 
  })

  $(document).on('change', '#estacionamento', function() {
    $(".qtdEstacionamento").addClass("d-none");
    $(".valorEstacionamento").addClass("d-none");
    $("#qtdEstacionamento").val("");
    $("#valorEstacionamento").val("");

    $("#valorEstacionamento").trigger("change");

    if($(this).find(":selected").val() == "SIM"){
      $(".qtdEstacionamento").removeClass("d-none");
      $(".valorEstacionamento").removeClass("d-none");
    } 
  })

  $(document).on('change', '#tipoItem', function () {
    reembolso.itemSelecionado($(this).find(":selected").val())
  })

  $(document).on('change', '#tipoTransporte', function () {
    reembolso.transporteSelecionado($(this).find(":selected").val())
  })
  
  $(document).on('change', '#cliente_codigo', function () {
    $("#cliente").val($(this).find(":selected").text());
  })
  $(document).on('change', '#banco-select', function () {
    $("#agencia-conclusao").val($(this).find(":selected").data("agencia"));
    $("#conta-conclusao").val($(this).find(":selected").data("conta"));
    $("#banco-conclusao").val($(this).find(":selected").data("banco"));
    $("#agenciaDigito-conclusao").val($(this).find(":selected").data("digitoagencia"));
    $("#contaDigito-conclusao").val($(this).find(":selected").data("digitoconta"));
    $("#documento-conclusao").val($(this).find(":selected").data("documento"));
  })

  $(document).on('click', '.visualizar', function () {
    $('#salvar').addClass('d-none');
    $('#alterar').addClass('d-none');
    $('#limpar').addClass('d-none');
    $(".form-control").attr('disabled', true);
    codigo = parseInt($(this).data('value'));
    $(".area-upload").addClass("d-none");
    $(".divLinkNota").removeClass("d-none")
    $(".tipoItem").removeClass("d-none");
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
        html += '   <div><i class="fas fa-file pr-2"></i></div>';
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

  $(document).on('click', '.visualizarReembolso', function () {
    $('#salvar').addClass('d-none');
    $('#alterar').addClass('d-none');
    $('#limpar').addClass('d-none');
    $(".form-control").attr('disabled', true);
    codigo = parseInt($(this).data('value'));
    $(".area-upload").addClass("d-none");
    $(".divLinkNota").removeClass("d-none")
    $(".tipoItem").removeClass("d-none");
    $('#modalCadastro').modal('show');
    reembolso.listarDadosPedido(codigo);
  });

  $(document).on("keyup blur", ".number", function () {
    let valor = $(this).val()
    $(this).val(valor.replace(/\D/g, ""));
  });

  $("#voltar").click(function () {
    window.location.href = "reembolso_geral.frag.php" ;
  })

  $(document).on("keyup change", "#quilometrosRodados", function(){
    const tipoVeiculo = $("#tipoVeiculo").find(":selected").val();
    var qtd = +$(this).val().replace(".","").replace(",",".");
    if(!qtd) qtd = 0;
    conta = 0;
    if(tipoVeiculo=="CARRO"){
      conta = qtd * reembolso.valorQuilometroCarro;

    }

    if(tipoVeiculo=="MOTO"){
      conta = qtd * reembolso.valorQuilometroMoto;
    }
    
    $("#valorCombustivel").val(conta.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
    $("#valorCombustivel").trigger("change");
  })

  $(document).on("click", ".deleteReembolso", function () {
    var id = +$(this).data("value");
    $.ajax({
      url: '../src/excluir_reembolso.php',
      type: 'POST',
      data: { id: id },
      success: function(data) {
        data = JSON.parse(data);
        reembolso.listar(data.data);
      }
    });
  })



  this.listarDados = function (codigo) {
    $(".linkComprovante").remove();
    $(".file-name").remove();
    loading.open();
    var params = {};
    let posicao = 0;
    let ordem = ["tipoItem", "tipoTransporte", "tipoVeiculo", "quilometrosRodados", "pedagio", "estacionamento", 
    "qtdPedagio", "qtdEstacionamento", "valorEstacionamento", "valorPedagio",
    "valorCombustivel", "descritivo", "tipoRefeicao", "dataInicial", "arquivos", "observacao", "valor", "descritivoOutros", "dataInicialViagem", "dataFinalViagem", "centroCusto", "Cliente_codigo"]
    let estacionamento, pedagio = "";
    for(const i in reembolso.reembolsosListados){
      if(reembolso.reembolsosListados[i]['id'] == codigo){
        parametro = i;
      }
    }

    for(key of ordem){
      value = reembolso.reembolsosListados[parametro][key];
      if (key != 'dataInicial') {
        if(value!=""){
            if(key=="arquivos"){

              for(i in value){
         
                htmls = '<div class="d-flex justify-content-between align-items-center">';
                htmls += '<div class="d-flex align-items-center">'
                htmls += '   <div> '
                htmls += '     <a class="linkComprovante ml-3 mt-2 mr-2" target="_blank" href="' + '../../../../internetfiles/' + value[i]['caminho_relativo'] + '"><i class="fas fa-file" style="color: #ea4b4b;font-size: 20px;"></i></a>'
                htmls += '   </div> '
                htmls += '   <div class="file-name limitar-linha uma-linha pt-1"><a class="m-auto mr-2 limitar-linha uma-linha" style="color: black;" target="_blank" href="' + '../../../../internetfiles/' + value[i]['caminho_relativo'] + '">     ' + value[i]['caminho_relativo'].split("/")[1] + '</a></div> ';
                $(".divLinkNota").append(htmls);
              }
      
            } else {
              $('#formDadosReembolso [name="' + key + '"]').val(value).trigger('change');
              $('#formDadosReembolso [name="' + key + '"]').removeClass("d-none");
            }
          

        }
      
    } else {
      $('#formDadosReembolso [name="' + key + '"]')
        .val(main.dateTimeList(value))
        .trigger('blur');
    }
    }

    loading.close();
  };

  $(document).on("change keyup",".soma", function () {

    const tipoVeiculo = $("#tipoVeiculo").find(":selected").val();
    var qtd = +$("#quilometrosRodados").val().replace(".","").replace(",",".");
    if(!qtd) qtd = 0;
    conta = 0;
    if(tipoVeiculo=="CARRO"){
      conta = qtd * reembolso.valorQuilometroCarro;
    }

    if(tipoVeiculo=="MOTO"){
      conta = qtd * reembolso.valorQuilometroMoto;
    }
    let valorEstacionamento = +$("#valorEstacionamento").val().replace(".","").replace(",",".");
    let valorCombustivel = +conta;
    let valorPedagio = +$("#valorPedagio").val().replace(".","").replace(",",".");

    if(!valorCombustivel) valorCombustivel = 0;
    if(!valorPedagio) valorPedagio = 0;
    if(!valorEstacionamento) valorEstacionamento = 0;

    const soma = +valorEstacionamento + +valorCombustivel + +valorPedagio;
    $("#valor").val(soma.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
  })

  $(document).on("change", "#tipoVeiculo", function (p) {
    const tipoVeiculo = $(this).find(":selected").val();
    var qtd = +$("#quilometrosRodados").val().replace(".","").replace(",",".");
    if(!qtd) qtd = 0;
    conta = 0;
    if(tipoVeiculo=="CARRO"){
      conta = qtd * reembolso.valorQuilometroCarro;
    }

    if(tipoVeiculo=="MOTO"){
      conta = qtd * reembolso.valorQuilometroMoto;
    }

    $("#valorCombustivel").val(conta.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
    $("#valorCombustivel").trigger("change");
  })

  $(document).on("change", ".bancoNumero", function () {
    let nomeBanco = $(this).find(":selected").text().split(" - ")[1];
    $(this).parents(".form-row").find(".banco").val(nomeBanco)
  })

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

  this.validarArquivo = function (file) {
    return {
        "success": file.name
    };
  }

  this.listar = async function (value) {
    loading.open();
    let params = {};
    let items = reembolsos;
    let soma = 0;
    if(value) items = value;
    if (typeof items === 'object' && items != null) {
      items = Object.values(items);
    }

    reembolso.reembolsosListados = items;
    
    let $table = $('#mainTable');
    if (items) {
      for(const i in items){
        soma+= +items[i]['valor'].replace('.', '').replace(',','.');
      }

     let html = "<span>Valor Total: <h3>" + soma.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); + "<h3></span>"
     $(".valor-total").html(html);

      reembolso.elementReembolso = items;
      $table.bootstrapTable('destroy');
      $table.bootstrapTable({
        data: items,
        undefinedText: '',
        pageSize: 7,
        paginationParts: 'pageList',
        theadClasses: 'text-center',
        columns: [{
          field: 'tipoItem',
          title: 'Tipo de Reembolso',
          sortable: true,
          width: '30',
          widthUnit: '%',
          class: 'text-center td-align-center text-nowrap',
          formatter: function (value) {
            return value;
          },
        },
        {
          field: 'valor',
          title: 'Valor',
          sortable: true,
          width: '30',
          widthUnit: '%',
          class: 'text-center td-align-center text-nowrap',
          formatter: function (value) {
            return value;
          },
        },
        {
          field: 'dataInicial',
          title: 'Data',
          sortable: true,
          width: '30',
          widthUnit: '%',
          class: 'text-center td-align-center text-nowrap',
          formatter: function (value) {
            return value;
          },
        },
        {
          field: 'id',
          title: '',
          width: '',
          widthUnit: '%',
          class: 'text-center td-align-center text-nowrap',
          formatter: function (value) {
       
            html = '           <div class="d-flex mx-1">';
            html += '               <a href="#" class="visualizar mr-2 fa-icon"'
            html += '                                                   data-value="' + value + '" title="Visualizar">'
            html += '               <i class="fa fa-eye" aria-hidden="true"></i></a>';
  
      
            html += '           <div class="d-flex mx-1">';
            html += '               <a href="#" class="deleteReembolso mr-2 fa-icon"'
            html += '                                                   data-value="' + value + '" title="Excluir">'
            html += '               <i class="fa fa-trash" aria-hidden="true"></i></a>';

            return html;
          },
        }
      ]
    })
       
      $('[data-toggle="tooltip"]').tooltip();
      loading.close(); 
    } else {
      reembolso.elementReembolso = [];
      $table.bootstrapTable('destroy');
      $table.bootstrapTable();
      $('#bodyReembolso').html('<td colspan="6">Não há reembolsos cadastrados.</td>');
    loading.close(); 
    }
  };

  $("#formDadosReembolso").submit(function(e) {
    e.preventDefault();
    if (reembolso.validarCampos('#formDadosReembolso')) {
      Swal.fire(
        'Ops... !',
        'Por favor preencha os campos necessários.',
        'warning'
      );
      return false;
    }

    var url = "../src/salvarReembolso.php"; 
    var formData = new FormData($("form[name='formDadosReembolso']")[0]);
    var totalfiles = main.anexos.length;
    for (var index = 0; index < totalfiles; index++) {
      formData.append("files[]", main.anexos[index]);
    }
    $.ajax({
           type: "POST",
           url: url,
           data: formData,
           processData: false,
           contentType: false,
           success: function(data)
           {
            data = JSON.parse(data);
            $('#modalCadastro').modal('hide');
            loading.open();
            reembolso.listar(data.data);
           }
         });

    
  });

  this.validarCampos = function (formulario) {
    var valido = false;
    $(formulario + ' .obrigatorio').each(function () {
        if (!$(this).val() && !$(this).parent().hasClass("d-none")) {
            $(this).addClass('is-invalid');
            valido = true;
        } else {
            $(this).removeClass('is-invalid');
        }
    });
    return valido;
}

  this.itemSelecionado = function (value){
    reembolso.esconderItens();
    $(".observacao").removeClass("d-none")
    $(".separador-item").removeClass("d-none");
    $("#valor").attr("readonly", false);
    $("#valor").addClass("mask-money");
    if(value == "CURSO") {
      $(".descritivo").removeClass("d-none");
      $(".valor").removeClass("d-none");
      $(".separador-item-pedagio").addClass("d-none");
    }
    if(value == "TRANSPORTE") {
      //$(".separador-item").addClass("d-none");
      $(".tipoTransporte").removeClass("d-none");
    }
    if(value == "ALIMENTACAO") {
      Swal.fire({
        title: 'Atenção!',
        icon: 'info',
        html: "<p align='left'><b>Alimentação em trabalhos realizados em feriados e finais de semana em convocações extraordinárias</b>: </br> serão reembolsadas as principais refeições: almoço e jantar, respeitando sempre o valor estipulado. <br>Sendo R$ 45,00 para almoço e R$ 55,00 para jantar </p>" +
        "<p align='left'><strong>Alimentação em viagens nacionais:</strong></br> Serão reembolsadas todas as refeições do dia, respeitando sempre o valor estipulado diariamente; Café da manhã só será reembolsado se não estiver incluso na diária do hotel;</br>Limite diário R$ 120,00</p>",
      });
      $(".tipoRefeicao").removeClass("d-none");
      $(".valor").removeClass("d-none");
      $(".separador-item-pedagio").addClass("d-none");
    }
    if(value == "LOCACAO") {
      Swal.fire({
        title: 'Atenção!',
        icon: 'info',
        html: "<p align='left'>Deve ser selecionada a opção de locação de automóvel quando o valor diário estimado para o deslocamento " +
       "com táxi for 50% superior ao custo da locação, desde que previamente acordado com o imediato.</p>" +
        "<p align='left'>O condutor deve estar apto e com a documentação exigida, conforme legislação vigente.</p>" +
        "<p align='left'>O solicitante deve reservar a melhor tarifa disponível de carro, considerando a categoria mais econômica, com ar-condicionado, câmbio manual e proteções inclusas (seguro). </p>",
      });
      $(".separador-item-pedagio").addClass("d-none");
      $(".valor").removeClass("d-none");
    }
    if(value == "PASSAGEM") {
      $(".datasViagem").removeClass("d-none");
      $(".valor").removeClass("d-none");
    }

    if(value == "ASO") {
      Swal.fire({
        title: 'Atenção!',
        icon: 'info',
        html: "<p align='center'>Limite Máximo Reembolsado de <b>R$ 50</b></p>",
      });
      $(".valor").removeClass("d-none");
    }
    if(value == "OUTROS") {
      $(".descritivoOutros").removeClass("d-none");
      $(".valor").removeClass("d-none");
      $(".separador-item-descritivo-outros").removeClass("d-none");
    }
  }


  this.transporteSelecionado = function(value) {
    $("#valor").attr("readonly", false);
    $("#valor").addClass("mask-money");
    if(value == "VEICULO_PROPRIO"){
      Swal.fire({
        title: 'Atenção!',
        icon: 'info',
        html: "<p align='left'>O reembolso de quilometragem se restringe aos deslocamentos durante viagens corporativas, " +
        "acompanhamento de eventos, atividades externas e visitas aos clientes, devidamente comprovados. Não é " +
        "permitida a solicitação de reembolso de quilometragem nos deslocamentos entre residência e local de " +
        "trabalho</p>",
      });

      
  
      $(".separador-item-pedagio").removeClass("d-none");
      reembolso.esconderItens('tipoTransporte');
      $(".tipoVeiculo").removeClass("d-none");
      $(".qtdKm").removeClass("d-none");
      $(".observacao").removeClass("d-none");
      $(".valor").removeClass("d-none");
      $(".pedagio").removeClass("d-none");
      $(".valorCombustivel").removeClass("d-none");
      $(".estacionamento").removeClass("d-none");

      $("#valor").removeClass("mask-money");
      $("#valor").attr("readonly", true);
    }

    if(value == "TAXI" || value == "APLICATIVOS_TRANSPORTES"){
      Swal.fire({
        title: 'Atenção!',
        icon: 'info',
        html: "<p align='left'>O uso de táxi ou aplicativo de transporte se restringe aos deslocamentos durante viagens corporativas, " +
       " acompanhamento de eventos, atividades externas ou quando o colaborador encerrar o expediente em " +
        "convocações extraordinárias após as 22 horas, desde que aprovada antecipadamente pela BlueShift.</p>",
      });
      $(".separador-item-pedagio").addClass("d-none");
      reembolso.esconderItens('tipoTransporte');
      $(".observacao").removeClass("d-none");
      $(".valor").removeClass("d-none");
    }
  }

  this.listarPedido = async function (value) {
    $("#voltar").removeClass("d-none");
    $(".link_novo").addClass("d-none");
    $(".valor-total").addClass("d-none");
    $(".salvarPedido").addClass("d-none");
    $("#newReembolso").addClass("d-none");
    let params = {};
    let soma = 0;
    items = 0;
    if(value != 0 && value != [] && value!= null) items = value;

    if (typeof items === 'object' && items != null) {
      items = Object.values(items);
    }
    reembolso.reembolsosListados = items;
    
    let $table = $('#mainTable');

  
    if (items) {
      for(const i in items){
        soma+= +items[i]['valor'].replace('.', '').replace(',','.');
      }

     let html = "<span>Valor Total: <h3>" + (soma+"").replace('.', ',') + "  R$<h3></span>"
     $(".valor-total").html(html);

      reembolso.elementReembolso = items;
      $table.bootstrapTable('destroy');
      $table.bootstrapTable({
        data: items,
        undefinedText: '',
        pageSize: 7,
        paginationParts: 'pageList',
        theadClasses: 'text-center',
        columns: [{
          field: 'tipo',
          title: 'Tipo de Reembolso',
          sortable: true,
          width: '30',
          widthUnit: '%',
          class: 'text-center td-align-center text-nowrap',
          formatter: function (value) {
            return value;
          },
        },
        {
          field: 'valor',
          title: 'Valor',
          sortable: true,
          width: '30',
          widthUnit: '%',
          class: 'text-center td-align-center text-nowrap',
          formatter: function (value) {
            return (+value).toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2});
          },
        },
        {
          field: 'dataInicial',
          title: 'Data',
          sortable: true,
          width: '30',
          widthUnit: '%',
          class: 'text-center td-align-center text-nowrap',
          formatter: function (value) {
            return main.dateTimeList(value);
          },
        },
        {
          field: 'codigo',
          title: '',
          width: '',
          widthUnit: '%',
          class: 'text-center td-align-center text-nowrap',
          formatter: function (value) {
       
            html = '           <div class="d-flex mx-1">';
            html += '               <a href="#" class="visualizarReembolso mr-2 fa-icon"'
            html += '                                                   data-value="' + value + '" title="Visualizar">'
            html += '               <i class="fa fa-eye" aria-hidden="true"></i></a>';
            return html;
          },
        }
      ]
      })
       
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


  this.esconderItens = function(isento) {
   
    $(".esc").each(function(index){
  
      if(!$(this).hasClass(isento)){
        $(this).addClass("d-none");
        $(this).find("input").val("");
        $(this).find("input").trigger("change");

        $(this).find('select').val("").trigger("change")
      }
    })
    if(isento)  $('.'+ isento).removeClass("d-none");
  }

  this.enviarEmail = function (json) {
    formData = new FormData();
    formData.append('json', JSON.stringify(json));
    $.ajax({
        url: "../service/enviarEmailReembolso/",
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (obj) {
            if (obj.success) {
                loading.close();

            } else {
                toastr.error("Não foi possível estabelecer uma conexão com o Banco de Dados. Verifique sua conexão com a internet, e recarregue a página novamente.", "Ops... !");
                loading.close();
            }
        },
        error: function () {
            loading.close();
            toastr.error("Não foi possível enviar o email. Tente Novamente ou entre em contato com o suporte.", "Ops... !");
        }
    });
  }
  this.listarDadosPedido = function (codigo) {
    $(".linkComprovante").remove();
    $(".file-name").remove();

    loading.open();
    var params = {};
    let parametro = 0;
    let ordem = ["tipo", "tipoTransporte", "tipoVeiculo", "quilometrosRodados", "pedagio", "estacionamento", 
    "qtdPedagio", "qtdEstacionamento", "valorEstacionamento", "valorPedagio",
    "valorCombustivel", "descritivo", "tipoRefeicao", "dataInicial", "Comprovantes", "observacao", "valor", "descritivoOutros", "dataInicialViagem", "dataFinalViagem", "centroCusto","Cliente_codigo"]

    for(const i in reembolso.reembolsosListados){
      if(reembolso.reembolsosListados[i]['codigo'] == codigo){
        parametro = i;
      }
    }

    for(key of ordem){
      value = reembolso.reembolsosListados[parametro][key];

      if (key != 'dataInicial') {
        if(value!=""){


          if(key=="tipo"){
            $('#formDadosReembolso [name="' + 'tipoItem' + '"]').val(value).trigger('change');
            $('#formDadosReembolso [name="' + 'tipoItem' + '"]').removeClass("d-none");
          } else{
            if(key=="Comprovantes"){
              separador = value.split(',');
              for(i in separador){
                htmls = '<div class="d-flex justify-content-between align-items-center">';
                htmls += '<div class="d-flex align-items-center">'
                htmls += '   <div> '
                htmls += '     <a class="linkComprovante ml-3 mt-2 mr-2" target="_blank" href="' + '../../../../internetfiles/' + separador[i] + '"><i class="fas fa-file" style="color: #ea4b4b;font-size: 20px;"></i></a>'
                htmls += '   </div> '
                htmls += '   <div class="file-name limitar-linha uma-linha pt-1"><a class="m-auto mr-2 limitar-linha uma-linha" style="color: black;" target="_blank" href="' + '../../../../internetfiles/' + separador[i] + '">     ' + separador[i].split("/")[1] + '</a></div> ';
                $(".divLinkNota").append(htmls);
              }
      
            } else {
              $('#formDadosReembolso [name="' + key + '"]').val(value).trigger('change');
              $('#formDadosReembolso [name="' + key + '"]').removeClass("d-none");
            }
          }

        }
      
    } else {
      $('#formDadosReembolso [name="' + key + '"]')
        .val(main.dateTimeList(value))
        .trigger('blur');
    }
    }

    loading.close();
  };

  this.listarBancosUsuario= function(){
    return new Promise((resolve, reject) => {
      params = {};
      main.executarAPI(
      '',
      'SELECT',
      '',
      JSON.stringify(params),
      function (obj) {
          if (obj.success) {
              loading.close();
              $('#modalConclusaoPedido').modal('show');
              html = '<option value="">Selecione</option>';
              for (i in obj.elements) {
                html += '<option data-banco="' + obj.elements[i].banco +  '" data-documento="' + obj.elements[i].documento + '" data-agencia="' + obj.elements[i].agencia + '" data-conta="' + obj.elements[i].conta + '" data-digitoAgencia = "' + obj.elements[i].digitoAgencia +  '" data-digitoConta="' + obj.elements[i].digitoConta + '" value="' + obj.elements[i].bancoNumero  + '">' + obj.elements[i].banco + '</option>'
              }
              $('#banco-select').html(html);
              resolve(obj.elements);
          } else {
            loading.close();
            $('#modalDadosBancarios').modal('show');
            resolve([]);
          }
      } , "listarBancosUsuario"
    );
  })
  }

  this.verificarDatas = function() {
    
    let data = $("#dataFinalViagem").val();
    if(data){

      let end = moment(($("#dataFinalViagem").val()), "DD/MM/YYYY");

      let start = moment($("#datInicialViagem").val(), "DD/MM/YYYY");
      if(start <= end){
          return true;
      } else{
        Swal.fire(
          "Ops... !",
          "A data inicial tem que ser menor ou igual a data final de viagem",
          "warning"
        );
        $(this).val("");
        return false;
      }
    }
}

}


