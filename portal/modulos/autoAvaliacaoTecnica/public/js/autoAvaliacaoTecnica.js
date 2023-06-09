/**
 * Descrições de cada nível de senioridade
 */
const descricaoSenioridade = {
    0: {titulo: 'Nível 0', cor: '#ee1b24', descricao: 'Sem conhecimento'},
    1: {titulo: 'Nível 1', cor: '#ee1b24', descricao: 'Conhecimentos básicos adquiridos de forma acadêmica. Requer atenção antes, durante e ou finalizar as atividades por parte do Líder/Outro Colaborador.'},
    2: {titulo: 'Nível 2', cor: '#ee1b24', descricao: 'Capaz de realizar atividades de baixa complexidade. Pouco contato com atividades práticas. Requer auxilio de outro profissional para entendimento do escopo. Requer validação no produto entregue.'},
    3: {titulo: 'Nível 3', cor: '#f3701f', descricao: 'Já atuou em projetos. Requer acompanhamento de profissional nos produtos entregues.'},
    4: {titulo: 'Nível 4', cor: '#f68f1c', descricao: 'Já atuou em projetos. Capaz de realizar atividades de complexidade baixa de forma independente.'},
    5: {titulo: 'Nível 5', cor: '#ffc10f', descricao: 'Consegue executar atividades de nível moderado de forma independente.'},
    6: {titulo: 'Nível 6', cor: '#fef100', descricao: 'Pleno conhecimento das aplicações da ferramenta/linguagem. Encabeça atividades junto ao cliente.'},
    7: {titulo: 'Nível 7', cor: '#8ffd09', descricao: 'Interpreta requisitos de forma independente. Experiência adquirida em vários projetos; Provê treinamentos internos. Gera conteúdo para capacitação de outros colaboradores.'},
    8: {titulo: 'Nível 8', cor: '#00a990', descricao: 'Atua de forma independente. Participa de reuniões de forma ativa, capaz de sugerir soluções.'},
    9: {titulo: 'Nível 9', cor: '#0093ce', descricao: 'Certificado oficial de mercado. Representa a empresa em ações comerciais, através de Palestras Workshops e Treinamentos. Atua em questões de arquiteturas e soluções em suas especialidades.'}
}

/**
 * Exibe a tabela depois de carregada
 */
$('#container-auto-avaliacao').toggleClass('d-none');

/**
 * Inicializa o plugin bootstrapTable na tabela de tags
*/
$('#tableListagemTags').bootstrapTable({});

/**
 * Inicializa o plugin bootstrapSlider para cada slider dentro da tabela de tags
 */
$('.input-range').each(function() {
    $(this).slider({});
    const wrapper = $(this).parents('.slider-wrapper').find('.slider-handle')[0];

    $(wrapper).popover({
        title: descricaoSenioridade[0].titulo,
        content: descricaoSenioridade[0].descricao,
        trigger: 'hover',
        placement: 'right'
    });
})

$('#salvar').click(function () {
   loading.open();
});

/**
 * Altera a descrição da senioridade e cor do slider
 */
$('.input-range').on('change', function(e) {
    const valorInput = e.value != null ? e.value.newValue : this.value;
    const nivelSenioridade = descricaoSenioridade[valorInput];

    const wrapper = $(this).parents('.slider-wrapper');
    const handle = wrapper.find('.slider-handle').first();
    const slider = wrapper.find('.slider-selection').first()

    slider.css('background', nivelSenioridade.cor);
    handle.popover('dispose');
    handle.popover({
        title: nivelSenioridade.titulo,
        content: nivelSenioridade.descricao,
        trigger: 'hover',
        placement: 'right'
    });
})

/**
 * Ativa o evento 'change' pra forçar a mudança de
 * descrição e cor depois da página carregar
 */
$('.input-range').each(function() {
    $(this).trigger('change');
})


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