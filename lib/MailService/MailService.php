<?php
    require_once 'mandrill-api-php/src/Mandrill.php'; //Not required with Composer
    
    class MailService{

        public $key;
        public $id;
        public $body;
        public $text;
        public $from;
        public $fromName;
        public $important;
        public $subject;
        public $tracking_domain;
        public $signing_domain;
        public $return_path_domain;
        public $tags;
        public $subaccount;
        public $headers;
        public $params;
        public $emails;
        public $images;
        public $attachments;

        function __construct($parameters){
            $this->key = $parameters["key"];
            $this->id = $parameters["id"];
            $this->body = $parameters["body"];
            $this->text = $parameters["text"];
            $this->from = $parameters["from"];
            $this->fromName = $parameters["fromName"];
            $this->important = $parameters["important"];
            $this->subject = $parameters["subject"];
            $this->tracking_domain = $parameters["tracking_domain"];
            $this->signing_domain = $parameters["signing_domain"];
            $this->return_path_domain = $parameters["return_path_domain"];
            $this->tags = $parameters["tags"];
            $this->subaccount = $parameters["subaccount"];
            $this->headers = array();
            $this->params = array();
            $this->emails = array();
            $this->images = array();
            $this->attachments = array();
        }


        /*
        * @author				: Juliano Zinni
        * @description			: Metodo responsavel por adicionar novo item de email para o disparo de notificacao
        * @params				: $dataObject array() => array que contem todos os dados da requisicao
                                $idNotification string => parametro string que define o campo identificador chave do email
                                $params array() => array de parametros com a identificacao dos parametros a serem considerados no envio do email
        * @return				: Retorna um objeto contendo os dados e parametro do email que acabou de ser inserido 
        */
        function addEmail($dataObject, $idNotification, $params){
            $atributos["params"] = array();

            foreach ($dataObject as $key => $value){
                // exit;
                if($key == $idNotification){
                    $atributos["id"] = str_replace("'", "", utf8_encode($value));
                }

                if (in_array($key, $params)) {

                    $tempObj["id"] = $key;
                    $tempObj["value"] = str_replace("'", "", utf8_encode($value));

                    if($key == "nome"){
                        $atributos["name"] = str_replace("'", "", utf8_encode($value));
                    }

                    array_push($atributos["params"], $tempObj);
                }
            } 

            array_push($this->emails, $atributos);
            // var_dump($atributos);

            return $atributos;
        } 

        /*
        * @author				: Juliano Zinni
        * @description			: Metodo responsavel por adicionar novo objeto no atributo params
        * @params				: $id string => valor string que contem o identificador do novo atributo
                                $value string => valor para o identificador setado no campo id
        */
        function addParam($id, $value){
            $object["id"] = $id;
            $object["value"] = $value;
            array_push($this->params, $object);
        }
        /*
        * @author				: Juliano Zinni
        * @description			: Metodo responsavel por adicionar novo objeto no atributo params
        * @params				: $id string => valor string que contem o identificador do novo atributo
                                $value string => valor para o identificador setado no campo id
        */
        function addHeader($id, $value){
            $object["id"] = $id;
            $object["value"] = $value;
            array_push($this->params, $object);
        }

        /*
        * @author				: Ysabelle Sousa
        * @description			: Metodo responsavel por retornar um objeto no atributo params
        * @params				: $id string => valor string que contem o identificador do atributo a ser buscado
                    
        */
        function getParam($id){
            
            foreach ($this->params as $key => $value){
                
                if($this->params[$key]["id"] == $id){

                    return $this->params[$key]["value"];
                }
            }	
        }


        /*
        * @author				: Juliano Zinni
        * @description			: Metodo responsavel por gerar objeto completo e individualizado de envio para registro na tabelad e notificacao
        * @params				: $objectEmail array() => objeto array que contem os dados indidualizados de um determinado disparo(email)
        * @return				: Retorna objeto final para disparo individual. No conexto atual serve para armazenar JSON no log(metadado) 
        */
        function geraJsonIndividual($objectEmail){
            $mail_notification["key"] = $this->key;
            $mail_notification["id"] = $this->id;
            $mail_notification["body"] = $this->body;
            $mail_notification["text"] = $this->text;
            $mail_notification["from"] = $this->from;
            $mail_notification["fromName"] = $this->fromName;
            $mail_notification["important"] = $this->important;
            $mail_notification["subject"] = $this->subject;
            $mail_notification["tracking_domain"] = $this->tracking_domain;
            $mail_notification["signing_domain"] = $this->signing_domain;
            $mail_notification["return_path_domain"] = $this->return_path_domain;
            $mail_notification["tags"] = $this->tags;
            $mail_notification["subaccount"] = $this->subaccount;
            $mail_notification["headers"] = $this->headers;
            $mail_notification["params"] = $this->params;
            $mail_notification["emails"] = array($objectEmail);
            $mail_notification["images"] = $this->images;
            $mail_notification["attachments"] = $this->attachments;

            $mail_notification_general["msg"] = $mail_notification;

            return $mail_notification_general;
        }

        /*
        * @author				: Juliano Zinni
        * @description			: Metodo responsavel por gerar objeto completo com todos os disparos(emails) a serem efetuados
        * @return				: Retorna objeto final para disparo completo. 
        */
        function geraJsonEnvio(){
            $mail_notification["key"] = $this->key;
            $mail_notification["id"] = $this->id;
            $mail_notification["body"] = $this->body;
            $mail_notification["text"] = $this->text;
            $mail_notification["from"] = $this->from;
            $mail_notification["fromName"] = $this->fromName;
            $mail_notification["important"] = $this->important;
            $mail_notification["subject"] = $this->subject;
            $mail_notification["tracking_domain"] = $this->tracking_domain;
            $mail_notification["signing_domain"] = $this->signing_domain;
            $mail_notification["return_path_domain"] = $this->return_path_domain;
            $mail_notification["tags"] = $this->tags;
            $mail_notification["subaccount"] = $this->subaccount;
            $mail_notification["headers"] = $this->headers;
            $mail_notification["params"] = $this->params;
            $mail_notification["emails"] = $this->emails;
            $mail_notification["images"] = $this->images;
            $mail_notification["attachments"] = $this->attachments;

            $mail_notification_general["msg"] = $mail_notification;

            return $mail_notification_general;
        }

        /*
        * @author				: Paloma Soares
        * @description			: Metodo responsavel por gerar objeto contendo imagens no corpo do email
        * @params				: $type string => variavel que contém a extensao da imagem ex.: image/jpg
                                  $name string => nome do arquivo
                                  $base64 string => base 64 do arquivo   
        * @return				: Retorna objeto final para disparo individual. No conexto atual serve para armazenar JSON no log(metadado) 
        */
        function addImage($type, $name, $base64){
            $obj_img = [];
            $obj_img["type"] = $type;
            $obj_img["name"] = $name;
            $obj_img["content"] = $base64;
            
            array_push($this->images, $obj_img);
        }
        /*
        * @author				: Paloma Soares
        * @description			: Metodo responsavel por gerar objeto contendo anexos do email
        * @params				: $type string => variavel que contém a extensao do arquivo ex.: text/plain
                                  $name string => nome_do_arquivo.txt
                                  $base64 string => base 64 do arquivo   
        * @return				: Retorna objeto final para disparo individual. No conexto atual serve para armazenar JSON no log(metadado) 
        */
        function addAttachments($type, $name, $base64){
            $obj_att = [];
            $obj_att["type"] = $type;
            $obj_att["name"] = $name;
            $obj_att["content"] = $base64;
            array_push($this->attachments, $obj_att);
        }

        function do_post_request_v2($postdata){

            $emails = array();
            $vars = array();
            
            foreach($postdata['msg']['emails'] as $contato) {
                $email = [];
                $email['email'] = $contato['id'];
                $email['name'] = $contato['name'];
                $email['type'] = 'to';
                array_push($emails, $email);

                $var = [];
                $var['rcpt'] = $contato['id'];
                $var['vars'] = array();
                foreach($contato['params'] as $index => $data) {
                    $var['vars'][$index]['name'] = $data['id'];
                    $var['vars'][$index]['content'] = $data['value'];
                }
                array_push($vars, $var);
            }

            $global_vars = array();

            foreach($postdata['msg']['params'] as $param) {
                $global_var = [];
                $global_var['name'] = $param['id'];
                $global_var['content'] = $param['value'];
                array_push($global_vars, $global_var);
            }
            
            try {
                $mandrill = new Mandrill($postdata['msg']['key']);
                $message = array(
                    'html' => $postdata['msg']['body'],
                    'text' => $postdata['msg']['text'],
                    'subject' => $postdata['msg']['subject'],
                    'from_email' => $postdata['msg']['from'],
                    'from_name' => $postdata['msg']['fromName'],
                    'to' => $emails,
                    'headers' => $postdata['msg']['headers'],
                    'important' => $postdata['msg']['important'],
                    'track_opens' => true,
                    'track_clicks' => true,
                    'auto_text' => null,
                    'auto_html' => null,
                    'inline_css' => true,
                    'url_strip_qs' => false,
                    'preserve_recipients' => false,
                    'view_content_link' => true,
                    'bcc_address' => null,
                    'tracking_domain' => $postdata['msg']['tracking_domain'],
                    'signing_domain' => $postdata['msg']['signing_domain'],
                    'return_path_domain' => $postdata['msg']['return_path_domain'],
                    'merge' => true,
                    'merge_language' => 'handlebars',
                    'global_merge_vars' => $global_vars,
                    'merge_vars' => $vars,
                    'tags' => $postdata['msg']['tags'],
                    'subaccount' => $postdata['msg']['subaccount'],
                    'google_analytics_domains' => null,
                    'google_analytics_campaign' => null,
                    'metadata' => null,
                    'recipient_metadata' => null,
                    'attachments' => $postdata['msg']['attachments'],
                    'images' => $postdata['msg']['images'],
                );

            //    var_dump($message);
                
                $async = false;
                $ip_pool = '';
                $send_at = date();
                $result = $mandrill->messages->send($message, $async, $ip_pool, $send_at);
                // echo json_encode($result);
                return $result;

            } catch(Mandrill_Error $e) {
                // Mandrill errors are thrown as exceptions
                echo $e;
                // A mandrill error occurred: Mandrill_Invalid_Key - Invalid API key
                throw $e;
            }
        }

        // Função depreciada desde maio de 2019
        function do_post_request($postdata){
 
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "http://demo.pharmaviews.com.br/mandrill/");
            // curl_setopt($ch, CURLOPT_URL, "http://www.blueshift.com.br/mandrill/");
            // curl_setopt($ch, CURLOPT_URL, "http://138.68.30.0:8000/send/");
            // curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
             curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'X-APPLICATION-TOKEN: docontrol789'));
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($ch, CURLOPT_POST, 1);
     
     
            curl_setopt($ch, CURLOPT_POSTFIELDS,$postdata);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $response  = curl_exec($ch);
     
            $retorno_decode = json_decode($response, true);
            curl_close($ch);
     
            // var_dump($response);
     
            return $retorno_decode;
        }

        function testeDau() {
            // try {
            //     $mandrill = new Mandrill('3zHvP95KpKvo1S2n-1UvgQ');
            //     $result = $mandrill->urls->trackingDomains();
            //     // $domain = 'docontrol.com.br';
            //     // $domain = 'docontrolti.com.br';
            //     // $result = $mandrill->urls->addTrackingDomain($domain);
            //     return $result;
            // } catch(Mandrill_Error $e) {
            //     // Mandrill errors are thrown as exceptions
            //     echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
            //     // A mandrill error occurred: Mandrill_Invalid_Key - Invalid API key
            //     throw $e;
            // }

            // try {
            //     $mandrill = new Mandrill('3zHvP95KpKvo1S2n-1UvgQ');
            //     $query = 'sender:paloma.soares@docontrol.com.br';
            //     // $query = 'email:docontrolti.com.br';
            //     // $query = 'email:caieiras.sp.gov.br';
            //     $date_from = '';
            //     $date_to = '';
            //     $tags = array();
            //     $date_from = '2019-11-22';
            //     $date_to = '2019-11-22';
            //     // $tags = array(
            //     //     'password-reset',
            //     //     'welcome'
            //     // );
            //     // $senders = array('caieirasinforma@caieiras.sp.gov.br');
            //     $senders = array('paloma.soares@docontrol.com.br');
            //     $api_keys = array('3zHvP95KpKvo1S2n-1UvgQ');
            //     $limit = 50;
            //     $result = $mandrill->messages->search($query, $date_from, $date_to, $tags, $senders, $api_keys, $limit);
            //     return $result;
            // } catch(Mandrill_Error $e) {
            //     echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
            //     throw $e;
            // }
        }
    }
?>