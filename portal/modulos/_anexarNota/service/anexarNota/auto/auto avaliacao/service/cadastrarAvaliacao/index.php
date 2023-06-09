<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('America/Sao_Paulo');
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();

$usuarioSessao = $do->getUserSession();
$codigo = $usuarioSessao['codigo'];
// $acao = $_POST['acao'];
// $tipo = $_POST['tipo'];
// $params = json_decode($_POST['params'], true);  
$do = $GLOBALS['do'];
// $jsonParams = $params;
$params = json_encode($params, JSON_UNESCAPED_UNICODE);
$data = date("Y-m-d H:i:s");
$params = $_POST['params'];


// $procedure = $_POST['procedure'];



$sqlCommand = 'UPDATE pessoas';
$sqlCommand .= ' SET ';
// $sqlCommand .=   " autoAvaliacao = JSON_UNQUOTE(JSON_EXTRACT($params, CONCAT($resultado[$i].autoAvaliacao))) ";
$sqlCommand .=  'autoAvaliacao = "' . addslashes(utf8_decode($params)) . '"';
// $sqlCommand .= ' WHERE codigo = ' . $codigo. '';

$sqlCommand .= ' WHERE codigo =  "686" ';
// $sqlCommand .= $do -> prepareDataToSQLQuery("string", json_encode($params)) . ' ';
// $sqlCommand .= '    ) ';
// echo $sqlCommand; 
// exit;


$do->begin();
$result = $do->execute($sqlCommand, "UPDATE", "");
$do->commit();
if ($result) {
    echo '{"success":true, "message": "cadastrado com sucesso"}';
    exit;
} else {
    echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
    exit;
}


// if($result == 'UPDATE') {
//     $do->end();
//     echo '{"success":true, "message": "Operação efetuada com sucesso!", "elements": ' . json_encode($resultado) . '}';
//     exit;
// }else {
//     $do->end();
//     echo '{"success":true, "message": "Operação efetuada com sucesso!", "elements": ' . json_encode($resultado) . '}';
//     exit;
// }


