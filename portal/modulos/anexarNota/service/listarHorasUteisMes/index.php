<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');

require_once('../../src/listagens.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();
$params = json_decode($_POST['params'], true);
$usuarioSessao = $do->getUserSession();
$usuariocodigo = $usuarioSessao['codigo'];

$elements[] = listar_horas_uteis_mes($params['periodoInicio'], $params['periodoFim'], $do);
$elements[] = listar_total_horas_trabalhadas_mes($usuariocodigo, $params['periodoInicio'], $params['periodoFim'], $do, $usuariocodigo);


if (count($elements) > 0) {
  echo '{"success":true,  "message": "listado com sucesso" , "elements": ' . json_encode($elements) . '}';
} else {
  echo '{"success":true,  "message": "listado com sucesso" , "elements": ' . json_encode($elements) . '}';
  exit;
}