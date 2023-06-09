<nav id="standardNavMobile" class="navbar">
    <div class="row justify-content-between align-items-center w-100 mx-0">
        <div class="col-6 col-md-4 pr-0">
            <div>
                <form>
                    <input type="text" class="form-control rounded-pill" placeholder="Pesquise Aqui...">
                </form>
            </div>
            <!-- <img class="img-fluid logo-navbar" src="<?php echo HTTP_SERVER; ?>adm/img/logo.svg">  -->
        </div>
        <div class="col-6 col-md-4 pr-0">

            <div class="d-flex justify-content-end align-items-center">
                <div class="body-notification">
                    <a href="" class="notifications px-3">
                        <i class="fa fa-bell"></i>
                    </a>
                </div>
                <div class="dropdown drop-nav pl-3">
                    <a href="javascript:void(0)" class="dropdown-toggle" type="button" id="dropdownNavbar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div class="img-profile">
                            <img id="perfil-user" src="../img/user.jpg" alt="Foto de Perfil">
                        </div>
                    </a>
                    <div class="dropdown-menu d-none" aria-labelledby="dropdownNavbar">
                        <span class="dropdown-menu-arrow"></span>
                        <a class="dropdown-item" href="#">Alterar Senha</a>
                        <a class="dropdown-item" href="<?php echo HTTP_SERVER ?>portal/modulos/controleAcesso/service/logoff/"><i class="fa fa-sign-out-alt mr-1 font-blue"></i> Sair</a>
                        <a class="dropdown-item" id="trocarSenha" href="#"><i class="fas fa-key mr-1 font-blue"></i>Alterar a senha</a>
                        <a class="dropdown-item" id="mudarImagem" href="#"><i class="fas fa-images mr-1 font-blue"></i>Alterar a imagem</a>
                    </div>
                </div>

            </div>
            <div class="modal fade " id="modalMudarImagem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-lg big-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header css-modal">
                            <h5 class="modal-title" id="exampleModalLabel">Alterar a foto</h5>
                            <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body pb-1 text-center">
                            <img id="modalPerfil" src="../img/user.jpg" alt="Foto de Perfil">
                            <form id="formDadosPrincipais">
                                <div id="bodyFotoUsuario" class="text-center">
                                    <label class="label-img position-relative">
                                        <input type="file" for="btnAddImagem" id="fotoUsuario" class="foto d-none" name="usuario-foto" accept="image/*" />

                                        <div class="body-actions">
                                            <button type="button" class="btn btn-blue rounded-circle btn-pencil btn-add-foto" id="btnAddImagem">
                                                <i class="fas fa-pencil-alt"></i>
                                            </button>
                                            <button type="button" class="btn btn-danger rounded-circle btn-trash d-none btn-excluir-foto" id="btnExcluirImagem">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </div>

                                        <div id="Usuario-imagemCarregada" class="d-flex img-upload rounded-circle justify-content-center align-items-center mx-auto position-relative border">
                                            <img class="d-block w-100 foto-img" id="modalPerfil" src="<?php echo HTTP_SERVER; ?>adm/img/user.jpg" id="">
                                        </div>
                                        <div id="Usuario-selecionarImg" class="img-upload rounded-circle d-flex justify-content-center align-items-center mx-auto border">
                                            <img src="<?php echo HTTP_SERVER; ?>adm/img/user.jpg" class="d-block w-100">
                                        </div>

                                    </label>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer pt-1 d-flex justify-content-end ">
                            <button id="alterarImagem" class="btn btn-success rounded-pill px-md-4 btn-pen"><i class="fas fa-pen mr-1"></i> <span class="d-none d-md-inline">Alterar</span></button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade " id="modalTrocarSenha" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                    <div class="modal-content">

                        <div class="modal-header css-modal">
                            <h5 class="modal-title" id="exampleModalLabel">Alterar senha</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body text-center">
                            <div class="d-flex align-items-center  pl-0" id="tebRedefinir" style="background-color: #f2f4f5;">
                                <div class="card">
                                    <form name="formAlterarSenha" id="formAlterarSenha" class="w-100 px-4">
                                        <div class="text-center mb-3 col-12">
                                        </div>
                                        <div class="col-12 mb-2 text-left">
                                            <label class="font-weight-bold text-left" for="">Senha atual<span class="text-danger">*</span></label>
                                            <input placeholder="Senha atual:" class="form-control bg-white rounded-pill campo-obrigatorio obrigatorio text-left" type="password" id="senhaAtual" name="senhaAtual" placeholder="Insira sua senha atual">
                                        </div>
                                        <div class="col-12 mb-2 text-left">
                                            <label class="font-weight-bold text-left" for="">Nova senha<span class="text-danger">*</span></label>
                                            <input placeholder="Nova senha:" class="form-control bg-white rounded-pill campo-obrigatorio obrigatorio text-left" type="password" id="senhaNova" name="senhaNova" placeholder="Insira a nova senha">
                                        </div>
                                        <div class="col-12 pb-3 text-left">
                                            <label class="font-weight-bold text-left" for="">Confirme a nova senha<span class="text-danger">*</span></label>
                                            <input placeholder="Confirme a nova senha:" class="form-control bg-white rounded-pill campo-obrigatorio obrigatorio text-left" type="password" id="senhaNovaValida" name="senhaNovaValida" placeholder="Confirmar senha">
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header d-flex justify-content-between py-2" id="heading-Tag">
                                <p class="mb-0">
                                    <a href="javascript:void(0)" class="" type="button" data-toggle="collapse" data-target="#collapse-Tag" aria-expanded="true" aria-controls="collapse-Tag">
                                        Dados Principais
                                    </a>
                                    </h2>
                                <p class="mb-0">
                                    <a href="javascript:void(0)" class="" type="button" data-toggle="collapse" data-target="#collapse-Tag" aria-expanded="true" aria-controls="collapse-Tag">
                                        <i class="fa fa-chevron-down"></i>
                                    </a>
                                </p>
                            </div>
                            <div id="collapse-Tag" class="collapse show" aria-labelledby="heading-Tag" data-parent="#accordion-Tag">
                                <div class="card-body body-dados-multiplos bg-gray pb-1">
                                    <div id="endereco" class="form-row" data-value="Tag">
                                        <div class="col-12 bg px-3 pt-2 container-body">
                                            <div class="body-multi-content px-0">
                                                <div class="form-row justify-content-center">
                                                    <div class="col-md-8 form-group">
                                                        <label class="font-weight-bold" for="Tags_keyaccesss">Tags<span class="text-danger d-none">*</span></label>
                                                        <input type="text" id="Tags_codigo" name="Tags_codigo" class="form-control rounded-pill obrigatorio logradouro">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="text-center body-add ml-2">
                                                <button type="button" class="btn-success rounded-circle btn-add"><i class="fa fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer pt-1 d-flex justify-content-end ">
                        <!-- <button id="alterarSenha" class="btn btn-success rounded-pill px-md-4 btn-pen"><i class="fas fa-pen mr-1"></i> <span class="d-none d-md-inline">Alterar</span></button> -->
                        <button id="alterarSenha" class="btn btn-blue rounded-pill px-md-4 btn-pen ml-2"><i class="fas fa-pen mr-1"></i> <span class="d-none d-md-inline">Alterar</span></button>

                    </div>
                </div>
            </div>
        </div>



        <button type="button" id="navbarCollapse" class="btn btn-collapse d-md-none">
            <i class="fa fa-bars"></i>
        </button>
    </div>
    </div>
</nav>