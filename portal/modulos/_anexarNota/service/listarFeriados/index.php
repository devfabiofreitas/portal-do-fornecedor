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
$usuariocodigo = $usuarioSessao['codigo'];

$sqlCommand  = ' SELECT ';
$sqlCommand .= '    count(horas)  ';
$sqlCommand .= ' FROM ';
$sqlCommand .= '    feriados ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '    data = "' .  .  '"  ';
$sqlCommand .= ' AND Cliente_codigo = 52 ';

$do->begin();
$result = $do->execute($sqlCommand, "SELECT", "");
$do->commit();
$elements = $do->toJSON($result);

if (count($elements) > 0) {
  echo '{"success":true,  "message": "listado com sucesso" , "elements": ' . json_encode($elements) . '}';
} else {
  echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
  exit;
}

function getDiasUteis($aPartirDe, $quantidadeDeDias = 30) {
  $P_Dia = new DateTime("Y-m-01");
$U_Dia = new DateTime("Y-m-t");


  $listaDiasUteis = [];
  $contador = 0;
  while ($contador < $quantidadeDeDias) {
      $dateTime->modify('+1 weekday'); // adiciona um dia pulando finais de semana
      $data = $dateTime->format('Y-m-d');
      if (!isFeriado($data)) {
          $listaDiasUteis[] = $data;
          $contador++;
      }
  }

  return $listaDiasUteis;
}

function mesAtual()
{
  $hoje = new DateTime();
  $dataSql = '';

  $hoje = $hoje->modify('-1 months');

  $mes = (int) $hoje->format('m');
  $ano = (int) $hoje->format('Y');
  return $ano . "-" . $mes;
}
