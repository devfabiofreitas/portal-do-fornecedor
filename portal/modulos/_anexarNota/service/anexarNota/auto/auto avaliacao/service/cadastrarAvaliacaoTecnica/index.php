<?php

error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('America/Sao_Paulo');
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
define('DEFAULT_DB', 'administrativo');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();

$usuarioSessao = $do->getUserSession();
$codigo = $usuarioSessao['codigo'];
// $params = json_encode($params, JSON_UNESCAPED_UNICODE);
$params = $_POST['params'];
setlocale(LC_ALL, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
setlocale(LC_MONETARY, 'pt_BR');
date_default_timezone_set('America/Sao_Paulo');

$aux = json_decode($params);

$contador = 0;
while ($contador < count($aux->tags)) {
    $sqlCommand  = "SELECT Pessoa_codigo FROM pessoa_tags WHERE Pessoa_codigo = '" . $codigo . "'";
    $sqlCommand .= "AND Tags_codigo = '" . $aux->tags[$contador]->Tags_codigo . "' ";
    $do->begin();
    $result = $do->execute($sqlCommand, "SELECT", "");
    $do->commit();
    $elements = $do->toJSON($result);

    $transacao = '';
    if ($elements > 0) {
        $sqlCommand  = 'UPDATE  pessoa_tags SET ';
        $sqlCommand .= ' autoAvaliacao = ' . $do->prepareDataToSQLQuery("string", json_encode($aux->tags[$contador]->autoAvaliacao)). ', ';
        $sqlCommand .= ' ultimaAtualizacao = dataHoraAtual() ';
        $sqlCommand .= ' WHERE ';
        $sqlCommand .= ' Pessoa_codigo = ' . $codigo ;
        $sqlCommand .= ' AND Tags_codigo = ' . $aux->tags[$contador]->Tags_codigo ;

        $result = $do->execute($sqlCommand, "UPDATE", "");
        if ($result) {
            $transacao = 'Atualizado';
        }
    } else {
        $sqlCommand  = 'INSERT INTO  pessoa_tags';
        $sqlCommand .= '(Pessoa_codigo, Tags_codigo, Tags_tag, autoAvaliacao, ultimaAtualizacao)';
        $sqlCommand .= 'values';
        $sqlCommand .= '(' . $do->prepareDataToSQLQuery("number", $codigo) . ', ';
        $sqlCommand .=   $do->prepareDataToSQLQuery("number", $aux->tags[$contador]->Tags_codigo) . ', ';
        $sqlCommand .=   $do->prepareDataToSQLQuery("string", $aux->tags[$contador]->Tags_tag) . ', ';
        $sqlCommand .=   $do->prepareDataToSQLQuery("string", json_encode($aux->tags[$contador]->autoAvaliacao)) . ', ';
        $sqlCommand .= ' dataHoraAtual() ) ';
        $result = $do->execute($sqlCommand, "INSERT", "");
        if ($result) {
            $transacao = 'Inserido';
        }
    }
    $contador++;
}

$do->commit();

if ($result) {
    echo '{"success":true, "message": "' . $transacao . ' com sucesso"}';
    exit;
} else {
    echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
    exit;
}
