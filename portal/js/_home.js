function Home() {

  this.init = function () {
    moment.locale('pt');
    home.arrayDateWeek();

      $("#atualizarDados").click(function () {
        window.location.href = "../modulos/dadosCadastrais/public/index.php"
     });

  }

  this.listarTimesheetSemana = function () {
    var formData = new FormData();
    let params = {};
    params['inicio'] = moment().startOf('isoWeek').format("YYYY-MM-DD");
    params['fim'] = moment().endOf('isoWeek').subtract(2, 'days').format("YYYY-MM-DD");
    params = JSON.stringify(params);
    formData.append('params', main.alterarValorJson(params));
    var options = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      body: formData
    };
    loading.open();
    return fetch('../modulos/timesheet/service/listarTimesheetWeek/index.php', options)
      .then(function (response) {
        loading.close();
        return response.json()
      });
  }

  this.arrayDateWeek = function () {
    home.listarTimesheetSemana().then((response) => {
      home.validarCamposObrigatorios();

  
      let current = moment().startOf('isoWeek');
      let end = moment().endOf('isoWeek').subtract(2, 'days');

      $(".info-datas").html(current.format("DD/MM/YYYY") + " - " + end.format("DD/MM/YYYY"))
      let dates_range = [];

      dates_range = home.arrayDateRange(current, end);

      $(".day").each(function (index) {
        $(this).html(moment(dates_range[index], "YYYY-MM-DD").format('ddd - DD/MM'));
      });

      let dados = home.gerarDados(response, dates_range);
      let por;
      let porcentagem;
      $(".progress-bar").each(function (index) {
        if (dados[index]) {
          por = (main.parseHoras(dados[index].slice(0, 5)) / 480);
          porcentagem = por >= 1 ? 100 : por * 100;
        } else {
          porcentagem = 0;
        }

        if (dados[index]) {
          $(this).parent().find(".without-progress").addClass("d-none");
          $(this).css("width", porcentagem + "%");
          $(this).html(dados[index] ? dados[index].slice(0, 5) : 0);
        }

      });


    });
  }

  this.arrayDateRange = function (start_date, end_date) {
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

  this.gerarDados = function (response, range_datas) {
    let datas_res = [];
    let datas = [];
    let countIf = 0;
    let countElse = 0;
    if (response.success) {
      for (let i = 0; i < range_datas.length; i++) {
        countIf = 0;
        countElse = 0;
        for (let res of response.elements) {
          if (range_datas[i] == res.dataInicial) {
            if (countElse) {
              datas.pop();
              countElse = false;
            }
            datas.push(res.duracao_horas)
            break;
          } else {
            countElse++;
            if (countElse > 1) {
              continue;
            } else {
              datas.push(0);
            }
          }
        }
      }
    }
    return datas;
  }

  this.validarCamposObrigatorios = function () {
    loading.open();
    var params = {};
    main.executarAPI("", "SELECT", "", JSON.stringify(params), function (obj) {
      if (obj.success) {
        if (obj.pendencias) {
          $("#modalCamposObrigatorios").modal("show")
          loading.close();
        }
        else {
          loading.close();
        }
      }
      else {
        toastr.error(
          'Ocorreu um erro. Verifique sua conexão com a internet, e tente novamente mais tarde.',
          'Ops... !'
        );
        loading.close();
      }
    },
      '../modulos/controleAcesso/service/verificarDadosObrigatorios/index.php'
    );
  };
 }

let home = new Home();
home.init();
