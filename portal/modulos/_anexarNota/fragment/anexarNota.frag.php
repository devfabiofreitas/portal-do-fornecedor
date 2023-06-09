<?php
error_reporting(E_STRICT);
//header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
//header("Pragma: no-cache");
//header("Expires: 0");
session_start();
require_once('../../../../properties.inc.php');
require_once(DOFMW . '/Do.class.php');
require_once('../../controleAcesso/service/verificarSessao/index.php');
//require_once('../../controleAcesso/service/verificarSituacao/index.php');
$usuarioSessao = $do->getUserSession();
$usuarioCodigo = $usuarioSessao['codigo'];
$usuarioCnpj = $usuarioSessao['usuario'];
$usuarioLancamentoHoras = $usuarioSessao['lancamentoHoras'];
?>
<!DOCTYPE html>

<html lang="en">

    <head>
        <title>Portal do Fornecedor</title>
        <meta charset="utf-8" />
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta content="DoControl" name="author" />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content="0"> -->

        <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/font-awesome/css/all.min.css">
        <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/loading/loading.css">
        <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.css">
        <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/select2/select2.min.css">
        <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.css">
        <link rel="stylesheet"
            href="<?php echo HTTP_SERVER; ?>lib/jquery-smartwizard-master/dist/css/smart_wizard_all.min.css">
        <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/daterangepicker/css/daterangepicker.css">
        <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/css/style.css?5" />
        <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/css/home.css?3" />
        <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/modulos/anexarNota/css/style.css?1">

    </head>

    <body>
        <div class="container-fluid pt-4">
            <div class="body-header ">
                <div class="container-fluid header-pag py-2">
                    <div class="row">
                        <div class="header-global">
                            <h1 class="mb-0"><span class="font-cairo-bold">Anexar Notas</span></h1>
                        </div>
                    </div>
                </div>
            </div>
            <form id="formDados" class="formulario pb-0">
                <div class="row">
                    <!-- CAMPO CLIENTE/PROJETO (SELECT OU INPUT) -->
                    <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 form-group">
                        <label for="clienteProjeto">Cliente/Projeto <span class="text-danger">*</span></label>
                        <input class="form-control obrigatorio" placeholder='Para mais de um projeto, separe por ";"'
                            id="clienteProjeto" name="clienteProjeto" />
                    </div>
                    <!-- CAMPO NOME CONSULTOR -->
                    <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 form-group">
                        <label for="nome">Nome Consultor <span class="text-danger">*</span></label>
                        <input type="text" class="form-control obrigatorio" id="nome" name="nome" readonly />
                    </div>
                    <!-- CAMPO PERÍODO INICIO -->
                    <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 form-group">
                        <label for="periodoInicio">Período Inicio</label>
                        <input id="periodoInicio" class="form-control input-tipo-data periodo obrigatorio"
                            name="periodoInicio" />
                    </div>
                    <!-- CAMPO PERÍODO FIM -->
                    <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 form-group">
                        <label for="periodoFim">Período Fim</label>
                        <input id="periodoFim" class="form-control input-tipo-data periodo obrigatorio"
                            name="periodoFim" />
                    </div>
                    <!-- CAMPO VALOR -->
                    <div class="col-6 form-group">
                        <label for="valor">Valor<span class="text-danger">*</span></label>
                        <input type="text" class="form-control obrigatorio rounded-pill mask-dinheiro" id="valor"
                            name="valor" required data-error="Valor é necessário.">
                    </div>
                    <!-- CAMPO TOTAL DE HORAS REALIZADAS -->
                    <div class="col-3 form-group">
                        <label for="totalHorasRealiazadas">Total de Horas Realizadas<span
                                class="text-danger">*</span></label>
                        <input type="text" class="form-control obrigatorio" id="totalHorasRealiazadas"
                            name="totalHorasRealiazadas" readonly>
                    </div>

                    <div class="col-3 form-group">
                        <label for="horasUteis">Horas Úteis no Mês (Referência)</label>
                        <input type="text" class="form-control obrigatorio" id="horasUteis" name="horasUteis" readonly>
                    </div>

                    <div class="col-3 form-group">
                        <label for="numeroNota">Número da Nota<span class="text-danger">*</span></label>
                        <input type="number" class="form-control obrigatorio" id="numeroNota" name="numeroNota">
                    </div>

                    <div class="col-3 form-group">
                        <label for="dataEmissao">Data de Emissão<span class="text-danger">*</span></label>
                        <input id="dataEmissao" class="form-control input-tipo-data periodo obrigatorio"
                            name="dataEmissao" />
                    </div>

                    <div class="col-3 form-group">
                        <label for="codigoServico">Código de Serviço<span class="text-danger">*</span></label>
                        <input type="number" class="form-control obrigatorio" id="codigoServico" name="codigoServico">
                    </div>

                    <div class="col-3 form-group">
                        <label for="impostoRetido">Imposto Retido<span class="text-danger">*</span></label>
                        <select type="text" id="impostoRetido" name="impostoRetido"
                            class="form-control obrigatorio rounded-pill ">
                            <option value=""></option>
                            <option value="S">Sim</option>
                            <option value="N">Nao</option>
                        </select>
                    </div>

                    <!-- CAMPO BENEFICIÁRIO -->
                    <div class="col-6 form-group">
                        <label for="beneficiario">Beneficiário <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="beneficiario obrigatorio" name="beneficiario"
                            readonly>
                    </div>
                    <!-- CAMPO CNPJ -->
                    <div class="col-6 form-group">
                        <label for="cnpj">CNPJ <span class="text-danger">*</span></label>
                        <input type="text" class="form-control obrigatorio mask-cnpj rounded-pill obrigatorio" id="cnpj"
                            name="cnpj" readonly maxlength="18">
                    </div>
                    <!-- CAMPO BANCO -->
                    <div class="col-4 form-group">
                        <label for="clienteProjeto">Banco <span class="text-danger">*</span></label>
                        <input type="text" class="form-control obrigatorio rounded-pill obrigatorio" id="banco"
                            name="banco" readonly>
                    </div>
                    <!-- CAMPO AGÊNCIA -->
                    <div class="col-4 form-group">
                        <label for="agencia">Agência <span class="text-danger">*</span></label>
                        <input type="text" class="form-control obrigatorio rounded-pill obrigatorio" id="agencia"
                            name="agencia" readonly maxlength="4">
                    </div>
                    <!-- CAMPO CONTA -->
                    <div class="col-4 form-group">
                        <label for="conta">Conta <span class="text-danger">*</span></label>
                        <input type="text" class="form-control obrigatorio rounded-pill obrigatorio" id="conta"
                            name="conta" readonly maxlength="12">
                    </div>

                </div>
                <!-- CAMPO NOTA FISCAL -->
                <div class="row d-flex justify-content-center form-group">
                    <div id="notaFiscal" class="col-md-6 px-0 notaFiscalUpload" data-value="notaFiscal">
                        <div class="upload mb-5">
                            <label for="notaFiscal">Nota Fiscal <span class="text-danger">*</span></label>
                            <div class="area-upload">
                                <div class="area-upload-body position-relative campoUpload">
                                    <label for="upload-file" class="label-upload">
                                        <i class="fas fa-solid fa-file-arrow-up fa-3x"></i>
                                        <div class="texto">Clique ou arraste um arquivo <br> <span>Somente arquivo .pdf
                                                com no máx. 3MB</span></div>
                                    </label>
                                    <input type="file" class="inputUpload" accept=".pdf " id="upload-file" title="" />
                                </div>
                                <div class="lista-uploads row mt-3  col-md-12 com-sm-11"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <footer class="salvar">
                <button id="btnModaltemplate" class="btn  rounded-pill px-md-4 mr-1">Template</button>
                <button id="salvar" class="btn btn-success rounded-pill px-md-4 btn-save">Salvar</button>
            </footer>
        </div>

        <div class="modal fade" id="modaltemplate" tabindex="-1" role="dialog">
            <div class="modal-grande modal-dialog modal-dialog-scrollable modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header css-modal d-flex justify-content-center">
                        <h5 class="modal-title" id="exampleModalLabel">Template</h5>
                        <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.04" height="16.04"
                                viewBox="0 0 16.04 16.04">
                                <g id="Group_832" data-name="Group 832" transform="translate(-1302.98 -1186.98)">
                                    <line id="Line_90" data-name="Line 90" x2="11.09" y2="11.09"
                                        transform="translate(1305.455 1189.455)" fill="none" stroke="#fff"
                                        stroke-linecap="round" stroke-width="3.5" />
                                    <line id="Line_91" data-name="Line 91" x1="11.09" y2="11.09"
                                        transform="translate(1305.455 1189.455)" fill="none" stroke="#fff"
                                        stroke-linecap="round" stroke-width="3.5" />
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div class="modal-body overflow-x-hidden">
                        <div class="container">
                            <div class="row">
                                <div class="col-3">
                                    <label for="tipoTemplate">Tipo do template <span class="text-danger">*</span></label>
                                    <select type="text" class="form-control obrigatorio rounded-pill obrigatorio"
                                        id="tipoTemplate" name="tipoTemplate">
                                        <option value="horistas">Horistas</option>
                                        <option value="mensalistas">Mensalistas</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label for="template">Template <span class="text-danger">*</span></label>
                                    <textarea type="text" class="form-control obrigatorio rounded-pill obrigatorio" id="template" name="template" rows="15" cols="33" readonly></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <img src="../../../../../sis.blueshift.com.br/internetfiles/notas_fiscais/2022/"></img> -->
                    <div class="modal-footer pt-1 d-flex justify-content-center align-items-center">
                    <button type="button" id="sair" class="btn btn-secondary font-cairo-bold rounded-pill ml-1 px-4" data-dismiss="modal">
                        <span class="d-md-inline">Sair</span></button>
                    </button>
                </div>
            </div>
        </div>
        </div>

        <script>
            let httpServer = '<?php echo HTTP_SERVER; ?>';
        </script>
        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/jquery/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/jquery/jquery.mask.min.js"></script>
        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/popper.min.js"></script>
        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/popper/popper.min.js"></script>
        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.js"></script>
        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.js"></script>
        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/handlebars-v4.0.5/handlebars-v4.0.5.min.js">
        </script>
        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/loading/Loading.class.js"></script>
        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/font-awesome/js/solid.min.js"></script>
        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/font-awesome/js/fontawesome.min.js"></script>
        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/moment/moment-with-locales.min.js"></script>
        <script type="text/javascript"
            src="<?php echo HTTP_SERVER; ?>lib/daterangepicker/js/daterangepicker.min.js"></script>
        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>portal/js/main.js"></script>
        <script>
            let codigoUsuario = '<?php echo $usuarioCodigo; ?>';
            let usuarioCnpj = '<?php echo $usuarioCnpj; ?>';
            let usuarioLancamentoHoras = '<?php echo $usuarioLancamentoHoras; ?>';
            $(document).on("keyup change", ".mask-dinheiro", function () {
                $(this).mask('##.##0,00', {
                    reverse: true
                });
            });
        </script>
        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>portal/modulos/anexarNota/js/anexarNota.js?40">
        </script>
    </body>

</html>