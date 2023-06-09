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
$sqlCommand .= '   DATE(Start_Date) Start_Date, Project, Client';
$sqlCommand .= ' FROM ';
$sqlCommand .= '    timesheet ';
$sqlCommand .= ' LEFT JOIN ';
$sqlCommand .= '    responsaveis_tecnicos rt';
$sqlCommand .= '  ON rt.codigo = timesheet.Responsavel_codigo';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '    Responsavel_codigo =  ' . $do->prepareDataToSQLQuery("r", $params['Pessoa_codigo']) . '';
$sqlCommand .= ' AND ';
$sqlCommand .=  '   rt.Lider_codigo =  ' . $usuarioCodigo;


if ($params['periodoInicio'] && $params['periodoFim']) {
  $sqlCommand .=  ' AND ';
  $sqlCommand .=  '   Start_Date ';
  $sqlCommand .=  ' BETWEEN ';
  $sqlCommand .=     '"' . $do->prepareDataToSQLQuery("r", $params['periodoInicio']) . '"';
  $sqlCommand .=  ' AND ';
  $sqlCommand .=     '"' . $do->prepareDataToSQLQuery("r", $params['periodoFim']) . '"';
}

$sqlCommand .= ' GROUP BY ';
$sqlCommand .= ' Start_Date, Project, Client ';

$sqlCommand .= ' ORDER BY ';
$sqlCommand .= '    Start_Date ';

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
