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

$params = json_decode($_POST['params'], true);
$usuarioSessao = $do->getUserSession();
$usuarioCodigo = $usuarioSessao['codigo'];
$sqlCommand  =  ' SELECT ';
$sqlCommand  .= '     pp.codigo, p.nome as projeto, c.nomeFantasia as cliente, c.codigo as Cliente_codigo, JSON_UNQUOTE(JSON_EXTRACT(p.dadosFaturamento, "$[0].faturavel")) AS faturavel, p.codigo as Projeto_codigo ';
$sqlCommand  .= '     from pessoa_projeto pp ';
$sqlCommand  .= ' LEFT JOIN projeto as p ';
$sqlCommand  .= '     ON pp.Projeto_codigo = p.codigo ';
$sqlCommand  .= ' LEFT JOIN cliente c ';
$sqlCommand  .= '     ON p.Cliente_codigo = c.codigo';
$sqlCommand  .= ' WHERE ';
$sqlCommand  .= '     p.situacao = "H"';
$sqlCommand  .= ' AND ';
$sqlCommand  .= '     pp.situacao = "H"';
$sqlCommand  .= ' AND ';
$sqlCommand  .= '    (pp.termino >= "' . $do->prepareDataToSQLQuery("r", $params['Start_Date']) . '" or pp.termino is null or pp.termino= "0000-00-00")';
$sqlCommand  .= ' AND ';
$sqlCommand  .= '    (pp.inicio <= "' . $do->prepareDataToSQLQuery("r", $params['Start_Date']) . '" or pp.inicio is null or pp.inicio= "0000-00-00")';
$sqlCommand  .= ' AND ';
$sqlCommand  .= '    pp.Pessoa_codigo = ' . $usuarioCodigo;


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
