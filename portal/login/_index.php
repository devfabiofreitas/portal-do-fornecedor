<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
session_destroy();
require_once('../../properties.inc.php');
require_once(DOFMW . '/Do.class.php');
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

    <!-- BOOTSTRAP -->
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/css/bootstrap.min.css">

    <!-- BIBLIOTECAS - CSS -->
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/font-awesome/css/all.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/loading/loading.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/css/login-global.css">
    <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/css/style.css">
    <link rel="stylesheet" href="styles.css">
    <link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon" />
</head>

<body>
    <div class="container background_imagem ">
        <div class="row justify-content-center">
            <div class="offset-md-7 col-md-5 col-lg-4  ">
                <img class="portal-logo" src="../img/login/logoLogin.svg" alt="">
                <h3 class="title-login">Olá, faça seu login:</h3>
                <form id="formLogin" name="formLogin" class="user">
                    <div class="form-group">
                        <input type="text" class="form-control form-control-user mask-cnpj campo-obrigatorio obrigatorio" id="usuario" name="usuario" placeholder="Usuário" maxlength="18" />
                    </div>
                    <div class="form-group">
                        <input type="password" id="senha" name="senha" class="form-control form-control-user campo-obrigatorio obrigatorio" placeholder="Senha">
                        <span class="input-icon" style="display: box;">
                            <i id="mostrar" class="fa fa-eye-slash" aria-hidden="true" value=""></i>
                        </span>
                    </div>
                    <div class="form-group d-flex align-items-center justify-content-end">
                        <label for="guardarUsuario">Guardar usuário</label>
                        <input type="checkbox" id="guardarUsuario" name="guardarUsuario" class="ml-2">
                    </div>
                    <button id="btnLogin" type="submit" class="btn btn-primary btn-user btn-block">
                        LOGIN
                    </button>
                    <div class="form-group text-right">
                        <button type="button" class="border-0 bg-transparent" data-toggle="modal" data-target="#faleConoscoModal">Fale conosco</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade faleConoscoModal" tabindex="-1" role="dialog" id="faleConoscoModal">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="container-fluid">
                <div class="modal-content">
                    <div class="modal-header col-md">
                        <h5 class="modal-title">Fale Conosco</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body col-md">
                        <div class="container">
                            <div class="row ">
                                <div class="col-xl-12 mx-auto">
                                    <div class="card mt-2 mx-auto p-4">
                                        <div class="card-body">
                                            <div class="container">
                                                <form id="formFaleConosco" role="form">
                                                    <div class="controls">
                                                        <div class="row">
                                                            <div class="col-xl-12">
                                                                <div class="form-group">
                                                                    <label for="nome">Nome para contato *</label>
                                                                    <input id="nome" type="text" name="nome" class="form-control campo-obrigatorio obrigatorio" placeholder="Por favor insira um nome para contato *" required="required" data-error="Nome é necessário.">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12">
                                                                <div class="form-group">
                                                                    <label for="usuario">CNPJ *</label>
                                                                    <input id="usuario" type="text" name="usuario" class="form-control mask-cnpj campo-obrigatorio obrigatorio" placeholder="Por favor insira o CNPJ cadastrado *" required="required" maxlength="18">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12">
                                                                <div class="form-group">
                                                                    <label for="email">Email *</label>
                                                                    <input id="email" type="email" name="email" class="form-control campo-obrigatorio obrigatorio" placeholder="Por favor insira um email para contato *" required="required" data-error="Um email válido é necessário.">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="categoria">Selecione uma categoria
                                                                        *</label>
                                                                    <select id="categoria" name="categoria" class="form-control campo-obrigatorio obrigatorio" required="required" data-error="Indique uma categoria">
                                                                        <option value="" selected disabled>--
                                                                            Categorias
                                                                            --</option>
                                                                        <option>Troca de senha</option>
                                                                        <option>CNPJ Inválido</option>
                                                                        <option>Outra</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <label for="mensagem">Mensagem *</label>
                                                                    <textarea id="mensagem" name="mensagem" class="form-control campo-obrigatorio obrigatorio" placeholder="Escreva sua mensagem" rows="4" required="required" data-error="Descreva sua dúvida!"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12">
                                                                <button type="submit" id="btnFaleConosco" class="btn btn-success btn-send pt-2 btn-block" value="Enviar solicitação">Enviar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer col-md">
                        <p>BlueShift - Todos os direitos reservados.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="responsavelTecnicoModal">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div class="container-fluid">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title">Quem está acessando o portal ?</h6>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container py-2">
                            <div class="row justify-content-center">
                                <form id="formResponsavelTecnico" name="formResponsavelTecnico" class="user">
                                    <div class="form-group">
                                        <label for="responsavelTecnico">Responsável técnico</label>
                                        <select class="form-control" id="responsavelTecnico" name="responsavelTecnico">
                                        </select>
                                    </div>
                                    <button id="btnAcesso" type="submit" class="btn btn-primary btn-user btn-block">
                                        ACESSO
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer col-md">
                        <p>BlueShift - Todos os direitos reservados.</p>
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
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/lottie-player/lottie-player.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/loading/Loading.class.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.js"></script>
    <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>portal/modulos/controleAcesso/js/login.js?13"></script>
</body>

</html>