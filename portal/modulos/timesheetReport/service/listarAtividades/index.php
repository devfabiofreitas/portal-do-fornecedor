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
$sqlCommand .= '   sec_to_time(SUM(time_to_sec( Duration_h ))) Duration_h, ';
$sqlCommand .= '   Project, Client';
$sqlCommand .= ' FROM ';
$sqlCommand .= '    timesheet ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '    Responsavel_codigo =  ' . $usuarioCodigo . '';


if ($params['inicio']) {
  $sqlCommand .=  ' AND ';
  $sqlCommand .=  '   Start_Date ';
  $sqlCommand .=  ' BETWEEN ';
  $sqlCommand .=     '"' . $params['inicio'] . '"';
  $sqlCommand .=  ' AND ';
  $sqlCommand .=     '"' . $params['fim'] . '"';
}

$sqlCommand .= ' GROUP BY ';
$sqlCommand .= ' Project, Client ';

$sqlCommand .= ' ORDER BY ';
$sqlCommand .= ' Duration_h DESC';


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
