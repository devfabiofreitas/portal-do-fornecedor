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
    <title>RH BlueShift</title>
    <meta charset="utf-8" />
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta content="" name="description" />
    <meta content="" name="author" />

    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/font-awesome/css/all.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/loading/loading.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet"
        href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/extensions/sticky-header/bootstrap-table-sticky-header.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-slider/css/bootstrap-slider.min.css">

    <link rel="stylesheet" href="<?php echo HTTP_SERVER ?>portal/css/style.css?1" />
    <link rel="stylesheet" href="<?php echo HTTP_SERVER ?>portal/modulos/autoAvaliacao/css/style.css?2" />
</head>

<body class="home">
    <div class="body-header">
        <div class="container-fluid header-pag py-2">
            <div class="row align-items-center">
                <div class="col-12 d-md-flex align-items-center justify-content-between">
                    <img src="../../../img/sidebar/Logo.svg" height="35">
                    <h4 class="mb-0"><span class="font-cairo-bold">Auto Avaliação</span></h4>
                </div>
            </div>
        </div>
    </div>

    <div id="main-body">
        <div class="container-fluid px-4 mt-3 mb-5 pb-3">
            <div>
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="px-5 px-md-2 bg-white border-radius">
                            <div id="resumoPerfil"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="body-perguntas"></div>

            <!-- <div class="accordion style-modal mt-3" id="accordionExample">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between py-2" id="headingOne">
                            <p class="mb-0">
                                <a href="javascript:void(0)" class="" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Avaliação Técnica
                                </a>
                            </p> -->
            <!-- <p class="mb-0">
                                <a href="javascript:void(0)" class="" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <i class="fa fa-chevron-down"></i>
                                </a>
                            </p>
                        </div> -->

            <!-- <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body p-0">
                    <div class="container-table">
                        <div id="avaliacao-tags" class="table-responsive table-container">
                            <table id="mainTable" class="table-bordered text-center mb-0" data-locale="pt-BR" data-sticky-header="true" data-sticky-header-offset-left="1.5rem" data-sticky-header-offset-right="1.5rem" data-sortable="true">
                                <thead></thead>
                                <tbody id="bodyAvaliacao"></tbody>
                            </table>
                        </div>
                    </div>
                </div> 
            </div> -->

         </div>
    </div>

    <footer class="salvar">
            <div class="btn-center">
                <button id="salvar" class="btn btn-success rounded-pill px-md-4 btn-save">
                    <span class="d-none d-md-inline">Salvar</span></button>
            </div>
        </footer>
    </div>

    <script>
    let httpServer = '<?php echo HTTP_SERVER; ?>';
    </script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/jquery/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/popper.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/loading/Loading.class.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/datetimepicker/js/moment-with-locales.js">
    </script>
    <script type="text/javascript"
        src="<?php echo HTTP_SERVER; ?>lib/datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/handlebars-v4.0.5/handlebars-v4.0.5.min.js">
    </script>
    <script src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/bootstrap-table.min.js"></script>
    <script
        src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/extensions/sticky-header/bootstrap-table-sticky-header.min.js">
    </script>
    <script src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/locale/bootstrap-table-pt-BR.min.js"></script>
    <script src="<?php echo HTTP_SERVER; ?>lib/bootstrap-slider/js/bootstrap-slider.min.js"></script>

    <script>
    var dataAtual = '<?php echo date("Y-m-d", strtotime('-3 hours', time()));; ?>';
    let codigo = '<?php echo $_GET['codigo']; ?>';
    let periodo = '<?php echo $_GET['periodo']; ?>';
    var usuarioAtual = '<?php echo $usuarioNome; ?>';
    var codigoAtual = '<?php echo $usuarioCodigo; ?>';
    </script>

    <script src="<?php echo HTTP_SERVER; ?>portal/js/main.js"></script>
    <script src="<?php echo HTTP_SERVER; ?>portal/modulos/autoAvaliacao/js/autoAvaliacao.js?2"></script>
    <script src="<?php echo HTTP_SERVER; ?>portal/modulos/autoAvaliacao/js/perguntas.js?1"></script>


    <script id="template-resumo-perfil" type="text/x-handlebars-template">
        {{#each elements}}
            <div class="d-md-flex align-items-center text-center text-md-left py-2 h-100">
                <div class="mr-md-3">
                    <div class="logo-in-table rounded-circle d-flex justify-content-center align-items-center m-auto">
                        <img src="https://clockify.azurewebsites.net/{{logo-in-table documentos 'Foto de Perfil'}}" class="img-fluid" alt="Foto do Consultor">
                    </div>
                </div>
                <div class="">
                    <div class="">
                        <div class="align-items-center text-center text-md-left">
                            <p class="mb-0 font-weight-bold">{{nome}} {{h_endereco cidade}}</p>
                            <p class="mb-0"><span class="font-weight-bold">Data de Inicio: </span>{{dataInicio}} - {{h_perido dataInicio}}</p>
                        </div>
                        <div class="">
                            <p class="mb-0"><span class="font-weight-bold">Quantidade de Projetos: </span>{{qtdProjetos}}</p>
                        </div>
                    </div>
                </div>
        {{/each}}
    </script>
</body>

</html>