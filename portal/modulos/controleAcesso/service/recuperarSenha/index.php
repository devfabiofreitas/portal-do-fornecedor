<?php
	error_reporting(E_STRICT);
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: text/html; charset=UTF-8');

	require_once('../../../../../properties.inc.php');
	require_once('../../../../../properties.db.inc.php');
    //require_once('../../../../../lib/MailService/MailService.php');
	require_once( DOFMW . '/Do.class.php');

    $email = $_POST["email"];

    function generateKey($length = 15, $keytype = ""){
        $length = (int)$length;
        if ($length<=0) {
            return FALSE;
        }
        mt_srand((double)microtime()*1000000);
        $key = "";
        while(strlen($key)!=$length){
            $c = mt_rand(0,2);
            switch($keytype){
                case 'number':
                        $key .= mt_rand(0,9);
                        break;
                case 'ustring':
                        $key .= chr(mt_rand(65,90));
                        break;
                case 'lstring':
                        $key .= chr(mt_rand(97,122));
                        break;
                case 'mixstring':
                        if ($c==0){
                            $key .= chr(mt_rand(65,90));
                        } elseif ($c==1){
                            $key .= chr(mt_rand(97,122));
                        }
                        break;
                default:
                        if ($c==0){
                            $key .= chr(mt_rand(65,90));
                        } elseif ($c==1){
                            $key .= chr(mt_rand(97,122));
                        } else {
                            $key .= mt_rand(0,9);
                        }
            }
        }
    
        $chaveKey = $key;
        return $key;
    }

    $key = generateKey();

    $sqlCommand  = " SELECT ";
    $sqlCommand .= "    count(email) as total ";
    $sqlCommand .= " FROM ";
    $sqlCommand .= "   usuarios ";
    $sqlCommand .= " WHERE";
    $sqlCommand .= "    email = '" . addslashes($email) . "' ";
    

    $do->begin();
    $result = $do->execute($sqlCommand, "SELECT", "");
    $do->commit();
    $elements = $do->toJSON( $result );
    var_dump($result);

    
    if(count($result) < 1){
        echo 1;
        $do->end();
        echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
        exit;
    }else if(count($result) > 1){
        $mensagemHTML  = '<div style="font-family: Arial; max-width: 100%; width: 100%; margin: auto; background: #fafafa;">';
        $mensagemHTML .= '  <div style="max-width: 560px; width: auto; margin: auto; background: #fff; padding: 10px;">';
        $mensagemHTML .= '    <div style="text-align: center; border-bottom: solid 2px #3f3f3f; padding: 20px 10px;">';
        $mensagemHTML .= '        <img style="width: 240px; height: auto;" src="https://blueshift.com.br/files/img/bluelogo.png">';
        $mensagemHTML .= '    </div>';
        $mensagemHTML .= '  <div style="padding: 70px 20px; color: #3f3f3f">';
        $mensagemHTML .= '       <div style="color: #09b3f1; text-align: center; font-size: 15px;"><h2 style="margin-bottom: 30px; font-size: 21px;">Recupera&ccedil;&atilde;o de Senha</h2></div>';
        $mensagemHTML .= '      <p><b>Clique no link abaixo para redefinir sua senha:</b></p>';
        $mensagemHTML .= '      <a href="https://localhost/portal/redefinirSenha?key=' . utf8_decode($key) . '">https://localhost/portal/redefinirSenha?key=' . utf8_decode($key) . '</a>';
        $mensagemHTML .= '  </div>';
        $mensagemHTML .= '    <div style="padding: 25px 20px; background: #262626; text-align: center; font-size: 14px;">';
        $mensagemHTML .= '        <p style="margin:0; color: #fff;">Esse é um Email Automático. Favor <b>não</b> Responder.</p>';
        $mensagemHTML .= '        <p class="copyright" style="color: #fff; font-size: 12px; margin-top: 5px;">BlueShift | Todos os direitos reservados | 2020 ©</p>';
        $mensagemHTML .= '    </div>';
        $mensagemHTML .= '  </div>';
        $mensagemHTML .= '</div>';

        $mail_service_parameter["id"] = "recuperacaoSenha";
        $mail_service_parameter["body"]     = "<body>". $mensagemHTML. "</body>";    
        $mail_service_parameter["text"]     = "";    
        $mail_service_parameter["from"]     = "thais.gomes@blueshift.com.br";
        $mail_service_parameter["fromName"] = "BlueShift - E-mail automático";
        $mail_service_parameter["subject"]  = "Recuperação de Senha";
        $mail_service_parameter["important"] = false;
        $mail_service_parameter["key"] = "3zHvP95KpKvo1S2n-1UvgQ";
        
        $mail_service = new MailService($mail_service_parameter);
        $_POST["email"] = $_POST["email"];    
        $_POST["nome"] = "Blueshift"; 
        $params = array("nome", "email");

        $metadado = $mail_service->addEmail($_POST, 'email', $params);
        $postdata = $mail_service->geraJsonEnvio();                     
        $retorno = $mail_service->do_post_request_v2($postdata);
        
        if(!$retorno){
            echo '{"success":false,"message":"Erro ao enviar o email"}';
            exit;         
        }else{
            echo '{"success":true, "message":"As instruções de recuperação de senha foram enviadas para seu email!"}';  
            exit;            
        }
    }else{
        if($result[0]['total'] < 1){
            echo '{"success":false, "message": "Usuário Inexistente."}';
            exit;
        }
    }
?>