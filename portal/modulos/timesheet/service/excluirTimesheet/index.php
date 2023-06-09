<?php

use LDAP\Result;

error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once('../../src/validacoes.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();
$params = json_decode($_POST['params'], true);
$usuarioSessao = $do->getUserSession();
$usuarioCodigo = $usuarioSessao['codigo'];

$sqlCommand = ' SELECT ';
$sqlCommand .= '   Start_Date, Projeto_codigo ';
$sqlCommand .= ' FROM ';
$sqlCommand .= '    timesheet ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '    codigo = ' . $do->prepareDataToSQLQuery("r", $params['codigo']) . '';

$do->begin();
$result = $do->execute($sqlCommand, "SELECT", "");
$do->commit();
$elements = $do->toJSON($result);

$start_date = date('d/m/Y', strtotime($elements[0]['Start_Date']));
$Projeto_codigo = $elements[0]['Projeto_codigo'];

$verificar_possibilidade_apontamentop = verificarApontamentoPossivel($do, $usuarioSessao['codigo'], $start_date);
$verificar_cadastro_mes_fechado = controleTimesheetDataCadastro($do, $usuarioSessao['codigo'], $start_date, $Projeto_codigo);

if ($verificar_possibilidade_apontamentop->status == false) {
  echo '{"success":false, "message": "Não é possivel cadastrar ou realizar modificações em apontametos com mais de uma semana passada."}';
  exit;
}

if ($verificar_cadastro_mes_fechado->status == false) {
  echo '{"success":false, "message": "Não é possível apagar apontamentos de meses anteriores."}';
  exit;
}


$sqlCommand = ' INSERT INTO timesheet_log(Codigo_timesheet, Responsavel_codigo, Cliente_codigo, Projeto_codigo, Email, Description , Client, Project, User, tags, Billable, Start_Date, End_Date, Start_Time, End_Time, Duration_d, Duration_h, dataCriacao, dataAlteracao, tipoAlteracao) ';
$sqlCommand .= '    SELECT ';
$sqlCommand .= '        codigo, Responsavel_codigo, Cliente_codigo, Projeto_codigo, Email, Description , Client, Project, User, tags, Billable, Start_Date, End_Date, Start_Time, End_Time, Duration_d, Duration_h, dataCriacao, dataAlteracao, "D" ';
$sqlCommand .= '    FROM   ';
$sqlCommand .= '        timesheet ';
$sqlCommand .= '    WHERE ';
$sqlCommand .= '      timesheet.codigo = ' . $do->prepareDataToSQLQuery("r", $params['codigo']) . '';

$do->begin();
$result = $do->execute($sqlCommand, "INSERT", "");
$do->commit();

$sqlCommand = ' DELETE ';
$sqlCommand .= ' FROM ';
$sqlCommand .= '    timesheet ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '    codigo = ' . $do->prepareDataToSQLQuery("r", $params['codigo']) . '';
$sqlCommand .= ' AND ';
$sqlCommand .= '    Responsavel_codigo = ' . $usuarioCodigo . ' ';

$do->begin();
$result = $do->execute($sqlCommand, "DELETE", "");
$do->commit();

if ($result) {
  $do->selectDBInstance("administrativo");
  $sqlCommand = ' DELETE ';
  $sqlCommand .= ' FROM ';
  $sqlCommand .= '    timesheet ';
  $sqlCommand .= ' WHERE ';
  $sqlCommand .= '    Portal_codigo = ' . $do->prepareDataToSQLQuery("number", $params['codigo']) . '';
  $sqlCommand .= ' AND ';
  $sqlCommand .= '    Pessoa_codigo = ' . $usuarioCodigo . ' ';

  $do->begin();
  $result = $do->execute($sqlCommand, "DELETE", "");
  $do->commit();
  $do->selectDBInstance("portaldofornecedor");
  if ($result) {
    echo '{"success":true,  "message": "excluido com sucesso"}';
    exit;
  } else {
    echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
    exit;
  }
} else {
  echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
  exit;
}