
function AutoAvaliacaoTecnica() {
    var jsonTagsBanco = [];
    var dadosTags = [];
    var colaborador = '';
    var email = "";

    this.init = function() {         

        main.initHelpers();
        if(codigoAtual && codigoAtual != '') {
            autoAvaliacao.verificarAcesso();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '<b>Acesso Negado!</b> <br>Parece que você não tem autorização para acessar essa página!  Caso possua algum acesso tente novamente ou entre em contato com o suporte.',
            }).then((result) => {
                if (result.value) {
                    window.location.replace("https://blueshift.com.br/");
                }
            });
        }

        $('body').click(function(evt){   
            if($(this).hasClass('.slider'))
               return;
            if($(evt.target).closest('.slider').length)
               return;
            $('.slider-handle.min-slider-handle.round').popover('hide');
        });

        $("#filtro-table").on("keyup", function() {
            var value = $(this).val().toLowerCase();               
                $("#bodyAvaliacao tr").filter(function() {
                    if($(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)){                        
                        $('.th-first').css('display', "none");                        
                    }                    
                });
            
                if(value == ""){
                    $('.th-first').css('display', "");
                }
            
        });
       
        $(document).on('mouseleave', '.slider-handle.min-slider-handle.round', function(){
            $(this).popover('hide');
        });

        $(document).on('mouseleave', '.slider', function(){
            var div = $(this).parents('.slider-wrapper').find('.slider-handle')[0];
            $(div).popover('hide');
        });

        $('#salvar').click(function() {
            $('#btnvermais').removeClass('d-none')
            autoAvaliacao.cadastrar();
        });   

        $('#btnvermais').click(function(){
            autoAvaliacao.carregarMais();
        })

        Handlebars.registerHelper('h_perido', function (data) {
            var retorno = '';

            if(data != '' && data != null) {

                var starts = moment().format("DD/MM/YYYY");;
                var starts = starts.split('/');
                var data = data.split('/');

                var starts = moment([starts[2], starts[1], starts[0]]);
                var ends = moment([data[2], data[1], data[0]]);

                var years = starts.diff(ends, 'year');
                ends.add(years, 'years');

                var months = starts.diff(ends, 'months');
                ends.add(months, 'months');

                if(years != 0 ){
                    retorno = years + ' anos e ' + months + ' mês(es) ';
                }else{
                    retorno = months + ' mês(es)';
                }            
            }
            return new Handlebars.SafeString(retorno);
        });

        Handlebars.registerHelper('h_endereco', function (endereco) {
            if (endereco != "" && endereco != null) {
                var link = 'https://www.google.com/maps/search/?api=1&query=' + endereco[endereco.length - 1].logradouro + ',' + endereco[endereco.length - 1].numero + '+' + endereco[endereco.length - 1].bairro + '+' + endereco[endereco.length - 1].cidade + '+' + endereco[endereco.length - 1].estado + '';
                endereco = endereco[endereco.length - 1].cidade + '/' + endereco[endereco.length - 1].estado;
                var retorno = ' - <a href="' + link + '" target="_blank">' + endereco + '</a>';
            } else{
                var retorno = '';
            }
            return new Handlebars.SafeString(retorno);
        });
    }

    this.verificarAcesso = function () {       
        loading.open();
        var params = {
            situacao: 'H',
            ['codigo']: codigoAtual

        };

        main.executarAPI('', 'SELECT', '', JSON.stringify(params), function (obj) {
            if(obj.success) {
                atualizacao_avaliacao = true;
                var $table = $('#mainTable')

                $table.bootstrapTable('destroy');

                var tags = main.convertToJson(obj.elements[0].tags);   
                                               
                // var arrClass = [];
                // var arrClasses = [];

                colaborador = obj.elements.nome
                email = obj.elements.email                

                // tags.map(function(v, i){
                //     if(arrClasses.indexOf(v.class01) == -1 && v.class01 != '' && v.class01 != 'Comportamental' && v.class01 != 'outro'){
                //         arrClasses.push(v.class01);
                //     }
                // });

                
                jsonTagsBanco = [];
                var listClass = []
                tags.map(function(v,i){
                    if(listClass.indexOf(v.class01) == -1){
                        listClass.push(v.class01)
                        var tempObj = {
                            class: v.class01,
                            dados: [v]
                        }
                        dadosTags.push(tempObj)
                        jsonTagsBanco.push(v)
                    }else{
                        var index = dadosTags.map(function(jsonTags){ return jsonTags.class}).indexOf(v.class01)
                        dadosTags[index].dados.push(v)
                        jsonTagsBanco.push(v)
                    }
                })

                // for( var i = 0; i < tags?.length; i++){
                //     if(arrClasses.indexOf(tags[i].class01) != -1){
                //         // if(tags[i].class01 != ''){
                //             if(arrClass.indexOf(tags[i].class01) == -1){
                //                 arrClass.push(tags[i].class01)
                //                 var tempObj = {
                //                     class: tags[i].class01,
                //                     dados: [tags[i]]
                //                 }
                //                 jsonTagsBanco.push(tags[i])
                //                 dadosTags.push(tempObj);
                                
                //             }else{
                //                 var index = dadosTags.map(function (jsonTags) {
                //                      return jsonTags.class; 
                //                     }).indexOf(tags[i].class01);

                //                 dadosTags[index].dados.push(tags[i]);
                //                 jsonTagsBanco.push(tags[i])
                //             }
                //         // }else{
                //         //     if(arrClass.indexOf('Sem Área Cadastrada') == -1){
                //         //         arrClass.push('Sem Área Cadastrada')
                //         //         var tempObj = {
                //         //             class: 'Sem Área Cadastrada',
                //         //             dados: [tags[i]]
                //         //         }
                //         //         dadosTags.push(tempObj);
                //         //     }else{
                //         //         var index = dadosTags.map(function (jsonTags) { return jsonTags.class; }).indexOf('Sem Área Cadastrada');
 
                //         //         dadosTags[index].dados.push(tags[i]);
                //         //     }                        
                //         // }
                //     }
                // }

                dadosTags = dadosTags.sort(function(a, b){
                    var x = a.class.toLowerCase();
                    var y = b.class.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                });

               
                $(dadosTags).each(function(){
                    this.dados = this.dados.sort(function(a, b){
                        var x = a.tag.toLowerCase();
                        var y = b.tag.toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    });
                });

                var html = '';
                html += '<thead><tr>';
                html += '   <th class="text-center th-first" data-width="10" data-unit="%"></th>';
                html += '   <th class="text-center" data-width="30" data-unit="%">Ferramenta/Linguagem/Tecnologia</th>';
                html += '   <th class="text-center" data-width="40" data-unit="%">Nível de Conhecimento (0 à 9)</th>';
                html += '   <th class="text-center" data-width="10" data-unit="%">Estudo <a tabindex="0" class="popover-dismiss info-popover" role="button" data-toggle="popover" data-trigger="focus" title="Atenção" data-content="Marque essa opção se adquiriu esse conhecimento em Estudos."><i class="color-blue fas fa-info-circle popover-dismiss"></i></a></th>';
                html += '   <th class="text-center" data-width="10" data-unit="%">Projeto <a tabindex="0" class="popover-dismiss info-popover" role="button" data-toggle="popover" data-trigger="focus" title="Atenção" data-content="Marque essa opção se adquiriu esse conhecimento em Projetos."><i class="color-blue fas fa-info-circle popover-dismiss"></i></a></th>';
                html += '</tr></thead>';
                html += '<tbody id="bodyAvaliacao">';

                for(var i = 0; i < 6; i++){
                    html += '   <tr class="first-tr"><td class="text-center text-capitalize" rowspan="' + (dadosTags[i].dados.length + 1) +'"><div class="vertical-text font-weight-bold ' + autoAvaliacao.getDadosClass01(dadosTags[i].class) + '">' + dadosTags[i].class + '</div></td></tr>';
                    for(var j = 0; j < dadosTags[i].dados.length; j++){
                        if(dadosTags[i].dados[j].autoAvaliacao != null){
                            var idx = dadosTags[i].dados[j].autoAvaliacao.length
                            if(dadosTags[i].dados[j].autoAvaliacao[idx -1] != null){
                                var jsonAvaliacao = main.convertToJson(dadosTags[i].dados[j].autoAvaliacao[idx -1])
                                // var jsonAvaliacao = main.convertToJson(dadosTags[i].dados[j].autoAvaliacao[0])
                            }else{
                                var jsonAvaliacao = main.convertToJson(dadosTags[i].dados[j].autoAvaliacao)
                            }
                        }else{
                            var jsonAvaliacao = main.convertToJson(dadosTags[i].dados[j].autoAvaliacao)
                        }
                  
                        var conhecimento = jsonAvaliacao != undefined && jsonAvaliacao != null ? jsonAvaliacao.senioridade : 0;
                        var checkEstudo = jsonAvaliacao != undefined && jsonAvaliacao != null && jsonAvaliacao.estudo == "S" ? "checked" : "";
                        var checkProjeto = jsonAvaliacao != undefined && jsonAvaliacao != null && jsonAvaliacao.projeto == "S" ? "checked" : "";

                        if(dadosTags[i].dados.length == 1){
                            var firstCol = 'first-col';
                        }else{
                            var firstCol = '';
                        }

                        html += '   <tr>';
                        html += '       <td class="text-left '+firstCol+'">' + dadosTags[i].dados[j].tag + '</td>';
                        html += '       <td class="text-center overflow-initial">';                        
                        html += '           <div class="slider-wrapper slider-strips slidecontainer w-100">';
                        html += '                <input class="input-range slider w-100" data-slider-id="ex1Slider' + dadosTags[i].dados[j].Tags_codigo + '" type="text" data-slider-min="0" data-slider-tooltip="always" data-slider-max="9" data-slider-step="1" data-slider-value="' + conhecimento + '" data-value="' + conhecimento + '"  data-tag="' + dadosTags[i].dados[j].Tags_codigo + '" data-name="' + dadosTags[i].dados[j].tag + '"/>';
                        html += '           </div>';
                        html += '       </td>';
                        html += '       <td>';
                        html += '           <div class="custom-control custom-checkbox">';
                        html += '               <input class="custom-control-input" type="checkbox" id="check-estudo-'+ dadosTags[i].dados[j].Tags_codigo + '" data-value="'+ dadosTags[i].dados[j].Tags_codigo + '" name="Estudo" ' + checkEstudo + '>';
                        html += '               <label class="custom-control-label" for="check-estudo-'+ dadosTags[i].dados[j].Tags_codigo + '">';
                        html += '               </label>';
                        html += '           </div>';
                        html += '       </td>';
                        html += '       <td>';
                        html += '           <div class="custom-control custom-checkbox">';
                        html += '               <input class="custom-control-input" type="checkbox" id="check-projeto-'+ dadosTags[i].dados[j].Tags_codigo + '" data-value="'+ dadosTags[i].dados[j].Tags_codigo + '" name="Projeto" ' + checkProjeto + '>';
                        html += '               <label class="custom-control-label" for="check-projeto-'+ dadosTags[i].dados[j].Tags_codigo + '">';
                        html += '               </label>';
                        html += '           </div>';
                        html += '       </td>';
                        html += '   </tr>'; 
                        
                        // html += '   <tr>';
                        // html += '       <td class="text-left '+firstCol+'">' + dadosTags[i].dados[j].tag + '</td>';
                        // html += '       <td class="text-center overflow-initial">';                        
                        // html += '           <div class="slider-container slider-wrapper">';
                        // html += '                <input class="input-range slider" type="range" min="0" max="9" value="' + conhecimento + '" color-senioridade-"'+conhecimento+'" data-tag="' + dadosTags[i].dados[j].Tags_codigo + '" data-name="' + dadosTags[i].dados[j].tag + '"/>';
                        // html += '                <span id="rangeValue">'+conhecimento+'</span> ';
                        // html += '           </div>';
                        // html += '       </td>';
                        // html += '       <td>';
                        // html += '           <div class="custom-control custom-checkbox">';
                        // html += '               <input class="custom-control-input" type="checkbox" id="check-estudo-'+ dadosTags[i].dados[j].Tags_codigo + '" data-value="'+ dadosTags[i].dados[j].Tags_codigo + '" name="Estudo" ' + checkEstudo + '>';
                        // html += '               <label class="custom-control-label" for="check-estudo-'+ dadosTags[i].dados[j].Tags_codigo + '">';
                        // html += '               </label>';
                        // html += '           </div>';
                        // html += '       </td>';
                        // html += '       <td>';
                        // html += '           <div class="custom-control custom-checkbox">';
                        // html += '               <input class="custom-control-input" type="checkbox" id="check-projeto-'+ dadosTags[i].dados[j].Tags_codigo + '" data-value="'+ dadosTags[i].dados[j].Tags_codigo + '" name="Projeto" ' + checkProjeto + '>';
                        // html += '               <label class="custom-control-label" for="check-projeto-'+ dadosTags[i].dados[j].Tags_codigo + '">';
                        // html += '               </label>';
                        // html += '           </div>';
                        // html += '       </td>';
                        // html += '   </tr>';
                    }
                }

                html += '</tbody>';

                $('#mainTable').html(html)

                $table.bootstrapTable({});                

                // var firstCol = $('.first-col');
                // var titleHeight = $('.first-col').parent().prev().find('td');
                // for (var j = 0; j < titleHeight.length; j++) {
                //     var height = $(titleHeight[j]).outerHeight()  
                //     $(firstCol[j]).height(height)
                // }

                // var Alltr = $('#bodyAvaliacao tr')
                // var groupTr = [];
                // var firstTr = [Alltr[0]];
                // for (var idx = 1; idx < Alltr.length; idx++) {

                //     if(!$(Alltr[idx]).hasClass('first-tr')){
                //         groupTr.push(Alltr[idx]);

                //         if(idx == Alltr.length -1){
                //             calcTitle()
                //         }
                //     }else{
                //         calcTitle()                        
                //     }

                //     function calcTitle(){
                //         if(groupTr.length > 1 && groupTr.length <= 5){
                //             var heightTitle = $(firstTr[0]).find('td').outerHeight();
                //             var trHeight = groupTr.length * 35;

                //             if(trHeight < heightTitle){
                //                 var padding = heightTitle - trHeight;
                //                 if(padding >= 0.5000){
                //                     var newHeight = heightTitle/groupTr.length;
                //                     for (var i = 0; i < groupTr.length; i++) {
                //                         $(groupTr[i]).height(newHeight);
                //                     }  
                //                 }
                //             }  
                //         }

                //         firstTr = [Alltr[idx]];
                //         groupTr = [];
                //     }
                // }                

                // $('.info-niveis').popover({
                //     trigger: 'focus',
                //     html: true,
                //     template: '<div class="popover popover-lg" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
                //     content: '<ul class="style-info-niveis"><li class="ml-4"><span class="color-senioridade-1 mr-1">&#9679;</span> Nível 1: Conhecimentos básicos adquiridos de forma acadêmica. Requer atenção antes, durante e ou finalizar as atividades por parte do Líder/Outro Colaborador;</li>  <li class="ml-4"><span class="color-senioridade-2 mr-1">&#9679;</span> Nível 2: Capaz de realizar atividades de baixa complexidade. Pouco contato com atividades práticas. Requer auxilio de outro profissional para entendimento do escopo. Requer validação no produto entregue;</li><li class="ml-4"><span class="color-senioridade-3 mr-1">&#9679;</span> Nível 3: Já atuou em projetos. Requer acompanhamento de profissional nos produtos entregues;</li><li class="ml-4"><span class="color-senioridade-4 mr-1">&#9679;</span> Nível 4:	Já atuou em projetos. Capaz de realizar atividades de complexidade baixa de forma independente;</li><li class="ml-4"><span class="color-senioridade-5 mr-1">&#9679;</span> Nível 5:	Consegue executar atividades de nível moderado de forma independente;</li><li class="ml-4"><span class="color-senioridade-6 mr-1">&#9679;</span> Nível 6:	Pleno conhecimento das aplicações da Ferramenta/Liguagem. Encabeça atividades junto ao cliente;</li><li class="ml-4"><span class="color-senioridade-7 mr-1">&#9679;</span> Nível 7: Interpreta requisitos de forma independente. Experiência adquirida em vários projetos. Provê treinamentos internos. Gera conteúdo para capacitação de outros colaboradores;</li><li class="ml-4"><span class="color-senioridade-8 mr-1">&#9679;</span> Nível 8: Atua de forma independente. Participa de reuniões de forma ativa, capaz de sugerir soluções;</li><li class="ml-4"><span class="color-senioridade-9 mr-1">&#9679;</span> Nível 9: Certificado oficial de mercado. Representa a empresa em ações comerciais, através de Palestras Workshops e Treinamentos. Atua em questões de arquiteturas e soluções em suas especialidades;</li></ul>'
                // });                

                // $('.info-popover').popover({
                //     trigger: 'focus',
                // });

                $('.input-range').each(function(){                    
                    $(this).slider({});                    
                    var div = $(this).parents('.slider-wrapper').find('.slider-handle')[0];
                    
                    var Tags_codigo = $(this).data('tag');
                    var senioridade = autoAvaliacao.descricaoSenioridade(parseInt($(this).val()), Tags_codigo);
                    var sliderColor = $(this).parents('.slider-wrapper').find('.slider-selection')[0];
                    $(sliderColor).css('background', senioridade.cor);
                    $(div).popover({
                        title: senioridade.titulo,
                        content: senioridade.texto,
                        trigger: 'hover',
                        placement: 'right',
                    });
                });                
                
                $(document).on('change',".input-range", function (e) { 
                    var div = $(this).parents('.slider-wrapper').find('.slider-handle')[0];
                    var Tags_codigo = $(this).data('tag');
                    var senioridade = autoAvaliacao.descricaoSenioridade(e.value.newValue, Tags_codigo);                  
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

                $('#salvar').removeClass('d-none');

                // autoAvaliacao.listarResumoPerfil(obj.elements[0].resumo);
                loading.close();
             
            }
            else{
                $("#bodyAvaliacao").html('<div class="w-100 text-center font-weight-bold my-5">Sem registros</div>');
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
        }, 'listarAvaliacaoTecnica');
    }

    this.carregarMais = function () {       
        loading.open();
        var params = {
        };

        main.executarAPI('', 'SELECT', '', JSON.stringify(params), function (obj) {
            var html = '';
            for(var i = 6; i < dadosTags.length; i++){
                html += '   <tr class="first-tr"><td class="text-center text-capitalize" rowspan="' + (dadosTags[i].dados.length + 1) +'"><div class="vertical-text font-weight-bold ' + autoAvaliacao.getDadosClass01(dadosTags[i].class) + '">' + dadosTags[i].class + '</div></td></tr>';
                for(var j = 0; j < dadosTags[i].dados.length; j++){
                    if(dadosTags[i].dados[j].autoAvaliacao != null){
                        var idx = dadosTags[i].dados[j].autoAvaliacao.length
                        if(dadosTags[i].dados[j].autoAvaliacao[idx -1] != null){
                            var jsonAvaliacao = main.convertToJson(dadosTags[i].dados[j].autoAvaliacao[idx -1])
                        }else{
                            var jsonAvaliacao = main.convertToJson(dadosTags[i].dados[j].autoAvaliacao)
                        }
                    }else{
                        var jsonAvaliacao = main.convertToJson(dadosTags[i].dados[j].autoAvaliacao)
                    }
              
                    var conhecimento = jsonAvaliacao != undefined && jsonAvaliacao != null ? jsonAvaliacao.senioridade : 0;
                    var checkEstudo = jsonAvaliacao != undefined && jsonAvaliacao != null && jsonAvaliacao.estudo == "S" ? "checked" : "";
                    var checkProjeto = jsonAvaliacao != undefined && jsonAvaliacao != null && jsonAvaliacao.projeto == "S" ? "checked" : "";
    
                    if(dadosTags[i].dados.length == 1){
                        var firstCol = 'first-col';
                    }else{
                        var firstCol = '';
                    }
                    
                    html += '   <tr>';
                    html += '       <td class="text-left '+firstCol+'">' + dadosTags[i].dados[j].tag + '</td>';
                    html += '       <td class="text-center overflow-initial">';                        
                    html += '           <div class="slider-wrapper slider-strips slidecontainer w-100">';
                    html += '                <input class="input-range slider w-100" data-slider-id="ex1Slider' + dadosTags[i].dados[j].Tags_codigo + '" type="text" data-slider-min="0" data-slider-tooltip="always" data-slider-max="9" data-slider-step="1" data-slider-value="' + conhecimento + '" data-value="' + conhecimento + '"  data-tag="' + dadosTags[i].dados[j].Tags_codigo + '" data-name="' + dadosTags[i].dados[j].tag + '"/>';
                    html += '           </div>';
                    html += '       </td>';
                    html += '       <td>';
                    html += '           <div class="custom-control custom-checkbox">';
                    html += '               <input class="custom-control-input" type="checkbox" id="check-estudo-'+ dadosTags[i].dados[j].Tags_codigo + '" data-value="'+ dadosTags[i].dados[j].Tags_codigo + '" name="Estudo" ' + checkEstudo + '>';
                    html += '               <label class="custom-control-label" for="check-estudo-'+ dadosTags[i].dados[j].Tags_codigo + '">';
                    html += '               </label>';
                    html += '           </div>';
                    html += '       </td>';
                    html += '       <td>';
                    html += '           <div class="custom-control custom-checkbox">';
                    html += '               <input class="custom-control-input" type="checkbox" id="check-projeto-'+ dadosTags[i].dados[j].Tags_codigo + '" data-value="'+ dadosTags[i].dados[j].Tags_codigo + '" name="Projeto" ' + checkProjeto + '>';
                    html += '               <label class="custom-control-label" for="check-projeto-'+ dadosTags[i].dados[j].Tags_codigo + '">';
                    html += '               </label>';
                    html += '           </div>';
                    html += '       </td>';
                    html += '   </tr>'; 
                }
            }
    
            html += '</tbody>';
    
            $('#bodyAvaliacao').append(html)
    
            $('.input-range').each(function(){                    
                $(this).slider({});                    
                var div = $(this).parents('.slider-wrapper').find('.slider-handle')[0];
                
                var Tags_codigo = $(this).data('tag');
                var senioridade = autoAvaliacao.descricaoSenioridade(parseInt($(this).val()), Tags_codigo);
                var sliderColor = $(this).parents('.slider-wrapper').find('.slider-selection')[0];
                $(sliderColor).css('background', senioridade.cor);
                $(div).popover({
                    title: senioridade.titulo,
                    content: senioridade.texto,
                    trigger: 'hover',
                    placement: 'right',
                });
            });                
            
            $(document).on('change',".input-range", function (e) { 
                var div = $(this).parents('.slider-wrapper').find('.slider-handle')[0];
                var Tags_codigo = $(this).data('tag');
                var senioridade = autoAvaliacao.descricaoSenioridade(e.value.newValue, Tags_codigo);                  
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
    
            $('#btnvermais').addClass('d-none')
            loading.close();
        }, 'listarAvaliacaoTecnica');
    }
    
    this.descricaoSenioridade = function(numSenioridade, Tags_codigo){
        if(numSenioridade != 0){
            jsonTagsBanco.map(function(v, i){
                if(v.Tags_codigo == Tags_codigo){
                    if(v.senioridade != null){
                        texto = v.senioridade.filter(x => x.Senioridade == numSenioridade);
                        texto= texto[0].Descricao;
                    }
                }
            });
        }else{
            texto = 'Nenhum Conhecimento'
        }

        var titulo = (numSenioridade != 0 ? 'Nível ' + numSenioridade : '');
        var cor = autoAvaliacao.getCorSenioridade(numSenioridade);

        return {titulo, texto, cor};
    }

    this.isEquivalent = function(tagsForm, TagsBd){
        var jsonAlteracao = [];
        for (var i = 0; i < tagsForm.tags.length; i++) {
            for (var j = 0; j < TagsBd.length; j++){
                if(tagsForm.tags[i].Tags_codigo == TagsBd[j].Tags_codigo){                    
                    if(tagsForm.tags[i].autoAvaliacao['senioridade'] > 0){
                        tagsForm.tags[i].autoAvaliacao = [tagsForm.tags[i].autoAvaliacao];
                        jsonAlteracao.push(tagsForm.tags[i])
                    }
                }
            }
        }
        tagsForm.tags = jsonAlteracao;
        if(jsonAlteracao.length > 0){
            return true;
        }else{
            return false
        }
    }

    this.cadastrar = function () {
        var paramsCompetencia = [];
        var paramsTags = [];
        var newParamsTags = [];

        if(atualizacao_avaliacao == true){
            // autoAvaliacao.enviarEmail();
        }

        $('#bodyAvaliacao tr').each(function(){            
        var dateNow = moment().format("DD/MM/YYYY HH:mm:ss");
            if($(this).find('.input-range').data('tag') != undefined){
                var obj = {
                    senioridade: $(this).find('.input-range').val(),
                    estudo: $(this).find('input[name="Estudo"]').prop('checked') ? 'S' : 'N',
                    projeto: $(this).find('input[name="Projeto"]').prop('checked') ? 'S' : 'N',
                    data_alteracao: dateNow
                }

                var obj2 = {
                    Tags_codigo: $(this).find('.input-range').data('tag'),
                    Tags_tag: $(this).find('.input-range').data('name'),
                    autoAvaliacao: obj
                }               

                paramsTags.push(obj2);
            }
        });        

        for (let x = 0; x < paramsTags.length; x++) {
            for (let y = 0; y < jsonTagsBanco.length; y++) {
               if(paramsTags[x].Tags_codigo == jsonTagsBanco[y].Tags_codigo){
                    if(jsonTagsBanco[y].autoAvaliacao != null){
                        if(paramsTags[x].autoAvaliacao.senioridade !=  jsonTagsBanco[y].autoAvaliacao[0].senioridade){
                            newParamsTags.push(paramsTags[x])
                        }
                    }else{
                        if(paramsTags[x].autoAvaliacao.senioridade > 0){
                            newParamsTags.push(paramsTags[x])
                        }
                    }
                    break
               }                
            }           
        }

        $('#body-competencias .table-competencia').each(function(){
            var perguntas = [];
            $(this).find('tbody tr').each(function(){
                var obj = {
                    pergunta: $(this).find('.input-range-comp').data('name'),
                    resposta:  $(this).find('.input-range-comp').val(),
                }
                
                perguntas.push(obj);
            });

            var obj2 = {
                categoria: $(this).find('th .th-inner').html(),
                perguntas: perguntas
            }

            paramsCompetencia.push(obj2);
        });

        var params = [];
        // params = {tags: paramsTags, competencias: paramsCompetencia, codigoAtual}
        params = {tags: newParamsTags, competencias: paramsCompetencia, codigoAtual}

        if (0 != 0) {
            Swal.fire("Ops... !", 'Por favor preencha os campos necessários.', "warning");
        } else {
            var alteracao = autoAvaliacao.isEquivalent(params, jsonTagsBanco);
            
            if(alteracao){
                loading.open();                

                main.executarAPI('', 'INSERT', '', JSON.stringify(params), function (obj) {
                    if(obj.success) {
                        // if(obj.elements[0].resultado == parseInt(0)) {
                        if(obj.success) {
                            toastr.success("Dados cadastrados com sucesso.", "Sucesso!");
                            $(window).scrollTop(0)                            
                            dadosTags = []
                            autoAvaliacao.verificarAcesso();
                        } else {
                            toastr.error("Não foi possivel salvar os dados. Tente novamente ou entre em contato com o suporte!", "Ops... !");
                        }
                        loading.close();
                    }else{
                        toastr.error("Ocorreu um erro! Verifique sua conexão com a internet, e tente novamente mais tarde.", "Ops... !");
                        loading.close();
                    }
                }, 'cadastrarAvaliacaoTecnica');
            }
        }
    }

    this.getCorSenioridade = function(val){
        var cor = '';

        switch (val) {
            case 0:
                cor = '#ee1b24';     
            break;
            case 1:
                cor = '#ee1b24';
            break;
            case 2:
                cor = '#ee1b24';
            break;
            case 3:
                cor = '#f3701f';
            break;
            case 4:
                cor = '#f68f1c';
            break;
            case 5:
                cor = '#ffc10f';
            break;
            case 6:
                cor = '#fef100';
            break;
            case 7:
                cor = '#8ffd09';
            break;
            case 8:
                cor = '#00a990';
            break;
            case 9:
                cor = '#0093ce';
            break;
            default:
                cor = '#0093ce';
            break;
        }

        return cor;
    }

    this.getDadosSenioridade = function(val){
        var titulo = '';
        var texto = '';
        var cor = '';

        switch (val) {
            case 0:
                titulo = '';
                texto = 'Nenhum conhecimento'; 
                cor = '#ee1b24';     
            break;
            case 1:
                titulo = ' Nível 1';
                texto = 'Conhecimentos básicos adquiridos de forma acadêmica. Requer atenção antes, durante e ou finalizar as atividades por parte do Líder/Outro Colaborador.';    
                cor = '#ee1b24';
            break;
            case 2:
                titulo = 'Nível 2';
                texto = 'Capaz de realizar atividades de baixa complexidade. Pouco contato com atividades práticas. Requer auxilio de outro profissional para entendimento do escopo. Requer validação no produto entregue.';
                cor = '#ee1b24';
            break;
            case 3:
                titulo = 'Nível 3';
                texto = 'Já atuou em projetos. Requer acompanhamento de profissional nos produtos entregues.';
                cor = '#f3701f';
            break;
            case 4:
                titulo = 'Nível 4';
                texto = 'Já atuou em projetos. Capaz de realizar atividades de complexidade baixa de forma independente.';
                cor = '#f68f1c';
            break;
            case 5:
                titulo = 'Nível 5';
                texto = 'Consegue executar atividades de nível moderado de forma independente.';
                cor = '#ffc10f';
            break;
            case 6:
                titulo = 'Nível 6';
                texto = 'Pleno conhecimento das aplicações da Ferramenta/Linguagem. Encabeça atividades junto ao cliente.';
                cor = '#fef100';
            break;
            case 7:
                titulo = 'Nível 7';
                texto = 'Interpreta requisitos de forma independente. Experiência adquirida em vários projetos; Provê treinamentos internos. Gera conteúdo para capacitação de outros colaboradores.';
                cor = '#8ffd09';
            break;
            case 8:
                titulo = 'Nível 8';
                texto = 'Atua de forma independente. Participa de reuniões de forma ativa, capaz de sugerir soluções.';
                cor = '#00a990';
            break;
            case 9:
                titulo = 'Nível 9';
                texto = 'Certificado oficial de mercado. Representa a empresa em ações comerciais, através de Palestras Workshops e Treinamentos. Atua em questões de arquiteturas e soluções em suas especialidades.';
                cor = '#0093ce';
            break;        
            default:
                texto = 'Nenhum conhecimento';
                cor = '#0093ce';
            break;
        }

        return {titulo, texto, cor};
    }

    this.getDadosClass01 = function(val){
        var cor = '';

        switch (val) {
            case 'Data Developer':
                cor = 'color-senioridade-1';     
            break;
            case 'Data Visualization': 
                cor = 'color-senioridade-6';
            break;
            case 'Data Engineer': 
                cor = 'color-senioridade-8';
            break;
            case 'Data Scientist':
                cor = 'color-senioridade-9';
            break;
        }

        return cor;
    }

    this.getDadosCompetencia = function(val){
        var titulo = '';
        var texto = '';
        var cor = '';

        switch (val) {
            case 0:
                titulo = 'Nível 0 - Não Aplicável';
                texto = 'A completência não se aplica ou não se verifica.'; 
                cor = '#ee1b24';
            break;
            case 1:
                titulo = ' Nível 1 - Básico';
                texto = 'Demonstra poucas caracteristicas no domínio da competência. A ocorrência da competência é esporadicamente verificada.';    
                cor = '#f3701f';
            break;
            case 2:
                titulo = 'Nível 2 - Intermediário';
                texto = 'Demonstra domínio parcial da competência. A ocorrência efetiva da competência se verifica com frequência moderada.';
                cor = '#fef100';
            break;
            case 3:
                titulo = 'Nível 3 - Avançado';
                texto = 'Demonstra grande domínio da competência. Os atributos da competência são permanentemente demonstrados pelo profissional.';
                cor = '#8ffd09';
            break;
            case 4:
                titulo = 'Nível 4 - Referência';
                texto = 'Demonstra pleno e amplo domínio da competência: na prática, são percebidos todos os atributos característicos da competência de modo permanente. É considerado referência na competência.';
                cor = '#0093ce';
            break;
            default:
                titulo = 'Nível 0 - Não Aplicável';
                texto = 'A completência não se aplica ou não se verifica.'; 
                cor = '#ee1b24';  
            break;
        }

        return {titulo, texto, cor};
    }
    this.enviarEmail = function() {

        formData = new FormData();

        formData.append('colaborador', colaborador);
        formData.append('email', email);
        // formData.append('lider', lider);
        // formData.append('emailLider', emailLider);
        
        $.ajax({
			url: "../service/enviarEmail/index.php",
			type: "POST",
			data: formData,
			dataType: 'json',
			processData: false,  
			contentType: false,
			success: function(obj){  
                if(obj.success){
                    
                }else{                    
                    toastr.error("Não foi possível estabelecer uma conexão com o Banco de Dados. Verifique sua conexão com a internet, e recarregue a página novamente.", "Ops... !");               
                    
                }
            },
            error: function() {
              
                toastr.error("Não foi possível enviar o email. Tente Novamente ou entre em contato com o suporte.", "Ops... !");
            }
        });
        
    }
}
let autoAvaliacao = new AutoAvaliacaoTecnica();
autoAvaliacao.init();