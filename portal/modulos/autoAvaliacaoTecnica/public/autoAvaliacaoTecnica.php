<?php
require_once(__DIR__ . '/../../../../properties.inc.php');
require_once(ROOT . 'properties.db.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once('../src/registrar.inc.php');


$usuario_sessao = $do->getUserSession();

if (isset($_POST['action']) && $usuario_sessao) {
    switch ($_POST['action']) {
        case 'salvarTags':
            $resultado_registro = registrar_auto_avaliacao($usuario_sessao['codigo'],  $do, $_POST);
            $status_message = $resultado_registro->codificar_mensagem();
            header("Location: index.php?$status_message");
            break;
        default:
            header("Location: index.php");
            break;
    }
}

?>