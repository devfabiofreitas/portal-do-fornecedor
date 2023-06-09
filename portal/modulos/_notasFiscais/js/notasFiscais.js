function notasFiscais() {

  this.init = function () {
    notasFiscais.listar()

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

    $(document).on('click', '.editar', function () {
      var codigo = $(this).data('value');
      notasFiscais.visualizarNotasFiscais(codigo)
    });

    $("#mesAno").blur(function () {
      if ($("#mesAno").val()) {
        $("#buscar").trigger("click");
        $(".excluir-filtro").removeClass('d-none')
      }
    })

    $('.excluir-filtro').click(function () {
      $('#formFiltro')[0].reset();
      notasFiscais.listar();
      $('.excluir-filtro').addClass('d-none')
    });


    $('#buscar').click(function () {
      var html = '';
      var filtros = 0;
      $('#formFiltro .form-control').each(function () {
        if ($(this).val() != "") {
          var campo, nome, valor;
          if ($(this).attr('type') != 'checkbox' || ($(this).attr('type') == 'checkbox' && $(this).prop('checked'))) {
            if (!$(this).is("select")) {
              nome = $(this).val();
            } else {
              nome = $(this).find('option[value="' + $(this).val() + '"]').text();
            }

            if ($(this).attr('type') == 'checkbox') {
              campo = $(this).parents('.form-group').find('.label-titulo').text();
              nome = $(this).next('label').text();
            } else {
              campo = $(this).prev('label').text();
            }

            html += '<div class="py-2 mr-2">';
            html += '   <a href="javascript:void(0)" data-value="' + $(this).attr('name') + '" data-item="' + $(this).val() + '" class="excluir-filtro"><i class="fa fa-times text-secondary mr-1"></i></a>';
            html += '   <button class="btn btn-secondary rounded-pill"><img class="mr-1" width="13px" src="../../../img/filter-white.svg">' + campo + ': ' + nome + '</button>';
            html += '</div>';
            filtros++;
          }
        }
      });
      if (filtros > 0) {
        html += '<a href="javascript:void(0)" class="excluir-filtros font-weight-bold text-secondary pr-2">Limpar Filtros</a>';
      }
      $('#activeFilters').html(html);

      paginaAtual = 0;
      notasFiscais.listar();
      $('#modalFiltro').modal('hide');
    });

  };

  this.listar = function () {
    loading.open();
    var params = main.getFormData($('#formFiltro'));
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
            field: 'cnpj',
            title: 'CNPJ',
            sortable: true,
            width: '19',
            widthUnit: '%',
            class: 'text-center td-align-center text-nowrap',
            formatter: function (value) {
              return '<span class="tooltip-content">' + value + '</span>'
            },
          },
          {
            field: 'dataCadastro',
            title: 'Data cadastro',
            sortable: true,
            width: '19',
            widthUnit: '%',
            class: 'text-center td-align-center text-nowrap',
            formatter: function (value) {
              return '<span class="tooltip-content">' + main.dateAndTimeList(value) + '</span>';
            },
          },
          {
            field: 'periodoInicio',
            title: 'Período inicio',
            sortable: true,
            width: '18',
            widthUnit: '%',
            class: 'text-center td-align-center text-nowrap',
            formatter: function (value) {
              return main.dateTimeList(value);
            },
          },
          {
            field: 'periodoFim',
            title: 'Período fim',
            sortable: true,
            width: '18',
            widthUnit: '%',
            class: 'text-center td-align-center text-nowrap',
            formatter: function (value) {
              return main.dateTimeList(value);
            },
          },
          {
            field: 'horasRealizadas',
            title: 'Horas realizadas',
            sortable: true,
            width: '20',
            widthUnit: '%',
            class: 'text-center td-align-center text-nowrap',
            formatter: function (value) {
              return '<span class="tooltip-content">' + value + 'h </span>';
            },
          },
          {
            field: 'valor',
            title: 'Valor',
            sortable: true,
            width: '18',
            widthUnit: '%',
            class: 'text-center td-align-center text-nowrap',
            formatter: function (value) {
              if (value == null || value == '' || value == '0.00') {
                value = 'R$ ' + main.formatMoney(value);
              } else {
                value = 'R$ ' + main.formatMoney(value);
              }
              return value;
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
            field: 'observacao',
            title: 'Observação',
            sortable: true,
            width: '20',
            widthUnit: '%',
            class: 'text-center td-align-center text-nowrap',
            formatter: function (value) {
              if (value != "" && value != null) {
                return '<span class="tooltip-content">' + value + "</span>";
              } else {
                return "";
              }
            },
          },
          {
            field: 'codigo',
            title: '',
            width: '7',
            widthUnit: '%',
            class: 'text-center',
            formatter: function (value) {
              var retorno = '';
              retorno += '<div class="d-flex justify-content-center mx-1">';
              retorno +=
                '    <a href="#" class="editar editar-tabela mr-2" " data-value="' +
                value +
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
        $('#bodyNotasFiscais').html('<td colspan="6">Sem registros</td>');
        loading.close();
      }
    },
      'listarNotasFiscais'
    );
  };


  this.visualizarNotasFiscais = function (codigo) {
    loading.open();
    var params = {};
    params['codigo'] = codigo;
    main.executarAPI("", "SELECT", "", JSON.stringify(params), function (obj) {
      if (obj.success) {
        if (obj.elements[0].caminho) {
          window.open('../../../../internetfiles/' + obj.elements[0].caminho, 'notaFiscal', 'STATUS=NO, MENUBAR=NO, TOOLBAR=NO, LOCATION=NO, DIRECTORIES=NO, RESISABLE=NO, SCROLLBARS=YES, TOP=10, LEFT=10, WIDTH=940, HEIGHT=640');
        }

        loading.close();
      } else {
        toastr.error(
          "Ocorreu um erro ao buscar o usuário. Tente novamente ou entre em contato com o suporte.",
          "Ops... !"
        );
        loading.close();
      }
    },
      "visualizarNotasFiscais"
    );
  }

}
var notasFiscais = new notasFiscais();
notasFiscais.init();