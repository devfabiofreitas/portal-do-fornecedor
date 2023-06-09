<?php
error_reporting(E_STRICT);
session_start();
require_once('../../../../properties.inc.php');
require_once(ROOT . 'properties.db.inc.php');
require_once(DOFMW . 'Do.class.php');
require_once('../../controleAcesso/service/verificarSessao/index.php');

require_once('utils.inc.php');
require_once('src/listagens.inc.php');

$usuario_sessao = $do->getUserSession();
$usuario_codigo = $usuario_sessao['codigo'];
$usuario_clt = ($usuario_sessao['clt'] == 'N') ? false : true;

$dados_colaborador = listar_dados_colaborador($usuario_codigo, $do);
 $qtdFilhos_colaborador = listar_qtdFilhos($usuario_codigo, $do);

$data_nascimento_formatada = converter_data_formato_customizado($dados_colaborador['dataNascimento']);



$alerta_swal = (isset($_REQUEST['status'])) ? exibir_alerta_javascript($_REQUEST['status'], $_REQUEST['message']) : '';

require_once('templates/dadosCadastrais.template.php');