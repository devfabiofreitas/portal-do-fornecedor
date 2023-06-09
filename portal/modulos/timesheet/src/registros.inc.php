<?php

require_once(__DIR__ . '/../../../../properties.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once(ROOT . 'portal/php/utils.inc.php');
require_once('listagens.inc.php');
$do->getUserSession();

function registrarTimesheet($do, $params, $usuarioCodigo, $usuarioEmail, $usuarioNome)
{
  $duration_h = calcularDiferencaHoras($params['Start_Date'], $params['End_Date'], $params['Start_Time'], $params['End_Time']);
  $duration_d = horasMinutosParaDecimal($duration_h);

  $sqlCommand = 'INSERT INTO timesheet(Responsavel_codigo, Cliente_codigo, Projeto_codigo, Email, Description , Client, Project, User, tags, Billable, Start_Date, End_Date, Start_Time, End_Time, Duration_d, Duration_h, dataCriacao)';
  $sqlCommand .= ' VALUES ';
  $sqlCommand .= '( ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $usuarioCodigo)) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Cliente_codigo'])) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Projeto_codigo'])) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $usuarioEmail)) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Description'])) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Client'])) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Project'])) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $usuarioNome)) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Tags_join'])) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Faturavel'])) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", implode('-', array_reverse(explode('/', $params['Start_Date']))))) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", implode('-', array_reverse(explode('/', $params['End_Date']))))) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Start_Time'])) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['End_Time'])) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $duration_d)) . '\', ';
  $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $duration_h)) . '\', ';
  $sqlCommand .= '     dataHoraAtual()     ';
  $sqlCommand .= ')';

  $do->begin();
  $result = $do->execute($sqlCommand, "INSERT", "");
  $do->commit();
  $res[0] = array("codigo" => $do->last_inserted_id);
  if ($result) {
    $do->selectDBInstance('administrativo');
    $sqlCommand = 'INSERT INTO timesheet(Portal_codigo, Pessoa_codigo, Cliente_codigo, Projeto_codigo, Email, Description , Client, Project, User, tags, Billable, Start_Date, End_Date, Start_Time, End_Time, Duration_d, Duration_h, dataCadastro)';
    $sqlCommand .= ' VALUES ';
    $sqlCommand .= '( ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $res[0]['codigo'])) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $usuarioCodigo)) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Cliente_codigo'])) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Projeto_codigo'])) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $usuarioEmail)) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Description'])) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Client'])) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Project'])) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $usuarioNome)) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Tags_join'])) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Faturavel'])) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", implode('-', array_reverse(explode('/', $params['Start_Date']))))) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", implode('-', array_reverse(explode('/', $params['End_Date']))))) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Start_Time'])) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['End_Time'])) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $duration_d)) . '\', ';
    $sqlCommand .= '\'' . addslashes($do->prepareDataToSQLQuery("r", $duration_h)) . '\', ';
    $sqlCommand .= '     dataHoraAtual()     ';
    $sqlCommand .= ')';

    $do->begin();
    $resultAdm = $do->execute($sqlCommand, "INSERT", "");
    $do->commit();
    $do->selectDBInstance('portaldofornecedor');

    if ($resultAdm) {
      return new ResultadoModulo(true);
    } else {
      $sqlCommand = 'DELETE FROM timesheet WHERE codigo = ' . $res[0]['codigo'];
      $do->begin();
      $result = $do->execute($sqlCommand, "DELETE", "");
      $do->commit();
      return new ResultadoModulo(false, "Ocorreu um erro ao cadastrar o apontamento. Por favor, tente novamente.");
    }
  } else {
    return new ResultadoModulo(false, "Ocorreu um erro ao cadastrar o apontamento. Por favor, tente novamente.");
  }
}

