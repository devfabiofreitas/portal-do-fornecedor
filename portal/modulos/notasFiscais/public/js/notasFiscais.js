function NotasFiscais() {

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

   
    $(document).on('click', '.visualizar', function () {
      var src = $(this).data('value');
      window.open('../../../../../../internetfiles/' + src, 'notaFiscal', 'STATUS=NO, MENUBAR=NO, TOOLBAR=NO, LOCATION=NO, DIRECTORIES=NO, RESISABLE=NO, SCROLLBARS=YES, TOP=10, LEFT=10, WIDTH=940, HEIGHT=640');
    });
  

    $(document).ready(function () {
      $('#mainTable').bootstrapTable({
        undefinedText: '',
        pageSize: 7,
        paginationParts: 'pageList',
        theadClasses: 'text-center',
      });
    });

  };


}
var notasFiscais = new NotasFiscais();
notasFiscais.init();