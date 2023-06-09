function GestorProjeto(){
    this.Projeto_codigos = [] ;
    this.Projeto_codigo = 0;
    this.TimesheetData = {};
    this.init = function(){
        gestorProjeto.verificarDadosGestor().then(() => {
            gestorProjeto.reportRange();
            gestorProjeto.listarProjetos();

        }).catch(() => {
            loading.close();
        })
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
             gestorProjeto.listarColaboradoresTimesheet();
            $('#modalFiltro').modal('hide');
        });
        $('#limparFiltro').click(function () {
            $('#formFiltro')[0].reset();
            $('#formFiltro select').val('');
        });
        $(document).on('click', '.excluir-filtros', function () {
            $('#formFiltro')[0].reset();
            $('#activeFilters').html('');
            paginaAtual = 0;
             gestorProjeto.listarColaboradoresTimesheet();
        });
        $(document).on('click', '.excluir-filtro', function () {
            var codigo = $(this).data('value');
            $('#formFiltro .form-control[name="' + codigo + '"]').val('');
            $(this).parent().remove();
            if ($('#activeFilters div').length == 0) $('#activeFilters').html('');
            paginaAtual = 0;
            gestorProjeto.listarColaboradoresTimesheet();
        });
        $(document).on("click",".btnRelatorio",function(){
            gestorProjeto.gerarRelatorio($(this).data("pessoa"),$(this).data("cliente"),$(this).data("projeto"));
        })

        $(document).on("click",".btnRelatorioGrafico",function(){
            $("#voltarProjeto").addClass("d-none");
            $("#reportrange").removeClass("colaboradoresTimesheet");
            $("#reportrange").addClass("colaboradorRelatorio");
            $("#main-body").addClass("d-none");
            $(".text-header").html("<span style='color: rgba(128, 128, 128, 0.29);'>Relatório / </span> <span class='font-cairo-bold'>" +$(this).data("nome") + "</span>" )
            gestorProjeto.ocultaFiltro();
            Promise.allSettled([reportTimesheet.listar($(this).data("pessoa")), reportTimesheet.listarAtividades($(this).data("pessoa"))]).then(resolve => loading.close());
        })


        $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
            $("#filtroInicio").val(picker.startDate.format('YYYY-MM-DD') + " - " + picker.endDate.format('YYYY-MM-DD'))
            gestorProjeto.listarColaboradoresTimesheet();
        })

        $("#voltar").click(function(){
            $("#reportrange").addClass("colaboradoresTimesheet");
            $("#reportrange").removeClass("colaboradorRelatorio");
            $(".text-header").html("<span class='font-cairo-bold'>Gestor/Projeto</span>");
            $chart = $('#chartTimesheet');
        
            if(window.myChart!= null)
            {
                $("#main-body-report").addClass("d-none");
                window.myChart.destroy();
            }
            gestorProjeto.listarColaboradoresTimesheet();

        })

        $(document).on("click",".btn-colaborador",function(){
            gestorProjeto.Projeto_codigo = $(this).data("value");
            gestorProjeto.listarColaboradores();
        })

        $("#voltarProjeto").click(function(){
            gestorProjeto.listarProjetos();
            $("#voltarProjeto").addClass("d-none");
            $("#filtroTimesheet").addClass("d-none");
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
          
        },gestorProjeto.showReportRangeText);
       gestorProjeto.showReportRangeText(starts, ends);
    }
  
    this.showReportRangeText = function report(start, end) {
      $('#reportrange span').html(start.format('MMM D') + ' - ' + end.format('MMM D'));
      $("#filtroInicio").val(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'))
    }
    

    this.listarProjetos = function(){
        
        loading.open();
        var params = {
            Projeto_codigos: gestorProjeto.Projeto_codigos.toString()
        };
        main.executarAPI("", 'SELECT', '', JSON.stringify(params), function (obj) {
            var $table = $('#mainTable');
            if(obj.success){
                $table.bootstrapTable('destroy');
                $table.bootstrapTable({
                    data: obj.elements,
                    sortStable: true,
                    undefinedText: '',
                    theadClasses: 'text-center',
                    columns: [

                        {
                            field: 'Client',
                            title: 'Cliente',
                            sortable: true,
                            class: 'text-center',
                        },
                      
                        {
                            field: 'Project',
                            title: 'Projeto',
                            sortable: true,
                            class: 'text-center',
                        },
               
               
                        {
                            field: 'Projeto_codigo',
                            title: 'Ações',
                            sortable: false,
                            class: 'text-center icons',
                            formatter: function (value, row) {
                                var retorno = '';
                                retorno += '<a href="javascript:void(0)" class="text-secondary btn-colaborador  ml-1" data-value="'+value+'">';
                                retorno += '    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 18 20">';
                                retorno += '        <g id="Group_883" data-name="Group 883" transform="translate(-792.5 -383.5)">';
                                retorno += '            <path id="Path_4628" data-name="Path 4628" d="M9.167,15.833a5,5,0,1,1,5-5A5.007,5.007,0,0,1,9.167,15.833Zm0-7a2,2,0,1,0,2,2A2,2,0,0,0,9.167,8.833Zm0,0" transform="translate(792.333 377.667)" fill="#a5b5ba"></path>';
                                retorno += '            <path id="Path_4629" data-name="Path 4629" d="M19,18.833a1.5,1.5,0,0,1-1.5-1.5v-1a2.5,2.5,0,0,0-2.5-2.5H8a2.5,2.5,0,0,0-2.5,2.5v1a1.5,1.5,0,0,1-3,0v-1a5.5,5.5,0,0,1,5.5-5.5h7a5.5,5.5,0,0,1,5.5,5.5v1A1.5,1.5,0,0,1,19,18.833Zm0,0" transform="translate(790 384.666)" fill="#a5b5ba"></path>';
                                retorno += '        </g>';
                                retorno += '    </svg>';
                                retorno += '</a>';

                                return retorno;
                            }
                        },
                    ]
                });
                loading.close();
            }else{
                loading.close();
                $table.bootstrapTable();
                $table.bootstrapTable('destroy');
                toastr.error("Não há dados para os filtros selecionados!", "Ops... !");

            }
        },  "listarProjetos");
    }

    this.listarColaboradores = function(){
        loading.open();
        var params = {
            Projeto_codigos: gestorProjeto.Projeto_codigos.toString()
        };
        main.executarAPI("", 'SELECT', '', JSON.stringify(params), function (obj) {
            if(obj.success){
                var html = '<option hidden value="">Selecione</option>';
                for(i in obj.elements){
                    html += '<option value="'+obj.elements[i].Responsavel_codigo+'">'+obj.elements[i].User+'</option>';
                }
                $("#filtroConsultor").html(html);
                gestorProjeto.listarColaboradoresTimesheet();
            }else{
                toastr.error("Não há dados para os filtros selecionados!", "Ops... !");

            }
        },  "listarColaboradores");
    }

    this.listarColaboradoresTimesheet = function(){
        loading.open();
        var params = main.pegarDados($("#formFiltro"));
        let [inicio, fim] = $('input[name="inicio"]').val().split(" - ");
        params['periodoInicio'] = main.dateInsert(inicio);
        params['periodoFim'] = main.dateInsert(fim);
        params['Projeto_codigo'] = gestorProjeto.Projeto_codigo;
        params['Projeto_codigo_gestor'] = gestorProjeto.Projeto_codigos.toString();
        gestorProjeto.visualizacaoInicial();
        var $table = $('#mainTable');
        main.executarAPI("", 'SELECT', '', JSON.stringify(params), function (obj) {
            if(obj.success){
                $("#voltar").addClass("d-none");
                $("#main-body").removeClass("d-none")
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
                        },
                        {
                            field: 'totalHrDia',
                            title: 'Hora Total',
                            sortable: true,
                            class: 'text-center',
                        },
                        {
                            field: 'codigo',
                            title: 'Ações',
                            sortable: false,
                            class: 'text-center icons',
                            formatter: function (value, row) {

                                var retorno = '';
                                retorno += ' <div class="d-flex justify-content-center">';
                                retorno += '    <div class="circulo">';
                                retorno += '        <a  class="mx-1 btnRelatorio" data-value="' + value + '" data-cliente="'+row.Cliente_codigo+'" data-pessoa="' + row.Responsavel_codigo + '" data-projeto="'+row.Projeto_codigo+'"  title="Relatório individual" data-toggle="tooltip" data-placement="bottom" style="cursor: pointer;">';
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
                                retorno += '        <a  class="mx-1 btnRelatorioGrafico" data-value="' + value + '" data-cliente="'+row.Cliente_codigo+'" data-pessoa="' + row.Responsavel_codigo + '" data-projeto="'+row.Projeto_codigo+ '" data-nome="'+ row.User+'"  title="Relatório Gráfico" data-toggle="tooltip" data-placement="bottom" style="cursor: pointer;">';
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
                $("#filtroTimesheet").removeClass("d-none");
                $("#voltarProjeto").removeClass("d-none");
                loading.close();
            }else{
                $("#filtroTimesheet").removeClass("d-none");
                $table.bootstrapTable();
                $table.bootstrapTable('destroy');
                $("#voltar").addClass("d-none");
                $("#main-body").removeClass("d-none")
                $("#voltarProjeto").removeClass("d-none");
                $('#bodyGestorProjeto').html('<td colspan="6">Sem registros</td>');
                loading.close()
            }
        },  "listarTimesheet");
    }

    this.gerarRelatorio = function (consultor,cliente,projeto) {
        loading.open();
        let [inicio, fim] = $('input[name="inicio"]').val().split(" - ");
        var params = {
            dataInicio: main.dateInsert(inicio),
            dataFim: main.dateInsert(fim),
            agruparProjeto: "S"
        };
        params['consultor'] = consultor;
        params['cliente'] = cliente;
        params['projeto'] = projeto;
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

    this.verificarDadosGestor = function(){
        loading.open();
        return new Promise((resolve, reject) => {
            var params = {};
            main.executarAPI("", 'SELECT', '', JSON.stringify(params), function (obj) {
                if(obj.success){
                    for(i in obj.elements){
                        gestorProjeto.Projeto_codigos.push(obj.elements[i].Projeto_codigo)
                    }
                    resolve();
                }else{
                    reject();
                }
            },  "verificarGestor");
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

    // gestorProjeto.listarCliente();

}
let gestorProjeto = new GestorProjeto();
gestorProjeto.init();