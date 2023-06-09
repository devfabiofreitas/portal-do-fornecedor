<?php
require_once('../../../../properties.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once(ROOT . 'portal/php/utils.inc.php');
$do->getUserSession();


function listarTimesheet($usuario_codigo, $do)
{
    $sql = "SELECT * FROM timesheet WHERE usuario_codigo = $usuario_codigo";
    $result = $do->query($sql);
    $timesheet = $result->fetch_assoc();
    return $timesheet;
}