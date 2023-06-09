<?php
error_reporting(E_STRICT);
session_start();
require_once('../../properties.inc.php');
require_once(DOFMW . '/Do.class.php');
require_once('controleAcesso/service/verificarSessao/index.php');
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
  <meta content="" name="description" />
  <meta content="" name="author" />

  <!-- BOOTSTRAP -->
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/css/bootstrap.min.css">
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

  <!-- BIBLIOTECAS - CSS -->
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/font-awesome/css/all.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/loading/loading.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/css/style.css?2">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/css/home.css?2">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/css/responsividade-home-desktop.css">

</head>

<body class="home">

  <div class="container pt-4">
    <div class="row">
      <div class="col-sm-12 col-md-8">
        <!-- <div class="row">
                        <div class="col-12"> -->
        <div class="row">
          <div class="col-md-12">
            <div class="card-body-welcome d-flex justify-content-between">
              <p class="card-text-title text-center ">Bem vindo.<br><span class="subtitle">O que
                  vamos
                  fazer
                  hoje?</span>
              </p>
              <img class="card_img" src="../img/card/card.svg" alt="">
            </div>
          </div>
          <?php
          if ($usuarioSessao['clt'] == 'N') {
            ?>
            <div class="col-md-6">
              <div class="card">
                <a href="../modulos/notasFiscais/public/">
                  <div class="img d-flex justify-content-end">
                    <img class="img-card" src="../img/home/notas2.svg" alt="">
                  </div>
                  <img class="card-img2" src="../img/home/notas.svg" alt="">
                  <div class="text-card d-flex justify-content-start">
                    <h5 class="card-title spanCard">Notas Fiscais</h5>
                  </div>
                </a>
              </div>
            </div>
          <?php } ?>

          <?php
          if ($usuarioSessao['clt'] == 'N') {
            ?>
            <div class="col-md-6">
              <div class="card">
                <a href="../modulos/anexarNota/public/">
                  <div class="img d-flex justify-content-end">
                    <img class="img-card" src="../img/home/anexo2.svg" alt="">
                  </div>
                  <img class="card-img2" src="../img/home/anexo1.svg" alt="">
                  <div class="text-card d-flex justify-content-start">
                    <h5 class="card-title spanCard">Anexar Nota</h5>
                  </div>
                </a>
              </div>
            </div>
          <?php } ?>
          <div class="col-md-6">
            <div class="card">
              <a href="../modulos/timesheet/public/">
                <div class="img d-flex justify-content-end">
                  <img class="img-card" src="../img/home/bancoHoras2.svg" alt="">
                </div>
                <img class="card-img2" src="../img/home/bancoHoras.svg" alt="">
                <div class="text-card d-flex justify-content-start">
                  <h5 class="card-title spanCard">Horas / Projetos</h5>
                </div>
              </a>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card">
              <a href="../modulos/dadosCadastrais/public/">
                <div class="img d-flex justify-content-end">
                  <img class="img-card" src="../img/home/user2.svg" alt="">
                </div>
                <img class="card-img2" src="../img/home/user.svg" alt="">
                <div class="text-card d-flex justify-content-start">
                  <h5 class="card-title spanCard">Meus Dados</h5>
                </div>
              </a>
            </div>
          </div>

        </div>







        <!-- </div> -->
        <!-- <div class="col-12">

                    </div> -->
        <!-- </div> -->

      </div>


      <div class="col-sm-12 col-md-4 ">
        <div class="card-2 m-auto">
          <div class="card-body">
            <h5 class="card-title text-center header-content">Sua Semana</h5>
            <p class="card-text text-center info-datas">30/05/22 - 03/06/22</p>
            <hr>
            <span id="monText" class="day"></span>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="" aria-valuenow="25" aria-valuemin="0"
                aria-valuemax="100"></div>
              <div class='without-progress'>00:00</div>
            </div>
            <span id="tueText" class="day"></span>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="" aria-valuenow="50" aria-valuemin="0"
                aria-valuemax="100"></div>
              <div class='without-progress'>00:00</div>
            </div>
            <span id="wedText" class="day"></span>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="" aria-valuenow="75" aria-valuemin="0"
                aria-valuemax="100"></div>
              <div class='without-progress'>00:00</div>
            </div>
            <span id="thuText" class="day"></span>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="" aria-valuenow="25" aria-valuemin="0"
                aria-valuemax="100"></div>
              <div class='without-progress'>00:00</div>
            </div>
            <span id="friText" class="day"></span>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="" aria-valuenow="100" aria-valuemin="0"
                aria-valuemax="100"></div>
              <div class='without-progress'>00:00</div>
            </div>
            <a href="../modulos/timesheet/public/" class="btn btn-view-all">Ver
              tudo</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modalCamposObrigatorios" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false">
    <div class=" modal-dialog-centered modal-dialog modal-dialog-scrollable modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header css-modal d-flex justify-content-center">
          <h5 class="modal-title">Atualização de Dados</h5>
        </div>
        <div class="modal-body overflow-x-hidden">
          <div id="bodymodalCamposObrigatorios" class="style-modal">
            <form id="formDados">
              <div class="card-body body-dados-multiplos-2 pb-1">
                <div class="col-12  ocorrencia-container container-body px-2 pl-sm-3 pt-2 d-sm-flex align-items-center">
                  <div class="body-multi-content px-0">
                    <div id="meusDados" class="form-row">
                      <div class="col-12 container-body justify-content-center">
                        <h5 class="body-modal font-weight-bold"> Caro profissional, é muito importante que você atualize
                          a sua quantidade de filhos na aba meus dados.
                          A BlueShift sempre tem novidades para os seus colaboradores e é importante o preenchimento
                          tanto de quem tem filhos como de quem não tem para que vocês não fiquem de fora! </h5>
                      </div>
                    </div>
                  </div>
                </div>
            </form>
          </div>
        </div>
        <div class="modal-footer pt-1 d-flex justify-content-center align-items-center">

          <div class="btn-center">
            <button type="button" id="atualizarDados" class="btn btn-atualizar rounded-pill px-md-4 btn-save">
              <span class="d-md-inline">VAMOS LÁ!</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>
  <script>
    var dataAtual = '<?php echo date("Y-m-d", strtotime('-3 hours', time()));
    ; ?>';
    var usuarioAtual = '<?php echo $usuarioNome; ?>';
    var codigoAtual = '<?php echo $usuarioCodigo; ?>';
  </script>

  <script>
    let httpServer = '<?php echo HTTP_SERVER; ?>';
  </script>
  <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/jquery/jquery-3.3.1.min.js">
  </script>
  <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/popper.min.js">
  </script>
  <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/bootstrap.min.js">
  </script>
  <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/lottie-player/lottie-player.js">
  </script>
  <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/loading/Loading.class.js">
  </script>
  <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/datetimepicker/js/moment-with-locales.js">
  </script>
  <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.js">
  </script>
  <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.js"></script>
  <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>portal/modulos/controleAcesso/js/login.js?3">
  </script>
  <script src="<?php echo HTTP_SERVER; ?>portal/js/main.js?1"></script>
  <script src="<?php echo HTTP_SERVER; ?>portal/js/home.js?8"></script>


</body>

</html>