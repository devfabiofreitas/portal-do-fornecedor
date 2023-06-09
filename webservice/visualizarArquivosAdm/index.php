<?php
require_once('../../properties.inc.php');
require_once('../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
//$do->validarSessao();

$env = "qVlzjBWjoRakKIcDCUNAjzYGGF7KBRZ57odwOmtBU9S8xlm62c3413fa7e8a";
$caminho = $_GET['caminho'];
$url = $_GET['url'];
$urlFinal = $url . 'webservice/visualizarDocumento/response.php' . '?caminho=' . $caminho;

$options = array('http' => array(
    'method'  => 'GET',
    'header' => 'Authorization: Bearer ' . $env
));

$context  = stream_context_create($options);
header('Content-type: application/pdf');
$obj = file_get_contents($urlFinal, false, $context);
echo $obj;
