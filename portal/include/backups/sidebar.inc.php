<div class="wrapper">
    <!-- Sidebar  -->
    <nav id="sidebar" class="">
        <div class="side-button">
            <svg id="seta-branca" xmlns="http://www.w3.org/2000/svg" width="7.876" height="13.777" viewBox="0 0 7.876 13.777">
                <g id="icon-arrow" transform="translate(7.876) rotate(90)">
                    <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M5.5,6.887.289,1.678A.985.985,0,1,1,1.684.288l5.906,5.9a.983.983,0,0,1,.029,1.358L1.688,13.49A.985.985,0,0,1,.293,12.1Z" transform="translate(13.777) rotate(90)" fill="#fff" />
                </g>
            </svg>
        </div>
        <div class="sidebar-content h-100">
            <div class="sidebar-header text-center px-3 pt-2 pb-1 position-relative d-flex justify-content-center align-items-center  mb-1">
                <img class="img-fluid logo-sidebar m-auto" width="150" src="<?php echo HTTP_SERVER; ?>portal/img/logo-white.svg">
                <!-- <p id="nomeUsuario" class="mb-0 font-lato-bold text-primary text-muted"></p> -->
                <!-- <p id="emailUsuario" class="mb-0 font-lato-bold text-primary text-muted"></p> -->
            </div>

            <div class="sidebar-login">
                <div class="dropdown  drop-nav ">
                    <a href="javascript:void(0)" class="drop-img " type="button" id="dropdownNavbar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div class="img-profile mt-1"></div>
                        <a href="" class="icon-sino d-none">
                            <img width="15px" src="<?php echo HTTP_SERVER ?>portal/img/notification.svg">
                        </a>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownNavbar">
                        <span class="dropdown-menu-arrow"></span>
                        <!-- <a class="dropdown-item" href="#">Alterar Senha</a> -->
                        <a class="dropdown-item font-cairo-bold" id="mudarImagem" href="#"><img class="tamanho-icon" src="<?php echo HTTP_SERVER ?>portal/img/pen-blue.svg"> Alterar imagem</a>
                        <a class="dropdown-item font-cairo-bold" id="trocarSenha" href="#"><img class="tamanho-icon" src="<?php echo HTTP_SERVER ?>portal/img/key-blue.svg"> Alterar senha</a>
                        <a id="logout" class="dropdown-item font-cairo-bold"><img class="tamanho-icon" src="<?php echo HTTP_SERVER ?>portal/img/logout-blue.svg"> Sair</a>
                    </div>
                </div>

                <div class="nome-icon">
                    <h2 class="nomeUser mt-1"></h2>
                </div>

            </div>

            <div class="modal fade " id="modalMudarImagem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                    <div class="modal-content">

                        <div class="modal-header css-modal  d-flex justify-content-center">
                            <h5 class="modal-title" id="exampleModalLabel">Alterar a Imagem</h5>
                            <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body pb-1 text-center">
                            <!-- <img id="modalPerfil" src="../img/user.jpg" alt="Foto de Perfil"> -->
                            <form id="formDadosPrincipais">
                                <div id="bodyFotoUsuario" class="text-center mt-2">
                                    <label id="foto" class="label-img position-relative mb-0">
                                        <input type="file" for="foto" id="fotoUsuario" class="foto d-none" name="usuario-foto" accept="image/*" />
                                        <div class="body-actions style-body-actions">
                                            <button type="button" class="btn btn-adicionar rounded-circle btn-pencil btn-add-foto" id="btnAddImagem">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14.382" height="14.37" viewBox="0 0 21.382 21.37">
                                                    <path id="pen_1_" data-name="pen (1)" d="M17.856.783a2.778,2.778,0,0,0-3.925,0l-.983.988L2.488,12.225l-.022.022c-.005.005-.005.011-.011.011-.011.017-.028.033-.039.05s-.006.006-.006.011-.016.028-.028.044-.005.011-.011.017-.011.028-.017.044-.005.005-.005.011L.028,19.415a.546.546,0,0,0,.133.566.559.559,0,0,0,.394.161.655.655,0,0,0,.178-.028l6.973-2.326c.005,0,.005,0,.011-.005a.2.2,0,0,0,.05-.022.02.02,0,0,0,.011-.005c.016-.011.039-.022.055-.034s.033-.028.05-.039.011-.006.011-.011.017-.011.022-.022L19.36,6.207a2.778,2.778,0,0,0,0-3.925ZM7.529,16.483,3.665,12.619l9.671-9.671L17.2,6.812ZM3.121,13.647,6.5,17.022,1.427,18.71ZM18.578,5.43l-.589.594L14.125,2.159l.594-.594a1.665,1.665,0,0,1,2.354,0l1.51,1.51a1.671,1.671,0,0,1-.005,2.354Zm0,0" transform="translate(0.512 0.727)" fill="#fff" stroke="#fff" stroke-width="1" />
                                                </svg>
                                            </button>
                                            <!-- <button type="button" class="btn btn-delete-img rounded-circle btn-trash d-none btn-excluir-foto" id="btnExcluirImagem">
                                                <svg id="Layer_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                                                    <g>
                                                        <path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z"/><path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/><path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/><path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/>
                                                    </g>
                                                </svg>
                                            </button> -->
                                        </div>

                                        <!-- <div class="body-actions style-body-actions">
                                            <button type="button" class="btn btn-blue rounded-circle btn-pencil btn-add-foto" id="btnAddImagem">
                                                <svg id="icon-alterar" xmlns="http://www.w3.org/2000/svg" width="15.864" height="15.863" viewBox="0 0 15.864 15.863">
                                                    <path id="Icon_awesome-pen" data-name="Icon awesome-pen" d="M9.008,2.889l3.966,3.967L4.361,15.469l-3.536.39A.744.744,0,0,1,0,15.038L.4,11.5l8.61-8.61Zm6.42-.591L13.565.436a1.488,1.488,0,0,0-2.1,0L9.709,2.188l3.966,3.967L15.427,4.4a1.488,1.488,0,0,0,0-2.1Z" transform="translate(0.001 0)" fill="#fff"/>
                                                </svg>
                                            </button>
                                        </div> -->

                                        <div id="Usuario-imagemCarregada" class="d-flex img-upload rounded-circle justify-content-center align-items-center mx-auto position-relative border">
                                            <div id="modalPerfil" class="foto-img"></div>
                                        </div>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer  pt-1 d-flex justify-content-center ">
                            <button id="cancelar" data-toggle="tooltip" data-placement="top" title="Cancelar" type="button" class="btn btn-secondary rounded-pill px-md-4 btn-cancelar" data-dismiss="modal">
                                <svg id="icon-cancelar" xmlns="http://www.w3.org/2000/svg" width="21.97" height="21.97" viewBox="0 0 21.97 21.97">
                                    <path id="Icon_metro-cancel" data-name="Icon metro-cancel" d="M13.556,1.928A10.985,10.985,0,1,0,24.54,12.913,10.985,10.985,0,0,0,13.556,1.928Zm0,19.91a8.925,8.925,0,1,1,8.925-8.925,8.925,8.925,0,0,1-8.925,8.925ZM16.988,7.42l-3.433,3.433L10.123,7.42,8.063,9.48,11.5,12.913,8.063,16.346l2.06,2.06,3.433-3.433,3.433,3.433,2.06-2.06-3.433-3.433L19.048,9.48Z" transform="translate(-2.571 -1.928)" fill="#fff" />
                                </svg>
                            </button>
                            <button id="alterarImagem" data-toggle="tooltip" data-placement="top" title="Salvar" class="btn btn-alterar btn-blue rounded-pill btn-pen">
                                <svg id="icon-salvar" xmlns="http://www.w3.org/2000/svg" width="19.982" height="19.982" viewBox="0 0 19.982 19.982">
                                    <g id="Icon_feather-save" data-name="Icon feather-save" transform="translate(-3.5 -3.5)">
                                        <path id="Path_1486" data-name="Path 1486" d="M20.484,22.482H6.5a2,2,0,0,1-2-2V6.5a2,2,0,0,1,2-2H17.487l4.995,4.995V20.484A2,2,0,0,1,20.484,22.482Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                        <path id="Path_1487" data-name="Path 1487" d="M20.49,27.492V19.5H10.5v7.992" transform="translate(-2.004 -5.01)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                        <path id="Path_1488" data-name="Path 1488" d="M10.5,4.5V9.495h7.992" transform="translate(-2.004)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="modalTrocarSenha" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header css-modal  d-flex justify-content-center">
                            <h5 class="modal-title" id="exampleModalLabel">Alterar senha</h5>
                            <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body pb-1  text-center">
                            <div class="d-flex align-items-center  pl-0" id="tebRedefinir">
                                <form name="formAlterarSenha" id="formAlterarSenha" class="w-100 px-4">
                                    <div class="text-center mb-3 col-12">
                                    </div>
                                    <div class="col-12 mb-2 text-left">
                                        <label class="font-weight-bold text-left" for="">Senha atual<span class="text-danger">*</span></label>
                                        <input class="form-control  rounded-pill campo-obrigatorio obrigatorio text-left input-modal" type="password" id="senhaAtual" name="senhaAtual">
                                    </div>
                                    <div class="col-12 mb-2 text-left">
                                        <label class="font-weight-bold text-left" for="">Nova senha<span class="text-danger">*</span></label>
                                        <input class="form-control  rounded-pill campo-obrigatorio obrigatorio text-left input-modal" type="password" id="senhaNova" name="senhaNova">
                                    </div>
                                    <div class="col-12 pb-3 text-left">
                                        <label class="font-weight-bold text-left" for="">Confirme a nova senha<span class="text-danger">*</span></label>
                                        <input class="form-control  rounded-pill campo-obrigatorio obrigatorio text-left input-modal" type="password" id="senhaNovaValida" name="senhaNovaValida">
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer pt-1 d-flex justify-content-center">
                            <button id="cancelar" data-toggle="tooltip" data-placement="top" title="Cancelar" type="button" class="btn btn-secondary rounded-pill px-md-4 btn-cancelar" data-dismiss="modal">
                                <svg id="icon-cancelar" xmlns="http://www.w3.org/2000/svg" width="21.97" height="21.97" viewBox="0 0 21.97 21.97">
                                    <path id="Icon_metro-cancel" data-name="Icon metro-cancel" d="M13.556,1.928A10.985,10.985,0,1,0,24.54,12.913,10.985,10.985,0,0,0,13.556,1.928Zm0,19.91a8.925,8.925,0,1,1,8.925-8.925,8.925,8.925,0,0,1-8.925,8.925ZM16.988,7.42l-3.433,3.433L10.123,7.42,8.063,9.48,11.5,12.913,8.063,16.346l2.06,2.06,3.433-3.433,3.433,3.433,2.06-2.06-3.433-3.433L19.048,9.48Z" transform="translate(-2.571 -1.928)" fill="#fff" />
                                </svg>
                            </button>
                            <button id="alterarSenha" data-toggle="tooltip" data-placement="top" title="Salvar" class="btn btn-alterar btn-blue rounded-pill btn-pen">
                                <svg id="icon-salvar" xmlns="http://www.w3.org/2000/svg" width="19.982" height="19.982" viewBox="0 0 19.982 19.982">
                                    <g id="Icon_feather-save" data-name="Icon feather-save" transform="translate(-3.5 -3.5)">
                                        <path id="Path_1486" data-name="Path 1486" d="M20.484,22.482H6.5a2,2,0,0,1-2-2V6.5a2,2,0,0,1,2-2H17.487l4.995,4.995V20.484A2,2,0,0,1,20.484,22.482Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                        <path id="Path_1487" data-name="Path 1487" d="M20.49,27.492V19.5H10.5v7.992" transform="translate(-2.004 -5.01)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                        <path id="Path_1488" data-name="Path 1488" d="M10.5,4.5V9.495h7.992" transform="translate(-2.004)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                    </g>
                                </svg>
                            </button>
                            <!-- <button  class="btn btn-blue rounded-pill px-md-4 btn-alterar">
                                <svg id="icon-alterar" xmlns="http://www.w3.org/2000/svg" width="15.864" height="15.863" viewBox="0 0 15.864 15.863">
                                    <path id="Icon_awesome-pen" data-name="Icon awesome-pen" d="M9.008,2.889l3.966,3.967L4.361,15.469l-3.536.39A.744.744,0,0,1,0,15.038L.4,11.5l8.61-8.61Zm6.42-.591L13.565.436a1.488,1.488,0,0,0-2.1,0L9.709,2.188l3.966,3.967L15.427,4.4a1.488,1.488,0,0,0,0-2.1Z" transform="translate(0.001 0)" fill="#fff"/>
                                </svg>
                                <span class="d-none d-md-inline">Alterar</span>
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>

            <ul class="list-unstyled components" id="menu-sidebar">

                <li id="home" class="active menus">
                    <a href="javascript:void(0)" onclick="link('home.php?menu=home')">
                        <div class="item-content">
                            <div class="item-media">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20">
                                    <defs>
                                        <clipPath id="clip-path-home">
                                            <rect id="Image_12" data-name="Image 12" width="20" height="20" transform="translate(841 578)" fill="#fff" stroke="#fff" stroke-width="1" />
                                        </clipPath>
                                    </defs>
                                    <g id="home2" transform="translate(-841 -578)" clip-path="url(#clip-path-home)">
                                        <path id="home-run" d="M17.9,7.991h0L10.4.5A1.691,1.691,0,0,0,8.009.5L.518,7.986l-.008.008a1.691,1.691,0,0,0,1.125,2.882l.052,0h.3v5.515a1.982,1.982,0,0,0,1.98,1.979H6.9a.538.538,0,0,0,.538-.538V13.51a.9.9,0,0,1,.9-.9h1.729a.9.9,0,0,1,.9.9v4.324a.538.538,0,0,0,.538.538h2.932a1.982,1.982,0,0,0,1.98-1.979V10.878H16.7a1.692,1.692,0,0,0,1.2-2.887Zm-.762,1.63a.611.611,0,0,1-.435.18h-.815a.538.538,0,0,0-.538.538v6.053a.9.9,0,0,1-.9.9H12.049V13.51a1.982,1.982,0,0,0-1.98-1.98H8.34a1.982,1.982,0,0,0-1.98,1.98V17.3H3.966a.9.9,0,0,1-.9-.9V10.339A.538.538,0,0,0,2.525,9.8H1.7a.614.614,0,0,1-.423-1.049h0L8.77,1.257a.615.615,0,0,1,.869,0l7.492,7.492,0,0a.616.616,0,0,1,0,.869Zm0,0" transform="translate(841.795 578.814)" fill="#fff" stroke="#fff" stroke-width="0.5" />
                                    </g>
                                </svg>
                            </div>
                            <div class="item-inner">
                                <span class="title">Home</span>
                            </div>
                        </div>
                    </a>
                </li>

                <?php
                $d = dir(ROOT . "portal/modulos");
                while (false !== ($pasta = $d->read())) {
                    if ((is_dir($pasta) && ($pasta != "." && $pasta != "..")) && file_exists($pasta . '/menu.inc.php')) {
                        require_once($pasta . '/menu.inc.php');
                    }
                }
                $d->close();
                ?>
            </ul>
            <p class="text-center bt-blue copyright">© 2022 BlueShift.</p>
            <p class="text-center copyright">Todos os direitos reservados.</p>
        </div>
    </nav>

    <!-- Page Content  -->
    <div id="content">

        <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>portal/modulos/controleAcesso/js/login.js"></script>