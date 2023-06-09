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
$usuarioCodigo = $usuarioSessao['codigo'];
$params = json_decode($_POST['params'], true);

$sqlCommand  = ' SELECT ';
$sqlCommand .= '   H.mesReferencia, H.codigo, H.caminho,DATE_FORMAT(dataCadastro,"%d/%m/%Y") AS dataCadastro ';
$sqlCommand .= ' FROM ';
$sqlCommand .= '  holerite AS H';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '  H.Pessoa_codigo = ' . $usuarioCodigo .  '   ';

if ($params['mesAno']) {
  $sqlCommand .=  'AND h.mesReferencia IN ("'.$params['mesAno'].'") ';
}

$sqlCommand .= ' ORDER BY h.mesReferencia DESC  ';

$do->begin();
$result = $do->execute($sqlCommand, "SELECT", "");
$do->commit();
$elements = $do->toJSON($result);

if (count($elements) > 0) {
  $elements[0]['nome'] = $usuarioSessao['nome'];

  echo '{"success":true, "message": "listado com sucesso" , "elements": ' . json_encode($elements) . '}';
  exit;
} else {
  echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
  exit;
}

