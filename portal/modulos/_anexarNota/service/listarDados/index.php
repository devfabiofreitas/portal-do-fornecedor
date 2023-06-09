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
$usuariocodigo = $usuarioSessao['codigo'];

$sqlCommand  = ' SELECT ';
$sqlCommand .= ' R.nome, R.lancamentoHoras, R.beneficiario, E.cnpj, R.banco, R.agencia, R.digitoAgencia, R.conta, R.digitoConta  ';
$sqlCommand .= ' FROM ';
$sqlCommand .= ' responsaveis_tecnicos AS R ';
$sqlCommand .= ' INNER JOIN usuarios U ON (U.codigo = R.Usuario_codigo ) ';
$sqlCommand .= ' LEFT JOIN empresas E ON (E.codigo = U.Empresa_codigo ) ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= ' R.codigo = ' . $usuariocodigo .  '  ';

$do->begin();
$result = $do->execute($sqlCommand, "SELECT", "");
$do->commit();
$elements = $do->toJSON($result);

if (count($elements) > 0) {
  $list = $elements[0];
  if ($list['cnpj'] == 'Sem Empresa' or $list['cnpj'] == '') {
    echo '{"success":false, "status": "SE", "message": "Erro, usuário sem empresa. Entra em contato com o suporte."}';
    exit;
  } else {
    echo '{"success":true,  "message": "listado com sucesso" , "elements": ' . json_encode($elements) . '}';
    exit;
  }
} else {
  echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
  exit;
}
