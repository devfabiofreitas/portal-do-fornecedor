<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
session_start();
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');

if(!isset($_SESSION['BlueshiftPortalSession'])){
    echo 1;
}else{
    $agora = mktime(date('H:i:s'));
    $segundos = (is_numeric($_SESSION["BlueshiftPortalSession"]['tempo_permitido']) and is_numeric($agora)) ? ($agora - $_SESSION["BlueshiftPortalSession"]['tempo_permitido']) : false;

    if ($segundos > 3600) {
        session_destroy();
        echo 1;
    }else{
        $codigo = $_SESSION['BlueshiftPortalSession']['user']['codigo'];
        $sqlCommand  = "SELECT u.situacao AS Usuario_situacao, rt.situacao AS Responsavel_situacao ";
        $sqlCommand .= " FROM responsaveis_tecnicos rt ";
        $sqlCommand .= " INNER JOIN usuarios u on u.codigo = rt.Usuario_codigo ";
        $sqlCommand .= "where rt.codigo = ". $codigo;        
        
        $do->begin();
        $result = $do->execute($sqlCommand, "SELECT", "");
        $do->commit();
        $elements = $do->toJSON($result);

        $situacaoUsu = $elements[0]['Usuario_situacao'];
        $situacaoRt = $elements[0]['Responsavel_situacao'];
        if($situacaoUsu == 'D' || $situacaoRt == 'D'){
            session_destroy();
            echo 1;
        }
    }
}

?>