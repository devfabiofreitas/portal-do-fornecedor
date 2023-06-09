<?php
error_reporting(E_STRICT);
session_start();
require_once('../../../../properties.inc.php');
require_once(ROOT . 'properties.db.inc.php');
require_once(DOFMW . 'Do.class.php');
require_once(ROOT . 'portal/modulos/controleAcesso/service/verificarSessao/index.php');
require_once(ROOT . 'portal/php/utils.inc.php');
require_once('../src/listagens.inc.php');

$sessao_usuario = $do->getUserSession();
$codigo_usuario = $sessao_usuario['codigo'];

$alerta_swal = (isset($_REQUEST['status'])) ? exibir_alerta_javascript($_REQUEST['status'], $_REQUEST['message']) : '';

$listagem_tags = listar_tags($codigo_usuario, $do);

if ($listagem_tags) {
  require('../templates/autoAvaliacaoTecnica.template.php');
}