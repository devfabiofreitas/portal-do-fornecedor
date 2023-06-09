<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
define('DEFAULT_DB', 'administrativo');
session_start();
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();

$usuarioSessao = $do->getUserSession();

$params = json_decode($_POST['params'], true);

if(count($params) == 0){
    exit;
}

$codigo = $usuarioSessao['codigo'];

$sqlCommand  = " SELECT ";
$sqlCommand .= "    JSON_ARRAYAGG(JSON_OBJECT('Tags_codigo', tg.codigo, ";
$sqlCommand .= "                              'tag', tg.tag, ";
$sqlCommand .= "                              'class01', IF(tg.class01 IS NULL OR tg.class01 = '', 'OUTROS', tg.class01), ";
$sqlCommand .= "                              'senioridade', tg.senioridade, ";
$sqlCommand .= "                              'autoAvaliacao', ptg.autoAvaliacao)) as tags ";
$sqlCommand .= " FROM ";
$sqlCommand .= "    tags tg LEFT JOIN pessoa_tags ptg ON tg.codigo = ptg.Tags_codigo ";
$sqlCommand .= " AND ptg.Pessoa_codigo = " . $do->prepareDataToSQLQuery("string", $codigo) . " ";

$do->begin();
$result = $do->execute($sqlCommand, "SELECT", "");
$do->commit();

$elements = $do->toJSON($result);
if (count($elements) > 0) {
    $elements['nome'] = $usuarioSessao['nome'];
    $elements['email'] = $usuarioSessao['email'];
    echo '{"success":true,  "message": "listado com sucesso" , "elements": ' . json_encode($elements) . '}';
    exit;
} else {
    echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
    exit;
}
