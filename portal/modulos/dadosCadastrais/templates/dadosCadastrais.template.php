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

    <link rel="stylesheet" href="<?= HTTP_SERVER; ?>lib/bootstrap-4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER; ?>lib/font-awesome/css/all.min.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER; ?>lib/loading/loading.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER; ?>lib/toastr/toastr.min.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER; ?>lib/select2/select2.min.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER; ?>lib/datetimepicker/css/bootstrap-datetimepicker.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER; ?>lib/jquery-smartwizard-master/dist/css/smart_wizard_all.min.css">
    <link rel="stylesheet" href="<?= HTTP_SERVER; ?>portal/css/style.css?6">
    <link rel="stylesheet" href="css/style.css?11">

    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/jquery/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/popper.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/jquery/jquery.mask.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/select2/select2.full.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/sweetalert/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/toastr/toastr.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/handlebars-v4.0.5/handlebars-v4.0.5.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/datetimepicker/js/moment-with-locales.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/jquery-smartwizard-master/dist/js/jquery.smartWizard.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/bootstrap-table/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/bootstrap-table/extensions/sticky-header/bootstrap-table-sticky-header.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/bootstrap-table/extensions/fixed-columns/bootstrap-table-fixed-columns.min.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/bootstrap-table/locale/bootstrap-table-pt-BR.min.js"></script>
</head>

