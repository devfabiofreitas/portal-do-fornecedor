<?php
session_start();
require_once('../../../../properties.inc.php');
require_once('../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();



function valor_total_pedido()
{
  $reembolsos = $_SESSION['Reembolso'];
  $soma = 0;
  foreach ($reembolsos as $reembolso) {
    $soma += tofloat($reembolso['valor']);
  }

  return tofloat($soma);
}

function apagar_reembolso($id)
{
  foreach ($_SESSION['Reembolso'] as $chave => $reembolso) {
    if ($reembolso['id'] == $id) {
      unset($_SESSION['Reembolso'][$chave]);
      break;
    }
  }
}

function tofloat($num)
{
  $dotPos = strrpos($num, '.');
  $commaPos = strrpos($num, ',');
  $sep = (($dotPos > $commaPos) && $dotPos) ? $dotPos : ((($commaPos > $dotPos) && $commaPos) ? $commaPos : false);

  if (!$sep) {
    return floatval(preg_replace("/[^0-9]/", "", $num));
  }

  return floatval(
    preg_replace("/[^0-9]/", "", substr($num, 0, $sep)) . '.' .
      preg_replace("/[^0-9]/", "", substr($num, $sep + 1, strlen($num)))
  );
}

function change_instance_db($instancia, $do): void
{
  $dbparameter = $instancia;
  $server = $dbparameter["server"];
  $instanceMySql = mysqli_connect($server, $dbparameter["user"], $dbparameter["password"], $dbparameter["name"]);
  if (!$instanceMySql) {
    echo '{"success":false, "message": "Não foi possível estabelecer uma conexão com o gerenciador MySQL.", "Debugging errno":"' . mysqli_connect_errno() . '", "Debugging error": ' . json_encode(utf8_encode(mysqli_connect_error()), JSON_UNESCAPED_SLASHES)  . '}';
    exit;
  }
  $dbparameter["instance"] = $instanceMySql;
  $do->setInstanceDB("administrativo", $dbparameter);
  $do->instance = $dbparameter;
}

function salvar_arquivo_em_disco(string $caminho_origem, string $diretorio_destino, string $nome_destino): bool
{
  if (!move_uploaded_file($caminho_origem, $diretorio_destino . $nome_destino)) {
    return false;
  }
  return true;
}
