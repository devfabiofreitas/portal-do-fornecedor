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
$params = json_decode($_POST['params'], true);

$sqlCommand  = ' SELECT ';
$sqlCommand .= '   N.mesReferencia, N.caminho, E.cnpj, N.dataCadastro, N.periodoFim, N.periodoInicio, N.horasRealizadas, N.valor, N.codigo, N.status, N.observacao';
$sqlCommand .= ' FROM ';
$sqlCommand .= ' responsaveis_tecnicos AS R ';
$sqlCommand .= ' INNER JOIN usuarios U ON (U.codigo = R.Usuario_codigo ) ';
$sqlCommand .= ' INNER JOIN empresas E ON (E.codigo = U.Empresa_codigo ) ';
$sqlCommand .= ' INNER JOIN notas_fiscais N ON (N.Empresa_codigo = E.codigo) ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= ' R.codigo = ' . $usuarioCodigo .  '   ';

if ($params['mesAno']) {
  $sqlCommand .=  'AND n.mesReferencia IN ("'.$params['mesAno'].'") ';
}

$sqlCommand .= ' ORDER BY N.dataCadastro DESC  ';



$do->begin();
$result = $do->execute($sqlCommand, "SELECT", "");
$do->commit();
$elements = $do->toJSON($result);

if (count($elements) > 0) {
  echo '{"success":true, "message": "listado com sucesso" , "elements": ' . json_encode($elements) . '}';
  exit;
} else {
  echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
  exit;
}

