<?php
error_reporting(E_STRICT);
session_start();
require_once(__DIR__ . '/../../../../properties.inc.php');
require_once(ROOT . 'properties.db.inc.php');
require_once(DOFMW . 'Do.class.php');
require_once(ROOT . 'portal/modulos/controleAcesso/service/verificarSessao/index.php');

require_once(ROOT . 'portal/php/utils.inc.php');

$usuario_sessao = $do->getUserSession();
$usuario_codigo = $usuario_sessao['codigo'];
$alerta_swal = (isset($_REQUEST['status'])) ? exibir_alerta_javascript($_REQUEST['status'], $_REQUEST['message']) : '';



require_once('../templates/timesheet.template.php');