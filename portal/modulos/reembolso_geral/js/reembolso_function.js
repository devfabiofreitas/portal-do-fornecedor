function Reembolso() {
  this.elementReembolso = [];
  this.permissaoReembolso = true;
  this.reembolsosListados = [];
  this.init = async function () {
    reembolso.listar();
  }
  $(document).on('click', '.link_novo', function () {
    $('#modalConfirma').modal('show');
    $(".modal-body").removeClass('overflow-x-hidden');
  })

  $(".btn-confirmar-termos").click(function (){
    window.location.href = "reembolso_pedido.frag.php" ;
  })

  $(document).on('click', '.visualizar', function () {
  
    window.location.href = "reembolso_pedido.frag.php?codigo=" + $(this).data("value") ;
  });
  $(document).on('change', '#tipoItem', function () {
    reembolso.itemSelecionado($(this).find(":selected").val())
  })

  $(document).on('change', '#pedagio', function() {
    $(".qtdPedagio").addClass("d-none");
    $(".valorPedagio").addClass("d-none");

    if($(this).find(":selected").val() == "SIM"){
      $(".qtdPedagio").removeClass("d-none");
      $(".valorPedagio").removeClass("d-none");
    } 
  })
  $(document).on('change', '#estacionamento', function() {
    $(".qtdEstacionamento").addClass("d-none");
    $(".valorEstacionamento").addClass("d-none");

    if($(this).find(":selected").val() == "SIM"){
      $(".qtdEstacionamento").removeClass("d-none");
      $(".valorEstacionamento").removeClass("d-none");
    } 
  })
  $(document).on('change', '#tipoTransporte', function () {
    reembolso.transporteSelecionado($(this).find(":selected").val())
  })

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

  $("#voltar").click(function(){
   $(".text-header").html("<span class='font-cairo-bold'>Gestor/Projeto</span>");
    loading.open();
    window.location.href = "reembolso_geral.frag.php" ;
    loading.close();

})

  this.listar = async function () {
    $("#voltar").addClass("d-none");
    $(".link_novo").removeClass("d-none");
    items = false;
    if(pedidosReembolso != 0 && pedidosReembolso != [] && pedidosReembolso!= null){
      items = pedidosReembolso;
    }
  
    let params = {};

    let $table = $('#mainTable');
    if (items) {
      reembolso.elementReembolso = items;
      $table.bootstrapTable('destroy');
      $table.bootstrapTable({
        data: items,
        undefinedText: '',
        pageSize: 7,
        paginationParts: 'pageList',
        theadClasses: 'text-center',
        columns: [
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
          field: 'valorTotal',
          title: 'Reembolso Solicitado',
          sortable: true,
          width: '18',
          widthUnit: '%',
          class: 'text-center td-align-center text-nowrap',
          formatter: function (value, row) {
           
            return (+value).toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2});
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
              case 'V':
                retorno = 'Analisada';
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
    } else {
      reembolso.elementReembolso = [];
      $table.bootstrapTable('destroy');
      $table.bootstrapTable();
      $('#bodyReembolso').html('<td colspan="6">Não há reembolsos solicitados.</td>');
      loading.close();
    }

    loading.close();
  };


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
      $(".tipoRefeicao").removeClass("d-none");
      $(".valor").removeClass("d-none");
      $(".separador-item-pedagio").addClass("d-none");
    }
    if(value == "LOCACAO") {
      $(".separador-item-pedagio").addClass("d-none");
      $(".valor").removeClass("d-none");
    }
  }

  this.transporteSelecionado = function(value) {
    $("#valor").attr("readonly", false);
    $("#valor").addClass("mask-money");
    if(value == "VEICULO_PROPRIO"){
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
      $(".separador-item-pedagio").addClass("d-none");
      reembolso.esconderItens('tipoTransporte');
      $(".observacao").removeClass("d-none");
      $(".valor").removeClass("d-none");
    }
  }

  this.esconderItens = function(isento) {
    $(".esc").addClass("d-none");
    if(isento)  $('.'+ isento).removeClass("d-none");
  }

}