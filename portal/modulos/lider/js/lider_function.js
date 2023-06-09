function Lider(){
    this.Projeto_codigos = [] ;
    this.Pessoa_codigo = 0;
    this.colaboradores = "";
    this.init = function(){
        lider.verificarLider().then(() => {
            lider.reportRange();
            lider.listarColaboradoresLiderados();
        }, ()=>
        {
            $(".filtro").remove();
            loading.close();

            Swal.fire({
                title: "Ops... !",
                text: "Você não tem permissão para acessar este modulo.",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: "OK"
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
               if(result.dismiss || result.value){
                    top.window.location.href = "../../../modulos"
                }

              })
        }
        )


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

                        if($(this).attr('type') == 'checkbox'){
                            campo = $(this).parents('.form-group').find('.label-titulo').text();
                            nome = $(this).next('label').text();
                        }else{
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
            paginaAtual = 0;
             lider.listarColaboradoresLiderados();
            $('#modalFiltro').modal('hide');
        });
        $('#limparFiltro').click(function () {
            $('#formFiltro')[0].reset();
            $('#formFiltro select').val('');
        });

        $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
            $("#filtroInicio").val(picker.startDate.format('YYYY-MM-DD') + " - " + picker.endDate.format('YYYY-MM-DD'))
            if($( this ).hasClass( "colaboradoresLiderados" )){
                lider.listarColaboradoresLiderados();
            }

            else if($( this ).hasClass( "colaboradorTimesheet")){
                lider.listarColaboradoresTimesheet(lider.Pessoa_codigo);
            }

            else if($( this ).hasClass( "colaboradorRelatorio")){
                Promise.allSettled([reportTimesheet.listar(0), reportTimesheet.listarAtividades(0)]).then(resolve => loading.close());
            }
        })

        $("#voltar").click(function(){
            $("#reportrange").addClass("colaboradoresLiderados");
            $("#reportrange").removeClass("colaboradorTimesheet");
            $("#reportrange").removeClass("colaboradorRelatorio");
            $(".text-header").html("<span class='font-cairo-bold'>Colaboradores</span>");
            lider.listarColaboradoresLiderados();
            $chart = $('#chartTimesheet');
        
            if(window.myChart!= null)
            {
                $("#main-body-report").addClass("d-none");
                window.myChart.destroy();
            }
        })

        $(document).on('click', '.excluir-filtros', function () {
            $('#formFiltro')[0].reset();
            $('#activeFilters').html('');
            paginaAtual = 0;
             lider.listarColaboradoresLiderados();
        });

        $(document).on('click', '.excluir-filtro', function () {
            var codigo = $(this).data('value');
            $('#formFiltro .form-control[name="' + codigo + '"]').val('');
            $(this).parent().remove();
            if ($('#activeFilters div').length == 0) $('#activeFilters').html('');
            paginaAtual = 0;
            //lider.listarColaboradoresTimesheet();
        });

        $(document).on("click",".btnRelatorio",function(){
            lider.gerarRelatorio($(this).data("pessoa"));
        })

        $(document).on("click",".btnTimesheetColaborador",function(){
            $("#reportrange").removeClass("colaboradoresLiderados");
            $("#reportrange").addClass("colaboradorTimesheet");
            lider.ocultaFiltro();
            lider.Pessoa_codigo = $(this).data("pessoa");
            lider.listarColaboradoresTimesheet($(this).data("pessoa"));
        })

        $(document).on("click",".btnRelatorioGrafico",function(){
            $("#reportrange").removeClass("colaboradoresLiderados");
            $("#reportrange").addClass("colaboradorRelatorio");
            $("#main-body").addClass("d-none");
            $(".text-header").html("<span style='color: rgba(128, 128, 128, 0.29);'>Relatório / </span> <span class='font-cairo-bold'>" +$(this).data("nome") + "</span>" )
            lider.ocultaFiltro();
            Promise.allSettled([reportTimesheet.listar($(this).data("pessoa")), reportTimesheet.listarAtividades($(this).data("pessoa"))]).then(resolve => loading.close());
        })
    }

    this.reportRange = function(){
        moment.locale("pt");
        let starts = moment().startOf('month');
        let ends = moment().endOf('month');
        $('#reportrange').daterangepicker({
          startDate: starts,
          endDate: ends,
          showCustomRangeLabel: true,
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
          
        },lider.showReportRangeText);
       lider.showReportRangeText(starts, ends);
    }
  
    this.showReportRangeText = function report(start, end) {
      $('#reportrange span').html(start.format('MMM D') + ' - ' + end.format('MMM D'));
      $("#filtroInicio").val(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'))
    }
    
    this.listarCliente = function(){
        var params = {};
        loading.open();
        main.executarAPI("", 'SELECT', '', JSON.stringify(params), function (obj) {
            if(obj.success){
                var html = '<option hidden value="">Selecione</option>';
                for(i in obj.elements){
                    html += '<option value="'+obj.elements[i].Cliente_codigo+'">'+obj.elements[i].Client+'</option>';
                }
                $("#filtroCliente").html(html);
                lider.listarProjeto();
            }else{
                toastr.error("Não há dados para os filtros selecionados!", "Ops... !");

            }
        },  "listarClientes");
    }

    this.listarProjeto = function(){
        var params = {
           
        };
        main.executarAPI("", 'SELECT', '', JSON.stringify(params), function (obj) {
            if(obj.success){
                var html = '<option hidden value="">Selecione</option>';
                for(i in obj.elements){
                    html += '<option value="'+obj.elements[i].Projeto_codigo+'">'+obj.elements[i].Project+'</option>';
                }
                $("#filtroProjeto").html(html);
                lider.listarColaborador();

            }else{
                toastr.error("Não há dados para os filtros selecionados!", "Ops... !");

            }
        },  "listarProjetos");
    }

    this.listarColaborador = function(elements){    
        if(!lider.colaboradores){
            var html = '<option hidden value="">Selecione</option>';
            for(i of elements){
                html += '<option value="'+i.codigo+'">'+i.nome+'</option>';
            }
            $("#filtroConsultor").html(html);

            lider.listarProjeto();
            lider.listarCliente();
        }
    }

    this.listarColaboradoresTimesheet = function(codigo){
        loading.open();
        var params = main.pegarDados($("#formFiltro"));
        let [inicio, fim] = $('input[name="inicio"]').val().split(" - ");
        params['periodoInicio'] = main.dateInsert(inicio);
        params['periodoFim'] = main.dateInsert(fim);
        params['Pessoa_codigo'] = codigo;
        
        var $table = $('#mainTable');
        main.executarAPI("", 'SELECT', '', JSON.stringify(params), function (obj) {
            if(obj.success){
                    $("#voltar").removeClass("d-none");
                    $table.bootstrapTable('destroy');
                    $table.bootstrapTable({
                        data: obj.elements,
                        sortStable: true,
                        undefinedText: '',
                        theadClasses: 'text-center',
                        columns: [
                            {
                                field: 'Start_Date',
                                title: 'Data',
                                sortable: true,
                                class: 'text-justify',
                                formatter: function (value, row) {
                                    return main.dateList(value);
                                }
                            },
                            {
                                field: 'User',
                                title: 'Consultor',
                                sortable: true,
                                width: '15',
                                widthUnit: '%',
                                class: 'text-justify'
                            },
                            {
                                field: 'Client',
                                title: 'Cliente',
                                sortable: true,
                                class: 'text-justify',
                            },
                            {
                                field: 'Project',
                                title: 'Projeto',
                                sortable: true,
                                class: 'text-justify',
                            },
                            {
                                field: 'Description',
                                title: 'Descrição',
                                sortable: true,
                                class: 'text-center',
                                formatter: function (value, row) {
                                    var retorno = '';
                                    retorno += '<span  class="btn-description tooltip-content  btn-eye  ' + (value != undefined && value != "" ? "active" : "") + '  " data-value="' + row.codigo + '"  title="' + (value ? value : "") + '">';
                                    retorno += '    <svg class="icon-olho" style="stroke: #ffffff;" xmlns="http://www.w3.org/2000/svg" width="25.508" height="19.097" viewBox="0 0 25.508 19.097">';
                                    retorno += '        <defs></defs>';
                                    retorno += '        <g transform="translate(1 1)">';
                                    retorno += '            <path class="" style="fill: none;stroke-width: 2.5px;" d="M1.5,14.548S5.774,6,13.254,6s11.754,8.548,11.754,8.548S20.734,23.1,13.254,23.1,1.5,14.548,1.5,14.548Z" transform="translate(-1.5 -6)" />';
                                    retorno += '            <path class="" style="fill: none;stroke-width: 2.5px;" d="M19.911,16.706A3.206,3.206,0,1,1,16.706,13.5,3.206,3.206,0,0,1,19.911,16.706Z" transform="translate(-4.952 -8.157)" />';
                                    retorno += '        </g>';
                                    retorno += '    </svg>';
                                    retorno += ' </span>';
                                    return retorno;
                                }
                            },
                            {
                                field: 'Tags',
                                title: 'Tags',
                                width: '7',
                                widthUnit: '%',
                                sortable: true,
                                class: 'text-center icons',
                                formatter: function (value, row) {
                                    var retorno = '';
                                    retorno += ' <span title="' + (value ? value : "") + '" href="javascript:void(0)" class="btn-description btn-tag ' + (value != undefined && value != "" ? "active" : "") + '" data-value="' + row.codigo + '">';
                                    retorno += '     <svg id="icon-tag-time" xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24">';
                                    retorno += '         <defs><style>.a {fill: #2cabe0;}</style> </defs>';
                                    retorno += '         <path d="M23.341,10.591,13.409.659A2.25,2.25,0,0,0,11.818,0H2.25A2.25,2.25,0,0,0,0,2.25v9.568a2.25,2.25,0,0,0,.659,1.591l9.932,9.932a2.25,2.25,0,0,0,3.182,0l9.568-9.568a2.25,2.25,0,0,0,0-3.182ZM5.25,7.5A2.25,2.25,0,1,1,7.5,5.25,2.25,2.25,0,0,1,5.25,7.5Zm24.091,6.273-9.568,9.568a2.25,2.25,0,0,1-3.182,0l-.017-.017,8.159-8.159a4.219,4.219,0,0,0,0-5.966L15.534,0h2.284a2.25,2.25,0,0,1,1.591.659l9.932,9.932a2.25,2.25,0,0,1,0,3.182Z" />';
                                    retorno += '     </svg>';
                                    retorno += ' </span>';
                                    return retorno;
                                }
                            },
                            {
                                field: 'hora_inicio',
                                title: 'Hora Inicio',
                                sortable: true,
                                class: 'text-center',
                            },
                            {
                                field: 'hora_fim',
                                title: 'Hora Fim',
                                sortable: true,
                                class: 'text-center',
                            }
                        ]
                    });
                    loading.close();
            }else{
                $table.bootstrapTable();
                $table.bootstrapTable('destroy');
                $("#voltar").removeClass("d-none");
                $('#bodyGestorProjeto').html('<td colspan="6">Sem registros</td>');

                loading.close()
            }
        },  "listarTimesheet");
    }

    this.listarColaboradoresLiderados = function(codigo){
        loading.open();
        lider.visualizacaoInicial();
        var params = main.pegarDados($("#formFiltro"));
        let [inicio, fim] = $('input[name="inicio"]').val().split(" - ");
        params['periodoInicio'] = main.dateInsert(inicio);
        params['periodoFim'] = main.dateInsert(fim);
        params['Pessoa_codigo'] = codigo;
        var $table = $('#mainTable');
        main.executarAPI("", 'SELECT', '', JSON.stringify(params), function (obj) {
            if(obj.success){
                    $("#voltar").addClass("d-none");
                    $("#main-body").removeClass("d-none")
                    lider.listarColaborador(obj.elements);
                    lider.colaboradores = true;
                    $table.bootstrapTable('destroy');
                    $table.bootstrapTable({
                        data: obj.elements,
                        sortStable: true,
                        undefinedText: '',
                        theadClasses: 'text-center',
                        columns: [
                            {
                                field: 'nome',
                                title: 'Consultor',
                                sortable: true,
                                width: '35',
                                widthUnit: '%',
                                class: 'text-justify'
                            },

                            {
                                field: 'Duration_h',
                                title: 'Horas Totais',
                                sortable: true,
                                width: '15',
                                widthUnit: '%',
                                class: 'text-justify',
                                formatter: function (value, row) {
                                    if(value == null){
                                        return "00:00"
                                    } 

                                    return value.slice(0,5);
                                }
                            },
                           /*  {
                                field: 'Client',
                                title: 'Cliente',
                                sortable: true,
                                class: 'text-justify',
                            },
                            {
                                field: 'Project',
                                title: 'Projeto',
                                sortable: true,
                                class: 'text-justify',
                            }, */
                            {
                                field: 'codigo',
                                title: 'Ações',
                                sortable: false,
                                class: 'text-center icons',
                                formatter: function (value, row) {

                                    var retorno = '';
                                    retorno += ' <div class="d-flex justify-content-center">';
                                    retorno += '    <div class="circulo">';
                                    retorno += '        <a  class="mx-1 btnTimesheetColaborador" data-value="' + value + '" data-cliente="'+row.Cliente_codigo+'" data-pessoa="' + row.codigo + '" data-projeto="'+row.Projeto_codigo+'"  title="Timesheet" data-toggle="tooltip" data-placement="bottom" style="cursor: pointer;">';
                                    retorno += '            <svg id="Camada_2" data-name="Camada 2" xmlns="http://www.w3.org/2000/svg" width="14.996" height="26.242" viewBox="0 0 20.459 19.991">';
                                    retorno += '                <g id="Camada_1" data-name="Camada 1">';
                                    retorno += '                    <path id="Path_77231" data-name="Path 77231" d="M20.459,31.227V43.712a.823.823,0,0,1-.83.811H.832A.823.823,0,0,1,0,43.71V31.218a.809.809,0,0,1,.816-.8H19.633a.817.817,0,0,1,.826.807Zm-10.234,11.5a5.275,5.275,0,1,0,.02-10.546,5.275,5.275,0,1,0-.02,10.546Z" transform="translate(0 -24.531)" fill="#a5b5bb" />';
                                    retorno += '                    <path id="Path_77232" data-name="Path 77232" d="M20.5,1.742v2.4a.588.588,0,0,1-.594.581H.634A.587.587,0,0,1,.05,4.145v-2.4a.587.587,0,0,1,.584-.581H3.1A.587.587,0,0,0,3.685.581h0A.588.588,0,0,1,4.279,0H4.3A.588.588,0,0,1,4.9.581h0a.587.587,0,0,0,.584.581H9.092A.587.587,0,0,0,9.676.581h0A.588.588,0,0,1,10.27.01H10.3a.587.587,0,0,1,.584.581V.581a.588.588,0,0,0,.594.581h3.613a.588.588,0,0,0,.594-.581h0A.588.588,0,0,1,16.282.01h0a.588.588,0,0,1,.594.581V.61a.588.588,0,0,0,.594.581h2.464a.588.588,0,0,1,.564.552Z" transform="translate(-0.04)" fill="#a5b5bb" />';
                                    retorno += '                    <path id="Path_77233" data-name="Path 77233" d="M34.641,53.754a4.1,4.1,0,1,1,4.2-4.09A4.15,4.15,0,0,1,34.641,53.754Zm0-3.529h2.4a.588.588,0,0,0,.594-.581h0a.588.588,0,0,0-.594-.581H35.832a.588.588,0,0,1-.594-.581V47.31a.588.588,0,0,0-.594-.581h0a.588.588,0,0,0-.594.581v2.337a.574.574,0,0,0,.177.411.6.6,0,0,0,.423.167Z" transform="translate(-24.419 -36.732)" fill="#a5b5bb" />';
                                    retorno += '                 </g>';
                                    retorno += '             </svg>';
                                    retorno += '        </a>';
                                    retorno += '    </div>'

                                    retorno += ' <div class="d-flex justify-content-center">';
                                    retorno += '    <div class="circulo">';
                                    retorno += '        <a  class="mx-1 btnRelatorio" data-value="' + value + '" data-cliente="'+row.Cliente_codigo+'" data-pessoa="' + row.codigo + '" data-projeto="'+row.Projeto_codigo+'"  title="Relatório individual" data-toggle="tooltip" data-placement="bottom" style="cursor: pointer;">';
                                    retorno += '            <svg class="icon-relatorio " xmlns="http://www.w3.org/2000/svg" width="15.996" height="27.242" viewBox="0 0 16.179 19.849"> ';
                                    retorno += '                <g id="Group_881" data-name="Group 881" transform="translate(-721.25 -459.25)"> ';
                                    retorno += '                    <g id="Icon_feather-file-plus" data-name="Icon feather-file-plus" transform="translate(716 457)"> ';
                                    retorno += '                        <path id="Path_4621" data-name="Path 4621" d="M15.174,3H7.835A1.835,1.835,0,0,0,6,4.835V19.514a1.835,1.835,0,0,0,1.835,1.835H18.844a1.835,1.835,0,0,0,1.835-1.835V8.5Z" fill="#A5B5BB" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>';
                                    retorno += '                        <path id="Path_4622" data-name="Path 4622" d="M21,3V8.5h5.5" transform="translate(-5.826)" fill="#A5B5BB" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>';
                                    retorno += '                    </g>';
                                    retorno += '                    <path id="Path_4623" data-name="Path 4623" fill="#A5B5BB" d="M6.25,10A2.083,2.083,0,1,1,8.333,7.917,2.086,2.086,0,0,1,6.25,10Zm0-2.917a.833.833,0,1,0,.833.833A.835.835,0,0,0,6.25,7.083Zm0,0" transform="translate(723 461.667)"></path>';
                                    retorno += '                    <path id="Path_4624" fill="#A5B5BB" data-name="Path 4624" d="M9.375,14.167a.625.625,0,0,1-.625-.625v-.417a1.043,1.043,0,0,0-1.042-1.042H4.792A1.043,1.043,0,0,0,3.75,13.125v.417a.625.625,0,0,1-1.25,0v-.417a2.294,2.294,0,0,1,2.292-2.292H7.708A2.294,2.294,0,0,1,10,13.125v.417A.625.625,0,0,1,9.375,14.167Zm0,0" transform="translate(723 461.667)"></path>';
                                    retorno += '                </g>';
                                    retorno += '            </svg>';
                                    retorno += '        </a>';
                                    retorno += '    </div>'

                                    
                                    retorno += ' <div class="d-flex justify-content-center">';
                                    retorno += '    <div class="circulo">';
                                    retorno += '        <a  class="mx-1 btnRelatorioGrafico" data-value="' + value + '" data-cliente="'+row.Cliente_codigo+'" data-pessoa="' + row.codigo + '" data-projeto="'+row.Projeto_codigo + '" data-nome="'+row.nome+'"  title="Relatório Gráfico" data-toggle="tooltip" data-placement="bottom" style="cursor: pointer;">';
                                    retorno += '            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="27px" viewBox="0 0 48 48" fill="none">';
                                    retorno += '                <path d="M32 9C32 7.34315 33.3431 6 35 6H39C40.6569 6 42 7.34315 42 9V39C42 40.6569 40.6569 42 39 42H35C33.3431 42 32 40.6569 32 39V9Z" fill="#a5b5bb"></path>';
                                    retorno += '                <path d="M19 21C19 19.3431 20.3431 18 22 18H26C27.6569 18 29 19.3431 29 21V39C29 40.6569 27.6569 42 26 42H22C20.3431 42 19 40.6569 19 39V21Z" fill="#a5b5bb"></path>';
                                    retorno += '                <path d="M6 33C6 31.3431 7.34315 30 9 30H13C14.6569 30 16 31.3431 16 33V39C16 40.6569 14.6569 42 13 42H9C7.34315 42 6 40.6569 6 39V33Z" fill="#a5b5bb"></path>';
                                    retorno += '            </svg>';
                                    retorno += '        </a>';
                                    retorno += '    </div>'
                    

                                    return retorno;
                                }
                            },

                        ]
                    });
                    loading.close();
            }else{
                $table.bootstrapTable();
                $table.bootstrapTable('destroy');
                $("#voltar").addClass("d-none");
                $("#main-body").removeClass("d-none")
                $('#bodyGestorProjeto').html('<td colspan="6">Sem registros</td>');

                loading.close()
            }
        },  "listarColaboradores");
    
    }

    this.gerarRelatorio = function (consultor) {
        loading.open();
        let [inicio, fim] = $('input[name="inicio"]').val().split(" - ");
        var params = {
            dataInicio: main.dateInsert(inicio),
            dataFim: main.dateInsert(fim),
            agruparProjeto: "S"
        };
        params['consultor'] = consultor;
        main.executarAPI('', 'SELECT', '', JSON.stringify(params), function (obj) {
            if (typeof obj == 'string') {
                var mywindow = window.open('fragment/relatorio.frag.php', 'PRINT', 'height=600, width=800');
                mywindow.onload = function () {
                    mywindow.document.write(obj);
                }
                loading.close();
            } else {
                loading.close();
                toastr.error("Não há dados para os filtros selecionados!", "Ops... !");
            }
        }, "relatorio");
    }

    this.verificarLider = function(){
        loading.open();
        return new Promise((resolve, reject) => {
            var params = {};
            main.executarAPI("", 'SELECT', '', JSON.stringify(params), function (obj) {
                if(obj.success){
                    resolve();
                }else{
                    reject();
                }
            },  "verificarLider");
        })
    }

    this.ocultaFiltro = function (){
        $("#filtro").addClass("d-none");
        $(".separador-vertical").addClass("d-none")
    }

    this.visualizacaoInicial = function(){
        
        $("#filtro").removeClass("d-none");
        $(".separador-vertical").removeClass("d-none");
    }
}
let lider = new Lider();
lider.init();