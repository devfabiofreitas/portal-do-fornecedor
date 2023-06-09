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
    <link rel="stylesheet" href="<?php echo HTTP_SERVER ?>portal/css/style.css?1">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER ?>portal/modulos/holerite/public/css/style.css?2">
</head>

<body class="home">
    <div class="container-fluid pt-4">
        <div class="body-header ">
            <div class="container-fluid header-pag py-2">
                <div class="row">
                    <div class="col-6">
                        <h1 class="mb-0"><span class="font-cairo-bold">Holerite</span></h1>
                    </div>
                    <div class="col-6">
                        <div class="col-sm-8  ml-auto">
                            <form id="formFiltro" method="post" action="index.php">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                    <input type="text" id="mesAno" name="mesAno" placeholder="Selecione uma data" class="mes-ano form-control rounded-pill" value="<?php echo $_POST['mesAno']; ?>">
                                    <div class="input-group-append">
                                        <button id='btnFiltro' class="close btn-filtro" type="submit" name="limpar_filtro" value="1"> <svg xmlns="http://www.w3.org/2000/svg" width="16.04" height="16.04" viewBox="0 0 16.04 16.04">
                                                <g id="Group_832" data-name="Group 832" transform="translate(-1302.98 -1186.98)">
                                                    <line id="Line_90" data-name="Line 90" x2="11.09" y2="11.09" transform="translate(1305.455 1189.455)" fill="none" stroke="#a6b5bc" stroke-linecap="round" stroke-width="3.5" />
                                                    <line id="Line_91" data-name="Line 91" x1="11.09" y2="11.09" transform="translate(1305.455 1189.455)" fill="none" stroke="#a6b5bc" stroke-linecap="round" stroke-width="3.5" />
                                                </g>
                                            </svg></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="main-body-nota">
        <div class=" container-table mt-2">
            <div class="table-responsive table-container">
                <table id="mainTable" class="text-center mb-0 table" data-show-header="true" data-sticky-header="true" data-locale="pt-BR" data-sticky-header-offset-left="1.5rem" data-sticky-header-offset-right="1.5rem" data-sortable="false" data-pagination-h-align="left" data-pagination="true" table-borderles="true">
                    <?= $template_tabela ?>
                </table>
            </div>
        </div>
    </div>
    <footer class="salvar">
        <div class="btn-center">
            <button id="buscar" type="button" class="btn btn-blue  d-none btn-search text-white rounded-pill px-md-4">
                <span class="d-none ml-1 d-md-inline">Buscar</span>
            </button>
        </div>
    </footer>

    </div>
    <script>
        let httpServer = '<?php echo HTTP_SERVER; ?>';
    </script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/jquery/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/popper.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/font-awesome/js/all.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/loading/Loading.class.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/select2/select2.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/handlebars-v4.0.5/handlebars-v4.0.5.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/datetimepicker/js/moment-with-locales.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/bootstrap-table.min.js"></script>
    <script>
        var dataAtual = '<?php echo date("Y-m-d", strtotime('-3 hours', time()));; ?>';
        var usuarioAtual = '<?php echo $usuarioNome; ?>';
        var codigoAtual = '<?php echo $usuarioCodigo; ?>';
    </script>
    <script src="<?php echo HTTP_SERVER; ?>portal/js/main.js?1"></script>
    <script src="<?php echo HTTP_SERVER; ?>portal/modulos/holerite/public/js/holerite.js?3"></script>
</body>

</html>