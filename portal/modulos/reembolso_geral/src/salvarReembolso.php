<?php
error_reporting(E_STRICT);
session_start();
require_once('../../../../properties.inc.php');
require_once('../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();
require("../../../php/utils.inc.php");


$tipoVeiculo = $_POST['tipoVeiculo'];
$tipoTransporte = $_POST['tipoTransporte'];
$tipoItem = $_POST['tipoItem'];
$valor = $_POST['valor'];

$descritivo = $_POST['descritivo'];

$quilometrosRodados = $_POST['quilometrosRodados'];
if ($quilometrosRodados == "") {
  $quilometrosRodados = 0.0;
}
$tipoRefeicao = $_POST['tipoRefeicao'];

$valorCombustivel = $_POST['valorCombustivel'];
if ($valorCombustivel == "") {
  $valorCombustivel = 0;
}

$estacionamento = $_POST['estacionamento'];
if ($estacionamento == "") {
  $estacionamento = 'NAO';
}


$qtdEstacionamento = $_POST['qtdEstacionamento'];
if ($qtdEstacionamento == "") {
  $qtdEstacionamento = 0;
}


$valorEstacionamento = $_POST['valorEstacionamento'];
if ($valorEstacionamento == "") {
  $valorEstacionamento = 0;
}


$pedagio = $_POST['pedagio'];
if ($pedagio == "") {
  $pedagio = 'NAO';
}


$qtdPedagio = $_POST['qtdPedagio'];
if ($qtdPedagio == "") {
  $qtdPedagio = 0;
}


$valorPedagio = $_POST['valorPedagio'];
if ($valorPedagio == "") {
  $valorPedagio = 0;
}

$cliente = $_POST['cliente'];
$cliente_codigo = $_POST['Cliente_codigo'];



$observacao = $_POST['observacao'];


$dataInicial = $_POST['dataInicial'];


$dataFinal = $_POST['dataFinal'];

$dataInicialViagem = $_POST['dataInicialViagem'];
if ($dataInicialViagem == "") {
  $dataInicialViagem = "";
}

$dataFinalViagem = $_POST['dataFinalViagem'];
if ($dataFinalViagem == "") {
  $dataFinalViagem = "";
}

$descritivoOutros = $_POST['descritivoOutros'];
if ($descritivoOutros == "") {
  $descritivoOutros = "";
}

$centroCusto = $_POST['centroCusto'];
if ($centroCusto == "") {
  $centroCusto = "";
}





$contador = count($_SESSION['Reembolso']);
$reembolso = array(
  'id' => $contador,
  'tipoItem' => $tipoItem,
  'valor' => $valor,
  'tipoVeiculo' => $tipoVeiculo,
  'tipoTransporte' => $tipoTransporte,
  'quilometrosRodados' => $quilometrosRodados,
  'valorCombustivel' => $valorCombustivel,
  'estacionamento' => $estacionamento,
  'valorEstacionamento' => $valorEstacionamento,
  'qtdEstacionamento' => $qtdEstacionamento,
  'pedagio' => $pedagio,
  'cliente' => $cliente,
  'qtdPedagio' => $qtdPedagio,
  'valorPedagio' => $valorPedagio,
  'observacao' => $observacao,
  'descritivo' => $descritivo,
  'dataInicial' => $dataInicial,
  'dataFinal' => $dataFinal,
  'dataInicialViagem' => $dataInicialViagem,
  'dataFinalViagem' => $dataFinalViagem,
  'descritivoOutros' => $descritivoOutros,
  'cliente_codigo' => $cliente_codigo,
  'arquivos' => salvar_comprovantes($_FILES['files']),
  'tipoRefeicao' => $tipoRefeicao,
  'centroCusto' => $centroCusto
);


if (!isset($_SESSION['Reembolso'])) {
  $_SESSION['Reembolso'] = array();
}

array_push($_SESSION['Reembolso'], $reembolso);

$response = array(
  'success' => true,
  'data' => $_SESSION['Reembolso']
);

echo json_encode($response);

function criar_nome_unico_anexos(array $file_data, string $caminho_relativo): array
{
  $timestamp = uniqid();
  $prefix = $timestamp;
  $nomes_unicos = [];
  for ($i = 0; $i < count($file_data['name']); $i++) {
    $file_info = pathinfo($file_data['name'][$i]);
    $nome_arquivo_unico = "$prefix." . $file_info['extension'];
    $nomes_unicos[] = [
      'nome_destino' => $nome_arquivo_unico,
      'nome_original' => $file_info['basename'],
      'caminho_relativo' => $caminho_relativo . $nome_arquivo_unico,
      'temp_name' => $file_data['tmp_name'][$i]
    ];
  }
  return $nomes_unicos;
}

function salvar_comprovantes($arquivos)
{
  $nomes_unicos_anexos = criar_nome_unico_anexos($arquivos, 'notas_reembolso_geral' . ROOT_BAR);
  foreach ($nomes_unicos_anexos as $f) {
    $caminho_r = ROOT_INTERNETFILES . 'notas_reembolso_geral' . ROOT_BAR;
    if (!salvar_arquivo_em_disco($f['temp_name'], $caminho_r, $f['nome_destino'])) {
    }
  }

  return $nomes_unicos_anexos;
}