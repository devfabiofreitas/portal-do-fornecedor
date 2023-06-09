function Holerite() {

  this.init = function () {


    main.mascaraData('#mesAno')

    $('#mesAno').datetimepicker({
      locale: 'pt-br',
      showClose: false,
      format: 'MM/YYYY',
      useCurrent: false,
      widgetPositioning: {
        horizontal: "left",
        vertical: "auto"
      }
    }).on('dp.change', function(e){
        $('#formFiltro').submit();
  });


    $(document).ready(function () {
      $('#mainTable').bootstrapTable({
        undefinedText: '',
        pageSize: 7,
        paginationParts: 'pageList',
        theadClasses: 'text-center'
      }
      );
    });


    $(document).on('click', '.visualizar', function () {
      var src = $(this).data('value');
      window.open('../../../../webservice/visualizarArquivosAdm/index.php?caminho=' + src + '&url=https://clockify.azurewebsites.net/', 'PRINT', 'height=600, width=800');

    });
  
  };


}
var holerite = new Holerite();
holerite.init();