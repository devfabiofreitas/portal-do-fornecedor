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
$usuarioCodigo = $usuarioSessao['codigo'];
$usuarioNome = $usuarioSessao['nome'];
$jsonString = $params['jsonBancarios'];
$sqlCommand = 'UPDATE pessoa SET dadosBancarios = JSON_MERGE_PATCH(dadosBancarios, \'' . $jsonString . '\') WHERE pessoa.codigo = ' . $usuarioCodigo;

$do->begin();
$result = $do->execute($sqlCommand, "UPDATE", "");
$do->commit();
if ($result) {
  echo '{"success":true,  "message": "listado com sucesso"}';
  exit;
} else {
  echo '{"success":false, "message": "Ocorreu um erro ao listar seus Projetos. Tente novamente ou entre em contato com o suporte"}';
  exit;
}