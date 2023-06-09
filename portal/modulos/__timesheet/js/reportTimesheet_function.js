function ReportTimesheet(){
  this.isClientSas = false;
  this.init = async function() {
    $("#filtroInicio").val(moment().startOf('month').format('YYYY-MM-DD') + " - " + moment().endOf('month').format('YYYY-MM-DD'))
    $("#linkRelatorio").addClass("border-bottom-link");
    $("#horasProjeto").css("color", "#8080804a");

    
    await reportTimesheet.verificarProjetoSas();
    
    Promise.allSettled([reportTimesheet.listar(), reportTimesheet.listarAtividades()]).then(resolve => loading.close());
  }

  $("#horasProjeto").click(function () {
    window.location.href = "timesheet.frag.php";
  });


  /* 
      FILTRO
  */

  $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
    $("#filtroInicio").val(picker.startDate.format('YYYY-MM-DD') + " - " + picker.endDate.format('YYYY-MM-DD'))
    Promise.allSettled([reportTimesheet.listar(), reportTimesheet.listarAtividades()]).then(resolve => loading.close());
  })


  /* 
      CHART
  */

  
  this.reportRange = function(){
    moment.locale("pt");
    let starts = moment().startOf('month');
    let ends = moment().endOf('month');

    $('#reportrange').daterangepicker({
      startDate: starts,
      minDate: moment().subtract(1, 'month').startOf('month'),
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
      ]
    }
    }, reportTimesheet.showReportRangeText);
    reportTimesheet.showReportRangeText(starts, ends);
  }

  this.reportRangeSas = function(){
    moment.locale("pt");
    let starts = moment().startOf('month');
    let ends = moment().endOf('month');

    $('#reportrange').daterangepicker({
      startDate: starts,
      minDate: moment().subtract(2, 'month').startOf('month'),
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
      ]
    }
    }, reportTimesheet.showReportRangeText);
    reportTimesheet.showReportRangeText(starts, ends);
  }

  this.arrayDateRange = function (start_date, end_date){
    let startDate = start_date;
    let endDate = end_date;
    
    let current = new moment(startDate, "YYYY-MM-DD");
    let end = new moment(endDate, "YYYY-MM-DD");
    
    let dates = [];
    
    dates = [];
    while (current <= end) {
      dates.push(current.format('YYYY-MM-DD'));
      current.add(1, 'days');
    }
    return dates;
  }

  this.showReportRangeText = function report(start, end) {
    $('#reportrange span').html(start.format('MMM D') + ' - ' + end.format('MMM D'));
  }

  this.listagem = function(params, caminho){
    var formData = new FormData();
    formData.append('params', main.alterarValorJson(params));
    var options  = { method: 'POST',
                    mode: 'cors',
                    cache: 'default' ,
                    body: formData};
                    loading.open();
    return fetch('../service/' + caminho, options)
    .then(function(response) {
      return response.json()
    });
  }

  this.listar = async function () {
    let params = main.getFormData($("#formFiltro"));
    let range_datas = [];
    if ($('input[name="inicio"]').val() != '' && $('input[name="inicio"]').val() != undefined) {
      let [inicio, fim] = $('input[name="inicio"]').val().split(" - ");
      params['inicio'] = main.dateInsert(inicio);
      params['fim'] = main.dateInsert(fim);
      range_datas = reportTimesheet.arrayDateRange(params['inicio'], params['fim']);
    }
    loading.open();
    await reportTimesheet.listagem(JSON.stringify(params), 'listarTimesheetReport/index.php').then((response) => {
      let lable = [];
      let datas_res = [];
      let total_horas = 0;
      let datas = [];
      let datas_Projetos = [];

      if(response.elements){
        moment.locale('pt');
        for(i in response.elements){
          total_horas += main.parseHoras(response.elements[i].Duration_h);
          datas_res.push({Start_Date: response.elements[i].Start_Date, 
                          duracao_minutos: main.parseHoras(response.elements[i].Duration_h)/60, 
                          Project: response.elements[i].Project,
                          Client: response.elements[i].Client})
        }

        let Projetos = logicaReport.getProjetos(datas_res);
        let ajuda = 0;
        let countIf = 0;
        let countElse = false;
        for(let i = 0; i < range_datas.length; i++){
          datas[ajuda] = new Array;
          lable.push( moment(range_datas[i], "YYYY-MM-DD").format('ddd, MMM DD'));
          countIf = 0;
          countElse = false;
          
          for (let x = 0; x < response.elements.length; x++){
            if(datas_res[x].Start_Date === range_datas[i]){
              if(countElse&&countIf>1){
                ajuda+=1;
                datas[ajuda] = new Array;
                countElse = false;
              } if(countElse){
                datas[ajuda] = new Array;
                countElse = false;
              }
              countIf++;
              datas[ajuda].push({duracao_minutos:  datas_res[x].duracao_minutos, Project: datas_res[x].Project})
              continue;
            } else {
              countElse = true;
              if(countIf){
                continue;
              }
              datas[ajuda] = {duracao_minutos: 0, Project: 0, dia_semana: range_datas[i]}
            }
          }

          ajuda++
        } 
      
        datas =  logicaReport.gerarDataset(datas, Projetos);

        let [horas, minutos] = main.parseMinutosToHoras(total_horas);
        $("#horasTotais").html(horas + " : " + ("00" + minutos).slice(-2) + ' (H:MM)');

      } else{
          let aux = [];
          $("#horasTotais").html("00:00");
          $("#parteSuperiorProjeto").html("-");
          $("#principalCliente").html("-");
          moment.locale('pt');
          for(let i = 0; i < range_datas.length; i++){
            aux.push(0);
            lable.push( moment(range_datas[i], "YYYY-MM-DD").format('ddd, MMM DD'));
          }

          datas[0] = [{
            data: aux
          }];
      }

      $chart = $('#chartTimesheet');
        
      if(window.myChart!= null)
      {
        window.myChart.destroy();
      }
    
      window.myChart = new Chart($chart, {
          type: 'bar',
          label: false,
          data: {
            labels: lable,
            datasets: datas
          },

          options: {
            responsive: true,
            maintainAspectRatio: false,
            
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                usePointStyle: true,
                callbacks: {
                  label: function (context) {
                    let label = context.dataset.label || '';
                    return "  " + label + "          " + context.formattedValue;
                  },

                  labelPointStyle: function(context) {
                    return {
                        pointStyle: 'circle',
                        rotation: 0
                    };
                }
                }
            }
            },
            scales: {
              y: {
                stacked: true,
                ticks: {
                  callback: function(value, index, ticks) {
                      return value + '.0h';
                  }
                }
              }, 
              x: {
                stacked: true,
                ticks: {
                  maxTicksLimit: 10,
                }
              }
            }
          }
          
      }); 


    }
      
      )
  }

  this.listarAtividades = async function (){
    let params = main.getFormData($("#formFiltro"));
    let range_datas = [];
    if ($('input[name="inicio"]').val() != '' && $('input[name="inicio"]').val() != undefined) {
      let [inicio, fim] = $('input[name="inicio"]').val().split(" - ");
      params['inicio'] = main.dateInsert(inicio);
      params['fim'] = main.dateInsert(fim);
    }

    await reportTimesheet.listagem(JSON.stringify(params), 'listarAtividades/index.php').then((response) =>{
      let html = "";
      $('.atividades-container-chart').remove();
      if(response.elements){
        for(atividade of response.elements){
          html += '<div class="atividades-container-chart ml-5">'
          html +=     '<div class="content-body">'
          html +=        '<h3>' + atividade.Client + '</h3>'
          html +=        '<div class="info-horas">'
          html +=          '<span class="descricao-horas">'+ atividade.Project + '</span>'
          html +=          '<span class="descricao-horas">'+ atividade.Duration_h +  '</span>'
          html +=        '</div>'
          html +=        '<hr>'
          html +=     '</div>'
          html += '</div>'
        }
        $("#atividade-container").append(html);
        $("#parteSuperiorProjeto").html(response.elements[0].Project);
        $("#principalCliente").html(response.elements[0].Client);

        
      } else{
        $("#atividade-container").append(html);
        html += '<div class="atividades-container-chart ml-5">'
        html +=     '<div class="content-body">'
        html +=        '<h3> Sem Marçaões </h3>'
        html +=        '<div class="info-horas">'
        html +=          '<span class="descricao-horas"> - </span>'
        html +=          '<span class="descricao-horas"> 00:00 </span>'
        html +=        '</div>'
        html +=        '<hr>'
        html +=     '</div>'
        html += '</div>'
        $("#atividade-container").append(html);
      }
    });
  }

  this.verificarProjetoSas = function (){
    loading.open();
    let params = {};
    params["Start_Date"] = moment().format("YYYY-MM-DD");
    var formData = new FormData();
    formData.append('params', main.alterarValorJson(JSON.stringify(params)));
    var options  = { method: 'POST',
                   mode: 'cors',
                   cache: 'default' ,
                   body: formData};
  
    return fetch('../service/listarProjetos/index.php', options)
    .then(function(response) {
      return response.json()
    })
    .then((data) => {
      if(data.success){
        for(i of data.elements){
          if(i.Cliente_codigo == 44){
            reportTimesheet.isClientSas = true; 
          }
        }

        if(this.isClientSas){
          reportTimesheet.reportRangeSas();
        } else {
          reportTimesheet.reportRange();
        }
      }
      else{
        reportTimesheet.reportRange();
      }
    });
  }

}

let reportTimesheet = new ReportTimesheet()
reportTimesheet.init();