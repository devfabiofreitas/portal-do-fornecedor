<script>
    var codigo;
    var foto = "";
    if ($(window).width() <= 767) {
        $('#sidebar').toggleClass('active');
    }

    var nomeCompleto = '<?php echo $usuarioSessao['nome']; ?>';
    var nomeUsuario = [];
    $(nomeCompleto.split(' ')).map(function(i, v) {
        if (i < 2) nomeUsuario.push(v)
    });
    nomeUsuario = nomeUsuario.join(' ');

    $(".nomeUser").text(nomeUsuario);

    $(document).on('click', '.side-button', function() {
        if ($('#sidebar').hasClass('active')) {
            $('#sidebar').removeClass('active');
        } else {
            $('#sidebar').addClass('active')
        }
    });

    keyAcesso = '<?php echo $usuarioSessao['keyAcesso']; ?>';
    foto = '<?php echo $usuarioSessao['foto']; ?>';
    codigo = '<?php echo $usuarioSessao['codigo']; ?>';
    var urlFoto = '';
    // if (foto != "" && foto != null) {
    //     if ('Foto de Perfil') {
    //         var json = JSON.parse(foto);
    //         var dataFoto = new Date(Math.max.apply(null, json.map(function(e) {
    //             if (e.Tipo == 'Foto de Perfil') {
    //                 return new Date(e.Data);
    //             } else {
    //                 return false;
    //             }
    //         })));

    //         var foto = json.filter(e => {
    //             var d = new Date(e.Data);
    //             return d.getTime() == dataFoto.getTime() && e.Tipo == 'Foto de Perfil';
    //         })[0];
    //         if (foto && foto.Status != 'Excluído') {
    //             urlFoto = "<?php echo HTTP_SERVER; ?>internetfiles/" + foto.caminho + foto.MD5;
    //         } else {
    //             urlFoto = '<?php echo HTTP_SERVER; ?>adm/img/user.jpg';
    //         }
    //     } else {
    //         urlFoto = '<?php echo HTTP_SERVER; ?>internetfiles/' + foto;
    //     }
    // } else {
    //     urlFoto = '<?php echo HTTP_SERVER; ?>adm/img/user.jpg';
    // }

    // $('.img-profile #perfil-user').attr('src', urlFoto);
    // $('#modalPerfil').attr('src', urlFoto);


    $("#mudarImagem").click(function() {
        $("#modalMudarImagem").modal("show")
    })
    $("#trocarSenha").click(function() {
        $("#modalTrocarSenha").modal("show")
    })
    $("#alterarSenha").click(function() {
        alterarSenha()
    })

    $("#alterarImagem").click(function() {
        alterarImgPerfil()
    })
    /* $(document).ready(function() {
        verificarId();

    }) */
    $('#btnAddImagem').click(function(event) {
        $('#fotoUsuario').click();
    });

    $('.sidebar-login .dropdown').on('mouseenter', function() {
        $(this).dropdown('toggle');
    });


    $('.sidebar-login').on('mouseleave', function() {
        $(this).dropdown('hide');
    });


    $('#logout').click(function() {
        window.location = '<?php echo HTTP_SERVER ?>portal/modulos/controleAcesso/service/logoff/';
    });

    // if(keyAcesso != ""){
    /* function verificarId() {
        loading.open();

          $.post("<?php echo HTTP_SERVER; ?>portal/modulos/controleAcesso/service/verificarId/", "&codigo=" + codigo, function(result) {
            if ((result.search("gerenciador MySQL") > 0) || (result.search("erro na execução do Comando SQL") > 0)) {
                loading.close();
                swal("Ops... !", "Não foi possível estabelecer uma conexão com o Banco de Dados. Verifique sua conexão com a internet, e recarregue a página novamente. ", "warning");
            } else {
                var obj = JSON.parse(result);
                if (obj.success) {
                    codigo = obj.elements[0].codigo;
                    senha = obj.elements[0].senha;
                    nome = obj.elements[0].nome;
                    for (var [key, value] of Object.entries(obj.elements[0])) {
                        if (key == 'foto') {
                            if (value != "" && value != null) {
                                var obj = JSON.parse(value);
                                if (obj.length > 0) {
                                    var caminho;
                                    var imgMd5;
                                    obj.forEach(function(o, index) {
                                        caminho = o.caminho;
                                        imgMd5 = o.MD5
                                        foto = o;
                                    });

                                    urlFoto = "<?php echo HTTP_SERVER; ?>internetfiles/" + caminho + imgMd5;
                                    $('.img-profile').css('background-image', 'url(' + urlFoto + ')');
                                    $('#modalPerfil').css('background-image', 'url(' + urlFoto + ')');
                                } else {
                                    urlFoto = "<?php echo HTTP_SERVER; ?>internetfiles/" + caminho + imgMd5;
                                    $('.img-profile').css('background-image', 'url(' + '<?php echo HTTP_SERVER; ?>adm/img/user.jpg' + ')');
                                    $('#modalPerfil').css('background-image', 'url(' + '<?php echo HTTP_SERVER; ?>adm/img/user.jpg' + ')');
                                }
                            }
                        }
                    }
                    $('#btnAlterar').attr('disabled', false);

                    loading.close();
                } else {
                    loading.close();
                    swal("Ops... !", "Parece que ocorreu um erro de validação, por favor verifique se o email enviado é atual e tente novamente.", "error");
                }
            }
        }).fail(function() {
            loading.close();
            swal("Ops... !", "Parece que ocorreu um erro na captura dos dados. ", "error");
        });
    }
    // }else{
    //     swal("Ops... !", "Usuário não possui chave de acesso. ", "error");
    // } */

    function alterarImgPerfil() {
        var params = main.getFormData($("#formDadosPrincipais"));
        var documentos = [];
        var jsonDoc = {};

        jsonDoc['alterar'] = documentos;

        params['documentos'] = '';
        params['documentosAlterados'] = jsonDoc;
        params['codigo'] = codigo;


        pegarImagemPerfil();
        $(main.infosAnexos).each(function(i) {
            if (this['tipo'] == '') {
                this['tipo'] = $('#' + main.infosAnexos[i].id + ' select').val();
            }
        });

        main.executarAPI('update_foto_perfil', 'UPDATE', 'Alteração de Status de Arquivo', JSON.stringify(params), function(obj) {
            if (obj.success) {
                main.anexos = [];
                main.infosAnexos = [];
                $('#Usuario-foto').val('');
                toastr.success("Dados alterados com sucesso.", "Sucesso!");
                verificarId();

                loading.close();
            } else {
                toastr.error("Ocorreu um erro. Verifique sua conexão com a internet, e tente novamente mais tarde.", "Ops... !");
                loading.close();
            }
        }, 'updateFotoPerfil');

    }

    function alterarSenha() {
        var atual = $("#senhaAtual").val();
        var nova = $("#senhaNova").val();
        var novaValida = $("#senhaNovaValida").val();

        if (nova == "" || novaValida == "") {
            Swal.fire("Ops...!", "Você precisa preencher os campos. ", "warning");
        } else {
            if (nova != novaValida) {
                Swal.fire("Ops...!", "As senhas estão diferentes, por favor digite novamente. ", "warning");
                $("#senhaNova").val('');
                $("#senhaNovaValida").val('');
            } else {
                if (nova.length < 4) {
                    Swal.fire("Ops...!", "Sua nova senha deve conter no mínimo quatro caracteres, por favor digite novamente.", "warning");
                    $("#senhaNova").val('');
                    $("#senhaNovaValida").val('');
                } else {
                    loading.open();

                    var parametros = {
                        senhaAtual: atual,
                        senhaNova: nova,
                        novaValida: novaValida,
                        nome: nome,
                        codigo: codigo,
                        senha: senha,
                        key: keyAcesso
                    };

                    $.post("<?php echo HTTP_SERVER; ?>portal/modulos/controleAcesso/service/alterarSenhaLogin/", "&" + $.param(parametros), function(result) {
                        if ((result.search("gerenciador MySQL") > 0) || (result.search("erro na execução do Comando SQL") > 0)) {
                            loading.close();
                            Swal.fire("Ops... !", "Não foi possível estabelecer uma conexão com o Banco de Dados. Verifique sua conexão com a internet, e recarregue a página novamente. ", "warning");
                        } else {
                            var obj = JSON.parse(result);

                            if (obj.success) {
                                document.getElementById('formAlterarSenha').reset();
                                Swal.fire("", "Senha alterada com sucesso", "success");
                                loading.close();
                            } else {
                                $("#senhaNova").val('');
                                $("#senhaNovaValida").val('');
                                loading.close();
                                Swal.fire("", obj.message, "warning");
                            }
                        }
                    }).fail(function() {
                        loading.close();
                        Swal.fire("Ops... !", "Parece que ocorreu um erro na captura dos dados. ", "error");
                    });
                }
            }
        }
    }

    $('#btnExcluirImagem').click(function() {
        Swal.fire({
            title: "Excluir!",
            text: "Deseja realmente excluir esse arquivo?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar ",
            confirmButtonColor: "#dc3545 ",
            confirmButtonText: "Sim!",
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                excluirImagem('bodyFotoUsuario');
            }
        });
    });

    function pegarImagemPerfil() {
        var img = $('#fotoUsuario').prop('files')[0];
        if (img) {
            var obj = {
                "id": 'perfil',
                "tipo": 'Foto de Perfil',
                "coluna": 'foto',
                "caminho": 'foto_usuario/usuario_'
            }
            main.anexos.push(img);
            main.infosAnexos.push(obj);
        }
        // $(main.infosAnexos).each(function(i){   
        //     if(this['tipo'] == ''){         
        //         this['tipo'] = $('#' + main.infosAnexos[i].id + ' select').val();
        //     }
        // });
    }

    // function excluirImagem(id) {
    //     console.log(foto);
    //     // var codigo = 2;
    //     // var codigo = "wsnA1ZDw2sYrj7M";
    //     if (codigo && codigo != "" && foto.imagemAntiga != null) {
    //         loading.open();

    //         var params = {
    //             codigo: codigo,
    //             md5: foto.imagemAntiga.MD5,
    //             status: 'Excluído'
    //         };
    //         console.log(params);
    //         // return;
    //         main.executarAPI('alterar_status_foto_perfil', 'UPDATE', 'Alteração de Status de Arquivo', JSON.stringify(params), function(obj) {
    //             if (obj.success) {
    //                 $('#' + id + ' .foto-img').attr('src', '../../../../adm/img/user.jpg');
    //                 $('#' + id + ' .foto').prop("disabled", false);
    //                 $('#btnExcluirImagem').addClass('d-none');
    //                 $('#btnAddImagem').removeClass('d-none');
    //                 $('#' + id + ' .btn-excluir-foto').addClass('d-none');
    //                 $('#' + id + ' .btn-add-foto').removeClass('d-none');
    //                 foto.imagemAntiga = null;
    //                 toastr.success("Imagem deletada com sucesso!");
    //                 loading.close();
    //             } else {
    //                 toastr.error("Ocorreu um erro. Verifique sua conexão com a internet, e tente novamente mais tarde.", "Ops... !");
    //                 loading.close();
    //             }
    //         }, 'updateFotoPerfil');
    //     } else {
    //         $('#' + id + ' .foto-img').attr('src', '../../../../adm/img/user.jpg');
    //         $('#' + id + ' .btn-excluir-foto').addClass('d-none');
    //         $('#' + id + ' .btn-add-foto').removeClass('d-none');
    //     }
    // }

    main.configurarUpload('fotoUsuario', ["image/jpg", "image/jpeg", "image/png"], 'background');
</script>
</body>

</html>