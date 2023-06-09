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
    $usuarioCodigo = $usuarioSessao['codigo'];
    $sqlCommand = ' SELECT ' ;
    $sqlCommand .= '     nome' ;
    $sqlCommand .= ' FROM' ;
    $sqlCommand .= '     feriados' ;
    $sqlCommand .= ' WHERE ' ;
    $sqlCommand .= ' 	Cliente_codigo = '.$params['Client'].'' ;
    $sqlCommand .= '    AND data BETWEEN "'.$params['Start_Date'].'" AND "'.$params['End_Date'].'"' ;
    $do->begin();
    $result = $do->execute($sqlCommand, "SELECT", "");
    $do->commit();
    $elements = $do->toJSON($result);
    if (count($elements) > 0) {
        echo '{"success":true,  "message": "listado com sucesso" , "elements": ' . json_encode($elements) . '}';
        exit;
    } else {
        echo '{"success":false, "message": "Nenhum feriado encontrado."}';
        exit;
    }
