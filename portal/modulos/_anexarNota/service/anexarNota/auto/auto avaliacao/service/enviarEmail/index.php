<?php
    error_reporting(E_STRICT);
    header("Access-Control-Allow-Headers: Content-Type");
    header('Content-Type: text/html; charset=UTF-8');
    
    require_once('../../../../../properties.inc.php');
    require_once('../../../../../properties.db.inc.php');
    require_once('../../../../../lib/MailService/MailService.php');
    require_once( DOFMW . '/Do.class.php');
    $do->validaSessao();

    $year = date("Y");

    // for ($i = 0; $i < count($json); $i++) {
        $mail_service_parameter = NULL;
        $mensagemHTML = '<div style="font-family: Arial; max-width: 100%; width: 100%; margin: auto; background: #fafafa;">';
        $mensagemHTML .= '  <div style="max-width: 560px; width: auto; margin: auto; background: #fff; padding: 10px;">';
        $mensagemHTML .= '    <div style="text-align: center; border-bottom: solid 2px #3f3f3f; padding: 20px 10px;">';
        $mensagemHTML .= '        <img style="width: 240px; height: auto;" src="https://blueshift.com.br/files/img/bluelogo.png">';
        $mensagemHTML .= '    </div>';
        $mensagemHTML .= '  <div style="padding: 70px 20px; color: #3f3f3f">';
        // $mensagemHTML .= '      <p style="margin-bottom: 0; margin-top: 2px;">Olá ' .$_POST["lider"]. ',</p>';
        $mensagemHTML .= '      <p style="margin-bottom: 0; margin-top: 5px; margin-bottom: 5px;">O colaborador ' .$_POST['colaborador']. ', realizou novas atualizações em sua auto avaliação.  </p>';
        // $mensagemHTML .= '      <p style="font-weight: bold; margin-top: 5px;"> <a style="color: #2CABE0 !important;font-family: Arial;" href="https://admin.blueshift.com.br" >Adminstrativo Blueshift</a></p>';
        $mensagemHTML .=  '</div>';
        $mensagemHTML .= '  </div>';
        $mensagemHTML .= '    <div style="padding: 25px 20px; background: #262626; text-align: center; font-size: 14px;">';
        $mensagemHTML .= '        <p style="margin:0; color: #fff;">Esse é um Email Automático. Favor <b>não</b> Responder.</p>';
        $mensagemHTML .= '        <p class="copyright" style="color: #fff; font-size: 12px; margin-top: 5px;">BlueShift | Todos os direitos reservados | '.$year.' ©</p>';
        $mensagemHTML .= '    </div>';
        $mensagemHTML .= '  </div>';
        $mensagemHTML .= '</div>';
        

        $mail_service_parameter["id"] = "autoAvaliacao";
        $mail_service_parameter["body"]     = "<body>". $mensagemHTML. "</body>";    
        $mail_service_parameter["text"]     = "";    
        $mail_service_parameter["from"]     = "no-reply@blueshift.com.br";
        $mail_service_parameter["fromName"] = "RH BlueShift - E-mail automático - Não responder";
        $mail_service_parameter["subject"]  = "Avaliação Colaborador - Blueshift Brasil" ;
        $mail_service_parameter["subaccount"] = "docontrol";
        $mail_service_parameter["important"] = false;
        $mail_service_parameter["key"] = "3zHvP95KpKvo1S2n-1UvgQ";

        $mail_service = new MailService($mail_service_parameter);
        // echo $mensagemHTML;exit;
        $_POST["colaborador"] = "Carlivan"; 
        $_POST["email"] = "carlivan.silva@blueshift.com.br";
        $params = array("colaborador", "email");

        $dados = array();
        $dados["colaborador"] = "Caue";
        $dados["email"] = "caue.silva@blueshift.com.br";  
        
        // $_POST["metadado"] = json_encode($mail_service->geraJsonIndividual($metadado));
        $mail_service->addEmail($_POST, 'email', $params);
        // $mail_service->addEmail($dados, 'email', $params);
        $postdata = $mail_service->geraJsonEnvio();   

        $retorno = $mail_service->do_post_request_v2($postdata);

        if(!$retorno){
            echo '{"success":false,"message":"Erro ao enviar email."}';
            exit;
        }
    // }

    echo '{"success":true,"message":"Email enviado com sucesso!"}';
    exit;
?>