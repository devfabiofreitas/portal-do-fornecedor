<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
define('DEFAULT_DB', 'portaldofornecedor');


require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once('../../../../../lib/MailService/MailService.php');
require_once(DOFMW . '/Do.class.php');

$do->validarSessao();
$params = json_decode($_POST['params'], true);
$usuarioSessao = $do->getUserSession();
$usuarioCodigo = $usuarioSessao['codigo'];
$usuarioNome = $usuarioSessao['nome'];


$sqlCommand = ' SELECT ';
$sqlCommand .= ' rt.codigo, rtl.email as email, rtl.nome as nome';
$sqlCommand .= ' FROM ';
$sqlCommand .= ' responsaveis_tecnicos rt ';
$sqlCommand .= ' left join responsaveis_tecnicos rtl on rt.Lider_codigo = rtl.codigo ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= ' rt.codigo = ' . $usuarioCodigo . ' ';

$do->begin();
$report = $do->execute($sqlCommand, "SELECT", "");
$do->commit();
$elements = $do->toJSON($report);

$assunto = 'Reembolso';
$mensagemHTML .= 'Seu liderado ' . $usuarioNome . ', solicitou um reembolso pelo portal do fornecedor. Acesse o sistema administrativo para validar o pedido.';

$mail_service_parameter["id"] = "adm";
$mail_service_parameter["body"] = "<body>" . $mensagemHTML . "</body>";
$mail_service_parameter["text"] = "";
$mail_service_parameter["from"] = "contato.noreply@blueshift.com.br";
$mail_service_parameter["fromName"] = "Blueshift";
$mail_service_parameter["subject"] = $assunto;
$mail_service_parameter["important"] = false;
$mail_service_parameter["key"] = "3zHvP95KpKvo1S2n-1UvgQ";

$mail_service = new MailService($mail_service_parameter);

$emails = [$elements[0]["email"]];
$names = [$elements[0]["nome"]];

foreach ($emails as $key => $value) {
  $_POST["nome"] = $names[$key];
  $_POST["email"] = $value;
  $params = array("nome", "email");
  $metadado = $mail_service->addEmail($_POST, 'email', $params);
  $_POST["metadado"] = json_encode($mail_service->geraJsonIndividual($metadado));
}
$postdata = $mail_service->geraJsonEnvio();
$retorno = $mail_service->do_post_request_v2($postdata);

if (!$retorno) {
  echo '{"success":false,"message":"Erro ao enviar email."}';
  exit;
} else {

  echo '{"success":true,"message":"Email enviado com sucesso!"}';
  exit;
}