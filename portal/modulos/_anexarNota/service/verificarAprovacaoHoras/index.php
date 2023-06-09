<?php
  error_reporting(E_STRICT);
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");
  header('Content-Type: text/html; charset=UTF-8');
  define('DEFAULT_DB', 'administrativo');
  require_once('../../../../../properties.inc.php');
  require_once('../../../../../properties.db.inc.php');
  require_once(DOFMW . '/Do.class.php');
  $do->validarSessao();
  $params = json_decode($_POST['params'], true);
  $usuarioSessao = $do->getUserSession();
  $usuarioCodigo = $usuarioSessao['codigo'];
  $sqlCommand  = ' SELECT ';
  $sqlCommand .= '   aprovacao ';
  $sqlCommand .= ' FROM ';
  $sqlCommand .= '    tb_folha_pagamento ';
  $sqlCommand .= ' WHERE ';
  $sqlCommand .= '    Pessoa_codigo = ' . $usuarioCodigo;
  $sqlCommand .= ' AND ';
  $sqlCommand .= '    mesReferencia = " ' . $params['mesReferencia'] . '"';
  $do->begin();
  $result = $do->execute($sqlCommand, "SELECT", "");
  $do->commit();
  $elements = $do->toJSON($result);
  if (count($elements) > 0) {
      echo '{"success":true,  "message": "listado com sucesso" , "elements": ' . json_encode($elements) . '}';
      exit;
  } else {
      echo '{"success":false, "message": "Ocorreu um erro ao listar seus Projetos. Tente novamente ou entre em contato com o suporte"}';
      exit;
  }
