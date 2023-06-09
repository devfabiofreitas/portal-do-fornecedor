<?php
	error_reporting(E_STRICT);
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: text/html; charset=UTF-8');

	require_once('../../../../../properties.inc.php');
	require_once('../../../../../properties.db.inc.php');
    require_once('../../../../../lib/MailService/MailService.php');
	require_once( DOFMW . '/Do.class.php');

    $ano = date('Y');
    $nome = $_POST["nome"];
    $usuario = $_POST["usuario"];
    $email = $_POST["email"];
    $categoria = $_POST["categoria"];
    $mensagem = $_POST["mensagem"];

    $sqlCommand  = ' SELECT ';
    $sqlCommand .= ' * ';
    $sqlCommand .= ' FROM ';
    $sqlCommand .= ' portaldofornecedor.responsaveis_tecnicos ';
    $sqlCommand .= ' WHERE ';
    $sqlCommand .= ' email = "'. addslashes($email) .'"';

    $do->begin();
    $result = $do->execute($sqlCommand, "SELECT", "");
    $do->commit();
    $elements = $do->toJSON( $result );


    $emails = array("mateus.veiga@blueshift.com.br",
                    "thais.gomes@blueshift.com.br",
                    "fabio.freitas@blueshift.com.br",
                    "carlivan.silva@blueshift.com.br",
                    "caue.silva@blueshift.com.br",
                    "aline.sue@blueshift.com.br",
                    "igor.sampaio@blueshift.com.br",
                    "bruno.mateus@blueshift.com.br");         

    if(count($elements) < 1){
        $do->end();
        echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente digitar seu e-mail válido da Blueshift"}';
        exit;
    }else{

        foreach($emails as $key => $value){
            $mensagemHTML  = '<div style="font-family: Arial; max-width: 100%; width: 100%; margin: auto; background: #fafafa;">';
            $mensagemHTML .= '  <div style="max-width: 560px; width: auto; margin: auto; background: #fff; padding: 10px;">';
            $mensagemHTML .= '    <div style="text-align: center; border-bottom: solid 2px #3f3f3f; padding: 20px 10px;">';
            $mensagemHTML .= '        <img style="width: 240px; height: auto;" src="https://blueshift.com.br/files/img/bluelogo.png">';
            $mensagemHTML .= '    </div>';
            $mensagemHTML .= '  <div style="padding: 70px 20px; color: #3f3f3f">';
            $mensagemHTML .= '       <div style="color: #09b3f1; text-align: center; font-size: 15px;"><h2 style="margin-bottom: 30px; font-size: 21px;">Fale conosco</h2></div>';
            $mensagemHTML .= '      <p><b>Resumo da solicitação: </b></p>';
            $mensagemHTML .= '      <p><b>Nome: ' . $nome . '</b></p>';
            $mensagemHTML .= '      <p><b>Cnpj: ' . $usuario . '</b></p>';
            $mensagemHTML .= '      <p><b>Email: ' . $email . '</b></p>';
            $mensagemHTML .= '      <p><b>Categoria: ' . $categoria . '</b></p>';
            $mensagemHTML .= '      <p><b>Mensagem: ' . $mensagem . '</b></p>';
            $mensagemHTML .= '  </div>';
            $mensagemHTML .= '    <div style="padding: 25px 20px; background: #262626; text-align: center; font-size: 14px;">';
            $mensagemHTML .= '        <p style="margin:0; color: #fff;">Esse é um Email Automático. Favor <b>não</b> Responder.</p>';
            $mensagemHTML .= '        <p class="copyright" style="color: #fff; font-size: 12px; margin-top: 5px;">BlueShift | Todos os direitos reservados |' . $ano .  ' ©</p>';
            $mensagemHTML .= '    </div>';
            $mensagemHTML .= '  </div>';
            $mensagemHTML .= '</div>';

            $mail_service_parameter["id"] = "recuperacaoSenha";
            $mail_service_parameter["body"]     = "<body>". $mensagemHTML . "</body>";    
            $mail_service_parameter["text"]     = "";    
            $mail_service_parameter["from"]     = "contato.noreply@blueshift.com.br";
            $mail_service_parameter["fromName"] = "BlueShift - Fale Conosco";
            $mail_service_parameter["subject"]  = "Fale Conosco - " . $categoria;
            $mail_service_parameter["important"] = false;
            $mail_service_parameter["key"] = "3zHvP95KpKvo1S2n-1UvgQ";
            
            $mail_service = new MailService($mail_service_parameter);
            //$_POST["email"] = "sistema-adm@blueshift.com.br";    
            $_POST["email"] = $emails[$key];
            $_POST["nome"] = "Blueshift"; 
            $params = array("nome", "email");

            $metadado = $mail_service->addEmail($_POST, "email", $params);
            $postdata = $mail_service->geraJsonEnvio();                     
            $retorno = $mail_service->do_post_request_v2($postdata);
        }
        
        if(!$retorno){
            echo '{"success":false,"message":"Erro ao enviar o email"}';
            exit;         
        }else{
            echo '{"success":true, "message":"Sua solocitação foi enviada!"}';  
            exit;            
        }
    }
