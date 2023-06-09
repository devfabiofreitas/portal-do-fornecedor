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
$cnpj = $usuarioSessao['usuario'];
$params = json_decode($_POST['params'], true);
$infoFiles = json_decode($_POST['infoFiles'], true);

function tirarCaracteresEspeciais($cnpj)
{
    $cnpj = str_replace('/', '', $cnpj);
    $cnpj = str_replace('-', '', $cnpj);
    $cnpj = str_replace('.', '', $cnpj);
    return $cnpj;
}

$cnpj = tirarCaracteresEspeciais($cnpj);

if($codigo == 518 || $codigo == 519){
    echo '{"success":false, "message": "nota não encontrada para o período em questão!"}';
    exit;
}

$sqlCommand .= ' SELECT  ';
$sqlCommand .= '     n.caminho, n.Empresa_codigo ';
$sqlCommand .= ' FROM ';
$sqlCommand .= '    notas_fiscais n ';
$sqlCommand .= '        INNER JOIN ';
$sqlCommand .= '    usuarios u ON u.Empresa_codigo = n.Empresa_codigo ';
$sqlCommand .= '        INNER JOIN  ';
$sqlCommand .= '    responsaveis_tecnicos r ON r.Usuario_codigo = u.codigo ';
$sqlCommand .= '        WHERE  ';
$sqlCommand .= '    r.codigo = ' . $usuarioSessao['codigo'] . '';
$sqlCommand .= '         AND (periodoInicio BETWEEN "' . $params['periodoInicio'] . '" AND "' . $params['periodoFim'] . '" ';
$sqlCommand .= '         OR periodoFim BETWEEN "' . $params['periodoInicio'] . '" AND "' . $params['periodoFim'] . '") ';
$sqlCommand .= '         AND status != "R" ; ';


$do->begin();
$result = $do->execute($sqlCommand, "SELECT", "");
$do->commit();
$elements = $do->toJSON($result);
$do->end();
if (count($elements) > 0) {
    $verificarNotaRecusadas = verificaNotasRecusadas($do, $elements[0]['Empresa_codigo'], $params['periodoInicio'], $params['periodoInicio'], $DB_APPLICATION['administrativo']);

    if ($verificarNotaRecusadas >= count($elements)) {
        echo '{"success":false, "message": "nota não encontrada para o período em questão"}';
        exit;
    }

    echo '{"success":true, "message": "nota encontrada"}';
    exit;
} else {
    echo '{"success":false, "message": "nota não encontrada para o período em questão"}';
    exit;
}


function verificaNotasRecusadas($do, $empresaCodigo, $dataInicio, $dataFim, $DB_APPLICATION)
{

    $dbparameter = $DB_APPLICATION;
    $server = $dbparameter["server"];
    $instanceMySql = mysqli_connect($server, $dbparameter["user"], $dbparameter["password"], $dbparameter["name"]);
    if (!$instanceMySql) {
        echo '{"success":false, "message": "Não foi possível estabelecer uma conexão com o gerenciador MySQL.", "Debugging errno":"' . mysqli_connect_errno() . '", "Debugging error": ' . json_encode(utf8_encode(mysqli_connect_error()), JSON_UNESCAPED_SLASHES)  . '}';
        exit;
    }
    $dbparameter["instance"] = $instanceMySql;
    $do->setInstanceDB("administrativo", $dbparameter);
    $do->instance = $dbparameter;

    $sqlCommand  =  ' SELECT ';
    $sqlCommand  .= '     codigo ';
    $sqlCommand  .= ' FROM ';
    $sqlCommand  .= '     pf_notas_fiscais ';
    $sqlCommand  .= ' WHERE ';
    $sqlCommand .= '    Empresa_codigo = ' . $empresaCodigo . '';
    $sqlCommand .= '         AND (periodoInicio BETWEEN "' . $dataInicio . '" AND "' .  $dataFim . '" ';
    $sqlCommand .= '         OR periodoFim BETWEEN "' . $dataInicio . '" AND "' .  $dataFim . '") ';
    $sqlCommand .= '         AND aprovacao_nota = "N" ; ';

    $do->begin();
    $result = $do->execute($sqlCommand, "SELECT", "");
    $do->commit();

    $elements = $do->toJSON($result);
    if (count($elements) > 0) {
        return count($elements);
    }

    return 0;
}
