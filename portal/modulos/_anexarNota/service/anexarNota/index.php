<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
require_once('conecta.php');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();
$usuarioSessao = $do->getUserSession();
$usuarioNome = $usuarioSessao['nome'];
$codigo = $usuarioSessao['codigo'];
$params = json_decode($_POST['params'], true);
$ano = date('Y');
$mes = date('m') - 1;

$cnpj = $params['cnpj'];

function tirarCaracteresEspeciais($cnpj)
{
    $cnpj = str_replace('/', '', $cnpj);
    $cnpj = str_replace('-', '', $cnpj);
    $cnpj = str_replace('.', '', $cnpj);
    return $cnpj;
}

$cnpjFormatado = tirarCaracteresEspeciais($cnpj);

$sqlCommand  = ' SELECT COUNT(caminho) AS total ';
$sqlCommand .= ' FROM ';
$sqlCommand .= ' notas_fiscais ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= ' caminho LIKE "%' . $ano . "/" . $params['mes'] . "/" . $cnpjFormatado . '%"; ';

$do->begin();
$result = $conectaPortal->query($sqlCommand) or die("FALHA" . $conectaPortal->error);
$do->commit();
$elements = $do->toJSON($result);

$total = json_decode($elements[0]['total']);

$sqlCommand  = ' SELECT codigo ';
$sqlCommand .= ' FROM ';
$sqlCommand .= ' empresas ';
$sqlCommand .= ' WHERE ';
$sqlCommand .= ' cnpj = "' . $params['cnpj'] . '" ';

$do->begin();
$result = $conectaPortal->query($sqlCommand) or die("FALHA" . $conectaPortal->error);
$do->commit();
$elements = $do->toJSON($result);

$Empresa_codigo = json_decode($elements[0]['codigo']);

$caminho = salvarImagem($cnpjFormatado, $total);

if ($caminho) {
    $sqlCommand  = ' INSERT INTO notas_fiscais (Empresa_codigo, caminho, cliente_projeto, periodoInicio, periodoFim, valor, horasRealizadas, dataCadastro, mesReferencia, usuarioCadastro, atraso, nomeOriginal, dataEmissao, codigoServico, impostoRetido, numeroNota) ';
    $sqlCommand .= ' VALUES ';
    $sqlCommand .= ' ( ';
    $sqlCommand .= '\'' . addslashes($Empresa_codigo) . '\', ';
    $sqlCommand .= '\'' . addslashes($caminho) . '\', ';
    $sqlCommand .= '\'' . addslashes(utf8_decode($params['clienteProjeto'])) . '\', ';
    $sqlCommand .= '\'' . addslashes($params['periodoInicio']) . '\', ';
    $sqlCommand .= '\'' . addslashes($params['periodoFim']) . '\', ';
    $sqlCommand .= '\'' . addslashes($params['valor']) . '\', ';
    $sqlCommand .= '\'' . addslashes($params['totalHorasRealiazadas']) . '\', ';
    $sqlCommand .= ' dataHoraAtual(), ';
    $sqlCommand .= '\'' . addslashes($params['mesReferencia']) . '\', ';
    $sqlCommand .= '\'' . addslashes($codigo) . '\', ';
    $sqlCommand .= '\'' . addslashes($params['atraso']) . '\', ';
    $sqlCommand .= '\'' . addslashes(utf8_decode($params['nomeOriginal'])) . '\', ';
    $sqlCommand .= '\'' . addslashes($params['dataEmissao']) . '\', ';
    $sqlCommand .= '\'' . addslashes($params['codigoServico']) . '\', ';
    $sqlCommand .= '\'' . addslashes($params['impostoRetido']) . '\', ';
    $sqlCommand .= '\'' . addslashes($params['numeroNota']) . '\' ';
    $sqlCommand .= '); ';

    $do->begin();
    $result = $conectaPortal->query($sqlCommand) or die("FALHA " . $conectaPortal->error);
    $codigoPortal = mysqli_insert_id($conectaPortal);
    $do->commit();

    if ($result) {
        $sqlCommand  = ' INSERT INTO pf_notas_fiscais (CNPJ, Empresa_codigo, Portal_codigo, caminho, nomeOriginal, cliente_projeto, periodoInicio, periodoFim, valor, horasRealizadas, atraso, dataCadastro, mesReferencia, usuarioCadastro, dataEmissao, codigoServico, impostoRetido, numeroNota) ';
        $sqlCommand .= ' VALUES ';
        $sqlCommand .= ' ( ';
        $sqlCommand .= '\'' . addslashes($cnpj) . '\', ';
        $sqlCommand .= '\'' . addslashes($Empresa_codigo) . '\', ';
        $sqlCommand .= '\'' . addslashes($codigoPortal) . '\', ';
        $sqlCommand .= '\'' . addslashes($caminho) . '\', ';
        $sqlCommand .= '\'' . addslashes($params['nomeOriginal']) . '\', ';
        $sqlCommand .= '\'' . addslashes(utf8_decode($params['clienteProjeto'])) . '\', ';
        $sqlCommand .= '\'' . addslashes($params['periodoInicio']) . '\', ';
        $sqlCommand .= '\'' . addslashes($params['periodoFim']) . '\', ';
        $sqlCommand .= '\'' . addslashes($params['valor']) . '\', ';
        $sqlCommand .= '\'' . addslashes($params['totalHorasRealiazadas']) . '\', ';
        $sqlCommand .= '\'' . addslashes($params['atraso']) . '\', ';
        $sqlCommand .= ' dataHoraAtual(), ';
        $sqlCommand .= '\'' . addslashes($params['mesReferencia']) . '\', ';
        $sqlCommand .= '\'' . addslashes($codigo) . '\', ';
        $sqlCommand .= '\'' . addslashes($params['dataEmissao']) . '\', ';
        $sqlCommand .= '\'' . addslashes($params['codigoServico']) . '\', ';
        $sqlCommand .= '\'' . addslashes($params['impostoRetido']) . '\', ';
        $sqlCommand .= '\'' . addslashes($params['numeroNota']) . '\' ';
        $sqlCommand .= '); ';

        $do->begin();
        $result = $conectaADM->query($sqlCommand) or die("FALHA" . $conectaADM->error);
        $do->commit();

        if ($result) {
            echo '{"success":true, "message": "cadastrado com sucesso!"}';
            exit;
        } else {
            echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
            exit;
        }
    } else {
        echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
        exit;
    }
} else {
    echo '{"success":false, "message": "Ocorreu um erro ao salvar o documento. Tente novamente ou entre em contato com o suporte."}';
    exit;
}




