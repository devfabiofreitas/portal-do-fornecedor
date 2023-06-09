<?php
error_reporting(E_STRICT);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();
$usuarioSessao = $do->getUserSession();
$usuarioNome = $usuarioSessao['nome'];
$codigo = $usuarioSessao['codigo'];
$usuarioCpf = $usuarioSessao['cpf'];
$params = json_decode($_POST['params'], true);

$caminho = salvarNotaFiscal();

$sqlCommand  = ' INSERT INTO reembolso (Responsavel_codigo, item, tipoItem, bancoNumero, cpf, banco, agencia, agenciaDigito, conta, contaDigito, caminhoNota, status, termoAceito, dataCadastro ) ';
$sqlCommand .= ' VALUES ';
$sqlCommand .= ' ( ';
$sqlCommand .= '\'' . addslashes($codigo) . '\', ';
$sqlCommand .= '\'' . addslashes($params['item']) . '\', ';
$sqlCommand .= '\'' . addslashes($params['tipoItem']) . '\', ';
$sqlCommand .= '\'' . addslashes($params['bancoNumero']) . '\', ';
$sqlCommand .= '\'' . addslashes($usuarioCpf) . '\', ';
$sqlCommand .= '\'' . addslashes(utf8_decode($params['banco'])) . '\', ';
$sqlCommand .= '\'' . addslashes($params['agencia']) . '\', ';
$sqlCommand .= '\'' . addslashes($params['agenciaDigito']) . '\', ';
$sqlCommand .= '\'' . addslashes($params['conta']) . '\', ';
$sqlCommand .= '\'' . addslashes($params['contaDigito']) . '\', ';
$sqlCommand .= '\'' . addslashes(utf8_decode($caminho)) . '\', ';
$sqlCommand .= '\'' . addslashes('E') . '\', ';
$sqlCommand .= '\'' . addslashes('S') . '\', ';
$sqlCommand .= '     dataHoraAtual()     ';

$sqlCommand .= ')';

$do->begin();
$result = $do->execute($sqlCommand, "INSERT", "");
$do->commit();

if ($result) {
  echo '{"success":true, "message": "cadastrado com sucesso!"}';
  exit;
} else {
  echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
  exit;
}

function salvarNotaFiscal()
{
  $caminhoNotaReembolso = $GLOBALS['caminhoNotaReembolso'];
  $elements = "";
  $infoFiles = json_decode($_POST['infoFiles'], true);
  foreach ($_FILES as $key => $value) {
    for ($i = 0; $i < count($value['name']); $i++) {
      $caminho = ROOT_INTERNETFILES . $infoFiles[$i]['caminho'];
      $caminhoNotaFiscal = $infoFiles[$i]['caminho'];

      if (!file_exists($caminho)) {
        mkdir($caminho, 0777, true);
      }

      $nome = basename(strtolower(str_replace(' ', '', $value['name'][$i])));
      $expl = explode('.', $nome);
      $ext = end($expl);

      if ($ext != "pdf") {
        echo '{"success":false, "message": "Apenas arquivos .pdf podem ser anexados. Tente novamente com outro arquivo ou entre em contato com o suporte."}';
        exit;
        return 0;
      }

      $nomeFormatado = time() . '.' . $ext;

      if (!isset($value['name'][$i]) || !$value['size'][$i] > 0) {
        $elements = '{"success": false, "file": "' . $value['name'][$i] . '", "message": "Arquivo não encontrado."}';
        return $elements;
      } else {
        if (!is_uploaded_file($value['tmp_name'][$i])) {
          $elements = '{"success": false, "file": "' . $value['name'][$i] . '", "message": "Arquivo não enviado."}';
          return $elements;
        } else {
          $novoNome = $caminhoNotaFiscal . $nomeFormatado;
          $arquivo = $caminho . $nomeFormatado;

          if (!move_uploaded_file($value['tmp_name'][$i], $arquivo)) {
            $elements = '{"success": false, "file": "' . $value['name'][$i] . '", "message": "Arquivo não copiado"}';
            return $elements;
          } else {
            $elements = '{"success": true, "file": "' . $value['name'][$i] . '", "newFile": "' . $novoNome . '"}';
          }
        }
      }
      $caminhoNotaReembolso = $novoNome;
    }
  }
  return  $caminhoNotaReembolso;
}
