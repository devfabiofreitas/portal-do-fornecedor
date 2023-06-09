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
$codigo = $usuarioSessao['codigo'];





$sqlCommand  = " SELECT ";
$sqlCommand .= " JSON_ARRAYAGG(JSON_OBJECT('codigo', p.codigo,'nome', p.nome,'dataInicio', date_format(p.dataInicio,'%d/%m/%Y'), 'qtdProjetos', p.qtdProjetos)) as P,";
$sqlCommand .= " JSON_ARRAYAGG(JSON_OBJECT('codigo', U.Usuario_codigo)) as U ";
$sqlCommand .= " FROM pessoas as p ";
$sqlCommand .= " INNER JOIN responsaveis_tecnicos U ON p.codigo = U.Usuario_codigo ";
$sqlCommand .= " WHERE ";
$sqlCommand .= "  U.Usuario_codigo  = ".$codigo." ";




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