function alterarTimesheet($do, $params, $usuarioCodigo, $usuarioEmail, $usuarioNome)
{
  $duration_h = calcularDiferencaHoras($params['Start_Date'], $params['End_Date'], $params['Start_Time'], $params['End_Time']);
  $duration_d = horasMinutosParaDecimal($duration_h);


  $sqlCommand = ' INSERT INTO timesheet_log(Codigo_timesheet, Responsavel_codigo, Cliente_codigo, Projeto_codigo, Email, Description , Client, Project, User, tags, Billable, Start_Date, End_Date, Start_Time, End_Time, Duration_d, Duration_h, dataCriacao, dataAlteracao, tipoAlteracao) ';
  $sqlCommand .= '    SELECT ';
  $sqlCommand .= '        codigo, Responsavel_codigo, Cliente_codigo, Projeto_codigo, Email, Description , Client, Project, User, tags, Billable, Start_Date, End_Date, Start_Time, End_Time, Duration_d, Duration_h, dataCriacao, dataAlteracao, "U" ';
  $sqlCommand .= '    FROM   ';
  $sqlCommand .= '        timesheet ';
  $sqlCommand .= '    WHERE ';
  $sqlCommand .= '      timesheet.codigo = ' . $params['Codigo'] . '';

  $do->begin();
  $result = $do->execute($sqlCommand, "INSERT", "");
  $do->commit();


  $sqlCommand = ' UPDATE timesheet ';
  $sqlCommand .= ' SET ';
  $sqlCommand .= '     Cliente_codigo = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Cliente_codigo'])) . '\', ';
  $sqlCommand .= '     Projeto_codigo = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Projeto_codigo'])) . '\', ';
  $sqlCommand .= '     Description =  ' . '\'' . addslashes(($do->prepareDataToSQLQuery("r", $params['Description']))) . '\', ';
  $sqlCommand .= '     Client =  ' . '\'' . addslashes(($do->prepareDataToSQLQuery("r", $params['Client']))) . '\', ';
  $sqlCommand .= '     Project = ' . '\'' . addslashes(($do->prepareDataToSQLQuery("r", $params['Project']))) . '\', ';
  $sqlCommand .= '     User = ' . '\'' . addslashes(($do->prepareDataToSQLQuery("r", $usuarioNome))) . '\', ';
  $sqlCommand .= '     Tags =  ' . '\'' . addslashes(($do->prepareDataToSQLQuery("r", $params['Tags_join']))) . '\', ';
  $sqlCommand .= '     Billable =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Faturavel'])) . '\', ';
  $sqlCommand .= '     Start_Date =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", implode('-', array_reverse(explode('/', $params['Start_Date']))))) . '\', ';
  $sqlCommand .= '     End_Date =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", implode('-', array_reverse(explode('/', $params['End_Date']))))) . '\', ';
  $sqlCommand .= '     Start_Time = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Start_Time'])) . '\', ';
  $sqlCommand .= '     End_Time = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['End_Time'])) . '\', ';
  $sqlCommand .= '     Duration_d =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $duration_d)) . '\', ';
  $sqlCommand .= '     Duration_h = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $duration_h)) . '\', ';
  $sqlCommand .= '     dataAlteracao = dataHoraAtual()';
  $sqlCommand .= ' WHERE ';
  $sqlCommand .= '      codigo = ' . $params['Codigo'] . '';
  $sqlCommand .= ' AND ';
  $sqlCommand .= '      Responsavel_codigo = ' . $usuarioCodigo . ' ';

  $do->begin();
  $result = $do->execute($sqlCommand, "UPDATE", "");
  $do->commit();

  if ($result) {
    $do->selectDBInstance('administrativo');
    $sqlCommand = ' UPDATE timesheet ';
    $sqlCommand .= ' SET ';
    $sqlCommand .= '     Cliente_codigo = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Cliente_codigo'])) . '\', ';
    $sqlCommand .= '     Projeto_codigo = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Projeto_codigo'])) . '\', ';
    $sqlCommand .= '     Description =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Description'])) . '\', ';
    $sqlCommand .= '     Client =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Client'])) . '\', ';
    $sqlCommand .= '     Project = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Project'])) . '\', ';
    $sqlCommand .= '     User = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $usuarioNome)) . '\', ';
    $sqlCommand .= '     Tags =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Tags_join'])) . '\', ';
    $sqlCommand .= '     Billable =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Faturavel'])) . '\', ';
    $sqlCommand .= '     Start_Date =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", implode('-', array_reverse(explode('/', $params['Start_Date']))))) . '\', ';
    $sqlCommand .= '     End_Date =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", implode('-', array_reverse(explode('/', $params['End_Date']))))) . '\', ';
    $sqlCommand .= '     Start_Time = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['Start_Time'])) . '\', ';
    $sqlCommand .= '     End_Time = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $params['End_Time'])) . '\', ';
    $sqlCommand .= '     Duration_d =  ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $duration_d)) . '\', ';
    $sqlCommand .= '     Duration_h = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $duration_h)) . '\', ';
    $sqlCommand .= '     dataAlteracao = dataHoraAtual()';
    $sqlCommand .= ' WHERE ';
    $sqlCommand .= '      Portal_codigo = ' . $do->prepareDataToSQLQuery("r", $params['Codigo']) . '';
    $sqlCommand .= ' AND ';
    $sqlCommand .= '      Email = ' . '\'' . addslashes($do->prepareDataToSQLQuery("r", $usuarioEmail)) . '\'';

    $do->begin();
    $result = $do->execute($sqlCommand, "UPDATE", "");
    $do->commit();
    $do->selectDBInstance('portaldofornecedor');
    if ($result) {
      return new ResultadoModulo(true);
    }
  }

  return new ResultadoModulo(false, "Erro ao atualizar o apontamento. Tente novamente mais tarde.");


}