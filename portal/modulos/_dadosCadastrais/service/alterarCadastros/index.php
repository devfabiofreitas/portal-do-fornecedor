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

if ($params['form'] == 'formResponsavelTecnico') {
  $sqlCommand  = ' UPDATE ';
  $sqlCommand .= '   responsaveis_tecnicos AS R ';
  $sqlCommand .= '   SET';
  $sqlCommand .= '    R.emailPessoal = ' . $do->prepareDataToSQLQuery("string", $params['emailPessoal']) . ',';
  $sqlCommand .= '    R.nomeEmergencia =  ' . '\'' . addslashes(utf8_decode($params['nomeEmergencia']))  . '\', ';
  $sqlCommand .= '    R.telefonePaisEmergencia = ' . $do->prepareDataToSQLQuery("string", $params['telefonePaisEmergencia']) . ',';
  $sqlCommand .= '    R.telefoneEmergencia = ' . $do->prepareDataToSQLQuery("string", $params['telefoneEmergencia']) . ',';
  $sqlCommand .= '    R.dataNascimento = ' . $do->prepareDataToSQLQuery("string", $params['dataNascimento']) . ' ,';
  $sqlCommand .= '    R.dataInicio = ' . $do->prepareDataToSQLQuery("string", $params['dataInicio']) . ' ,';
  $sqlCommand .= '    R.telefonePais = ' . $do->prepareDataToSQLQuery("string", $params['telefonePais']) . ',';
  $sqlCommand .= '    R.telefone = ' . $do->prepareDataToSQLQuery("string", $params['telefone']) . ',';
  $sqlCommand .= '    R.dataAlteracao = dataHoraAtual() ';
  $sqlCommand .= ' WHERE ';
  $sqlCommand .= ' R.codigo = ' . $usuarioCodigo .  '  ';
}

if ($params['form'] == 'formDadosEmpresa') {
  $sqlCommand  = ' UPDATE ';
  $sqlCommand .= '   responsaveis_tecnicos AS R ';
  $sqlCommand .= ' INNER JOIN usuarios U ON (U.codigo = R.Usuario_codigo ) ';
  $sqlCommand .= ' LEFT JOIN empresas E ON (E.codigo = U.Empresa_codigo ) ';
  $sqlCommand .= '   SET';
  $sqlCommand .= '    E.razaoSocial = ' . $do->prepareDataToSQLQuery("string", $params['razaoSocial']) . ' ,';
  $sqlCommand .= '    E.nomeFantasia = ' . $do->prepareDataToSQLQuery("string", $params['nomeFantasia']) . ',';
  $sqlCommand .= '    E.dataAbertura = ' . $do->prepareDataToSQLQuery("string", $params['dataAbertura']) . ' ,';
  $sqlCommand .= '    E.logradouro = ' . $do->prepareDataToSQLQuery("string", $params['logradouro']) . ' ,';
  $sqlCommand .= '    E.cep = ' . $do->prepareDataToSQLQuery("string", $params['cep']) . ',';
  $sqlCommand .= '    E.bairro = ' . $do->prepareDataToSQLQuery("string", $params['bairro']) . ',';
  $sqlCommand .= '    E.numero = ' . $do->prepareDataToSQLQuery("string", $params['numero']) . ' ,';
  $sqlCommand .= '    E.complemento = ' . $do->prepareDataToSQLQuery("string", $params['complemento']) . ' ,';
  $sqlCommand .= '    E.cidade = ' . $do->prepareDataToSQLQuery("string", $params['cidade']) . ' ,';
  $sqlCommand .= '    E.estado = ' . $do->prepareDataToSQLQuery("string", $params['estado']) . ',';
  $sqlCommand .= '    E.tipo = ' . $do->prepareDataToSQLQuery("string", $params['tipo']) . ',';
  $sqlCommand .= '    E.naturezaJuridica =  ' . '\'' . addslashes(utf8_decode($params['naturezaJuridica']))  . '\', ';
  $sqlCommand .= '    E.porte = ' . $do->prepareDataToSQLQuery("string", $params['porte']) . ',';
  $sqlCommand .= '    E.dataAlteracao = dataHoraAtual() ';
  $sqlCommand .= ' WHERE ';
  $sqlCommand .= ' R.codigo = ' . $usuarioCodigo .  '  ';
}

if ($params['form'] == 'formDadosBancarios') {
  echo '{"success":false, "message": "Por favor, caso deseje alterar seus dados bancários entre em contato com o RH."}';
  exit;
}




$do->begin();
$result = $do->execute($sqlCommand, "UPDATE", "");
$do->commit();
if ($result) {
  echo '{"success":true, "message": "Alterado com sucesso"}';
  exit;
} else {
  echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
  exit;
}
