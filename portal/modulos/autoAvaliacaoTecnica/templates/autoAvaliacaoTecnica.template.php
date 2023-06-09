<!DOCTYPE html>

<html lang="en">

<head>
    <title>Portal do Fornecedor</title>
    <meta charset="utf-8" />

    <link rel="stylesheet" href="<?= HTTP_SERVER ?>lib/bootstrap-4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER ?>lib/font-awesome/css/all.min.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER ?>lib/loading/loading.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER ?>lib/toastr/toastr.min.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER ?>lib/sweetalert/sweetalert2.min.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER ?>lib/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet"
        href="<?= HTTP_SERVER ?>lib/bootstrap-table/extensions/sticky-header/bootstrap-table-sticky-header.min.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER ?>lib/bootstrap-slider/css/bootstrap-slider.min.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER ?>portal/css/style.css?1003" />
    <link rel="stylesheet" href="css/style.css?1003">

    <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/jquery/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/bootstrap-4.4.1/js/popper.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/bootstrap-4.4.1/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/sweetalert/sweetalert2.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/font-awesome/js/solid.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/font-awesome/js/fontawesome.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/moment/moment-with-locales.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/bootstrap-table/bootstrap-table.min.js"></script>
    <script type="text/javascript"
        src="<?= HTTP_SERVER ?>lib/bootstrap-table/extensions/sticky-header/bootstrap-table-sticky-header.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/bootstrap-table/locale/bootstrap-table-pt-BR.min.js">
    </script>
    <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/bootstrap-slider/js/bootstrap-slider.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/toastr/toastr.min.js"></script>


    <script>
        let httpServer = '<?= HTTP_SERVER ?>';
    </script>

    <script defer type="text/javascript" src="<?php echo HTTP_SERVER; ?>portal/js/main.js"></script>
    <script defer type="text/javascript" src="js/autoAvaliacaoTecnica.js?2"></script>



</head>


<body class="home" id="body">
    <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/loading/Loading.class.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER ?>lib/lottie-player/lottie-player.js"></script>
    <script>
        loading.open();
    </script>
    <div class="body-header">
        <div class="container-fluid header-pag py-2">
            <div class="row align-items-center">
                <div class="col-12 d-flex align-items-center justify-content-between">
                    <h1 class="mb-0 ml-3"><span class="font-cairo-bold"> Auto Avaliação Técnica</span></h1>
                </div>
            </div>
        </div>
    </div>

    <div id="main-body">
        <div class="container-fluid px-4 mt-3 mb-5 pb-5">
            <form action="autoAvaliacaoTecnica.php" method="POST" onsubmit="loading.open()">
                <div class="card-body p-0 mt-3">
                    <input class="rounded-pill form-control col-4 mb-1" id="filtro-table" type="text"
                        placeholder="Filtrar tag">
                    <div class="container-table d-none" id="container-auto-avaliacao">

                        <?php require('listagemTags.template.php'); ?>
                    </div>
                </div>
                <footer class="salvar">
                    <div class="btn-center">
                        <button type="submit" id="salvar" name="action" value="salvarTags"
                            class="btn btn-success rounded-pill px-md-4 btn-save">
                            <span class="d-inline">Salvar</span>
                        </button>
                    </div>
                </footer>
            </form>
        </div>
    </div>
</body>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        <?= $alerta_swal ?>;
        var elementos = document.querySelectorAll('.loading');
        elementos.forEach(function (elemento) {
            elemento.classList.add('loading-hidden');
        });
    });
</script>

</html>