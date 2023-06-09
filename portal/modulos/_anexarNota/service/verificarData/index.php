<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();
$sqlCommand  = ' SELECT ';
$sqlCommand .= ' DATE_FORMAT(dataHoraAtual(), "%d") ';
$sqlCommand .= ' AS dia ';  

$do->begin();
$result = $do->execute($sqlCommand, "SELECT", "");
$do->commit();
$elements = $do->toJSON($result);

$varificaoDia = "";
if(intval($elements[0]['dia']) > 10 && intval($elements[0]['dia']) < 15){
  $varificaoDia = "true";
}else{
  $varificaoDia = "false";
}
if (count($elements) > 0) {
    echo '{"success":true,  "message": "listado com sucesso","verificarDiaNota":"'.$varificaoDia.'"}';
    exit;
} else {
    echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
    exit;
}
