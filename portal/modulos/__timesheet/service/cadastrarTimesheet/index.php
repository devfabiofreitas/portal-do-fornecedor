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
$usuarioNome = $usuarioSessao['nome'];
$usuarioEmail = $usuarioSessao['email'];

$sqlCommand  = 'INSERT INTO timesheet(Responsavel_codigo, Cliente_codigo, Projeto_codigo, Email, Description , Client, Project, User, tags, Billable, Start_Date, End_Date, Start_Time, End_Time, Duration_d, Duration_h, dataCriacao)';
$sqlCommand .= ' VALUES ';
$sqlCommand .=  '( ';
$sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $usuarioCodigo)) . '\', ';
$sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Cliente_codigo'])) . '\', ';
$sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Projeto_codigo'])) . '\', ';
$sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $usuarioEmail)) . '\', ';
$sqlCommand .= '\'' . addslashes(utf8_decode($do->prepareDataToSQLQuery("r", $params['Description']))) . '\', ';
$sqlCommand .= '\'' . addslashes(utf8_decode($do->prepareDataToSQLQuery("r", $params['Client']))) . '\', ';
$sqlCommand .= '\'' . addslashes(utf8_decode($do->prepareDataToSQLQuery("r", $params['Project']))) . '\', ';
$sqlCommand .= '\'' . addslashes(utf8_decode($do->prepareDataToSQLQuery("r", $usuarioNome)))  . '\', ';
$sqlCommand .= '\'' . addslashes(utf8_decode($do->prepareDataToSQLQuery("r", $params['Tags'])))  . '\', ';
$sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Billable']))  . '\', ';
$sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Start_Date']))  . '\', ';
$sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['End_Date']))  . '\', ';
$sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Start_Time']))  . '\', ';
$sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['End_Time']))  . '\', ';
$sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Duration_d']))  . '\', ';
$sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Duration_h']))  . '\', ';
$sqlCommand .= '     dataHoraAtual()     ';
$sqlCommand .= ')';

/* if (!controleData($params['Start_Date'])) {
  echo '{"success":false, "message": "Não pode realizar marcações em meses já fechados."}';
  exit;
} */

$do->begin();
$result = $do->execute($sqlCommand, "INSERT", "");
$do->commit();
$res[0] = array("codigo" => $do->last_inserted_id);
if ($result) {
  echo '{"success":true, "message": "Marcação cadastrada com sucesso", "elements": ' . json_encode($res) . '}';
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

  if ($anoAtual < $anoReferencia || ($anoAtual <= $anoReferencia && $mesAtual <= $mesReferencia)) {
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
