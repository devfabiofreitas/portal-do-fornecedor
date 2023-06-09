<?php
  error_reporting(E_STRICT);
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");
  header('Content-Type: text/html; charset=UTF-8');
  require_once('../../../../../properties.inc.php');
  require_once('../../../../../properties.db.inc.php');
  require_once(DOFMW . '/Do.class.php');
  $params = json_decode($_POST['params'], true);
  $do->validarSessao();
  $usuarioSessao = $do->getUserSession();
  if (!$usuarioSessao['gestaoProjeto'] == 'S') {
      die;
  }else{
      $sqlCommand .= ' SELECT DISTINCT ';
      $sqlCommand .= '     t.Project, t.Projeto_codigo,t.Client ';
      $sqlCommand .= ' FROM ';
      $sqlCommand .= '     timesheet t ';
      $sqlCommand .= ' WHERE ';
      $sqlCommand .= '  t.Projeto_codigo IN ('.$params['Projeto_codigos'].')   GROUP BY t.Projeto_codigo ORDER BY t.Project ASC ; ';
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
  }
