<?php
error_reporting(E_STRICT);
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");
session_start();
require_once('../../../../properties.inc.php');
require_once(DOFMW . '/Do.class.php');

$usuarioSessao = $do->getUserSession();
$usuarioNome = $usuarioSessao['nome'];
$usuarioCodigo = $usuarioSessao['codigo'];
?>
<!DOCTYPE html>

<html lang="en">

<head>
    <title>RH BlueShift</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
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
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/extensions/sticky-header/bootstrap-table-sticky-header.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-slider/css/bootstrap-slider.min.css">

    <link rel="stylesheet" href="<?php echo HTTP_SERVER ?>portal/css/style.css?2" />
    <link rel="stylesheet" href="<?php echo HTTP_SERVER ?>portal/modulos/autoAvaliacaoTecnica/css/style.css?5" />
</head>

<body class="home">
    <div class="body-header">
        <div class="container-fluid header-pag py-2">
            <div class="row align-items-center">
                <div class="col-12 d-flex align-items-center justify-content-between">
                    <!-- <img src="../../../img/logo-blueshift-2.png" height="35"> -->
                    <h1 class="mb-0 ml-3"><span class="font-cairo-bold"> Auto Avaliação Técnica</span></h1>
                </div>
            </div>
        </div>
    </div>    

    <div id="main-body">
        <div class="container-fluid px-4 mt-3 mb-5 pb-5">
            <div>
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="px-5 px-md-2 bg-white border-radius">
                            <div id="resumoPerfil"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body p-0 mt-3">
                <!-- <div class="bg-gray font-14 m-3 p-3 border-20-rounded">
                        <p class="mb-0 font-weight-bold">Níveis de Conhecimento: </p>
                        <ul class="ml-3">
                            <li class="ml-4">Nível 1 - Junior 1: Conhecimentos básicos adquiridos de forma acadêmica. Requer atenção antes, durante e ou finalizar as atividades por parte do Líder/Outro Colaborador;</li>                            
                            <li class="ml-4">Nível 2 - Junior 2: Capaz de realizar atividades de baixa complexidade. Pouco contato com atividades práticas. Requer auxilio de outro profissional para entendimento do escopo. Requer validação no produto entregue;</li>									
                            <li class="ml-4">Nível 3 - Junior 3: Já atuou em projetos. Requer acompanhamento de profissional nos produtos entregues;</li>											
                            <li class="ml-4">Nível 4 - Pleno 1:	Já atuou em projetos. Capaz de realizar atividades de complexidade baixa de forma idependente;</li>										
                            <li class="ml-4">Nível 5 - Pleno 2:	Consegue executar atividades de nível moderado de forma idependente;</li>										
                            <li class="ml-4">Nível 6 - Pleno 3:	Pleno conhecimento das aplicações da Ferramenta/Liguagem. Encabeça atividades junto ao cliente;</li>											
                            <li class="ml-4">Nível 7 - Senior 1: Interpreta requisitos de forma idependente. Experiência adquirida em vários projotes. Provê treinamentos internos. Gera conteúdo para capacitação de outros colaboradores;</li>									
                            <li class="ml-4">Nível 8 - Senior 2: Atua de forma idependente. Participa de reuniões de forma ativa, capaz de sugerir soluções;</li>										
                            <li class="ml-4">Nível 9 - Senior 3: Certificado oficial de mercado. Representa a empresa em ações comerciais, através de Palestras Worshops e Treinamentos. Atua em questões de arquiteturas e soluções em suas especialidades;	</li>	
                        </ul>									

                    </div> -->
                <input class="rounded-pill form-control col-4 mb-1" id="filtro-table" type="text" placeholder="Filtrar Tag..">
                <!-- TABLE -->
                <div class="container-table" id="container-auto-avaliacao">
                    <div id="avaliacao-tags" class="table-responsive table-container">
                        <table id="mainTable" class="table-bordered text-center mb-0" data-locale="pt-BR" data-sticky-header="true" data-sticky-header-offset-left="1.5rem" data-sticky-header-offset-right="1.5rem" data-sortable="true">
                            <!-- <thead></thead>
                            <tbody id="bodyAvaliacao"></tbody> -->
                        </table>
                        <!-- <div class="fa-3x load d-none">
                            <i class="fa-solid fa-cog fa-spin"></i>
                        </div>                         -->
                        <div class="col-md-12 pt-2 mb-3 text-center">
                            <small id="btnvermais" class="btn btn-white-blue rounded-pill px-4 font-weight-bold text-green cursor-pointer"> Ver Mais</small>
                        </div>
                    </div>
                </div>
            </div>

            <footer class="salvar">
            <div class="btn-center">
                <button id="salvar" class="btn btn-success rounded-pill px-md-4 btn-save">
                    <span class="d-none d-md-inline">Salvar</span></button>
            </div>
        </footer>

        </div>

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
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/datetimepicker/js/moment-with-locales.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/handlebars-v4.0.5/handlebars-v4.0.5.min.js"></script>
    <script src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/bootstrap-table.min.js"></script>
    <script src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/extensions/sticky-header/bootstrap-table-sticky-header.min.js"></script>
    <script src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/locale/bootstrap-table-pt-BR.min.js"></script>
    <script src="<?php echo HTTP_SERVER; ?>lib/bootstrap-slider/js/bootstrap-slider.min.js"></script>

    <script>      
      var dataAtual = '<?php echo date("Y-m-d", strtotime('-3 hours', time()));; ?>';
        // let codigo = '<?php echo $_GET['codigo']; ?>';
        // let periodo = '<?php echo $_GET['periodo']; ?>';
        var usuarioAtual = '<?php echo $usuarioNome; ?>';
        var codigoAtual = '<?php echo $usuarioCodigo; ?>';
    </script>

    <script src="<?php echo HTTP_SERVER; ?>portal/js/main.js"></script>
    <script src="<?php echo HTTP_SERVER; ?>portal/modulos/autoAvaliacaoTecnica/js/autoavaliacaoTecnica.js?6"></script>

    <script id="template-resumo-perfil" type="text/x-handlebars-template">
        {{#each elements}}
            <div class="d-md-flex align-items-center text-center text-md-left py-2 h-100">
                <div class="mr-md-3">
                    <!-- <div class="logo-in-table rounded-circle d-flex justify-content-center align-items-center m-auto" style="background-image:url(../../{{logo-in-table documentos 'Foto de Perfil'}})">
                        <img src="../../{{logo-in-table documentos 'Foto de Perfil'}}" class="img-fluid" alt="Foto do Consultor"> 
                    </div> -->
                </div>
                <div class="">
                    <div class="">
                        <p class="mb-0 font-weight-bold">{{nome}} {{h_endereco endereco}}</p>
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