<body class="home">
    <script>
        <?= $alerta_swal ?>
    </script>
    <main class="pt-4 container-fluid ">
        <div class="body-header">
            <div class="container-fluid header-pag py-2">
                <div class="row align-items-center">
                    <div class="header-global">
                        <h1 class="mb-0 font-cairo-bold ">
                            Meus Dados /
                            <span id="tituloStep" class="font-cairo-bold">
                                Dados do Responsável Técnico
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div id="main-body" class="overflow-xs-auto">
            <div id="smartwizard">
                <ul class="nav">
                    <li>
                        <a class="nav-link font-cairo-bold" id="et-1" href="#step-1" title="Dados do Responsável Técnico">
                            <span class="span-smart" data-toggle="tooltip" data-placement="bottom" title="Dados do Responsável Técnico">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20">
                                    <defs>
                                        <clipPath id="clip-path-dPrincipais">
                                            <rect id="Rectangle_989" data-name="Rectangle 989" width="20" height="20" transform="translate(809 352)" fill="#fff" stroke="#707070" stroke-width="1" />
                                        </clipPath>
                                    </defs>
                                    <g id="_Dados_Principais" data-name=" Dados Principais" transform="translate(-809 -352)" clip-path="url(#clip-path-dPrincipais)">
                                        <path id="person_1_" data-name="person (1)" d="M10,20A10,10,0,0,1,2.929,2.929,10,10,0,0,1,17.071,17.071,9.935,9.935,0,0,1,10,20ZM10,1.563A8.438,8.438,0,1,0,18.438,10,8.447,8.447,0,0,0,10,1.563Zm-.039,9.18a3.75,3.75,0,1,1,3.75-3.75A3.754,3.754,0,0,1,9.961,10.742Zm0-5.937a2.188,2.188,0,1,0,2.188,2.188A2.19,2.19,0,0,0,9.961,4.8Zm4.95,10.487a.781.781,0,0,0,.109-1.1,5.769,5.769,0,0,0-4.478-2.122H9.615a5.769,5.769,0,0,0-4.478,2.122.781.781,0,0,0,1.209.99,4.212,4.212,0,0,1,3.27-1.55h.927a4.212,4.212,0,0,1,3.27,1.55.781.781,0,0,0,1.1.109Z" transform="translate(809 352)" />
                                    </g>
                                </svg>
                            </span>
                        </a>
                    </li>
                    <?php if (!$usuario_clt) : ?>
                        <li>
                            <a class="nav-link font-cairo-bold" id="et-2" href="#step-2" title="Dados da Empresa">
                                <span class="span-smart" data-toggle="tooltip" data-placement="bottom" title="Dados da Empresa">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20">
                                        <defs>
                                            <clipPath id="clip-path-empresa">
                                                <rect id="Rectangle_979" data-name="Rectangle 979" width="20" height="20" transform="translate(788 560)" fill="#fff" stroke="#707070" stroke-width="1" />
                                            </clipPath>
                                        </defs>
                                        <g id="Empresa" transform="translate(-788 -560)" clip-path="url(#clip-path-empresa)">
                                            <path id="work_1_" data-name="work (1)" d="M19.418,2.344H14.1V1.758A1.76,1.76,0,0,0,12.344,0H7.656A1.76,1.76,0,0,0,5.9,1.758v.586H.586A.587.587,0,0,0,0,2.93V15.82a1.76,1.76,0,0,0,1.758,1.758H18.242A1.76,1.76,0,0,0,20,15.82V2.94a.569.569,0,0,0-.582-.6ZM7.07,1.758a.587.587,0,0,1,.586-.586h4.688a.587.587,0,0,1,.586.586v.586H7.07ZM18.6,3.516l-1.82,5.459a.585.585,0,0,1-.556.4h-3.3V8.789a.586.586,0,0,0-.586-.586H7.656a.586.586,0,0,0-.586.586v.586h-3.3a.585.585,0,0,1-.556-.4L1.4,3.516ZM11.758,9.375v1.172H8.242V9.375Zm7.07,6.445a.587.587,0,0,1-.586.586H1.758a.587.587,0,0,1-.586-.586V6.54l.935,2.8a1.755,1.755,0,0,0,1.667,1.2h3.3v.586a.586.586,0,0,0,.586.586h4.688a.586.586,0,0,0,.586-.586v-.586h3.3a1.755,1.755,0,0,0,1.667-1.2l.935-2.8Zm0,0" transform="translate(788 561.211)" />
                                        </g>
                                    </svg>
                                </span>
                            </a>
                        </li>
                    <?php endif ?>
                    <li>
                        <a class="nav-link font-cairo-bold" id="et-3" href="#step-3" title="Dados Bancários">
                            <span class="span-smart" data-toggle="tooltip" data-placement="bottom" title="Dados Bancários">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20">
                                    <defs>
                                        <clipPath id="clip-path-dBancarios">
                                            <rect id="Rectangle_978" data-name="Rectangle 978" width="20" height="20" transform="translate(788 524)" fill="#fff" stroke="#707070" stroke-width="1" />
                                        </clipPath>
                                    </defs>
                                    <g id="Dados_Bancarios" data-name="Dados Bancarios" transform="translate(-788 -524)" clip-path="url(#clip-path-dBancarios)">
                                        <g id="bank" transform="translate(788 524)">
                                            <g id="Group_893" data-name="Group 893">
                                                <path id="Path_4635" data-name="Path 4635" d="M18.791,7.457a1.174,1.174,0,0,0,1.172-1.172V4.767a1.167,1.167,0,0,0-.735-1.087L10.439.086a1.167,1.167,0,0,0-.875,0L.771,3.68A1.167,1.167,0,0,0,.036,4.767V6.285A1.174,1.174,0,0,0,1.208,7.457h.7v8.831h-.7A1.174,1.174,0,0,0,.036,17.46v1.368A1.174,1.174,0,0,0,1.208,20H18.791a1.174,1.174,0,0,0,1.172-1.172V17.46a1.174,1.174,0,0,0-1.172-1.172h-.7V7.457h.7Zm0,10c0,1.4,0,1.368,0,1.368H1.208V17.46ZM3.084,16.288V7.457H4.412v8.831Zm2.5,0V7.457H8.164v8.831Zm3.751,0V7.457h1.328v8.831Zm2.5,0V7.457h2.579v8.831Zm3.751,0V7.457h1.328v8.831Zm-14.379-10c0-1.635,0-1.517,0-1.519L10,1.173l8.787,3.593c.006,0,0-.112,0,1.519H1.208Z" />
                                            </g>
                                            <g id="Group_894" data-name="Group 894">
                                                <path id="Path_4636" data-name="Path 4636" d="M10,2.534a.586.586,0,0,0-.586.586v1.25a.586.586,0,0,0,1.172,0V3.12A.586.586,0,0,0,10,2.534Z" />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link font-cairo-bold" id="et-4" href="#step-4" title="Alterar Senha">
                            <span class="span-smart" data-toggle="tooltip" data-placement="bottom" title="Alterar Senha">
                                <i class="fas fa-key"></i>
                            </span>
                        </a>
                    </li>
                </ul>
                <div class=" modal-body overflow-sm-auto">
                    <div class="tab-content">
                        <!-- DADOS DO RESPONSÁVEL TÉCNICO -->

                        <div id="step-1" class="tab-pane" role="tabpanel">
                            <div class="card-body accordian">
                                <div class="px-2" data-value="responsavelTecnico">
                                    <div class="px-3">
                                        <form class="validar formValidar" id="formResponsavelTecnico" name="formResponsavelTecnico" action="cadastroDados.php" method="POST"  onsubmit="loading.open()">
                                            <div class="body-multi-content p-0">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label for="nome">Nome civil</label>
                                                        <input type="text" id="nome"  name="nome" class="form-control rounded-pill" value="<?= $dados_colaborador['nome'] ?>" readonly>
                                                    </div>
                                                    <div class="col-md-2 form-group">
                                                        <label for="cpf">CPF</label>
                                                        <input type="text" id="cpf" name="cpf" class="form-control  mask-cpf rounded-pill " maxlength="18" value="<?= $dados_colaborador['cpf'] ?>" readonly>
                                                    </div>
                                                    <div class="col-md-4 form-group">
                                                        <label for="email">Email na empresa</label>
                                                        <input type="text" id="email" name="email" class="form-control rounded-pill" value="<?= $dados_colaborador['email'] ?>" readonly>
                                                    </div>
                                                    <div class="col-md-2 form-group">
                                                        <label for="dataInicio">Inicio na empresa</label>
                                                        <input type="date" id="dataInicio" name="dataInicio" class="form-control rounded-pill" value="<?= $dados_colaborador['dataInicio'] ?>" readonly>
                                                    </div>
                                                    <div class="col-md-3 form-group">
                                                        <label for="telefonePais">Selecione o País<span class="text-danger">*</span></label>
                                                        <select id="telefonePais" data-verificar="false" name="telefonePais" class="form-control rounded-pill validarCampo tipoTelefone obrigatorio" required>

                                                            <option value="Brasil" <?= ($dados_colaborador['telefonePais'] == 'Brasil') ? 'selected' : '' ?>>
                                                                Brasil (+55)
                                                            </option>
                                                            <option value="Estados unidos" <?= ($dados_colaborador['telefonePais'] == 'Estados unidos') ? 'selected' : '' ?>>
                                                                Estados Unidos (+1)
                                                            </option>
                                                            <option value="Espanha" <?= ($dados_colaborador['telefonePais'] == 'Espanha') ? 'selected' : '' ?>>
                                                                Espanha (+34)
                                                            </option>
                                                            <option value="Portugal" <?= ($dados_colaborador['telefonePais'] == 'Portugal') ? 'selected' : '' ?>>
                                                                Portugal (+351)
                                                            </option>
                                                            <option value="Irlanda" <?= ($dados_colaborador['telefonePais'] == 'Irlanda') ? 'selected' : '' ?>>
                                                                Irlanda (+353)
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3 form-group">
                                                        <label for="telefone">Telefone pessoal<span class="text-danger">*</span></label>
                                                        <input type="text" id="telefone" data-verificar="false" name="telefone" class="form-control rounded-pill validarCampo mask-celular obrigatorio" required value="<?= $dados_colaborador['telefone'] ?>">
                                                    </div>
                                                    <div class="col-md-4 form-group">
                                                        <label for="emailPessoal">Email pessoal<span class="text-danger">*</span></label>
                                                        <input type="text" id="emailPessoal" data-verificar="false" name="emailPessoal" class="form-control validarCampo rounded-pill obrigatorio" required value="<?= $dados_colaborador['emailPessoal'] ?>">
                                                    </div>
                                                    <div class="col-md-2 form-group">
                                                        <label for="dataNascimento">Data de nascimento<span class="text-danger">*</span></label>
                                                        <input type="text" id="dataNascimento" data-verificar="false" name="dataNascimento" class="form-control datepicker validarCampo data rounded-pill obrigatorio" required value="<?= $data_nascimento_formatada ?>">
                                                    </div>
                                                    <div class="col-md-3 form-group">
                                                        <label for="telefonePaisEmergencia">Selecione o País<span class="text-danger">*</span></label>
                                                        <select id="telefonePaisEmergencia" data-verificar="false"  name="telefonePaisEmergencia" class="form-control validarCampo rounded-pill tipoTelefone obrigatorio" required>

                                                            <option value="Brasil" <?= ($dados_colaborador['telefonePaisEmergencia'] == 'Brasil') ? 'selected' : '' ?>>
                                                                Brasil (+55)
                                                            </option>
                                                            <option value="Estados unidos" <?= ($dados_colaborador['telefonePaisEmergencia'] == 'Estados unidos') ? 'selected' : '' ?>>
                                                                Estados Unidos (+1)
                                                            </option>
                                                            <option value="Espanha" <?= ($dados_colaborador['telefonePaisEmergencia'] == 'Espanha') ? 'selected' : '' ?>>
                                                                Espanha (+34)
                                                            </option>
                                                            <option value="Portugal" <?= ($dados_colaborador['telefonePaisEmergencia'] == 'Portugal') ? 'selected' : '' ?>>
                                                                Portugal (+351)
                                                            </option>
                                                            <option value="Irlanda" <?= ($dados_colaborador['telefonePaisEmergencia'] == 'Irlanda') ? 'selected' : '' ?>>
                                                                Irlanda (+353)
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3 form-group">
                                                        <label for="telefoneEmergencia">Telefone para emergência<span class="text-danger">*</span></label>
                                                        <input type="text" id="telefoneEmergencia" data-verificar="false" name="telefoneEmergencia" class="form-control validarCampo rounded-pill mask-celular obrigatorio" required value="<?= $dados_colaborador['telefoneEmergencia'] ?>">
                                                    </div>
                                                    <div class="col-md-3 form-group">
                                                        <label for="contatoEmergencia">Contato para emergência<span class="text-danger">*</span></label>
                                                        <input type="text" id="nomeEmergencia" data-verificar="false" name="nomeEmergencia" placeholder="Ex: João (pai)" class="form-control validarCampo rounded-pill obrigatorio" required value="<?= $dados_colaborador['nomeEmergencia'] ?>">
                                                    </div>
                                                    <div class="col-md-2 form-group">
                                                        <label for="qtdFilhos">Quantidade de filhos<span class="text-danger">*</span></label>
                                                        <input type="number" id="qtdFilhos" data-verificar="false" name="qtdFilhos" class="form-control  validarCampo obrigatorio rounded-pill" required value="<?= $qtdFilhos_colaborador['qtdFilhos'] ?>">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="text-center botaoDados mt-5">
                                                <input type="hidden" name="codigoUsuario" value="<?= $usuario_codigo ?>">
                                                <button type="submit" class="btn btn-success rounded-pill btn-alterar" name="action" value="atualizarDados">
                                                    Salvar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <?php if (!$usuario_clt) : ?>
                            <!-- DADOS DA EMPRESA  -->

                            <div id="step-2" class="tab-pane" role="tabpanel">
                                <div class="card-body">
                                    <div class="px-2" data-value="dadosEmpresa">
                                        <div class="px-3">
                                            <form class="formValidar validar" id="formDadosEmpresa" action="cadastroDados.php" method="POST" name="formDadosEmpresa" onsubmit="loading.open()">
                                                <div class="body-multi-content px-0">
                                                    <div class="row">
                                                        <div class=" col-md-6  form-group">
                                                            <label for="cnpj">CNPJ <span class="text-danger">*</span></label>
                                                            <input type="text" id="cnpj" name="cnpj" class="form-control  mask-cnpj rounded-pill" value="<?= $dados_colaborador['cnpj'] ?>" readonly maxlength="18">
                                                        </div>
                                                        <div class="col-md-6 form-group">
                                                            <button type="button" id="btnAtualizarDadosEmpresa" class="btn btn-success" data-toggle="popover" title="Buscaremos as informações na receita federal a partir do CNPJ cadastrado">
                                                                Atualizar dados da empresa
                                                            </button>
                                                        </div>
                                                        <div class=" col-md-6 form-group">
                                                            <label for="razaoSocial">Razão social<span class="text-danger">*</span></label>
                                                            <input type="text" id="razaoSocial" data-verificar="false" name="razaoSocial" class="form-control validarCampo obrigatorio rounded-pill" value="<?= $dados_colaborador['razaoSocial'] ?>" readonly>
                                                        </div>
                                                        <div class="col-md-6 form-group">
                                                            <label for="nomeFantasia">Nome fantasia</label>
                                                            <input type="text" id="nomeFantasia" name="nomeFantasia" class="form-control rounded-pill" value="<?= $dados_colaborador['nomeFantasia'] ?>" readonly>
                                                        </div>
                                                        <div class="col-md-2 form-group">
                                                            <label for="tipo">Tipo</label>
                                                            <input type="text" id="tipo" name="tipo" class="form-control rounded-pill " value="<?= $dados_colaborador['tipo'] ?>" readonly>
                                                        </div>
                                                        <div class="col-md-4 form-group">
                                                            <label for="porte">Porte</label>
                                                            <input type="text" id="porte" name="porte" class="form-control rounded-pill " value="<?= $dados_colaborador['porte'] ?>" readonly>
                                                        </div>
                                                        <div class=" col-md-4 form-group">
                                                            <label for="naturezaJuridica">Natureza jurídica</label>
                                                            <input type="text" id="naturezaJuridica" name="naturezaJuridica" class="form-control rounded-pill " value="<?= $dados_colaborador['naturezaJuridica'] ?>" readonly>
                                                        </div>
                                                        <div class="col-md-2 form-group">
                                                            <label for="dataAbertura">Data de abertura</label>
                                                            <input type="date" id="dataAbertura" name="dataAbertura" class="form-control rounded-pill" value="<?= $dados_colaborador['dataAbertura'] ?>" readonly>
                                                        </div>
                                                        <div class="col-md-2 form-group">
                                                            <label for="cep">CEP<span class="text-danger">*</span></label>
                                                            <input type="text" id="cep" name="cep" data-verificar="false" class="form-control rounded-pill validarCampo obrigatorio cep mask-cep" value="<?= $dados_colaborador['cep'] ?>" readonly>
                                                        </div>
                                                        <div class=" col-md-5  form-group">
                                                            <label for="logradouro">Logradouro<span class="text-danger">*</span></label>
                                                            <input type="text" id="logradouro" name="logradouro" class="form-control obrigatorio rounded-pill validarCampo logradouro" value="<?= $dados_colaborador['logradouro'] ?>" readonly>
                                                        </div>
                                                        <div class=" col-md-1  form-group">
                                                            <label for="numero">Nº<span class="text-danger">*</span></label>
                                                            <input type="text" id="numero" name="numero" data-verificar="false" class="form-control obrigatorio validarCampo rounded-pill numero" value="<?= $dados_colaborador['numero'] ?>" readonly>
                                                        </div>
                                                        <div class=" col-md-4  form-group">
                                                            <label for="complemento">Complemento</label>
                                                            <input type="text" id="complemento" data-verificar="false" name="complemento" class="form-control rounded-pill complemento" value="<?= $dados_colaborador['complemento'] ?>" readonly>
                                                        </div>
                                                        <div class="col-md-4  form-group">
                                                            <label for="bairro">Bairro<span class="text-danger">*</span></label>
                                                            <input type="text" id="bairro" data-verificar="false" name="bairro" class="form-control obrigatorio validarCampo rounded-pill bairro" value="<?= $dados_colaborador['bairro'] ?>" readonly>
                                                        </div>
                                                        <div class=" col-md-4  form-group">
                                                            <label for="cidade">Cidade<span class="text-danger">*</span></label>
                                                            <input type="text" id="cidade" data-verificar="false" name="cidade" class="form-control obrigatorio validarCampo rounded-pill cidade" value="<?= $dados_colaborador['cidade'] ?>" readonly>
                                                        </div>
                                                        <div class="col-md-2 form-group">
                                                            <label for="estado">Estado<span class="text-danger">*</span></label>
                                                            <input type="text" id="estado" data-verificar="false" name="estado" class="form-control obrigatorio validarCampo rounded-pill estado" value="<?= $dados_colaborador['estado'] ?>" readonly>
                                                        </div>
                                                        <div class="col-12 pt-4">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="text-center botaoDadosEmpresa mt-5">
                                                    <input type="hidden" name="codigoUsuario" value="<?= $usuario_codigo ?>">
                                                    <button type="submit" class="btn btn-success rounded-pill btn-alterar " name="action" value="atualizarDadosEmpresa">
                                                        Salvar
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php endif ?>

                        <!-- DADOS BANCARIOS  -->

                        <div id="step-3" class="tab-pane" role="tabpanel">
                            <div class="card-body">
                                <div class="px-2" data-value="dadosBancarios">
                                    <div class="px-3">
                                        <form class="formValidar" id="formDadosBancarios" name="formDadosBancarios">
                                            <div class="body-multi-content px-0">
                                                <div class="row">
                                                    <div class="col-md-5 form-group">
                                                        <label for="beneficiario">Beneficiário</label>
                                                        <input type="text" id="beneficiario" name="beneficiario" class="form-control obrigatorio  rounded-pill" value="<?= $dados_colaborador['beneficiario'] ?>" readonly>
                                                    </div>
                                                    <div class="col-md-3 form-group">
                                                        <label for="tipoDocumento">Tipo</label>
                                                        <input type="text" id="tipoDocumento" name="tipoDocumento" class="form-control tipo obrigatorio  rounded-pill" value="<?= $dados_colaborador['tipoDocumento'] ?>" readonly>
                                                        </input>
                                                    </div>
                                                    <div class="col-md-4 form-group">
                                                        <label for="documento">Documento</label>
                                                        <input type="text" id="documento" name="documento" class="form-control  obrigatorio  rounded-pill documento" maxlength="18" value="<?= $dados_colaborador['documento'] ?>" readonly>
                                                    </div>
                                                    <div class="col-md-4 form-group">
                                                        <label for="bancoNumero">Banco</label>
                                                        <input type="text" id="bancoNumero" name="bancoNumero" class="bancoNumero form-control obrigatorio   rounded-pill" value="<?= $dados_colaborador['bancoNumero'] . ' - ' . $dados_colaborador['banco'] ?>" readonly>
                                                    </div>
                                                    <div class="col-md-2 form-group">
                                                        <label for="agencia">Agência</label>
                                                        <input type="text" id="agencia" name="agencia" class="number form-control obrigatorio  rounded-pill" maxlength="4" value="<?= $dados_colaborador['agencia'] ?>" readonly>
                                                    </div>
                                                    <div class="col-md-2 form-group">
                                                        <label for="digitoAgencia">Dígito agência</label>
                                                        <input type="text" id="digitoAgencia" name="digitoAgencia" class="number form-control obrigatorio  rounded-pill" maxlength="1" value="<?= $dados_colaborador['digitoAgencia'] ?>" readonly>
                                                    </div>
                                                    <div class="col-md-2 form-group">
                                                        <label for="conta">Conta</label>
                                                        <input type="text" id="conta" name="conta" class="number form-control obrigatorio rounded-pill" maxlength="12" value="<?= $dados_colaborador['conta'] ?>" readonly>
                                                    </div>
                                                    <div class="col-md-2  form-group">
                                                        <label for="digitoConta">Dígito conta</label>
                                                        <input type="text" id="digitoConta" name="digitoConta" class="number form-control obrigatorio  rounded-pill" maxlength="1" value="<?= $dados_colaborador['digitoConta'] ?>" readonly>
                                                    </div>
                                                    <div class="col-12 form-group">
                                                        <b><span class="text-danger">*</span>
                                                            <span>
                                                                Caso deseje realizar alterações em seus dados bancários entre em contato com o financeiro.
                                                            </span></b>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- ALTERAR SENHA -->

                        <div id="step-4" class="tab-pane" role="tabpanel">
                            <div class="card-body">
                                <div class="px-2" data-value="alterarSenha">
                                    <div class="px-3 senha">
                                        <form id="formAlterarSenha" class="formValidar" data-value="alterarSenha" name="formAlterarSenha" action="cadastroDados.php" method="post" onsubmit="loading.open()">
                                            <div class="body-multi-content px-0">
                                                <div class="row">
                                                    <div class="col-sm-6 col-md-3 form-group">
                                                        <label for="novaSenha">
                                                            Nova senha
                                                            <span class="text-danger">*</span>
                                                        </label>
                                                        <div class="input-group campoSenha mt-1">
                                                            <input class="form-control rounded-pill" type="password" name="senhaNova" id="senhaNova" required>
                                                            <div class="input-group-append iconSenha">
                                                                <div class="px-2 align-self-center">
                                                                    <i id="mostrarNovaSenha" class="fa fa-eye-slash" aria-hidden="true" title="Exibir senha" style="cursor:pointer"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6 col-md-3 form-group">
                                                        <label for="confirmarNovaSenha">
                                                            Confirmar senha
                                                            <span class="text-danger">*</span>
                                                        </label>
                                                        <div class="input-group campoSenha mt-1">
                                                            <input class="form-control rounded-pill" type="password" name="senhaNovaValida" id="senhaNovaValida" required>
                                                            <div class="input-group-append iconSenha">
                                                                <div class="px-2 align-self-center">
                                                                    <i id="mostrarConfirmarNovaSenha" class="fa fa-eye-slash" aria-hidden="true" title="Exibir senha" style="cursor:pointer"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="text-center botaoSenha mt-5">
                                                    <input type="hidden" name="codigoUsuario" value="<?= $usuario_codigo ?>">
                                                    <button type="submit" class="btn btn-success rounded-pill " name="action" value="atualizarSenha">
                                                        Salvar
                                                    </button>
                                                </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="salvar" id="controle-wizard">

                    <button id="" data-placement="top" title="Anterior" class="btn sw-btn-prev rounded-pill py-2 px-4 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="7.876" height="13.777" viewBox="0 0 7.876 13.777">
                            <g id="icon-arrow" transform="translate(7.876) rotate(90)">
                                <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M5.5,6.887.289,1.678A.985.985,0,1,1,1.684.288l5.906,5.9a.983.983,0,0,1,.029,1.358L1.688,13.49A.985.985,0,0,1,.293,12.1Z" transform="translate(13.777) rotate(90)" fill="#fff" />
                            </g>
                        </svg>
                    </button>
                    <button id="" data-placement="top" title="Próximo" class="btn sw-btn-next rounded-pill py-2 px-4 ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="7.876" height="13.777" viewBox="0 0 7.876 13.777">
                            <g id="icon-arrow" transform="translate(0 13.777) rotate(-90)">
                                <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M5.5,6.887.289,1.678A.985.985,0,1,1,1.684.288l5.906,5.9a.983.983,0,0,1,.029,1.358L1.688,13.49A.985.985,0,0,1,.293,12.1Z" transform="translate(13.777) rotate(90)" fill="#fff" />
                            </g>
                        </svg>
                    </button>
                </footer>
            </div>
        </div>
    </main>
    <div class="modal fade" id="modalCamposObrigatorios" tabindex="-1" role="dialog">
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
                                        <div class="form-row">
                                            <div class="col-12 container-body justify-content-center">
                                                <h4> Matenha seus dados atualizados! É necessário atualizar os dados abaixo:</h4>
                                                <div id="listaDadosPendentes"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer pt-1 d-flex justify-content-center align-items-center">
                                <div class="btn-center">
                                    <button type="button" id="btnPreencherDadosFaltantes" class="btn btn-atualizar rounded-pill px-md-4" data-dismiss="modal" data-target="modalCamposObrigatorios">
                                        <span class="d-md-inline">Preencher agora</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script>
        let httpServer = '<?= HTTP_SERVER; ?>';
    </script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/lottie-player/lottie-player.js"></script>
    <script type="text/javascript" src="<?= HTTP_SERVER; ?>lib/loading/Loading.class.js"></script>

    <script src="<?= HTTP_SERVER; ?>portal/js/main.js?1"></script>
    <script src="js/dadosCadastrais.js?31"></script>
</body>

</html>