function Timesheet(){
  this.init = function () {
    $(".multi-select-tags").select2({
      dropdownParent: $("#modalCadastro")
    });

    $("#linkHorasProject").addClass("border-bottom-link");
    $("#reportTimesheet").css("color", "#8080804a");
    
    //main.mascaraData('.data');
    timesheet.reportRange();
    timesheet.listar()
    timesheet.listarTags();
  }

  $("#Project").change(function(){
    $("#Client").val($(this).find(':selected').attr("data-Client"))
    $("#Billable").val($(this).find(':selected').attr("data-Billable"))
    $("#Cliente_codigo").val($(this).find(':selected').attr("data-Client_cod"))
  })

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

  $('#newTimesheet').click(async function () {
    timesheet.verificaSessao();
    $('#formDados')[0].reset();
    $(".obrigatorio").removeClass('is-invalid');
    $("#Tags").val([]).change();
    $("#Billable").val(null).change()
    $("#Duration_h").val("");
    $(".form-control").attr('disabled', false);
    $("#Project").attr('disabled', true);
    $("#Billable").attr('disabled', true);
    $("#Start_Date").val(moment().format("DD/MM/YYYY")).trigger('blur');
    $("#End_Date").val("")
    $("#Start_Date").val(moment().format("DD/MM/YYYY")).trigger('change');
    $("#Start_Date").val(moment().format("DD/MM/YYYY")).trigger('blur');
    main.mudarVisualizacao('salvar');
    $('#modalCadastro').modal('show');
    $(".modal-body").removeClass('overflow-x-hidden');
  });

  $("#salvar").click(function () {
    timesheet.verificaSessao();
    timesheet.cadastrar();
  })

  $("#alterar").click(function () {
      timesheet.verificaSessao();
      timesheet.alterar();
  })

  $(document).on('click', '.visualizar', function () {
    $('#salvar').addClass('d-none');
    $('#alterar').addClass('d-none');
    $('#limpar').addClass('d-none');
    $(".form-control").attr('disabled', true);
    codigo = parseInt($(this).data('value'));
    $('#modalCadastro').modal('show');
    timesheet.listarDados(codigo);
  });

  let mascaraHoras = function (val) {
    return val.replace(/\D/g, '')[0] === '2' ? 'AE:CD' : 'AB:CD';excl
  },
  spOptions = {
    onKeyPress: function(val, e, field, options) {
        field.mask(mascaraHoras.apply({}, arguments), options);
      },
      translation: {
          "A": { pattern: /[0-9]/, optional: false},
          "B": { pattern: /[0-9]/, optional: false},
          "C": { pattern: /[0-5]/, optional: false},
          "D": { pattern: /[0-9]/, optional: false},
          "E": { pattern: /[0-4]/, optional: false}
      }
  };
  

  $('.time-picker').mask(mascaraHoras, spOptions);
  $('.time-picker').on("blur", function(){
    let valor = $(this).val()
    if(valor.split('').length == 1){
      valor = "0" + $(this).val();
    }
    $('.time-picker').mask(mascaraHoras, spOptions);
    let splitOne = $(this).val().split(":")[1];
    if(typeof splitOne === "undefined" || splitOne == ""){
      $(this).val(valor + "00").trigger("blur");
    }
    const valorPrimerioDigito = parseInt($(this).val().split(":")[0].split('')[0]);
    const valorSegundoDigito = parseInt($(this).val().split(":")[0].split('')[1]);
    if(valorPrimerioDigito > 2){
       $(this).val("0" + valorPrimerioDigito + ":" + $(this).val().split(":")[1])
    } 

    else if(valorPrimerioDigito > 1 && valorSegundoDigito > 3 ){
      $(this).val(valorPrimerioDigito + "3" + ":" + $(this).val().split(":")[1])
    }
  });

  $("#reportTimesheet").click(function () {
    window.location.href = "reportTimesheet.frag.php";
  });


  /* 
    Filtro
  */

  $("#filtroFim").blur(function(){
      if($("#filtroInicio").val()){
      $("#buscar").trigger("click");
      }
  })

  $("#filtroInicio").blur(function(){
    if($("#filtroFim").val()){
      $("#buscar").trigger("click");
    }
  })

  $('#buscar').click(function () {
    $('#salvar').removeClass('d-none');
    $('#alterar').addClass('d-none');
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
    timesheet.listar();
    $('#modalFiltro').modal('hide');
  });

  $('#limparFiltro').click(function () {
    $('#formFiltro')[0].reset();
  });
  
  $(document).on('click', '.excluir-filtros', function () {
    $('#formFiltro')[0].reset();
    $('#activeFilters').html('');
    paginaAtual = 0;
    timesheet.listar();
  });

  $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
    $("#filtroInicio").val(picker.startDate.format('YYYY-MM-DD') + " - " + picker.endDate.format('YYYY-MM-DD'))
    timesheet.listar();
  })
  


  $('#Start_Date').on('change', function () {
    if($('#Start_Date').val() !=  $('#End_Date').val()){
      timesheet.listarProjetos().then(
      (resolve)=>{
       $("#Project").attr('disabled', false);
      }
    );
    }
  })

  $('#Start_Date').on('blur', function () {
    $('#End_Date').val(($(this).val()))
  })

  $('#Start_Time, #End_Time, #End_Date, #Start_Date').on('focusout blur', function () {

    let Start_Time = $("#Start_Time").val();
    let End_Time = $("#End_Time").val();


    
    if(End_Time){

      let end = moment(($("#End_Date").val() + " " + End_Time), "DD/MM/YYYY HH:mm");

      let start = moment($("#Start_Date").val() + " " + Start_Time, "DD/MM/YYYY HH:mm");
      if(start <= end){
          let duracao = main.duracaoHoras(Start_Time, End_Time);

          let [ , minutos ] = duracao.map(x=> ("00" + x).slice(-2))
          let horas = end.diff(start,'hours')

          $("#Duration_h").val(horas + ":" + minutos)
          $("#Duration_d").val(end.diff(start,'days'))
          return true;
      } else{
        $("#Duration_h").val("");
        $("#Duration_d").val("");
        return false;
      }
  }
  })


  this.reportRange = function(){
    moment.locale("pt");
    let starts = moment().subtract(1, 'month').startOf('month');
    let ends = moment();

    $('#reportrange').daterangepicker({
      minDate: moment().subtract(1, 'month').startOf('month'),
      startDate: starts,
      endDate: ends,
      showCustomRangeLabel: false,
      alwaysShowCalendars: true,
      autoApply: true,
      ranges: {
        'Hoje': [moment(), moment()],
        'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Esta Semana': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
        'Este Mês': [moment().startOf('month'), moment().endOf('month')],
        'Mês Passado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      locale: { 
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
      
    },timesheet.showReportRangeText);
   timesheet.showReportRangeText(starts, ends);
  }

  this.showReportRangeText = function report(start, end) {
    $('#reportrange span').html(start.format('MMM D') + ' - ' + end.format('MMM D'));
  }

  this.timeToDecimal = function (t) {

    if (/^\d{1,2}\w+\d{1,2}$/gi.test(t)) {

        throw new Error("Insira uma horário válido, fmt: 00:00");

    }
    const [hour, min] = t.split(':');

    const dec = parseInt((min / 6) * 10, 10);

    return parseFloat(parseInt(hour, 10) + '.' + (dec < 10 ? '0' : '') + dec);
  }


  /* 
    CONTROLE
  */

  this.verificarFeriados = function(){
    var formData = new FormData();
    var params = {
      "Start_Date":main.dateInsert($("#Start_Date").val()),
      "End_Date":main.dateInsert($("#End_Date").val()),
      "Client":$("#Project").find(':selected').attr("data-Client_cod")
    }
    formData.append('params', JSON.stringify(params));
    var options  = { method: 'POST',
                   mode: 'cors',
                   cache: 'default' ,
                   body: formData};
  
    return fetch('../service/verificarFeriados/index.php', options)
      .then(function(response) {
        return response.json();
      })
      .then((data) => {
        if(data.success){
            return true;
        } else{
            return false;
        }
      });
  }
 
  this.verificaSessao = function() {
    /* $.get('../service/verificaSessao/index.php', function(data) {
      data = JSON.parse(data);
      if(data.sessao == "E"){
        top.window.location.href = data.caminho;
      } 
    }); */
  }

  this.verificaCadastroPassado = function (){
    const dataMarcacao = moment($("#Start_Date").val(), "DD/MM/YYYY");
    const now = moment();

    const diferenca = now.diff(dataMarcacao, "days");

    if(diferenca > 7){
      return timesheet.verificarApontamento().then(apontamento => {
        if(apontamento) {
          return true;
        } 
  
        else{
          Swal.fire(
            'Ops... !',
            'Não é possivel cadastrar ou realizar modificações em apontametos com mais de uma semana passada..',
            'warning'
          );
          return false;
        }
      })
    } else {
      return true;
    }
  }

  this.verificaAlteracaoPassado = function(){
    const dataMarcacao = moment(timesheet.getDataSelections()[0], "YYYY-MM-DD");
    const now = moment();

    const diferenca = now.diff(dataMarcacao, "days");
  
    if(diferenca > 7){
      return timesheet.verificarApontamento().then(apontamento => {
        if(apontamento) {
          return true;
        } 
  
        else{
          Swal.fire(
            'Ops... !',
            'Não é possivel cadastrar ou realizar modificações em apontametos com mais de uma semana passada.',
            'warning'
          );
          return false;
        }
      })
    }
    
    return true;
  }

  this.verificarDatas = function() {
      const Start_Time = $("#Start_Time").val();
      const End_Time = $("#End_Time").val();
      
      if(End_Time){

        let end = moment(($("#End_Date").val() + " " + End_Time), "DD/MM/YYYY HH:mm");

        let start = moment($("#Start_Date").val() + " " + Start_Time, "DD/MM/YYYY HH:mm");
        if(start <= end){
            let duracao = main.duracaoHoras(Start_Time, End_Time);

            let [ , minutos ] = duracao.map(x=> ("00" + x).slice(-2))
            let horas = end.diff(start,'hours')

            $("#Duration_h").val(horas + ":" + minutos)
            $("#Duration_d").val(end.diff(start,'days'));
            return true;
        } else{
          Swal.fire(
            "Ops... !",
            "A marcação inicial tem que ser maior ou igual a marcação final",
            "warning"
          );
          $(this).val("");
          $("#Duration_h").val("")
          $("#Duration_d").val("")
          return false;
        }
    }
  }

  this.verificarDataFinal = function(){
    let end = moment(($("#End_Date").val()), "DD/MM/YYYY");

    let start = moment($("#Start_Date").val(), "DD/MM/YYYY");

    let boolean = 0;

    if(end > start){
      return false;
    }

    return true;
  }

  this.controleTimesheetData = function (){
    let dataSelection = moment(timesheet.getDataSelections()[0], "YYYY-MM-DD");
    let dataHoje = moment();
    let dataHojeMes = dataHoje.month() + 1;
    let dataHojeAno = dataHoje.year();
    let dataTrMes = dataSelection.month() + 1;
    let dataTrAno = dataSelection.year();
    
    if(dataTrAno > dataHojeAno || (dataTrMes >= dataHojeMes && dataTrAno >= dataHojeAno) ){
       return true;
    } else {
      const difMes = dataHojeMes - dataTrMes == 1 ? true : false ;
      const difAno = dataTrAno -  dataHojeAno == 0 ? true : false
      const difAnoJaneiro = dataHojeAno-dataTrAno == 1 ? true : false ;
      const difMesJaneiro = dataHojeMes == 1 && dataTrMes == 12 ? true : false;
      const startDayWeek = dataHoje.clone().startOf('month').day();
      let workDay = 1;
      if(startDayWeek == 0){
        workday = 2;
      } else if(startDayWeek == 6) {
        workday = 3;
      }

      let dataHojeDia = moment().date() == workDay ? true : false;
      
      if(dataHojeDia && ((difMes && difAno) || (difAnoJaneiro && difMesJaneiro)) ){
        return true;
      } 
    }

    return timesheet.verificarApontamento().then(apontamento => {
      if(apontamento) {
        return true;
      } 

      else{
        Swal.fire(
          'Ops... !',
          'Não é possivel cadastrar ou realizar modificações em datas com mês já fechado.',
          'warning'
        );
        return false;
      }
    })
  }
  
  this.controleTimesheetDataCadastro = function(){
    let dataHoje = moment();
    let dataHojeMes = moment().month() +1;
    let dataHojeAno = moment().year();
    let dataTrMes = moment($("#Start_Date").val(), "DD/MM/YYYY").month() + 1;
    let dataTrAno = moment($("#Start_Date").val(), "DD/MM/YYYY").year();

    if(dataTrAno > dataHojeAno || (dataTrMes >= dataHojeMes && dataTrAno >= dataHojeAno) ){
      return true;
    } else {
      const difMes = dataHojeMes - dataTrMes == 1 ? true : false ;
      const difAno = dataTrAno -  dataHojeAno == 0 ? true : false
      const difAnoJaneiro = dataHojeAno-dataTrAno == 1 ? true : false ;
      const difMesJaneiro = dataHojeMes == 1 && dataTrMes ==12 ? true : false;
      const startDayWeek = dataHoje.clone().startOf('month').day();
      let workDay = 1;
      if(startDayWeek == 0){
        workday = 2;
      } else if(startDayWeek == 6) {
        workday = 3;
      }

      const dataHojeDia = moment().date() == workDay ? true : false;
    
      if(dataHojeDia && ((difMes && difAno) || (difAnoJaneiro && difMesJaneiro)) ){
        return true;
      } 
    }

    return timesheet.verificarApontamento().then(apontamento => {
      if(apontamento) {
        return true;
      } 

      else{
        Swal.fire(
          'Ops... !',
          'Não é possivel cadastrar ou realizar modificações em datas com mês já fechado.',
          'warning'
        );
        return false;
      }
    })
  }

  this.verificaCadastroFuturo = function () {
    const dataMarcacao = moment($("#Start_Date").val(), "DD/MM/YYYY");
    const now = moment();
    const i = now >= dataMarcacao ? true : false;

    if(!i){
      Swal.fire(
        'Ops... !',
        'Não é possivel realizar apontamento em datas futuras.',
        'warning'
      );
      return false;
    }

    return true;
  }
  
  this.controleTimesheetDataSas = function () {

    const diaAberturaSas = 21; // mes anterior
    const diaFechamentoSas = 20; // mes vigente

    let aberturaSas = "";
    let fechamentoSas = "";
    
    const dataHoje = moment();
    const dataHojeMes = moment().month() +1;
    const dataHojeAno = moment().year();
    const dataHojeDia = dataHoje.clone().date();

    const dataTr = moment($("#Start_Date").val(), "DD/MM/YYYY");
    const dataTrMes = dataTr.clone().month() + 1;
    const dataTrAno = dataTr.clone().year();
    const dataTrDia = dataTr.clone().date();
    
    if(dataHojeDia > 20){
      aberturaSas = dataHojeAno + "-" + dataHojeMes + "-" + diaAberturaSas ; // 21/08/2022
      fechamentoSas = dataHojeAno + "-" + (dataHojeMes + 1) + "-" + diaFechamentoSas ; //20/09/2022
    } else {
      aberturaSas = dataHojeAno + "-" + (dataHojeMes - 1) + "-" + diaAberturaSas ; // 21/07/2022
      fechamentoSas = dataHojeAno + "-" + (dataHojeMes) + "-" + diaFechamentoSas ; // 20/08/2022
    }
    
    if(moment(dataTr.format("YYYY-MM-DD")).isSameOrAfter(aberturaSas) && 
         moment(dataTr.format("YYYY-MM-DD")).isSameOrBefore(fechamentoSas)){
     
      return true;
    } else {
      if(dataHojeDia > 20){
        const isDiaLimiteUtil = (dataHojeDia - diaFechamentoSas) <= 3 ? true : false;
        const isMesmoMes = dataHojeMes == dataTrMes ? true : false;
        const isMesAnterior = (dataHojeMes - dataTrMes) == 1 ? true : false;

        if(isDiaLimiteUtil){
          if(isMesmoMes){
            return true;
          }

          if(isMesAnterior && dataTrDia >= diaAberturaSas) {
            return true;
          }
        }
      }
    }

    return timesheet.verificarApontamento().then(apontamento => {
      if(apontamento) {
        return true;
      } 

      else{
        Swal.fire(
          'Ops... !',
          'Não é possivel cadastrar ou realizar modificações em datas com mês já fechado.',
          'warning'
        );
        return false;
      }
    }) 
  }

  this.controleTimesheetDataSasExcluir = function () {
    const diaAberturaSas = 21; // mes anterior
    const diaFechamentoSas = 20; // mes vigente

    let aberturaSas = "";
    let fechamentoSas = "";
    
    const dataHoje = moment();
    const dataHojeMes = moment().month() +1;
    const dataHojeAno = moment().year();
    const dataHojeDia = dataHoje.clone().date();

    const dataTr =  moment(timesheet.getDataSelections()[0], "YYYY-MM-DD");
    const dataTrMes = dataTr.clone().month() + 1;
    const dataTrAno = dataTr.clone().year();
    const dataTrDia = dataTr.clone().date();
    
    if(dataHojeDia > 20){
      aberturaSas = dataHojeAno + "-" + dataHojeMes + "-" + diaAberturaSas ; // 21/08/2022
      fechamentoSas = dataHojeAno + "-" + (dataHojeMes + 1) + "-" + diaFechamentoSas ; //20/09/2022
    } else {
      aberturaSas = dataHojeAno + "-" + (dataHojeMes - 1) + "-" + diaAberturaSas ; // 21/07/2022
      fechamentoSas = dataHojeAno + "-" + (dataHojeMes) + "-" + diaFechamentoSas ; // 20/08/2022
    }

    // console.log(aberturaSas, dataTr);
    
    if(moment(dataTr.format("YYYY-MM-DD")).isSameOrAfter(aberturaSas) && 
       moment(dataTr.format("YYYY-MM-DD")).isSameOrBefore(fechamentoSas)){
      return true;
    } else {
      if(dataHojeDia > 20){
        const isDiaLimiteUtil = (dataHojeDia - diaFechamentoSas) <= 3 ? true : false;
        const isMesmoMes = dataHojeMes == dataTrMes ? true : false;
        const isMesAnterior = (dataHojeMes - dataTrMes) == 1 ? true : false;

        if(isDiaLimiteUtil){
          if(isMesmoMes){
            return true;
          }

          if(isMesAnterior && dataTrDia >= diaAberturaSas) {
            return true;
          }
        }
      }
    }

    return timesheet.verificarApontamento().then(apontamento => {
      if(apontamento) {
        return true;
      } 

      else{
        Swal.fire(
          'Ops... !',
          'Não é possivel cadastrar ou realizar modificações em datas com mês já fechado.',
          'warning'
        );
        return false;
      }
    }) 
  }

  this.verificaProjetoIsSas = function (codigo){ 
    const codigoProjetoSas = 44;
    if(parseInt(codigo) == codigoProjetoSas){
      return true;
    }
    return false;
  }

  this.verificarApontamento = function (){
    let params = {};
    var formData = new FormData();
    formData.append('params', main.alterarValorJson(JSON.stringify(params)));
    var options  = { method: 'POST',
                   mode: 'cors',
                   cache: 'default' ,
                   body: formData};
  
    return fetch('../service/verificarApontamento/index.php', options)
    .then(function(response) {
      return response.json()
    })
    .then((data) => {
      if(data.success){
        if(data.elements[0].apontamento === "S"){
          return true;
        }
        return false;
      } else{
        return false;
      }
    });
  }

  this.verificarRecessoRemunerado = function (){
    let params = {};
    params["Start_Date"] = main.dateInsert($("#Start_Date").val());
    var formData = new FormData();
    formData.append('params', main.alterarValorJson(JSON.stringify(params)));
    var options  = { method: 'POST',
                   mode: 'cors',
                   cache: 'default' ,
                   body: formData};
  
    return fetch('../service/verificarRecessoControleMensal/index.php', options)
    .then(function(response) {
      return response.json();
    })
    .then((data) => {
      if(data.success){
        Swal.fire(
          'Ops... !',
          'Você não pode fazer apontamentos nesse período: </br>'
           + main.dateTimeList(data.elements[0].dataInicio)
           + " - " 
           + main.dateTimeList(data.elements[0].dataFim)
           + '</br>Motivo: Recesso Remunerado',
          'warning'
        );
          return true;
      } else{
        return false;
      }
    });
  }

  this.verificaHorarioDuplicado = async function (){
    
    return timesheet.listarMarcacoes(main.dateInsert($("#Start_Date").val())).then(
      times => {
      const dataMarcacaoInicial = main.dateInsert($("#Start_Date").val());
      const dataMarcacaoFinal = main.dateInsert($("#End_Date").val());
      const tempoMarcacaoInicial = $("#Start_Time").val();
      const tempoMarcacaoFinal = $("#End_Time").val();
      const marcacaoInicial = new Date(dataMarcacaoInicial + ' ' + tempoMarcacaoInicial).getTime();
      const marcacaoFinal = new Date(dataMarcacaoFinal + ' ' + tempoMarcacaoFinal).getTime();
  
      let params = {};
      params['Start_Date'] = main.dateInsert($("#Start_Date").val());
     
      let salvoInicial = '';
      let salvoFinal = '';

      for(const element of times){
        salvoInicial = new Date(element.Start_Date + ' ' + element.Start_Time).getTime();
       
        salvoFinal = new Date(element.End_Date + ' ' + element.End_Time).getTime();
  
        if(marcacaoInicial == salvoInicial){
          return false;
        }
        

        if(marcacaoInicial < salvoInicial){
          if(marcacaoFinal > salvoInicial){
            return false;
          }
        }
    
        if(marcacaoInicial > salvoInicial){
          if(marcacaoInicial < salvoFinal){
            return false;
          }
        }
      }

      return true;
    }
    )
  }
   
   this.verificaHorarioDuplicadoAlteracao = async function (){
    
    return timesheet.listarMarcacoesAlteracao(main.dateInsert($("#Start_Date").val())).then(
      times => {
      const dataMarcacaoInicial = main.dateInsert($("#Start_Date").val());
      const dataMarcacaoFinal = main.dateInsert($("#End_Date").val());
      const tempoMarcacaoInicial = $("#Start_Time").val();
      const tempoMarcacaoFinal = $("#End_Time").val();
      const marcacaoInicial = new Date(dataMarcacaoInicial + ' ' + tempoMarcacaoInicial).getTime();
      const marcacaoFinal = new Date(dataMarcacaoFinal + ' ' + tempoMarcacaoFinal).getTime();
  
  
      let params = {};
      params['Start_Date'] = main.dateInsert($("#Start_Date").val());
     
      let salvoInicial = '';
      let salvoFinal = '';

      let contador = 0;

      for(const element of times){
        salvoInicial = new Date(element.Start_Date + ' ' + element.Start_Time).getTime();
        salvoFinal = new Date(element.End_Date + ' ' + element.End_Time).getTime();
  
        if(marcacaoInicial == salvoInicial){
          return false;
        }
    
        if(marcacaoInicial < salvoInicial){
          if(marcacaoFinal >= salvoInicial){
            return false;
          }
        }
    
        if(marcacaoInicial > salvoInicial){
          if(marcacaoInicial <= salvoFinal){
            return false;
          }
        }
      }

      return true;
    }
    )
  }

  /* 
    CRUD
  */

  this.excluir = function (codigo) {
    let params = {};
    params['codigo'] = codigo;
    return new Promise((resolve, reject) => {
        main.executarAPI(
        '',
        'DELETE',
        '',
        JSON.stringify(params),
        function (obj) {
            if (obj.success) {
                toastr.success('Marcação excluida com sucesso.', 'Sucesso!');

                main.executarAPI(
                    '',
                    'DELETE',
                    '',
                    JSON.stringify(params),
                    function (obj) {
                        if (obj.success) {
                          
                        }
                    } , "excluirTimesheetAdm"
                 );

                resolve();
            } else {
                toastr.error(
                    'Ocorreu um erro. Verifique sua conexão com a internet, e tente novamente mais tarde.',
                    'Ops... !'
                );
                reject();
                loading.close();
            }
        } , "excluirTimesheet"
      );
    })
  }

  this.alterar = async function (codigo) {
    if (main.validarCampos('#formDados')) {
        Swal.fire(
            'Ops... !',
            'Por favor preencha os campos necessários.',
            'warning'
        );
        loading.close();
    } else {
        loading.open();

        if(!timesheet.verificaCadastroFuturo()){
          loading.close();
          return;
        }

        if(!await timesheet.verificaCadastroPassado()){
          loading.close();
          return;
        }

        if(await timesheet.verificarRecessoRemunerado()){
          loading.close();
          return;
        }

        if(timesheet.verificaProjetoIsSas($("#Project").find(':selected').attr("data-Client_cod"))){
          if(!await timesheet.controleTimesheetDataSas()){
            loading.close();
            return;
          }
        } else {
          if(!await timesheet.controleTimesheetDataCadastro()){
            loading.close();
            return;
          }
        }

        if(!timesheet.verificarDatas()){
          loading.close();
          return;
        }

        if(!timesheet.verificarDataFinal()){
          loading.close();
          Swal.fire({
            title: "Ops... !",
            text: "Data final diferente da data inicial, deseja confirmar este apontamento?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "green ",
            confirmButtonText: "Confirmar",
            reverseBSwaluttons: true,
          }).then((result) => {
            if (result.value) {
              loading.open();
              timesheet.verificaHorarioDuplicadoAlteracao(codigo).then(boolean =>{
                if(boolean === true){
                  timesheet.alterarTimesheet();
                } else{
                  Swal.fire({
                    title: "Horário Conflitante!",
                    text: "Esta marcação entra em conflito com outra marcação realizada no mesmo dia. Deseja confirmar a alteração?",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonColor: "green ",
                    confirmButtonText: "Confirmar",
                    reverseBSwaluttons: true,
                  }).then((result) => {
                    if (result.value) {
                      timesheet.alterarTimesheet();
                    }
                  });
                  return;
                }
              })
            }
          });
        } else {
          timesheet.verificaHorarioDuplicadoAlteracao(codigo).then(boolean =>{
            if(boolean === true){
              timesheet.alterarTimesheet();
            } else{
              Swal.fire({
                title: "Horário Conflitante!",
                text: "Esta marcação entra em conflito com outra marcação realizada no mesmo dia. Deseja confirmar a alteração?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: "green ",
                confirmButtonText: "Confirmar",
                reverseBSwaluttons: true,
              }).then((result) => {
                if (result.value) {
                  timesheet.alterarTimesheet();
                }
              });
              return;
            }
          })
        }   
    }
  };

  this.cadastrar = async function () {

    if (main.validarCampos('#formDados')) {
        Swal.fire(
            'Ops... !',
            'Por favor preencha os campos necessários.',
            'warning'
        );
        loading.close();
    } else {
        loading.open();

        if(!await timesheet.verificaCadastroFuturo()){
          loading.close();
          return;
        }

        if(!await timesheet.verificaCadastroPassado()){
          loading.close();
          return;
        }
        

        if(await timesheet.verificarRecessoRemunerado()){
          loading.close();
          return;
        }

        if(timesheet.verificaProjetoIsSas($("#Project").find(':selected').attr("data-Client_cod"))){
          if(!await timesheet.controleTimesheetDataSas()){
            loading.close();
            return;
          }
        } else {
          if(!await timesheet.controleTimesheetDataCadastro()){
            loading.close();
            return;
          }
        }

        if(!timesheet.verificarDatas()){
          loading.close();
          return 0;
        }
   
        if(await timesheet.verificarFeriados()){
          Swal.fire({
            title: "Ops... !",
            text: "O dia escolhido para o lançamento é possivelmente um feriado, tem certeza que deseja lançar horas para esse dia?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "green ",
            confirmButtonText: "Sim",
            reverseBSwaluttons: true,
          }).then((result) => {
            loading.close();
            if (result.value) {
              if(!timesheet.verificarDataFinal()){
                  Swal.fire({
                    title: "Ops... !",
                    text: "Data final diferente da data inicial, deseja confirmar este apontamento?",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonColor: "green ",
                    confirmButtonText: "Confirmar",
                    reverseBSwaluttons: true,
                  }).then((result) => {
                    if (result.value) {
                      loading.open();
                      timesheet.verificaHorarioDuplicado().then(boolean =>{
                        if(boolean === true){
                          timesheet.cadastrarTimesheet();
                        } else{
                          Swal.fire({
                            title: "Horário Conflitante!",
                            text: "Esta marcação entra em conflito com outra marcação realizada no mesmo dia. Deseja confirmar o cadastro?",
                            icon: "warning",
                            showCancelButton: true,
                            cancelButtonText: "Cancelar",
                            confirmButtonColor: "green ",
                            confirmButtonText: "Confirmar",
                            reverseBSwaluttons: true,
                          }).then((result) => {
                            if (result.value) {
                              timesheet.cadastrarTimesheet();
                            }
                          });
                          return;
                        }
                      })
                    }
                  });
              } else {
                timesheet.verificaHorarioDuplicado().then(boolean =>{
                  if(boolean === true){
                    timesheet.cadastrarTimesheet();
                  } else{
                    Swal.fire({
                      title: "Horário Conflitante!",
                      text: "Esta marcação entra em conflito com outra marcação realizada no mesmo dia. Deseja confirmar o cadastro?",
                      icon: "warning",
                      showCancelButton: true,
                      cancelButtonText: "Cancelar",
                      confirmButtonColor: "green ",
                      confirmButtonText: "Confirmar",
                      reverseBSwaluttons: true,
                    }).then((result) => {
                      if (result.value) {
                        timesheet.cadastrarTimesheet();
                      }
                    });
                    return;
                  }
                })
              }
            }
          })
          loading.close();
        }else{
          if(!timesheet.verificarDataFinal()){
            loading.close();
            Swal.fire({
              title: "Ops... !",
              text: "Data final diferente da data inicial, deseja confirmar este apontamento?",
              icon: "warning",
              showCancelButton: true,
              cancelButtonText: "Cancelar",
              confirmButtonColor: "green ",
              confirmButtonText: "Confirmar",
              reverseBSwaluttons: true,
            }).then((result) => {
              if (result.value) {
                loading.open();
                timesheet.verificaHorarioDuplicado().then(boolean =>{
                  if(boolean === true){
                    timesheet.cadastrarTimesheet();
                  } else{
                    Swal.fire({
                      title: "Horário Conflitante!",
                      text: "Esta marcação entra em conflito com outra marcação realizada no mesmo dia. Deseja confirmar o cadastro?",
                      icon: "warning",
                      showCancelButton: true,
                      cancelButtonText: "Cancelar",
                      confirmButtonColor: "green ",
                      confirmButtonText: "Confirmar",
                      reverseBSwaluttons: true,
                    }).then((result) => {
                      if (result.value) {
                        timesheet.cadastrarTimesheet();
                      }
                    });
                    return;
                  }
                })
              }
            });
          } else {
            timesheet.verificaHorarioDuplicado().then(boolean =>{
              if(boolean === true){
                timesheet.cadastrarTimesheet();
              } else{
                Swal.fire({
                  title: "Horário Conflitante!",
                  text: "Esta marcação entra em conflito com outra marcação realizada no mesmo dia. Deseja confirmar o cadastro?",
                  icon: "warning",
                  showCancelButton: true,
                  cancelButtonText: "Cancelar",
                  confirmButtonColor: "green ",
                  confirmButtonText: "Confirmar",
                  reverseBSwaluttons: true,
                }).then((result) => {
                  if (result.value) {
                    timesheet.cadastrarTimesheet();
                  }
                });
                return;
              }
            })
          }
        }
    }
  }

  this.cadastrarTimesheet = function(){
    loading.open();
    var params = main.pegarDados($('#formDados'));
    params['Projeto_codigo'] = $("#Project").find(':selected').attr("data-Projeto");
    params['Cliente_codigo'] = $("#Project").find(':selected').attr("data-Client_cod");
    params['Billable'] = $("#Project").find(':selected').attr("data-Billable");
    params['Start_Date'] = main.dateInsert(params['Start_Date']);
    params['Tags'] = $("#Tags").val().join(', ');
    params['End_Date'] = main.dateInsert(params['End_Date']);
    params['Duration_h'] = $("#Duration_h").val();
    params['Duration_d'] = timesheet.timeToDecimal($("#Duration_h").val());
    main.executarAPI(
      '',
      'INSERT',
      '',
      JSON.stringify(params),
      function (obj) {
          if (obj.success) {
              paginaAtual = 0;
              $('#modalCadastro').modal('hide');
              loading.close();
              toastr.success('Dados cadastrados com sucesso.', 'Sucesso!');
              timesheet.listar();
              params['Portal_codigo'] = obj.elements[0].codigo;
              
              main.executarAPI(
                '',
                'INSERT',
                '',
                JSON.stringify(params),
                function (obj) {
                    if (obj.success) {
                
                    } else {
                        toastr.error(
                            obj.message,
                            'Ops... !'
                        );
                    }
                } , "cadastrarTimesheetAdm"
              );

          } else {
              toastr.error(
                  obj.message,
                  'Ops... !'
              );
              loading.close();
          }
      } , "cadastrarTimesheet"
    );
  }

  this.alterarTimesheet = function(){
    loading.open();
    var params = main.pegarDados($('#formDados'));
    params['codigo'] = parseInt($("#codigo").val());
    params['Projeto_codigo'] = $("#Project").find(':selected').attr("data-Projeto");
    params['Cliente_codigo'] = $("#Project").find(':selected').attr("data-Client_cod");
    params['Billable'] = $("#Project").find(':selected').attr("data-Billable");
    params['Tags'] = $("#Tags").val().join(', ');
    params['End_Date'] = main.dateInsert(params['End_Date']);
    params['Start_Date'] = main.dateInsert(params['Start_Date']);
    params['Duration_h'] = $("#Duration_h").val();
    params['Duration_d'] = timesheet.timeToDecimal($("#Duration_h").val());

    main.executarAPI(
      '',
      'UPDATE',
      '',
      JSON.stringify(params),
      function (obj) {
          if (obj.success) {
              $('#modalCadastro').modal('hide');
              toastr.success('Dados alterados com sucesso.', 'Sucesso!');
              timesheet.listar();
              loading.close();
              main.executarAPI(
                '',
                'UPDATE',
                '',
                JSON.stringify(params),
                function (obj) {
                    if (obj.success) {
                    } else {
                    }
                } , "alterarTimesheetAdm"
            );
          } else {
              toastr.error(
                  'Ocorreu um erro. Verifique sua conexão com a internet, e tente novamente mais tarde.',
                  'Ops... !'
              );
              loading.close();
          }
      } , "alterarTimesheet"
  );
  }

  /* 
    LISTAGEM
  */

  this.listarMarcacoes= function(start_date){
    return new Promise((resolve, reject) => {
      params = {};
      params['Start_Date'] = start_date;
      main.executarAPI(
      '',
      'SELECT',
      '',
      JSON.stringify(params),
      function (obj) {
          if (obj.success) {
              loading.close();
              resolve(obj.elements);
          } else {
            loading.close();
            resolve([]);
          }
      } , "listarMarcacoes"
    );
  })
  }
  
  this.listarMarcacoesAlteracao= function(start_date){

    return new Promise((resolve, reject) => {
      params = {};
      params['Start_Date'] = start_date;
      params['codigo'] = parseInt($("#codigo").val());
      main.executarAPI(
      '',
      'SELECT',
      '',
      JSON.stringify(params),
      function (obj) {
          if (obj.success) {
              loading.close();
              resolve(obj.elements);
          } else {
            loading.close();
            resolve([]);
          }
      } , "listarMarcacoesAlteracao"
    );
  })
  }

  this.listarDados = function (codigo) {
    loading.open();
    var params = {};
    params['codigo'] = codigo;

    main.executarAPI('', 'SELECT', '', JSON.stringify(params), function (obj) {
        if (obj.success) {
          let projetosChange = '';
          let billableChange = '';
            for (var [key, value] of Object.entries(obj.elements[0])) {
                if (key != 'End_Date' && key != 'Start_Date') {
                  json = main.convertToJson(value);

                  if(key == "Duration_h"){
                    $("#Duration_h").val(value.slice(0, 5));
                  }

                  if(key=="Tags"){
                    $("#Tags").val(main.convertToJson(value.split(', ')))
                    $("#Tags").trigger("change");
                  }
                  
                  else if(key=="Project"){
                     projetosChange = value;
                  } 

                  else if(key=="responsavel_tecnico"){
                    $("#responsavel_tecnico").val(value).change();
                  }
                  
                  else if(key=="Billable"){
                    billableChange = value;
                  }

                  else if(key == 'Start_Time' || key == "End_Time"){
                    $('#formDados [name="' + key + '"]').val(value.slice(0, 5))
                  }
                  else{
                      $('#formDados [name="' + key + '"]').val(value).trigger('change');
                  }
                } else {
                    $('#formDados [name="' + key + '"]')
                    .val(main.dateTimeList(value));
                }
            }
            timesheet.listarProjetos().then(
              (resolve) =>{
                $("#Project").val(projetosChange).change();
                $("#Billable").val(billableChange).change();
                loading.close();
              }
            )
        } else {
            toastr.error(
                'Ocorreu um erro. Verifique sua conexão com a internet, e tente novamente mais tarde.',
                'Ops... !'
            );
            loading.close();
        }
    }, "listarTimesheetById"
    );
  };

  this.projetosJson= function(id){
    return fetch("../files/projetos/projetos.json")
    .then(response => {
      return response.json();
    })
    .then(jsondata => jsondata
      );
  }

  this.listarProjetos = async function () {
    const projetosJson = await timesheet.projetosJson();
    const opReuniao = 
    '<option value="' + projetosJson[0].nome + 
    '" data-Projeto="' +  projetosJson[0].codigo + 
    '" data-Billable="' + projetosJson[0].faturavel + 
    '" data-Client="' + projetosJson[0].nomeCliente + '" data-Client_cod="' + projetosJson[0].Cliente_codigo+ '">' +  projetosJson[0].nome + '</option>';

    const opDesalocado = 
    '<option value="' + projetosJson[1].nome + 
    '" data-Projeto="' +  projetosJson[1].codigo + 
    '" data-Billable="' + projetosJson[1].faturavel + 
    '" data-Client="' + projetosJson[1].nomeCliente + '" data-Client_cod="' + projetosJson[1].Cliente_codigo+ '">' +  projetosJson[1].nome + '</option>';

    loading.open();
    var params = {};
    params["Start_Date"] = main.dateInsert($("#Start_Date").val());
    return new Promise((resolve)=>{main.executarAPI('', 'SELECT', '', JSON.stringify(params), function (obj) {

        if (obj.success) {
            let Billable = "No"; 
            let html = '<option hidden value="">Selecione</option>';
            html += opReuniao;
            for (i in obj.elements) {
              if(obj.elements[i].faturavel == null || obj.elements[i].faturavel == 'S'){
                Billable = "Yes";
              }
              if(obj.elements[i].faturavel == "N"){
                Billable = "No";
              }
                html +=
                    '<option value="' + obj.elements[i].projeto + '" data-Projeto="' + obj.elements[i].Projeto_codigo + '" data-Billable="' + Billable +  '" data-Client="' + obj.elements[i].cliente + '" + data-Client_cod="' + obj.elements[i].Cliente_codigo+ '">' +  obj.elements[i].projeto + '</option>';
            }
            $('#Project').html(html);
            $('#Client').val("");
            $("#Billable").val("");
            loading.close();
            resolve();
        } else {
            let html2 = '<option hidden value="">Selecione</option>';
            html2 += opReuniao;
            html2 += opDesalocado;
            $('#Project').html(html2);
            $('#Client').val("");
            $("#Billable").val("");
            loading.close();
            resolve();
        }
    }, "listarProjetos"
    );
   })
  };

  this.listarTags = function () {
    loading.open();
    var params = {};
    main.executarAPI('', 'SELECT', '', JSON.stringify(params), function (obj) {
        if (obj.success) {
            html = '';
            for (i in obj.elements) {
                html +=
                    '<option value="' + obj.elements[i].tag + '" >' +  obj.elements[i].tag + '</option>';
            }
            $('#Tags').html(html);
        } else {
            toastr.error(
                'Ocorreu um erro. Verifique sua conexão com a internet, e tente novamente mais tarde.',
                'Ops... !'
            );
            loading.close();
        }
    }, "listarTags"
    );
  };

  this.listarTimesheet = function(params){
    var formData = new FormData();
    formData.append('params', main.alterarValorJson(params));
    var options  = { method: 'POST',
                   mode: 'cors',
                   cache: 'default' ,
                   body: formData};
  
    return fetch('../service/listarTimesheet/index.php', options)
    .then(function(response) {
      return response.json()
    });
  }
  
  this.listar = function () {
  
    loading.open();
    let params = main.getFormData($("#formFiltro"));
    
      if ($('input[name="inicio"]').val() != '' && $('input[name="inicio"]').val() != undefined) {
        let [inicio, fim] = $('input[name="inicio"]').val().split(" - ");
        params['inicio'] = main.dateInsert(inicio);
        params['fim'] = main.dateInsert(fim);
      } 
  
    timesheet.listarTimesheet(JSON.stringify(params)).then((response) => { 
      const parseDataToString = function (data) {
        let  options = {
          month: 'short', day: 'numeric', weekday: 'short',
          timeZone: 'UTC'
        }
  
        let datas = new Intl.DateTimeFormat('pt-BR', options).format(new Date(data))
        datas = datas[0].toUpperCase() + datas.substr(1).replace("." , "");
        return datas;
      }
      var $table = $("#mainTable");
      $table.bootstrapTable("destroy");

      if(response.success){
        $table.bootstrapTable({
          data: response.elements,
          paginationParts: 'pageList',
          sortable: true,
        /*  sorter: "Start_Date",
          groupByField: "Start_Date",
          groupByFormatter: (value) =>  parseDataToString(value), */
          undefinedText: '',
          theadClasses: "text-center",
          columns: [
    
            {
              field: "",
              title: "",
              width: "2",
              radio: true, 
              widthUnit: "%",
              class: "text-center td-align-left text-nowrap",
            },
            {
              field: "Description",
              title: "Descrição",
              width: "10",
              widthUnit: "%",
              class: "text-center td-align-left text-nowrap resp_tec",
              formatter: function (value) {
                return '<span class="tooltip-content">' + value + "</span>";
              },
            },
            {
              field: 'Project',
              title: 'Projeto',
              width: '10',
              widthUnit: '%',
              class: 'text-center proj_',
            },
            {
              field: 'Client',
              title: 'Cliente',
              width: '10',
              widthUnit: '%',
              class: 'text-center clie_',
            },
            {
              field: 'Start_Date',
              title: 'Marcação Inicial',
              width: '8',
              widthUnit: '%',
              class: 'text-center',
              formatter: function (value, row, index) {
                  return moment(value).format("DD/MM") + " - " + row.Start_Time.slice(0, 5);
              },
          },
          {
            field: 'End_Date',
            title: 'Marcação Final',
            width: '8',
            widthUnit: '%',
            class: 'text-center',
            formatter: function (value, row, index) {
                return moment(value).format("DD/MM") + " - " + row.End_Time.slice(0, 5);

            },
        },
          {
            field: 'Start_Time',
            title: 'Horário',
            width: '8',
            widthUnit: '%',
            class: 'text-center d-none',
          },
          {
            field: 'End_Time',

            title: 'Hora Final',
            width: '8',
            widthUnit: '%',
            class: 'text-center d-none',
          },
          {
              field: 'Duration_h',
              title: 'Duração',
              width: '8',
              widthUnit: '%',
              class: 'text-center',
              formatter: function (value, row, index) {
                  return main.dateTimeList(value);
              },
          },
          {
              field: 'codigo',
              title: '',
              width: '3',
              widthUnit: '%',
              class: 'text-center',
              formatter: function (value, row) {
                  var retorno = '';
                  retorno += '<div class="d-flex justify-content-center mx-1">';
                  retorno +=
                      '    <a href="#" class="visualizar mr-2" " data-value="' +
                      value +
                      '" title=""><i class="fa fa-eye" aria-hidden="true"></i></a>';
                  return retorno;
              },
          },
          ],
        });
        
        $(".table td").each(function () {
          if ($(this).find(".tooltip-content")) {
            $(this).attr("data-container", "body");
            $(this).attr("data-toggle", "tooltip");
            $(this).attr("data-placement", "bottom");
            $(this).attr(
              "data-original-title",
              $(this).find(".tooltip-content").text()
            );
          }
        });
        $('[data-toggle="tooltip"]').tooltip();
        loading.close();
      } else {
        $table.bootstrapTable('destroy');
        $table.bootstrapTable();
        loading.close();
      }
  })
  
  
  }

  /* 
    OPÇÕES TABELA
  */

  let $table = $("#mainTable");
  let $remove = $("#deleteTimesheet");
  let $update =  $("#updateTimesheet");
  let $double = $("#duplicaTimesheet");

  this.getIdSelections= function() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
      return row.codigo
    })
  }

  this.getDataSelections= function() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
      return row.Start_Date
    })
  }

  this.getClientSelections = function(){
    return $.map($table.bootstrapTable('getSelections'), function (row) {
      return row.Cliente_codigo
    })
  }

  $remove.click(async function () {

    timesheet.verificaSessao();
    let codigos = parseInt(timesheet.getIdSelections()[0])
    if(!codigos){
      Swal.fire(
        'Ops... !',
        'Selecione uma marcação antes de realizar uma ação.',
        'warning'
      );
      return false
    }

    if(!await timesheet.verificaAlteracaoPassado()){
      loading.close();
      return;
    }
    
    if(timesheet.verificaProjetoIsSas(timesheet.getClientSelections()[0])){
      if(!await timesheet.controleTimesheetDataSasExcluir()){
        loading.close();
        return;
      }
    } else {
      if(!await timesheet.controleTimesheetData()){
        loading.close();
        return;
      }
    }

    Swal.fire({
      title: "Excluir!",
      text: "Certeza que deseja excluir esta marcação?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc3545 ",
      confirmButtonText: "Excluir",
      reverseBSwaluttons: true,
    }).then((result) => {
      if (result.value) {
        timesheet.excluir(codigos).then(() =>{
          $table.bootstrapTable('remove', {
            field: 'codigo',
            values: timesheet.getIdSelections()
          }); 
      })
      }
    });

  })

  $update.click(async function () {
    timesheet.verificaSessao();
    let codigos = parseInt(timesheet.getIdSelections()[0])
    if(!codigos){
      Swal.fire(
        'Ops... !',
        'Selecione uma marcação antes de realizar uma ação.',
        'warning'
    );
    return false;
    }

    if(! await timesheet.verificaAlteracaoPassado()){
      loading.close();
      return;
    }

    if(timesheet.verificaProjetoIsSas(timesheet.getClientSelections()[0])){
      if(!await timesheet.controleTimesheetDataSasExcluir()){
        loading.close();
        return;
      }
    } else {
      if(!await timesheet.controleTimesheetData()){
        loading.close();
        return;
      }
    }
      $(".form-control").attr('disabled', false);
      $(".obrigatorio").removeClass('is-invalid');
      main.mudarVisualizacao('alterar');
      $("#Billable").attr('disabled', true);
      $('#modalCadastro').modal('show');
      $("#Project").attr('disabled', false);
      timesheet.listarDados(codigos);
      $("#codigo").val(codigos);
  })

  $double.click(function () {
    let codigos = parseInt(timesheet.getIdSelections()[0])
    if(!codigos){
      Swal.fire(
        'Ops... !',
        'Selecione uma marcação antes de realizar uma ação.',
        'warning'
    );
    return false;
    }
    $(".form-control").attr('disabled', false);
    $(".obrigatorio").removeClass('is-invalid');
    main.mudarVisualizacao('salvar');
    $('#modalCadastro').modal('show');
    $("#Project").attr('disabled', false);
    $("#Billable").attr('disabled', true);
    timesheet.listarDados(codigos);
    $("#codigo").val(codigos);
  })

  $table.on('check.bs.table uncheck.bs.table ' +
      'check-all.bs.table uncheck-all.bs.table',
    function () {
        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)
        $update.prop('disabled', !$table.bootstrapTable('getSelections').length)
        $double.prop('disabled', !$table.bootstrapTable('getSelections').length)
  });
 
}

let timesheet = new Timesheet();
timesheet.init();