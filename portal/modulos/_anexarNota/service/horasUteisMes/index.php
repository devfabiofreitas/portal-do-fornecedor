<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
define('DEFAULT_DB', 'administrativo');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();
$params = json_decode($_POST['params'], true);
$usuarioSessao = $do->getUserSession();
$usuariocodigo = $usuarioSessao['codigo'];

$sqlCommand  = ' SELECT ';
$sqlCommand .= '    data ';
$sqlCommand .= ' FROM ';
$sqlCommand .= '    feriados ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '    data BETWEEN "' . $params['periodoInicio'] . '" ' . 'AND "' . $params['periodoFim'] . '"';
$sqlCommand .= ' AND Cliente_codigo = 6 ';

$do->begin();
$result = $do->execute($sqlCommand, "SELECT", "");
$do->commit();
$elements = $do->toJSON($result);


if (count($elements) > 0) {
  echo '{"success":true,  "message": "listado com sucesso" , "elements": ' . json_encode(GetDiasUteis($params, $elements)) . '}';
} else {
  echo '{"success":true,  "message": "listado com sucesso" , "elements": ' . json_encode(GetDiasUteis($params, $elements)) . '}';
  exit;
}

function getDiasUteis($params, $feriados)
{
  $numero_feriados = 0;

  foreach ($feriados as $key => $value) {
    $dia = strtotime($feriados[$key]['data']);
    $feriado_semana = date("N", $dia);
    if ($feriado_semana < 6) { // 6 e 7 são sábado e domingo
      $numero_feriados++;
    };
  }

  $data_inicial = strtotime($params['periodoInicio']);
  $data_final   = strtotime($params['periodoFim']);

  $fim_semana = 0;
  $numero_dias = 0;

  while ($data_inicial <= $data_final) {
    $dia_semana = date("N", $data_inicial);
    if ($dia_semana < 6) { // 6 e 7 são sábado e domingo
      $numero_dias++;
    };
    $data_inicial += 86400; // +1 dia
  };

  return ($numero_dias - $numero_feriados) * 8;
}
