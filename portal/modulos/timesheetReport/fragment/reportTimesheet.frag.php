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
  <meta name="viewport"
    content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
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
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/select2/select2.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/daterangepicker/css/daterangepicker.css">
  <link rel="stylesheet"
    href="<?php echo HTTP_SERVER; ?>lib/jquery-smartwizard-master/dist/css/smart_wizard_all.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/css/style.css?20" />
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/modulos/timesheetReport/css/style.css?20" />
  <link href="https://unpkg.com/bootstrap-table@1.20.2/dist/extensions/group-by-v2/bootstrap-table-group-by.css"
    rel="stylesheet">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/bootstrap-table.min.css">
  <link rel="stylesheet"
    href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/extensions/sticky-header/bootstrap-table-sticky-header.min.css">
  <link rel="stylesheet"
    href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/extensions/fixed-columns/bootstrap-table-fixed-columns.min.css">

</head>

<body class="home">
  <div class="content">
    <div class="header d-flex justify-content-between">
      <div class="container-fluid header-pag py-2">
        <div class="row align-items-center">
          <div class="col-12 d-md-flex content-title">
            <h1 class="mb-0 span-black font-cairo-bold  linkTimesheet"><a id="horasProjeto">Horas / Projeto</a></h1>
            <h1 id="linkRelatorio" class="mb-0 ml-3 span-black font-cairo-bold "><a>Relatório</a></h1>
          </div>

          <div class="col-6 d-none">
            <form id="formFiltro">
              <div class="col-6 form-group">
                <div class="d-md-flex align-items-center">
                  <input type="text" id="filtroInicio" name="inicio"
                    class=" d-none form-control rounded-pill mask-data data input-modal">
                </div>
              </div>
            </form>
          </div>

          <div class="col-12">
            <div class="text-right d-flex align-items-center">
              <div id="reportrange"
                style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc;" class="mb-2">
                <i class=" fa fa-calendar"></i>&nbsp;
                <span id="span-daterange"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="main-body-report">
      <div id="activeFilters" class="container-fluid py-2 d-flex align-items-center">
      </div>
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
</body>

<script>
  let httpServer = '<?php echo HTTP_SERVER; ?>';
</script>

<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/jquery/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/popper.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/jquery/jquery.mask.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/lottie-player/lottie-player.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/moment/moment-with-locales.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/daterangepicker/js/daterangepicker.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/chartjs-3.8.0/js/chart.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/chartjs-3.8.0/js/chartjs-adapter.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/loading/Loading.class.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/select2/select2.full.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.all.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/handlebars-v4.0.5/handlebars-v4.0.5.min.js"></script>
<script type="text/javascript"
  src="<?php echo HTTP_SERVER; ?>lib/jquery-smartwizard-master/dist/js/jquery.smartWizard.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript"
  src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/extensions/sticky-header/bootstrap-table-sticky-header.min.js">
  </script>
<script type="text/javascript"
  src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/extensions/fixed-columns/bootstrap-table-fixed-columns.min.js">
  </script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/locale/bootstrap-table-pt-BR.min.js">
</script>

<script>
  var dataAtual = '<?php echo date("Y-m-d", strtotime('-3 hours', time()));
  ; ?>';
  var usuarioAtual = '<?php echo $usuarioNome; ?>';
  var codigoAtual = '<?php echo $usuarioCodigo; ?>';
</script>

<script src="<?php echo HTTP_SERVER; ?>portal/js/main.js?2"></script>
<script type="text/javascript"
  src="<?php echo HTTP_SERVER; ?>portal/modulos/timesheetReport/js/logicaReport_function.js?10"></script>
<script type="text/javascript"
  src="<?php echo HTTP_SERVER; ?>portal/modulos/timesheetReport/js/reportTimesheet_function.js?20">
  </script>

</body>

</html>