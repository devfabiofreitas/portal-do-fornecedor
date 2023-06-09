<!DOCTYPE html>
<html lang="en">

    <head>
        <title>Portal do Fornecedor</title>
        <meta charset="utf-8" />

        <link rel="stylesheet" href="<?= HTTP_SERVER ?>lib/bootstrap-4.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="<?= HTTP_SERVER ?>lib/font-awesome/css/all.min.css">
        <link rel="stylesheet" href="<?= HTTP_SERVER ?>lib/loading/loading.css">
        <link rel="stylesheet" href="<?= HTTP_SERVER ?>lib/sweetalert/sweetalert2.min.css">
        <link rel="stylesheet" href="<?= HTTP_SERVER ?>lib/daterangepicker/css/daterangepicker.css">
        <link rel="stylesheet" href="<?= HTTP_SERVER ?>portal/css/style.css?1003" />
        <link rel="stylesheet" href="<?= HTTP_SERVER ?>portal/css/home.css?1003" />
        <link rel="stylesheet" href="css/style.css?1003">

        <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/jquery/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/jquery/jquery.mask.min.js"></script>
        <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/bootstrap-4.4.1/js/popper.min.js"></script>
        <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/popper/popper.min.js"></script>
        <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/bootstrap-4.4.1/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/sweetalert/sweetalert2.min.js"></script>
        <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/font-awesome/js/solid.min.js"></script>
        <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/font-awesome/js/fontawesome.min.js"></script>
        <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/moment/moment-with-locales.min.js"></script>
        <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/daterangepicker/js/daterangepicker.min.js"></script>

        <script>
            let httpServer = '<?= HTTP_SERVER ?>';
        </script>
        <script defer type="text/javascript" src="<?= HTTP_SERVER ?>lib/loading/Loading.class.js"></script>
        <script defer type="text/javascript" src="<?= HTTP_SERVER ?>lib/lottie-player/lottie-player.js"></script>

        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>portal/js/main.js"></script>
        <script defer type="text/javascript" src="js/anexarNota.js?20230410"></script>
    </head>

    <body>
        <!-- Alertas da validacao da nota fiscal  -->
        <script>
            <?= $alerta_swal ?>
            <?= $alerta_atraso ?>
        </script>
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
            <form id="formDados" class="formulario pb-0" action="anexarNota.php" method="POST" enctype="multipart/form-data" onsubmit="loading.open();">
                <div class="row">
                    <!-- CAMPO CLIENTE/PROJETO (SELECT OU INPUT) -->
                    <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 form-group">
                        <label for="clienteProjeto">Cliente/Projeto <span class="text-danger">*</span></label>
                        <input class="form-control" placeholder='Para mais de um projeto, separe por ";"'
                            id="clienteProjeto" name="clienteProjeto" required/>
                    </div>
                    <!-- CAMPO NOME CONSULTOR -->
                    <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 form-group">
                        <label for="nome">Nome Consultor <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="nome" name="nome" value="<?= $info_consultor['nome'] ?>" readonly required/>
                    </div>
                    <!-- CAMPO PERÍODO INICIO -->
                    <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 form-group">
                        <label for="periodoInicio">Período Inicio</label>
                        <input id="periodoInicio"  class="periodo form-control mask-data" type="text"
                            name="periodoInicio" value="<?= $data_periodo_inicio_formatada ?>" required/>
                    </div>
                    <!-- CAMPO PERÍODO FIM -->
                    <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 form-group">
                        <label for="periodoFim">Período Fim</label>
                        <input id="periodoFim"  class="periodo form-control mask-data" type="text"
                            name="periodoFim" value="<?= $data_periodo_fim_formatada ?>" required/>
                    </div>
                    <!-- CAMPO VALOR -->
                    <div class="col-6 form-group">
                        <label for="valor">Valor<span class="text-danger">*</span></label>
                        <input type="text" class="form-control rounded-pill mask-dinheiro" id="valor"
                            name="valor" required>
                    </div>
                    <!-- CAMPO TOTAL DE HORAS REALIZADAS -->
                    <div class="col-3 form-group">
                        <label for="totalHorasRealizadas">Total de Horas Realizadas
                            <span class="text-danger">*</span>
                        </label>
                        <input type="text" class="form-control" id="totalHorasRealizadas"
                            name="totalHorasRealizadas" value="<?= $horas_trabalhadas ?>"
                            <?= ($info_consultor['lancamentoHoras']) == 'H' ? 'readonly' : '' ?>
                            required
                        >
                    </div>

                    <div class="col-3 form-group">
                        <label for="horasUteis">Horas Úteis no Mês (Referência)</label>
                        <input type="text" class="form-control obrigatorio" id="horasUteis" name="horasUteis" 
                            value="<?= $horas_uteis . ':00' ?>" readonly required>
                    </div>

                    <div class="col-3 form-group">
                        <label for="dataEmissao">Data de Emissão<span class="text-danger">*</span></label>
                        <input id="dataEmissao" class="form-control mask-data" type="text" name="dataEmissao" required/>
                    </div>

                    <div class="col-3 form-group">
                        <label for="numeroNota">
                            Número da Nota
                            <span class="text-danger">*</span>
                            <i class="fa-solid fa-circle-info" title="Normalmente é um número inteiro e sequencial. Ex.: 57&#10;Não é necessário inserir zeros à esquerda. Ex.: 00000057 = 57"></i>
                        </label>
                        <input type="text" class="form-control" id="numeroNota" name="numeroNota" placeholder="Ex.: 57" required>
                    </div>

                    <div class="col-3 form-group">
                        <label for="codigoServico">
                            Código de Serviço
                            <span class="text-danger">*</span>
                            <i class="fa-solid fa-circle-info" title="Código de descrição do serviço prestado"></i>
                        </label>
                        <input type="text" class="form-control" id="codigoServico" name="codigoServico" placeholder="Ex.: 14.02" required>
                    </div>

                    <div class="col-3 form-group">
                        <label for="impostoRetido">
                            Imposto Retido
                            <span class="text-danger">*</span>
                            <i class="fa-solid fa-circle-info" title="Marque 'Sim' apenas se sua empresa está em regime de lucro presumido.&#10;Para mais informações procure o setor responsável."></i>
                        </label>
                        <select type="text" id="impostoRetido" name="impostoRetido"
                            class="form-control rounded-pill" required>
                            <option value="N">Não</option>
                            <option value="S">Sim</option>
                            
                        </select>
                    </div>

                    <!-- CAMPO BENEFICIÁRIO -->
                    <div class="col-6 form-group">
                        <label for="beneficiario">Beneficiário <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="beneficiario" name="beneficiario"
                            value="<?= $info_consultor['beneficiario'] ?>" readonly required>
                    </div>
                    <!-- CAMPO CNPJ -->
                    <div class="col-6 form-group">
                        <label for="cnpj">CNPJ <span class="text-danger">*</span></label>
                        <input type="text" class="form-control mask-cnpj rounded-pill" id="cnpj"
                            name="cnpj" value="<?= $info_consultor['cnpj'] ?>" readonly maxlength="18" required>
                    </div>
                    <!-- CAMPO BANCO -->
                    <div class="col-4 form-group">
                        <label for="clienteProjeto">Banco <span class="text-danger">*</span></label>
                        <input type="text" class="form-control rounded-pill" id="banco"
                            name="banco" value="<?= $info_consultor['banco'] ?>" readonly required>
                    </div>
                    <!-- CAMPO AGÊNCIA -->
                    <div class="col-4 form-group">
                        <label for="agencia">Agência <span class="text-danger">*</span></label>
                        <input type="text" class="form-control rounded-pill" id="agencia"
                            name="agencia" value="<?= $info_consultor['agencia'] . '-' . $info_consultor['digitoAgencia'] ?>" 
                            readonly maxlength="4" required >
                    </div>
                    <!-- CAMPO CONTA -->
                    <div class="col-4 form-group">
                        <label for="conta">Conta <span class="text-danger">*</span></label>
                        <input type="text" class="form-control rounded-pill" id="conta"
                            name="conta" value="<?= $info_consultor['conta'] . '-' . $info_consultor['digitoConta'] ?>" 
                            readonly maxlength="12" required >
                    </div>

                </div>
                <!-- CAMPO NOTA FISCAL -->
                <div class="row d-flex justify-content-center form-group">
                    <div id="notaFiscal" class="col-sm-12 col-md-6 col-lg-4 px-0 notaFiscalUpload" data-value="notaFiscal">
                        <div class="upload mb-5">
                            <label for="notaFiscal">Nota Fiscal <span class="text-danger">*</span></label>
                            <div class="area-upload">
                                <div class="area-upload-body position-relative" id="campo-upload">
                                    <label for="upload-file" class="label-upload">
                                        <i class="fas fa-solid fa-file-arrow-up fa-3x"></i>
                                        <div class="texto">
                                            Clique ou arraste um arquivo <br>
                                            <span>
                                                Somente arquivos .pdf com no máx. 3MB
                                            </span>
                                        </div>
                                    </label>
                                    <input type="file" accept=".pdf " id="upload-file" name="arquivosUploadNotaFiscal[]" required/>
                                </div>
                                <div id="resultado-upload" class="d-none">
                                    <div class="d-flex mt-3 justify-content-between">
                                        <div>
                                            <i class="fas fa-file-pdf pr-2 fa-lg" ></i>
                                            <span id="resultado-upload-texto"></span>
                                        </div>
                                        <button type="button" class="btn btn-flat m-0 p-0" id="btn-remover-upload">
                                            <i class="fas fa-times fa-lg"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="salvar">
                    <input type="hidden" name="codigoEmpresa" id="codigoEmpresa" value="<?= $codigo_empresa ?>">
                    <button type="button" id="btnModaltemplate" class="btn rounded-pill px-md-4 mr-1" data-toggle="modal" data-target="#modaltemplate">Template</button>
                    <button type="submit" id="salvar" class="btn btn-success rounded-pill px-md-4 btn-save" name="action" value="uploadNotaFiscal">
                        Salvar
                    </button>
                </footer>
            </form>
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
                                    <textarea type="text" class="form-control obrigatorio rounded-pill obrigatorio" id="template-horista" name="template" rows="15" cols="33" readonly>
                                        <?= $template_nota_fiscal['horista'] ?>
                                    </textarea>
                                    <textarea type="text" class="form-control obrigatorio rounded-pill obrigatorio d-none" id="template-mensalista" name="template" rows="15" cols="33" readonly>
                                        <?= $template_nota_fiscal['mensalista'] ?>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer pt-1 d-flex justify-content-center align-items-center">
                        <button type="button" id="sair" class="btn btn-secondary font-cairo-bold rounded-pill ml-1 px-4" data-dismiss="modal">
                            <span class="d-md-inline">Sair</span></button>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>