<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
define('DEFAULT_DB', 'administrativo');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();
$usuarioSessao = $do->getUserSession();
$usuarioCodigo = $usuarioSessao['codigo'];

/* SELECT 
JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT('$[', n, '].tipo'))) AS tipo,
JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT('$[', n, '].banco'))) AS banco,
JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT('$[', n, '].conta'))) AS conta,
JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT('$[', n, '].agencia'))) AS agencia,
JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT('$[', n, '].documento'))) AS documento,
JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT('$[', n, '].bancoNumero'))) AS bancoNumero,
JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT('$[', n, '].digitoConta'))) AS digitoConta,
JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT('$[', n, '].beneficiario'))) AS beneficiario,
JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT('$[', n, '].digitoAgencia'))) AS digitoAgencia
FROM pessoa
CROSS JOIN (SELECT @n := @n + 1 AS n FROM pessoa, (SELECT @n := -1) r
WHERE JSON_EXTRACT(dadosBancarios, CONCAT('$[', @n + 1, '].tipo')) IS NOT NULL) nums
WHERE JSON_EXTRACT(dadosBancarios, CONCAT('$[', nums.n, '].tipo')) = 'PF'; */
$sqlCommand = ' SELECT ';
$sqlCommand .= '   JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT("$[", n, "].tipo"))) AS tipo, ';
$sqlCommand .= '   JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT("$[", n, "].banco"))) AS banco, ';
$sqlCommand .= '   JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT("$[", n, "].conta"))) AS conta, ';
$sqlCommand .= '   JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT("$[", n, "].agencia"))) AS agencia, ';
$sqlCommand .= '   JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT("$[", n, "].documento"))) AS documento, ';
$sqlCommand .= '   JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT("$[", n, "].bancoNumero"))) AS bancoNumero, ';
$sqlCommand .= '   JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT("$[", n, "].digitoConta"))) AS digitoConta, ';
$sqlCommand .= '   JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT("$[", n, "].beneficiario"))) AS beneficiario, ';
$sqlCommand .= '   JSON_UNQUOTE(JSON_EXTRACT(dadosBancarios, CONCAT("$[", n, "].digitoAgencia"))) AS digitoAgencia ';
$sqlCommand .= ' FROM ';
$sqlCommand .= '   pessoa ';
$sqlCommand .= ' CROSS JOIN ';
$sqlCommand .= '   (SELECT @n := @n + 1 AS n FROM pessoa, (SELECT @n := -1) r ';
$sqlCommand .= '     WHERE JSON_EXTRACT(dadosBancarios, CONCAT("$[", @n + 1, "].tipo")) IS NOT NULL) nums ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= '   JSON_EXTRACT(dadosBancarios, CONCAT("$[", nums.n, "].tipo")) = "PF" ';
$sqlCommand .= ' AND ';
$sqlCommand .= '   pessoa.codigo = ' . $usuarioCodigo;


$do->begin();
$result = $do->execute($sqlCommand, "SELECT", "");
$do->commit();

$elements = $do->toJSON($result);
if (count($elements) > 0) {
  echo '{"success":true,  "message": "listado com sucesso" , "elements": ' . json_encode($elements) . '}';
  exit;
} else {
  echo '{"success":false, "message": "Ocorreu um erro ao listar seus Projetos. Tente novamente ou entre em contato com o suporte"}';
  exit;
}