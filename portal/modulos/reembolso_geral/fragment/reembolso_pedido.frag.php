<?php
error_reporting(E_STRICT);
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");
session_start();
require_once('../../../../properties.inc.php');
require_once('../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
require_once('../../controleAcesso/service/verificarSessao/index.php');

$usuarioSessao = $do->getUserSession();
$usuarioNome = $usuarioSessao['nome'];
$usuarioCodigo = $usuarioSessao['codigo'];
$usuarioCpf = $usuarioSessao['cpf'];

require_once('../src/listagens.php');
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
  <meta content="DoControl" name="author" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">

  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/font-awesome/css/all.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/loading/loading.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/daterangepicker/css/daterangepicker.css">

  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/bootstrap-table.min.css">
  <link rel="stylesheet"
    href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/extensions/sticky-header/bootstrap-table-sticky-header.min.css">
  <link rel="stylesheet"
    href="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/extensions/fixed-columns/bootstrap-table-fixed-columns.min.css">
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/css/style.css?20" />
  <link rel="stylesheet" href="<?php echo HTTP_SERVER; ?>portal/modulos/reembolso/css/style.css?20" />

  <script>
    let httpServer = '<?php echo HTTP_SERVER; ?>';
  </script>

  <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.js"></script>
  <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/jquery/jquery-3.3.1.min.js"></script>


</head>

<body class="home">
  <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/lottie-player/lottie-player.js"></script>

  <script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/loading/Loading.class.js"></script>
  <script>
    loading.open();
  </script>
  <script>
    <?php
    // le as variaveis $status e $message passadas
    // pelo PHP atraves da URL da página
    // para mais informacoes, olhar src/anexarNota.php
    if (isset($_REQUEST['menssagem-erro'])) {

      $message = $_REQUEST['menssagem-erro'];
      echo "Swal.fire('Ops... !', '$message', 'warning')";
    }
    ?>
  </script>
  <div class="content">
    <div class="header d-flex justify-content-between">
      <div class="container-fluid header-pag py-2 d-flex justify-content-between align-items-center">

        <?php if (isset($_REQUEST['codigo'])) { ?>
          <h1 id="linkHorasProjeto" class="mb-0 linkTimesheet span-black font-cairo-bold">Reembolso / Detalhes do Pedido
          </h1>
        <?php } else { ?>

          <h1 id="linkHorasProjeto" class="mb-0 linkTimesheet span-black font-cairo-bold">Reembolso / Novo Pedido
          </h1>
        <?php } ?>



        <div id="toolbar float-right">
          <button type="button" id="newReembolso" class="btn btn-outline-success">
            ADICIONAR REEMBOLSO
          </button>
        </div>




      </div>
    </div>
    <div id="main-body" style="margin-top: 45px;">
      <div id="activeFilters" class="container-fluid py-2 d-flex align-items-center">
      </div>
      <div class="container-fluid CardParaTabela">
        <div class="container-table">
          <div id="divMainTable" class="table-responsive table-container">
          </div>

          <table id="mainTable" data-pagination-h-align="left" data-pagination="true" table-borderless="true"
            data-show-header="true" data-click-to-select="true" data-toolbar="#toolbar" data-locale="pt-BR"
            data-sticky-header="false" data-sticky-header-offset-left="3.5rem" data-sticky-header-offset-right="3.5rem"
            class="table-borderless
">
            <tbody id="bodyReembolso">
            </tbody>

          </table>

          <div class="d-flex mt-4" style="place-content: space-between; align-items: center;">

            <div class="valor-total">
              <span>Valor Total: <h3>R$ 00,00<h3></span>
            </div>


            <button type="button" name="action" class="btn btn-success rounded-pill px-md-4 btn-save salvarPedido"
              style="width: 130px;">CONFIRMAR</button>


          </div>
        </div>
      </div>

    </div>

    <footer>
      <button id="voltar" data-toggle="tooltip" data-placement="top" title=""
        class="btn btn-white rounded-pill btn-eraser px-3 px-md-4 ml-2 ml-md-3" data-original-title="Voltar">
        <svg id="icon-voltar" xmlns="http://www.w3.org/2000/svg" width="20.561" height="14.487"
          viewBox="0 0 20.561 14.487">
          <g id="back" transform="translate(0.311 -2.756)">
            <g id="Group_882" data-name="Group 882">
              <path id="Path_4627" fill="#fff" data-name="Path 4627"
                d="M15.033,7.059H1.41l2.864-3.21a.505.505,0,0,0-.754-.673L.295,6.791a1.16,1.16,0,0,0,0,1.545l3.226,3.616a.505.505,0,0,0,.754-.673L1.41,8.069H15.033a3.957,3.957,0,0,1,0,7.914H12.627a.505.505,0,1,0,0,1.01h2.405a4.967,4.967,0,1,0,0-9.935Z"
                stroke="#fff" stroke-width="0.5"></path>
            </g>
          </g>
        </svg>
      </button>
    </footer>
    <div class="container-fluid px-4 TabelaParaCard d-none">
      <div id="bodyCard" class="row pb-3">
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalCadastro" tabindex="-1" role="dialog">
    <div class="modal-grande modal-dialog modal-dialog-scrollable modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header css-modal d-flex justify-content-center">
          <h5 class="modal-title" id="exampleModalLabel">Reembolso Geral</h5>
          <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="16.04" height="16.04" viewBox="0 0 16.04 16.04">
              <g id="Group_832" data-name="Group 832" transform="translate(-1302.98 -1186.98)">
                <line id="Line_90" data-name="Line 90" x2="11.09" y2="11.09" transform="translate(1305.455 1189.455)"
                  fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3.5" />
                <line id="Line_91" data-name="Line 91" x1="11.09" y2="11.09" transform="translate(1305.455 1189.455)"
                  fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3.5" />
              </g>
            </svg>
          </button>
        </div>
        <div class="modal-body overflow-x-hidden">
          <div id="bodymodalCadastro" class="style-modal">
            <form id="formDadosReembolso" name="formDadosReembolso" method="POST" enctype="multipart/form-data">
              <div class="card-body body-dados-multiplos-2 pb-1">
                <div id="ocorrencias" class="form-row">
                  <div
                    class="col-12 border-b-grey ocorrencia-container container-body px-2 pl-sm-3 pt-2 d-sm-flex align-items-center">
                    <div class="body-multi-content px-0">
                      <div class="form-row">
                        <input type="text" id="cliente" name="cliente" class="d-none">
                        <div class="col-md-4 form-group cliente ">

                          <label for="Cliente_codigo">Cliente<span class="text-danger">*</span></label>
                          <select type="text" id="Cliente_codigo" name="Cliente_codigo"
                            class="form-control obrigatorio rounded-pill" required>
                            <?php
                            echo '<option value="">' . "Selecione" . '</option>';
                            $clientes = listar_clientes_colaborador($usuarioCodigo, $do);
                            foreach ($clientes as $cliente) {
                              echo '<option data-reembolso="' . $cliente['reembolso'] . '" value="' . $cliente['Cliente_codigo'] . '">' . $cliente['cliente'] . '</option>';
                            }

                            if (empty($clientes)) {
                              echo '<option value="' . 6 . '">' . "Blueshift" . '</option>';
                            }
                            ?>

                            <select>


                        </div>


                        <div class="col-md-4 form-group tipoItem ">
                          <label for="centroCusto">Centro de Custo</label>
                          <select type="text" id="centroCusto" name="centroCusto" class="form-control rounded-pill">
                            <option value="">Selecione</option>
                            <option value="AGASUS">AGASUS</option>
                            <option value="Alpargatas">Alpargatas</option>
                            <option value="AmPm">AmPm</option>
                            <option value="Arcelormittal">Arcelormittal</option>
                            <option value="Arezzo">Arezzo</option>
                            <option value="BP">BP Bunge</option>
                            <option value="BRF">BRF</option>
                            <option value="BRINK">BRINK'S</option>
                            <option value="CBA">CBA</option>
                            <option value="CERC">CERC</option>
                            <option value="COMGÁS">COMGÁS</option>
                            <option value="COMPANHIA NITRO QUIMICA BRASILEIRA">COMPANHIA NITRO QUIMICA BRASILEIRA
                            </option>
                            <option value="Denodo">Denodo</option>
                            <option value="Ecopetrol">Ecopetrol</option>
                            <option value="GPA">GPA</option>
                            <option value="Grupo">Grupo JCA</option>
                            <option value="HEDGEPOINT GLOBAL MARKETS">HEDGEPOINT GLOBAL MARKETS</option>
                            <option value="Ipiranga">Ipiranga</option>
                            <option value="Merama">Merama</option>
                            <option value="Microsoft">Microsoft</option>
                            <option value="MIDWAY">MIDWAY</option>
                            <option value="Natura">Natura</option>
                            <option value="Nexa Resources">Nexa Resources</option>
                            <option value="PHARMAVIEWS">PHARMAVIEWS</option>
                            <option value="Porto">Porto Seguro</option>
                            <option value="SAS">SAS</option>
                            <option value="Sotreq">Sotreq</option>
                            <option value="Supergasbras">Supergasbras</option>
                            <option value="TMG">TMG</option>
                            <option value="TOTVS">TOTVS</option>
                            <option value="Ultragaz">Ultragaz</option>
                            <option value="Vero Internet">Vero Internet</option>
                            <option value="VESTE S.A. ESTILO">VESTE S.A. ESTILO</option>
                            <option value="WINNERS SPORT">WINNERS SPORT</option>
                            <option value="BlueShift Brasil">BlueShift Brasil</option>
                            <option value="Blueshift Infraestrutura">Blueshift Infraestrutura</option>
                            <option value="BlueShift RH">BlueShift RH</option>
                            <option value="BlueShift R&S">BlueShift R&S</option>
                            <option value="BlueAcademy">BlueAcademy</option>
                            <option value="BlueShift Marketing">BlueShift Marketing</option>
                            <option value="BlueShift Juridico">BlueShift Juridico</option>
                            <option value="BlueShift ADM">BlueShift ADM</option>
                            <option value="BlueShift Comercial">BlueShift Comercial</option>
                          </select>
                        </div>

                        <div class="col-md-12"></div>
                        <div class="col-md-4 form-group tipoItem ">
                          <label for="tipoItem">Tipo de Despesa<span class="text-danger">*</span></label>
                          <select type="text" id="tipoItem" name="tipoItem"
                            class="form-control obrigatorio rounded-pill">
                            <option value="">Selecione</option>
                            <option value="CURSO">Curso</option>
                            <option value="TRANSPORTE">Transporte</option>
                            <option value="PASSAGEM">Passagem Aérea / Ônibus</option>
                            <option value="ALIMENTACAO">Alimetação</option>
                            <option value="LOCACAO">Locação</option>
                            <option value="ASO">ASO</option>
                            <option value="OUTROS">Outros</option>
                          </select>
                        </div>

                        <div class="col-md-12 separador-item"></div>

                        <div class="col-md-4 form-group position-relative td-edit">
                          <label class="" for="dataInicial">Data (Compra)<span class="text-danger">*</span></label>
                          <input id="dataInicial" name="dataInicial"
                            class="form-control rounded-pill rounded-pill obrigatorio dateRange mask-data-input">
                        </div>

                        <div class="col-md-4 form-group position-relative td-edit d-none esc datasViagem">
                          <label class="" for="dataInicialViagem">Data Inicial (Viagem)<span
                              class="text-danger">*</span></label>
                          <input id="dataInicialViagem" name="dataInicialViagem"
                            class="form-control rounded-pill rounded-pill obrigatorio dateRange mask-data-input">
                        </div>
                        <div class="col-md-4 form-group position-relative td-edit d-none esc datasViagem">
                          <label class="" for="dataFinalViagem">Data Final (Viagem)<span
                              class="text-danger">*</span></label>
                          <input id="dataFinalViagem" name="dataFinalViagem"
                            class="form-control rounded-pill rounded-pill obrigatorio dateRange mask-data-input">
                        </div>


                        <div class="col-md-4 form-group tipoTransporte d-none esc">
                          <label for="Description">Tipo de Transporte<span class="text-danger">*</span></label>
                          <select type="text" id="tipoTransporte" name="tipoTransporte"
                            class="form-control obrigatorio rounded-pill">
                            <option value="">Selecione</option>
                            <option value="VEICULO_PROPRIO">Veículo Próprio</option>
                            <option value="TAXI">Taxi</option>
                            <option value="APLICATIVOS_TRANSPORTES">Aplicativos de Transporte (Uber, 99)</option>
                          </select>
                        </div>

                        <div class="col-md-12 separador-item-transporte"></div>
                        <div class="col-md-4 form-group position-relative tipoRefeicao td-edit d-none esc">
                          <label class="" for="tipoRefeicao">Tipo Refeição (Almoço, Janta...) <span
                              class="text-danger">*</span></label>
                          <input id="tipoRefeicao" name="tipoRefeicao"
                            class="form-control rounded-pill rounded-pill obrigatorio">
                        </div>

                        <div class="col-md-4 form-group tipoVeiculo d-none esc">
                          <label for="Description">Tipo de Veículo<span class="text-danger">*</span></label>
                          <select type="text" id="tipoVeiculo" name="tipoVeiculo"
                            class="form-control obrigatorio rounded-pill">
                            <option value="">Selecione</option>
                            <option value="CARRO">Carro</option>
                            <option value="MOTO">Moto</option>
                          </select>
                        </div>

                        <div class="col-md-6 form-group position-relative d-none td-edit">
                          <label class="" for="dataFinal">Data Final<span class="text-danger">*</span></label>
                          <input id="dataFinal" name="dataFinal"
                            class="form-control rounded-pill rounded-pill obrigatorio dateRange mask-data-input">
                        </div>

                        <div class="col-md-4 form-group d-none esc descritivo">
                          <label for="descritivo">Descritivo<span class="text-danger">*</span></label>
                          <input type="text" id="descritivo" name="descritivo" class="form-control rounded-pill">
                        </div>

                        <div class="col-md-4 form-group d-none esc qtdKm">
                          <label for="quilometrosRodados">Quilomêtros Rodados<span class="text-danger">*</span></label>
                          <input type="text" id="quilometrosRodados" name="quilometrosRodados"
                            class="form-control rounded-pill mask-money">
                        </div>

                        <div class="col-md-4 form-group d-none esc valorCombustivel">
                          <label for="valorCombustivel">Reembolso Combustível<span class="text-danger">*</span></label>
                          <i class="fa-solid fa-circle-info" title="O valor do reembolso é de R$ 1,23 por km rodado para carro e R$ 0,65 para moto, contemplando o gasto 
com combustível, depreciação do veículo, troca de óleo, entre outras despesas."></i>
                          <input type="text" id="valorCombustivel" name="valorCombustivel"
                            class="form-control rounded-pill soma" readonly>
                        </div>

                        <div class="col-md-4 form-group pedagio d-none esc">
                          <label for="Description">Pedágio<span class="text-danger">*</span></label>
                          <select type="text" id="pedagio" name="pedagio" class="form-control obrigatorio rounded-pill">
                            <option value="">Selecione</option>
                            <option value="SIM">Sim</option>
                            <option value="NAO">Não</option>
                          </select>
                        </div>

                        <div class="col-md-4 form-group d-none esc qtdPedagio">
                          <label for="qtdPedagio">Quantidade de Pedágios<span class="text-danger">*</span></label>
                          <input type="text" id="qtdPedagio" name="qtdPedagio" class="form-control rounded-pill number">
                        </div>

                        <div class="col-md-4 form-group d-none esc valorPedagio">
                          <label for="valorPedagio">Valor Total (Pedágios) <span class="text-danger">*</span></label>
                          <input type="text" id="valorPedagio" name="valorPedagio"
                            class="form-control rounded-pill mask-money soma">
                        </div>

                        <div class="col-md-12 separador-item-pedagio"></div>

                        <div class="col-md-4 form-group estacionamento d-none esc">
                          <label for="Description">Estacionamento<span class="text-danger">*</span></label>
                          <select type="text" id="estacionamento" name="estacionamento"
                            class="form-control obrigatorio rounded-pill">
                            <option value="">Selecione</option>
                            <option value="SIM">Sim</option>
                            <option value="NAO">Não</option>
                          </select>
                        </div>

                        <div class="col-md-4 form-group d-none esc qtdEstacionamento">
                          <label for="qtdEstacionamento">Quantidade Estacionamento<span
                              class="text-danger">*</span></label>
                          <input type="text" id="qtdEstacionamento" name="qtdEstacionamento"
                            class="form-control number rounded-pill number">
                        </div>

                        <div class="col-md-4 form-group d-none esc valorEstacionamento">
                          <label for="valorEstacionamento">Valor Total (Estacionamentos)<span
                              class="text-danger">*</span></label>
                          <input type="text" id="valorEstacionamento" name="valorEstacionamento"
                            class="form-control rounded-pill mask-money soma">
                        </div>

                        <div class="col-md-12 separador-item-pedagio"></div>



                        <div class="d-none descritivoOutros form-group esc col-md-6">
                          <label for="descritivoOutros">Detalhamento dos Itens<span class="text-danger">*</span></label>
                          <input type="text" id="descritivoOutros" name="descritivoOutros"
                            class="form-control rounded-pill">
                        </div>

                        <div class="col-md-12 d-none separador-item-descritivo-outros"></div>

                        <div class="col-md-4 form-group d-none esc valor">
                          <label for="valor">Valor <span class="text-danger">*</span></label>
                          <input type="text" id="valor" name="valor" class="form-control rounded-pill mask-money">
                        </div>

                        <div class="col-md-12 form-group d-none observacao esc">
                          <label for="observacao">Observação</label>
                          <input type="text" id="observacao" name="observacao" class="form-control rounded-pill">
                        </div>



                        <!--  <div class="col-md-12 mt-3">
                          <h3>Dados Bancários (Pessoa Física)</h3>
                        </div>

                        <div class="col-md-3 form-group">
                          <label for="bancoNumero">Banco <span class="text-danger">*</span></label>
                          <select type="text" name="bancoNumero" class="bancoNumero form-control colaborador form-control obrigatorio rounded-pill ">
                            <?php
                            /* $bancos = listar_bancos($do, $DB_APPLICATION['admnistrativo']);
                            for ($i = 0; $i < count($bancos); $i++) {
                            echo "<option value='" . $bancos[$i]['numero'] . "'>" . $bancos[$i]['numero'] . " - " . $bancos[$i]['nome'] . "</option>";
                            } */
                            ?>
                          </select>
                        </div>

                        <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 form-group body-db d-none">
                          <input type="text" id="banco" name="banco" class="banco form-control rounded-pill">
                        </div>

                        <div class="col-md-2 form-group">
                          <label for="agencia">Agência<span class="text-danger">*</span> </label>
                          <input type="text" id="agencia" name="agencia" class="agencia form-control obrigatorio rounded-pill number" maxlength="4">
                        </div>

                        <div class="col-md-2 form-group">
                          <label for="agenciaDigito">Dígito Agencia</label>
                          <input type="text" id="agenciaDigito" name="agenciaDigito" class="agenciaDigito form-control obrigatorio number  rounded-pill" maxlength="1">
                        </div>

                        <div class="col-md-2 form-group">
                          <label for="conta">Conta<span class="text-danger">*</span> </label>
                          <input type="text" id="conta" name="conta" class="form-control obrigatorio number rounded-pill" maxlength="12">
                        </div>

                        <div class="col-md-2 form-group">
                          <label for="contaDigito">Dígito Conta<span class="text-danger">*</span> </label>
                          <input type="text" id="contaDigito" name="contaDigito" class="form-control obrigatorio number rounded-pill" maxlength="1">
                        </div> -->


                        <div class="col-md-12 form-group mt-3">
                          <div id="notaFiscal" class="col-md-6 px-0 notaFiscalUpload" data-value="notaFiscal">
                            <div class="upload mb-5">
                              <label for="notaFiscal">Nota Fiscal ou Comprovante<span
                                  class="text-danger">*</span></label>
                              <div class="divLinkNota" class="d-none">

                              </div>
                              <div class="area-upload">
                                <div class="area-upload-body position-relative">
                                  <label for="uploadFile" class="label-upload">
                                    <i class="fas fa-solid fa-file-arrow-up fa-3x"></i>
                                    <div class="texto">Clique ou arraste um arquivo</div>
                                  </label>
                                  <input type="file" class="inputUpload obrigatorio" name="comprovanteFiles[]"
                                    id="uploadFile" title="" multiple />
                                </div>
                                <div class="lista-uploads row mt-3  col-md-12 com-sm-11"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer pt-1 d-flex justify-content-center align-items-center">
                <button type="button" id="sair" class="btn btn-secondary font-cairo-bold rounded-pill ml-1 px-4"
                  data-dismiss="modal">
                  <span class="d-md-inline">CANCELAR</span></button>
                </button>

                <div class="btn-center">
                  <button id="salvar" type="submit" name="action" class="btn btn-success rounded-pill px-md-4 btn-save">
                    <span class="d-md-inline">CONFIRMAR</span></button>
                </div>

                <button id="alterar" data-toggle="tooltip" data-placement="top" title="Salvar"
                  class="btn btn-blue rounded-pill px-md-4 btn-pen d-none">
                  <svg id="icon-salvar" xmlns="http://www.w3.org/2000/svg" width="19.982" height="19.982"
                    viewBox="0 0 19.982 19.982">
                    <g id="Icon_feather-save" data-name="Icon feather-save" transform="translate(-3.5 -3.5)">
                      <path id="Path_1486" data-name="Path 1486"
                        d="M20.484,22.482H6.5a2,2,0,0,1-2-2V6.5a2,2,0,0,1,2-2H17.487l4.995,4.995V20.484A2,2,0,0,1,20.484,22.482Z"
                        fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                      <path id="Path_1487" data-name="Path 1487" d="M20.49,27.492V19.5H10.5v7.992"
                        transform="translate(-2.004 -5.01)" fill="none" stroke="#fff" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="2" />
                      <path id="Path_1488" data-name="Path 1488" d="M10.5,4.5V9.495h7.992" transform="translate(-2.004)"
                        fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </g>
                  </svg>
                </button>
              </div>

            </form>
          </div>
        </div>
        <!-- <div class="modal-footer pt-1 d-flex justify-content-center align-items-center">
                    <button type="button" id="sair" class="btn btn-secondary font-cairo-bold rounded-pill ml-1 px-4" data-dismiss="modal">
                        <svg id="icon-cancelar" xmlns="http://www.w3.org/2000/svg" width="21.97" height="21.97" viewBox="0 0 21.97 21.97">
                            <path id="Icon_metro-cancel" data-name="Icon metro-cancel" d="M13.556,1.928A10.985,10.985,0,1,0,24.54,12.913,10.985,10.985,0,0,0,13.556,1.928Zm0,19.91a8.925,8.925,0,1,1,8.925-8.925,8.925,8.925,0,0,1-8.925,8.925ZM16.988,7.42l-3.433,3.433L10.123,7.42,8.063,9.48,11.5,12.913,8.063,16.346l2.06,2.06,3.433-3.433,3.433,3.433,2.06-2.06-3.433-3.433L19.048,9.48Z" transform="translate(-2.571 -1.928)" fill="#fff"></path>
                        </svg>
                    </button> -->


      </div>
    </div>
  </div>


  <div class="modal fade" id="modalConclusaoPedido" tabindex="-1" role="dialog" style="z-index: 2500">
    <div class="modal-grande modal-dialog modal-dialog-scrollable modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header css-modal d-flex justify-content-center">
          <h5 class="modal-title" id="exampleModalLabel">Dados Bancários</h5>
          <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="16.04" height="16.04" viewBox="0 0 16.04 16.04">
              <g id="Group_832" data-name="Group 832" transform="translate(-1302.98 -1186.98)">
                <line id="Line_90" data-name="Line 90" x2="11.09" y2="11.09" transform="translate(1305.455 1189.455)"
                  fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3.5" />
                <line id="Line_91" data-name="Line 91" x1="11.09" y2="11.09" transform="translate(1305.455 1189.455)"
                  fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3.5" />
              </g>
            </svg>
          </button>
        </div>
        <div class="modal-body overflow-x-hidden">
          <div id="bodymodalCadastro" class="style-modal">
            <form id="formConclusaoPedido" name="formConclusaoPedido" action="../src/salvarPedidoReembolso.php"
              method="POST" enctype="multipart/form-data" onsubmit="loading.open();">
              <div class="card-body body-dados-multiplos-2 pb-1">
                <div id="ocorrencias" class="form-row">
                  <div
                    class="col-12 border-b-grey ocorrencia-container container-body px-2 pl-sm-3 pt-2 d-sm-flex align-items-center">
                    <div class="body-multi-content px-0">
                      <div class="form-row">
                        <input type="hidden" id="codigo">
                        <div class="col-md-12 mt-3">
                          <h3>Dados Bancários (Pessoa Física)</h3>
                        </div>

                        <div class="col-md-12"></div>

                        <div class="col-md-3 form-group">
                          <label for="bancoNumero">Banco <span class="text-danger">*</span></label>
                          <select type="text" id="banco-select" name="bancoNumero"
                            class="bancoNumero form-control colaborador form-control obrigatorio rounded-pill " required
                            data-error="Valor é necessário.">
                            ?>
                          </select>
                        </div>




                        <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 form-group body-db d-none">
                          <input type="text" id="banco-conclusao" name="banco" class="banco form-control rounded-pill"
                            readonly>
                        </div>
                        <div class="col-md-12"></div>
                        <div class="col-md-2 form-group">
                          <label for="documento">CPF<span class="text-danger">*</span> </label>
                          <input type="text" id="documento-conclusao" name="documento"
                            class="documento form-control obrigatorio rounded-pill number" maxlength="4" required
                            data-error="Valor é necessário." readonly>
                        </div>
                        <div class="col-md-2 form-group">
                          <label for="agencia">Agência<span class="text-danger">*</span> </label>
                          <input type="text" id="agencia-conclusao" name="agencia"
                            class="agencia form-control obrigatorio rounded-pill number" maxlength="4" required
                            data-error="Valor é necessário." readonly>
                        </div>

                        <div class="col-md-2 form-group">
                          <label for="agenciaDigito">Dígito Agencia</label>
                          <input type="text" id="agenciaDigito-conclusao" name="agenciaDigito"
                            class="agenciaDigito form-control obrigatorio number  rounded-pill" maxlength="1" required
                            data-error="Valor é necessário." readonly>
                        </div>

                        <div class="col-md-2 form-group">
                          <label for="conta">Conta<span class="text-danger">*</span> </label>
                          <input type="text" id="conta-conclusao" name="conta"
                            class="form-control obrigatorio number rounded-pill" maxlength="12" required
                            data-error="Valor é necessário." readonly>
                        </div>

                        <div class="col-md-2 form-group">
                          <label for="contaDigito">Dígito Conta<span class="text-danger">*</span> </label>
                          <input type="text" id="contaDigito-conclusao" name="contaDigito"
                            class="form-control obrigatorio number rounded-pill" maxlength="1" required
                            data-error="Valor é necessário." readonly>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-1 d-flex justify-content-center align-items-center">
                <button type="button" id="sair" class="btn btn-secondary font-cairo-bold rounded-pill ml-1 px-4"
                  data-dismiss="modal">
                  <span class="d-md-inline">CANCELAR</span></button>
                </button>
                <div class="btn-center">
                  <button type="submit" name="action"
                    class="salvar-pedido btn btn-success rounded-pill px-md-4 btn-save" style="width:130px;">
                    <span class=" d-md-inline">SALVAR PEDIDO</span></button>
                </div>

              </div>
            </form>

            <div class="btn-center">

            </div>
          </div>
        </div>
        <!-- <div class="modal-footer pt-1 d-flex justify-content-center align-items-center">
                    <button type="button" id="sair" class="btn btn-secondary font-cairo-bold rounded-pill ml-1 px-4" data-dismiss="modal">
                        <svg id="icon-cancelar" xmlns="http://www.w3.org/2000/svg" width="21.97" height="21.97" viewBox="0 0 21.97 21.97">
                            <path id="Icon_metro-cancel" data-name="Icon metro-cancel" d="M13.556,1.928A10.985,10.985,0,1,0,24.54,12.913,10.985,10.985,0,0,0,13.556,1.928Zm0,19.91a8.925,8.925,0,1,1,8.925-8.925,8.925,8.925,0,0,1-8.925,8.925ZM16.988,7.42l-3.433,3.433L10.123,7.42,8.063,9.48,11.5,12.913,8.063,16.346l2.06,2.06,3.433-3.433,3.433,3.433,2.06-2.06-3.433-3.433L19.048,9.48Z" transform="translate(-2.571 -1.928)" fill="#fff"></path>
                        </svg>
                    </button> -->


      </div>
    </div>
  </div>

  <div class="modal fade" id="modalDadosBancarios" tabindex="-1" role="dialog" style="z-index: 2500">
    <div class="modal-grande modal-dialog modal-dialog-scrollable modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header css-modal d-flex justify-content-center">
          <h5 class="modal-title" id="exampleModalLabel">Conta Bancária</h5>
          <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="16.04" height="16.04" viewBox="0 0 16.04 16.04">
              <g id="Group_832" data-name="Group 832" transform="translate(-1302.98 -1186.98)">
                <line id="Line_90" data-name="Line 90" x2="11.09" y2="11.09" transform="translate(1305.455 1189.455)"
                  fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3.5" />
                <line id="Line_91" data-name="Line 91" x1="11.09" y2="11.09" transform="translate(1305.455 1189.455)"
                  fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3.5" />
              </g>
            </svg>
          </button>
        </div>
        <div class="modal-body overflow-x-hidden">
          <div id="bodymodalCadastro" class="style-modal">
            <form id="formDadosBancarios" name="formDadosBancarios" id="formConclusaoPedido" name="formConclusaoPedido"
              action="../src/salvarPedidoReembolso.php" method="POST" enctype="multipart/form-data"
              onsubmit="loading.open();">
              <div class="card-body body-dados-multiplos-2 pb-1">
                <div id="ocorrencias" class="form-row">
                  <div
                    class="col-12 border-b-grey ocorrencia-container container-body px-2 pl-sm-3 pt-2 d-sm-flex align-items-center">
                    <div class="body-multi-content px-0">
                      <div class="form-row">
                        <input type="hidden" id="codigo">
                        <div class="col-md-12 mt-3">
                          <h3>Dados Bancários (Pessoa Física)</h3>
                        </div>

                        <div class="col-md-3 form-group">
                          <label for="agencia">CPF<span class="text-danger">*</span> </label>
                          <input type="text" id="cpf" name="cpf"
                            class="form-control obrigatorio mask-cpf rounded-pill number" required
                            data-error="Valor é necessário.">
                        </div>

                        <div class="col-md-12"></div>

                        <div class="col-md-3 form-group">
                          <label for="bancoNumero">Banco <span class="text-danger">*</span></label>
                          <select type="text" name="bancoNumero"
                            class="bancoNumero form-control colaborador form-control obrigatorio rounded-pill " required
                            data-error="Valor é necessário.">
                            <?php
                            $bancos = listar_bancos($do, $DB_APPLICATION['admnistrativo']);
                            echo "<option value=''></option>";
                            for ($i = 0; $i < count($bancos); $i++) {
                              echo "<option value='" . $bancos[$i]['numero'] . "'>" . $bancos[$i]['numero'] . " - " . $bancos[$i]['nome'] . "</option>";
                            }
                            ?>
                          </select>
                        </div>




                        <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 form-group body-db d-none">
                          <input type="text" id="banco" name="banco" class="banco form-control rounded-pill">
                        </div>


                        <div class="col-md-2 form-group">
                          <label for="agencia">Agência<span class="text-danger">*</span> </label>
                          <input type="text" id="agencia" name="agencia"
                            class="agencia form-control obrigatorio rounded-pill number" maxlength="4" required
                            data-error="Valor é necessário.">
                        </div>

                        <div class="col-md-2 form-group">
                          <label for="agenciaDigito">Dígito Agencia</label>
                          <input type="text" id="agenciaDigito" name="agenciaDigito"
                            class="agenciaDigito form-control obrigatorio number  rounded-pill" maxlength="1" required
                            data-error="Valor é necessário.">
                        </div>

                        <div class="col-md-2 form-group">
                          <label for="conta">Conta<span class="text-danger">*</span> </label>
                          <input type="text" id="conta" name="conta"
                            class="form-control obrigatorio number rounded-pill" maxlength="12" required
                            data-error="Valor é necessário.">
                        </div>

                        <div class="col-md-2 form-group">
                          <label for="contaDigito">Dígito Conta<span class="text-danger">*</span> </label>
                          <input type="text" id="contaDigito" name="contaDigito"
                            class="form-control obrigatorio number rounded-pill" maxlength="1" required
                            data-error="Valor é necessário.">
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-1 d-flex justify-content-center align-items-center">
                <button type="button" id="sair" class="btn btn-secondary font-cairo-bold rounded-pill ml-1 px-4"
                  data-dismiss="modal">
                  <span class="d-md-inline">CANCELAR</span></button>
                </button>

                <div class="btn-center">
                  <button type="submit" name="action"
                    class="salvar-pedido btn btn-success rounded-pill px-md-4 btn-save" style="width:130px;">
                    <span class=" d-md-inline">SALVAR PEDIDO</span></button>
                </div>


              </div>
            </form>
          </div>
        </div>
        <!-- <div class="modal-footer pt-1 d-flex justify-content-center align-items-center">
                    <button type="button" id="sair" class="btn btn-secondary font-cairo-bold rounded-pill ml-1 px-4" data-dismiss="modal">
                        <svg id="icon-cancelar" xmlns="http://www.w3.org/2000/svg" width="21.97" height="21.97" viewBox="0 0 21.97 21.97">
                            <path id="Icon_metro-cancel" data-name="Icon metro-cancel" d="M13.556,1.928A10.985,10.985,0,1,0,24.54,12.913,10.985,10.985,0,0,0,13.556,1.928Zm0,19.91a8.925,8.925,0,1,1,8.925-8.925,8.925,8.925,0,0,1-8.925,8.925ZM16.988,7.42l-3.433,3.433L10.123,7.42,8.063,9.48,11.5,12.913,8.063,16.346l2.06,2.06,3.433-3.433,3.433,3.433,2.06-2.06-3.433-3.433L19.048,9.48Z" transform="translate(-2.571 -1.928)" fill="#fff"></path>
                        </svg>
                    </button> -->


      </div>
    </div>
  </div>

  <div class="modal filtro" id="modalFiltro" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close d-none" data-dismiss="modal" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="16.04" height="16.04" viewBox="0 0 16.04 16.04">
              <g id="Group_832" data-name="Group 832" transform="translate(-1302.98 -1186.98)">
                <line id="Line_90" data-name="Line 90" x2="11.09" y2="11.09" transform="translate(1305.455 1189.455)"
                  fill="none" stroke="#2CABE0" stroke-linecap="round" stroke-width="3.5" />
                <line id="Line_91" data-name="Line 91" x1="11.09" y2="11.09" transform="translate(1305.455 1189.455)"
                  fill="none" stroke="#2CABE0" stroke-linecap="round" stroke-width="3.5" />
              </g>
            </svg>
          </button>
        </div>
        <div class="modal-body bg-white">
          <form id="formFiltro">
            <div class="col-12 form-group">
              <label>Período</label>
              <div class="d-md-flex align-items-center">
                <div class="">
                  <input type="text" id="filtroInicio" name="inicio" class="form-control rounded-pill mask-data data">
                </div>
                <div class="text-center mx-2">
                  <p class="mb-0 font-weight-bold">à</p>
                </div>
                <div class="td-edit date-fim direction-left">
                  <input type="text" id="filtroFim" name="fim"
                    class="form-control direction-right rounded-pill mask-data data">
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button id="limparFiltro" type="button" class="btn btn-secondary rounded-pill px-md-4 btn-clean">
            <svg id="icon-limpar" xmlns="http://www.w3.org/2000/svg" width="20" height="19.999" viewBox="0 0 20 19.999">
              <g id="eraser" transform="translate(0 -0.001)">
                <g id="Group_862" data-name="Group 862">
                  <path fill="#fff" stroke="#fff" id="Path_4584" data-name="Path 4584"
                    d="M20,6.818a2.328,2.328,0,0,0-.688-1.658L14.831.685a2.347,2.347,0,0,0-3.313,0L.687,11.525a2.344,2.344,0,0,0,0,3.317l4.483,4.473A2.336,2.336,0,0,0,6.826,20h.035v0H18.4V18.437H9.359l9.954-9.96A2.328,2.328,0,0,0,20,6.818ZM7.378,18.208a.782.782,0,0,1-1.1,0L1.792,13.736a.781.781,0,0,1,0-1.106L6.936,7.482l5.586,5.579ZM18.208,7.372l-4.581,4.584L8.04,6.377,12.623,1.79a.782.782,0,0,1,1.1,0l4.481,4.475a.781.781,0,0,1,0,1.106Z" />
                </g>
              </g>
            </svg>
            <span class="d-none ml-1 d-md-inline">Limpar</span>
          </button>
          <button id="buscar" type="button" class="btn btn-blue btn-search text-white rounded-pill px-md-4">
            <svg id="icon-buscar" xmlns="http://www.w3.org/2000/svg" width="20.547" height="20.5"
              viewBox="0 0 20.547 20.5">
              <g id="search" transform="translate(0.242 0.25)">
                <path id="Path_4585" data-name="Path 4585"
                  d="M8.244,16.472a8.236,8.236,0,1,1,8.236-8.236A8.245,8.245,0,0,1,8.244,16.472Zm0-14.91a6.675,6.675,0,1,0,6.675,6.675A6.682,6.682,0,0,0,8.244,1.561Zm11.52,18.21a.781.781,0,0,0,0-1.1L16.27,15.174a.781.781,0,0,0-1.1,1.1l3.493,3.493a.781.781,0,0,0,1.1,0Z"
                  fill="#fff" stroke="#fff" stroke-width="0.5" />
              </g>
            </svg>
            <span class="d-none ml-1 d-md-inline">Buscar</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
</body>



<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/popper.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/jquery/jquery.mask.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-4.4.1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/sweetalert/sweetalert2.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/moment/moment-with-locales.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/daterangepicker/js/daterangepicker.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/toastr/toastr.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/handlebars-v4.0.5/handlebars-v4.0.5.min.js"></script>
<script type="text/javascript" src="<?php echo HTTP_SERVER; ?>lib/bootstrap-table/bootstrap-table.min.js"></script>

<script>
  var dataAtual = '<?php echo date("Y-m-d", strtotime('-3 hours', time()));
  ; ?>';
  var usuarioAtual = '<?php echo $usuarioNome; ?>';
  var codigoAtual = '<?php echo $usuarioCodigo; ?>';

  var reembolsos = <?= json_encode($_SESSION['Reembolso']) ?>
</script>

<script src="<?php echo HTTP_SERVER; ?>portal/js/main.js?20"></script>
<script type="text/javascript"
  src="<?php echo HTTP_SERVER; ?>portal/modulos/reembolso_geral/js/reembolso_pedido_function.js"></script>

<script>
  var reembolso = new Reembolso();
  <?php
  if ($_REQUEST['codigo']) {
    $request_codigo = $_REQUEST['codigo'];

    $pedido_reembolso = json_encode(listar_reembolsos_codigo_pedido($usuarioCodigo, $request_codigo, $do));
    echo "reembolso.listarPedido($pedido_reembolso)";
  } else {
    echo "reembolso.listar()";
  }
  ?>
</script>

</script>

</body>

</html>