function salvarImagem($cnpjFormatado, $total)
{
    $caminhoBanco = $GLOBALS['caminhoBanco'];
    $elements = "";
    $arquivos = [];

    $infoFiles = json_decode($_POST['infoFiles'], true);
    foreach ($_FILES as $key => $value) {
        for ($i = 0; $i < count($value['name']); $i++) {
            $caminho = ROOT_INTERNETFILES . $infoFiles[$i]['caminho'];
            // $caminhoADM = 'https://portalfornecedor.blueshift.com.br/internetfiles/' .  $infoFiles[$i]['caminho'];
            $caminhoImagem = $infoFiles[$i]['caminho'];
            if (!file_exists($caminho)) {
                mkdir($caminho, 0777, true);
            }
            // if (!file_exists($caminhoADM)) {
            //     mkdir($caminhoADM, 0777, true);
            // }
            $nome = basename(strtolower($value['name'][$i]));
            $expl = explode('.', $nome);
            $ext = end($expl);
            if ($total <= 0) {
                $nomeFormatado = $cnpjFormatado . '.' . $ext;
            } else {
                $nomeFormatado = $cnpjFormatado . '_' . $total . '.' . $ext;
            }
            $total++;

            if (!isset($value['name'][$i]) || !$value['size'][$i] > 0) {
                $elements = false;
                return $elements;
            } else {
                if (!is_uploaded_file($value['tmp_name'][$i])) {

                    $elements = false;
                    return $elements;
                } else {
                    $novoNome = $caminhoImagem . $nomeFormatado;
                    $arquivo = $caminho . $nomeFormatado;
                    // $arquivoADM = $caminhoADM . $nomeFormatado;

                    if (!move_uploaded_file($value['tmp_name'][$i], $arquivo)) {
                        $elements = false;
                        return $elements;
                    } else {
                        $elements = '{"success": true, "file": "' . $value['name'][$i] . '", "newFile": "' . $novoNome . '"}';

                        $obj = '';
                        $obj->Tipo = $infoFiles[$i]['tipo'];
                        $obj->Nome = $value['name'][$i];
                        $obj->Data = date("Y-m-d H:i:s", strtotime('-3 hours', time()));
                        $obj->Usuario = $GLOBALS['usuarioNome'];
                        $obj->Status = 'Pendente';
                        $obj->Tamanho = $value['size'][$i];
                        $obj->MD5 = $nomeFormatado;
                        $obj->caminho = $caminhoImagem;
                        array_push($arquivos, $obj);
                    }

                    // // if (!move_uploaded_file($value['tmp_name'][$i], $arquivoADM)) {
                    // //     $elements = false;
                    // //     return $elements;
                    // // } else {
                    //     $elements = '{"success": true, "file": "' . $value['name'][$i] . '", "newFile": "' . $novoNome . '"}';

                    //     $obj = '';
                    //     $obj->Tipo = $infoFiles[$i]['tipo'];
                    //     $obj->Nome = $value['name'][$i];
                    //     $obj->Data = date("Y-m-d H:i:s", strtotime('-3 hours', time()));
                    //     $obj->Usuario = $GLOBALS['usuarioNome'];
                    //     $obj->Status = 'Pendente';
                    //     $obj->Tamanho = $value['size'][$i];
                    //     $obj->MD5 = $nomeFormatado;
                    //     $obj->caminho = $caminhoImagem;
                    //     array_push($arquivos, $obj);
                    // }
                }
            }
            $caminhoBanco = $novoNome;
        }
    }
    return  $caminhoBanco;
}
