<?php
    error_reporting(E_STRICT);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header('Content-Type: text/html; charset=UTF-8');
    define('DEFAULT_DB', 'administrativo');  
    require_once('../../../../../properties.inc.php');
    require_once('../../../../../properties.db.inc.php');
    require_once(DOFMW . '/Do.class.php');
    $usuarioSessao = $do->getUserSession();
    $params = json_decode($_POST['params'], true);
    
    $sqlCommand .= ' SELECT  ';
    $sqlCommand .= ' 	Pessoa_codigo, ';
    $sqlCommand .= ' 	Projeto_codigo, ';
    $sqlCommand .= ' 	JSON_UNQUOTE(JSON_EXTRACT(perfilVaga, "$.perfil")) AS nomePerfil ';
    $sqlCommand .= ' FROM ';
    $sqlCommand .= ' 	pessoa_projeto ';
    $sqlCommand .= ' WHERE  ';
    $sqlCommand .= '   Pessoa_codigo = '.$usuarioSessao['codigo'].'';
    $sqlCommand .= '   AND ';
    $sqlCommand .= 'LOWER(SUBSTRING_INDEX(JSON_UNQUOTE(JSON_EXTRACT(perfilVaga,"$.perfil")) ," ",3)) = "gerente de projetos" AND situacao = "H" '; 
    $do->begin();
    $result = $do->execute($sqlCommand, "SELECT", "");
    $do->commit();
    $elements = $do->toJSON($result);
    if (count($elements) > 0) {
        $_SESSION['BlueshiftPortalSession']['user']['gestaoProjeto'] = "S";
        echo '{"success":"",  "message": ""}';
        exit;
    } else {
        $_SESSION['BlueshiftPortalSession']['user']['gestaoProjeto'] = "N";
        echo '{"success":"", "message": ""}';
        exit;
    }
