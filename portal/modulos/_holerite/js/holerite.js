function Holerite() {

  this.init = function () {
    holerite.listar()

    main.mascaraData('#mesAno')

    $('#mesAno').datetimepicker({
      locale: 'pt-br',
      showClose: false,
      format: 'MM/YYYY',
      widgetPositioning: {
        horizontal: "left",
        vertical: "auto"
      }
    });

    $(document).on('click', '.visualizar', function () {
      var src = $(this).data('value');
      window.open('../../../../webservice/mostrarDocumento/index.php?caminho=' + src + "&url=http://clockify.azurewebsites.net/" , 'PRINT', 'height=600, width=800');
    });

    $("#mesAno").blur(function () {
       holerite.listar();
    })
    
  };

  this.listar = function () {
    loading.open();
    var params = {}
    params['mesAno'] = main.dateInsert($("#mesAno").val())
    params['codigo'] = codigoAtual;
    main.executarAPI('', 'SELECT', '', JSON.stringify(params), function (obj) {
      var $table = $('#mainTable');
      if (obj.success) {
        $table.bootstrapTable('destroy');
        $table.bootstrapTable({
          data: obj.elements,
          undefinedText: '',
          pageSize: 7,
          paginationParts: 'pageList',
          theadClasses: 'text-center',
          columns: [{
            field: 'mesReferencia',
            title: 'Mês referência',
            sortable: true,
            width: '18',
            widthUnit: '%',
            class: 'text-center td-align-center text-nowrap',
            formatter: function (value) {
              return main.dateTimeList(value)
            },
          },
          {
            field: 'nome',
            title: 'Nome',
            sortable: true,
            width: '19',
            widthUnit: '%',
            class: 'text-center td-align-center text-nowrap',
            formatter: function (value,row,json) {
              return '<span class="tooltip-content">'+obj.elements[0].nome+'</span>'
            },
          },
          {
            field: 'dataCadastro',
            title: 'Data de upload',
            sortable: true,
            width: '19',
            widthUnit: '%',
            class: 'text-center td-align-center text-nowrap',
            formatter: function (value) {
              return '<span class="tooltip-content">' + value + '</span>'
            },
          },
          {
            field: 'codigo',
            title: '',
            width: '7',
            widthUnit: '%',
            class: 'text-center',
            formatter: function (value, row) {
              
              var retorno = '';
              retorno += '<div class="d-flex justify-content-center mx-1">';
              retorno +=
                '    <a href="#" class="visualizar editar-tabela mr-2" " data-value="' +
                row.caminho +
                '" title="Visualizar"><i class="fas fa-eye text-secondary"></i></a>';
              retorno += '</div>';
              return retorno;
            },
          },
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
        $table.bootstrapTable('destroy');
        $table.bootstrapTable();
        $('#bodyHolerite').html('<td colspan="6">Sem registros</td>');
        loading.close();
      }
    },
      'listarHolerite'
    );
  };


}
var holerite = new Holerite();
holerite.init();