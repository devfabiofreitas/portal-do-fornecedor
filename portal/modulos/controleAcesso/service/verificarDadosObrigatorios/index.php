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

$do->selectDBInstance('administrativo');

$sqlCommand  = ' SELECT ';
$sqlCommand .= '   qtdFilhos';
$sqlCommand .= ' FROM ';
$sqlCommand .= ' pessoa ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= ' codigo = ' . $usuarioCodigo ;

$do->begin();
$result = $do->execute($sqlCommand, "SELECT", "");
$do->commit();
$elements = $do->toJSON($result);
$do->selectDBInstance('portaldofornecedor');

if (count($elements) ) {
  $dados = $elements[0];
  $vazio = 'false';
  foreach ($dados as $key => $value) {
    if (trim($value) === '') {
      $vazio = 'true';
    }
  }
  echo '{"success": true, "pendencias": ' . $vazio . '}';
    exit;
} else {
  echo '{"success": false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
  exit;
}
