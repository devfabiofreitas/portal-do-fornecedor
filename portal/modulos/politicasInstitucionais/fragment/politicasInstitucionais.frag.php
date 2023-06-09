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
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/select2/select2.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/datetimepicker/css/bootstrap-datetimepicker.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/jquery-smartwizard-master/dist/css/smart_wizard_all.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/css/style.css?6">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/modulos/dadosCadastrais/css/style.css?10">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/modulos/politicasInstitucionais/css/style.css?10">
</head>

<body class="home">
  <div class="container-fluid pt-4">
    <div class="body-header">
      <div class="container-fluid header-pag py-2">
        <div class="row align-items-center">
          <div class="header-global">
            <h1 class="mb-0 font-cairo-bold ">Políticas Institucionais</h1>
          </div>
        </div>
      </div>
    </div>
    <div id="main-body" class="overflow-xs-auto">
      <div class="politicas">
        <section>
          <header>
            <a href="../../../../internetfiles/politicas_institucionais/Código de Conduta BlueShift - Aos Parceiros e Fornecedores.pdf" target="_blank">
              <h4>Código de Conduta Blueshift</h4>
            </a>
          </header>
        </section>
        <section>
          <a href="../../../../internetfiles/politicas_institucionais/Política de Segurança da Informação e Proteção de Dados - BlueShift V.2 (1).pdf" target="_blank">
            <h4>Política de Segurança da Informação e Proteção de Dados</h4>
          </a>
        </section>
      </div>
    </div>

    <script>
      let httpServer = '<?php echo HTTP_SERVER; ?>';
    </script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/jquery/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/popper.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/loading/Loading.class.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/handlebars-v4.0.5/handlebars-v4.0.5.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/bootstrap-table.min.js">
    </script>

    <script>
      var dataAtual = '<?php echo date("Y-m-d", strtotime('-3 hours', time()));; ?>';
      var usuarioAtual = '<?php echo $usuarioNome; ?>';
      var codigoAtual = '<?php echo $usuarioCodigo; ?>';
    </script>

</body>

</html>