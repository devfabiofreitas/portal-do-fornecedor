<?php

use LDAP\Result;

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


$sqlCommand  = ' INSERT INTO timesheet_log(Codigo_timesheet, Responsavel_codigo, Cliente_codigo, Projeto_codigo, Email, Description , Client, Project, User, tags, Billable, Start_Date, End_Date, Start_Time, End_Time, Duration_d, Duration_h, dataCriacao, dataAlteracao, tipoAlteracao) ';
$sqlCommand  .= '    SELECT ';
$sqlCommand  .= '        codigo, Responsavel_codigo, Cliente_codigo, Projeto_codigo, Email, Description , Client, Project, User, tags, Billable, Start_Date, End_Date, Start_Time, End_Time, Duration_d, Duration_h, dataCriacao, dataAlteracao, "D" ';
$sqlCommand  .= '    FROM   ';
$sqlCommand  .= '        timesheet ';
$sqlCommand  .= '    WHERE ';
$sqlCommand .= '      timesheet.codigo = ' . $do->prepareDataToSQLQuery("r", $params['codigo']) . '';

$do->begin();
$result = $do->execute($sqlCommand, "INSERT", "");
$do->commit();

$sqlCommand  = ' DELETE ';
$sqlCommand .= ' FROM ';
$sqlCommand .= '    timesheet ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '    codigo = ' . $do->prepareDataToSQLQuery("r", $params['codigo']) . '';
$sqlCommand .= ' AND ';
$sqlCommand .= '    Responsavel_codigo = ' . $usuarioCodigo . ' ';

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

function controleData($dataParams)
{
  $timezone = new DateTimeZone('America/Sao_Paulo');
  $dataHoje = new DateTime('now', $timezone);
  $dataReferencia = new Datetime($dataParams);
  $mesAtual =  (int) $dataHoje->format('n');
  $mesReferencia =  (int) $dataReferencia->format('n');

  $anoAtual =  (int) $dataHoje->format('Y');
  $anoReferencia =  (int) $dataReferencia->format('Y');

  if ($anoAtual <= $anoReferencia && $mesAtual <= $mesReferencia) {
    return true;
  } else {
    $difMes = $mesAtual - $mesReferencia == 1 ? true : false;
    $difAno = $anoReferencia -  $anoAtual == 0 ? true : false;
    $difAnoJaneiro = $anoAtual - $anoReferencia == 1 ? true : false;
    $difMesJaneiro = $mesAtual == 1 && $mesReferencia == 12 ? true : false;
    $dataHojeDia = (int) $dataHoje->format('d') == 1 ? true : false;
    if ($dataHojeDia && (($difMes && $difAno) || ($difAnoJaneiro && $difMesJaneiro))) {
      return true;
    }
  }
  return false;
}
