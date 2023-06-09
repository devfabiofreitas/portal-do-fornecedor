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

$sqlCommand  = ' SELECT ';
$sqlCommand .= '   N.caminho ';
$sqlCommand .= ' FROM ';
$sqlCommand .= ' notas_fiscais as N';
$sqlCommand .= ' INNER JOIN empresas E ON (E.codigo = N.Empresa_codigo ) ';
$sqlCommand .= ' INNER JOIN usuarios U ON (E.codigo = N.empresa_codigo) ';
$sqlCommand .= ' INNER JOIN responsaveis_tecnicos R ON (U.codigo = R.Usuario_codigo) ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= ' N.codigo = "' . $params['codigo'] .  '" AND R.codigo =  ' . $usuarioCodigo .  ' ';


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
