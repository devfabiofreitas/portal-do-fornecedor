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

  $sqlCommand  =  ' SELECT ';
  $sqlCommand  .= '    t.Client, ';
  $sqlCommand  .= '    t.Project, ';
  $sqlCommand  .= '    t.User, ';
  $sqlCommand  .= '    sec_to_time(SUM(time_to_sec( Duration_h ))) as totalHoras, ';
  $sqlCommand  .= '    rt.beneficiario, ';
  $sqlCommand  .= '    rt.banco, ';
  $sqlCommand  .= '    rt.agencia, ';
  $sqlCommand  .= '    rt.digitoConta, ';
  $sqlCommand  .= '    rt.conta ';
  $sqlCommand  .= ' FROM ';
  $sqlCommand  .= '    timesheet t ';
  $sqlCommand  .= '        INNER JOIN ';
  $sqlCommand  .= '    responsaveis_tecnicos rt ON rt.codigo = t.Responsavel_codigo ';
  $sqlCommand  .= ' WHERE ';
  $sqlCommand  .= '    t.Responsavel_codigo = '.addslashes($usuarioCodigo).' ';
  $sqlCommand  .= '        AND t.Start_Date >= "'.addslashes($params['periodoInicio']).'" ';
  $sqlCommand  .= '        AND t.End_Date <= "'.addslashes($params['periodoFim']).'" ';
  $sqlCommand  .= ' GROUP BY t.Cliente_codigo,t.Project; ';

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

