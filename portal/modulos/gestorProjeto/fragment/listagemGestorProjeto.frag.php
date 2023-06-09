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
    <meta content="" name="description" />
    <meta content="" name="author" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/font-awesome/css/all.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/loading/loading.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/select2/select2.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/datetimepicker/css/bootstrap-datetimepicker.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/extensions/sticky-header/bootstrap-table-sticky-header.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/extensions/fixed-columns/bootstrap-table-fixed-columns.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/daterangepicker/css/daterangepicker.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/css/style.css?8">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/modulos/gestorProjeto/css/style.css?20">
</head>

<body class="home">
    <div class="container-fluid pt-4">
        <div class="body-header ">
            <div class="container-fluid header-pag py-2">
                <div class="row">
                    <div class="col-8 col-md-8">
                        <h1 class="mb-0 text-header"><span class="font-cairo-bold">Gestor/Projeto</span></h1>
                    </div>
                    <div class="col-4 col-md-4 filtro">
                        <div class="form-group d-none" id="filtroTimesheet">
                            <div class="d-md-flex justify-content-end container-reportrange">
                                <button type="button" data-toggle="modal" id="filtro" data-target="#modalFiltro" class="btn rounded-pill " style="background: #fff; cursor: pointer;  border: 1px solid #ccc;"><svg xmlns="http://www.w3.org/2000/svg" width="16.139" height="14.725" viewBox="0 0 16.139 14.725">
                                        <defs>
                                            <style>
                                                .filtroSvg {
                                                    fill: none;
                                                    stroke: black;
                                                    stroke-linecap: round;
                                                    stroke-linejoin: round;
                                                    stroke-width: 2px;
                                                }
                                            </style>
                                        </defs>
                                        <path class="filtroSvg" d="M17.139,4.5H3l5.656,6.688v4.623l2.828,1.414V11.188Z" transform="translate(-2 -3.5)" />
                                    </svg> <span class="d-none d-md-inline-block ml-md-1">Filtrar</span></button>
                                <span class="separador-vertical mx-2 mx-md-3"></span>
                                <input type="text" id="filtroInicio" name="inicio" class="form-control rounded-pill mask-data data d-none">
                                <div id="reportrange" style="background: #fff; cursor: pointer; padding: 3px 10px 3px 13px; border: 1px solid #ccc;" class="reportrange-hp">
                                    <i class=" fa fa-calendar"></i>&nbsp;
                                    <span id="span-daterange-hp"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="main-body">
            <div class="container-table  mt-2">
                <div class="table-responsive table-container container-fluid">
                    <table style="margin-bottom: 75px !important;" id="mainTable" class="text-center mb-0 table" data-show-header="true" data-sticky-header="true" data-locale="pt-BR" data-sticky-header-offset-left="1.5rem" data-sticky-header-offset-right="1.5rem" data-sortable="false" table-borderles="true">
                        <thead id="head">
                        </thead>
                        <tbody id="bodyGestorProjeto">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <footer>
            <button id="voltar" data-toggle="tooltip" data-placement="top" title="" class="btn btn-white d-none rounded-pill btn-eraser px-3 px-md-4 ml-2 ml-md-3" data-original-title="Voltar">
                <svg id="icon-voltar" xmlns="http://www.w3.org/2000/svg" width="20.561" height="14.487" viewBox="0 0 20.561 14.487">
                    <g id="back" transform="translate(0.311 -2.756)">
                        <g id="Group_882" data-name="Group 882">
                            <path id="Path_4627" fill="#fff" data-name="Path 4627" d="M15.033,7.059H1.41l2.864-3.21a.505.505,0,0,0-.754-.673L.295,6.791a1.16,1.16,0,0,0,0,1.545l3.226,3.616a.505.505,0,0,0,.754-.673L1.41,8.069H15.033a3.957,3.957,0,0,1,0,7.914H12.627a.505.505,0,1,0,0,1.01h2.405a4.967,4.967,0,1,0,0-9.935Z" stroke="#fff" stroke-width="0.5"></path>
                        </g>
                    </g>
                </svg>
            </button>
            <button id="voltarProjeto" data-toggle="tooltip" data-placement="top" title="" class="btn btn-white d-none rounded-pill btn-eraser px-3 px-md-4 ml-2 ml-md-3" data-original-title="Voltar">
                <svg id="icon-voltar" xmlns="http://www.w3.org/2000/svg" width="20.561" height="14.487" viewBox="0 0 20.561 14.487">
                    <g id="back" transform="translate(0.311 -2.756)">
                        <g id="Group_882" data-name="Group 882">
                            <path id="Path_4627" fill="#fff" data-name="Path 4627" d="M15.033,7.059H1.41l2.864-3.21a.505.505,0,0,0-.754-.673L.295,6.791a1.16,1.16,0,0,0,0,1.545l3.226,3.616a.505.505,0,0,0,.754-.673L1.41,8.069H15.033a3.957,3.957,0,0,1,0,7.914H12.627a.505.505,0,1,0,0,1.01h2.405a4.967,4.967,0,1,0,0-9.935Z" stroke="#fff" stroke-width="0.5"></path>
                        </g>
                    </g>
                </svg>
            </button>
        </footer>
    </div>
    <div class="modal filtro" id="modalFiltro" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Filtrar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                        <div class="form-row">
                            <div class="col-12 form-group">
                                <label for="filtroConsultor">Consultor </label>
                                <select type="text" id="filtroConsultor" name="Pessoa_codigo" class="form-control rounded-pill input-modal"></select>
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
    <div id="main-body-report" class="d-none">
        <div id="row-relatorio" class="row">
            <div class="container-chart flex-fl col-sm-12 col-lg-8">
                <div class="ctn-header">
                    <div class="ctn-header-item">
                        <span class="font-cairo-bold">Tempo Total</span>
                        <div id="horasTotais" class=" font-cairo-regular"></div>
                    </div>
                    <div class=" ctn-header-item">
                        <span class="font-cairo-bold">Parte Superior Projeto</span>
                        <div id="parteSuperiorProjeto" class="font-cairo-regular"></div>
                    </div>
                    <div class="ctn-header-item">
                        <span class="font-cairo-bold">Principal Cliente</span>
                        <div id="principalCliente" class="font-cairo-regular"></div>
                    </div>
                </div>

                <div class="body-container-chart">
                    <canvas id="chartTimesheet"></canvas>
                </div>
            </div>
            <div class="col-sm-12 col-lg-4">
                <div id="atividade-container">
                    <div class="ctn-header-atividades">
                        <span class="font-cairo-bold">Atividades Mais Registradas</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalVisualizarColaboradores" tabindex="-1" role="dialog">
        <div class=" modal-dialog-centered modal-dialog modal-dialog-scrollable modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header css-modal d-flex justify-content-center">
                    <h5 class="modal-title">Colaboradores</h5>
                </div>
                <div class="modal-body">
                    <div class="container-table mt-2">
                        <div class="table-responsive table-container">
                            <table id="mainTableColaboradores" class="text-center mb-0 table" data-show-header="true" data-sticky-header="true" data-locale="pt-BR" data-sticky-header-offset-left="1.5rem" data-sticky-header-offset-right="1.5rem" data-sortable="false" table-borderles="true">
                                <thead id="head">
                                </thead>
                                <tbody id="bodyColaboradores">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        let httpServer = '<?php echo HTTP_SERVER; ?>';
    </script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/jquery/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/popper.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/font-awesome/js/all.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/chartjs-3.8.0/js/chart.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/chartjs-3.8.0/js/chartjs-adapter.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/loading/Loading.class.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/select2/select2.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/handlebars-v4.0.5/handlebars-v4.0.5.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/datetimepicker/js/moment-with-locales.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/daterangepicker/js/daterangepicker.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/bootstrap-table.min.js"></script>
    <script>
        var dataAtual = '<?php echo date("Y-m-d", strtotime('-3 hours', time()));; ?>';
        var usuarioAtual = '<?php echo $usuarioNome; ?>';
        var codigoAtual = '<?php echo $usuarioCodigo; ?>';
    </script>
    <script src="<?php echo HTTP_SERVER; ?>portal/js/main.js?1"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>portal/modulos/gestorProjeto/js/logicaReport_function.js?10"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>portal/modulos/gestorProjeto/js/reportTimesheet_function.js?20"></script>
    <script src="<?php echo HTTP_SERVER; ?>portal/modulos/gestorProjeto/js/gestorProjeto.js?8"></script>
</body>

</html>