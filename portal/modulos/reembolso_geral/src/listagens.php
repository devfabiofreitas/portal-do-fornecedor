<?php
error_reporting(E_STRICT);
session_start();
require_once('../../../../properties.inc.php');
require_once('../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();
$dbparameterAdm = $DB_APPLICATION["administrativo"];

function listar_reembolsos_codigo_pedido(int $usuarioCodigo, int $codigo, DoFramwork $do): array
{
  $do->selectDBInstance('portaldofornecedor');

  $sqlCommand = ' SELECT ';
  $sqlCommand .= '   *, GROUP_CONCAT(p.caminho SEPARATOR ",") as Comprovantes ';
  $sqlCommand .= ' FROM ';
  $sqlCommand .= '   reembolso_geral rg';
  $sqlCommand .= ' LEFT JOIN comprovantes_reembolso_geral p ON p.Reembolso_Geral_Codigo = rg.codigo ';
  $sqlCommand .= ' WHERE ';
  $sqlCommand .= '   rg.Pedido_codigo = ' . $codigo;
  $sqlCommand .= ' AND ';
  $sqlCommand .= '   rg.Responsavel_codigo = ' . $usuarioCodigo;
  $sqlCommand .= ' GROUP By rg.codigo ';

  $do->begin();
  $result = $do->execute($sqlCommand, 'SELECT', '');
  $do->commit();
  $result_as_array = [];
  if (count($result) > 0) {
    $result_as_array = $do->toJSON($result);
  }
  return $result_as_array;
}
function listar_clientes_colaborador(int $usuarioCodigo, DoFramwork $do): array
{
  $do->selectDBInstance('administrativo');
  date_default_timezone_set('America/Sao_Paulo');

  $sqlCommand = ' SELECT ';
  $sqlCommand .= '     pp.codigo, c.nome as cliente, IFNULL(p.reembolso, "SIM") as reembolso, c.codigo as Cliente_codigo ';
  $sqlCommand .= '     from pessoa_projeto pp ';
  $sqlCommand .= ' LEFT JOIN projeto as p ';
  $sqlCommand .= '     ON pp.Projeto_codigo = p.codigo ';
  $sqlCommand .= ' LEFT JOIN cliente as c ';
  $sqlCommand .= '     ON p.Cliente_codigo = c.codigo ';
  $sqlCommand .= ' WHERE ';
  $sqlCommand .= '     p.situacao = "H"';
  $sqlCommand .= ' AND ';
  $sqlCommand .= '     pp.situacao = "H"';
  $sqlCommand .= ' AND ';
  $sqlCommand .= '    (pp.termino >= "' . "2023-03-04" . '" or pp.termino is null or pp.termino= "0000-00-00")';
  $sqlCommand .= ' AND ';
  $sqlCommand .= '    (pp.inicio <= "' . "2023-03-04" . '" or pp.inicio is null or pp.inicio= "0000-00-00")';
  $sqlCommand .= ' AND ';
  $sqlCommand .= '    pp.Pessoa_codigo = ' . $usuarioCodigo;

  $do->begin();
  $result = $do->execute($sqlCommand, 'SELECT', '');
  $do->commit();
  $result_as_array = [];
  if (count($result) > 0) {
    $result_as_array = $do->toJSON($result);
  }

  return $result_as_array;
}

function listar_pedidos_reembolso(int $usuarioCodigo, DoFramwork $do): array
{
  $sqlCommand = ' SELECT ';
  $sqlCommand .= '   codigo, valorTotal, status, dataCadastro ';
  $sqlCommand .= ' FROM ';
  $sqlCommand .= '   pedido_reembolso';
  $sqlCommand .= ' WHERE ';
  $sqlCommand .= '   Responsavel_codigo = ' . $usuarioCodigo;
  $sqlCommand .= ' ORDER BY dataCadastro DESC ';


  $do->begin();
  $result = $do->execute($sqlCommand, 'SELECT', '');
  $do->commit();
  $result_as_array = [];
  if (count($result) > 0) {
    $result_as_array = $do->toJSON($result);
  }

  return $result_as_array;
}

function listar_bancos(DoFramwork $do): array
{
  $do->selectDBInstance('administrativo');

  $sqlCommand = ' SELECT ';
  $sqlCommand .= '   * ';
  $sqlCommand .= ' FROM ';
  $sqlCommand .= '   tb_bancos';
  $sqlCommand .= ' WHERE ';
  $sqlCommand .= '   situacao = "H"';
  $sqlCommand .= ' ORDER BY ';
  $sqlCommand .= '   numero ';

  $do->begin();
  $result = $do->execute($sqlCommand, 'SELECT', '');
  $do->commit();
  $result_as_array = $do->toJSON($result);
  return $result_as_array;
}

function listarBancosUsuario(int $usuarioCodigo, DoFramwork $do): array
{
  $do->selectDBInstance('administrativo');

  $sqlCommand = ' SELECT ';
  $sqlCommand .= '   JSON_CONTAINS(dadosBancarios, "{"tipo": "PF"}") ';
  $sqlCommand .= ' FROM ';
  $sqlCommand .= '   pessoa';
  $sqlCommand .= ' WHERE ';
  $sqlCommand .= '   situacao = "H"';
  $sqlCommand .= ' AND ';
  $sqlCommand .= '   codigo = ' . $usuarioCodigo;

  $do->begin();
  $result = $do->execute($sqlCommand, 'SELECT', '');
  $do->commit();
  $result_as_array = $do->toJSON($result);
  return $result_as_array;
}