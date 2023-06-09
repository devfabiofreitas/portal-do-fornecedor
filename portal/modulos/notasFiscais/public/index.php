<?php
error_reporting(E_STRICT);
session_start();
require_once('../../../../properties.inc.php');
require_once(ROOT . 'properties.db.inc.php');
require_once(DOFMW . 'Do.class.php');
require_once(ROOT . 'portal/modulos/controleAcesso/service/verificarSessao/index.php');
require_once(ROOT . 'portal/php/utils.inc.php');
require_once('../src/listagens.inc.php');


$usuario_sessao = $do->getUserSession();
$usuario_codigo = $usuario_sessao['codigo'];



if (isset($_POST['limpar_filtro'])) {
    $_POST['mesAno'] = '';
}

if (!empty($_POST['mesAno']) && $usuario_sessao) {
    $info_notas = listar_notas_fiscais_filtro($_POST['mesAno'], $usuario_codigo, $do);
} else {
    $info_notas = listar_notas_fiscais($usuario_codigo, $do);
}


$template_tabela = gerar_tabela($info_notas);



$alerta_swal = (isset($_REQUEST['status'])) ? exibir_alerta_javascript($_REQUEST['status'], $_REQUEST['message']) : '';

require_once('../templates/notasFiscais.template.php');