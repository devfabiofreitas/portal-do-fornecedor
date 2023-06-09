<?php
require_once(__DIR__ . '/../../../../properties.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once(ROOT . 'portal/php/utils.inc.php');
$do->getUserSession();

function listarMarcacoesDia($data, $do, $usuarioCodigo)
{
    $sqlCommand = ' SELECT ';
    $sqlCommand .= '   codigo, Responsavel_codigo, User, Client, Project, Tags, Billable, Description,';
    $sqlCommand .= '   Start_Date, Start_Time, End_Date, End_Time, Duration_h, Duration_d ';
    $sqlCommand .= ' FROM ';
    $sqlCommand .= '    timesheet ';
    $sqlCommand .= ' WHERE ';
    $sqlCommand .= '    Responsavel_codigo =  ' . $usuarioCodigo . '';
    $sqlCommand .= ' AND ';
    $sqlCommand .= '    Start_Date =  "' . $do->prepareDataToSQLQuery("r", $data) . '" ';
    $do->begin();
    $result = $do->execute($sqlCommand, "SELECT", "");
    $do->commit();
    $elements = $do->toJSON($result);

    if (count($elements) > 0) {
        return $elements;
    }

    return false;
}