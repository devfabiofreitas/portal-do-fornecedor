/**
 * Valida o arquivo recebido
 * Verifica a extensao pelo MIME_TYPE e o tamanho maximo do arquivo
 */
function validarArquivo(file) {
    var mime_types = ['application/pdf'];
    if (!mime_types.includes(file.type)) {
        return {
            'result': false,
            'message': 'Erro: tipo de arquivo não permitido - ' + file.name
        };
    }
    if (file.size > 3 * 1024 * 1024) {
        return {
            'result': false,
            'message': 'Erro: ultrapassou o limite de 3MB - ' + file.name
        };
    }

    return {'result': true};
}

function NotaFiscal() {
    this.init = async function () {

        /**
         * Mascaras
         */
        $('.mask-dinheiro').mask('###.##0,00', {reverse: true});
        $('#numeroNota').mask('000000000000000');
        $('#codigoServico').mask('ZZZZZZZZ', {
            translation: {
                Z: {pattern: /[0-9.]/}
            }
        });

        /**
         * daterangepicker e mascara para campos de data
         */
        $('.mask-data').daterangepicker({
            singleDatePicker: true,
            autoApply: false,
            locale: {
                format: "DD/MM/YYYY",
                firstDay: 0,
                cancelLabel: "Cancelar",
                applyLabel: "Aplicar",
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
        });
        $('.mask-data').mask('00/00/0000')

        /**
         * Vincula ao input upload-file
         * Exibe o arquivo enviado
         * Oculta o botao de envio
         */
        $('#upload-file').change(function() {
            var arquivoEnviado = this.files[0];
            var validacaoArquivo = validarArquivo(arquivoEnviado);
            
            if (validacaoArquivo.result) {
                $('#campo-upload').toggleClass('d-none');
                $('#resultado-upload').toggleClass('d-none');
                $('#resultado-upload-texto').text(arquivoEnviado.name);
            } else {
                Swal.fire({
                    title: "Arquivo Inválido!",
                    text: "Clique para começar novamente!",
                    showCancelButton: false,
                    confirmButtonColor: "#15CB76",
                    confirmButtonText: "Ok",
                    reverseButtons: false
                }).then((result) => {
                    if (result.value) {
                        $('#upload-file').val(null);
                    }
                });
            }
            
        });

        /**
         * Vincula ao botao 'X' (btn-remover-upload) da nota fiscal enviada
         * Confirma a remocao do arquivo enviado
         * Caso verdadeiro, remove o arquivo do formulario
         * e reexibe o botao de enviar
         */
        $('#btn-remover-upload').click(function() {
            Swal.fire({
                type: 'warning',
                title: "Excluir!",
                text: "Deseja realmente excluir esse arquivo?",
                showCancelButton: true,
                cancelButtonText: "Cancelar ",
                confirmButtonColor: "#dc3545 ",
                confirmButtonText: "Sim!",
                reverseButtons: true
            }).then(function(result) {
                if (result.value) {
                    $('#upload-file').val(null);
                    $('#campo-upload').toggleClass('d-none');
                    $('#resultado-upload').toggleClass('d-none');
                }
            });
        });

        /**
         * Alterna entre os dois tipos de template
         * Vincula ao dropdown tipoTemplate
         */
        $("#tipoTemplate").change(function () {
            // 
            // 
            if (this.value == "horistas") {
                $("#template-horista").toggleClass('d-none', false);
                $("#template-mensalista").toggleClass('d-none', true);
            } else {
                $("#template-horista").toggleClass('d-none', true);
                $("#template-mensalista").toggleClass('d-none', false);
            }
        })
    }
}

let notaFiscal = new NotaFiscal();
notaFiscal.init();
