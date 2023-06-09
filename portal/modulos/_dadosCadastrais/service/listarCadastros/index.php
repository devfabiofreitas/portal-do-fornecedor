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
$sqlCommand .= '   R.nome, R.cpf, R.dataNascimento, R.telefone,R.telefonePais, R.email, R.emailPessoal, R.dataInicio, R.telefonePaisEmergencia,R.telefoneEmergencia, R.nomeEmergencia, E.cnpj, E.razaoSocial, E.nomeFantasia, E.tipo, E.porte, E.naturezaJuridica, E.dataAbertura, E.cep, E.logradouro, E.numero, E.complemento, E.bairro, E.cidade, E.estado, R.tipoDocumento, R.documento, R.banco, R.bancoNumero, R.agencia, R.digitoAgencia, R.conta, R.digitoConta, R.beneficiario';
$sqlCommand .= ' FROM ';
$sqlCommand .= ' responsaveis_tecnicos AS R ';
$sqlCommand .= ' INNER JOIN usuarios U ON (U.codigo = R.Usuario_codigo ) ';
$sqlCommand .= ' LEFT JOIN empresas E ON (E.codigo = U.Empresa_codigo ) ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= ' R.codigo = ' . $usuarioCodigo .  '  ';



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
