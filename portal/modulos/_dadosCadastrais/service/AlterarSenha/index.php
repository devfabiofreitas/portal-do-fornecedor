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
$senhaNova = hash('sha512', $params["senhaNova"]);


$sqlCommand  = ' UPDATE ';
$sqlCommand .= ' usuarios AS U ';
$sqlCommand .= ' INNER JOIN responsaveis_tecnicos R ON (U.codigo = R.Usuario_codigo) ';
$sqlCommand .= ' SET ';
$sqlCommand .= '  U.senha = '. $do->prepareDataToSQLQuery("string", $senhaNova).',';
$sqlCommand .= '  U.dataAlteracao = dataHoraAtual()';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '  R.codigo = ' . $usuarioCodigo .  '  ';



$do->begin();
$result = $do->execute($sqlCommand, "UPDATE", "");
$do->commit();
if ($result) {
  echo '{"success":true, "message": "Senha alterada com sucesso"}';
  exit;
} else {
  echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
  exit;
}
