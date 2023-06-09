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
$usuarioCodigo = $usuarioSessao['codigo'];

$sqlCommand .= ' SELECT DISTINCT ';
$sqlCommand .= '     rt.nome, rt.codigo, ';
$sqlCommand .= '        (SELECT ';
$sqlCommand .= '             sec_to_time(SUM(time_to_sec( Duration_h )))';
$sqlCommand .= '             FROM timesheet t ';
$sqlCommand .= '             WHERE t.Responsavel_codigo = rt.codigo ';
if ($params['Projeto_codigo']) {
    $sqlCommand .=  ' AND t.Projeto_codigo =  ' . $do->prepareDataToSQLQuery("r", $params['Projeto_codigo']) . ' ';
}
if ($params['periodoInicio'] && $params['periodoFim']) {
    $sqlCommand .=  ' AND t.Start_Date BETWEEN "' . $do->prepareDataToSQLQuery("r", $params["periodoInicio"]) . '" AND "' . $do->prepareDataToSQLQuery("r", $params["periodoFim"]) . '" ';
}

if ($params['Cliente_codigo']) {
    $sqlCommand .= ' AND t.Cliente_codigo =  ' . $do->prepareDataToSQLQuery("r", $params['Cliente_codigo']) . ' ';
}

$sqlCommand .= ' ) AS Duration_h';
$sqlCommand .= ' FROM ';
$sqlCommand .= '   responsaveis_tecnicos rt';
if ($params['Projeto_codigo'] || $params['Cliente_codigo']) {
    $sqlCommand .= ' LEFT JOIN ';
    $sqlCommand .= '   timesheet lft  ';
    $sqlCommand .= ' ON lft.Responsavel_codigo = rt.codigo';
}
$sqlCommand .= ' WHERE ';
$sqlCommand .= '   rt.Lider_codigo =  ' . $usuarioCodigo;
$sqlCommand .= ' AND ';
$sqlCommand .= '   rt.situacao <> "D" ';
if ($params['Pessoa_codigo']) {
    $sqlCommand .=  ' AND rt.codigo =  ' . $do->prepareDataToSQLQuery("r", $params['Pessoa_codigo']) . ' ';
}
if ($params['Cliente_codigo']) {
    $sqlCommand .= ' AND lft.Cliente_codigo =  ' . $do->prepareDataToSQLQuery("r", $params['Cliente_codigo']) . ' ';
}

if ($params['Projeto_codigo']) {
    $sqlCommand .=  ' AND lft.Projeto_codigo =  ' . $do->prepareDataToSQLQuery("r", $params['Projeto_codigo']) . ' ';
    if ($params['periodoInicio'] && $params['periodoFim']) {
        $sqlCommand .=  ' AND lft.Start_Date BETWEEN "' . $do->prepareDataToSQLQuery("r", $params["periodoInicio"]) . '" AND "' . $do->prepareDataToSQLQuery("r", $params["periodoFim"]) . '" ';
    }
}

$sqlCommand .= ' GROUP BY rt.codigo ORDER BY rt.nome ASC ; ';
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
