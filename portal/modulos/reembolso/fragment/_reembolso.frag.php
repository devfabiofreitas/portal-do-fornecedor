<?php
error_reporting(E_STRICT);
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");
session_start();
require_once('../../../../properties.inc.php');
require_once(DOFMW . '/Do.class.php');
require_once('../../controleAcesso/service/verificarSessao/index.php');
$usuarioSessao = $do->getUserSession();
$usuarioNome = $usuarioSessao['nome'];
$usuarioCodigo = $usuarioSessao['codigo'];
?>
<!DOCTYPE html>

<html lang="en">

<head>
  <title>Portal do Fornecedor</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta content="DoControl" name="author" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">

  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/font-awesome/css/all.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/loading/loading.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/bootstrap-table.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/extensions/sticky-header/bootstrap-table-sticky-header.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/extensions/fixed-columns/bootstrap-table-fixed-columns.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/css/style.css?20" />
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/modulos/reembolso/css/style.css?20" />

</head>

<body class="home">
  <div class="content">
    <div class="header d-flex justify-content-between">
      <div class="container-fluid header-pag py-2">
        <div class="row align-items-center">
          <div class="col-lg-12 col-xg-12 col-md-12 col-sm-12 d-md-flex content-title">
            <h1 id="linkHorasProjeto" class="mb-0 linkTimesheet span-black font-cairo-bold">Reembolso
            </h1>
          </div>
          <div class="row col-lg-12 col-xg-12 col-md-12 col-sm-12 d-flex d-flex-row mt-3">
            <div id="div-form-daterange" class="col-lg-6 col-xg-6 col-md-6 col-sm-4 col-2">
            </div>
            <div class="col-lg-6 col-xg-6 col-md-6 col-sm-8  col-10 flex-fl justify-content-end">
              <div id="container-buttons-table" class="d-flex">
                <div id="toolbar float-right" class="mt-2 mb-3">
                  <button type="button" id="newTimesheet" class="btn btn-timesheet btn-outline-success">
                    NOVO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="main-body">
      <div id="activeFilters" class="container-fluid py-2 d-flex align-items-center">
      </div>
      <div class="container-fluid CardParaTabela">
        <div class="container-table">
          <div id="divMainTable" class="table-responsive table-container">
          </div>
          <table id="mainTable" data-pagination-h-align="left" data-pagination="true" table-borderless="true" data-show-header="true" data-click-to-select="true" data-toolbar="#toolbar" data-locale="pt-BR" data-sticky-header="false" data-sticky-header-offset-left="3.5rem" data-sticky-header-offset-right="3.5rem" class="table-borderless
