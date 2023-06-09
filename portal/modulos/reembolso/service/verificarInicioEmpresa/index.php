<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();

$usuarioSessao = $do->getUserSession();
$usuarioCodigo = $usuarioSessao['codigo'];

$sqlCommand  = ' SELECT ';
$sqlCommand .= '   dataInicio ';
$sqlCommand .= ' FROM ';
$sqlCommand .= '   responsaveis_tecnicos ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '    codigo = ' . $usuarioCodigo;

$do->begin();
$result = $do->execute($sqlCommand, "SELECT", "");
$do->commit();

$elements = $do->toJSON($result);
if (count($elements) > 0) {
  if (validarPermissaoReembolso($elements[0]['dataInicio'])) {
    echo '{"success":true,  "message": "listado com sucesso" , "elements": ' . json_encode($elements) . '}';
    exit;
  }

  echo '{"success":false, "message": "Usuário com menos de 90 dias de empresa."}';
  exit;
} else {
  echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
  exit;
}

function validarPermissaoReembolso($data)
{
  $data_inicio = new DateTime($data);
  $data_fim = new DateTime();

  $dateInterval = $data_inicio->diff($data_fim)->days;

  if ($dateInterval >= 90) {
    return true;
  }

  return false;
}
