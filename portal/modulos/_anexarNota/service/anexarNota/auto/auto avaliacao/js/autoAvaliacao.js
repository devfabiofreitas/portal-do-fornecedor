function AutoAvaliacao() {
    this.init = function () {
        main.initHelpers();
        if (codigoAtual && codigoAtual != '') {
            autoAvaliacao.verificarAcesso();
            autoAvaliacao.listarDados();
            // }else{
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Oops...',
            //         html: '<b>Acesso Negado!</b> <br>Parece que você não tem autorização para acessar essa página!  Caso possua algum acesso tente novamente ou entre em contato com o suporte.',
            //     }).then((result) => {
            //          if (result.value) {
            //              window.location.replace("https://blueshift.com.br/");
            //          }
            //      });
        }

        $('body').click(function (evt) {
            if ($(this).hasClass('.slider'))
                return;
            if ($(evt.target).closest('.slider').length)
                return;

            $('.slider-handle.min-slider-handle.round').popover('hide');
        });

        $(document).on('mouseleave', '.slider-handle.min-slider-handle.round', function () {
            $(this).popover('hide');
        });

        $(document).on('mouseleave', '.slider', function () {
            var div = $(this).parents('.slider-wrapper').find('.slider-handle')[0];
            $(div).popover('hide');
        });

        $('#salvar').click(function () {
            autoAvaliacao.cadastrar();
        });

        Handlebars.registerHelper('h_estado', function (endereco) {
            var retorno = '';
            if (endereco != "" && endereco != null) {
                retorno = ' - ' + endereco[endereco.length - 1].cidade + '/' + endereco[endereco.length - 1].estado;

            }
            return new Handlebars.SafeString(retorno);
        });

        Handlebars.registerHelper('h_perido', function (data) {
            var retorno = '';

            if (data != '') {
                var starts = moment().format("DD/MM/YYYY");;
                var starts = starts.split('/');
                var data = data.split('/');

                var starts = moment([starts[2], starts[1], starts[0]]);
                var ends = moment([data[2], data[1], data[0]]);

                var years = starts.diff(ends, 'year');
                ends.add(years, 'years');

                var months = starts.diff(ends, 'months');
                ends.add(months, 'months');

                // var days = starts.diff(ends, 'days');

                if (years != 0) {
                    retorno = years + ' anos e ' + months + ' mês(es) ';
                } else {
                    retorno = months + ' mês(es)';
                }
            }
            return new Handlebars.SafeString(retorno);
        });

        Handlebars.registerHelper('h_endereco', function (endereco) {
            if (endereco != "" && endereco != null) {
                var link = 'https://www.google.com/maps/search/?api=1&query=' + logradouro + ',' + numero + '+' + bairro + '+' + cidade + '+' + estado + '';
                endereco = cidade + '/' + estado;
                var retorno = ' - <a href="' + link + '" target="_blank">' + endereco + '</a>';
            }
            else {
                var retorno = '';
            }
            return new Handlebars.SafeString(retorno);
        });
    }

    this.verificarAcesso = function () {
        loading.open();

        var params = {
            situacao: 'H'
            ['codigo'] = codigoAtual

        };

        main.executarAPI('', 'SELECT', '', JSON.stringify(params), function (obj) {
            if (obj.success) {

                autoAvaliacao.listarResumoPerfil(obj);

                $('#salvar').removeClass('d-none');


            } else {
                $("#bodyAvaliacao").html('<div class="w-100 text-left font-weight-bold my-5">Sem registros</div>');
                $("#salvar").addClass('d-none');

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: 'Parece que você não tem autorização para acessar essa página ou seu acesso inspirou! Tente novamente ou entre em contato com o suporte.',
                }).then((result) => {
                    if (result.value) {
                        window.location.replace("https://blueshift.com.br/");
                    }
                });

                loading.close();
            }
        }, 'listarAvaliacao');
    }



    this.listarDados = function () {
        loading.open();

        var params = {
            situacao: 'H'
            ['codigo'] = codigoAtual

        };

        main.executarAPI('', 'SELECT', '', JSON.stringify(params), function (obj) {
            if (obj.success) {

                $('#salvar').removeClass('d-none');


            } else {
                $("#bodyAvaliacao").html('<div class="w-100 text-left font-weight-bold my-5">Sem registros</div>');
                $("#salvar").addClass('d-none');

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: 'Parece que você não tem autorização para acessar essa página ou seu acesso inspirou! Tente novamente ou entre em contato com o suporte.',
                }).then((result) => {
                    if (result.value) {
                        window.location.replace("https://blueshift.com.br/");
                    }
                });

                loading.close();
            }
        }, 'listarDados');
    }

    this.listarResumoPerfil = function (obj) {

        // var dadosResumo = main.convertToJson(obj.elements[0].resumo);    

        var resumo = {};
        var dadosResumo = main.convertToJson(obj.elements[0]['P']);
        resumo['elements'] = dadosResumo;
        var html = main.processarHtmlHandlebars('#template-resumo-perfil', resumo);
        $("#resumoPerfil").html(html);


        autoAvaliacao.listCompetencias(obj);
    }

    this.listCompetencias = function (obj) {
        var elements = obj.elements;
        $('#body-perguntas').html('');

        for (var i = 0; i < arrPerguntas.length; i++) {

            var htmlAccordion = '';
            htmlAccordion += ' <div class="accordion style-modal mt-3" id="accordion' + i + '">';
            htmlAccordion += '     <div class="card">';
            htmlAccordion += '         <div class="card-header d-flex justify-content-between py-2" id="heading' + i + '">';
            htmlAccordion += '             <p class="mb-0">';
            htmlAccordion += '                 <a href="javascript:void(0)" class="" type="button" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="true" aria-controls="collapse' + i + '">';
            htmlAccordion += arrPerguntas[i].categoria;
            htmlAccordion += '                 </a>';
            htmlAccordion += '             </p>';
            htmlAccordion += '             <p class="mb-0">';
            htmlAccordion += '                 <a href="javascript:void(0)" class="" type="button" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="true" aria-controls="collapse' + i + '">';
            htmlAccordion += '                     <i class="fa fa-chevron-down"></i>';
            htmlAccordion += '                 </a>';
            htmlAccordion += '             </p>';
            htmlAccordion += '         </div>';
            htmlAccordion += '         <div id="collapse' + i + '" class="collapse show" aria-labelledby="heading' + i + '" data-parent="#accordion' + i + '">';
            htmlAccordion += '             <div class="card-body p-0">                                ';
            htmlAccordion += '                 <div id="body-pergunta' + i + '" class="container-table">';
            htmlAccordion += '                 </div>';
            htmlAccordion += '             </div>';
            htmlAccordion += '         </div>';
            htmlAccordion += '     </div>';
            htmlAccordion += ' </div>';

            $('#body-perguntas').append(htmlAccordion);

            for (var j = 0; j < arrPerguntas[i].dados.length; j++) {

                var html = '<div class="table-responsive table-container">';
                html += '    <table id="table-pergunta-' + i + '-' + j + '" class="table-competencia text-center mb-0" data-locale="pt-BR" data-sticky-header="true" data-sticky-header-offset-left="1.5rem" data-sticky-header-offset-right="1.5rem"">';
                // if(arrPerguntas[i].dados[j].colunas[0].mostrarThead != "N"){
                html += '        <thead>';
                html += '           <tr>';
                for (var k = 0; k < arrPerguntas[i].dados[j].colunas.length; k++) {
                    var width = arrPerguntas[i].dados[j].colunas[k].width != undefined ? 'data-width="' + arrPerguntas[i].dados[j].colunas[k].width + '" data-width-unit="%"' : '';
                    if (arrPerguntas[i].dados[j].colunas[k].mostrar != 'N') {
                        html += '               <th ' + width + '>' + arrPerguntas[i].dados[j].colunas[k].nome + '</th>';
                    }
                }
                html += '           </tr>';
                html += '        </thead>';
                // }
                html += '        <tbody>';
                for (var k = 0; k < arrPerguntas[i].dados[j].linhas.length; k++) {
                    html += '           <tr>';

                    for (var l = 0; l < arrPerguntas[i].dados[j].linhas[k].length; l++) {
                        var classe = arrPerguntas[i].dados[j].colunas[l].classe != undefined ? arrPerguntas[i].dados[j].colunas[l].classe : '';
                        
                        
                        if (arrPerguntas[i].dados[j].colunas[l].mostrar != 'N') {
                            if (arrPerguntas[i].dados[j].colunas[l].tipo == 'texto2') {
                                html += '               <td  class="text-center'+ classe +'">' + arrPerguntas[i].dados[j].linhas[k][l] + '</td>';
                            
                            } else if (arrPerguntas[i].dados[j].colunas[l].tipo == 'texto') {
                                html += '               <td  class="text-left'+ classe +'">' + arrPerguntas[i].dados[j].linhas[k][l] +  '</td>';

                            } else if (arrPerguntas[i].dados[j].colunas[l].tipo == 'radio-separado') {
                                html += '           <td class="' + classe + '">';
                                html += '               <div class="custom-control custom-radio custom-control-inline">';
                                html += '                   <input type="radio" id="' + arrPerguntas[i].dados[j].linhas[k][0] + '-' + arrPerguntas[i].dados[j].linhas[k][l] + '" name="' + arrPerguntas[i].dados[j].linhas[k][0] + '" class="custom-control-input" value="' + arrPerguntas[i].dados[j].linhas[k][l] + '">';
                                html += '                   <label class="custom-control-label" for="' + arrPerguntas[i].dados[j].linhas[k][0] + '-' + arrPerguntas[i].dados[j].linhas[k][l] + '"></label>';
                                html += '               </div>';
                                html += '           </td>';

                            } else if (arrPerguntas[i].dados[j].colunas[l].tipo == 'slide') {
                                html += '           <td class="' + classe + '">';
                                html += '               <div class="slider-wrapper slider-strips slidecontainer">';
                                html += '                   <input class="input-range-perg slider" data-slider-id="slider' + i + j + k + l + '" type="text" data-slider-min="' + arrPerguntas[i].dados[j].linhas[k][l].min + '" data-slider-tooltip="always" data-slider-max="' + arrPerguntas[i].dados[j].linhas[k][l].max + '" data-slider-step="1" data-slider-value="0" data-name="' + arrPerguntas[i].dados[j].linhas[k][0] + '" data-legenda="' + i + '-' + j + '-' + k + '-' + l + '">';
                                html += '               </div>';
                                html += '           </td>';
                            } else if (arrPerguntas[i].dados[j].colunas[l].tipo == 'radio-junto') {
                                html += '           <td class="' + classe + '">';
                                for (var m = 0; m < arrPerguntas[i].dados[j].linhas[k][l].length; m++) {
                                    html += '               <div class="custom-control custom-radio custom-control-inline">';
                                    html += '                   <input type="radio" id="' + arrPerguntas[i].dados[j].linhas[k][0] + '-' + arrPerguntas[i].dados[j].linhas[k][l][m] + '" name="' + arrPerguntas[i].dados[j].linhas[k][0] + '" class="custom-control-input" value="' + arrPerguntas[i].dados[j].linhas[k][l][m] + '">';
                                    html += '                   <label class="custom-control-label" for="' + arrPerguntas[i].dados[j].linhas[k][0] + '-' + arrPerguntas[i].dados[j].linhas[k][l][m] + '">' + arrPerguntas[i].dados[j].linhas[k][l][m] + '</label>';
                                    html += '               </div>';
                                }
                                html += '           </td>';
        
                            } else if (arrPerguntas[i].dados[j].colunas[l].tipo == 'checkbox-junto') {
                                html += '           <td class="' + classe + '">';
                                for (var m = 0; m < arrPerguntas[i].dados[j].linhas[k][l].length; m++) {
                                    html += '               <div class="custom-control custom-checkbox custom-control-inline">';
                                    html += '                   <input type="checkbox" id="' + arrPerguntas[i].dados[j].linhas[k][0]  + arrPerguntas[i].dados[j].linhas[k][l][m] + '" name="' + arrPerguntas[i].dados[j].linhas[k][0] + '" class="custom-control-input" value="' + arrPerguntas[i].dados[j].linhas[k][l][m] + '">';
                                    html += '                   <label class="custom-control-label" for="' + arrPerguntas[i].dados[j].linhas[k][0] + arrPerguntas[i].dados[j].linhas[k][l][m] + '">' + arrPerguntas[i].dados[j].linhas[k][l][m] + '</label>';
                                    html += '               </div>';
                                }
                                html += '           </td>';
                            } else if (arrPerguntas[i].dados[j].colunas[l].tipo == 'checkbox-separado') {
                                html += '           <td class="' + classe + '">';
                                html += '               <div class="custom-control custom-checkbox custom-control-inline">';
                                html += '                   <input type="checkbox" id="' + arrPerguntas[i].dados[j].linhas[k][0]  + arrPerguntas[i].dados[j].linhas[k][l] + '" name="' + arrPerguntas[i].dados[j].linhas[k][0] + '" class="custom-control-input" value="' + arrPerguntas[i].dados[j].linhas[k][l] + '">';
                                html += '                   <label class="custom-control-label" for="' + arrPerguntas[i].dados[j].linhas[k][0] + arrPerguntas[i].dados[j].linhas[k][l] + '"></label>';
                                html += '               </div>';
                                html += '           </td>';

                            } else if (arrPerguntas[i].dados[j].colunas[l].tipo == 'input') {
                                html += '               <td class="' + classe + '"><input type="text" class="form-control rounded-pill bg-gray" name="' + arrPerguntas[i].dados[j].linhas[k][0] + '"/></td>';

                            } else {
                                html += '               <td class="' + classe + '">' + arrPerguntas[i].dados[j].linhas[k][l] + '</td>';
                            }
                        }
                    }
                    
                    html += '           </tr>';
                }
                html += '        </tbody>';
                html += '    </table>';
                html += '</div>';

                $('#body-pergunta' + i).append(html);

                var $table = $('#table-pergunta-' + i + '-' + j);

                $table.bootstrapTable();
                // $('.input-range-perg').each(function(){
                //     $(this).slider({});
                //     var div = $(this).parents('.slider-wrapper').find('.slider-handle')[0];
                //     var legenda = $(this).data('legenda').split('-');
                //     legenda = arrPerguntas[legenda[0]].dados[legenda[1]].linhas[legenda[2]][legenda[3]].legenda;
                //     if(legenda != '') {
                //         var nivel = legenda[parseInt($(this).val())];
                //         var sliderColor = $(this).parents('.slider-wrapper').find('.slider-selection')[0];
                //         $(sliderColor).css('background', nivel.cor);
                //         $(div).popover({
                //             title: nivel.titulo,
                //             content: nivel.texto,
                //             trigger: 'hover',
                //             placement: 'right',
                //         });
                //     }
                // });

            }
        }

        $('.info-competencias').popover({
            trigger: 'focus',
            html: true,
            template: '<div class="popover popover-lg" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            content: '<ul class="style-info-niveis"><li class="ml-4"><span class="color-senioridade-1 mr-1">&#9679;</span> Nível 0 - Não Aplicável: A completência não se aplica ou não se verifica</li><li class="ml-4"><span class="color-senioridade-3 mr-1">&#9679;</span> Nível 1 - Básico: Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada</li><li class="ml-4"><span class="color-senioridade-6 mr-1">&#9679;</span> Nível 2 - Intermediário: Demonstra domínio parcial da competência; a ocorrência efetiva da competência se verifica com frequência moderada.</li><li class="ml-4"><span class="color-senioridade-7 mr-1">&#9679;</span> Nível 3 - Avançado: Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.</li><li class="ml-4"><span class="color-senioridade-9 mr-1">&#9679;</span> Nível 4 - Referência: Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.</li></ul>'
        });

        if (elements[0].AutoAvaliacao_Pessoa && elements[0].AutoAvaliacao_Pessoa != 'null') {
            var avaliacoes = main.convertToJson(elements[0].AutoAvaliacao_Pessoa);
            if (periodo && periodo != '') {
                var avaliacao = avaliacoes.filter(function (av) {
                    return av.data == periodo;
                });

                if (avaliacao.length > 0) {
                    avaliacao = avaliacao[0].dados;
                    // }else{
                    //     var datas = avaliacoes.map(function(av){
                    //         return moment(av.data, 'DD.MM.YYYY');
                    //     });

                    //     var dataRecente = moment.max(datas);
                    //     dataRecente = dataRecente._i;
                    //     var avaliacao = avaliacoes.filter(function(av){
                    //         return av.data == dataRecente;
                    //     });

                    //     var avaliacao = avaliacao[0].dados;
                    // }
                    for (var i = 0; i < avaliacao.length; i++) {
                        var mainDiv = $('#accordion' + i)[0];
                        for (var j = 0; j < avaliacao[i].dados.length; j++) {
                            var arrLinhas = [];
                            var texto = '';
                            for (var k = 0; k < avaliacao[i].dados[j].linhas.length; k++) {
                                var arrColunas = [];
                                for (var l = 0; l < avaliacao[i].dados[j].colunas.length; l++) {
                                    // console.log(avaliacao[i].dados[j]);
                                    if (avaliacao[i].dados[j].colunas[l].tipo != 'texto') {
                                        if (avaliacao[i].dados[j].colunas[l].tipo == 'slide' && avaliacao[i].dados[j].colunas[l].mostrar != 'N') {
                                            $(mainDiv).find('input[data-name="' + texto + '"]').val(avaliacao[i].dados[j].respostas[k][l]);
                                            $(mainDiv).find('input[data-name="' + texto + '"]').attr('data-slider-value', avaliacao[i].dados[j].respostas[k][l]);
                                        } else if (avaliacao[i].dados[j].colunas[l].tipo == 'radio-junto') {
                                            $(mainDiv).find('input[name="' + texto + '"]').each(function () {
                                                if ($(this).val() == avaliacao[i].dados[j].respostas[k][l]) {
                                                    $(this).prop('checked', true)
                                                }
                                            });
                                        } else if (avaliacao[i].dados[j].colunas[l].tipo == 'radio-separado') {
                                            $(mainDiv).find('input[name="' + texto + '"]').each(function () {
                                                if ($(this).val() == avaliacao[i].dados[j].respostas[k][l]) {
                                                    $(this).prop('checked', true)
                                                }
                                            });
                                        } else if (avaliacao[i].dados[j].colunas[l].tipo == 'checkbox-junto') {
                                            $(mainDiv).find('input[name="' + texto + '"]').each(function () {
                                                if ($(this).val() == avaliacao[i].dados[j].respostas[k][l]) {
                                                    $(this).prop('checked', true)
                                                }
                                            });
                                        } else if (avaliacao[i].dados[j].colunas[l].tipo == 'checkbox-separado') {
                                            $(mainDiv).find('input[name="' + texto + '"]').each(function () {
                                                if ($(this).val() == avaliacao[i].dados[j].respostas[k][l]) {
                                                    $(this).prop('checked', true)
                                                }
                                            });
                                        } else if (avaliacao[i].dados[j].colunas[l].tipo == 'input') {
                                            $(mainDiv).find('input[name="' + texto + '"]').val(avaliacao[i].dados[j].respostas[k][l]);
                                        } else {
                                            $(mainDiv).find('input[name="' + texto + '"]').val(avaliacao[i].dados[j].respostas[k][l]);
                                        }
                                    } else {
                                        texto = avaliacao[i].dados[j].linhas[k][l];
                                        arrColunas.push('');
                                    }
                                }
                                arrLinhas.push(arrColunas);
                            }
                            // avaliacao[i].dados[j]['respostas'] =  arrLinhas;           
                        }
                    }
                }
            }
        }

        $('.input-range-perg').each(function () {
            $(this).slider({});
            var div = $(this).parents('.slider-wrapper').find('.slider-handle')[0];
            var legenda = $(this).data('legenda').split('-');
            legenda = arrPerguntas[legenda[0]].dados[legenda[1]].linhas[legenda[2]][legenda[3]].legenda;
            if (legenda != '') {
                var nivel = legenda[parseInt($(this).val())];
                var sliderColor = $(this).parents('.slider-wrapper').find('.slider-selection')[0];
                $(sliderColor).css('background', nivel.cor);
                $(div).popover({
                    title: nivel.titulo,
                    content: nivel.texto,
                    trigger: 'hover',
                    placement: 'right',
                });
            }
        });

        $(document).on('change', ".input-range-perg", function (e) {
            var div = $(this).parents('.slider-wrapper').find('.slider-handle')[0];
            var legenda = $(this).data('legenda').split('-');
            legenda = arrPerguntas[legenda[0]].dados[legenda[1]].linhas[legenda[2]][legenda[3]].legenda;
            if (legenda != '') {
                var nivel = legenda[parseInt(e.value.newValue)];
                var sliderColor = $(this).parents('.slider-wrapper').find('.slider-selection')[0];
                $(sliderColor).css('background', nivel.cor);
                $(div).popover('dispose');
                $(div).popover({
                    title: nivel.titulo,
                    content: nivel.texto,
                    trigger: 'hover',
                    placement: 'right',
                });

                $(div).popover('show');
            }
        });

        autoAvaliacao.listTags(obj);

    }

    this.listTags = function (obj) {
        var $table = $('#mainTable');

        $table.bootstrapTable('destroy');

        var tags = main.convertToJson(obj.elements[0].tags);


        var arrClass = [];
        var dadosTags = [];

        //         para resolver o problema de length undefined
        //         //  Using optional chaining
        // const result1 = arr?.length;
        // console.log(result1); // 👉️ undefined

        for (var i = 0; i < tags?.length || 0; i++) {
            if (tags[i].class01 == 'Data Developer' || tags[i].class01 == 'Data Engineer' || tags[i].class01 == 'Data Scientist' || tags[i].class01 == 'Data Visualization') {
                if (tags[i].class01 != '') {
                    if (arrClass.indexOf(tags[i].class01) == -1) {
                        arrClass.push(tags[i].class01)
                        var tempObj = {
                            class: tags[i].class01,
                            dados: [tags[i]]
                        }
                        dadosTags.push(tempObj);
                    } else {
                        var index = dadosTags.map(function (jsonTags) { return jsonTags.class; }).indexOf(tags[i].class01);

                        dadosTags[index].dados.push(tags[i]);
                    }
                } else {
                    if (arrClass.indexOf('Sem Área Cadastrada') == -1) {
                        arrClass.push('Sem Área Cadastrada')
                        var tempObj = {
                            class: 'Sem Área Cadastrada',
                            dados: [tags[i]]
                        }
                        dadosTags.push(tempObj);
                    } else {
                        var index = dadosTags.map(function (jsonTags) { return jsonTags.class; }).indexOf('Sem Área Cadastrada');

                        dadosTags[index].dados.push(tags[i]);
                    }
                }
            }
        }

        dadosTags = dadosTags.sort(function (a, b) {
            var x = a.class.toLowerCase();
            var y = b.class.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        });

        $(dadosTags).each(function () {
            this.dados = this.dados.sort(function (a, b) {
                var x = a.tag.toLowerCase();
                var y = b.tag.toLowerCase();
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;
            });
        });

        var html = '';
        html += '<thead><tr>';
        html += '   <th class="text-center" data-width="10" data-unit="%"></th>';
        // html += '   <th class="text-center" data-width="30" data-unit="%">Ferramenta/Linguagem/Tecnologia</th>';
        // html += '   <th class="text-center" data-width="40" data-unit="%">Nível de Conhecimento (0 à 9) <a tabindex="0" class="popover-dismiss info-niveis" role="button" data-toggle="popover" data-trigger="focus" title="Níveis de Conhecimento" data-content=""><i class="color-blue fas fa-info-circle popover-dismiss"></i></a></th>';
        // html += '   <th class="text-center" data-width="10" data-unit="%">Estudo <a tabindex="0" class="popover-dismiss info-popover" role="button" data-toggle="popover" data-trigger="focus" title="Atenção" data-content="Marque essa opção se adquiriu esse conhecimento em Estudos."><i class="color-blue fas fa-info-circle popover-dismiss"></i></a></th>';
        // html += '   <th class="text-center" data-width="10" data-unit="%">Projeto <a tabindex="0" class="popover-dismiss info-popover" role="button" data-toggle="popover" data-trigger="focus" title="Atenção" data-content="Marque essa opção se adquiriu esse conhecimento em Projetos."><i class="color-blue fas fa-info-circle popover-dismiss"></i></a></th>';
        html += '</tr></thead>';
        html += '<tbody id="bodyAvaliacao">';
        for (var i = 0; i < dadosTags.length; i++) {
            html += '   <tr><td class="text-center text-capitalize" rowspan="' + (dadosTags[i].dados.length + 1) + '"><div class="vertical-text font-weight-bold ' + autoAvaliacao.getDadosClass01(dadosTags[i].class) + '">' + dadosTags[i].class + '</div></td></tr>';

            for (var j = 0; j < dadosTags[i].dados.length; j++) {
                var jsonAvaliacao = main.convertToJson(dadosTags[i].dados[j].autoAvaliacao);
                var conhecimento = jsonAvaliacao != undefined && jsonAvaliacao != null ? jsonAvaliacao.senioridade : 0;
                var checkEstudo = jsonAvaliacao != undefined && jsonAvaliacao != null && jsonAvaliacao.estudo == "S" ? "checked" : "";
                var checkProjeto = jsonAvaliacao != undefined && jsonAvaliacao != null && jsonAvaliacao.projeto == "S" ? "checked" : "";

                html += '   <tr>';
                html += '       <td class="text-left">' + dadosTags[i].dados[j].tag + '</td>';
                html += '       <td class="text-center overflow-initial">';
                html += '           <div class="slider-wrapper slider-strips slidecontainer w-100">';
                html += '                <input class="input-range slider w-100" data-slider-id="ex1Slider' + dadosTags[i].dados[j].Tags_codigo + '" type="text" data-slider-min="0" data-slider-tooltip="always" data-slider-max="9" data-slider-step="1" data-slider-value="' + conhecimento + '" data-value="' + conhecimento + '" data-tag="' + dadosTags[i].dados[j].Tags_codigo + '" data-name="' + dadosTags[i].dados[j].tag + '"/>';
                html += '           </div>';
                html += '           </div>';
                html += '       </td>';
                html += '       </td>';
                html += '       <td>';
                html += '           <div class="custom-control custom-checkbox">';
                html += '               <input class="custom-control-input" type="checkbox" id="check-estudo-' + dadosTags[i].dados[j].Tags_codigo + '" data-value="' + dadosTags[i].dados[j].Tags_codigo + '" name="Estudo" ' + checkEstudo + '>';
                html += '               <label class="custom-control-label" for="check-estudo-' + dadosTags[i].dados[j].Tags_codigo + '">';
                html += '               </label>';
                html += '           </div>';
                html += '       </td>';
                html += '       <td>';
                html += '           <div class="custom-control custom-checkbox">';
                html += '               <input class="custom-control-input" type="checkbox" id="check-projeto-' + dadosTags[i].dados[j].Tags_codigo + '" data-value="' + dadosTags[i].dados[j].Tags_codigo + '" name="Projeto" ' + checkProjeto + '>';
                html += '               <label class="custom-control-label" for="check-projeto-' + dadosTags[i].dados[j].Tags_codigo + '">';
                html += '               </label>';
                html += '           </div>';
                html += '       </td>';
                html += '   </tr>';
            }
        }

        html += '</tbody>';

        $('#mainTable').html(html)

        $table.bootstrapTable({});

        $('.info-niveis').popover({
            trigger: 'focus',
            html: true,
            template: '<div class="popover popover-lg" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            content: '<ul class="style-info-niveis"><li class="ml-4"><span class="color-senioridade-1 mr-1">&#9679;</span> Nível 1 - Junior 1: Conhecimentos básicos adquiridos de forma acadêmica. Requer atenção antes, durante e ou finalizar as atividades por parte do Líder/Outro Colaborador;</li>  <li class="ml-4"><span class="color-senioridade-2 mr-1">&#9679;</span> Nível 2 - Junior 2: Capaz de realizar atividades de baixa complexidade. Pouco contato com atividades práticas. Requer auxilio de outro profissional para entendimento do escopo. Requer validação no produto entregue;</li><li class="ml-4"><span class="color-senioridade-3 mr-1">&#9679;</span> Nível 3 - Junior 3: Já atuou em preojetos. Requer acompanhamento de profissional nos produtos entregues;</li><li class="ml-4"><span class="color-senioridade-4 mr-1">&#9679;</span> Nível 4 - Pleno 1:	Já atuou em projetos. Capaz de realizar atividades de complexidade baixa de forma idependente;</li><li class="ml-4"><span class="color-senioridade-5 mr-1">&#9679;</span> Nível 5 - Pleno 2:	Consegue executar atividades de nível moderado de forma idependente;</li><li class="ml-4"><span class="color-senioridade-6 mr-1">&#9679;</span> Nível 6 - Pleno 3:	Pleno conhecimento das aplicações da Ferramenta/Liguagem. Encabeça atividades junto ao cliente;</li><li class="ml-4"><span class="color-senioridade-7 mr-1">&#9679;</span> Nível 7 - Senior 1: Interpreta requisitos de forma idependente. Experiência adquirida em vários projotes. Provê treinamentos internos. Gera conteúdo para capacitação de outros colaboradores;</li><li class="ml-4"><span class="color-senioridade-8 mr-1">&#9679;</span> Nível 8 - Senior 2: Atua de forma idependente. Participa de reuniões de forma ativa, capaz de sugerir soluções;</li><li class="ml-4"><span class="color-senioridade-9 mr-1">&#9679;</span> Nível 9 - Senior 3: Certificado oficial de mercado. Representa a empresa em ações comerciais, através de Palestras Worshops e Treinamentos. Atua em questões de arquiteturas e soluções em suas especialidades;</li></ul>'
        });

        $('.info-popover').popover({
            trigger: 'focus',
        });

        $('.input-range').each(function () {
            $(this).slider({});
            var div = $(this).parents('.slider-wrapper').find('.slider-handle')[0];
            var senioridade = autoAvaliacao.getDadosSenioridade(parseInt($(this).val()));
            var sliderColor = $(this).parents('.slider-wrapper').find('.slider-selection')[0];
            $(sliderColor).css('background', senioridade.cor);
            $(div).popover({
                title: senioridade.titulo,
                content: senioridade.texto,
                trigger: 'hover',
                placement: 'right',
            });
        });

        $(document).on('change', ".input-range", function (e) {
            var div = $(this).parents('.slider-wrapper').find('.slider-handle')[0];
            var senioridade = autoAvaliacao.getDadosSenioridade(e.value.newValue);
            var sliderColor = $(this).parents('.slider-wrapper').find('.slider-selection')[0];
            $(sliderColor).css('background', senioridade.cor);
            $(div).popover('dispose');
            $(div).popover({
                title: senioridade.titulo,
                content: senioridade.texto,
                trigger: 'hover',
                placement: 'right',
            });

            $(div).popover('show');
        });

        loading.close();
    }

    this.cadastrar = function () {

        var perguntas = arrPerguntas;

        for (var i = 0; i < perguntas.length; i++) {
            var mainDiv = $('#accordion' + i)[0];
            for (var j = 0; j < perguntas[i].dados.length; j++) {
                var arrRespostas = [];
                var arrLinhas = [];
                var texto = '';
                for (var k = 0; k < perguntas[i].dados[j].linhas.length; k++) {
                    var arrColunas = [];
                    for (var l = 0; l < perguntas[i].dados[j].colunas.length; l++) {
                        if (perguntas[i].dados[j].colunas[l].tipo != 'texto') {
                            if (perguntas[i].dados[j].colunas[l].tipo == 'slide') {
                                arrColunas.push(perguntas[i].dados[j].colunas[l].mostrar != 'N' ? $(mainDiv).find('input[data-name="' + texto + '"]').val() : '');
                            } else if (perguntas[i].dados[j].colunas[l].tipo == 'radio-junto') {
                                $(mainDiv).find('input[name="' + texto + '"]').each(function () {
                                    if ($(this).prop('checked') == true) {
                                        arrColunas.push(perguntas[i].dados[j].colunas[l].mostrar != 'N' ? $(this).val() : '');
                                    }
                                });
                            } else if (perguntas[i].dados[j].colunas[l].tipo == 'radio-separado') {
                                $(mainDiv).find('input[name="' + texto + '"]').each(function () {
                                    if ($(this).prop('checked') == true) {
                                        if (perguntas[i].dados[j].colunas[l].nome == $(this).val()) {
                                            arrColunas.push(perguntas[i].dados[j].colunas[l].mostrar != 'N' ? $(this).val() : '');
                                        }
                                    } else {
                                        if (perguntas[i].dados[j].colunas[l].nome == $(this).val()) {
                                            arrColunas.push('');
                                        }
                                    }
                                });
                            } else if (perguntas[i].dados[j].colunas[l].tipo == 'checkbox-junto') {
                                $(mainDiv).find('input[name="' + texto + '"]').each(function () {
                                    if ($(this).prop('checked') == true) {
                                        arrColunas.push(perguntas[i].dados[j].colunas[l].mostrar != 'N' ? $(this).val() : '');
                                    }
                                });
                            } else if (perguntas[i].dados[j].colunas[l].tipo == 'checkbox-separado') {
                                $(mainDiv).find('input[name="' + texto + '"]').each(function () {
                                    if ($(this).prop('checked') == true) {
                                        if (perguntas[i].dados[j].colunas[l].nome == $(this).val()) {
                                            arrColunas.push(perguntas[i].dados[j].colunas[l].mostrar != 'N' ? $(this).val() : '');
                                        }
                                    } else {
                                        if (perguntas[i].dados[j].colunas[l].nome == $(this).val()) {
                                            arrColunas.push('');
                                        }
                                    }
                                });
                            } else if (perguntas[i].dados[j].colunas[l].tipo == 'input') {
                                try {
                                    arrColunas.push(perguntas[i].dados[j].colunas[l].mostrar != 'N' ? $(mainDiv).find('input[name="' + texto + '"]').val().replaceAll('"', "'") : '');
                                } catch (error) {
                                    arrColunas.push(perguntas[i].dados[j].colunas[l].mostrar != 'N' ? $(mainDiv).find('input[name="' + texto + '"]').val() : '');

                                }

                            } else {
                                arrColunas.push('');
                            }
                        } else {
                            texto = perguntas[i].dados[j].linhas[k][l];

                            arrColunas.push('');
                        }
                    }
                    arrLinhas.push(arrColunas);
                }
                perguntas[i].dados[j]['respostas'] = arrLinhas;
            }
        }

       
        var params = {periodo, perguntas: perguntas}
       

        if (0 != 0) {
            Swal.fire("Ops... !", 'Por favor preencha os campos necessários.', "warning");
        } else {
            loading.open();
            main.executarAPI('', 'UPDATE', '', JSON.stringify(params), function (obj) {
                if (obj.success) {   
                    // if (obj.elements[0].resultado == parseInt(0)) {
                       toastr.success("Dados cadastrados com sucesso.", "Sucesso!");
                    // } else {
                    //     toastr.error("Não foi possivel salvar os dados. Tente novamente ou entre em contato com o suporte!", "Ops... !");
                    // }
                    loading.close();
                } else {
                    toastr.error("Ocorreu um erro. Verifique sua conexão com a internet, e tente novamente mais tarde.", "Ops... !");
                    loading.close();
                }
            }, 'cadastrarAvaliacao');
        }

       }
}
let autoAvaliacao = new AutoAvaliacao();
autoAvaliacao.init();