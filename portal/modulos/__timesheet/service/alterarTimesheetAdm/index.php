<?php
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
$usuarioNome = $usuarioSessao['nome'];
$usuarioCodigo = $usuarioSessao['codigo'];
$usuarioEmail = $usuarioSessao['email'];

$sqlCommand  = ' UPDATE timesheet ';
$sqlCommand .= ' SET ';
$sqlCommand .= '     Cliente_codigo = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Cliente_codigo'])) . '\', ';
$sqlCommand .= '     Projeto_codigo = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Projeto_codigo'])) . '\', ';
$sqlCommand .= '     Description =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Description'])) . '\', ';
$sqlCommand .= '     Client =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Client'])) . '\', ';
$sqlCommand .= '     Project = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Project'])) . '\', ';
$sqlCommand .= '     User = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $usuarioNome)) . '\', ';
$sqlCommand .= '     Tags =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Tags']))  . '\', ';
$sqlCommand .= '     Billable =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Billable']))  . '\', ';
$sqlCommand .= '     Start_Date =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Start_Date']))  . '\', ';
$sqlCommand .= '     End_Date =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['End_Date']))  . '\', ';
$sqlCommand .= '     Start_Time = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Start_Time']))  . '\', ';
$sqlCommand .= '     End_Time = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['End_Time']))  . '\', ';
$sqlCommand .= '     Duration_d =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Duration_d']))  . '\', ';
$sqlCommand .= '     Duration_h = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Duration_h']))  . '\', ';
$sqlCommand .= '     dataAlteracao = dataHoraAtual()';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '      Portal_codigo = ' . $do->prepareDataToSQLQuery("r", $params['codigo']) . '';
$sqlCommand .= ' AND ';
$sqlCommand .= '      Email = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $usuarioEmail)) . '\'';



/* if (!controleData($params['Start_Date'])) {
  echo '{"success":false, "message": "Não pode alterar marcações em meses já fechados."}';
  exit;
} */

$do->begin();
$result = $do->execute($sqlCommand, "UPDATE", "");
$do->commit();

if ($result) {
  echo '{"success":true, "message": "Marcaçõ atualizada com sucesso."}';
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
