<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$params = json_decode($_POST['params'], true);
$do->validarSessao();
$usuarioSessao = $do->getUserSession();
$usuarioCodigo = $usuarioSessao['codigo'];

$sqlCommand  = ' SELECT ';
$sqlCommand .= '   codigo, Responsavel_codigo, User, Client, Project, Tags, Billable, Description,';
$sqlCommand .= '   Start_Date, Start_Time, End_Date, End_Time, Duration_h, Duration_d, Cliente_codigo ';
$sqlCommand .= ' FROM ';
$sqlCommand .= '    timesheet ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '    Responsavel_codigo =  ' . $usuarioCodigo . '';

if ($params['inicio']) {
  $sqlCommand .=  ' AND ';
  $sqlCommand .=  '   Start_Date ';
  $sqlCommand .=  ' BETWEEN ';
  $sqlCommand .=     '"' . $do->prepareDataToSQLQuery("r", $params['inicio']) . '"';
  $sqlCommand .=  ' AND ';
  $sqlCommand .=     '"' . $do->prepareDataToSQLQuery("r", $params['fim']) . '"';
}

$sqlCommand .= ' ORDER BY ';
$sqlCommand .= '    Start_Date DESC, End_Time DESC';

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
