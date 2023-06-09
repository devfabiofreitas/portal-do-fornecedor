<?php
require_once('../../../../properties.inc.php');
require_once(ROOT . 'properties.db.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once('utils.inc.php');
require_once('src/validacoes.inc.php');
require_once('src/atualizacoes.inc.php');
$usuario_sessao = $do->getUserSession();

/**
 * Executa a validacao e atualizacao dos dados cadastrais
 * Recebe as informacoes por POST
 * Redireciona para a pagina dadosCadastrais com o resultado
 */

if (isset($_POST['action']) && $usuario_sessao) {
    switch ($_POST['action']) {
        case 'atualizarDados':
            $resultado_validacao = validar_campos_dados_consultor($_POST, $do);

            if (!$resultado_validacao->status) {
                $status_message = $resultado_validacao->codificar_mensagem();
            } else {
                $resultado_registrar = salvar_formulario_consultor($_POST, $usuario_sessao['codigo'], $do);
                
                $status_message = $resultado_registrar->codificar_mensagem();
            }
            header("Location: index.php?menu=dadosCadastrais&$status_message");
            break;

        case 'atualizarDadosEmpresa':
            $resultado_validacao = validar_campos_dados_empresa($_POST, $do);

            if (!$resultado_validacao->status) {
                $status_message = $resultado_validacao->codificar_mensagem();
            } else {
                $resultado_registrar = salvar_formulario_empresa($_POST, $usuario_sessao['codigo'], $do);
                $status_message = $resultado_registrar->codificar_mensagem();
            }
            header("Location: index.php?menu=dadosCadastrais&$status_message");
            break;

        case 'atualizarSenha':
            $resultado_validacao = validar_campos_senha($_POST, $do);
            if (!$resultado_validacao->status) {
                $status_message = $resultado_validacao->codificar_mensagem();
            } else {
                $resultado_registrar = salvar_senha($_POST, $usuario_sessao['codigo'], $do);
                $status_message = $resultado_registrar->codificar_mensagem();
            }
            header("Location: index.php?menu=dadosCadastrais&$status_message");
            break;

        default:
            header("Location: index.php?menu=dadosCadastrais");
            break;
    }
}
