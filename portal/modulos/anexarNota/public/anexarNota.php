<?php
require_once('../../../../properties.inc.php');
require_once(ROOT . 'properties.inc.php');
require_once(ROOT . 'properties.db.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once('../src/validacoes.inc.php');
require_once('../src/registrar.inc.php');

/**
 * Executa a validacao e upload da nota fiscal
 * Recebe as informacoes por POST
 * Redireciona para a pagina anexarNota com o resultado
 */
bloquear_echo_framework();
$usuario_sessao = $do->getUserSession();

if (isset($_POST['action']) && $usuario_sessao) {
    switch ($_POST['action']) {
        case 'uploadNotaFiscal':
            $form_data = limpar_formulario_nota_fiscal($_POST);
            $resultado_validacao = validar_nota($form_data, $_FILES, $usuario_sessao['codigo'], $do);
            if (!$resultado_validacao->status) {
                $status_message = $resultado_validacao->codificar_mensagem();
            } else {
                $resultado_registrar = registrar_nota_fiscal($form_data, $_FILES, $usuario_sessao['codigo'], $do);
                $status_message = $resultado_registrar->codificar_mensagem();
            }
            header("Location: index.php?$status_message");
            break;
        default:
            header("Location: index.php");
            break;
    }
}
?>