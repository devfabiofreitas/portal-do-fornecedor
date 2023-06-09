<?php
error_reporting(E_STRICT);
session_start();
require_once('../../../../properties.inc.php');
require_once('../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
require_once("../../../php/utils.inc.php");
$do->validarSessao();
$usuarioSessao = $do->getUserSession();
$usuarioNome = $usuarioSessao['nome'];
$codigoResponsavel = $usuarioSessao['codigo'];

if (isset($_SESSION['Reembolso']) && isset($_POST['action'])) {
  $reembolsos = $_SESSION['Reembolso'];
  $valorTotal = valor_total_pedido();

  $bancoNumero = $_POST['bancoNumero'];
  $banco = $_POST['banco'];
  $agencia = $_POST['agencia'];
  $agenciaDigito = (int) $_POST['agenciaDigito'];
  $conta = $_POST['conta'];
  $contaDigito = (int) $_POST['contaDigito'];

  $query = "INSERT INTO pedido_reembolso (Responsavel_codigo, valorTotal, status, termoAceito, dataCadastro, banco, bancoNumero, agencia, agenciaDigito, conta, contaDigito) 
                                  values ($codigoResponsavel,$valorTotal, 'E', 'S', dataHoraAtual(), '$banco', $bancoNumero, '$agencia', $agenciaDigito, '$conta', $contaDigito)";
  $do->begin();
  $result = $do->execute($query, 'INSERT', '');
  $do->commit();
  $res = array("codigo" => $do->last_inserted_id);
  $res = $res['codigo'];

  foreach ($reembolsos as $reembolso) {
    $tipo = $reembolso['tipoItem'];
    $valor = to_float($reembolso['valor']);
    $quilometrosRodados = to_float($reembolso['quilometrosRodados']);
    $cliente = $reembolso['cliente'];
    $cliente_codigo = $reembolso['cliente_codigo'];
    $valorCombustivel = to_float($reembolso['valorCombustivel']);
    $valorPedagio = to_float($reembolso['valorPedagio']);
    $valorEstacionamento = to_float($reembolso['valorEstacionamento']);
    $observacao = $reembolso['observacao'];
    $pedagio = $reembolso['pedagio'];
    $estacionamento = $reembolso['estacionamento'];
    $qtdEstacionamento = $reembolso['qtdEstacionamento'];
    $qtdPedagio = $reembolso['qtdPedagio'];
    $tipoTransporte = $reembolso['tipoTransporte'];
    $tipoVeiculo = $reembolso['tipoVeiculo'];
    $descritivo = $reembolso['descritivo'];
    $tipoRefeicao = $reembolso['tipoRefeicao'];
    $dataInicial = implode('-', array_reverse(explode('/', $reembolso['dataInicial'])));

    if ($reembolso['dataInicialViagem'] != '' && $reembolso['dataFinalViagem'] != '') {
      $dataInicialViagem = implode('-', array_reverse(explode('/', $reembolso['dataInicialViagem'])));
      $dataFinalViagem = implode('-', array_reverse(explode('/', $reembolso['dataFinalViagem'])));
    } else {
      $dataInicialViagem = null;
      $dataFinalViagem = null;
    }


    $descritivoOutros = $reembolso['descritivoOutros'];
    $centroCusto = $reembolso['centroCusto'];
    if ($dataFinalViagem && $dataInicialViagem) {
      $query = "INSERT INTO 
      reembolso_geral (Responsavel_codigo,Pedido_codigo, tipo, valor, quilometrosRodados, valorCombustivel, estacionamento, qtdEstacionamento, valorEstacionamento, pedagio, qtdPedagio, valorPedagio, observacao, tipoTransporte, tipoVeiculo, descritivo, dataInicial, tipoRefeicao, cliente, Cliente_codigo, dataInicialViagem, dataFinalViagem, descritivoOutros, centroCusto) 
               VALUES ($codigoResponsavel, $res, '$tipo', $valor, $quilometrosRodados, $valorCombustivel, '$estacionamento', $qtdEstacionamento, $valorEstacionamento,'$pedagio', $qtdPedagio, $valorPedagio, '$observacao', '$tipoTransporte', '$tipoVeiculo', '$descritivo', '$dataInicial', '$tipoRefeicao', '$cliente', '$cliente_codigo', '$dataInicialViagem', '$dataFinalViagem', '$descritivoOutros', '$centroCusto')";

    } else {
      $query = "INSERT INTO 
      reembolso_geral (Responsavel_codigo,Pedido_codigo, tipo, valor, quilometrosRodados, valorCombustivel, estacionamento, qtdEstacionamento, valorEstacionamento, pedagio, qtdPedagio, valorPedagio, observacao, tipoTransporte, tipoVeiculo, descritivo, dataInicial, tipoRefeicao, cliente, Cliente_codigo, descritivoOutros, centroCusto) 
               VALUES ($codigoResponsavel, $res, '$tipo', $valor, $quilometrosRodados, $valorCombustivel, '$estacionamento', $qtdEstacionamento, $valorEstacionamento,'$pedagio', $qtdPedagio, $valorPedagio, '$observacao', '$tipoTransporte', '$tipoVeiculo', '$descritivo', '$dataInicial', '$tipoRefeicao', '$cliente', '$cliente_codigo', '$descritivoOutros', '$centroCusto')";

    }
    $do->begin();
    $result = $do->execute($query, 'INSERT', '');
    $do->commit();
    $codigo_reembolso = array("codigo" => $do->last_inserted_id);
    $codigo_reembolso = $codigo_reembolso['codigo'];
    salvar_comprovantes($reembolso['arquivos'], $do, $codigo_reembolso);
  }

  unset($_SESSION['Reembolso']);
  header("Location: ../fragment/reembolso_geral.frag.php?menu=reembolso_geral");
} else {
  if (!isset($_SESSION['Reembolso'])) {
    $menssagem_erro = "Por favor cadastre ao menos um reembolso para finalizar o pedido";
  }

  header("Location: ../fragment/reembolso_pedido.frag.php?menu=reembolso_geral&menssagem-erro=$menssagem_erro");
}


function salvar_comprovantes($nomes_unicos_anexos, $do, $codigo_reembolso_geral)
{
  foreach ($nomes_unicos_anexos as $f) {
    $caminho_relativo = $f['caminho_relativo'];
    $query = "INSERT INTO comprovantes_reembolso_geral (Reembolso_Geral_Codigo, caminho) values ($codigo_reembolso_geral, '$caminho_relativo')";
    $do->begin();
    $result = $do->execute($query, 'INSERT', '');
    $do->commit();
  }
}

function valor_total_pedido()
{
  $reembolsos = $_SESSION['Reembolso'];
  $soma = 0;
  foreach ($reembolsos as $reembolso) {
    $soma += to_float($reembolso['valor']);
  }

  return to_float($soma);
}