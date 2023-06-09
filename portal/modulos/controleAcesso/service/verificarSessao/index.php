<?php
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    verificarSessao();
    // echo "<script>console.log('valida sessao');</script>";

    // Verifica se já tem sessão iniciada e se tiver verifica o tempo de sessão
    // Caso ele esteja logado por 24 horas desloga o usuário.
    function verificarSessao(){
        if(!isset($_SESSION['BlueshiftPortalSession'])){
            session_destroy();
            $caminho = HTTP_SERVER . "portal/login/";
            echo "<script>top.window.location = '$caminho'</script>";
            exit;
        }else{
            $agora = mktime(date('H:i:s'));
            $segundos = (is_numeric($_SESSION["BlueshiftPortalSession"]['tempo_permitido']) and is_numeric($agora)) ? ($agora - $_SESSION["BlueshiftPortalSession"]['tempo_permitido']):false;

            define('TEMPO_LOGADO', 7200);
            if($segundos > TEMPO_LOGADO) {
                session_destroy();
                $caminho = HTTP_SERVER . "portal/login/?time=expirado";
                echo "<script>top.window.location = '$caminho'</script>";
                exit;
            }
        }
    }
?>