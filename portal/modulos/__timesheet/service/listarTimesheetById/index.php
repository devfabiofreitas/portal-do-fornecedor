<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();
$params = json_decode($_POST['params'], true);
$usuarioSessao = $do->getUserSession();
$usuarioCodigo = $usuarioSessao['codigo'];

$and = "";
$where = " WHERE ";

$sqlCommand  = ' SELECT ';
$sqlCommand .= '   * ';
$sqlCommand .= ' FROM ';
$sqlCommand .= '    timesheet ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '    codigo = ' . $do->prepareDataToSQLQuery("r", $params['codigo']) . ' ';
$sqlCommand .= ' AND ';
$sqlCommand .= '    Responsavel_codigo = ' . $usuarioCodigo . ' ';



$do->begin();
$result = $do->execute($sqlCommand, "SELECT", "");
$do->commit();

$elements = $do->toJSON($result);
if (count($elements) > 0) {
  echo '{"success":true,  "message": "listado com sucesso" , "elements": ' . json_encode($elements) . '}';
  exit;
} else {
  echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
  exit;
}
