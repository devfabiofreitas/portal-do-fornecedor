<?php

use LDAP\Result;

error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
define('DEFAULT_DB', 'administrativo');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$params = json_decode($_POST['params'], true);
$do->validarSessao();
$usuarioSessao = $do->getUserSession();
$usuarioCodigo = $usuarioSessao['codigo'];

$sqlCommand  = ' DELETE ';
$sqlCommand .= ' FROM ';
$sqlCommand .= '    timesheet ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '    Portal_codigo = ' . $do->prepareDataToSQLQuery("number", $params['codigo']) . '';
$sqlCommand .= ' AND ';
$sqlCommand .= '    Pessoa_codigo = ' . $usuarioCodigo . ' ';

$do->begin();
$result = $do->execute($sqlCommand, "DELETE", "");
$do->commit();

if ($result) {
  echo '{"success":true,  "message": "excluido com sucesso"}';
  exit;
} else {
  echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
  exit;
}
