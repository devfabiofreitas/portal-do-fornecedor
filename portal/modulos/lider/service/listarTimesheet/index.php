<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
// define('DEFAULT_DB', 'administrativo');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();
$usuarioSessao = $do->getUserSession();
$usuarioCodigo = $usuarioSessao['codigo'];
$params = json_decode($_POST['params'], true);
$sqlCommand .= ' SELECT ';
$sqlCommand .= '     tim.codigo,';
$sqlCommand .= '     tim.Responsavel_codigo,';
$sqlCommand .= '     tim.Cliente_codigo,';
$sqlCommand .= '     tim.Projeto_codigo,';
$sqlCommand .= '     tim.Start_Date,';
$sqlCommand .= '     tim.User,';
$sqlCommand .= '     tim.Client,';
$sqlCommand .= '     tim.Project,';
$sqlCommand .= '     tim.Email,';
$sqlCommand .= '     tim.Start_Time AS hora_inicio,';
$sqlCommand .= '     tim.End_Time AS hora_fim,';
$sqlCommand .= '     tim.Description,';
$sqlCommand .= '     tim.Tags,';
$sqlCommand .= '     tim.Billable,';
$sqlCommand .= '     tim.Duration_d,';
$sqlCommand .= '     (SELECT p.situacao FROM responsaveis_tecnicos p WHERE p.codigo = tim.Responsavel_codigo LIMIT 1) as situacao';
$sqlCommand .= ' FROM';
$sqlCommand .= '     timesheet tim ';
$sqlCommand .= '        INNER JOIN  ';
$sqlCommand .= '     responsaveis_tecnicos r ON tim.Responsavel_codigo = r.codigo ';
$sqlCommand .= ' WHERE tim.codigo != "" AND r.Lider_codigo =  ' . $usuarioCodigo;
if ($params['Cliente_codigo']) {
    $sqlCommand .= ' AND tim.Cliente_codigo =  ' . $do->prepareDataToSQLQuery("r", $params['Cliente_codigo']) . ' ';
}
if ($params['Projeto_codigo']) {
    $sqlCommand .=  ' AND tim.Projeto_codigo =  ' . $do->prepareDataToSQLQuery("r", $params['Projeto_codigo']) . ' ';
}
if ($params['Pessoa_codigo']) {
    $sqlCommand .=  ' AND tim.Responsavel_codigo =  ' . $do->prepareDataToSQLQuery("r", $params['Pessoa_codigo']) . ' ';
}
if ($params['periodoInicio'] && $params['periodoFim']) {
    $sqlCommand .=  ' AND tim.Start_Date BETWEEN "' . $do->prepareDataToSQLQuery("r", $params["periodoInicio"]) . '" AND "' . $do->prepareDataToSQLQuery("r", $params["periodoFim"]) . '" ';
}

$sqlCommand .= ' HAVING ';
$sqlCommand .= '     situacao != "D" ';
$sqlCommand .= ' ORDER BY  ';
$sqlCommand .= '     Start_Date DESC, tim.Email ASC';
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