">
            <tbody id="bodyReembolso">
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <div class="container-fluid px-4 TabelaParaCard d-none">
      <div id="bodyCard" class="row pb-3">
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalCadastro" tabindex="-1" role="dialog">
    <div class="modal-grande modal-dialog modal-dialog-scrollable modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header css-modal d-flex justify-content-center">
          <h5 class="modal-title" id="exampleModalLabel">Reembolso</h5>
          <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="16.04" height="16.04" viewBox="0 0 16.04 16.04">
              <g id="Group_832" data-name="Group 832" transform="translate(-1302.98 -1186.98)">
                <line id="Line_90" data-name="Line 90" x2="11.09" y2="11.09" transform="translate(1305.455 1189.455)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3.5" />
                <line id="Line_91" data-name="Line 91" x1="11.09" y2="11.09" transform="translate(1305.455 1189.455)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3.5" />
              </g>
            </svg>
          </button>
        </div>
        <div class="modal-body overflow-x-hidden">
          <div id="bodymodalCadastro" class="style-modal">
            <form id="formDados">
              <div class="card-body body-dados-multiplos-2 pb-1">
                <div id="ocorrencias" class="form-row">
                  <div class="col-12 border-b-grey ocorrencia-container container-body px-2 pl-sm-3 pt-2 d-sm-flex align-items-center">
                    <div class="body-multi-content px-0">
                      <div class="form-row">
                        <input type="hidden" id="codigo">


                        <div class="col-md-4 form-group tipoItem ">
                          <label for="Description">Item<span class="text-danger">*</span></label>
                          <select type="text" id="tipoItem" name="tipoItem" class="form-control obrigatorio rounded-pill">
                            <option value="">Selecione</option>
                            <option value="MC">Mesa + Cadeira</option>
                            <option value="M">Mesa</option>
                            <option value="C">Cadeira</option>
                          </select>
                        </div>

                        <div class="col-md-6 form-group d-none item">
                          <label for="item">Item <span class="text-danger">*</span></label>
                          <input type="text" id="item" name="item" class="time-picker form-control rounded-pill number">
                        </div>

                        <div class="col-md-12 mt-3">
                          <h3>Dados Bancários (Pessoa Física)</h3>
                        </div>

                        <div class="col-md-4 form-group">
                          <label for="bancoNumero">Banco <span class="text-danger">*</span></label>
                          <select type="text" name="bancoNumero" class="bancoNumero form-control colaborador form-control obrigatorio rounded-pill ">
                          </select>
                        </div>

                        <div class="col-3 col-sm-4 col-md-4 col-lg-2 col-xl-2 form-group body-db d-none">
                          <input type="text" id="banco" name="banco" class="banco form-control rounded-pill">
                        </div>

                        <div class="col-md-2 form-group">
                          <label for="agencia">Agência<span class="text-danger">*</span> </label>
                          <input type="text" id="agencia" name="agencia" class="time-picker agencia form-control obrigatorio rounded-pill number" maxlength="4">
                        </div>

                        <div class="col-md-2 form-group">
                          <label for="agenciaDigito">Dígito Agencia</label>
                          <input type="text" id="agenciaDigito" name="agenciaDigito" class="agenciaDigito time-picker form-control obrigatorio number  rounded-pill" maxlength="1">
                        </div>

                        <div class="col-md-2 form-group">
                          <label for="conta">Conta<span class="text-danger">*</span> </label>
                          <input type="text" id="conta" name="conta" class="time-picker form-control obrigatorio number rounded-pill" maxlength="12">
                        </div>

                        <div class="col-md-2 form-group">
                          <label for="contaDigito">Dígito Conta<span class="text-danger">*</span> </label>
                          <input type="text" id="contaDigito" name="contaDigito" class="time-picker form-control obrigatorio number rounded-pill" maxlength="1">
                        </div>


                        <div class="col-md-12 form-group mt-3">
                          <div id="notaFiscal" class="col-md-6 px-0 notaFiscalUpload" data-value="notaFiscal">
                            <div class="upload mb-5">
                              <label for="notaFiscal">Nota Fiscal<span class="text-danger">*</span></label>
                              <div class="divLinkNota" class="d-none">
                                <a id="linkNotaFiscal" target="_blank"><i class="fas fa-file-pdf" style="color: #ea4b4b;font-size: 20px;"></i></a>
                              </div>
                              <div class="area-upload">
                                <div class="area-upload-body position-relative">
                                  <label for="uploadFile" class="label-upload">
                                    <i class="fas fa-solid fa-file-arrow-up fa-3x"></i>
                                    <div class="texto">Clique ou arraste um arquivo <br> <span>Somente arquivo .xml e .pdf com no máx. 3MB</span></div>
                                  </label>
                                  <input type="file" class="inputUpload obrigatorio" accept=".xml,.pdf " id="uploadFile" title="" />
                                </div>
                                <div class="lista-uploads row mt-3  col-md-12 com-sm-11"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- <div class="modal-footer pt-1 d-flex justify-content-center align-items-center">
                    <button type="button" id="sair" class="btn btn-secondary font-cairo-bold rounded-pill ml-1 px-4" data-dismiss="modal">
                        <svg id="icon-cancelar" xmlns="http://www.w3.org/2000/svg" width="21.97" height="21.97" viewBox="0 0 21.97 21.97">
                            <path id="Icon_metro-cancel" data-name="Icon metro-cancel" d="M13.556,1.928A10.985,10.985,0,1,0,24.54,12.913,10.985,10.985,0,0,0,13.556,1.928Zm0,19.91a8.925,8.925,0,1,1,8.925-8.925,8.925,8.925,0,0,1-8.925,8.925ZM16.988,7.42l-3.433,3.433L10.123,7.42,8.063,9.48,11.5,12.913,8.063,16.346l2.06,2.06,3.433-3.433,3.433,3.433,2.06-2.06-3.433-3.433L19.048,9.48Z" transform="translate(-2.571 -1.928)" fill="#fff"></path>
                        </svg>
                    </button> -->

        <div class="modal-footer pt-1 d-flex justify-content-center align-items-center">
          <button type="button" id="sair" class="btn btn-secondary font-cairo-bold rounded-pill ml-1 px-4" data-dismiss="modal">
            <span class="d-none d-md-inline">CANCELAR</span></button>
          </button>

          <div class="btn-center">
            <button id="salvar" class="btn btn-success rounded-pill px-md-4 btn-save">
              <span class="d-none d-md-inline">CONFIRMAR</span></button>
          </div>

          <button id="alterar" data-toggle="tooltip" data-placement="top" title="Salvar" class="btn btn-blue rounded-pill px-md-4 btn-pen d-none">
            <svg id="icon-salvar" xmlns="http://www.w3.org/2000/svg" width="19.982" height="19.982" viewBox="0 0 19.982 19.982">
              <g id="Icon_feather-save" data-name="Icon feather-save" transform="translate(-3.5 -3.5)">
                <path id="Path_1486" data-name="Path 1486" d="M20.484,22.482H6.5a2,2,0,0,1-2-2V6.5a2,2,0,0,1,2-2H17.487l4.995,4.995V20.484A2,2,0,0,1,20.484,22.482Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                <path id="Path_1487" data-name="Path 1487" d="M20.49,27.492V19.5H10.5v7.992" transform="translate(-2.004 -5.01)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                <path id="Path_1488" data-name="Path 1488" d="M10.5,4.5V9.495h7.992" transform="translate(-2.004)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal filtro" id="modalFiltro" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close d-none" data-dismiss="modal" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="16.04" height="16.04" viewBox="0 0 16.04 16.04">
              <g id="Group_832" data-name="Group 832" transform="translate(-1302.98 -1186.98)">
                <line id="Line_90" data-name="Line 90" x2="11.09" y2="11.09" transform="translate(1305.455 1189.455)" fill="none" stroke="#2CABE0" stroke-linecap="round" stroke-width="3.5" />
                <line id="Line_91" data-name="Line 91" x1="11.09" y2="11.09" transform="translate(1305.455 1189.455)" fill="none" stroke="#2CABE0" stroke-linecap="round" stroke-width="3.5" />
              </g>
            </svg>
          </button>
        </div>
        <div class="modal-body bg-white">
          <form id="formFiltro">
            <div class="col-12 form-group">
              <label>Período</label>
              <div class="d-md-flex align-items-center">
                <div class="">
                  <input type="text" id="filtroInicio" name="inicio" class="form-control rounded-pill mask-data data">
                </div>
                <div class="text-center mx-2">
                  <p class="mb-0 font-weight-bold">à</p>
                </div>
                <div class="td-edit date-fim direction-left">
                  <input type="text" id="filtroFim" name="fim" class="form-control direction-right rounded-pill mask-data data">
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button id="limparFiltro" type="button" class="btn btn-secondary rounded-pill px-md-4 btn-clean">
            <svg id="icon-limpar" xmlns="http://www.w3.org/2000/svg" width="20" height="19.999" viewBox="0 0 20 19.999">
              <g id="eraser" transform="translate(0 -0.001)">
                <g id="Group_862" data-name="Group 862">
                  <path fill="#fff" stroke="#fff" id="Path_4584" data-name="Path 4584" d="M20,6.818a2.328,2.328,0,0,0-.688-1.658L14.831.685a2.347,2.347,0,0,0-3.313,0L.687,11.525a2.344,2.344,0,0,0,0,3.317l4.483,4.473A2.336,2.336,0,0,0,6.826,20h.035v0H18.4V18.437H9.359l9.954-9.96A2.328,2.328,0,0,0,20,6.818ZM7.378,18.208a.782.782,0,0,1-1.1,0L1.792,13.736a.781.781,0,0,1,0-1.106L6.936,7.482l5.586,5.579ZM18.208,7.372l-4.581,4.584L8.04,6.377,12.623,1.79a.782.782,0,0,1,1.1,0l4.481,4.475a.781.781,0,0,1,0,1.106Z" />
                </g>
              </g>
            </svg>
            <span class="d-none ml-1 d-md-inline">Limpar</span>
          </button>
          <button id="buscar" type="button" class="btn btn-blue btn-search text-white rounded-pill px-md-4">
            <svg id="icon-buscar" xmlns="http://www.w3.org/2000/svg" width="20.547" height="20.5" viewBox="0 0 20.547 20.5">
              <g id="search" transform="translate(0.242 0.25)">
                <path id="Path_4585" data-name="Path 4585" d="M8.244,16.472a8.236,8.236,0,1,1,8.236-8.236A8.245,8.245,0,0,1,8.244,16.472Zm0-14.91a6.675,6.675,0,1,0,6.675,6.675A6.682,6.682,0,0,0,8.244,1.561Zm11.52,18.21a.781.781,0,0,0,0-1.1L16.27,15.174a.781.781,0,0,0-1.1,1.1l3.493,3.493a.781.781,0,0,0,1.1,0Z" fill="#fff" stroke="#fff" stroke-width="0.5" />
              </g>
            </svg>
            <span class="d-none ml-1 d-md-inline">Buscar</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
</body>

<script>
  let httpServer = '<?php echo HTTP_SERVER; ?>';
</script>

<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/jquery/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/popper.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/jquery/jquery.mask.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/lottie-player/lottie-player.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/moment/moment-with-locales.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/loading/Loading.class.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/handlebars-v4.0.5/handlebars-v4.0.5.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/bootstrap-table.min.js"></script>

<script>
  var dataAtual = '<?php echo date("Y-m-d", strtotime('-3 hours', time()));; ?>';
  var usuarioAtual = '<?php echo $usuarioNome; ?>';
  var codigoAtual = '<?php echo $usuarioCodigo; ?>';
</script>

<script src="<?php echo HTTP_SERVER; ?>portal/js/main.js?2"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>portal/modulos/reembolso/js/reembolso_function.js?25">

</script>

</body>

</html>