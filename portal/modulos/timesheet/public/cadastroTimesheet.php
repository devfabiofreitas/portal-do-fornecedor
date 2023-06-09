<?php
error_reporting(E_STRICT);
require_once('../../../../properties.inc.php');
require_once(ROOT . 'properties.db.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once('../src/validacoes.inc.php');
require_once('../src/atualizacoes.inc.php');
require_once('../src/registros.inc.php');
$usuario_sessao = $do->getUserSession();
if ($usuario_sessao) {
    $verificar_data_hora = verificar_data_hora($_POST['Start_Date'], $_POST['End_Date'], $_POST['Start_Time'], $_POST['End_Time']);
    $verificar_campos_obrigatorios = verificar_campos_obrigatorios($_POST);
    $verificar_cadastro_futuro = verificarCadastroFuturo($_POST['Start_Date']);
    $verificar_possibilidade_apontamentop = verificarApontamentoPossivel($do, $usuario_sessao['codigo'], $_POST['Start_Date']);
    $verificar_recesso_remunerado = verificaRecessoRemunerado($do, $usuario_sessao['codigo'], $_POST['Start_Date']);
    $verificar_cadastro_mes_fechado = controleTimesheetDataCadastro($do, $usuario_sessao['codigo'], $_POST['Start_Date'], $_POST['Projeto_codigo']);
    $flag_erro = false;

    if ($verificar_data_hora->status == false && $flag_error == false) {
        $status_message = $verificar_data_hora->codificar_mensagem();
        $flag_erro = true;
    }

    if ($verificar_campos_obrigatorios->status == false && $flag_error == false) {
        $status_message = $verificar_campos_obrigatorios->codificar_mensagem();
        $flag_erro = true;
    }

    if ($verificar_cadastro_futuro->status == false && $flag_error == false) {
        $status_message = $verificar_cadastro_futuro->codificar_mensagem();
        $flag_erro = true;
    }

    if ($verificar_possibilidade_apontamentop->status == false && $flag_error == false) {
        $status_message = $verificar_possibilidade_apontamentop->codificar_mensagem();
        $flag_erro = true;

    }

    if ($verificar_recesso_remunerado->status == false && $flag_error == false) {
        $status_message = $verificar_recesso_remunerado->codificar_mensagem();
        $flag_erro = true;

    }

    if ($verificar_cadastro_mes_fechado->status == false && $flag_error == false) {
        $status_message = $verificar_cadastro_mes_fechado->codificar_mensagem();
        $flag_erro = true;
    }

    if (!$flag_erro) {
        switch ($_POST['action']) {
            case 'alterar':
                $alterar_timesheet = alterarTimesheet($do, $_POST, $usuario_sessao['codigo'], $usuario_sessao['email'], $usuario_sessao['nome']);

                $status_message = $alterar_timesheet->codificar_mensagem();
                break;
            case 'salvar':
                $registrar_timesheet = registrarTimesheet($do, $_POST, $usuario_sessao['codigo'], $usuario_sessao['email'], $usuario_sessao['nome']);

                $status_message = $registrar_timesheet->codificar_mensagem();
                break;

        }
    }

    header("Location: index.php?menu=timesheet&$status_message");

}